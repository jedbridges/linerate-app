import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { withBase } from "@/lib/utils";
import { HomeLink } from "@/components/home-link";
import { EffectLab } from "@/components/effects/effect-lab";
import { CROSS_HATCH } from "@/components/effects/effects";

export const metadata: Metadata = {
  title: "Cross hatch · LineRate design system",
  description:
    "A WebGL cross-hatching effect as a zero-dependency <cross-hatch> custom element, with a live tuner and copy-paste embed.",
};

/*
 * Effects / Cross hatch. A documentation tab and the source of truth for the
 * shippable <cross-hatch> custom element. The element script is loaded once
 * here (afterInteractive) via withBase so it resolves under the Pages base
 * path; the interactive tuner lives in EffectLab (client).
 */
export default function CrossHatchPage() {
  return (
    <>
      <Script src={withBase(CROSS_HATCH.script)} strategy="afterInteractive" />

      <div className="mx-auto max-w-5xl px-6 pb-24">
        {/* Top bar: wordmark home + mono breadcrumb */}
        <header className="flex items-center justify-between border-b border-border py-5">
          <HomeLink />
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2.5 font-mono text-[11px] tracking-wide text-foreground-subtle uppercase"
          >
            <Link href="/" className="transition-colors hover:text-foreground">
              LineRate
            </Link>
            <span className="opacity-40">/</span>
            <span>Effects</span>
            <span className="opacity-40">/</span>
            <span className="text-foreground">Cross hatch</span>
          </nav>
        </header>

        {/* Page head */}
        <div className="pt-14 pb-12">
          <h1 className="flex items-start gap-4 text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] font-medium tracking-tight text-foreground">
            <span className="pt-3 font-mono text-xs font-normal tracking-wide text-foreground-subtle">
              E.02
            </span>
            Cross hatch
          </h1>
          <p className="mt-4 max-w-[620px] text-base leading-relaxed text-foreground-muted">
            A WebGL fragment shader that rebuilds any photograph out of
            horizontal and vertical rules. Tone is sampled once per grid cell,
            then built up by interleaving lines between the ones already there,
            so the marks stay on a square lattice and read as constructed rather
            than photographic. Interactive: the cursor tightens the lattice until
            the photo resolves, and pools amber into the ink.
          </p>
        </div>

        <EffectLab config={CROSS_HATCH} />
      </div>
    </>
  );
}
