import { Check } from "lucide-react";

import { Reveal } from "./reveal";
import { POSITIONING, TRUST } from "./concepts";

/*
 * Positioning block, shared across every concept: a short, positive statement
 * of what LineRate is, closed by a slim trust strip. Kept affirmative (no
 * "X, not Y" framing) so it reads cleanly under every concept voice.
 * Title and items can be overridden per concept (05 repositions the category).
 */
export function Positioning({
  title = "The neutral system of record for infrastructure deals.",
  items = POSITIONING.is,
}: {
  title?: string;
  items?: string[];
}) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="p" className="eyebrow mb-3">
          Where LineRate fits
        </Reveal>
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
