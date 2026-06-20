"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Theme toggle
 *
 * Icon-led switch between the canonical dark surface and the light inverse.
 * Toggles `.dark` on <html> so the LineRate :root.dark layer and shadcn
 * `dark:` utilities switch together. Reads state via useSyncExternalStore
 * (no setState-in-effect, no hydration flash; server snapshot is dark).
 *
 * The two icons are stacked; on theme change they crossfade and rotate so
 * the swap feels mechanical and intentional rather than abrupt.
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
    const root = document.documentElement;
    root.classList.toggle("dark", !root.classList.contains("dark"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-md",
        "text-foreground-muted transition-colors outline-none",
        "hover:bg-muted hover:text-foreground active:scale-95"
      )}
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  );
}
