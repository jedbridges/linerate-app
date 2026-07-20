"use client";

import * as React from "react";

import { cn, withBase } from "@/lib/utils";

/*
 * Interactive line-halftone banner for the closing CTA (concept 06). Renders
 * the shipped <line-screen> custom element (public/line-screen.js, loaded by
 * ConceptChrome) as a full-bleed background pinned to the top of the panel and
 * masked to fade out top-to-bottom, so the CTA copy below reads on the clean
 * panel. The copy sits above it (z-10).
 *
 * Tuned as an amber duotone: paper is the brand amber and ink is near-black, so
 * the photo reads as amber-on-dark linework rather than the parchment default.
 * focus/magnet are 0 (no line tightening, no cursor bend), but bleed is live and
 * accent matches paper, so the lines dissolve into the background under the
 * cursor. That dissolve is the only cursor response, which is why pointer
 * tracking stays enabled.
 */
const FADE =
  "linear-gradient(to bottom, #000 0%, #000 46%, rgba(0,0,0,0.4) 72%, transparent 90%)";

export function CtaLineScreen({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative z-0 w-full overflow-hidden", className)}
      style={{ WebkitMaskImage: FADE, maskImage: FADE }}
    >
      <line-screen
        src={withBase("/handshake.jpg")}
        frequency="233"
        contrast="1.05"
        exposure="0.01"
        bleed="0.85"
        focus="0"
        magnet="0"
        angle="0"
        ink="#0A0A0A"
        paper="#df8e2a"
        accent="#DF8E2A"
        style={{ display: "block", width: "100%", aspectRatio: "2.4 / 1" }}
      />
    </div>
  );
}
