import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * LineRate Alert
 *
 * Inline status surface for "this happened" messages. Three tones map to
 * the same brand-tone status palette as Badge: neutral (info / system),
 * warning (amber, attention but not failed), danger (failed, exception).
 *
 * Voice convention: what happened, why, what to do next. Use AlertTitle
 * for the "what," body text for the "why," and an inline action for the
 * "what to do." Keep it short. Treasury teams scan; they don't read.
 */

const alertVariants = cva(
  "rounded-md border p-4 text-sm",
  {
    variants: {
      tone: {
        neutral: "border-border bg-surface text-foreground",
        warning:
          "border-amber-800 bg-pending-surface text-pending-foreground dark:border-amber-700",
        danger:
          "border-danger-foreground/30 bg-danger-surface text-danger-foreground",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
);

function Alert({
  className,
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-tone={tone ?? "neutral"}
      role={tone === "danger" ? "alert" : "status"}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    />
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn("font-medium leading-snug", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn("mt-1 text-sm leading-snug opacity-80", className)}
      {...props}
    />
  );
}

function AlertActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-actions"
      className={cn("mt-3 flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertActions, alertVariants };
