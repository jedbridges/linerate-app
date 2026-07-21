"use client";

import * as React from "react";

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

/*
 * The shader counts its grid across the banner's height, and the banner's
 * height is a fixed share of its width, so a single grid value renders at wildly
 * different physical sizes: 111 cells is a 3.6px mark on a 1440px desktop and a
 * 1px mark on a 390px phone, which is why it turned to mush there. Scale the
 * grid with the width instead, and deliberately land phones on a coarser mark
 * (~6px vs ~3.6px) so the weave reads as construction rather than noise at the
 * size it's actually seen. Coarser than this and the handshake stops reading as
 * a handshake, so 36 is the floor. 1440 still resolves to the tuned 111.
 */
const GRID_AT = { minW: 390, minGrid: 36, maxW: 1440, maxGrid: 111 };

function gridForWidth(w: number) {
  const { minW, minGrid, maxW, maxGrid } = GRID_AT;
  const t = (w - minW) / (maxW - minW);
  return Math.round(
    Math.max(minGrid, Math.min(maxGrid, minGrid + t * (maxGrid - minGrid))),
  );
}

export function CtaCrossHatch({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  // Starts at the desktop value so SSR and first client render agree; the
  // observer corrects it after mount.
  const [grid, setGrid] = React.useState(GRID_AT.maxGrid);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setGrid(gridForWidth(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative z-0 w-full overflow-hidden", className)}
      style={{ WebkitMaskImage: FADE, maskImage: FADE }}
    >
      {/* Taller on phones: at 32/9 a 390px screen leaves a 110px strip, too
          little room for the handshake to read at all. */}
      <cross-hatch
        src={withBase("/handshake.jpg")}
        grid={String(grid)}
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
        className="block aspect-[16/9] w-full sm:aspect-[32/9]"
      />
    </div>
  );
}
