"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Copyable colour swatches for the design system.
 *
 * The palette tokens (bg-page, bg-neutral-500, ...) resolve to different hex
 * values in light and dark, so the hex is never hardcoded: each swatch reads
 * the *computed* background of its own chip and re-reads whenever the `.dark`
 * class on <html> flips (same MutationObserver contract as ThemeToggle). That
 * keeps the copied value honest in both themes.
 *
 * Clicking a swatch copies its hex and plays a brief confirmation: a check
 * badge springs in over the chip with an expanding ring, and the label swaps
 * to "Copied". Motion is CSS-keyframe based (lr-copy-pop / lr-copy-ring) so it
 * auto-disables under prefers-reduced-motion via the global cap.
 */

/* rgb(a) computed value -> uppercase #RRGGBB. */
function rgbToHex(rgb: string): string | null {
  const m = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return null;
  const hex = (n: string) => Number(n).toString(16).padStart(2, "0");
  return `#${hex(m[1])}${hex(m[2])}${hex(m[3])}`.toUpperCase();
}

/* Copy-with-confirmation state, shared by both swatch shapes.
 *
 * The hex is read straight from the chip's *computed* background, so it always
 * reflects the token as it resolves in the active theme. The copy handler
 * re-reads live at click time (the source of truth for what lands on the
 * clipboard), which also sidesteps any first-paint timing where the mount read
 * ran before styles applied. A theme flip on <html> re-reads for the label. */
function useCopyHex(ref: React.RefObject<HTMLElement | null>) {
  const [hex, setHex] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const readHex = React.useCallback(() => {
    const el = ref.current;
    return el ? rgbToHex(getComputedStyle(el).backgroundColor) : null;
  }, [ref]);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    // On first mount the injected stylesheet may not have applied yet, so a
    // bad read retries shortly after (setTimeout, not rAF, so it still fires
    // when the tab is backgrounded) until the token resolves.
    const read = (attempt = 0) => {
      const next = readHex();
      if (next) setHex(next);
      else if (attempt < 20) timer = setTimeout(() => read(attempt + 1), 100);
    };
    read();
    // Re-read when the theme flips (`.dark` on <html>), same as ThemeToggle.
    const observer = new MutationObserver(() => setHex(readHex()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [readHex]);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = React.useCallback(async () => {
    const live = readHex();
    if (!live) return;
    setHex(live);
    try {
      await navigator.clipboard.writeText(live);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); fail quiet.
    }
  }, [readHex]);

  return { hex, copied, copy };
}

/* The check badge + expanding ring that plays on copy. Keyed by the caller so
   a fresh copy re-triggers the keyframes even within the 1.4s window. */
function CopyConfirm({ show, animKey }: { show: boolean; animKey: number }) {
  if (!show) return null;
  return (
    <span
      key={animKey}
      aria-hidden
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      <span className="absolute size-9 rounded-full border border-accent [animation:lr-copy-ring_0.5s_var(--ease-brand)_forwards]" />
      <span className="grid size-7 place-items-center rounded-full bg-foreground text-background shadow-sm [animation:lr-copy-pop_0.32s_var(--ease-brand)_both]">
        <Check className="size-4" strokeWidth={2.5} />
      </span>
    </span>
  );
}

/* Labeled swatch (Surfaces & roles): chip, name, token, and copyable hex. */
export function CopySwatch({
  className,
  name,
  value,
}: {
  className: string;
  name: string;
  value: string;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { hex, copied, copy } = useCopyHex(ref);
  const animKey = React.useRef(0);
  if (copied) animKey.current += 1;

  return (
    <div>
      <button
        ref={ref}
        type="button"
        onClick={copy}
        aria-label={hex ? `Copy ${name} hex ${hex}` : `Copy ${name} hex`}
        className={cn(
          "group relative block h-16 w-full cursor-pointer overflow-hidden rounded-md border border-border outline-none",
          "transition-[transform,box-shadow] duration-150 ease-[var(--ease-brand)]",
          "hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page",
          className
        )}
      >
        {/* Hover affordance: a small copy glyph in the corner. */}
        <span
          aria-hidden
          className="absolute right-1.5 top-1.5 text-foreground-subtle opacity-0 transition-opacity duration-150 group-hover:opacity-70"
        >
          <Copy className="size-3.5" />
        </span>
        <CopyConfirm show={copied} animKey={animKey.current} />
      </button>
      <p className="mt-2 text-sm text-foreground">{name}</p>
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-mono text-xs text-foreground-subtle">{value}</p>
        <p
          className={cn(
            "font-mono text-xs tabular-nums transition-colors duration-150",
            copied ? "text-accent-foreground" : "text-foreground-subtle"
          )}
        >
          {copied ? "Copied" : hex ?? ""}
        </p>
      </div>
    </div>
  );
}

/* One segment of a reference scale. Thin, so the hex shows on hover as a small
   floating chip and the copy confirm plays inside the segment. */
function ScaleSegment({ className }: { className: string }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { hex, copied, copy } = useCopyHex(ref);
  const animKey = React.useRef(0);
  if (copied) animKey.current += 1;

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      title={className}
      aria-label={hex ? `Copy ${className} hex ${hex}` : `Copy ${className}`}
      className={cn(
        "group relative h-12 flex-1 cursor-pointer outline-none",
        "transition-[flex-grow] duration-200 ease-[var(--ease-brand)] hover:flex-[1.5]",
        "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
        className
      )}
    >
      {/* Floating hex chip on hover / focus. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 rounded-sm bg-foreground px-1.5 py-0.5 font-mono text-[10px] leading-none text-background",
          "opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        )}
      >
        {copied ? "Copied" : hex ?? ""}
      </span>
      <CopyConfirm show={copied} animKey={animKey.current} />
    </button>
  );
}

/* A reference ramp of copyable segments (Neutral / Amber scales). */
export function CopyScale({ scale }: { scale: string[] }) {
  return (
    <div className="flex overflow-hidden rounded-md border border-border">
      {scale.map((cls) => (
        <ScaleSegment key={cls} className={cls} />
      ))}
    </div>
  );
}
