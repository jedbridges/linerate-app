"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/*
 * Audit pack export drawer
 *
 * Named in CLAUDE.md: slide-in from right, bg-raised, summary at top with
 * mono figures, action row at bottom with primary export button.
 */

export type AuditPackSummary = {
  cycle: string;
  window: string;
  total: string;
  counterparties: number;
  cleared: string;
  hash: string;
};

type AuditPackDrawerProps = {
  trigger: React.ReactNode;
  summary: AuditPackSummary;
};

export function AuditPackDrawer({ trigger, summary }: AuditPackDrawerProps) {
  const [copied, setCopied] = React.useState(false);

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(summary.hash);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); fail quiet.
    }
  };

  // Revert the confirmation after a beat. Quiet, no animation: the label just
  // states the fact, in keeping with the audit-grade voice.
  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <p className="eyebrow">Export</p>
          <SheetTitle>Audit pack, cycle {summary.cycle}</SheetTitle>
          <SheetDescription>
            Signed, hashed, and timestamped. Generated after the cycle clears
            and immutable thereafter.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <dt className="text-sm text-foreground-subtle">Cycle</dt>
              <dd className="mt-1 font-mono text-base text-foreground">
                {summary.cycle}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-foreground-subtle">Window</dt>
              <dd className="mt-1 font-mono text-base text-foreground">
                {summary.window}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-sm text-foreground-subtle">Total settled</dt>
              <dd className="ledger mt-1 text-3xl font-medium text-foreground">
                {summary.total}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-foreground-subtle">Counterparties</dt>
              <dd className="mt-1 font-mono text-base text-foreground">
                {summary.counterparties}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-foreground-subtle">Cleared</dt>
              <dd className="mt-1 font-mono text-base text-foreground">
                {summary.cleared}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-sm text-foreground-subtle">Hash</dt>
              <dd className="mt-1 break-all font-mono text-sm text-foreground">
                {summary.hash}
              </dd>
            </div>
          </dl>
          <Separator className="my-6" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground-muted">Verification</p>
            <Badge variant="success">Signed</Badge>
          </div>
        </SheetBody>
        <SheetFooter>
          <Button variant="ghost" onClick={copyHash} aria-live="polite">
            {copied ? (
              <>
                <Check />
                Copied
              </>
            ) : (
              "Copy hash"
            )}
          </Button>
          <Button>Download audit pack</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
