"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
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
      onClick={() => window.location.assign("/")}
      aria-label="LineRate, reload home"
      className={cn(
        "inline-flex rounded-sm transition-opacity outline-none hover:opacity-70",
        className
      )}
    >
      <Wordmark className="h-4 w-auto" />
    </button>
  );
}
