import * as React from "react";

/*
 * Marketing StatRow
 *
 * Counter-style stat blocks. CLAUDE.md permits sans numerals for marketing
 * counter blocks (unlike product ledger figures, which must be mono). Tight
 * tracking, medium weight, generous spacing.
 */

type Stat = {
  value: string;
  label: string;
};

type StatRowProps = {
  eyebrow?: string;
  stats: Stat[];
  /* Methodology / source line. Strong claims should say where they came from. */
  footnote?: string;
};

export function StatRow({ eyebrow, stats, footnote }: StatRowProps) {
  return (
    <section className="mx-auto max-w-5xl border-y border-border-subtle px-6 py-12">
      {eyebrow && <p className="eyebrow mb-8">{eyebrow}</p>}
      <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-12">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-sm text-foreground-subtle">{stat.label}</dt>
            <dd className="mt-2 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      {footnote && (
        <p className="mt-10 max-w-[70ch] text-sm text-foreground-subtle">
          {footnote}
        </p>
      )}
    </section>
  );
}
