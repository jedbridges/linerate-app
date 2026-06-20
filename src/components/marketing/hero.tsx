import * as React from "react";

import { Button } from "@/components/ui/button";

/*
 * Marketing Hero
 *
 * Big General Sans headline (medium weight, tight tracking), short
 * factual subhead in foreground-muted. Two CTAs: primary Ink, secondary
 * outline. Eyebrow above per protocol.
 */

type HeroProps = {
  eyebrow: string;
  headline: React.ReactNode;
  subhead: string;
  primaryCta: string;
  secondaryCta?: string;
};

export function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="max-w-4xl text-display-lg font-semibold tracking-tight text-foreground leading-[1.02]">
        {headline}
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg text-foreground-muted leading-relaxed">
        {subhead}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button size="lg">{primaryCta}</Button>
        {secondaryCta && (
          <Button variant="secondary" size="lg">
            {secondaryCta}
          </Button>
        )}
      </div>
    </section>
  );
}
