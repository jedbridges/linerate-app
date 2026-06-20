"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate Table
 *
 * Ledger-grade table. Header row uses the LineRate eyebrow style (mono,
 * widest tracking, uppercase, subtle color). Row dividers are subtle, no
 * zebra striping. Pass numeric on TableHead and TableCell to mark a
 * numeric column: switches to JetBrains Mono, tabular numerals, right
 * aligned. Use it on every column that represents real-world data.
 */

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "border-b border-border [&_tr]:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border text-sm text-foreground [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border-subtle transition-colors data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  numeric,
  ...props
}: React.ComponentProps<"th"> & { numeric?: boolean }) {
  return (
    <th
      data-slot="table-head"
      data-numeric={numeric ? "" : undefined}
      className={cn(
        "h-10 px-3 align-middle font-mono text-[11px] font-medium uppercase tracking-widest text-foreground-subtle whitespace-nowrap",
        numeric ? "text-right tabular-nums" : "text-left",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

function TableCell({
  className,
  numeric,
  ...props
}: React.ComponentProps<"td"> & { numeric?: boolean }) {
  return (
    <td
      data-slot="table-cell"
      data-numeric={numeric ? "" : undefined}
      className={cn(
        "px-3 py-3.5 align-middle text-sm text-foreground whitespace-nowrap",
        numeric && "text-right font-mono tabular-nums",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-foreground-muted", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
