"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/*
 * GridLines
 *
 * Full-height vertical hairlines that sit behind all content, aligned to the
 * content container (max-w-6xl, px-6 inset). A ledger-paper / Swiss-grid
 * device: structural, quiet, on-brand for an audit-grade product.
 *
 * Renders `columns + 1` equal-spaced 1px rules in border-subtle, so the rules
 * show through the page-color gutters and are covered by opaque surfaces
 * (cards, tables) that sit on top.
 *
 * On the concept 05 route the rules become cursor-reactive: each line reads how
 * close the pointer is and blends border-subtle -> border-strong (a touch
 * lighter on dark, a touch darker on light), a subtle glow that follows the
 * cursor and eases back out. Everywhere else the lines stay static.
 *
 * Mounted once in the root layout at -z-10. Requires body to be transparent
 * (the page color comes from <html>) so the backdrop shows through; see
 * globals.css base layer.
 */

// Routes whose grid reacts to the cursor. Kept as a set so it is trivial to
// extend if another concept wants the same treatment.
const INTERACTIVE_ROUTES = new Set(["/concepts/automation"]);

function GridLines({ columns = 4 }: { columns?: number }) {
  const pathname = usePathname();
  const interactive = pathname != null && INTERACTIVE_ROUTES.has(pathname);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const lineRefs = React.useRef<Array<HTMLSpanElement | null>>([]);

  React.useEffect(() => {
    if (!interactive) return;

    // Only wire the effect for real cursors, and honour reduced-motion.
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!media.matches) return;

    // How close (px) the cursor must get before a line reaches full glow.
    const RADIUS = 150;
    let frame = 0;
    let lastX = 0;

    const apply = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const lines = lineRefs.current;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        const x = rect.left + (rect.width * i) / columns;
        const t = Math.max(0, 1 - Math.abs(lastX - x) / RADIUS);
        // Smoothstep so the glow eases in near the line instead of ramping flat.
        const glow = t * t * (3 - 2 * t);
        line.style.setProperty("--g", glow.toFixed(3));
      }
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      for (const line of lineRefs.current) line?.style.setProperty("--g", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [interactive, columns]);

  return (
    <div
      aria-hidden
      className="grid-lines pointer-events-none fixed inset-0 -z-10 flex justify-center"
    >
      <div className="h-full w-full max-w-6xl px-6">
        <div ref={trackRef} className="relative h-full w-full">
          {Array.from({ length: columns + 1 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="lr-grid-line absolute inset-y-0 w-px"
              style={{
                left: `${(i / columns) * 100}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { GridLines };
