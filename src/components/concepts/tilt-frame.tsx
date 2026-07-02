import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * A 9:16 portrait frame that holds scrollable content, tilted back toward the
 * horizon and snapping upright as it scrolls into place. All motion is pure CSS
 * (see the .lr-tilt / .lr-frame utilities in globals.css): the un-tilt rides a
 * view() timeline, and where scroll timelines or motion are unavailable the
 * frame simply rests flat and upright.
 */
export function TiltFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("lr-tilt-scene", className)}>
      <div className="lr-tilt">
        <div className="lr-frame">
          <div className="lr-frame-scroll">{children}</div>
        </div>
      </div>
    </div>
  );
}
