/*
 * Scroll a section into view, honoring reduced-motion (scrollIntoView's smooth
 * behavior ignores the CSS media query, so gate it explicitly). Standalone so
 * both the nav components and the view store can use it without a cycle.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  return true;
}
