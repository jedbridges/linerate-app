import * as React from "react";

/*
 * GridLines
 *
 * Full-height vertical hairlines that sit behind all content, aligned to the
 * content container (max-w-5xl, px-6 inset). A ledger-paper / Swiss-grid
 * device: structural, quiet, on-brand for an audit-grade product.
 *
 * Renders `columns` equal columns framed by 1px rules in border-subtle, so
 * the rules show through the page-color gutters and are covered by opaque
 * surfaces (cards, tables) that sit on top.
 *
 * Mounted once in the root layout at -z-10. Requires body to be transparent
 * (the page color comes from <html>) so the backdrop shows through; see
 * globals.css base layer.
 */
function GridLines({ columns = 4 }: { columns?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 flex justify-center"
    >
      <div
        className="grid h-full w-full max-w-5xl px-6"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className={
              i === columns - 1
                ? "border-x border-border-subtle"
                : "border-l border-border-subtle"
            }
          />
        ))}
      </div>
    </div>
  );
}

export { GridLines };
