import type { Metadata } from "next";

import { slugify } from "@/lib/utils";
import { SideNav, type NavGroup } from "@/components/side-nav";
import { Alert, AlertActions, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { SettlementSummary } from "@/components/patterns/settlement-summary";
import { AuditPackDrawer } from "@/components/patterns/audit-pack-drawer";
import { ConfirmDestructive } from "@/components/patterns/confirm-destructive";
import { PreFlight } from "@/components/patterns/pre-flight";
import { CounterpartyList } from "@/components/patterns/counterparty-row";
import { CycleIndicator } from "@/components/patterns/cycle-indicator";

export const metadata: Metadata = {
  title: "LineRate design system",
};

function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={slugify(title)}
      className="scroll-mt-8 border-t border-border py-12"
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="mb-2 text-2xl font-medium tracking-snug text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mb-8 max-w-2xl text-sm text-foreground-muted">
          {description}
        </p>
      )}
      {!description && <div className="mb-8" />}
      {children}
    </section>
  );
}

function Swatch({
  className,
  name,
  value,
}: {
  className: string;
  name: string;
  value: string;
}) {
  return (
    <div>
      <div
        className={`h-16 rounded-md border border-border ${className}`}
        aria-hidden
      />
      <p className="mt-2 text-sm text-foreground">{name}</p>
      <p className="font-mono text-xs text-foreground-subtle">{value}</p>
    </div>
  );
}

// Full literal class names so Tailwind's static scanner generates them.
const neutralScale = [
  "bg-neutral-0", "bg-neutral-50", "bg-neutral-100", "bg-neutral-200",
  "bg-neutral-300", "bg-neutral-400", "bg-neutral-500", "bg-neutral-600",
  "bg-neutral-700", "bg-neutral-800", "bg-neutral-900", "bg-neutral-950",
];
const amberScale = [
  "bg-amber-50", "bg-amber-100", "bg-amber-200", "bg-amber-300",
  "bg-amber-400", "bg-amber-500", "bg-amber-600", "bg-amber-700",
  "bg-amber-800", "bg-amber-900", "bg-amber-950",
];

const NAV: NavGroup[] = [
  {
    group: "Foundations",
    items: [
      "Type scale & pairing",
      "Ledger figures",
      "Surfaces & roles",
      "Neutral & amber scales",
    ],
  },
  {
    group: "Primitives",
    items: [
      "Buttons",
      "Forms",
      "Badges",
      "Separator",
      "Card",
      "Table",
      "Tabs",
      "Overlays",
      "Resilience",
    ],
  },
  {
    group: "Patterns",
    items: [
      "Pre-flight",
      "Settlement summary",
      "Counterparty list",
      "Cycle indicator",
      "Audit pack drawer",
      "Destructive confirmation",
    ],
  },
];

