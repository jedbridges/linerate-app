"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * LineRate Slider
 *
 * A hairline range control: a 2px track with a subtle paper-toned range fill
 * and a 12px paper thumb (bone in the reference). Focus rides the global
 * focus-visible ring. Built on the unified radix-ui Slider, controlled via
 * value / onValueChange like the other primitives.
 */
function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-border-strong"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-foreground/45"
        />
      </SliderPrimitive.Track>
      {/* 12px visual thumb, but an invisible ::before expands the pointer/touch
          target to ~44px so it's comfortable to grab on touch devices. */}
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="relative block size-3 rounded-full bg-foreground shadow-sm transition-transform before:absolute before:top-1/2 before:left-1/2 before:size-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:scale-110 focus-visible:outline-none"
      />
    </SliderPrimitive.Root>
  );
}

export { Slider };
