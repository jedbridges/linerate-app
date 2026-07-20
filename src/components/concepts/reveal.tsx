import * as React from "react";

import { cn } from "@/lib/utils";

type RevealTag =
  | "div"
  | "section"
  | "li"
  | "figure"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3";

/*
 * Pure-CSS entrance. No JavaScript, so content is never stranded invisible if a
 * script fails to run: the base class is fully visible and the animation is
 * layered on only where motion is supported and wanted (see globals.css).
 *
 * variant="load"   time-based entrance for above-the-fold content; `delay`
 *                  (ms) staggers siblings.
 * variant="scroll" (default) scroll-driven entrance for content further down;
 *                  `delay` maps to a small stagger step within a row.
 *
 * `y` sets the distance travelled.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y,
  as: Tag = "div",
  variant = "scroll",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: RevealTag;
  variant?: "scroll" | "load";
}) {
  const style: React.CSSProperties = {};
  if (y != null) (style as Record<string, string>)["--reveal-y"] = `${y}px`;
  if (variant === "load") {
    // A custom property rather than animation-delay directly, so the stylesheet
    // can add a page-intro offset on top of the per-element stagger.
    (style as Record<string, string>)["--enter-delay"] = `${delay}ms`;
  } else if (delay) {
    (style as Record<string, string>)["--reveal-i"] = String(
      Math.round(delay / 80),
    );
  }

  return (
    <Tag
      className={cn(variant === "load" ? "lr-enter" : "lr-reveal", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
