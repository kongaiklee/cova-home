/**
 * KONG w6: `Request access` must frame the header and the full hero rather than
 * land flush on the form. `LanderHeader` is not sticky and renders before `Hero`,
 * so the frame IS scroll offset 0 - no offset arithmetic.
 *
 * DESKTOP: offset 0. PHONE (CD verdict, handoff s10): the hero stacks copy,
 * photo, card, so offset 0 would hide the form below the fold - the tap's
 * promise is the form. The phone keeps the browser's native anchor jump onto
 * the card, with breathing room from `scroll-mt-9` on `#request` (12px stack
 * gap plus a 24px band of the photo tile - CD's floor - in the page's own
 * pt-9 rhythm), and the same Name focus as desktop.
 */
const DESKTOP = '(min-width: 1024px)';

/** A bare focus() re-scrolls the viewport to the card and undoes the framing/margin. */
function focusName() {
  document
    .querySelector<HTMLInputElement>('#request input[name="name"]')
    ?.focus({ preventScroll: true });
}

/** Same-page `#request` CTA click (nav, hero, s9, close). Desktop frames; phone native jump + focus. */
export function requestClick(e: { preventDefault(): void }) {
  if (!window.matchMedia(DESKTOP).matches) {
    // The native jump honours #request's scroll-margin; focus once the default action has run.
    requestAnimationFrame(focusName);
    return;
  }
  e.preventDefault();
  // Keep the #request URL contract without the browser's native jump to the card.
  history.pushState(null, '', '#request');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  focusName();
}

/** Arriving on the lander at /#request (blog header, articles, contact, the gap tool). */
export function frameRequestArrival(hash: string) {
  if (hash !== '#request') return;
  if (!window.matchMedia(DESKTOP).matches) {
    // The browser's own hash scroll lands the card (scroll-margin applies); add only the focus.
    focusName();
    return;
  }
  window.scrollTo(0, 0);
  focusName();
}
