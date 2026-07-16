import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Wordmark } from "@/components/wordmark";
import { Reveal } from "@/components/concepts/reveal";
import { CONCEPTS } from "@/components/concepts/concepts";

export const metadata: Metadata = {
  title: "LineRate · Landing concepts",
};

const TAGLINES: Record<string, string> = {
  runtime: "Contracts that run themselves.",
  neutral: "One record both sides of the deal trust.",
  console: "The reconciliation cycle goes away.",
  outcomes: "Get paid as the deal performs.",
  automation: "Turn complex contracts into systems that execute themselves.",
  overview: "Your contracts should settle themselves.",
};

/*
 * Index of the landing-page concepts. Each concept also carries a header
 * dropdown to switch between them once you're inside.
 */
export default function ConceptsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal as="div" variant="load">
        <Wordmark className="h-4 w-auto" />
      </Reveal>
      <Reveal as="p" variant="load" delay={60} className="eyebrow mt-12 mb-3">
        Landing concepts
      </Reveal>
      <Reveal
        as="h1"
        variant="load"
        delay={120}
        className="max-w-[22ch] text-display-sm font-semibold tracking-tight text-foreground leading-[1.08]"
      >
        Six directions for the LineRate site.
      </Reveal>
      <Reveal
        as="p"
        variant="load"
        delay={180}
        className="mt-5 max-w-[60ch] text-base leading-relaxed text-foreground-muted"
      >
        Same brand and design system, six angles on the story. Open one and use
        the header dropdown to flip between them. 04, 05, and 06 fold in
        successive rounds of client feedback.
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONCEPTS.map((c, i) => (
          <Reveal
            key={c.slug}
            variant="load"
            delay={260 + i * 90}
            className="flex"
          >
            <Link
              href={`/concepts/${c.slug}`}
              className="group flex flex-1 flex-col rounded-xl border border-border bg-surface p-6 transition-[background-color,border-color,transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:border-border-strong hover:bg-muted hover:shadow-lg"
            >
              <span className="ledger text-sm text-foreground-subtle">
                {c.index}
              </span>
              <span className="mt-3 text-lg font-medium text-foreground">
                {c.name}
              </span>
              <span className="mt-1 text-sm text-foreground-subtle">
                {c.note}
              </span>
              <span className="mt-6 max-w-[22ch] text-balance text-xl font-medium tracking-snug text-foreground">
                {TAGLINES[c.slug]}
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors group-hover:text-foreground">
                View concept
                <ArrowRight className="size-4 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
