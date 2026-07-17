"use client";

import * as React from "react";

import { cn, withBase } from "@/lib/utils";

/*
 * Interactive line-halftone banner for the closing CTA (concept 06). Renders
 * the shipped <line-screen> custom element (public/line-screen.js, loaded by
 * ConceptChrome) as a full-bleed background pinned to the top of the panel and
 * masked to fade out top-to-bottom, so the CTA copy below reads on the clean
 * panel. The element tracks the cursor on its own (tightening lines + pooling
 * amber), so this stays interactive; the copy sits above it (z-10).
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
        frequency="150"
        contrast="1.35"
        exposure="0"
        bleed="1"
        focus="1"
        warp="0.3"
        angle="0"
        style={{ display: "block", width: "100%", aspectRatio: "2.4 / 1" }}
      />
    </div>
  );
}
