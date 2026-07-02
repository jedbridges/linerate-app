import type { Metadata } from "next";
import { RefreshCw, Scale, FileCheck, Banknote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConceptChrome } from "@/components/concepts/concept-chrome";
import { DashboardShell } from "@/components/patterns/dashboard-shell";
import { FLOW, PROOF_QUOTE } from "@/components/concepts/concepts";

export const metadata: Metadata = {
  title: "LineRate — Operating console (concept 03)",
};

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Continuous settlement",
    body: "Settles as the deal performs against live data, not in a month-end scramble.",
  },
  {
    icon: Scale,
    title: "Neutral system of record",
    body: "One source of truth both you and your counterparty read from and trust.",
  },
  {
    icon: FileCheck,
    title: "Full audit trail",
    body: "Every figure hashed, timestamped, and exportable. Your auditors will be pleased.",
  },
  {
    icon: Banknote,
    title: "Freed capital",
    body: "Capital that used to sit in reconciliation and disputes goes back to work.",
  },
];

/*
 * Concept 03 — Operating console. Linear-style craft: product-forward,
 * restrained, precise. Leads on operator relief (reconciliation disappears)
 * and shows the real console as proof.
 */
export default function ConsoleConcept() {
  return (
    <ConceptChrome slug="console">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 text-center sm:pt-24">
        <p className="eyebrow mb-6">An operating console for the settlement desk</p>
        <h1 className="mx-auto max-w-[18ch] text-balance text-display-md font-semibold tracking-tight text-foreground leading-[1.05]">
          The reconciliation cycle goes away.
        </h1>
        <p className="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-foreground-muted">
          LineRate runs your counterparty contracts as live software and settles
          them continuously against one neutral record. A force multiplier for
          finance and ops, an operating console for experts, not another system to
          babysit.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">Request access</Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#how">See how it works</a>
          </Button>
        </div>
      </section>

      {/* Product proof — the real console */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <DashboardShell />
      </section>

      {/* Features */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow mb-10">Built for the people who live in it</p>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title}>
                  <Icon className="size-5 text-foreground" aria-hidden />
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground-muted">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="max-w-[22ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl">
            Contracts that effectuate their own terms.
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f) => (
              <div key={f.step} className="border-t border-border pt-5">
                <p className="ledger text-sm text-foreground-subtle">{f.step}</p>
                <h3 className="mt-3 text-base font-medium text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof quote */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <figure className="mx-auto max-w-3xl">
          <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            &ldquo;{PROOF_QUOTE.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground-muted">
            {PROOF_QUOTE.attribution} · Proven in mining, live with AI compute.
          </figcaption>
        </figure>
      </section>
    </ConceptChrome>
  );
}
