"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn, slugify } from "@/lib/utils";

/*
 * SideNav
 *
 * Section navigation for the design system. Grouped (Foundations,
 * Primitives, Patterns) with one link per section. Active section is tracked
 * with an IntersectionObserver (scrollspy) and clicking smooth-scrolls to
 * the anchor.
 *
 * Responsive:
 *   - lg and up: a sticky left rail, always visible.
 *   - below lg: a sticky "Contents" disclosure that expands the same list.
 *
 * Link ids are derived from labels via slugify, matching the ids the page
 * puts on each <section>.
 */

export type NavGroup = {
  group: string;
  items: string[];
};

export function SideNav({ groups }: { groups: NavGroup[] }) {
  const ids = React.useMemo(
    () => groups.flatMap((g) => g.items.map(slugify)),
    [groups]
  );
  const [active, setActive] = React.useState<string>(ids[0] ?? "");
  const [open, setOpen] = React.useState(false);

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
  }, [ids]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
    setOpen(false);
  };

  const list = (
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
                    onClick={(e) => handleClick(e, id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                      isActive
                        ? "border-foreground font-medium text-foreground"
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

  return (
    <>
      {/* Desktop: sticky left rail */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto py-1">
          {list}
        </div>
      </aside>

      {/* Mobile: sticky disclosure */}
      <div className="sticky top-[3.25rem] z-30 -mx-6 mb-6 border-b border-border bg-page px-6 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between text-sm font-medium text-foreground"
        >
          <span className="eyebrow">Contents</span>
          <ChevronDown
            className={cn(
              "size-4 text-foreground-subtle transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>
        {open && <div className="mt-5 pb-2">{list}</div>}
      </div>
    </>
  );
}
