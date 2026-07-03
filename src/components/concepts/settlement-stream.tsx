import { cn } from "@/lib/utils";

/*
 * Runtime concept signature visual: a live settlement stream. A baseline with
 * counterparty settlement events strung along it and amber value tokens riding
 * left to right, to make "settles continuously as the deal performs" legible
 * and cinematic, distinct from the console concept's full dashboard.
 *
 * Pure CSS/SVG, token-driven for dark/light parity. The travelling tokens loop
 * on the document timeline and stop under reduced motion (global kill-switch).
 */

const EVENTS = [
  { party: "Acme Hosting", amount: "$42.1M" },
  { party: "Northwind", amount: "$18.6M" },
  { party: "Cascade DC", amount: "$8.9M" },
  { party: "Meridian", amount: "$1.9M" },
];

export function SettlementStream({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-surface sm:aspect-[16/9]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(var(--stream-grid) 1px, transparent 1px), linear-gradient(90deg, var(--stream-grid) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        // faint hairline grid, theme-aware
        ["--stream-grid" as string]:
          "color-mix(in oklab, var(--border) 45%, transparent)",
      }}
    >
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-page/60 px-3 py-1">
          <span className="relative flex size-1.5">
            <span
              className="absolute inline-flex size-full rounded-full bg-accent opacity-75"
              style={{ animation: "lr-pulse 2.4s ease-in-out infinite" }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span className="eyebrow text-foreground">Live</span>
        </span>
        <span className="eyebrow text-foreground-subtle">
          T+0 · Continuous
        </span>
      </div>

      {/* Baseline with events + travelling tokens */}
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 sm:inset-x-12">
        <div className="relative h-px bg-border-strong">
          {/* travelling value tokens */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden
              className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-accent"
              style={{
                boxShadow:
                  "0 0 8px 1px color-mix(in oklab, var(--accent) 60%, transparent)",
                animation: `lr-flow-x 4.2s linear ${i * 1.4}s infinite both`,
              }}
            />
          ))}

          {/* settlement event nodes */}
          {EVENTS.map((e, i) => {
            const left = `${((i + 0.5) / EVENTS.length) * 100}%`;
            return (
              <div
                key={e.party}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left }}
              >
                <span className="block size-2 rounded-full border border-accent bg-page" />
                {/* Party names are too many to fit across a phone; keep the
                    amounts (below), which don't collide. */}
                <span className="absolute -top-1 left-1/2 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap font-mono text-[11px] text-foreground sm:block">
                  {e.party}
                </span>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap font-mono text-[11px] text-foreground-subtle">
                  {e.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 sm:px-6">
        <span className="eyebrow text-foreground-subtle">
          Settling as the deal performs
        </span>
        <span className="ledger text-sm text-foreground-subtle">
          Cycle 4271
        </span>
      </div>
    </div>
  );
}
