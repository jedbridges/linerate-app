import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * CycleIndicator
 *
 * Compact mono pill carrying cycle metadata: settlement window, time, cycle
 * number. Lives in headers, table captions, and emails. Read-only signal,
 * not interactive.
 *
 *   <CycleIndicator settlement="T+0" time="14:32 UTC" cycle="4271" />
 *   renders: T+0 · 14:32 UTC · CYCLE 4271
 */

type CycleIndicatorProps = {
  settlement?: string;
  time: string;
  cycle: string;
  className?: string;
};

function Dot() {
  return (
    <span aria-hidden className="text-border-strong">
      ·
    </span>
  );
}

export function CycleIndicator({
  settlement = "T+0",
  time,
  cycle,
  className,
}: CycleIndicatorProps) {
  return (
    <span
      data-slot="cycle-indicator"
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-2.5 py-1",
        "font-mono text-xs tracking-wide text-foreground-muted tabular-nums",
        className
      )}
    >
      <span>{settlement}</span>
      <Dot />
      <span>{time}</span>
      <Dot />
      <span className="uppercase">cycle {cycle}</span>
    </span>
  );
}
