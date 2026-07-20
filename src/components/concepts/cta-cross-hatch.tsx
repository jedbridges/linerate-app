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
 * focus is 0 (the cursor does not tighten the grid), but bleed is live and
 * accent matches paper, so the hatching dissolves into the background under the
 * cursor. That dissolve is the only cursor response, which is why pointer
 * tracking stays enabled.
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
        grid="240"
        levels="4"
        weight="0.24"
        contrast="1"
        exposure="0.17"
        bleed="0.73"
        focus="0"
        angle="0"
        ink="#000000"
        paper="#df8e2a"
        accent="#DF8E2A"
        style={{ display: "block", width: "100%", aspectRatio: "32 / 9" }}
      />
    </div>
  );
}
