import * as React from "react";

/*
 * Marketing FeatureGrid
 *
 * Simple feature blocks. Each block has an optional mono index, a sentence-
 * case title (medium weight), and a short factual body. No icons; the
 * documentary aesthetic prefers numbered or labeled blocks over decoration.
 */

type Feature = {
  title: string;
  body: string;
};

type FeatureGridProps = {
  eyebrow: string;
  headline: string;
  features: Feature[];
};

export function FeatureGrid({ eyebrow, headline, features }: FeatureGridProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="max-w-[28ch] text-display-md font-medium tracking-tight text-foreground leading-tight">
        {headline}
      </h2>
      <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {features.map((feature, i) => (
          <article key={feature.title} className="flex gap-5">
            <p className="font-mono text-sm text-foreground-subtle tabular-nums shrink-0">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="text-lg font-medium text-foreground leading-snug">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-foreground-muted leading-relaxed">
                {feature.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
