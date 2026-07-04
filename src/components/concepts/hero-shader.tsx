"use client";

import * as React from "react";
import { ColorPanels } from "@paper-design/shaders-react";

import { cn } from "@/lib/utils";

/*
 * Runtime hero shader: Paper's ColorPanels tuned to the brand (amber panels
 * over a deep-amber back). It auto-animates via `speed`, and the cursor adds a
 * small parallax on top of the base offset so it also reacts to the mouse.
 *
 * SSR-safe: the WebGL layer mounts on the client and fades in over a deep-amber
 * fallback, so there's no layout shift or hard pop. Under prefers-reduced-motion
 * it renders a still frame with no cursor parallax.
 */

const AMBER = "#df8e2a"; // --accent (amber-500)
const BACK = "#422400"; // bespoke deep-amber shader back
const BASE_X = 0; // spec offsetX
const BASE_Y = 0.72; // spec offsetY

const FILL = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
} as const;

export function HeroShader({
  className,
  parallax = 0.08,
}: {
  className?: string;
  /** Cursor parallax added on top of the base offset. */
  parallax?: number;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [reduce, setReduce] = React.useState(true);
  const [off, setOff] = React.useState({ x: BASE_X, y: BASE_Y });

  const target = React.useRef({ x: 0, y: 0, active: false });
  const current = React.useRef({ x: 0, y: 0 });
  const applied = React.useRef({ x: BASE_X, y: BASE_Y });
  const raf = React.useRef(0);

  React.useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
    const t = setTimeout(() => setShown(true), 60); // fade the canvas in
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (!mounted || reduce) return;
    const tick = () => {
      const tg = target.current;
      const tx = tg.active ? tg.x * parallax : 0;
      const ty = tg.active ? tg.y * parallax : 0;

      const c = current.current;
      c.x += (tx - c.x) * 0.08;
      c.y += (ty - c.y) * 0.08;

      const ox = BASE_X + c.x;
      const oy = BASE_Y + c.y;
      if (
        Math.abs(ox - applied.current.x) > 0.0004 ||
        Math.abs(oy - applied.current.y) > 0.0004
      ) {
        applied.current = { x: ox, y: oy };
        setOff({ x: ox, y: oy });
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [mounted, reduce, parallax]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
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

  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-hidden", className)}
      style={{ backgroundColor: BACK }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {mounted && (
        <ColorPanels
          colors={[AMBER]}
          colorBack={BACK}
          density={3.07}
          angle1={-1}
          angle2={-1}
          length={0.62}
          edges
          blur={0.03}
          fadeIn={0.72}
          fadeOut={0.73}
          gradient={0}
          speed={reduce ? 0 : 2.3}
          scale={2.48}
          rotation={180}
          offsetX={off.x}
          offsetY={off.y}
          style={{
            ...FILL,
            opacity: shown ? 1 : 0,
            transition: "opacity 500ms ease",
          }}
        />
      )}

      {/* Fade the bottom into the page so the overlapping stream stays legible. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-page to-transparent" />
    </div>
  );
}