export default function DesignSystemPage() {
  return (
    <>
      {/* Top nav: solid bg-page, border, no blur. One amber rule under it. */}
      <header className="sticky top-0 z-40 bg-page">
        <div className="mx-auto flex h-13 max-w-6xl items-center justify-between px-6">
          <Wordmark className="h-4 w-auto" />
          <ThemeToggle />
        </div>
        <div className="h-0.5 bg-accent" />
      </header>

      <div className="mx-auto block max-w-6xl px-6 pb-16 lg:flex lg:gap-12">
        <SideNav groups={NAV} />

        <main id="main" className="min-w-0 flex-1 overflow-x-clip">
          {/* Masthead */}
          <div className="py-12">
            <p className="eyebrow mb-3">Design system</p>
        <h1 className="max-w-[28ch] text-display-md font-semibold tracking-tight text-foreground leading-[1.05]">
          The voice of the brand & the voice of the ledger.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-foreground-muted">
          A documentary, audit-grade system for treasury and settlement.
          General Sans carries the language; JetBrains Mono carries every
          number that represents real-world data.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-foreground-subtle">
          Retheme by editing the <span className="font-mono">:root</span>{" "}
          semantic tokens in{" "}
          <span className="font-mono">src/app/globals.css</span>. Every
          component below references those tokens; brand changes propagate
          automatically.
        </p>
          </div>

      {/* Type */}
      <Section eyebrow="Typography" title="Type scale & pairing">
        <div className="space-y-4">
          <p className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
            Settle nine-figure obligations the same day.
          </p>
          <p className="text-3xl font-medium tracking-snug text-foreground">
            General Sans, medium, 30px
          </p>
          <p className="text-xl text-foreground">
            General Sans, regular, 20px
          </p>
          <p className="text-base text-foreground-muted">
            Body copy at 16px in foreground-muted. Direct, factual, precise.
            The product handles real money, so the copy reads like it.
          </p>
          <p className="font-mono text-base text-foreground">
            JetBrains Mono 0123456789 · the voice of the ledger
          </p>
        </div>
      </Section>

      {/* Numerals */}
      <Section eyebrow="Numerals" title="Ledger figures">
        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="eyebrow mb-2">Today’s settlement</p>
          <p className="ledger text-4xl font-medium text-foreground sm:text-6xl">
            $127,492,851.50
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm text-foreground-subtle">Cycle</p>
              <p className="font-mono text-base text-foreground">4271</p>
            </div>
            <div>
              <p className="text-sm text-foreground-subtle">Window</p>
              <p className="font-mono text-base text-foreground">14:32 UTC</p>
            </div>
            <div>
              <p className="text-sm text-foreground-subtle">Counterparties</p>
              <p className="font-mono text-base text-foreground">38</p>
            </div>
            <div>
              <p className="text-sm text-foreground-subtle">Cleared</p>
              <p className="font-mono text-base text-foreground">99.4%</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Surfaces */}
      <Section eyebrow="Color" title="Surfaces & roles">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Swatch className="bg-page" name="Page" value="bg-page" />
          <Swatch className="bg-surface" name="Surface" value="bg-surface" />
          <Swatch className="bg-raised" name="Raised" value="bg-raised" />
          <Swatch className="bg-muted" name="Muted" value="bg-muted" />
          <Swatch className="bg-primary" name="Primary" value="bg-primary" />
          <Swatch className="bg-accent" name="Accent" value="bg-accent" />
        </div>
      </Section>

      {/* Scales */}
      <Section
        eyebrow="Color"
        title="Neutral & amber scales"
        description="Reference only. Use semantic tokens (bg-primary, bg-muted, bg-accent) in product code."
      >
        <p className="mb-3 text-sm text-foreground-subtle">Ink family</p>
        <div className="mb-8 flex overflow-hidden rounded-md border border-border">
          {neutralScale.map((cls) => (
            <div key={cls} className={`h-12 flex-1 ${cls}`} title={cls} />
          ))}
        </div>
        <p className="mb-3 text-sm text-foreground-subtle">
          Amber, signal color only
        </p>
        <div className="flex overflow-hidden rounded-md border border-border">
          {amberScale.map((cls) => (
            <div key={cls} className={`h-12 flex-1 ${cls}`} title={cls} />
          ))}
        </div>
      </Section>

      {/* Buttons */}
      <Section
        eyebrow="Primitives"
        title="Buttons"
        description="Three forms only. Primary is Ink, never amber. Three sizes. Focus ring is global amber."
      >
        <div className="space-y-6">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="flex items-center gap-4">
              <p className="w-24 font-mono text-xs text-foreground-subtle uppercase tracking-widest">
                {variant}
              </p>
              <div className="flex items-center gap-3">
                <Button variant={variant} size="sm">
                  Small
                </Button>
                <Button variant={variant} size="md">
                  Medium
                </Button>
                <Button variant={variant} size="lg">
                  Large
                </Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Form primitives */}
      <Section
        eyebrow="Primitives"
        title="Forms"
        description="Thin border, transparent background, global amber focus ring. Mono variant for ledger fields."
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sg-counterparty">Counterparty</Label>
            <Input id="sg-counterparty" placeholder="Acme Hosting Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sg-amount">Settlement amount</Label>
            <Input
              id="sg-amount"
              mono
              defaultValue="127,492,851.50"
              inputMode="decimal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sg-cycle">Cycle window</Label>
            <Select>
              <SelectTrigger id="sg-cycle">
                <SelectValue placeholder="Select a cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Active cycles</SelectLabel>
                  <SelectItem value="4271">Cycle 4271 · 14:32 UTC</SelectItem>
                  <SelectItem value="4270">Cycle 4270 · 10:00 UTC</SelectItem>
                  <SelectItem value="4269">Cycle 4269 · 06:00 UTC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sg-note">Operator note</Label>
            <Textarea
              id="sg-note"
              placeholder="Optional context for the audit pack."
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="sg-disabled">Disabled field</Label>
            <Input
              id="sg-disabled"
              disabled
              defaultValue="Locked while settling"
            />
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section
        eyebrow="Primitives"
        title="Badges"
        description="The Badge component renders the global .pill style. Four variants: status-coded only."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge variant="success">Settled</Badge>
          <Badge variant="pending">Pending</Badge>
          <Badge variant="danger">Failed</Badge>
        </div>
      </Section>

      {/* Separator */}
      <Section
        eyebrow="Primitives"
        title="Separator"
        description={`Subtle by default. Pass className="bg-border" for a stronger break.`}
      >
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Account · A-7142</p>
              <p className="font-mono text-xs text-foreground-subtle">
                acme-hosting · primary
              </p>
            </div>
            <p className="ledger text-foreground">$42,180,000.00</p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Account · A-7143</p>
              <p className="font-mono text-xs text-foreground-subtle">
                acme-hosting · reserve
              </p>
            </div>
            <p className="ledger text-foreground">$8,940,000.00</p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Account · A-7144</p>
              <p className="font-mono text-xs text-foreground-subtle">
                acme-hosting · clearing
              </p>
            </div>
            <p className="ledger text-foreground">$76,372,851.50</p>
          </div>
        </div>
      </Section>

      {/* Card */}
      <Section
        eyebrow="Primitives"
        title="Card"
        description="Surface for grouped information. bg-surface, 1px border, 8px radius, p-6 default. Cards lift via tone, not shadow."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Audit pack</CardTitle>
                <CardDescription>
                  Quarterly export, signed and timestamped.
                </CardDescription>
              </div>
              <CardAction>
                <Badge variant="success">Ready</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-subtle">Generated</p>
                  <p className="font-mono text-sm text-foreground">
                    2026-06-19 14:32 UTC
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground-subtle">Hash</p>
                  <p className="font-mono text-sm text-foreground">a91f3c…d8</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                View ledger
              </Button>
              <Button size="sm">Export</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Cycle 4271</CardTitle>
                <CardDescription>
                  Counterparties cleared in this window.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="ledger text-3xl font-medium text-foreground">
                $42,180,000.00
              </p>
              <p className="mt-1 text-sm text-foreground-subtle">
                38 counterparties, 99.4% cleared
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Table */}
      <Section
        eyebrow="Primitives"
        title="Table"
        description="Header cells use the eyebrow style. Pass numeric on TableHead and TableCell to mark a column as mono, tabular, right-aligned. Subtle row dividers, no zebra."
      >
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Counterparty</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead numeric>Notional</TableHead>
                <TableHead numeric>Cleared</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Acme Hosting</TableCell>
                <TableCell className="font-mono text-xs text-foreground-subtle">
                  A-7142
                </TableCell>
                <TableCell numeric>42,180,000.00</TableCell>
                <TableCell numeric>42,180,000.00</TableCell>
                <TableCell className="text-right">
                  <Badge variant="success">Settled</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Northwind Compute</TableCell>
                <TableCell className="font-mono text-xs text-foreground-subtle">
                  N-3318
                </TableCell>
                <TableCell numeric>18,640,000.00</TableCell>
                <TableCell numeric>18,640,000.00</TableCell>
                <TableCell className="text-right">
                  <Badge variant="success">Settled</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cascade Datacenter</TableCell>
                <TableCell className="font-mono text-xs text-foreground-subtle">
                  C-9920
                </TableCell>
                <TableCell numeric>8,940,000.00</TableCell>
                <TableCell numeric>0.00</TableCell>
                <TableCell className="text-right">
                  <Badge variant="pending">Pending</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Helix Networks</TableCell>
                <TableCell className="font-mono text-xs text-foreground-subtle">
                  H-5571
                </TableCell>
                <TableCell numeric>3,212,851.50</TableCell>
                <TableCell numeric>0.00</TableCell>
                <TableCell className="text-right">
                  <Badge variant="danger">Failed</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* Tabs */}
      <Section
        eyebrow="Primitives"
        title="Tabs"
        description="Underline style only. Active trigger gets border-foreground. No segmented pill variant."
      >
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="counterparties">Counterparties</TabsTrigger>
            <TabsTrigger value="audit">Audit pack</TabsTrigger>
            <TabsTrigger value="settings" disabled>
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-foreground-muted">
              Overview content. Today the system cleared 38 counterparties at
              99.4%, totalling $127.4M.
            </p>
          </TabsContent>
          <TabsContent value="counterparties">
            <p className="text-sm text-foreground-muted">
              Counterparties content. A list of every party in the active
              window with reference, notional, and status.
            </p>
          </TabsContent>
          <TabsContent value="audit">
            <p className="text-sm text-foreground-muted">
              Audit pack content. Signed export, hash chain, and the operator
              note attached to this cycle.
            </p>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Overlays */}
      <Section
        eyebrow="Primitives"
        title="Overlays"
        description="Floating surfaces all share bg-raised + 1px border + subtle shadow. Highlighted items use bg-muted, never bg-accent (amber)."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reschedule cycle window</DialogTitle>
                <DialogDescription>
                  Cycle 4271 opens at 14:32 UTC. Pick a new window to defer
                  this cycle to. Affected counterparties are notified.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button>Reschedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Cycle actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Cycle 4271</DropdownMenuLabel>
              <DropdownMenuItem>
                Open cycle
                <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export audit pack
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Notify counterparties
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Include reconciliation memo
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Archive cycle</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Window details</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="eyebrow mb-2">Cycle 4271</p>
              <p className="ledger text-2xl font-medium text-foreground">
                14:32 UTC
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                Opens at 14:30, closes at 14:35. Counterparty acknowledgements
                must arrive within the window or the cycle reschedules.
              </p>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <span className="font-mono">a91f3c…d8</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-mono">
                a91f3c2b8e9a7f44d11c5e6b73d8
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
      </Section>

      {/* Resilience: Alert, EmptyState, Skeleton */}
      <Section
        eyebrow="Primitives"
        title="Resilience"
        description="Three primitives for when things go wrong, are empty, or are loading. Voice convention for any error copy: what happened, why, what to do next."
      >
        <div className="space-y-8">
          <div className="space-y-3">
            <Alert>
              <AlertTitle>Audit pack ready for cycle 4271.</AlertTitle>
              <AlertDescription>
                Signed and hash-chained. Download from the cycle summary or
                from your scheduled export folder.
              </AlertDescription>
            </Alert>

            <Alert tone="warning">
              <AlertTitle>Cascade Datacenter has not acknowledged.</AlertTitle>
              <AlertDescription>
                Acknowledgement is due at 14:34 UTC. The cycle will hold for
                90 seconds past the window before flagging as failed.
              </AlertDescription>
              <AlertActions>
                <Button variant="ghost" size="sm">
                  View counterparty
                </Button>
                <Button size="sm">Send reminder</Button>
              </AlertActions>
            </Alert>

            <Alert tone="danger">
              <AlertTitle>Helix Networks settlement failed.</AlertTitle>
              <AlertDescription>
                Wire returned 0x12 (insufficient counterparty balance).
                Funds remain in the escrow account. Retry or mark as manual.
              </AlertDescription>
              <AlertActions>
                <Button variant="ghost" size="sm">
                  View diagnostic
                </Button>
                <Button size="sm">Retry settlement</Button>
              </AlertActions>
            </Alert>
          </div>

          <div className="rounded-lg border border-border bg-surface">
            <EmptyState
              eyebrow="No exceptions"
              title="Every counterparty cleared in this cycle."
              description="The next window opens at 14:32 UTC. Failures will appear here."
              action={
                <Button variant="ghost" size="sm">
                  View cycle history
                </Button>
              }
            />
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="eyebrow mb-4">Loading state, sample</p>
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-3 h-10 w-64" />
            <Skeleton className="mt-6 h-4 w-full max-w-lg" />
            <Skeleton className="mt-2 h-4 w-full max-w-md" />
            <Skeleton className="mt-2 h-4 w-full max-w-sm" />
          </div>
        </div>
      </Section>

      {/* Pre-flight pattern */}
      <Section
        eyebrow="Patterns"
        title="Pre-flight"
        description="What the operator sees in the seconds before a window opens. Countdown, total queued, ready / awaiting / at-risk counts, an at-risk alert, the counterparty list, and the hold-or-open decision. Composes Card + Table + Badge + Alert + ConfirmDestructive."
      >
        <PreFlight
          cycle="4272"
          windowLabel="18:00 UTC"
          totalQueued="$94,210,000.00"
          initialSeconds={142}
          counterparties={[
            {
              party: "Acme Hosting",
              reference: "A-7142",
              amount: "42,180,000.00",
              status: "ready",
            },
            {
              party: "Northwind Compute",
              reference: "N-3318",
              amount: "18,640,000.00",
              status: "ready",
            },
            {
              party: "Meridian Grid",
              reference: "M-1180",
              amount: "21,300,000.00",
              status: "awaiting",
            },
            {
              party: "Cascade Datacenter",
              reference: "C-9920",
              amount: "12,090,000.00",
              status: "at-risk",
            },
          ]}
        />
      </Section>

      {/* LineRate-specific pattern */}
      <Section
        eyebrow="Patterns"
        title="Settlement summary"
        description="Bespoke LineRate pattern. Composes Card + Table + Badge to render a cycle and its counterparty breakdown. Lives in components/patterns/."
      >
        <SettlementSummary
          cycle="4271"
          windowLabel="14:32 UTC"
          totalAmount="$127,492,851.50"
          counterparties={[
            {
              party: "Acme Hosting",
              reference: "A-7142",
              amount: "42,180,000.00",
              status: "success",
              statusLabel: "Settled",
            },
            {
              party: "Northwind Compute",
              reference: "N-3318",
              amount: "18,640,000.00",
              status: "success",
              statusLabel: "Settled",
            },
            {
              party: "Cascade Datacenter",
              reference: "C-9920",
              amount: "8,940,000.00",
              status: "pending",
              statusLabel: "Pending",
            },
            {
              party: "Helix Networks",
              reference: "H-5571",
              amount: "3,212,851.50",
              status: "danger",
              statusLabel: "Failed",
            },
          ]}
        />
      </Section>

      {/* Counterparty list pattern */}
      <Section
        eyebrow="Patterns"
        title="Counterparty list"
        description="A sub-row of a counterparty list: name in sans, transaction reference in small mono beneath, amount in mono right-aligned, status as a pill. Rows divided by a subtle rule, no zebra."
      >
        <CounterpartyList
          rows={[
            {
              party: "Acme Hosting",
              reference: "A-7142",
              amount: "42,180,000.00",
              status: "success",
              statusLabel: "Settled",
            },
            {
              party: "Northwind Compute",
              reference: "N-3318",
              amount: "18,640,000.00",
              status: "success",
              statusLabel: "Settled",
            },
            {
              party: "Cascade Datacenter",
              reference: "C-9920",
              amount: "8,940,000.00",
              status: "pending",
              statusLabel: "Pending",
            },
            {
              party: "Helix Networks",
              reference: "H-5571",
              amount: "3,212,851.50",
              status: "danger",
              statusLabel: "Failed",
            },
          ]}
        />
      </Section>

      {/* Cycle indicator pattern */}
      <Section
        eyebrow="Patterns"
        title="Cycle indicator"
        description="Compact mono pill carrying cycle metadata. Lives in headers, table captions, and emails. Read-only signal, not interactive."
      >
        <div className="flex flex-wrap items-center gap-4">
          <CycleIndicator time="14:32 UTC" cycle="4271" />
          <CycleIndicator settlement="T+1" time="10:00 UTC" cycle="4270" />
        </div>
      </Section>

      {/* Audit pack drawer pattern */}
      <Section
        eyebrow="Patterns"
        title="Audit pack drawer"
        description="Slide-in from right. Summary at top in mono figures, action row at bottom with primary export. Composes Sheet + Button + Badge."
      >
        <AuditPackDrawer
          trigger={<Button>Export audit pack</Button>}
          summary={{
            cycle: "4271",
            window: "14:32 UTC",
            total: "$127,492,851.50",
            counterparties: 38,
            cleared: "99.4%",
            hash: "a91f3c2b8e9a7f44d11c5e6b73d8c4e2d1f0a3b5c9e8d7f6a4b2c0d9e8f7a6b5",
          }}
        />
      </Section>

      {/* Destructive confirmation pattern */}
      <Section
        eyebrow="Patterns"
        title="Destructive confirmation"
        description="For irreversible action at meaningful stakes. The operator types a match string (cycle number, token) before the primary confirm enables. Composes Dialog + Input."
      >
        <ConfirmDestructive
          trigger={<Button>Release funds</Button>}
          title="Confirm settlement, cycle 4271"
          description="Releasing $127,492,851.50 to 38 counterparties. Recorded in the audit log and cannot be reversed."
          confirmToken="4271"
          tokenLabel={
            <>
              Type the cycle number{" "}
              <span className="font-mono text-foreground">4271</span> to confirm
            </>
          }
          confirmLabel="Release funds"
        />
      </Section>
        </main>
      </div>
    </>
  );
}
