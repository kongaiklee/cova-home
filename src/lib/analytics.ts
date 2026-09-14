/**
 * Analytics chokepoint.
 *
 * GA4 is the system of record and the only one - UX's default, adopted by CPO at /check #4:
 * one stack, not two, because two stacks disagree and then nobody trusts either. The tag is
 * loaded in index.html from VITE_GA4_ID; this is the one function every event in the app goes
 * through, so what is measured stays readable in one file.
 *
 * When the tag is absent - a preview build with no ID, an ad blocker, the SSG prerender - this
 * is a no-op and the app behaves identically. Analytics never changes what a reader sees.
 */
export type AnalyticsEvent =
  // already firing before GA4 landed; they start counting the day the tag does
  | 'cta_click'
  | 'tool_start'
  | 'tool_complete'
  | 'tool_cta_click'
  // the after-the-click funnel (UX spec s2C)
  | 'article_read'
  | 'article_cta_view'
  | 'article_cta_click'
  | 'request_submit'
  // the Emerging Risks 2027 signup (2026-09-14) - a report request, not a lead
  | 'er2027_signup';

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', event: string, params?: AnalyticsParams) => void;
  }
}

export function track(event: AnalyticsEvent, params?: AnalyticsParams): void {
  if (typeof window === 'undefined') return; // no-op during SSG prerender
  window.gtag?.('event', event, params);
}
