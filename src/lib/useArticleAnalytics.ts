import { useEffect } from 'react';
import { track } from './analytics';

/**
 * The two article events that say whether the door was ever reached.
 *
 * The request band sits at screen 12 to 20 of a guide (UX measured 19.7 of 22.3 on a phone), so
 * `article_cta_view` on its own cannot tell a reader who never scrolled from one who scrolled
 * past. `article_read` at 50 and 90 pct of the body is the denominator that makes the view
 * meaningful.
 *
 * Depth is measured against the ARTICLE BODY, not the document: a page's height includes the
 * header, the disclaimer, the CTA band and Explore more, so document-relative depth would call a
 * short guide read at the moment its related-guides list scrolled by. Each depth fires once per
 * article; `page` re-runs the effect, so a client-side route change to the next guide starts a
 * fresh count rather than inheriting the last one.
 */
export function useArticleAnalytics(page: string): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.querySelector<HTMLElement>('.article-body');
    const band = document.querySelector<HTMLElement>('[data-cta-band]');
    const cleanups: Array<() => void> = [];

    if (body) {
      const fired = new Set<number>();
      let queued = false;
      const measure = () => {
        queued = false;
        const rect = body.getBoundingClientRect();
        if (rect.height <= 0) return;
        // How far the bottom of the viewport has travelled through the body, 0 to 1.
        const seen = (window.innerHeight - rect.top) / rect.height;
        for (const depth of [50, 90]) {
          if (seen >= depth / 100 && !fired.has(depth)) {
            fired.add(depth);
            track('article_read', { depth, page });
          }
        }
        if (fired.size === 2) detach();
      };
      const onScroll = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(measure);
      };
      const detach = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      // A guide short enough to be half-read on arrival counts on arrival, not on the first
      // scroll that may never come.
      measure();
      cleanups.push(detach);
    }

    if (band && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            track('article_cta_view', { page });
            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(band);
      cleanups.push(() => io.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [page]);
}
