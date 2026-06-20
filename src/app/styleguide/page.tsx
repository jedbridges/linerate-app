import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <section className="border-t border-border py-12">
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

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* Top bar with theme toggle */}
      <div className="flex items-center justify-between pb-8">
        <p className="eyebrow">LineRate / styleguide</p>
        <ThemeToggle />
      </div>

      {/* Masthead */}
      <header>
        <p className="eyebrow mb-3">Design system</p>
        <h1 className="max-w-3xl text-5xl font-medium tracking-tight text-foreground leading-[1.05]">
          The voice of the brand, and the voice of the ledger.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-foreground-muted">
          A documentary, audit-grade system for treasury and settlement.
          Schibsted Grotesk carries the language; JetBrains Mono carries every
          number that represents real-world data.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-foreground-subtle">
          Retheme by editing the <span className="font-mono">:root</span>{" "}
          semantic tokens in{" "}
          <span className="font-mono">src/app/globals.css</span>. Every
          component below references those tokens; brand changes propagate
          automatically.
        </p>
      </header>

      {/* Type */}
      <Section eyebrow="Typography" title="Type scale and pairing">
        <div className="space-y-4">
          <p className="text-5xl font-medium tracking-tight text-foreground">
            Settle nine-figure obligations the same day.
          </p>
          <p className="text-3xl font-medium tracking-snug text-foreground">
            Schibsted Grotesk, medium, 30px
          </p>
          <p className="text-xl text-foreground">
            Schibsted Grotesk, regular, 20px
          </p>
          <p className="text-base text-foreground-muted">
            Body copy at 15px in foreground-muted. Direct, factual, precise.
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
          <p className="eyebrow mb-2">Today&rsquo;s settlement</p>
          <p className="ledger text-6xl font-medium text-foreground">
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
      <Section eyebrow="Color" title="Surfaces and roles">
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
        title="Neutral and amber scales"
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
    </main>
  );
}
