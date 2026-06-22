"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Pagination
 *
 * Pager for long ledger tables. A mono range readout ("1-25 of 412") on the
 * left; prev/next plus page numbers on the right. Numbers are mono + tabular
 * so the control doesn't reflow as you page. The current page is filled
 * (inverse), the rest are quiet until hover. Ends disable at the boundaries.
 */

type PaginationProps = {
  page: number; // 1-based
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

/* First, last, current, and current's neighbors; gaps become an ellipsis. */
function pageList(page: number, pageCount: number): (number | "...")[] {
  const out: (number | "...")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - 1 && i <= page + 1)) {
      out.push(i);
    } else if (out[out.length - 1] !== "...") {
      out.push("...");
    }
  }
  return out;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  className,
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);
  const go = (p: number) => onPageChange?.(Math.min(Math.max(1, p), pageCount));

  const stepClass =
    "inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        className
      )}
    >
      <p className="font-mono text-xs tabular-nums text-foreground-subtle">
        {start}-{end} of {total.toLocaleString("en-US")}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => go(current - 1)}
          disabled={current === 1}
          aria-label="Previous page"
          className={stepClass}
        >
          <ChevronLeft className="size-4" />
        </button>

        {pageList(current, pageCount).map((p, i) =>
          p === "..." ? (
            <span
              key={`gap-${i}`}
              aria-hidden
              className="inline-flex size-9 items-center justify-center font-mono text-xs text-foreground-subtle"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              aria-current={p === current ? "page" : undefined}
              className={cn(
                "inline-flex size-9 cursor-pointer items-center justify-center rounded-md font-mono text-xs tabular-nums transition-colors",
                p === current
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground-muted hover:bg-muted hover:text-foreground"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => go(current + 1)}
          disabled={current === pageCount}
          aria-label="Next page"
          className={stepClass}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  );
}
