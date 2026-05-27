import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LineRate design system",
};

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-12">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="mb-8 text-2xl font-medium tracking-snug text-foreground">
        {title}
      </h2>
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
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Masthead */}
      <header>
        <p className="eyebrow mb-3">LineRate design system</p>
        <h1 className="max-w-3xl text-5xl font-medium tracking-tight text-foreground leading-[1.05]">
          The voice of the brand, and the voice of the ledger.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-foreground-muted">
          A documentary, audit-grade system for treasury and settlement.
          Schibsted Grotesk carries the language; JetBrains Mono carries every
          number that represents real-world data.
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
            Body copy at 15px in foreground-muted. Direct, factual, precise. The
            product handles real money, so the copy reads like it.
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
      <Section eyebrow="Color" title="Neutral and amber scales">
        <p className="mb-3 text-sm text-foreground-subtle">
          Ink family. Scale utilities are escape hatches, not for product code.
        </p>
        <div className="mb-8 flex overflow-hidden rounded-md border border-border">
          {neutralScale.map((cls) => (
            <div key={cls} className={`h-12 flex-1 ${cls}`} title={cls} />
          ))}
        </div>
        <p className="mb-3 text-sm text-foreground-subtle">
          Amber. Signal color only, never a primary CTA.
        </p>
        <div className="flex overflow-hidden rounded-md border border-border">
          {amberScale.map((cls) => (
            <div key={cls} className={`h-12 flex-1 ${cls}`} title={cls} />
          ))}
        </div>
      </Section>

      {/* Status */}
      <Section eyebrow="Status" title="Pills">
        <div className="flex flex-wrap items-center gap-3">
          <span className="pill pill--success">Settled</span>
          <span className="pill pill--pending">Pending</span>
          <span className="pill pill--danger">Failed</span>
        </div>
      </Section>

      {/* Buttons */}
      <Section eyebrow="Primitives" title="Buttons">
        <p className="mb-5 text-sm text-foreground-subtle">
          Three forms only. Primary is Ink, never amber. Reskinned as shadcn
          components in phase 2.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover">
            Export audit pack
          </button>
          <button className="rounded-md border border-foreground bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            View ledger
          </button>
          <button className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Cancel
          </button>
        </div>
      </Section>
    </main>
  );
}
