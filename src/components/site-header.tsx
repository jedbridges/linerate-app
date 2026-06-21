"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn, slugify } from "@/lib/utils";
import { HomeLink } from "@/components/home-link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavList,
  useScrollSpy,
  scrollToSection,
  type NavGroup,
} from "@/components/side-nav";

/*
 * SiteHeader
 *
 * The floating, frosted top bar. On lg+ it's just the wordmark and theme
 * toggle (the section nav lives in the left rail). Below lg the section nav is
 * folded into this same glass element as a "Contents" disclosure: tapping it
 * expands the list inside the pill, so there's one cohesive floating header
 * instead of two stacked strips.
 */
export function SiteHeader({ groups }: { groups: NavGroup[] }) {
  const ids = React.useMemo(
    () => groups.flatMap((g) => g.items.map(slugify)),
    [groups]
  );
  const [active, setActive] = useScrollSpy(ids);
  const [open, setOpen] = React.useState(false);

  const onNavigate = (id: string) => {
    if (scrollToSection(id)) setActive(id);
    setOpen(false);
  };

  return (
    <header className="reveal sticky top-0 z-40 px-4 pt-3 pb-5 sm:px-6">
      {/* overflow-hidden keeps the expanded list clipped to the rounded pill. */}
      <div className="glass mx-auto max-w-6xl overflow-hidden rounded-xl border shadow-lg">
        <div className="flex h-13 items-center justify-between px-5">
          <HomeLink />
          <div className="flex items-center gap-1">
            {/* Contents disclosure: mobile only; the rail replaces it at lg+. */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-contents"
              className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-2 transition-colors hover:bg-muted lg:hidden"
            >
              <span className="eyebrow">Contents</span>
              <ChevronDown
                className={cn(
                  "size-4 text-foreground-subtle transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {open && (
          <div
            id="mobile-contents"
            className="max-h-[70vh] overflow-y-auto border-t border-border-subtle px-5 pt-5 pb-6 lg:hidden"
          >
            <NavList groups={groups} active={active} onNavigate={onNavigate} />
          </div>
        )}
      </div>
    </header>
  );
}
