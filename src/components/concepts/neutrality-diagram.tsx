import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * The operator -> LineRate -> counterparty relationship, animated to tell the
 * story: the three nodes settle in top to bottom, then tokens of value ride the
 * connectors continuously through the neutral centre, which breathes a soft
 * amber to read as live.
 *
 * Pure CSS. The nodes carry a load entrance; the flow tokens and the amber
 * pulse loop on the document timeline. Under reduced motion the global
 * kill-switch collapses every animation and the diagram simply appears.
 */

const NODES = [
  { label: "Operator", body: "Mining, hosting, AI compute", accent: false },
  {
    label: "LineRate",
    body: "Neutral runtime & system of record",
    accent: true,
  },
  { label: "Counterparty", body: "The other side of the contract", accent: false },
] as const;

function Connector({ delay }: { delay: string }) {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-8 w-px bg-border"
      style={{ ["--flow-travel" as string]: "32px" }}
    >
      <span
        className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-accent"
        style={{
          animation: `lr-flow 1.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay} infinite both`,
        }}
      />
    </div>
  );
}

export function NeutralityDiagram() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-xl border border-border bg-surface p-6">
      {NODES.map((node, i) => {
        // Top -> bottom cascade, sequenced just after the card itself arrives.
        const enterDelay = 360 + i * 140;
        const enter = `lr-reveal 0.6s cubic-bezier(0.2, 0, 0, 1) ${enterDelay}ms both`;
        // The neutral node keeps a soft amber pulse once it has settled.
        const style: React.CSSProperties = node.accent
          ? { animation: `${enter}, lr-pulse 3.2s ease-in-out 1.4s infinite` }
          : { animationDelay: `${enterDelay}ms` };

        return (
          <React.Fragment key={node.label}>
            {i > 0 && <Connector delay={i === 1 ? "0s" : "0.9s"} />}
            <div
              className={cn(
                "lr-enter rounded-lg border px-4 py-3",
                node.accent ? "border-accent bg-page" : "border-border-subtle",
              )}
              style={style}
            >
              <p className={cn("eyebrow", node.accent && "text-foreground")}>
                {node.label}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">{node.body}</p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
