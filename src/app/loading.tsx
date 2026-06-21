import { Wordmark } from "@/components/wordmark";

/*
 * Route loading state.
 *
 * Shown by Next during navigation/suspense. On-brand: Onyx field, the
 * wordmark, and a thin amber hairline sweeping beneath it. Quiet and
 * documentary, not a spinner. Auto-stilled under prefers-reduced-motion.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-page">
      <Wordmark className="h-5 w-auto text-foreground" />
      <div className="loading-sweep h-0.5 w-40 rounded-full bg-border" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
