"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { CountUpFigure } from "@/lib/use-count-up";

/*
 * Neutral concept supporting visual: the one auditable record both sides settle
 * against. A single settlement figure, its cycle and hash, and matching
 * confirmations from operator and counterparty, to make "one record both sides
 * trust" concrete. Token-driven for dark/light parity.
 *
 * animateIn stages the whole thing on scroll so the claim is performed rather
 * than stated: the record lands, the settlement figure computes, then each
 * party's tick draws itself as they sign. That order is the argument, one
 * figure arrived at first and agreed to second.
 *
 * The arm/play pattern matches MarketsGrid: an IntersectionObserver hides the
 * parts while they are still below the fold, then flips to "play" once. Under
 * reduced motion the effect bails before arming, so the record renders complete
 * and static, and the count-up returns its printed value untouched.
 */

const FIGURE = "$127,400,000.00";
const CONFIRMATIONS = ["Operator confirmed", "Counterparty confirmed"] as const;

export function NeutralRecord({
  className,
  animateIn = false,
}: {
  className?: string;
  animateIn?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [played, setPlayed] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !animateIn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The stage is written straight to the DOM rather than held in state: it is
    // presentational, it keeps the attribute out of the SSR HTML entirely (so
    // nothing can be stranded hidden if the script never runs), and it avoids
    // setting state synchronously inside an effect.
    el.dataset.recordAnim = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.recordAnim = "play";
          setPlayed(true); // in a callback, so no cascading render on mount
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animateIn]);


  return (
    <div
      ref={ref}
      className={cn(
        "flex aspect-[4/3] flex-col justify-center gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6",
        className,
      )}
    >
      <p className="eyebrow lr-nr-part text-foreground-subtle">Neutral record</p>

      <div
        style={{ ["--nr-i" as string]: 1 } as React.CSSProperties}
        className="lr-nr-part rounded-lg border border-accent bg-page p-4"
      >
        <p className="eyebrow text-foreground-subtle">Cycle 4271 · T+0</p>
        {/* .ledger already sets tnum, so no tabular-nums utility is needed to
            keep the digits from jittering while they run. The static usage
            prints the figure outright, so turning animateIn off can never leave
            a counting number behind. */}
        <p className="ledger mt-2 text-2xl font-medium text-foreground">
          {animateIn ? (
            <CountUpFigure value={FIGURE} active={played} />
          ) : (
            FIGURE
          )}
        </p>
        <p className="mt-1 font-mono text-xs text-foreground-subtle">
          sha256 0x9f3c…a71e
        </p>
      </div>

      <div className="space-y-2.5">
        {CONFIRMATIONS.map((label, i) => (
          <div
            key={label}
            style={{ ["--nr-i" as string]: 2 + i } as React.CSSProperties}
            className="lr-nr-part flex items-center gap-2.5"
          >
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-accent">
              {/* Lucide's Check is a stroked path, so the tick can draw itself
                  with stroke-dashoffset rather than just fading in. */}
              <Check className="lr-nr-check size-3 text-accent" aria-hidden />
            </span>
            <span className="text-sm text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
