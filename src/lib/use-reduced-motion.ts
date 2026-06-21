"use client";

import * as React from "react";

/*
 * Reports the user's prefers-reduced-motion setting. Recharts animates via
 * JS (not CSS), so the global CSS reduced-motion kill-switch doesn't reach
 * it; components pass this into `isAnimationActive` to honor the preference.
 */
export function useReducedMotion() {
  const subscribe = React.useCallback((cb: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
