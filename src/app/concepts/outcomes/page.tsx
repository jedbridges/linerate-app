import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { SettlementStream } from "@/components/concepts/settlement-stream";
import { Reveal } from "@/components/concepts/reveal";
import { METRICS, PROOF_QUOTE } from "@/components/concepts/concepts";

export const metadata: Metadata = {
  title: "LineRate — Outcomes (concept 04)",
};

/*
 * Concept 04 — Outcomes. Built from client feedback on rounds 01-03:
 *  - Runtime's narrative structure, but with Neutral's denser split hero so
 *    the first screen isn't mostly negative space.
 *  - No product dashboard on the page (the UI will keep changing, and it's
 *    competitively better kept locked down). The abstract settlement stream
 *    stays as the hero visual.
 *  - Benefit-led copy: sells outcomes (cash sooner, fewer disputes, no
 *    month-end close) instead of mechanism (encoding contracts, runtimes).
 */

const BENEFITS = [
  {
    tag: "T+0",
    title: "Cash lands sooner",
    body: "Settlement clears as the deal performs, so capital stops waiting on the books.",
  },
  {
    tag: "One record",
    title: "Fewer disputes",
    body: "Both sides read the same record all cycle. Month-end holds no surprises.",
  },
  {
    tag: "Zero close",
    title: "No month-end scramble",
    body: "Your controllers verify figures instead of rebuilding them.",
  },
  {
    tag: "Audit-ready",
    title: "Auditors get receipts",
    body: "Every figure is hashed, timestamped, and one click from export.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Your agreement goes in",
    body: "We encode the terms you already negotiated: pricing, volumes, uptime, penalties.",
  },
  {
    step: "02",
    title: "It runs on live data",
    body: "LineRate tracks the deal against meters, invoices, and payments, on one shared record.",
  },
  {
    step: "03",
    title: "Money moves on time",
    body: "Settlement clears over your existing rails, with an audit trail behind every entry.",
  },
];

export default function OutcomesConcept() {
  return (
    <ConceptChrome slug="outcomes">
      {/* Hero — split layout (per feedback: Runtime's hero read as mostly
          negative space; this borrows Neutral's denser two-column shape) */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Reveal as="p" variant="load" className="eyebrow mb-6">
            Continuous settlement for infrastructure deals
          </Reveal>
          <Reveal
            as="h1"
            variant="load"
            delay={80}
            className="text-display-md font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Get paid as the deal performs.
          </Reveal>
          <Reveal
            as="p"
            variant="load"
            delay={160}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-foreground-muted"
          >
            LineRate settles your counterparty agreement continuously against
            live data. Cash lands sooner, disputes fade, and month-end goes
            away.
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

        {/* Live settlement stream: abstract proof of money moving, without
            showing product UI */}
        <Reveal variant="load" delay={320} className="lg:col-span-6">
          <SettlementStream
            className="sm:aspect-[4/3]"
            caption="Settlement in motion"
          />
        </Reveal>
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

      {/* Benefits — the value prop, stated as outcomes */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="p" className="eyebrow mb-3">
          What changes
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className="max-w-[26ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          Less waiting. Fewer disputes. No month-end close.
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium text-foreground">
                  {b.title}
                </h3>
                <span className="ledger shrink-0 whitespace-nowrap text-sm text-foreground-subtle">
                  {b.tag}
                </span>
              </div>
              <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground-muted">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works — kept short and in plain terms */}
      <section id="how">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal as="p" className="eyebrow mb-3">
            How it works
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="max-w-[22ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
          >
            Contract in. Cash out. One shared record.
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 80} className="pt-5">
                <p className="ledger text-sm text-foreground-subtle">{s.step}</p>
                <h3 className="mt-3 text-lg font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[40ch] text-base leading-relaxed text-foreground-muted">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Neutrality — the declarative moment, kept from Runtime */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <Reveal as="p" className="eyebrow mb-6">
            Structural neutrality
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
            className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-foreground-muted"
          >
            LineRate sits between both sides as the system of record and runs the
            terms for both. Neutrality is built into how it works.
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
