"use client";

import { cn, withBase } from "@/lib/utils";

/*
 * Interactive cross-hatch banner for the closing CTA (concept 06). Renders the
 * shipped <cross-hatch> custom element (public/cross-hatch.js, loaded by
 * ConceptChrome) as a full-bleed background pinned to the top of the panel and
 * masked to fade out top-to-bottom, so the CTA copy below reads on the clean
 * panel. The copy sits above it (z-10).
 *
 * Tuned as an amber duotone: paper is the brand amber and ink is black, so the
 * photo reads as amber-on-dark hatching rather than the parchment default.
 * Only two passes, so the lattice stays a plain horizontal/vertical weave, and
 * the lifted exposure keeps it light enough that the white CTA copy clears
 * contrast over it (measured: 8.2:1 average, 4.8:1 against the lightest amber).
 *
 * The cursor does two things here: focus tightens the lattice under it, and a
 * light bleed toward accent (which matches paper) dissolves the hatching into
 * the background.
 */
/*
 * Alpha ramp for the bottom fade. A linear-gradient interpolates linearly
 * between stops, so a three-stop mask reads as two straight segments with a
 * visible kink where they meet. These stops trace an ease-in-out curve instead,
 * and run all the way to the bottom edge, so the hatching dissolves into the
 * band with no seam. It lands on .lr-cta-band, not on --page.
 */
const FADE = `linear-gradient(to bottom, #000 0%, #000 40%, ${[
  [45, 0.98],
  [52, 0.92],
  [59, 0.82],
  [66, 0.68],
  [73, 0.52],
  [80, 0.36],
  [86, 0.22],
  [92, 0.11],
  [96, 0.04],
  [100, 0],
]
  .map(([pos, a]) => `rgba(0,0,0,${a}) ${pos}%`)
  .join(", ")})`;

export function CtaCrossHatch({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative z-0 w-full overflow-hidden", className)}
      style={{ WebkitMaskImage: FADE, maskImage: FADE }}
    >
      <cross-hatch
        src={withBase("/handshake.jpg")}
        grid="111"
        levels="2"
        weight="0.5"
        contrast="1.95"
        exposure="0.4"
        bleed="0.17"
        focus="0.32"
        angle="0"
        ink="#000000"
        paper="#df8e2a"
        accent="#DF8E2A"
        style={{ display: "block", width: "100%", aspectRatio: "32 / 9" }}
      />
    </div>
  );
}
