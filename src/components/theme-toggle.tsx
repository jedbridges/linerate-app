"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

/*
 * Theme toggle
 *
 * Adds/removes the `.dark` class on <html> so the LineRate :root.dark layer
 * and any shadcn `dark:` utilities switch together. Reads initial state from
 * the DOM after mount to avoid SSR/CSR mismatch. Persists nothing yet; a
 * later pass can wire localStorage or next-themes.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    setIsDark(next);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {isDark ? "Light mode" : "Dark mode"}
    </Button>
  );
}
