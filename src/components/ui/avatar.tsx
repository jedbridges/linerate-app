import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate Avatar
 *
 * Monogram avatar in two brand tones and three common sizes. Onyx fill with
 * Paper initials, or Amber fill with Onyx initials (the rare accent variant,
 * e.g. the current operator). Initials are mono, uppercase, tracking-wide,
 * matching the ledger voice.
 */

const SIZES = {
  sm: { box: "size-8", text: "text-xs" },
  md: { box: "size-10", text: "text-sm" },
  lg: { box: "size-14", text: "text-lg" },
} as const;

type AvatarProps = {
  initials: string;
  size?: keyof typeof SIZES;
  tone?: "onyx" | "amber";
  className?: string;
};

export function Avatar({
  initials,
  size = "md",
  tone = "onyx",
  className,
}: AvatarProps) {
  const s = SIZES[size];
  return (
    <span
      data-slot="avatar"
      aria-label={initials}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-mono font-medium uppercase tracking-wide select-none",
        s.box,
        s.text,
        // Fixed brand colors (not theme-flipping tokens) so the mark is the
        // same black or amber everywhere, on screen and when downloaded.
        tone === "amber"
          ? "bg-amber text-onyx"
          : "bg-onyx text-paper ring-1 ring-border",
        className
      )}
    >
      {initials.slice(0, 2)}
    </span>
  );
}
