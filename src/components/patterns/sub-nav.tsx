"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * SubNav
 *
 * Secondary navigation within a section: a row of underline links sharing the
 * Tabs vocabulary (active gets border-foreground), but semantically a nav, not
 * a tab panel switcher. Optional mono counts ride alongside labels.
 */

export type SubNavItem = { label: string; count?: number };

export function SubNav({
  items,
  defaultIndex = 0,
}: {
  items: SubNavItem[];
  defaultIndex?: number;
}) {
  const [active, setActive] = React.useState(defaultIndex);

  return (
    <nav className="flex items-center gap-6 overflow-x-auto border-b border-border">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(i)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 whitespace-nowrap border-b-2 py-3 text-sm transition-colors",
              isActive
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-foreground-muted hover:text-foreground"
            )}
          >
            {item.label}
            {item.count != null && (
              <span
                className={cn(
                  "font-mono text-xs tabular-nums",
                  isActive ? "text-foreground-muted" : "text-foreground-subtle"
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
