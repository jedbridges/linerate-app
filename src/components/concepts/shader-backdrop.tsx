"use client";

import * as React from "react";
import {
  GodRays,
  godRaysPresets,
  Dithering,
  ditheringPresets,
  Warp,
  warpPresets,
} from "@paper-design/shaders-react";

import { cn } from "@/lib/utils";

/*
 * Brand shader backdrops (Paper). Dark, amber-accented, restrained: the shader
 * is a texture behind content, not the star, so a scrim fades it into the page
 * and keeps text legible.
 *
 * SSR- and motion-safe: the WebGL shader only mounts on the client (the server
 * renders just the scrim, so static export and hydration are clean), and it
 * runs static under prefers-reduced-motion (speed 0).
 */

// Literal brand hex (shaders take real colors, not CSS vars).
const BACK = "#101010"; // --page (neutral-950)
const AMBER = "#df8e2a"; // --accent (amber-500)
const AMBER_DEEP = "#b07120"; // amber-600
const NEUTRAL = "#5c5c5c"; // neutral-600

export type ShaderVariant = "rays" | "dither" | "warp";

function presetParams<T>(
  list: readonly { name: string; params: T }[],
  name: string,
): T {
  return (list.find((p) => p.name === name) ?? list[0]).params;
}

export function ShaderBackdrop({
  variant = "rays",
  speed,
  className,
}: {
  variant?: ShaderVariant;
  /** Base animation speed; forced to 0 under reduced motion. */
  speed?: number;
  className?: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [reduce, setReduce] = React.useState(true);

  React.useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
  }, []);

  const s = reduce ? 0 : (speed ?? 0.5);
  const fill = { width: "100%", height: "100%" } as const;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-page",
        className,
      )}
    >
      {mounted && variant === "rays" && (
        <GodRays
          style={fill}
          {...presetParams(godRaysPresets, "Default")}
          colorBack={BACK}
          colorBloom={AMBER}
          colors={[AMBER, AMBER_DEEP, NEUTRAL]}
          intensity={0.7}
          bloom={0.32}
          speed={s}
        />
      )}
      {mounted && variant === "dither" && (
        <Dithering
          style={fill}
          {...presetParams(ditheringPresets, "Default")}
          colorBack={BACK}
          colorFront={AMBER_DEEP}
          shape="warp"
          type="4x4"
          speed={s}
        />
      )}
      {mounted && variant === "warp" && (
        <Warp
          style={fill}
          {...presetParams(warpPresets, "Default")}
          colors={[BACK, AMBER, BACK, AMBER_DEEP]}
          speed={s}
        />
      )}

      {/* Legibility scrim + fade into the page below. */}
      <div className="absolute inset-0 bg-page/55" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-page to-transparent" />
    </div>
  );
}
