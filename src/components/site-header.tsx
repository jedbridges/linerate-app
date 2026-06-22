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
 * toggle (the section nav lives in the left rail). Below lg a "Contents"
 * disclosure drops the section list from the bar.
 *
 * The dropdown is absolutely positioned (an overlay), NOT in the header's
 * normal flow. That is deliberate: if it grew the sticky header inline, every
 * section below would shift down while it was open, and a nav tap would scroll
 * to the shifted position, then overshoot by the menu height once it closed.
 * As an overlay it never changes layout, so taps land on the right section.
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
    // No `reveal` entrance here on purpose: a transform animation on this
    // element keeps a backdrop root alive (even at its resting value), which
    // disables the inner .glass backdrop-filter. The sticky chrome simply
    // appears on load while the content below animates in.
    <header className="sticky top-0 z-40 px-4 pt-3 pb-5 sm:px-6">
      {/* relative anchor for the absolute dropdown; the bar alone sets the
          header height, so opening the menu never reflows the page. */}
      <div className="relative mx-auto max-w-6xl">
        <div className="glass flex h-13 items-center justify-between rounded-xl border px-5 shadow-lg">
          <HomeLink />
          <div className="flex items-center gap-1">
            {/* Contents disclosure: mobile only; the rail replaces it at lg+. */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-contents"
              aria-label="Contents"
              className={cn(
                // Reads as a real button (outline + button-label type), not the
                // passive eyebrow it used to borrow. Open state stays lit.
                "flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium uppercase tracking-wide text-foreground-muted transition-[color,background-color,border-color,transform] duration-150 hover:bg-muted hover:text-foreground active:scale-[0.98] lg:hidden",
                open && "bg-muted text-foreground"
              )}
            >
              {/* Drop the word on the narrowest phones so the wordmark + toggle
                  never get clipped by the bar; the rotating chevron carries it. */}
              <span className="hidden min-[360px]:inline">Contents</span>
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Dropdown overlay. Absolute so it never grows the header. Smooth
            grid 0fr->1fr height with an opacity fade; snappy ease-out;
            reduced-motion is neutralized by the global kill-switch. inert and
            pointer-events-none when closed so its links stay out of reach. */}
        <div
          className={cn(
            "absolute inset-x-0 top-full z-10 mt-2 grid overflow-hidden rounded-xl border shadow-lg glass transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)] lg:hidden",
            open
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div
              id="mobile-contents"
              inert={!open}
              className="max-h-[70vh] overflow-y-auto p-5"
            >
              <NavList
                groups={groups}
                active={active}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
