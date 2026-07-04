"use client";

import * as React from "react";
import { Dithering, ditheringPresets } from "@paper-design/shaders-react";

import { cn } from "@/lib/utils";

/*
 * A generative, mouse-reactive dither field in the LineRate brand (amber ink on
 * near-black). Three stacked Dithering layers give a wide range of element
 * sizes and a sense of depth:
 *   back  — big, slow, deep-amber forms (parallax the most)
 *   mid   — warping amber
 *   front — fine, fast, light-amber specks
 * Each layer's gaps are transparent (#00000000) so they composite over the dark
 * page. The cursor drives a parallax on each layer (deeper layers move more) and
 * an amber glow that follows the pointer. When idle it drifts on its own.
 *
 * NOTE: always animates for now (no reduced-motion gate) while we dial in the
 * look; the reduced-motion fallback gets re-added once it's locked.
 */

const CLEAR = "#00000000";
const AMBER_BASE = "#df8e2a"; // --accent, the field background

// back -> front. Larger scale/size = bigger elements; deeper = more parallax.
// Dark inks so the dither reads on the amber base (deep amber -> near-black).
const LAYERS = [
  { shape: "sphere", type: "8x8", size: 3, scale: 1.7, color: "#5a3b12", speed: 0.3, depth: 0.2 },
  { shape: "warp", type: "4x4", size: 2, scale: 1.0, color: "#2a1a06", speed: 0.65, depth: 0.11 },
  { shape: "simplex", type: "random", size: 1, scale: 0.5, color: "#101010", speed: 1.3, depth: 0.05 },
] as const;

function presetParams<T>(
  list: readonly { name: string; params: T }[],
  name: string,
): T {
  return (list.find((p) => p.name === name) ?? list[0]).params;
}

const FILL = { position: "absolute", inset: 0, width: "100%", height: "100%" } as const;

export function DitherField({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [p, setP] = React.useState({ x: 0, y: 0 }); // eased pointer, -1..1

  const target = React.useRef({ x: 0, y: 0, active: false });
  const current = React.useRef({ x: 0, y: 0 });
  const applied = React.useRef({ x: 0, y: 0 });
  const t = React.useRef(0);
  const raf = React.useRef(0);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted) return;
    const tick = () => {
      t.current += 1 / 60;
      const tg = target.current;
      const tx = tg.active ? tg.x : Math.sin(t.current * 0.4) * 0.6;
      const ty = tg.active ? tg.y : Math.cos(t.current * 0.55) * 0.6;

      const c = current.current;
      c.x += (tx - c.x) * 0.05;
      c.y += (ty - c.y) * 0.05;

      if (
        Math.abs(c.x - applied.current.x) > 0.0004 ||
        Math.abs(c.y - applied.current.y) > 0.0004
      ) {
        applied.current = { x: c.x, y: c.y };
        setP({ x: c.x, y: c.y });
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [mounted]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
      active: true,
    };
  };
  const onPointerLeave = () => {
    target.current.active = false;
  };

  const gx = (p.x + 1) * 50; // %
  const gy = (p.y + 1) * 50;

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ backgroundColor: AMBER_BASE }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {mounted &&
        LAYERS.map((l, i) => (
          <Dithering
            key={i}
            aria-hidden
            {...presetParams(ditheringPresets, "Default")}
            colorBack={CLEAR}
            colorFront={l.color}
            shape={l.shape}
            type={l.type}
            size={l.size}
            scale={l.scale}
            speed={l.speed}
            offsetX={p.x * l.depth}
            offsetY={p.y * l.depth}
            style={FILL}
          />
        ))}

      {/* Warm highlight following the cursor (lightens the amber field). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(38rem 38rem at ${gx}% ${gy}%, rgba(251,241,227,0.30), transparent 62%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Fade the bottom into the page so overlapping content stays legible. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-page to-transparent" />
    </div>
  );
}
