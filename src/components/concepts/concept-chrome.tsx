import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { ConceptNav } from "./concept-nav";
import { Reveal } from "./reveal";
import { Positioning } from "./positioning";
import { type ConceptSlug } from "./concepts";

/*
 * Shared shell for every concept: the switcher nav on top, the page content,
 * then a common closing CTA (#contact) and footer so the concepts stay
 * consistent below the fold. Copy above the fold is where they differ.
 * Positioning and CTA copy can be overridden per concept (05 repositions).
 */
export function ConceptChrome({
  slug,
  children,
  positioningTitle,
  positioningItems,
  ctaBody = "Tell us where reconciliation costs you. Qualified operators get a working session with the team.",
  motion,
  ctaPanel = false,
}: {
  slug: ConceptSlug;
  children: React.ReactNode;
  positioningTitle?: string;
  positioningItems?: string[];
  ctaBody?: string;
  /** Opt a concept's main content into a snappier scroll-reveal (see the
   *  main[data-motion="snappy"] rules in globals.css). */
  motion?: "snappy";
  /** Wrap the closing CTA in an amber-tinted panel so it stands off the page
   *  (concept 05). Others keep the plain centred CTA. */
  ctaPanel?: boolean;
}) {
  return (
    <>
      <ConceptNav active={slug} />
      <main data-motion={motion}>{children}</main>

      {/* Shared positioning: what LineRate is + trust strip */}
      <Positioning title={positioningTitle} items={positioningItems} />

      {/* Closing CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal
          className={cn(
            "mx-auto text-center",
            ctaPanel
              ? "lr-cta-amber max-w-4xl overflow-hidden rounded-3xl px-6 py-16 sm:px-16 sm:py-20"
              : "max-w-3xl",
          )}
        >
          <p className="eyebrow mb-4">Request access</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Put your contracts on a neutral runtime.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-foreground-muted">
            {ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">Request access</Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#how">How it works</a>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Wordmark className="h-3.5 w-auto" />
            <span className="text-xs text-foreground-subtle">by OpenNode</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground-subtle">
            <span>Auditable by design</span>
            <span>Neutral system of record</span>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <span>© LineRate</span>
          </div>
        </div>
      </footer>
    </>
  );
}
