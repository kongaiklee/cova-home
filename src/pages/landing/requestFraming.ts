/**
 * KONG w6: `Request access` must frame the header and the full hero rather than
 * land flush on the form. `LanderHeader` is not sticky and renders before `Hero`,
 * so the frame IS scroll offset 0 - no offset arithmetic.
 *
 * DESKTOP ONLY. On the phone the hero stacks copy, photo, card, so offset 0 puts
 * the form below the fold - that rule is CD's verdict (R19) and until it lands
 * the phone keeps the browser's native anchor jump onto the card.
 */
const DESKTOP = '(min-width: 1024px)';

/** A bare focus() re-scrolls the viewport to the card and undoes the framing. */
function focusName() {
  document
    .querySelector<HTMLInputElement>('#request input[name="name"]')
    ?.focus({ preventScroll: true });
}

/** Same-page `#request` CTA click (nav, hero, s9, close). Desktop frames; phone stays native. */
export function requestClick(e: { preventDefault(): void }) {
  if (!window.matchMedia(DESKTOP).matches) return;
  e.preventDefault();
  // Keep the #request URL contract without the browser's native jump to the card.
  history.pushState(null, '', '#request');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  focusName();
}

/** Arriving on the lander at /#request (blog header, articles, contact, the gap tool). */
export function frameRequestArrival(hash: string) {
  if (hash !== '#request' || !window.matchMedia(DESKTOP).matches) return;
  window.scrollTo(0, 0);
  focusName();
}
