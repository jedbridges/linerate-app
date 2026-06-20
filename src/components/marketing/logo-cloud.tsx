import * as React from "react";

/*
 * Marketing LogoCloud
 *
 * Grayscale only per protocol. Logos render as text wordmarks here since
 * the real assets aren't in the repo; swap in <img> or <svg> in production.
 * Each mark sits in foreground-subtle to keep the row quiet.
 */

type LogoCloudProps = {
  eyebrow: string;
  logos: string[];
};

export function LogoCloud({ eyebrow, logos }: LogoCloudProps) {
  return (
    <section className="mx-auto max-w-5xl border-y border-border-subtle px-6 py-12">
      <p className="eyebrow mb-8 text-center">{eyebrow}</p>
      <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo) => (
          <li
            key={logo}
            className="text-center font-mono text-sm uppercase tracking-widest text-foreground-subtle"
          >
            {logo}
          </li>
        ))}
      </ul>
    </section>
  );
}
