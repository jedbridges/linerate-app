import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate Skeleton
 *
 * Loading placeholder. Uses bg-muted with a subtle pulse. Compose multiple
 * Skeletons to mirror the shape of the eventual content (heading bar,
 * paragraph bars, table rows). Prefer skeletons over spinners; spinners
 * feel anxious, skeletons feel intentional.
 */
function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("animate-pulse rounded-sm bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
