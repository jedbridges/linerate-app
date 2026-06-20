import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate EmptyState
 *
 * Voice convention: explain WHY it's empty in one line, then offer the
 * single most useful next action. No decorative illustrations; the
 * documentary aesthetic prefers a quiet eyebrow + heading + body + action.
 *
 *   <EmptyState
 *     eyebrow="No exceptions"
 *     title="Every counterparty cleared in this cycle."
 *     description="The next window opens at 14:32 UTC. Failures will appear here."
 *     action={<Button variant="ghost">View cycle history</Button>}
 *   />
 */

type EmptyStateProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

function EmptyState({
  eyebrow,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center px-6 py-16 text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h3 className="max-w-[42ch] text-lg font-medium text-foreground leading-snug">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-[52ch] text-sm text-foreground-muted leading-normal">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export { EmptyState };
