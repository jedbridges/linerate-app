/*
 * Landing-page concept metadata + shared content, grounded in the LineRate
 * website intake. Three concepts, one per reference brand / "need to believe"
 * pillar: Runtime (Anduril conviction), Neutral ledger (Column institutional),
 * Operating console (Linear craft). Rails-agnostic, neutrality-first,
 * institutional. Figures marked "placeholder" are awaiting real numbers.
 */

export type ConceptSlug = "runtime" | "neutral" | "console";

export const CONCEPTS: {
  slug: ConceptSlug;
  index: string;
  name: string;
  note: string;
}[] = [
  { slug: "runtime", index: "01", name: "Runtime", note: "Declarative conviction" },
  { slug: "neutral", index: "02", name: "Neutral ledger", note: "Institutional rails" },
  { slug: "console", index: "03", name: "Operating console", note: "Product craft" },
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
    "LineRate settles our compute agreements continuously against one record we both trust. Month-end reconciliation, and the disputes that came with it, is gone.",
  // Velaura, pending naming permission; anonymized fallback per intake.
  attribution: "Treasury lead, a venture-backed AI infrastructure operator",
};

/* Contract in → encoded as a runtime → runs continuously → agreed settlements
   + audit trail → executes over pluggable rails. */
export const FLOW = [
  {
    step: "01",
    title: "Encode the contract",
    body: "Your agreement goes in and becomes a runtime, the terms as live software, not a document to interpret later.",
  },
  {
    step: "02",
    title: "Run it continuously",
    body: "It runs against live operational and payment data, settling as the deal performs instead of waiting for month-end.",
  },
  {
    step: "03",
    title: "Agree on one record",
    body: "Both sides read the same neutral source of truth, with a full audit trail behind every figure.",
  },
  {
    step: "04",
    title: "Settle over any rail",
    body: "Settlement executes over pluggable rails. Capital that used to sit in reconciliation is freed.",
  },
];
