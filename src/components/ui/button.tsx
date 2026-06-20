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
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap " +
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
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
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
