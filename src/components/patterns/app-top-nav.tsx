import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";

/*
 * AppTopNav
 *
 * The product shell's main navigation bar (distinct from this site's own doc
 * header). Wordmark, primary destinations with an active underline, and a
 * right cluster: a search affordance with a keyboard hint and an account chip.
 *
 * Active uses a foreground underline rather than amber: amber stays reserved
 * for the side rail's active indicator, so the two never compete.
 */

export type TopNavItem = { label: string; active?: boolean };

export function AppTopNav({
  items,
  account = "JB",
}: {
  items: TopNavItem[];
  account?: string;
}) {
  return (
    <header className="flex h-14 items-center gap-6 border-b border-border bg-surface px-4 sm:px-5">
      <Wordmark className="h-4 w-auto shrink-0" />

      <nav className="hidden h-full items-center gap-1 md:flex">
        {items.map((item) => (
          <a
            key={item.label}
            href="#navigation"
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "inline-flex h-full items-center border-b-2 px-3 text-sm transition-colors",
              item.active
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-foreground-muted hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="hidden cursor-pointer items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-foreground-subtle transition-colors hover:bg-muted hover:text-foreground sm:flex"
        >
          <Search className="size-4" />
          <span className="text-sm">Search</span>
          <kbd className="rounded border border-border-strong px-1.5 font-mono text-[10px] leading-5 text-foreground-subtle">
            ⌘K
          </kbd>
        </button>
        <span
          aria-label="Account"
          className="inline-flex size-8 items-center justify-center rounded-full bg-muted font-mono text-xs font-medium text-foreground"
        >
          {account}
        </span>
      </div>
    </header>
  );
}
