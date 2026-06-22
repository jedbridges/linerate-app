"use client";

import * as React from "react";

import { cn, withBase } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";

/*
 * HomeLink
 *
 * The wordmark in the top nav. Clicking it navigates home and forces a full
 * page reload (window.location.assign), per product intent: the logo is a
 * "reset to the top, fresh load" affordance, not a client-side route swap.
 */
export function HomeLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.location.assign(withBase("/"))}
      aria-label="LineRate, reload home"
      className={cn(
        "inline-flex cursor-pointer rounded-sm outline-none",
        "transition-opacity duration-100 ease-out hover:opacity-60",
        className
      )}
    >
      <Wordmark className="h-3.5 w-auto sm:h-4" />
    </button>
  );
}
