"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * LineRate ToggleGroup
 *
 * A compact segmented control: a bordered track holding options, the pressed
 * option lifted onto bg-muted. Used for small either/or or preset choices (e.g.
 * the line-angle presets on the effects page). Built on the unified radix-ui
 * ToggleGroup; drive it controlled via type="single" + value / onValueChange.
 */
function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border p-0.5",
        className,
      )}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-[5px] px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors select-none hover:text-foreground focus-visible:outline-none data-[state=on]:bg-muted data-[state=on]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
