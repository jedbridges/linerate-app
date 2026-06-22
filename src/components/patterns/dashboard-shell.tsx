"use client";

import * as React from "react";
import {
  Download,
  LayoutDashboard,
  RefreshCw,
  Users,
  Receipt,
  FileText,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Alert, AlertTitle, AlertDescription, AlertActions } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppTopNav } from "@/components/patterns/app-top-nav";
import { AppSidebar } from "@/components/patterns/app-sidebar";
import { SubNav } from "@/components/patterns/sub-nav";
import { CycleIndicator } from "@/components/patterns/cycle-indicator";
import {
  SettlementVolumeChart,
  ClearedRateChart,
} from "@/components/patterns/settlement-charts";

/*
 * DashboardShell
 *
 * A worked example: a settlement-operations dashboard that brings the system
 * together as a product would use it. App top nav + sidebar frame a page with
 * a header (breadcrumb, title, cycle indicator, primary action), an at-risk
 * alert, a KPI tile row, the two charts, and the active-cycle counterparty
 * table with pagination. Everything is composed from existing components and
 * semantic tokens; nothing here is bespoke beyond the small KPI tile.
 */

const SIDEBAR_GROUPS = [
  {
    label: "Operations",
    items: [
      { label: "Overview", icon: LayoutDashboard, active: true },
      { label: "Cycles", icon: RefreshCw },
      { label: "Counterparties", icon: Users, count: 38 },
    ],
  },
  {
    label: "Ledger",
    items: [
      { label: "Transactions", icon: Receipt },
      { label: "Reports", icon: FileText },
    ],
  },
  { label: "Account", items: [{ label: "Settings", icon: Settings }] },
];

const ROWS = [
  { party: "Acme Hosting", reference: "A-7142", amount: "42,180,000.00", status: "success", statusLabel: "Settled" },
  { party: "Northwind Compute", reference: "N-3318", amount: "18,640,000.00", status: "success", statusLabel: "Settled" },
  { party: "Cascade Datacenter", reference: "C-9920", amount: "8,940,000.00", status: "pending", statusLabel: "In window" },
  { party: "Helix Networks", reference: "H-5571", amount: "3,212,851.50", status: "danger", statusLabel: "At risk" },
  { party: "Meridian Cloud", reference: "M-2204", amount: "1,880,400.00", status: "success", statusLabel: "Settled" },
] as const;

function Stat({
  label,
  value,
  delta,
  tone = "muted",
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "up" | "down" | "muted";
}) {
  const Icon = tone === "up" ? ArrowUpRight : tone === "down" ? ArrowDownRight : null;
  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface p-5">
      <p className="eyebrow">{label}</p>
      <p className="ledger mt-3 text-2xl font-medium text-foreground">{value}</p>
      <p
        className={cn(
          "mt-1.5 flex items-center gap-1 font-mono text-xs",
          tone === "up"
            ? "text-success-foreground"
            : tone === "down"
              ? "text-danger-foreground"
              : "text-foreground-subtle"
        )}
      >
        {Icon && <Icon className="size-3.5" />}
        {delta}
      </p>
    </div>
  );
}

export function DashboardShell() {
  const [page, setPage] = React.useState(1);

  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-lg">
      <AppTopNav
        items={[
          { label: "Dashboard", active: true },
          { label: "Settlements" },
          { label: "Counterparties" },
          { label: "Reports" },
        ]}
      />

      <div className="flex">
        <div className="hidden lg:block">
          <AppSidebar groups={SIDEBAR_GROUPS} />
        </div>

        <div className="min-w-0 flex-1 bg-page">
          {/* Page header */}
          <div className="border-b border-border px-5 py-5 sm:px-6">
            <Breadcrumb className="mb-3">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#shell">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Cycle <span className="font-mono">4271</span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-medium tracking-snug text-foreground">
                  Settlement overview
                </h3>
                <CycleIndicator time="14:32 UTC" cycle="4271" />
              </div>
              <Button>
                <Download />
                Export audit pack
              </Button>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-6 p-5 sm:p-6">
            <SubNav
              items={[
                { label: "Summary" },
                { label: "Counterparties", count: 38 },
                { label: "Exceptions", count: 2 },
                { label: "Audit" },
              ]}
            />

            <Alert tone="warning">
              <AlertTitle>2 counterparties at risk in cycle 4271.</AlertTitle>
              <AlertDescription>
                Helix Networks and one other have not confirmed before the
                window. Funds remain in escrow. Review before 14:32 UTC.
              </AlertDescription>
              <AlertActions>
                <Button variant="secondary" size="sm">
                  Review exceptions
                </Button>
              </AlertActions>
            </Alert>

            {/* KPI tiles */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Stat
                label="Settled today"
                value="$127.4M"
                delta="8.2% vs last cycle"
                tone="up"
              />
              <Stat
                label="Cleared first attempt"
                value="99.4%"
                delta="0.6 pts vs last cycle"
                tone="up"
              />
              <Stat
                label="Counterparties"
                value="38"
                delta="across 4 windows"
                tone="muted"
              />
              <Stat
                label="At risk"
                value="2"
                delta="needs review"
                tone="down"
              />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-border bg-surface p-6">
                <p className="eyebrow mb-1">Settlement volume</p>
                <p className="mb-5 text-sm text-foreground-muted">
                  Last 12 cycles, $M settled
                </p>
                <SettlementVolumeChart />
              </div>
              <div className="min-w-0 rounded-lg border border-border bg-surface p-6">
                <p className="eyebrow mb-1">Cleared on first attempt</p>
                <p className="mb-5 text-sm text-foreground-muted">
                  Last 6 cycles, percent cleared
                </p>
                <ClearedRateChart />
              </div>
            </div>

            {/* Settlements table */}
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-5 py-4">
                <p className="text-sm font-medium text-foreground">
                  Active cycle counterparties
                </p>
                <Badge variant="pending">T+0 · 14:32 UTC · CYCLE 4271</Badge>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Counterparty</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead numeric>Notional</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ROWS.map((row) => (
                      <TableRow key={row.reference}>
                        <TableCell>
                          <span className="text-sm text-foreground">
                            {row.party}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-xs text-foreground-subtle">
                            {row.reference}
                          </span>
                        </TableCell>
                        <TableCell numeric>{row.amount}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={row.status}>{row.statusLabel}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="border-t border-border-subtle px-5 py-4">
                <Pagination
                  page={page}
                  pageSize={5}
                  total={38}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
