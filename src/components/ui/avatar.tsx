import * as React from "react";

import { cn } from "@/lib/utils";
import { AVATAR_MARK_PATH, AVATAR_MARK_VIEWBOX } from "@/components/wordmark";

/*
 * LineRate Avatar
 *
 * Brand avatar: the LineRate monogram (the wordmark's geometric L) centered
 * inside a circle, in two brand tones and three common sizes. Onyx fill with
 * a Paper monogram, or Amber fill with an Onyx monogram (the rare accent
 * variant). A near-square mark reads cleanly at every size, unlike the wide
 * full wordmark. Tones use the literal brand colors (not theme-flipping
 * tokens) so the mark is identical on screen and when exported.
 */

const SIZES = {
  sm: "size-8",
  md: "size-10",
  lg: "size-14",
} as const;

type AvatarProps = {
  size?: keyof typeof SIZES;
  tone?: "onyx" | "amber";
  className?: string;
};

export function Avatar({
  size = "md",
  tone = "onyx",
  className,
}: AvatarProps) {
  const { minX, minY, size: vb } = AVATAR_MARK_VIEWBOX;
  return (
    <span
      data-slot="avatar"
      aria-label="LineRate"
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        SIZES[size],
        tone === "amber"
          ? "bg-amber text-onyx"
          : "bg-onyx text-paper ring-1 ring-border",
        className
      )}
    >
      {/*
       * The L mark, with its foot extended so it bleeds off the right edge of
       * the circle (clipped by overflow-hidden). Inherits the tone color via
       * currentColor (text-current).
       */}
      <svg
        aria-hidden
        viewBox={`${minX} ${minY} ${vb} ${vb}`}
        fill="currentColor"
        className="absolute inset-0 size-full text-current"
      >
        <path d={AVATAR_MARK_PATH} />
      </svg>
    </span>
  );
}
