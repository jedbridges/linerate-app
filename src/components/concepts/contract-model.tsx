import { cn } from "@/lib/utils";

/*
 * Concept 05 signature visual: the contract, executing. Where the settlement
 * stream shows money moving (settlement-first), this shows the mechanism the
 * repositioning leads with: each negotiated clause reads live data and
 * computes a line item, and the figures net to the cycle settlement at the
 * bottom. It carries the brief's three ideas at a glance, contract-first
 * ("the contract becomes the system"), auditable ("every figure traces to a
 * clause, a meter read, or a payout"), and neutral (one shared record).
 *
 * Pure CSS/SVG, token-driven for dark/light parity. A scan band sweeps the
 * rows to read as continuous execution; it stops under the global
 * reduced-motion cap. The line items are illustrative, in the same register
 * as the settlement stream's figures. The amounts sum to the net exactly, so
 * a controller reading closely finds it ties out.
 */

const ROWS = [
  {
    clause: "Energy floor",
    term: "$0.065/kWh",
    input: "4.21M kWh",
    amount: "$273,650",
  },
  {
    clause: "Uptime true-up",
    term: "≥ 98%",
    input: "99.3%",
    amount: "+$18,400",
    accent: true,
  },
  {
    clause: "Hosting fee",
    term: "42.1 MW",
    input: "live",
    amount: "$126,300",
  },
  {
    clause: "Profit split",
    term: "70 / 30",
    input: "pool $412k",
    amount: "+$41,200",
    accent: true,
  },
];

const NET = "$459,550";

export function ContractModel({
  className,
  caption = "Contract, executing",
}: {
  className?: string;
  caption?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-square w-full flex-col overflow-hidden rounded-xl border border-border bg-surface sm:aspect-[16/9]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(var(--stream-grid) 1px, transparent 1px), linear-gradient(90deg, var(--stream-grid) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        ["--stream-grid" as string]:
          "color-mix(in oklab, var(--border) 45%, transparent)",
      }}
    >
      {/* Top bar: live pill + the signed-contract hash the model is bound to */}
      <div className="flex items-center justify-between px-5 pt-4 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-page/60 px-3 py-1">
          <span className="relative flex size-1.5">
            <span
              className="absolute inline-flex size-full rounded-full bg-accent opacity-75"
              style={{ animation: "lr-pulse 2.4s ease-in-out infinite" }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span className="eyebrow text-foreground">Executing</span>
        </span>
        <span className="ledger text-xs text-foreground-subtle">
          Bound to 0x9f4c
        </span>
      </div>

      {/* Ledger: one row per clause, each reading live data into an amount.
          A scan line sweeps down to read as continuous execution. */}
      <div className="relative min-h-0 flex-1 px-5 py-3 sm:px-6">
        {/* execution scan line: a thin amber playhead that sweeps down the
            rows so the ledger reads as continuously executing. Off-canvas at
            rest and under reduced motion, so it never parks as a visible band. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 h-px sm:inset-x-5"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 70%, transparent), transparent)",
            boxShadow:
              "0 0 10px 1px color-mix(in oklab, var(--accent) 45%, transparent)",
            opacity: 0,
            animation: "lr-scan 5.6s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        />

        <div className="relative flex h-full flex-col justify-evenly gap-px">
          {ROWS.map((r) => (
            <div
              key={r.clause}
              className="flex items-baseline justify-between gap-3 py-1.5"
            >
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="truncate text-sm font-medium text-foreground">
                  {r.clause}
                </span>
                <span className="hidden shrink-0 font-mono text-[11px] text-foreground-subtle sm:inline">
                  {r.term}
                </span>
              </span>
              <span className="flex shrink-0 items-baseline gap-3">
                <span className="hidden font-mono text-[11px] text-foreground-muted sm:inline">
                  {r.input}
                </span>
                <span
                  className={cn(
                    "ledger text-sm tabular-nums",
                    r.accent ? "text-accent" : "text-foreground",
                  )}
                >
                  {r.amount}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Net settlement: the derived output */}
      <div className="flex items-baseline justify-between border-t border-border px-5 py-3 sm:px-6">
        <span className="eyebrow text-foreground-subtle">Net settlement</span>
        <span className="ledger text-xl font-medium tabular-nums text-foreground">
          {NET}
        </span>
      </div>

      {/* Caption */}
      <div className="flex items-center justify-between px-5 pb-4 sm:px-6">
        <span className="eyebrow text-foreground-subtle">{caption}</span>
        <span className="ledger text-sm text-foreground-subtle">Cycle 4271</span>
      </div>
    </div>
  );
}
