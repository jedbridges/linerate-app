import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { Placeholder } from "@/components/concepts/placeholder";
import { Reveal } from "@/components/concepts/reveal";
import { NeutralityDiagram } from "@/components/concepts/neutrality-diagram";
import { METRICS, FLOW, PROOF_QUOTE } from "@/components/concepts/concepts";

export const metadata: Metadata = {
  title: "LineRate — Neutral ledger (concept 02)",
};

const OBJECTIONS = [
  {
    q: "Whose side are they on?",
    a: "Neither. LineRate is not party to the deal, so the record is neutral by construction, not by pledge. Both counterparties read and settle against the same figures.",
  },
  {
    q: "Is this real institutional infrastructure?",
    a: "Auditable, hashed, and timestamped end to end, backed by OpenNode. Not a crypto experiment: settlement-grade infrastructure that stands up to your auditors.",
  },
  {
    q: "Will this be more work for my team?",
    a: "A force multiplier, not another system to babysit. It runs continuously in the background; your controllers verify and export instead of rebuilding spreadsheets.",
  },
];

/*
 * Concept 02 — Neutral ledger. Column-style institutional: structured,
 * ledger-ruled, financial-rails credibility. Leads on neutrality as the
 * organizing idea, with the operator / LineRate / counterparty relationship
 * made literal.
 */
export default function NeutralConcept() {
  return (
    <ConceptChrome slug="neutral">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal as="p" variant="load" className="eyebrow mb-6">
            Neutral system of record
          </Reveal>
          <Reveal
            as="h1"
            variant="load"
            delay={80}
            className="text-display-md font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            One record both sides of the deal trust.
          </Reveal>
          <Reveal
            as="p"
            variant="load"
            delay={160}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-foreground-muted"
          >
            Between an infrastructure operator and its counterparty, LineRate is
            the neutral layer that runs the contract and settles it continuously.
            No favored party. No month-end reconciliation. One auditable source of
            truth for both.
          </Reveal>
          <Reveal
            variant="load"
            delay={240}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button size="lg">Request access</Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#how">See how it works</a>
            </Button>
          </Reveal>
        </div>

        {/* Neutrality diagram — animated to show continuous flow through the
            neutral centre */}
        <Reveal variant="load" delay={320} className="lg:col-span-5">
          <NeutralityDiagram />
        </Reveal>
      </section>

      {/* Metrics — ledger-ruled */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-border-subtle px-6 sm:grid-cols-4 sm:divide-x">
          {METRICS.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 90}
              className="py-12 sm:px-8 sm:first:pl-0"
            >
              <p className="ledger text-3xl font-medium text-foreground">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="text-3xl font-medium tracking-snug text-foreground sm:text-4xl">
              The contract, run as a ledger.
            </h2>
            <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-foreground-muted">
              Contracts that effectuate their own terms, against live data, with
              an audit trail behind every entry.
            </p>
            <div className="mt-8">
              <Placeholder label="Neutral record" aspect="aspect-[4/3]" />
            </div>
          </div>
          <ol className="lg:col-span-8">
            {FLOW.map((f, i) => (
              <Reveal
                as="li"
                key={f.step}
                delay={i * 80}
                className="flex gap-6 border-t border-border py-6 last:border-b"
              >
                <span className="ledger text-sm text-foreground-subtle">
                  {f.step}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 max-w-[60ch] text-base leading-relaxed text-foreground-muted">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Objections / trust */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow mb-10">What operators ask first</p>
          <div className="grid gap-8 lg:grid-cols-3">
            {OBJECTIONS.map((o, i) => (
              <Reveal
                key={o.q}
                delay={i * 90}
                className="border-t border-border pt-5"
              >
                <h3 className="text-lg font-medium text-foreground">{o.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground-muted">
                  {o.a}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof quote */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="figure" className="mx-auto max-w-3xl text-center">
          <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            &ldquo;{PROOF_QUOTE.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground-muted">
            {PROOF_QUOTE.attribution}
          </figcaption>
        </Reveal>
      </section>
    </ConceptChrome>
  );
}
