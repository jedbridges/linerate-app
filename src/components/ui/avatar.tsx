import * as React from "react";

import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";

/*
 * LineRate Avatar
 *
 * Brand avatar: the LINERATE wordmark centered inside a circle, in two brand
 * tones and three common sizes. Onyx fill with a Paper wordmark, or Amber
 * fill with an Onyx wordmark (the rare accent variant). Tones use the literal
 * brand colors (not theme-flipping tokens) so the mark is identical on screen
 * and when exported.
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
      {/* Wordmark inherits the tone color via currentColor (text-current). */}
      <Wordmark aria-hidden className="h-auto w-[64%] text-current" />
    </span>
  );
}
