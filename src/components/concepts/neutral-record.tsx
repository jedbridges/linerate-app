import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/*
 * Neutral concept supporting visual: the one auditable record both sides settle
 * against. A single settlement figure, its cycle and hash, and matching
 * confirmations from operator and counterparty, to make "one record both sides
 * trust" concrete. Pure markup, token-driven for dark/light parity.
 *
 * animateIn stages the parts on scroll: the figure lands first, then each
 * party's confirmation in turn, so the sequence performs the claim rather than
 * only stating it. It composes Reveal (scroll-driven, pure CSS, visible by
 * default) instead of new keyframes, so it needs no JS and cannot strand the
 * record invisible if motion is unsupported or reduced.
 */

const CONFIRMATIONS = ["Operator confirmed", "Counterparty confirmed"] as const;

/* Wraps a part in Reveal only when animating. The static path returns the
   children bare rather than in a wrapper div, so the existing usage on the
   neutral concept page keeps byte-identical markup and its flex gap and
   space-y spacing still apply to the same elements. */
function Part({
  animate,
  delay,
  children,
}: {
  animate: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  if (!animate) return <>{children}</>;
  return (
    <Reveal delay={delay} y={10}>
      {children}
    </Reveal>
  );
}

export function NeutralRecord({
  className,
  animateIn = false,
}: {
  className?: string;
  animateIn?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex aspect-[4/3] flex-col justify-center gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6",
        className,
      )}
    >
      <p className="eyebrow text-foreground-subtle">Neutral record</p>

      <Part animate={animateIn} delay={0}>
        <div className="rounded-lg border border-accent bg-page p-4">
          <p className="eyebrow text-foreground-subtle">Cycle 4271 · T+0</p>
          <p className="ledger mt-2 text-2xl font-medium text-foreground">
            $127,400,000.00
          </p>
          <p className="mt-1 font-mono text-xs text-foreground-subtle">
            sha256 0x9f3c…a71e
          </p>
        </div>
      </Part>

      <div className="space-y-2.5">
        {CONFIRMATIONS.map((label, i) => (
          <Part key={label} animate={animateIn} delay={120 + i * 120}>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-accent">
                <Check className="size-3 text-accent" aria-hidden />
              </span>
              <span className="text-sm text-foreground">{label}</span>
            </div>
          </Part>
        ))}
      </div>
    </div>
  );
}
