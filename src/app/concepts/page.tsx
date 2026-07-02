import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Wordmark } from "@/components/wordmark";
import { CONCEPTS } from "@/components/concepts/concepts";

export const metadata: Metadata = {
  title: "LineRate — Landing concepts",
};

const TAGLINES: Record<string, string> = {
  runtime: "Contracts that run themselves.",
  neutral: "One record both sides of the deal trust.",
  console: "The reconciliation cycle goes away.",
};

/*
 * Index of the three landing-page concepts. Each concept also carries a
 * header dropdown to switch between them once you're inside.
 */
export default function ConceptsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Wordmark className="h-4 w-auto" />
      <p className="eyebrow mt-12 mb-3">Landing concepts</p>
      <h1 className="max-w-[22ch] text-display-sm font-semibold tracking-tight text-foreground leading-[1.08]">
        Three directions for the LineRate site.
      </h1>
      <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-foreground-muted">
        Same brand and design system, three angles on the story. Open one and use
        the header dropdown to flip between them.
      </p>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {CONCEPTS.map((c) => (
          <Link
            key={c.slug}
            href={`/concepts/${c.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-muted"
          >
            <span className="ledger text-sm text-foreground-subtle">
              {c.index}
            </span>
            <span className="mt-3 text-lg font-medium text-foreground">
              {c.name}
            </span>
            <span className="mt-1 text-sm text-foreground-subtle">{c.note}</span>
            <span className="mt-6 max-w-[22ch] text-balance text-xl font-medium tracking-snug text-foreground">
              {TAGLINES[c.slug]}
            </span>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors group-hover:text-foreground">
              View concept
              <ArrowRight className="size-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
