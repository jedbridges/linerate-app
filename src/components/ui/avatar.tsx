import * as React from "react";

import { cn } from "@/lib/utils";
import { Monogram } from "@/components/wordmark";

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
  return (
    <span
      data-slot="avatar"
      aria-label="LineRate"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        SIZES[size],
        tone === "amber"
          ? "bg-amber text-onyx"
          : "bg-onyx text-paper ring-1 ring-border",
        className
      )}
    >
      {/*
       * Monogram inherits the tone color via currentColor (text-current).
       * The L is bottom-left heavy, so nudge it up and right to sit
       * optically centered in the circle.
       */}
      <Monogram
        aria-hidden
        className="h-[38%] w-auto translate-x-[5%] -translate-y-[4%] text-current"
      />
    </span>
  );
}
