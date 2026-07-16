import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { InteractiveGrid } from "./interactive-grid";
import { POSITIONING, TRUST } from "./concepts";

/*
 * Positioning block, shared across every concept: a short, positive statement
 * of what LineRate is, closed by a slim trust strip. Kept affirmative (no
 * "X, not Y" framing) so it reads cleanly under every concept voice.
 * Title and items can be overridden per concept (05 repositions the category).
 * `feature` (06) makes it a full-bleed, taller band with a cursor-reactive
 * line grid behind it, for more dominance on the page.
 */
export function Positioning({
  title = "The neutral system of record for infrastructure deals.",
  items = POSITIONING.is,
  hideEyebrow = false,
  feature = false,
}: {
  title?: string;
  items?: string[];
  hideEyebrow?: boolean;
  feature?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative",
        feature && "overflow-hidden border-y border-border-subtle",
      )}
    >
      {feature && <InteractiveGrid className="absolute inset-0 -z-10" />}
      <div
        className={cn(
          "relative mx-auto max-w-6xl px-6",
          feature ? "py-32 sm:py-44" : "py-24",
        )}
      >
        {!hideEyebrow && (
          <Reveal as="p" className="eyebrow mb-3">
            Where LineRate fits
          </Reveal>
        )}
        <Reveal
          as="h2"
          delay={80}
          className="max-w-[22ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          {title}
        </Reveal>

        <Reveal delay={140} className="mt-12">
          <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex gap-3">
                {/* Box one line-height tall so the check optically centers on
                    the first line (not the block), even if the item wraps. */}
                <span className="flex h-[1.625rem] shrink-0 items-center">
                  <Check className="size-4 text-accent" aria-hidden />
                </span>
                <span className="text-base leading-relaxed text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Trust strip */}
        <Reveal
          delay={200}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 pt-8"
        >
          {TRUST.map((t) => (
            <span key={t} className="eyebrow text-foreground-subtle">
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
