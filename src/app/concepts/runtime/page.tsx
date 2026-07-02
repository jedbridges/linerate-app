import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { Placeholder } from "@/components/concepts/placeholder";
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
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
        <p className="eyebrow mb-6">The runtime for infrastructure contracts</p>
        <h1 className="max-w-[16ch] text-display-lg font-semibold tracking-tight text-foreground leading-[1.02]">
          Contracts that run themselves.
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-foreground-muted">
          LineRate turns the agreement between infrastructure operators and their
          counterparties into live software, running it continuously against real
          operational and payment data. Settlement happens as the deal performs.
          The month-end reconciliation cycle goes away.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button size="lg">Request access</Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#how">See how it works</a>
          </Button>
        </div>

        <div className="mt-16">
          <Placeholder label="Runtime — live settlement" aspect="aspect-[16/9]" />
        </div>
      </section>

      {/* Proof metrics */}
      <section className="border-y border-border-subtle">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label}>
              <p className="ledger text-4xl font-medium text-foreground">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-3">How it works</p>
        <h2 className="max-w-[20ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl">
          A contract in. Continuous settlement out.
        </h2>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {FLOW.map((f) => (
            <div key={f.step} className="border-t border-border pt-5">
              <p className="ledger text-sm text-foreground-subtle">{f.step}</p>
              <h3 className="mt-3 text-lg font-medium text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground-muted">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Neutrality — the declarative moment */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <p className="eyebrow mb-6">Structural, not a promise</p>
          <p className="mx-auto max-w-[24ch] text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]">
            We are not a party to your deal.
          </p>
          <p className="mx-auto mt-6 max-w-[56ch] text-base leading-relaxed text-foreground-muted">
            Not a host, a miner, or a broker. LineRate sits between the two sides
            as the neutral system of record and runs the terms for both. Neutrality
            is how the system is built, not a policy you have to trust.
          </p>
        </div>
      </section>

      {/* Proof quote */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <figure className="mx-auto max-w-3xl">
          <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            &ldquo;{PROOF_QUOTE.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground-muted">
            {PROOF_QUOTE.attribution}
          </figcaption>
          <p className="mt-10 text-sm text-foreground-subtle">
            Proven in mining, live with AI compute. Backed by OpenNode.
          </p>
        </figure>
      </section>
    </ConceptChrome>
  );
}
