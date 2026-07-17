"use client";

import * as React from "react";
import { Waves } from "@paper-design/shaders-react";

import { cn } from "@/lib/utils";

/*
 * Subtle line pattern for the concept 06 closing CTA. Paper's Waves shader
 * (a static line texture) tinted amber and drawn over the transparent panel,
 * so it reads as a delicate wavy line background. It has no self-animation;
 * the cursor eases its rotation and offset, so it responds to mouse movement
 * without ever spinning on its own.
 *
 * SSR-safe: the WebGL layer mounts on the client and fades in. Root is
 * pointer-events-none so the email form underneath stays clickable. Under
 * prefers-reduced-motion it renders a still frame with no cursor response.
 */

const AMBER_LINE = "#df8e2a";
const TRANSPARENT = "#00000000";
const BASE_ROT = 6; // resting line angle (deg)

// Fade the lines out toward the bottom of the panel.
const BOTTOM_FADE = "linear-gradient(to bottom, #000 4%, transparent 90%)";

const FILL = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
} as const;

export function CtaShader({ className }: { className?: string }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [reduce, setReduce] = React.useState(true);
  const [dyn, setDyn] = React.useState({ rot: BASE_ROT, x: 0, y: 0 });

  const target = React.useRef({ x: 0, y: 0, active: false });
  const current = React.useRef({ x: 0, y: 0 });
  const applied = React.useRef({ rot: BASE_ROT, x: 0, y: 0 });
  const raf = React.useRef(0);

  React.useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Track the cursor on the window (the root is pointer-events-none), driving
  // the shader only while the pointer is over the panel.
  React.useEffect(() => {
    if (!mounted || reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!inside) {
        target.current.active = false;
        return;
      }
      target.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
        active: true,
      };
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mounted, reduce]);

  React.useEffect(() => {
    if (!mounted || reduce) return;
    const tick = () => {
      const tg = target.current;
      const tx = tg.active ? tg.x : 0;
      const ty = tg.active ? tg.y : 0;

      const c = current.current;
      c.x += (tx - c.x) * 0.07;
      c.y += (ty - c.y) * 0.07;

      const rot = BASE_ROT + c.x * 6;
      const ox = c.x * 0.12;
      const oy = c.y * 0.12;
      if (
        Math.abs(rot - applied.current.rot) > 0.02 ||
        Math.abs(ox - applied.current.x) > 0.0005 ||
        Math.abs(oy - applied.current.y) > 0.0005
      ) {
        applied.current = { rot, x: ox, y: oy };
        setDyn({ rot, x: ox, y: oy });
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [mounted, reduce]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
    >
      {mounted && (
        <Waves
          colorFront={AMBER_LINE}
          colorBack={TRANSPARENT}
          shape={1}
          frequency={0}
          amplitude={0}
          spacing={1.5}
          proportion={0.1}
          softness={0.9}
          scale={2.4}
          rotation={dyn.rot}
          offsetX={dyn.x}
          offsetY={dyn.y}
          style={{
            ...FILL,
            opacity: shown ? 0.18 : 0,
            transition: "opacity 600ms ease",
            WebkitMaskImage: BOTTOM_FADE,
            maskImage: BOTTOM_FADE,
          }}
        />
      )}
    </div>
  );
}
