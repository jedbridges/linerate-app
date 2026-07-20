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
const FADE =
  "linear-gradient(to bottom, #000 0%, #000 46%, rgba(0,0,0,0.4) 72%, transparent 90%)";

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
