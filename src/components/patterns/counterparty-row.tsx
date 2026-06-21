import * as React from "react";

import { Badge } from "@/components/ui/badge";

/*
 * CounterpartyRow
 *
 * A sub-row of a counterparty list. Name in sans with the transaction
 * reference in small mono beneath it; amount in mono, right-aligned; status
 * as a pill. Compose several inside CounterpartyList (rows separated by a
 * subtle divider, no zebra). Density is py-3.5 (14px) per the list rule.
 */

export type CounterpartyRowData = {
  party: string;
  reference: string;
  amount: string;
  status: "success" | "pending" | "danger" | "neutral";
  statusLabel: string;
};

export function CounterpartyRow({
  party,
  reference,
  amount,
  status,
  statusLabel,
}: CounterpartyRowData) {
  return (
    <div
      data-slot="counterparty-row"
      className="flex items-center justify-between gap-4 py-3.5"
    >
      <div className="min-w-0">
        <p className="truncate text-sm text-foreground">{party}</p>
        <p className="font-mono text-xs text-foreground-subtle">{reference}</p>
      </div>
      <div className="flex shrink-0 items-center gap-6">
        <span className="ledger text-sm tabular-nums text-foreground">
          {amount}
        </span>
        <span className="w-20 text-right">
          <Badge variant={status}>{statusLabel}</Badge>
        </span>
      </div>
    </div>
  );
}

export function CounterpartyList({
  rows,
}: {
  rows: CounterpartyRowData[];
}) {
  return (
    <div
      data-slot="counterparty-list"
      className="divide-y divide-border-subtle rounded-lg border border-border bg-surface px-6"
    >
      {rows.map((row) => (
        <CounterpartyRow key={row.reference} {...row} />
      ))}
    </div>
  );
}
