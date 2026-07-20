"use client";

import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CONCEPTS, type ConceptSlug } from "./concepts";

/*
 * Concept landing header: wordmark, a concept-switcher dropdown (toggles
 * between the three landing directions), and the CTA pair (ghost secondary +
 * primary, per the pairing rule). Frosted glass, matching the system chrome.
 */
export function ConceptNav({
  active,
  hideSwitcher = false,
}: {
  active: ConceptSlug;
  /** Drop the concept-switcher dropdown for a clean, product-style header
   *  (concept 06). The wordmark then shows on all breakpoints. */
  hideSwitcher?: boolean;
}) {
  const current = CONCEPTS.find((c) => c.slug === active) ?? CONCEPTS[0];

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 pb-5 sm:px-6">
      <div className="glass mx-auto flex h-13 max-w-6xl items-center justify-between gap-3 rounded-xl border px-4 shadow-lg sm:px-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {/* Wordmark hidden on mobile when the switcher is present (so switcher
              + CTA fit); shown on all breakpoints once the switcher is gone. */}
          <Link
            href="/concepts"
            aria-label="LineRate concepts"
            className={cn("shrink-0", !hideSwitcher && "hidden sm:block")}
          >
            <Wordmark className="h-3.5 w-auto sm:h-4" />
          </Link>

          {/* Non-modal: a modal dropdown scroll-locks the body, which breaks
              the sticky header (the whole nav vanishes) when opened mid-page. */}
          {!hideSwitcher && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`Switch concept, current: ${current.name}`}
                className="flex min-w-0 cursor-pointer items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
              >
                <span className="font-mono text-foreground-subtle">
                  {current.index}
                </span>
                <span className="truncate">{current.name}</span>
                <ChevronDown className="size-3.5 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel>Landing concepts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CONCEPTS.map((c) => (
                <DropdownMenuItem key={c.slug} asChild>
                  <Link href={`/concepts/${c.slug}`} className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-xs text-foreground-subtle">
                      {c.index}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm text-foreground">{c.name}</span>
                      <span className="text-xs text-foreground-subtle">
                        {c.note}
                      </span>
                    </span>
                    {c.slug === active && (
                      <Check className="ml-auto size-4 text-accent" />
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <a href="#how">How it works</a>
          </Button>
          <Button asChild size="sm" className="[@media(pointer:coarse)]:min-h-11">
            <a href="#contact">Request access</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
