"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

/*
 * Theme toggle
 *
 * Adds/removes the `.dark` class on <html> so the LineRate :root.dark layer
 * and any shadcn `dark:` utilities switch together. Dark is the canonical
 * default (set in layout); this flips to the light inverse.
 *
 * Reads the current theme via useSyncExternalStore so there's no
 * setState-in-effect and no hydration flash: the server snapshot is the
 * dark default, and the client subscribes to class changes on <html>.
 */

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const isDark = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => true // server + first client render: dark is the canonical default
  );

  const toggle = () => {
    // Read live DOM state so the toggle is correct regardless of React
    // render timing (the snapshot updates async via the observer).
    const root = document.documentElement;
    root.classList.toggle("dark", !root.classList.contains("dark"));
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {isDark ? "Light mode" : "Dark mode"}
    </Button>
  );
}
