/*
 * Landing-page concept metadata + shared content, grounded in the LineRate
 * website intake. Three concepts, one per reference brand / "need to believe"
 * pillar: Runtime (Anduril conviction), Neutral ledger (Column institutional),
 * Operating console (Linear craft). Rails-agnostic, neutrality-first,
 * institutional. Figures marked "placeholder" are awaiting real numbers.
 */

export type ConceptSlug =
  | "runtime"
  | "neutral"
  | "console"
  | "outcomes"
  | "automation"
  | "overview";

export const CONCEPTS: {
  slug: ConceptSlug;
  index: string;
  name: string;
  note: string;
}[] = [
  { slug: "runtime", index: "01", name: "Runtime", note: "Declarative conviction" },
  { slug: "neutral", index: "02", name: "Neutral ledger", note: "Institutional rails" },
  { slug: "console", index: "03", name: "Operating console", note: "Product craft" },
  { slug: "outcomes", index: "04", name: "Outcomes", note: "Benefit-led" },
  { slug: "automation", index: "05", name: "Contract automation", note: "Contract-first repositioning" },
  { slug: "overview", index: "06", name: "Overview", note: "Broader positioning" },
];

/* Proof metrics. $500M+ is real (mining); MWh is the intended lead stat,
   figure pending — placeholder shown. */
export const METRICS = [
  { value: "$500M+", label: "Settled to date" },
  { value: "480k", label: "MWh transacted", note: "placeholder" },
  { value: "T+0", label: "Continuous settlement" },
  { value: "Zero", label: "Month-end reconciliations" },
];

export const PROOF_QUOTE = {
  quote:
    "LineRate settles our compute agreements continuously against one record we both trust. Month-end reconciliation is gone, and the disputes went with it.",
  // Velaura, pending naming permission; anonymized fallback per intake.
  attribution: "Treasury lead, a venture-backed AI infrastructure operator",
};

/* Positioning: a short, positive statement of what LineRate is. */
export const POSITIONING = {
  is: [
    "One record both sides settle against",
    "Runs the contract continuously against live data",
    "Settlement-grade and auditable end to end",
    "Built for finance and ops teams",
  ],
};

/* Slim credibility markers for the trust strip. "$500M+" and OpenNode are
   real; the rest are proof points from the intake. */
export const TRUST = [
  "Backed by OpenNode",
  "$500M+ settled in bitcoin mining",
  "Live with AI compute",
  "Auditable by design",
];

/* Contract in → encoded as a runtime → runs continuously → agreed settlements
   + audit trail → executes over pluggable rails. */
export const FLOW = [
  {
    step: "01",
    title: "Encode the contract",
    body: "Your agreement becomes live software, with the terms you negotiated.",
  },
  {
    step: "02",
    title: "Run it continuously",
    body: "It runs against live operational and payment data, settling as the deal performs.",
  },
  {
    step: "03",
    title: "Agree on one record",
    body: "Both sides read the same source of truth, with an audit trail behind every figure.",
  },
  {
    step: "04",
    title: "Settle over any rail",
    body: "Settlement clears over your existing rails. Capital stops sitting in reconciliation.",
  },
];
