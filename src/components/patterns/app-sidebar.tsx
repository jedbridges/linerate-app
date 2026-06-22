import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * AppSidebar
 *
 * The product's persistent left rail (distinct from this site's doc scrollspy
 * rail). Grouped destinations with a leading icon and an optional mono count.
 * The active item lifts onto bg-muted with an amber left indicator, the one
 * place amber marks "you are here" in the shell.
 */

export type SidebarItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  count?: number;
  tone?: "default" | "danger";
};

export type SidebarGroup = { label: string; items: SidebarItem[] };

export function AppSidebar({ groups }: { groups: SidebarGroup[] }) {
  return (
    <nav className="flex w-60 shrink-0 flex-col gap-6 border-r border-border bg-surface p-3">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="eyebrow mb-1 px-3">{group.label}</p>
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#navigation"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-md py-2 pr-3 pl-3 text-sm transition-colors",
                  item.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-foreground-muted hover:bg-muted hover:text-foreground"
                )}
              >
                {item.active && (
                  <span
                    aria-hidden
                    className="absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full bg-accent"
                  />
                )}
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.count != null && (
                  <span
                    className={cn(
                      "ml-auto font-mono text-xs tabular-nums",
                      item.tone === "danger"
                        ? "text-danger-foreground"
                        : "text-foreground-subtle"
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
