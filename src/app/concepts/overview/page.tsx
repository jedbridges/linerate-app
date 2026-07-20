import type { Metadata } from "next";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { ContractModel } from "@/components/concepts/contract-model";
import { HeroPanelTilt } from "@/components/concepts/hero-panel-tilt";
import { HowItWorks } from "@/components/concepts/how-it-works";
import { MarketsGrid } from "@/components/concepts/markets-grid";
import { PreviewGlow } from "@/components/concepts/preview-glow";
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

// Illustrative quote (avatar is a placeholder headshot; confirm before publish).
// The body reads in a muted gray with the load-bearing phrases (the concrete
// pain, then the payoff) lifted to full-strength foreground so the eye lands
// on the transformation. `em` marks a segment for the white highlight.
const QUOTE = {
  parts: [
    { t: "Before LineRate, both teams " },
    { t: "rebuilt the settlement every month", em: true },
    { t: " from separate data and spreadsheets. " },
    { t: "Disputes took weeks to resolve", em: true },
    {
      t: ", and reconciliation decisions were scattered across constantly changing email threads. Now we ",
    },
    {
      t: "review one shared record, resolve exceptions in the platform, and settle with confidence",
      em: true,
    },
    { t: "." },
  ] as { t: string; em?: boolean }[],
  attribution: "Finance lead, critical infrastructure operator",
};

export default function OverviewConcept() {
  return (
    <ConceptChrome
      slug="overview"
      motion="snappy"
      hideEyebrows
      hideSwitcher
      intro
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
            HeroPanelTilt rests it angled inward and leans it toward the cursor;
            a blurred amber orb sits behind it (offset upper-right, parallax). */}
        <div className="relative lg:col-span-5">
          <PreviewGlow parallax />
          <HeroPanelTilt>
            <ContractModel className="lr-card-lift sm:aspect-[4/3]" animateIn />
          </HeroPanelTilt>
        </div>
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

      {/* How it works — signature moment: scroll-driven walkthrough where a
          sticky, angled product-UI panel swaps as each step becomes active. */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal
          as="h2"
          className="max-w-[22ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          The contract becomes the system.
        </Reveal>
        <HowItWorks />
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
          <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground-muted sm:text-3xl">
            &ldquo;
            {QUOTE.parts.map((p, i) =>
              p.em ? (
                <span key={i} className="text-foreground">
                  {p.t}
                </span>
              ) : (
                <React.Fragment key={i}>{p.t}</React.Fragment>
              ),
            )}
            &rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground-muted">
            {QUOTE.attribution}
          </figcaption>
        </Reveal>
      </section>
    </ConceptChrome>
  );
}
