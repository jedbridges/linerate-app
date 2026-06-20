import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/*
 * Settlement summary
 *
 * One of the bespoke patterns named in CLAUDE.md. Composes Card + Table +
 * Badge to render a cycle's settled amount, the cycle metadata in a mono
 * pill, and the per-counterparty breakdown with status.
 *
 * Pure presentation; pass a Cycle from data.
 */

export type CounterpartyRow = {
  party: string;
  reference: string;
  amount: string;
  status: "success" | "pending" | "danger";
  statusLabel: string;
};

export type SettlementSummaryProps = {
  cycle: string;
  windowLabel: string;
  totalAmount: string;
  counterparties: CounterpartyRow[];
};

export function SettlementSummary({
  cycle,
  windowLabel,
  totalAmount,
  counterparties,
}: SettlementSummaryProps) {
  return (
    <Card className="p-0">
      <div className="border-b border-border-subtle p-6">
        <CardHeader className="mb-4">
          <div>
            <p className="eyebrow mb-2">Today&rsquo;s settlement</p>
            <CardTitle className="text-2xl">Cycle {cycle}</CardTitle>
          </div>
          <CardAction>
            <Badge variant="pending">
              T+0 · {windowLabel} · CYCLE {cycle}
            </Badge>
          </CardAction>
        </CardHeader>
        <p className="ledger text-5xl font-medium text-foreground">
          {totalAmount}
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Counterparty</TableHead>
            <TableHead numeric>Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {counterparties.map((row) => (
            <TableRow key={row.reference}>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-foreground">{row.party}</span>
                  <span className="font-mono text-xs text-foreground-subtle">
                    {row.reference}
                  </span>
                </div>
              </TableCell>
              <TableCell numeric>{row.amount}</TableCell>
              <TableCell className="text-right">
                <Badge variant={row.status}>{row.statusLabel}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
