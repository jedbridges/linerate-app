import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { ConceptNav } from "./concept-nav";
import { Reveal } from "./reveal";
import { Positioning } from "./positioning";
import { RequestAccessForm } from "./request-access-form";
import { CtaShader } from "./cta-shader";
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
  positioningTrust,
  footerTagline,
  ctaTitle = "Put your contracts on a neutral runtime.",
  ctaBody = "Tell us where reconciliation costs you. Qualified operators get a working session with the team.",
  motion,
  ctaPanel = false,
  ctaEmail = false,
  hideEyebrows = false,
  positioningFeature = false,
  ctaShader = false,
  hideSwitcher = false,
}: {
  slug: ConceptSlug;
  children: React.ReactNode;
  positioningTitle?: string;
  positioningItems?: string[];
  /** Override the positioning trust strip. Concept 06 broadens it beyond the
   *  bitcoin-mining framing. Defaults to the shared TRUST. */
  positioningTrust?: string[];
  /** Replace the two footer credibility markers with a single tagline
   *  sentence (concept 06: "Neutral by design. Auditable by default. Always
   *  settling."). Defaults to the shared markers. */
  footerTagline?: string;
  /** Heading for the closing CTA. Defaults to the shared line; concept 06
   *  overrides it ("Give your contract a job."). */
  ctaTitle?: string;
  ctaBody?: string;
  /** Opt a concept's main content into a snappier scroll-reveal (see the
   *  main[data-motion="snappy"] rules in globals.css). */
  motion?: "snappy";
  /** Wrap the closing CTA in an amber-tinted panel so it stands off the page
   *  (concept 05). Others keep the plain centred CTA. */
  ctaPanel?: boolean;
  /** Replace the CTA's two buttons with an inline email capture (concept 05). */
  ctaEmail?: boolean;
  /** Drop the small section eyebrow labels (positioning + CTA) for a cleaner,
   *  less cluttered read (concept 05). */
  hideEyebrows?: boolean;
  /** Render the positioning block as a full-bleed, taller feature band with a
   *  cursor-reactive line grid behind it (concept 06). */
  positioningFeature?: boolean;
  /** Enlarge the CTA panel and drop a subtle cursor-reactive line shader
   *  behind it (concept 06). Requires ctaPanel. */
  ctaShader?: boolean;
  /** Hide the concept-switcher dropdown for a clean product header
   *  (concept 06). */
  hideSwitcher?: boolean;
}) {
  return (
    <>
      <ConceptNav active={slug} hideSwitcher={hideSwitcher} />
      <main data-motion={motion}>{children}</main>

      {/* Shared positioning: what LineRate is + trust strip */}
      <Positioning
        title={positioningTitle}
        items={positioningItems}
        trust={positioningTrust}
        hideEyebrow={hideEyebrows}
        feature={positioningFeature}
      />

      {/* Closing CTA. Concept 06 (ctaShader) spans a full-bleed amber band;
          others keep the centred rounded panel / plain CTA. */}
      <section
        id="contact"
        className={cn(
          ctaShader ? "" : "mx-auto max-w-6xl px-6 py-24 sm:py-32",
        )}
      >
        <Reveal
          className={cn(
            "relative text-center",
            ctaPanel && "lr-cta-amber overflow-hidden",
            ctaShader
              ? "px-6 py-24 sm:py-32"
              : ctaPanel
                ? "mx-auto max-w-4xl rounded-3xl px-6 py-16 sm:px-16 sm:py-20"
                : "mx-auto max-w-3xl",
          )}
        >
          {ctaShader && <CtaShader />}
          <div
            className={cn("relative z-10", ctaShader && "mx-auto max-w-3xl")}
          >
            {!hideEyebrows && <p className="eyebrow mb-4">Request access</p>}
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-foreground-muted">
              {ctaBody}
            </p>
            {ctaEmail ? (
              <RequestAccessForm />
            ) : (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg">Request access</Button>
                <Button asChild variant="ghost" size="lg">
                  <a href="#how">How it works</a>
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Footer — its own full-bleed band, lifted a shade off the page with a
          hairline top border so it reads as a distinct element. */}
      <footer className="mt-16 border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Wordmark className="h-3.5 w-auto" />
            <span className="text-xs text-foreground-subtle">by OpenNode</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground-subtle">
            {footerTagline ? (
              <span>{footerTagline}</span>
            ) : (
              <>
                <span>Auditable by design</span>
                <span>Neutral system of record</span>
              </>
            )}
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            {footerTagline && (
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
            )}
            <span>© LineRate</span>
          </div>
        </div>
      </footer>
    </>
  );
}
