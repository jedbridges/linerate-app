import * as React from "react";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Placeholder image slot for the concepts, a bordered surface with the
 * hairline-grid motif and a quiet label, standing in for product shots /
 * renders until real assets land.
 */
export function Placeholder({
  label = "Product visual",
  className,
  aspect = "aspect-[16/10]",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-surface",
        aspect,
        className
      )}
    >
      {/* the LineRate hairline grid, faint */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: "72px 100%",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 text-foreground-subtle">
        <ImageIcon className="size-6" aria-hidden />
        <span className="eyebrow">{label}</span>
      </div>
    </div>
  );
}
