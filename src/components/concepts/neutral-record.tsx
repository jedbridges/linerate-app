import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Neutral concept supporting visual: the one auditable record both sides settle
 * against. A single settlement figure, its cycle and hash, and matching
 * confirmations from operator and counterparty, to make "one record both sides
 * trust" concrete. Pure markup, token-driven for dark/light parity.
 */
export function NeutralRecord({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-[4/3] flex-col justify-center gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6",
        className,
      )}
    >
      <p className="eyebrow text-foreground-subtle">Neutral record</p>

      <div className="rounded-lg border border-accent bg-page p-4">
        <p className="eyebrow text-foreground-subtle">Cycle 4271 · T+0</p>
        <p className="ledger mt-2 text-2xl font-medium text-foreground">
          $127,400,000.00
        </p>
        <p className="mt-1 font-mono text-xs text-foreground-subtle">
          sha256 0x9f3c…a71e
        </p>
      </div>

      <div className="space-y-2.5">
        {["Operator confirmed", "Counterparty confirmed"].map((label) => (
          <div key={label} className="flex items-center gap-2.5">
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-accent">
              <Check className="size-3 text-accent" aria-hidden />
            </span>
            <span className="text-sm text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
