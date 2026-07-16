"use client";

import * as React from "react";

/*
 * A simple line-grid background that lights up under the cursor. A faint static
 * grid sits behind, and a brighter amber grid is revealed only inside a soft
 * radial spotlight that follows the pointer (see .lr-igrid in globals.css).
 * Pointer-only and reduced-motion-aware; on touch / no-hover it stays the plain
 * static grid. Purely decorative (aria-hidden).
 */
export function InteractiveGrid({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--on", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--on", "0");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className={`lr-igrid ${className ?? ""}`} />;
}
