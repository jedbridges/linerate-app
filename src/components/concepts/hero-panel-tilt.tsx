"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Wraps the concept 05 hero panel in a subtle 3D tilt. It rests angled inward
 * toward the page centre and leans smoothly toward the cursor on mouse move.
 * Pointer-driven and lg+ only (the resting tilt lives in .lr-tilt-panel behind
 * a min-width query, so the stacked mobile panel stays flat). Purely
 * decorative, so no ARIA; respects reduced motion by ignoring the cursor.
 */
export function HeroPanelTilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const inner = React.useRef<HTMLDivElement>(null);

  const handleMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = inner.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      // Lean toward the cursor (px/py are -0.5..0.5, so this is roughly a
      // +/-6deg lean off the resting angle), noticeable but still tasteful.
      el.style.setProperty("--tilt-ry", `${(px * 12).toFixed(2)}deg`);
      el.style.setProperty("--tilt-rx", `${(-py * 9).toFixed(2)}deg`);
    },
    [],
  );

  const reset = React.useCallback(() => {
    const el = inner.current;
    if (!el) return;
    el.style.setProperty("--tilt-ry", "0deg");
    el.style.setProperty("--tilt-rx", "0deg");
  }, []);

  return (
    <div
      className={cn("[perspective:1400px]", className)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div ref={inner} className="lr-tilt-panel">
        {children}
      </div>
    </div>
  );
}
