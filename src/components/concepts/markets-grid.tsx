"use client";

import { HardDrives, Lightning, Buildings, Cpu } from "@phosphor-icons/react";

import { Reveal } from "./reveal";

/*
 * Markets grid for concept 06. Two-tone (duotone) Phosphor icons tinted with
 * the brand amber via currentColor — the duotone weight renders a translucent
 * secondary layer over the solid primary, so a single amber colour reads as
 * two tones. Client component because Phosphor icons read React context.
 */
const MARKETS = [
  {
    Icon: HardDrives,
    title: "Hosting services",
    body: "Between hosting service providers and crypto miners.",
  },
  {
    Icon: Lightning,
    title: "Energy supply",
    body: "Electricity and gas agreements between suppliers and offtakers.",
  },
  {
    Icon: Buildings,
    title: "Critical IT infrastructure",
    body: "Critical IT lease agreements between operators and tenants.",
  },
  {
    Icon: Cpu,
    title: "GPU capacity",
    body: "Rental and consumption agreements between compute lessors and their customers.",
  },
];

export function MarketsGrid() {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2">
      {MARKETS.map((m, i) => (
        <Reveal key={m.title} delay={i * 80} className="flex">
          <div className="group flex flex-1 flex-col rounded-xl border border-border bg-surface p-6 transition-[background-color,border-color,transform] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:border-border-strong hover:bg-muted">
            <m.Icon
              weight="duotone"
              className="size-8 text-accent"
              aria-hidden
            />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              {m.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-foreground-muted">
              {m.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
