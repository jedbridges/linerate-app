import * as React from "react";

/*
 * Marketing PullQuote
 *
 * The one human moment on an otherwise institutional page. A single
 * customer voice, rendered large in General Sans, with a mono attribution
 * line (name, title, company). No headshot; the documentary aesthetic
 * keeps the focus on the words. Use exactly once per page.
 */

type PullQuoteProps = {
  quote: string;
  name: string;
  title: string;
};

export function PullQuote({ quote, name, title }: PullQuoteProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <figure>
        <blockquote className="max-w-[24ch] text-display-sm font-medium tracking-tight text-foreground leading-tight">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8 font-mono text-sm uppercase tracking-widest text-foreground-subtle">
          {name}, {title}
        </figcaption>
      </figure>
    </section>
  );
}
