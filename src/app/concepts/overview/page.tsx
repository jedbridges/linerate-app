import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { ContractModel } from "@/components/concepts/contract-model";
import { HeroPanelTilt } from "@/components/concepts/hero-panel-tilt";
import { MarketsGrid } from "@/components/concepts/markets-grid";
import { StatsCounter } from "@/components/concepts/stats-counter";
import { Reveal } from "@/components/concepts/reveal";

export const metadata: Metadata = {
  title: "LineRate · Overview",
  description:
    "LineRate turns complex agreements into self-executing systems that integrate every input, calculate each party's obligations, and coordinate settlement in one neutral, auditable platform.",
  openGraph: { title: "LineRate · Overview" },
};

/*
 * Concept 06 — Overview. Built from the client's "Linerate Overview" content
 * draft (broader positioning: hosting, energy, critical IT, GPU — not just
 * compute). Reuses concept 05's hero (HeroPanelTilt + ContractModel), amber
 * CTA panel, and email capture, and adds two new signature moments: a markets
 * icon grid and a vertical animated process timeline for the 5 steps. Client
 * copy is kept verbatim; the doc's "Linerate" renders as "LineRate" per the
 * agreed naming.
 */

const CHANGES = [
  {
    title: "One shared calculation",
    body: "Both parties work from the same contract model, inputs, and settlement record.",
  },
  {
    title: "Close becomes verification",
    body: "Finance teams review what the contract produced instead of rebuilding the calculation from scratch.",
  },
  {
    title: "Disputes stay attached to the work",
    body: "Questions, evidence, and resolutions live beside the relevant input or line item.",
  },
  {
    title: "Every result is auditable",
    body: "Trace each obligation back to the contract term, source data, model version, and approval history.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Build the canonical model",
    body: "LineRate converts the agreement into a shared calculation model covering pricing, floors, caps, true-ups, fees, penalties, and settlement rules.",
  },
  {
    step: "02",
    title: "Connect the live inputs",
    body: "Meter data, energy usage, infrastructure telemetry, payouts, invoices, market data, and other contract inputs flow into the model automatically.",
  },
  {
    step: "03",
    title: "Review, amend & approve",
    body: "Both parties can inspect the logic, propose changes, approve new versions, and preserve a complete history.",
  },
  {
    step: "04",
    title: "Calculate & coordinate settlement",
    body: "The model continuously determines each party's obligations and routes approved settlement through connected bank accounts and crypto addresses.",
  },
  {
    step: "05",
    title: "Reconcile & audit",
    body: "Every result traces back to the governing term, source data, model version, and approval record.",
  },
];

// Illustrative quote (avatar is a placeholder headshot; confirm before publish).
const QUOTE = {
  quote:
    "Before LineRate, both teams rebuilt the settlement every month from separate data and spreadsheets. Disputes took weeks to resolve, and reconciliation decisions were scattered across constantly changing email threads. Now we review one shared record, resolve exceptions in the platform, and settle with confidence.",
  attribution: "Finance lead, critical infrastructure operator",
};

