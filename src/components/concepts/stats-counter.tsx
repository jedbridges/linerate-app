"use client";

import * as React from "react";
import NumberFlow from "@number-flow/react";

/*
 * Concept 06 proof stats that count into place when the section scrolls into
 * view. Each figure starts at 0 and NumberFlow rolls it to the target on
 * intersection, with a small per-stat stagger so they land in sequence.
 * Reduced motion shows the final values immediately.
 */

const STATS: { n: number; prefix?: string; suffix: string; label: string }[] = [
  { n: 500, prefix: "$", suffix: "M+", label: "Processed annually" },
  { n: 700, suffix: " MW", label: "Energy and critical compute settled" },
  { n: 100, suffix: "s", label: "Hours returned to finance teams" },
];

export function StatsCounter() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [values, setValues] = React.useState<number[]>(() =>
    STATS.map(() => 0),
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValues(STATS.map((s) => s.n));
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        STATS.forEach((s, i) => {
          timers.push(
            setTimeout(() => {
              setValues((v) => {
                const next = [...v];
                next[i] = s.n;
                return next;
              });
            }, i * 140),
          );
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3"
    >
      {STATS.map((s, i) => (
        <div key={s.label}>
          <p className="ledger text-4xl font-medium text-foreground">
            <NumberFlow
              value={values[i]}
              prefix={s.prefix}
              suffix={s.suffix}
              spinTiming={{
                duration: 1000,
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              willChange
            />
          </p>
          <p className="mt-2 text-sm text-foreground-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
