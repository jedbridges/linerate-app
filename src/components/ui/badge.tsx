import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * LineRate Badge
 *
 * Reskinned as the LineRate pill: sans, uppercase, wide tracking, small
 * rounded corners (mono is reserved for numbers and data). Collapsed from
 * nova's six variants down to four that
 * map to status semantics. success / pending / danger reuse the global
 * .pill--* classes; neutral is the default fallback.
 *
 * No color variants beyond status. If you need a brand chip, use the
 * neutral variant and the system stays calm.
 */
const badgeVariants = cva(
  "pill inline-flex items-center gap-1.5 whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-foreground-muted",
        success: "pill--success",
        pending: "pill--pending",
        danger: "pill--danger",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp
      data-slot="badge"
      data-variant={variant ?? "neutral"}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
