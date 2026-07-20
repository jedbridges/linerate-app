"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * A big, massively-blurred amber orb that sits behind a panel (the hero and the
 * how-it-works previews on concept 06) as a soft light source. It rests off
 * centre toward the upper right so the light reads as directional rather than a
 * symmetric halo. With `parallax`, it eases toward the cursor for a subtle
 * sense of depth. The resting offset is a transform (no layout/scroll impact),
 * and parallax composes on top of it. Decorative; ignores the cursor under
 * reduced motion.
 */
const REST = "translate(15%, -17%)";

/** Total px of drift across the full viewport, so the orb moves +/- TRAVEL/2. */
const TRAVEL = 90;
/** Per-frame follow. Low enough to feel like weight, high enough not to lag. */
const EASE = 0.12;

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
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;
      el.style.transform = `${REST} translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      // Where the cursor sits in the viewport, not where it sits relative to the
      // orb. Measuring against the orb's own rect made the target depend on
      // scroll position: the orb lives in a sticky/scrolling container, so
      // scrolling moved its rect without firing this handler (stale target) and
      // pushed the computed offset up without bound as the orb travelled away
      // from the cursor, which then crawled into place. This is
      // scroll-independent, bounded to +/- TRAVEL/2 by construction, and avoids
      // forcing a layout on every pointer move.
      tx = (e.clientX / (window.innerWidth || 1) - 0.5) * TRAVEL;
      ty = (e.clientY / (window.innerHeight || 1) - 0.5) * TRAVEL;
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
        style={{ transform: REST }}
        className={cn(
          "aspect-square w-[80%] rounded-full bg-accent opacity-25 blur-[110px]",
          // Only promote to its own layer when it actually animates; a static
          // orb (mobile) shouldn't hold a compositor layer.
          parallax && "will-change-transform",
        )}
      />
    </div>
  );
}
