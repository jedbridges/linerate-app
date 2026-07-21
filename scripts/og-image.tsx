import { ImageResponse } from "next/og";

import { WORDMARK_PATHS, WORDMARK_VIEWBOX } from "@/components/wordmark";

/*
 * Source for the social share image at public/og.png (Open Graph + Twitter).
 *
 * This file is NOT wired into the build. next/og's ImageResponse needs the
 * Next bundler, and GitHub Pages can't serve the route convention's
 * extensionless output with an image/png content-type, so the PNG ships as a
 * committed static asset instead. It's excluded from tsconfig.
 *
 * To regenerate public/og.png after a brand change:
 *   1. cp scripts/og-image.tsx src/app/opengraph-image.tsx
 *   2. NEXT_PUBLIC_BASE_PATH=/linerate-app npm run build
 *   3. cp out/opengraph-image public/og.png
 *   4. rm src/app/opengraph-image.tsx
 *
 * The card is a flat Amber field with the LINERATE wordmark and nothing else.
 * A share card is seen at thumbnail size in a feed, so it has one job: be
 * unmistakably this brand at a glance. Amber is the one colour nothing else in
 * the category owns, and stripping the eyebrow, tagline and URL means the mark
 * reads at any size instead of turning into grey mush.
 *
 * The wordmark is Onyx, not Paper: on Amber, Onyx clears ~8:1 while Paper is
 * ~2.6:1, and ink-on-amber is the same pairing the closing CTA band uses.
 *
 * Geometry comes from the exported wordmark path data the app itself draws, so
 * it can never drift from the real mark. No font files are needed now that the
 * mono type is gone, which also means Satori has nothing left to rasterize.
 */

// Required for `output: export`: render this image once at build time.
export const dynamic = "force-static";

// Kept in step with OG_IMAGE.alt in src/app/layout.tsx, which is what actually
// ships in the meta tags (this export only applies to the route convention).
export const alt = "LineRate design system";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ONYX = "#101010";
const AMBER = "#DF8E2A";

export default async function Image() {
  const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}" fill="${ONYX}">${WORDMARK_PATHS.map(
    (d) => `<path d="${d}"/>`
  ).join("")}</svg>`;
  const wordmarkSrc = `data:image/svg+xml;base64,${Buffer.from(
    wordmarkSvg
  ).toString("base64")}`;

  // 620 of 1200 leaves the mark generous air on both sides, so it still reads
  // as a stamp rather than a banner when the card is scaled down in a feed.
  const wordmarkWidth = 620;
  const wordmarkHeight = Math.round(
    (wordmarkWidth * WORDMARK_VIEWBOX.height) / WORDMARK_VIEWBOX.width
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AMBER,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wordmarkSrc}
          width={wordmarkWidth}
          height={wordmarkHeight}
          alt="LINERATE"
        />
      </div>
    ),
    { ...size }
  );
}
