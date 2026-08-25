/**
 * Analytics chokepoint.
 *
 * The funnel-analytics SDK (Vercel Web Analytics vs GA4) is not chosen yet
 * (lead-gen Move 1, "decide later"). Every analytics event in the app flows
 * through this one function, so when the SDK lands it is wired here once and
 * nothing else changes. Until then it is a safe no-op.
 */
export type AnalyticsEvent =
  | 'cta_click'
  | 'tool_start'
  | 'tool_complete'
  | 'tool_cta_click';

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function track(event: AnalyticsEvent, params?: AnalyticsParams): void {
  if (typeof window === 'undefined') return; // no-op during SSG prerender
  // TODO(move-1): forward to the chosen analytics SDK here, e.g.
  //   Vercel:  track(event, params)            // from '@vercel/analytics'
  //   GA4:     window.gtag?.('event', event, params)
  void event;
  void params;
}
