"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * A big, massively-blurred amber orb that sits behind the how-it-works preview
 * panels (concept 06) as a soft light source. With `parallax`, it eases toward
 * the cursor for a subtle sense of depth (desktop only in practice — it tracks
 * the pointer). Purely decorative; ignores the cursor under reduced motion.
 */
export function PreviewGlow({
  className,
  parallax = false,
}: {
  className?: string;
  parallax?: boolean;
}) {
  const orb = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!parallax) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = orb.current;
    if (!el) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // Offset of the cursor from the orb centre, normalised, then scaled to a
      // gentle travel range. The orb drifts toward the pointer.
      tx = ((e.clientX - (r.left + r.width / 2)) / (window.innerWidth || 1)) * 90;
      ty = ((e.clientY - (r.top + r.height / 2)) / (window.innerHeight || 1)) * 90;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 flex items-center justify-center",
        className,
      )}
    >
      <div
        ref={orb}
        className="aspect-square w-[85%] rounded-full bg-accent opacity-25 blur-[110px] will-change-transform"
      />
    </div>
  );
}
