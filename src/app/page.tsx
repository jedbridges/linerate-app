import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";

/*
 * Root index for the LineRate scaffold.
 *
 * Two surfaces ship in this repo: the marketing landing at /marketing and
 * the design system reference at /styleguide. This index hands the visitor
 * to whichever they need.
 */

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6">
      <header className="flex items-center justify-between py-5">
        <Wordmark className="text-base" />
        <ThemeToggle />
      </header>

      <section className="flex flex-1 flex-col justify-center py-20">
        <p className="eyebrow mb-4">Index</p>
        <h1 className="text-5xl font-semibold tracking-tight text-foreground leading-[1.05] sm:text-6xl">
          Treasury and settlement for nine-figure hosting agreements.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground-muted">
          Two surfaces are wired in this scaffold. Pick where you want to go.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/marketing">View the marketing landing</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/styleguide">Open the design system</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
