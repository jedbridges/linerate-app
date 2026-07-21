/*
 * Generates the brand icon set from the design system's Avatar geometry, so the
 * favicon and touch icon can never drift from the <Avatar> component on screen.
 *
 * Run after a brand change:
 *   node scripts/brand-icons.mjs
 *
 * Writes (all Next.js App Router file conventions, so the <link> tags and the
 * basePath are handled for us):
 *   src/app/icon.svg       - modern browsers, crisp at any size
 *   src/app/favicon.ico    - legacy + anything that hard-requests /favicon.ico
 *   src/app/apple-icon.png - iOS home screen and rich link previews
 *
 * Tone is the Avatar's amber variant (Amber field, Onyx monogram). Amber sits
 * mid-luminance, so unlike Onyx-on-dark it stays visible in both light and dark
 * browser chrome, and it matches the amber social card.
 *
 * Shape differs by target on purpose. The favicon is the Avatar's circle,
 * matching the component exactly. The touch icon is a full-bleed square,
 * because iOS applies its own superellipse mask: a circle inside that mask
 * would float as a small dot with amber corners around it.
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const puppeteer = require("/Users/jedbridges/.npm/_npx/1a4eb60c8f6b0f89/node_modules/puppeteer");

const AMBER = "#DF8E2A";
const ONYX = "#101010";

// Mirrors AVATAR_MARK_* in src/components/wordmark.tsx.
const MARK_PATH = "M220 67.2025V91H0V1.4384H28.1547V67.2165H220V67.2025Z";
const VB = { minX: -55, minY: -59, size: 210 };
const CX = VB.minX + VB.size / 2; // 50
const CY = VB.minY + VB.size / 2; // 46
const R = VB.size / 2; // 105

const viewBox = `${VB.minX} ${VB.minY} ${VB.size} ${VB.size}`;

/* Circle: the mark's foot runs past the viewBox on purpose, so clip it to the
   circle exactly as the component's overflow-hidden does. */
const circleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="LineRate">
  <defs><clipPath id="lr"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath></defs>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="${AMBER}"/>
  <g clip-path="url(#lr)"><path d="${MARK_PATH}" fill="${ONYX}"/></g>
</svg>
`;

/* Square: the viewBox itself does the clipping. No transparency, so iOS has a
   solid field to mask rather than compositing the mark onto black. */
const squareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="LineRate">
  <rect x="${VB.minX}" y="${VB.minY}" width="${VB.size}" height="${VB.size}" fill="${AMBER}"/>
  <path d="${MARK_PATH}" fill="${ONYX}"/>
</svg>
`;

/* Minimal ICO wrapping a single PNG. The format has allowed PNG payloads since
   Vista and every browser that still asks for .ico accepts them. */
function icoFromPng(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  const dir = Buffer.alloc(16);
  dir.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
  dir.writeUInt8(size >= 256 ? 0 : size, 1); // height
  dir.writeUInt8(0, 2); // palette
  dir.writeUInt8(0, 3); // reserved
  dir.writeUInt16LE(1, 4); // colour planes
  dir.writeUInt16LE(32, 6); // bits per pixel
  dir.writeUInt32LE(png.length, 8);
  dir.writeUInt32LE(header.length + dir.length, 12);
  return Buffer.concat([header, dir, png]);
}

/* transparent: the circle needs see-through corners so tab chrome shows through
   behind it. The square touch icon is full-bleed and wants an opaque field,
   since iOS composites anything transparent onto black. */
async function rasterize(page, svg, size, { transparent = false } = {}) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  await page.setContent(
    `<body style="margin:0;background:transparent"><img src="${src}" width="${size}" height="${size}" style="display:block"></body>`
  );
  await page.waitForSelector("img");
  await new Promise((r) => setTimeout(r, 150));
  return await page.screenshot({ type: "png", omitBackground: transparent });
}

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox"],
  protocolTimeout: 60000,
});
const page = await browser.newPage();

writeFileSync("src/app/icon.svg", circleSvg);
writeFileSync("src/app/apple-icon.png", await rasterize(page, squareSvg, 180));
writeFileSync(
  "src/app/favicon.ico",
  icoFromPng(await rasterize(page, circleSvg, 32, { transparent: true }), 32)
);

await browser.close();
console.log("wrote src/app/icon.svg, src/app/apple-icon.png, src/app/favicon.ico");
