import * as React from "react";

import { Button } from "@/components/ui/button";

/*
 * Marketing PricingTable
 *
 * Three tiers, neutral surfaces. The highlight tier uses a thin amber
 * accent BORDER (border-accent), never an amber fill. Body of every card
 * stays bg-surface so the page reads calm.
 */

type Tier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

type PricingTableProps = {
  eyebrow: string;
  headline: string;
  tiers: Tier[];
};

export function PricingTable({ eyebrow, headline, tiers }: PricingTableProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="max-w-[28ch] text-display-md font-medium tracking-tight text-foreground leading-tight">
        {headline}
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className={
              tier.highlight
                ? "relative rounded-lg border border-accent bg-surface p-6"
                : "rounded-lg border border-border bg-surface p-6"
            }
          >
            {tier.highlight && (
              <span className="absolute -top-2.5 left-6 bg-page px-2 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">
                Recommended
              </span>
            )}
            <p className="text-sm font-medium text-foreground">{tier.name}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="ledger text-4xl font-medium text-foreground">
                {tier.price}
              </span>
              <span className="text-sm text-foreground-subtle">
                / {tier.cadence}
              </span>
            </div>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              {tier.description}
            </p>
            <ul className="mt-6 space-y-2.5 border-t border-border-subtle pt-5">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-1 size-1.5 shrink-0 rounded-full bg-foreground-subtle"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 w-full"
              variant={tier.highlight ? "primary" : "secondary"}
            >
              {tier.cta}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
