"use client";

import * as React from "react";

import { cn, slugify } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll";
import { useView, navigateToNav } from "@/components/view-store";

// Re-exported so existing importers (SiteHeader) keep their single source.
export { scrollToSection };

/*
 * Section navigation for the design system. Grouped (Foundations, Primitives,
 * Patterns) with one link per section. Active section is tracked with an
 * IntersectionObserver (scrollspy); clicking smooth-scrolls to the anchor.
 *
 * The pieces are shared so the desktop rail (SideNav, here) and the mobile
 * Contents disclosure (folded into SiteHeader) render the same list and behave
 * identically: useScrollSpy, scrollToSection, and NavList.
 *
 * Link ids are derived from labels via slugify, matching the ids the page puts
 * on each <section>.
 */

export type NavGroup = {
  group: string;
  items: string[];
};

/* Scrollspy: returns the id of the section currently in the reading zone.
   `rerun` re-attaches the observer when its value changes, needed when the
   observed sections unmount and remount (e.g. leaving and re-entering the
   system view), since the observer would otherwise hold detached nodes. */
export function useScrollSpy(ids: string[], rerun?: unknown) {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids, rerun]);

  return [active, setActive] as const;
}

export function NavList({
  groups,
  active,
  onNavigate,
}: {
  groups: NavGroup[];
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-6">
      {groups.map((g) => (
        <div key={g.group}>
          <p className="eyebrow mb-3">{g.group}</p>
          <ul className="flex flex-col gap-0.5 border-l border-border">
            {g.items.map((label) => {
              const id = slugify(label);
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                      isActive
                        ? "border-accent font-medium text-foreground"
                        : "border-transparent text-foreground-muted hover:border-border-strong hover:text-foreground"
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/* Desktop: a sticky left rail, always visible at lg+. Below lg the same list
   lives in the header's Contents disclosure (see SiteHeader). */
export function SideNav({ groups }: { groups: NavGroup[] }) {
  const ids = React.useMemo(
    () => groups.flatMap((g) => g.items.map(slugify)),
    [groups]
  );
  const view = useView();
  const [active, setActive] = useScrollSpy(ids, view);
  // In the shell view the "shell" item is active; otherwise the scrollspy id.
  const activeId = view === "shell" ? "shell" : active;
  const onNavigate = (id: string) => {
    navigateToNav(id);
    if (id !== "shell") setActive(id);
  };

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      {/* px-2/-mx-2 gives the outset focus ring room so overflow-y-auto
          doesn't clip it on the rail edges. */}
      <div className="sticky top-8 -mx-2 max-h-[calc(100vh-4rem)] overflow-y-auto px-2 py-1">
        <NavList groups={groups} active={activeId} onNavigate={onNavigate} />
      </div>
    </aside>
  );
}
