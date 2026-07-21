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
  const animates =
    CURRENCY.test(raw) &&
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Resolved in the initialiser so the effect never sets state synchronously.
  const [text, setText] = React.useState(animates ? "$0.00" : raw);

  React.useEffect(() => {
    if (!animates || !active) return;
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
  }, [raw, animates, active, durationMs]);

  // Until it is allowed to run, hold at zero rather than spoiling the figure.
  return animates && !active ? "$0.00" : text;
}
