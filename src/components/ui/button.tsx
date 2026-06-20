import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * LineRate Button
 *
 * Three variants only: primary (Ink), secondary (outline), ghost. No amber,
 * no destructive, no link. Three sizes: sm, md (default), lg.
 *
 * Focus styling lives in the global *:focus-visible rule (amber ring), so
 * this component does not add per-component ring/border on focus. Hover for
 * secondary and ghost lands on bg-muted, never bg-accent (which is amber).
 *
 * Every color references a semantic token. Change tokens, the button follows.
 */
const buttonVariants = cva(
  // Labels are uppercase with wide tracking for an editorial, audit-grade
  // feel. Uppercase reads larger, so sizes step down a notch versus the
  // sentence-case equivalent and padding opens up to give the tracking room.
  "inline-flex items-center justify-center gap-2 rounded-md font-medium uppercase tracking-wide leading-none whitespace-nowrap " +
    "transition-colors outline-none select-none " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary:
          "border border-foreground bg-transparent text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-8 gap-1.5 px-3.5 text-xs",
        md: "h-10 gap-2 px-5 text-xs",
        lg: "h-12 gap-2.5 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "primary"}
      data-size={size ?? "md"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
