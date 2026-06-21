import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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
 * On-brand by construction: the Onyx field, the signature vertical hairline
 * grid, the LINERATE wordmark (drawn from the same exported path data the app
 * uses, so geometry never drifts), a mono eyebrow, one rare amber accent, and
 * the hero line. Colors are the literal brand hex values (this is a static
 * build artifact, not a themed runtime surface, so it doesn't read tokens).
 *
 * Satori can't rasterize woff2, so the eyebrow/line use vendored JetBrains
 * Mono TTFs from /assets, which is the brand's label/eyebrow face anyway.
 */

// Required for `output: export`: render this image once at build time.
export const dynamic = "force-static";

export const alt = "LineRate design system";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ONYX = "#101010";
const PAPER = "#FFFFFF";
const CHALK = "#E5E5E5";
const GRAPHITE = "#838383";
const AMBER = "#DF8E2A";

export default async function Image() {
  const [mono, monoMedium] = await Promise.all([
    readFile(join(process.cwd(), "assets/JetBrainsMono-Regular.ttf")),
    readFile(join(process.cwd(), "assets/JetBrainsMono-Medium.ttf")),
  ]);

  const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}" fill="${PAPER}">${WORDMARK_PATHS.map(
    (d) => `<path d="${d}"/>`
  ).join("")}</svg>`;
  const wordmarkSrc = `data:image/svg+xml;base64,${Buffer.from(
    wordmarkSvg
  ).toString("base64")}`;

  const wordmarkWidth = 720;
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
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: ONYX,
          fontFamily: "JetBrains Mono",
          padding: 96,
          position: "relative",
        }}
      >
        {/* Signature vertical hairline grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />

        {/* Eyebrow: amber tick + mono label */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <div style={{ width: 18, height: 18, backgroundColor: AMBER }} />
          <div
            style={{
              marginLeft: 18,
              color: GRAPHITE,
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: 6,
            }}
          >
            DESIGN SYSTEM
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wordmarkSrc}
          width={wordmarkWidth}
          height={wordmarkHeight}
          alt="LINERATE"
        />

        <div
          style={{
            marginTop: 44,
            color: CHALK,
            fontSize: 34,
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          The voice of the brand &amp; the voice of the ledger.
        </div>

        {/* Baseline: hairline rule + URL */}
        <div
          style={{
            position: "absolute",
            left: 96,
            right: 96,
            bottom: 80,
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ color: GRAPHITE, fontSize: 24 }}>
            jedbridges.github.io/linerate-app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 400 },
        {
          name: "JetBrains Mono",
          data: monoMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
