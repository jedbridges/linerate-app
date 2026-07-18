import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { withBase } from "@/lib/utils";
import { HomeLink } from "@/components/home-link";
import { LineScreenLab } from "@/components/effects/line-screen-lab";

export const metadata: Metadata = {
  title: "Line screen · LineRate design system",
  description:
    "A WebGL line-halftone effect as a zero-dependency <line-screen> custom element, with a live tuner and copy-paste embed.",
};

/*
 * Effects / Line screen. A documentation tab and the source of truth for the
 * shippable <line-screen> custom element. The element script is loaded once
 * here (afterInteractive) via withBase so it resolves under the Pages base
 * path; the interactive tuner lives in LineScreenLab (client).
 */
export default function LineScreenPage() {
  return (
    <>
      <Script src={withBase("/line-screen.js")} strategy="afterInteractive" />

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
            <span className="text-foreground">Line screen</span>
          </nav>
        </header>

        {/* Page head */}
        <div className="pt-14 pb-12">
          <h1 className="flex items-start gap-4 text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] font-medium tracking-tight text-foreground">
            <span className="pt-3 font-mono text-xs font-normal tracking-wide text-foreground-subtle">
              E.01
            </span>
            Line screen
          </h1>
          <p className="mt-4 max-w-[620px] text-base leading-relaxed text-foreground-muted">
            A WebGL fragment shader that renders any photograph as a coarse line
            halftone. Interactive: cursor tightens line density so the photo
            resolves, and pools amber into the ink.
          </p>
        </div>

        <LineScreenLab />
      </div>
    </>
  );
}
