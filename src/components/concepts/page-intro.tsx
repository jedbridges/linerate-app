/*
 * Page-load intro (concept 06). An amber veil fills the screen, then a 24px
 * rule is drawn out from the left edge to the centre line, holds a beat, and
 * scales up on both axes until black has taken over the whole viewport. At that
 * point the amber and the rule both drop to zero opacity together and the page
 * resolves underneath, its own elements animating into place. Runs 2.5s.
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
        <span className="lr-intro-line" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: RETIRE }} />
    </>
  );
}
