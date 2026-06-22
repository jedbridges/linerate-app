"use client";

import * as React from "react";

import { scrollToSection } from "@/lib/scroll";

/*
 * Which view the main column shows. "system" is the long, scroll-spied design
 * system; "shell" swaps the column for the dashboard demo as its own view.
 *
 * A tiny external store (like the theme toggle) so the nav (top bar + rail)
 * and the main column stay in sync without prop-drilling through the server
 * page. SSR snapshot is "system" so hydration matches the default render.
 */

export type View = "system" | "shell";

let current: View = "system";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useView(): View {
  return React.useSyncExternalStore(
    subscribe,
    () => current,
    () => "system" as View
  );
}

export function setView(next: View) {
  if (current === next) return;
  current = next;
  for (const l of listeners) l();
}

/*
 * Nav-click router. "Shell" enters the dashboard view (scrolled to top); any
 * other id returns to the system view and scrolls to that section, waiting a
 * frame for the sections to remount when leaving the shell view.
 */
export function navigateToNav(id: string) {
  if (id === "shell") {
    setView("shell");
    history.replaceState(null, "", "#shell");
    window.scrollTo({ top: 0 });
    return;
  }
  if (current !== "system") {
    setView("system");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => scrollToSection(id))
    );
  } else {
    scrollToSection(id);
  }
}
