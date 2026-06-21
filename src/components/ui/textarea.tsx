import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate Textarea
 *
 * Same border / focus model as Input. mono prop available for ledger notes.
 */
function Textarea({
  className,
  mono,
  ...props
}: React.ComponentProps<"textarea"> & { mono?: boolean }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors outline-none",
        "placeholder:text-foreground-subtle",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger-foreground",
        "field-sizing-content",
        mono && "font-mono tabular-nums",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
