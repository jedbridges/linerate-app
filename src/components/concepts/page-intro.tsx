"use client";

import * as React from "react";

/*
 * Page-load intro (concept 06). An amber veil fills the screen, a black bar
 * slides in from the left until its right edge sits on the centre line (its
 * left edge stays cut off by the viewport), holds a beat, then scales up fast
 * until it covers everything. Because the bar is exactly --page, "covering
 * everything" already looks like the site, so the veil just fades out and the
 * hero animates in through the hand-off. The whole thing runs 2.5s.
 *
 * The animation is pure CSS so it plays before hydration, and it fails safe:
 * the resting state is hidden and only the keyframes reveal it, so if animation
 * is unsupported or unwanted the page renders normally instead of sitting
 * behind a veil that never lifts. Content timing is shared via --intro-offset
 * (see globals.css).
 *
 * The effect covers the whole viewport, so there's a second, independent guard:
 * once mounted we hard-retire it just after the run. CSS alone only protects
 * against animations never starting; this also covers them starting and then
 * stalling (a backgrounded tab, a stalled compositor), which would otherwise
 * strand an amber veil over the page.
 */
const RUN_MS = 2500;

export function PageIntro() {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setDone(true), RUN_MS + 150);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div className="lr-intro" aria-hidden="true">
      <span className="lr-intro-bar" />
    </div>
  );
}
