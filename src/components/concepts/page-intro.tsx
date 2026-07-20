/*
 * Page-load intro (concept 06). An amber veil fills the screen, a 24px rule is
 * drawn out from the left edge to the centre line, then scales up on both axes
 * until black has taken over the whole viewport. At that point the amber and
 * the rule drop to zero opacity together and the page resolves underneath, its
 * own elements animating into place. Runs 1.1s.
 *
 * The animation is pure CSS so it plays before hydration, and it fails safe:
 * the resting state is hidden and only the keyframes reveal it, so if animation
 * is unsupported or unwanted the page renders normally instead of sitting
 * behind a veil that never lifts. Content timing is shared via --intro-offset
 * (see globals.css).
 *
 * The inline script below does three jobs, and is inline rather than an effect
 * so none of them depend on hydration:
 *
 *  1. Session gate. Client-side navigation remounts this component, so without
 *     a gate the intro replays on every return to the page, and the repeat visitor
 *     pays the most, which is backwards. It plays once per session.
 *  2. Skip. Any pointer or key press ends it immediately. A brand moment should
 *     never be something you have to sit through.
 *  3. Retire. CSS alone only protects against animation never starting; it does
 *     not cover it starting and then stalling, which would strand an amber veil
 *     over the page.
 *
 * Cutting it short (skip, or already seen) also clears --intro-offset, so
 * content that has not started yet appears at once instead of waiting out a
 * hand-off that is no longer coming. The natural end deliberately does NOT do
 * that: entrances are still mid-flight at that point, and recomputing their
 * delay to zero would snap them forward. It only tidies the veil away.
 */
const RUN_MS = 1100;

const BOOT = `(function(){
var d=document,r=d.documentElement,K='lr-intro-seen',v=d.querySelector('.lr-intro');
function hide(){
if(v){v.style.display='none';}
d.removeEventListener('pointerdown',cut);
d.removeEventListener('keydown',cut);
}
function cut(){hide();r.setAttribute('data-intro-done','');}
try{if(sessionStorage.getItem(K)){cut();return;}sessionStorage.setItem(K,'1');}catch(e){}
d.addEventListener('pointerdown',cut,{passive:true});
d.addEventListener('keydown',cut);
setTimeout(hide,${RUN_MS + 150});
})()`;

export function PageIntro() {
  return (
    <>
      <div className="lr-intro" aria-hidden="true">
        <span className="lr-intro-line" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
    </>
  );
}