export default function OverviewConcept() {
  return (
    <ConceptChrome
      slug="overview"
      motion="snappy"
      hideEyebrows
      ctaPanel
      ctaEmail
      ctaShader
      ctaTitle="Give your contract a job."
      ctaBody="See how LineRate can turn your agreements into systems that calculate, reconcile, and settle themselves."
      positioningTitle="The system of record for complex agreements."
      positioningFeature
      positioningItems={[
        "One model, jointly approved",
        "Every change versioned and traceable",
        "Live inputs continuously integrated",
        "Every calculation tied back to the agreement",
        "Automatic settlement over preferred payment rails",
        "Disputes resolved beside the line item",
      ]}
      positioningTrust={[
        "Backed by OpenNode",
        "$500M+ processed annually",
        "Live across hosting, energy & compute",
        "Auditable by design",
      ]}
      footerTagline="Neutral by design. Auditable by default. Always settling."
    >
      {/* Hero: split layout carried over from concept 05 */}
      <section className="mx-auto grid max-w-6xl gap-x-12 gap-y-16 px-6 pt-20 pb-24 sm:pt-28 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:pt-32 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal
            as="h1"
            variant="load"
            className="text-balance text-[clamp(2.25rem,1.5rem+2.4vw,3.25rem)] font-semibold tracking-[-0.01em] text-foreground leading-[1.08]"
          >
            Your contracts should settle themselves.
          </Reveal>
          <Reveal
            as="p"
            variant="load"
            delay={160}
            className="mt-7 max-w-[54ch] text-lg leading-relaxed text-foreground-muted"
          >
            LineRate turns complex agreements into self-executing systems that
            integrate every input, calculate each party&rsquo;s obligations, and
            coordinate settlement in one neutral, auditable platform.
          </Reveal>
          <Reveal
            variant="load"
            delay={240}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#contact">Request access</a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#how">How it works</a>
            </Button>
          </Reveal>
        </div>

        {/* Contract-first hero visual: the contract executing into figures.
            HeroPanelTilt rests it angled inward and leans it toward the cursor. */}
        <HeroPanelTilt className="lg:col-span-5">
          <ContractModel className="sm:aspect-[4/3]" animateIn />
        </HeroPanelTilt>
      </section>

      {/* Proof stats — "One agreement. One model. One record." */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal
          as="h2"
          className="max-w-[24ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          One agreement. One model. One record.
        </Reveal>
        <StatsCounter />
      </section>

      {/* Markets — signature moment: broader positioning across four markets */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal
          as="h2"
          className="max-w-[24ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          Built for agreements that run on live data.
        </Reveal>
        <MarketsGrid />
      </section>

      {/* What changes */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal
          as="h2"
          className="max-w-[30ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          Settlement becomes a continuous process, not a monthly project.
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {CHANGES.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="pt-5">
              <h3 className="text-lg font-medium text-foreground">{c.title}</h3>
              <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground-muted">
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works — signature moment: vertical animated process timeline */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal
          as="h2"
          className="max-w-[22ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          The contract becomes the system.
        </Reveal>
        <div className="relative mt-14 max-w-3xl">
          {/* Animated dotted rail threading the numbered nodes (contract ->
              runs -> settles). Node circles mask it as they cross. */}
          <span
            aria-hidden
            className="lr-flow-rail-v absolute top-5 bottom-5 left-[19px] w-0.5"
          />
          <ol className="space-y-9">
            {STEPS.map((s, i) => (
              <Reveal
                as="li"
                key={s.step}
                delay={i * 70}
                className="flex gap-5"
              >
                {/* Translucent + blurred node so the flowing rail reads as
                    movement behind the digit. */}
                <span className="ledger relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-page/40 text-sm text-foreground backdrop-blur-[3px]">
                  {s.step}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-medium text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 max-w-[52ch] text-base leading-relaxed text-foreground-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Neutrality */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <Reveal
            as="h2"
            className="mx-auto max-w-[26ch] text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]"
          >
            Built for both parties and jointly controlled.
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mx-auto mt-6 max-w-[58ch] text-base leading-relaxed text-foreground-muted"
          >
            LineRate is not a counterparty to your agreement. It provides the
            shared model, data, approvals, and record both parties operate
            against. Our platform is neutral to the outcome and accountable to
            the agreement.
          </Reveal>
        </div>
      </section>

      {/* Proof quote */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="figure" className="mx-auto max-w-3xl text-center">
          {/* Square avatar. Placeholder headshot until an attributed photo can
              replace it; the quote is still illustrative. */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/concepts/quote-avatar.jpg`}
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-8 size-14 rounded-md border border-border object-cover"
          />
          <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            &ldquo;{QUOTE.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground-muted">
            {QUOTE.attribution}
          </figcaption>
        </Reveal>
      </section>
    </ConceptChrome>
  );
}
