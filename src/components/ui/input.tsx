import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate Input
 *
 * Thin border, transparent background (adapts to page or surface). Focus
 * styling comes from the global *:focus-visible amber ring; no per-component
 * ring added here. Pass mono for ledger fields (amounts, transaction IDs,
 * account references): switches to JetBrains Mono with tabular numerals.
 */
function Input({
  className,
  type,
  mono,
  ...props
}: React.ComponentProps<"input"> & { mono?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground transition-colors outline-none",
        "placeholder:text-foreground-subtle",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger-foreground",
        mono && "font-mono tabular-nums",
        className
      )}
      {...props}
    />
  );
}

export { Input };
