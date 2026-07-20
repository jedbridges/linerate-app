"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/*
 * Inline email capture for the concept 05 closing CTA: a work-email field plus
 * the Request access button. Not wired to a backend (the concepts are
 * mid-fidelity), so submit just shows a local confirmation; swap the onSubmit
 * for a real endpoint when the form goes live.
 *
 * The status paragraph is mounted from the start, empty, rather than appearing
 * with the confirmation. A live region has to exist before its contents change
 * for screen readers to reliably announce it; mounting the region and its text
 * in the same tick is a common miss. Submitting also unmounts the form, which
 * destroys the focused button, so focus moves to the confirmation instead of
 * falling back to <body>.
 */
export function RequestAccessForm() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const status = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (sent) status.current?.focus();
  }, [sent]);

  return (
    <>
      <p
        ref={status}
        role="status"
        tabIndex={-1}
        className={cn(
          "items-center gap-2.5 text-base text-foreground outline-none",
          sent ? "lr-success mt-9 inline-flex" : "hidden",
        )}
      >
        {sent && (
          <>
            <span className="lr-success-badge flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-surface">
              <Check
                className="lr-success-check size-4 text-accent-foreground"
                aria-hidden
              />
            </span>
            Thanks, we&rsquo;ll be in touch.
          </>
        )}
      </p>

      {!sent && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSent(true);
          }}
          className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            aria-label="Work email"
            className="h-12 flex-1 bg-page/60 px-4 text-base"
          />
          <Button type="submit" size="lg" className="shrink-0">
            Request access
          </Button>
        </form>
      )}
    </>
  );
}
