"use client";

import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDestructive } from "@/components/patterns/confirm-destructive";

/*
 * Pre-flight pattern
 *
 * The surface operators see in the seconds before a settlement window opens.
 * Answers: how long until open, how much is queued, who is ready, who is at
 * risk, and what action is available right now (hold the cycle or let it
 * fly).
 *
 * Composes Card + Table + Badge + Alert + ConfirmDestructive + Button.
 * Countdown ticks visually for demo; in production wire the seconds prop to
 * a server-source of truth.
 *
 * Anatomy (top to bottom):
 *   1. Eyebrow + Cycle title + Hold-cycle action (Card header)
 *   2. Countdown timer (mono, large)
 *   3. Total queued (mono, ledger)
 *   4. At-risk Alert (only if any counterparty is at-risk)
 *   5. Counterparty list (Table with status pills)
 *   6. Footer action row (Hold + Open on time)
 *
 * Voice: tense but calm. The operator knows the system is watching.
 */

export type PreFlightStatus = "ready" | "awaiting" | "at-risk";

export type PreFlightCounterparty = {
  party: string;
  reference: string;
  amount: string;
  status: PreFlightStatus;
};

export type PreFlightProps = {
  cycle: string;
  windowLabel: string;
  totalQueued: string;
  initialSeconds: number;
  counterparties: PreFlightCounterparty[];
};

const STATUS_LABEL: Record<PreFlightStatus, string> = {
  ready: "Ready",
  awaiting: "Awaiting ack",
  "at-risk": "At risk",
};

const STATUS_VARIANT: Record<
  PreFlightStatus,
  "success" | "neutral" | "pending"
> = {
  ready: "success",
  awaiting: "neutral",
  "at-risk": "pending",
};

function formatCountdown(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function PreFlight({
  cycle,
  windowLabel,
  totalQueued,
  initialSeconds,
  counterparties,
}: PreFlightProps) {
  const [seconds, setSeconds] = React.useState(initialSeconds);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s <= 0 ? initialSeconds : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [initialSeconds]);

  const atRisk = counterparties.filter((c) => c.status === "at-risk");
  const ready = counterparties.filter((c) => c.status === "ready");
  const awaiting = counterparties.filter((c) => c.status === "awaiting");

  return (
    <Card className="p-0">
      <div className="border-b border-border-subtle p-6">
        <CardHeader className="mb-5">
          <div>
            <p className="eyebrow mb-2">Pre-flight</p>
            <CardTitle className="text-2xl">
              Cycle {cycle}, window {windowLabel}
            </CardTitle>
          </div>
          <CardAction>
            <Badge variant="pending">
              T-{formatCountdown(seconds)}
            </Badge>
          </CardAction>
        </CardHeader>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-foreground-subtle">Opens in</p>
            <p className="ledger mt-1 text-4xl font-medium tabular-nums text-foreground leading-none sm:text-6xl">
              {formatCountdown(seconds)}
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground-subtle">Total queued</p>
            <p className="ledger mt-1 text-3xl font-medium text-foreground leading-tight sm:text-5xl">
              {totalQueued}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border-subtle pt-4">
          <div>
            <p className="text-xs text-foreground-subtle uppercase tracking-widest font-mono">
              Ready
            </p>
            <p className="mt-1 font-mono text-2xl text-foreground tabular-nums">
              {ready.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground-subtle uppercase tracking-widest font-mono">
              Awaiting ack
            </p>
            <p className="mt-1 font-mono text-2xl text-foreground tabular-nums">
              {awaiting.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground-subtle uppercase tracking-widest font-mono">
              At risk
            </p>
            <p className="mt-1 font-mono text-2xl text-foreground tabular-nums">
              {atRisk.length}
            </p>
          </div>
        </div>
      </div>

      {atRisk.length > 0 && (
        <div className="border-b border-border-subtle p-6">
          <Alert tone="warning">
            <AlertTitle>
              {atRisk.length === 1
                ? "1 counterparty is at risk."
                : `${atRisk.length} counterparties are at risk.`}
            </AlertTitle>
            <AlertDescription>
              Acknowledgement is overdue. The cycle will hold for 90 seconds
              past the window before flagging these as failed.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Counterparty</TableHead>
            <TableHead numeric>Queued</TableHead>
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
                <Badge variant={STATUS_VARIANT[row.status]}>
                  {STATUS_LABEL[row.status]}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t border-border-subtle p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground-muted">
          The cycle opens automatically at {windowLabel}. Hold to defer.
        </p>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <ConfirmDestructive
            trigger={<Button variant="secondary">Hold cycle</Button>}
            title={`Hold cycle ${cycle}`}
            description={`Deferring ${totalQueued} until the next window. Counterparties are notified. Recorded in the audit log.`}
            confirmToken={cycle}
            tokenLabel={
              <>
                Type the cycle number{" "}
                <span className="font-mono text-foreground">{cycle}</span> to
                hold
              </>
            }
            confirmLabel="Hold cycle"
          />
          <Button>Open on time</Button>
        </div>
      </div>
    </Card>
  );
}
