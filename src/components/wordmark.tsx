import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate wordmark.
 *
 * Per Brand v3: ALL CAPS, geometric sans, tight tracking. This is the
 * wordmark slot used in mastheads, footers, OOH, and anywhere the brand
 * stamps itself. Body copy and accessibility text still use the legal
 * name "LineRate" (sentence case).
 *
 * Approximated here in General Sans Semibold with tight tracking. When the
 * custom wordmark SVG is delivered, swap the span for the inline SVG and
 * keep the same className API.
 */
function Wordmark({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="wordmark"
      aria-label="LineRate"
      className={cn(
        "inline-flex select-none font-sans font-semibold uppercase leading-none tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      LINERATE
    </span>
  );
}

export { Wordmark };
