"use client";

import * as React from "react";

/*
 * Counts a currency string up to its printed value, so a settlement figure
 * computes in front of the reader instead of just appearing. Shared by the
 * markets settlement slip and the neutral record; both want the same easing and
 * formatting, and a second copy would be the kind of drift that ends with two
 * subtly different money animations on one page.
 *
 * Only plain dollar amounts animate. Anything else (a volume, a hash, a
 * percentage) returns unchanged, as does everything under reduced motion, so
 * callers can pass any value without guarding.
 *
 * Pair with tabular figures: the digits change width otherwise and the row
 * jitters for the whole run.
 */
const CURRENCY = /^\$[\d,]+\.\d{2}$/;

export function useCountUp(raw: string, active = true, durationMs = 700) {
  /* Starts at the printed value on BOTH server and client. Branching the
     initial state on `typeof window` desynchronised the two renders and threw a
     hydration text mismatch (React #418) wherever a figure is server-rendered.
     The first rAF tick lands on zero before the browser paints, so the count
     still begins from nothing without a flash of the final figure. */
  const [text, setText] = React.useState(raw);

  React.useEffect(() => {
    const animates =
      CURRENCY.test(raw) &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animates || !active) {
      // Non-animating cases keep showing the real figure.
      return;
    }
    const target = parseFloat(raw.replace(/[$,]/g, ""));
    const fmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      // ease-out-quart: fast start, long settle, so the final digits land softly
      const eased = 1 - Math.pow(1 - p, 4);
      setText(fmt.format(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [raw, active, durationMs]);

  return text;
}

/*
 * Renders a counting figure safely for assistive tech.
 *
 * The animating string must not BE the element's text: a screen reader reaching
 * it mid-run reads a meaningless intermediate value, and one reading the markets
 * dialog as it opens gets "$0.00" for the cycle settlement, which is wrong
 * rather than merely noisy. The visible digits are therefore aria-hidden and the
 * true figure is exposed once, silently, beside them.
 *
 * Wrapped in a component rather than left to call sites so the safe pairing
 * cannot be forgotten wherever a figure counts.
 */
export function CountUpFigure({
  value,
  active = true,
  durationMs,
}: {
  value: string;
  active?: boolean;
  durationMs?: number;
}) {
  const shown = useCountUp(value, active, durationMs);
  return (
    <>
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </>
  );
}
