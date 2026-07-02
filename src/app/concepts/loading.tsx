import { Wordmark } from "@/components/wordmark";

/*
 * Route-level loading state for the concepts area. Shows a centred wordmark
 * over an indeterminate hairline sweep while a concept route resolves, so
 * navigation between concepts never flashes a blank page.
 */
export default function ConceptsLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
      <Wordmark className="h-4 w-auto opacity-80" />
      <div className="loading-sweep h-px w-40 max-w-full bg-border" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  );
}
