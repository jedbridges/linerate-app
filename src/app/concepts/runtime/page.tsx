import type { Metadata } from "next";

import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { SettlementStream } from "@/components/concepts/settlement-stream";
import { DitherField } from "@/components/concepts/dither-field";
import { Reveal } from "@/components/concepts/reveal";
import { METRICS, FLOW, PROOF_QUOTE } from "@/components/concepts/concepts";

export const metadata: Metadata = {
  title: "LineRate — Runtime (concept 01)",
};

/*
 * Concept 01 — Runtime. Anduril-style conviction: declarative, cinematic,
 * type-forward. Leads on the core idea (contracts that run themselves) with
 * big statements and generous negative space.
 */
export default function RuntimeConcept() {
  return (
    <ConceptChrome slug="runtime">
      {/* Hero — the headline fills the space above a full-width image, both
          sharing the first viewport below the sticky nav. The copy is pinned to
          the bottom of its area so it sits just above the image. */}
      <div className="flex min-h-[calc(100svh-5.25rem)] flex-col">
        <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pb-14 pt-16">
          <Reveal
            as="h1"
            variant="load"
            className="whitespace-nowrap text-[clamp(1.5rem,6vw,4.5rem)] font-semibold tracking-tight text-foreground leading-[1.02]"
          >
            Contracts that run themselves.
          </Reveal>
        </section>

        {/* Full-width image anchored to the bottom of the viewport. Drop the
            source at public/concepts/hero-runtime.jpg. */}
        <Reveal variant="load" delay={340}>
          <DitherField className="h-[clamp(18rem,42vw,32rem)]" />
        </Reveal>
      </div>

      {/* Live illustration overlapping the image's bottom edge by 48px. */}
      <section className="relative pb-20">
        <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
          <Reveal variant="load" delay={420} y={24}>
            <SettlementStream />
          </Reveal>
        </div>
      </section>

      {/* Proof metrics */}
      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 90}>
              <p className="ledger text-4xl font-medium text-foreground">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="p" className="eyebrow mb-3">
          How it works
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className="max-w-[20ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          A contract in. Continuous settlement out.
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {FLOW.map((f, i) => (
            <Reveal key={f.step} delay={i * 80} className="pt-5">
              <p className="ledger text-sm text-foreground-subtle">{f.step}</p>
              <h3 className="mt-3 text-lg font-medium text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground-muted">
                {f.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Neutrality — the declarative moment */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <Reveal as="p" className="eyebrow mb-6">
            Structural, not a promise
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mx-auto max-w-[24ch] text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]"
          >
            We are not a party to your deal.
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mx-auto mt-6 max-w-[56ch] text-base leading-relaxed text-foreground-muted"
          >
            Not a host, a miner, or a broker. LineRate sits between the two sides
            as the neutral system of record and runs the terms for both. Neutrality
            is how the system is built, not a policy you have to trust.
          </Reveal>
        </div>
      </section>

      {/* Proof quote */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="figure" className="mx-auto max-w-3xl">
          <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            &ldquo;{PROOF_QUOTE.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground-muted">
            {PROOF_QUOTE.attribution}
          </figcaption>
          <p className="mt-10 text-sm text-foreground-subtle">
            Proven in mining, live with AI compute. Backed by OpenNode.
          </p>
        </Reveal>
      </section>
    </ConceptChrome>
  );
}
