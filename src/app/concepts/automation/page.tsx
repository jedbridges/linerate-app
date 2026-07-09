import type { Metadata } from "next";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { ContractModel } from "@/components/concepts/contract-model";
import { HeroPanelTilt } from "@/components/concepts/hero-panel-tilt";
import { Reveal } from "@/components/concepts/reveal";

export const metadata: Metadata = {
  title: "LineRate · Contract automation for power-intensive compute",
  description:
    "The contract automation platform for power-intensive compute. Model the agreement, run it on live data, settle continuously, with deposits reduced and every figure auditable by both parties.",
  openGraph: {
    title: "LineRate · Contract automation for power-intensive compute",
  },
};

/*
 * Concept 05, Contract automation. Copy repositioned per the 2026-07-08
 * brief: contract-first (payment is the output of a correctly modeled,
 * executing contract), operator vocabulary (floors, caps, true-ups, meter
 * reads, exposure window, deposits, close), both-parties grammar throughout,
 * and "agentic" used exactly once, grounded in auditability (step 02).
 * Layout and structure are concept 04's, unchanged, per the brief's scope.
 */

const STATS = [
  { value: "$500M+", label: "Settled to date" },
  { value: "480k", label: "MWh transacted" },
  { value: "T+0", label: "Exposure window, down from 30+ days" },
  { value: "Daily", label: "Close, verified by both parties" },
];

const BENEFITS = [
  {
    tag: "T+0",
    title: "Capital comes back",
    body: "Daily settlement compresses counterparty exposure from 30+ days to one, so the deposits shrink or go home.",
  },
  {
    tag: "Shared",
    title: "One record, two parties",
    body: "Both sides read the same contract, model, and numbers all cycle. Disputes attach to line items, not email.",
  },
  {
    tag: "Daily",
    title: "Close becomes verification",
    body: "Your controllers verify the figures the contract produced instead of rebuilding them by hand at the close.",
  },
  {
    tag: "Traceable",
    title: "Audit-grade by default",
    body: "Every figure traces to a clause, a meter read or a payout, timestamped and one click from an audit export.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "The contract becomes a model",
    body: "Pricing, floors, caps, true-ups, uptime terms, penalties: parsed into an executable model, bound to your signed agreement.",
  },
  {
    step: "02",
    title: "The model runs on live data",
    body: "Meter reads, pool payouts, invoices, and FX feed the model live. Agentic checks flag anomalies back to a clause or a cell.",
  },
  {
    step: "03",
    title: "Settlement is the output",
    body: "Money moves over your existing rails, with amount, timing, and a full audit trail all derived from the executing contract.",
  },
];

// Illustrative pending confirmation (brief: confirm with Sky before publish).
const QUOTE = {
  quote:
    "Both of us settle against one record we both trust. Our close is a verification step now, and disputes resolve inside the platform instead of over email.",
  attribution: "Treasury lead, a venture-backed AI infrastructure operator",
};

export default function AutomationConcept() {
  return (
    <ConceptChrome
      slug="automation"
      motion="snappy"
      ctaPanel
      ctaEmail
      hideEyebrows
      positioningTitle="The neutral system of record for power-intensive compute."
      positioningItems={[
        "One record both sides settle against",
        "Executes the contract continuously against live data",
        "Settlement-grade and auditable end to end",
        "Built for controllers, CFOs, and ops leads",
      ]}
      ctaBody="Tell us what reconciliation costs you, in hours, in deposits, in disputes. Qualified operators get a working session with the team."
    >
      {/* Hero: split layout carried over from concept 04 */}
      <section className="mx-auto grid max-w-6xl gap-x-12 gap-y-16 px-6 pt-20 pb-24 sm:pt-28 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:pt-32 lg:pb-28">
        <div className="lg:col-span-6">
          <Reveal
            as="h1"
            variant="load"
            className="text-balance text-display-md font-semibold tracking-[-0.01em] text-foreground leading-[1.12]"
          >
            Turn complex contracts into systems that execute themselves.
          </Reveal>
          <Reveal
            as="p"
            variant="load"
            delay={160}
            className="mt-7 max-w-[50ch] text-lg leading-relaxed text-foreground-muted"
          >
            LineRate models your agreement (floors, caps, true-ups, profit
            splits) and runs it against live meter, pool, and invoice data.
            Both parties see the same numbers. Settlement is the output.
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

        {/* Contract-first hero visual: the contract executing into figures,
            not settlement on its own (which read as payment-first). It owns its
            own load intro (the ledger assembles itself), so no outer Reveal.
            HeroPanelTilt rests it angled inward and leans it toward the cursor. */}
        <HeroPanelTilt className="lg:col-span-6">
          <ContractModel className="sm:aspect-[4/3]" animateIn />
        </HeroPanelTilt>
      </section>

      {/* Proof stats */}
      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 lg:grid-cols-4">
          {STATS.map((m, i) => (
            <Reveal key={m.label} delay={i * 90}>
              <p className="ledger text-4xl font-medium text-foreground">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What changes */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal
          as="h2"
          className="max-w-[30ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          Capital comes back. Disputes get a home. Close becomes verification.
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="pt-5">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h3 className="text-lg font-medium text-foreground">
                  {b.title}
                </h3>
                <span className="pill pill--accent shrink-0">{b.tag}</span>
              </div>
              <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-foreground-muted">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal
            as="h2"
            className="max-w-[22ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
          >
            The contract becomes the system.
          </Reveal>
          <div className="relative mt-14">
            {/* Animated flow rail connecting the steps (contract -> runs ->
                settles): horizontal through the number row on sm+, vertical
                down the left when the steps stack. The numbers sit as nodes,
                masking the rail behind a page-coloured halo. */}
            <span
              aria-hidden
              className="lr-flow-rail absolute inset-x-0 top-[12px] hidden h-0.5 sm:block"
            />
            <span
              aria-hidden
              className="lr-flow-rail-v absolute bottom-3 left-[3px] top-2 w-0.5 sm:hidden"
            />
            <div className="grid gap-x-8 gap-y-12 pl-7 sm:grid-cols-3 sm:pl-0">
              {STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 80}>
                  <p className="ledger relative inline-block bg-page pr-3 text-sm text-foreground-subtle">
                    {s.step}
                  </p>
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
        </div>
      </section>

      {/* Neutrality */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <Reveal
            as="h2"
            className="mx-auto max-w-[24ch] text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]"
          >
            We are not a party to your deal.
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-foreground-muted"
          >
            LineRate runs the terms for both sides as the system of record. Our
            fees are symmetric: we earn the same whichever way a cycle breaks.
            Both parties can trust the math.
          </Reveal>
        </div>
      </section>

      {/* Proof quote */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="figure" className="mx-auto max-w-3xl text-center">
          {/* Neutral avatar placeholder: the quote is anonymized, so a
              silhouette stands in until an attributed headshot can replace it. */}
          <span
            aria-hidden
            className="mx-auto mb-8 flex size-14 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-foreground-subtle"
          >
            <User className="size-6" />
          </span>
          <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            &ldquo;{QUOTE.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground-muted">
            {QUOTE.attribution}
          </figcaption>
          <p className="mt-10 text-sm text-foreground-subtle">
            Proven in mining, live with AI compute. Backed by OpenNode.
          </p>
        </Reveal>
      </section>
    </ConceptChrome>
  );
}
