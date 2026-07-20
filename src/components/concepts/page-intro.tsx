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
 * Because this covers the whole viewport, there is a second, independent guard.
 * CSS alone only protects against animations never starting; it does not cover
 * them starting and then stalling, which would strand an amber veil over the
 * page. The inline script below retires the veil just after the run. It is
 * deliberately inline rather than an effect so the guard does not depend on
 * hydration — the veil must be able to lift even if React never boots.
 */
const RETIRE_MS = 2650;

const RETIRE = `setTimeout(function(){var e=document.querySelector('.lr-intro');if(e){e.style.display='none';}},${RETIRE_MS})`;

export function PageIntro() {
  return (
    <>
      <div className="lr-intro" aria-hidden="true">
        <span className="lr-intro-bar" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: RETIRE }} />
    </>
  );
}
