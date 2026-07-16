import * as React from "react";

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
  animateIn = false,
}: {
  className?: string;
  caption?: string;
  /** Play the load intro: the frame rises, then rows stamp in one by one, so
   *  the ledger assembles itself. Off by default; concept 05's hero opts in. */
  animateIn?: boolean;
}) {
  // Intro stagger index (header 0, rows 1-4, net 5, caption 6). Returns the
  // --cm-i style only when the intro is on, so it's a no-op otherwise.
  const cmStyle = (i: number): React.CSSProperties | undefined =>
    animateIn ? ({ ["--cm-i" as string]: i } as React.CSSProperties) : undefined;

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full flex-col overflow-hidden rounded-xl border border-border bg-surface sm:aspect-[16/9]",
        animateIn && "lr-cm-anim",
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
      <div
        className={cn(
          "flex items-center justify-between px-5 pt-4 sm:px-6",
          animateIn && "lr-cm-part",
        )}
        style={cmStyle(0)}
      >
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
        {/* execution scan: a soft amber highlight that sweeps down the rows so
            the ledger reads as continuously executing. A gradiated glow (bright
            core fading out in every direction) plus a crisp centre line for
            definition. Both are off-canvas and invisible at rest and under
            reduced motion, so nothing parks as a visible band. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-14 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(72% 130% at 50% 50%, color-mix(in oklab, var(--accent) 28%, transparent) 0%, color-mix(in oklab, var(--accent) 8%, transparent) 45%, transparent 78%)",
            // feather the top and bottom so the sweep fades in/out vertically
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 32%, #000 68%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, #000 32%, #000 68%, transparent)",
            opacity: 0,
            animation: "lr-scan 5.6s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 h-2 -translate-y-1/2 sm:inset-x-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 80%, transparent) 50%, transparent)",
            // feather the core streak vertically so it has no hard edge
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000, transparent)",
            maskImage: "linear-gradient(to bottom, transparent, #000, transparent)",
            opacity: 0,
            animation: "lr-scan 5.6s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        />

        <div className="relative flex h-full flex-col justify-evenly gap-px">
          {ROWS.map((r, i) => (
            <div
              key={r.clause}
              className={cn(
                "flex items-baseline justify-between gap-3 py-1.5",
                animateIn && "lr-cm-part",
              )}
              style={cmStyle(i + 1)}
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

      {/* Net settlement: the derived output. An amber bar under the amount
          marks it as the total and draws the eye. */}
      <div
        className={cn(
          "flex items-end justify-between border-t border-border px-5 py-3 sm:px-6",
          animateIn && "lr-cm-part",
        )}
        style={cmStyle(5)}
      >
        <span className="eyebrow text-foreground-subtle">Net settlement</span>
        <span className="flex flex-col items-end gap-1.5">
          <span className="ledger text-xl font-medium tabular-nums text-foreground">
            {NET}
          </span>
          <span
            aria-hidden
            className="h-1.5 w-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--accent) 25%, transparent), var(--accent))",
              boxShadow:
                "0 0 12px 1px color-mix(in oklab, var(--accent) 45%, transparent)",
            }}
          />
        </span>
      </div>

      {/* Caption */}
      <div
        className={cn(
          "flex items-center justify-between px-5 pb-4 sm:px-6",
          animateIn && "lr-cm-part",
        )}
        style={cmStyle(6)}
      >
        <span className="eyebrow text-foreground-subtle">{caption}</span>
        <span className="ledger text-sm text-foreground-subtle">Cycle 4271</span>
      </div>
    </div>
  );
}
