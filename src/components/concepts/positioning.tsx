import { Check, Minus } from "lucide-react";

import { Reveal } from "./reveal";
import { POSITIONING, TRUST } from "./concepts";

/*
 * Positioning block, shared across every concept: a plain "what it is / what it
 * isn't" statement that turns the intake's banned terms into the differentiator,
 * closed by a slim trust strip. Neutral in tone so it reads correctly under
 * every concept voice.
 */
export function Positioning() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="p" className="eyebrow mb-3">
          Where LineRate fits
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className="max-w-[24ch] text-3xl font-medium tracking-snug text-foreground sm:text-4xl"
        >
          A neutral runtime, not another tool to run.
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {/* What it is */}
          <Reveal>
            <p className="eyebrow mb-5 text-foreground">What it is</p>
            <ul className="space-y-4">
              {POSITIONING.is.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-base leading-relaxed text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* What it isn't */}
          <Reveal delay={120}>
            <p className="eyebrow mb-5 text-foreground-subtle">
              What it isn&rsquo;t
            </p>
            <ul className="space-y-4">
              {POSITIONING.isnt.map((item) => (
                <li key={item} className="flex gap-3">
                  <Minus
                    className="mt-0.5 size-4 shrink-0 text-foreground-subtle"
                    aria-hidden
                  />
                  <span className="text-base leading-relaxed text-foreground-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Trust strip */}
        <Reveal
          delay={160}
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
