import { useEffect, useRef, useState, type FormEvent } from 'react';
import { EMAIL_SEND_LIVE, TRADES } from './data';
import { track } from '../../lib/analytics';

/** Attribution that rides hidden on the POST: referral code, campaign params, the landing path. */
const HIDDEN_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'policy', 'industry', 'agency'];

const BOOKING_URL = 'https://cal.com/kongaiklee/30min';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Props {
  trade: string;
  onTrade: (id: string) => void;
  /** Carries the page's one `#request` anchor. The lander v1.3 mounts the card twice (hero and
   * close - one form, two places); only the hero's instance may own the id. */
  anchor?: boolean;
  /** No drop shadow - the close's instance sits on the page, not on a photograph. */
  flat?: boolean;
}

/**
 * The request card. It POSTS to /api/request and creates no account - the team opens every
 * account by hand after the call. Four typed fields and the trade; everything else is hidden.
 * Lander v1.3 (CD's rendered mock, Kong 2026-09-14): the mock's words - the `Request a call`
 * eyebrow, the `Your trade` placeholder, the no-obligation line - in the card's dress.
 */
export default function RequestCard({ trade, onTrade, anchor = true, flat = false }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [hidden, setHidden] = useState<Record<string, string>>({});
  const [sentAs, setSentAs] = useState<Record<string, string>>({});
  const bodyRef = useRef<HTMLFormElement>(null);
  const [holdHeight, setHoldHeight] = useState<number>();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const h: Record<string, string> = {};
    for (const k of HIDDEN_KEYS) { const v = q.get(k); if (v) h[k] = v.slice(0, 120); }
    h.page = window.location.pathname + window.location.search;
    // The origin capture (UX baseline s4.1). `page` is the constant `/` here because this form
    // only ever mounts on the homepage, so it can never name a lead's origin. Every article's
    // `Request access` is a plain anchor to /#request - a real browser navigation - so
    // document.referrer carries the guide URL and the lead in Slack names the page that
    // produced it. Empty on a direct visit, and that absence is itself the honest answer.
    const from = document.referrer;
    if (from) h.from = from.slice(0, 160);
    setHidden(h);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = new FormData(e.currentTarget);
    const payload: Record<string, string> = { ...hidden };
    for (const [k, v] of form.entries()) payload[k] = String(v).trim();
    setStatus('sending');
    try {
      const r = await fetch('/api/request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        // The conversion, and the only event that fires on a server-confirmed fact rather than
        // on an intention. `from` rides with it so the funnel can be read by origin in GA4 as
        // well as by eye in Slack.
        track('request_submit', { page: payload.page, trade: payload.trade, from: payload.from });
        // The s16 state swaps in place: the card's outer box keeps its footprint (12.1).
        if (bodyRef.current) setHoldHeight(bodyRef.current.offsetHeight);
        setSentAs(payload);
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const field = 'block h-[46px] w-full rounded-md border border-hairline-strong bg-white px-3.5 text-[15px] text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none';

  const sentTrade = TRADES.find((t) => t.id === sentAs.trade);
  const booking = `${BOOKING_URL}?${new URLSearchParams({
    ...(sentAs.name ? { name: sentAs.name } : {}),
    ...(sentAs.email ? { email: sentAs.email } : {}),
  }).toString()}`.replace(/\?$/, '');

  return (
    <div
      id={anchor ? 'request' : undefined}
      className={`scroll-mt-9 overflow-hidden rounded-xl border border-hairline-strong bg-white text-text-primary lg:scroll-mt-0 ${flat ? '' : 'lg:shadow-[0_18px_40px_rgba(38,29,22,0.18)]'}`}
      data-request-card={anchor ? 'hero' : 'close'}
    >
      {status === 'sent' ? (
        /* The s16 post-submit state, swapped in place of the form (CD SECTION 12; copy s16 verbatim). */
        <div
          role="status"
          className="flex flex-col justify-center px-5 pt-6 pb-7 sm:px-7"
          style={holdHeight ? { minHeight: holdHeight } : undefined}
          data-post-submit
        >
          <div className="font-serif text-2xl tracking-[-0.6px] text-text-primary">
            {sentAs.company ? `Got it, ${sentAs.company}. You are on the list.` : 'Got it. You are on the list.'}
          </div>
          <p className="mt-2 mb-4 text-[15px]/relaxed font-medium text-text-primary">
            {sentAs.number
              ? `We have your details and someone will call you within 24 hours on ${sentAs.number}.`
              : 'We have your details and someone will call you within 24 hours.'}
          </p>
          <p className="m-0 mb-2.5 text-[15px]/relaxed font-semibold text-text-primary">
            While you wait, here is what businesses in your trade are usually asked to carry.
          </p>
          <a
            href={sentTrade ? sentTrade.href : '/blog'}
            className="mb-4 block rounded-sm bg-primary-extended py-3.5 text-center text-[15px] font-medium text-white transition hover:opacity-90"
          >
            {sentTrade ? `Open the ${sentTrade.label} checklist` : 'Open the guides'}
          </a>
          <p className="m-0 mb-4 text-[14px]/relaxed text-text-secondary">
            {EMAIL_SEND_LIVE
              ? 'Wrong number, or a better time to call? Reply to the email we just sent, or message +65 8867 0918 on WhatsApp.'
              : 'Wrong number, or a better time to call? Message +65 8867 0918 on WhatsApp and we will pick it up.'}
          </p>
          <a
            href={booking}
            target="_blank"
            rel="noreferrer"
            className="block rounded-sm border border-border-primary bg-white py-3 text-center text-[15px] font-medium text-text-primary transition hover:border-primary"
          >
            Or pick a time with Kong, our founder
          </a>
        </div>
      ) : (
      <form ref={bodyRef} className="px-5 pt-6 pb-6 sm:px-7 sm:pt-7" onSubmit={submit} noValidate={false}>
        <p className="m-0 mb-[18px] text-xs font-medium tracking-[0.14em] text-primary uppercase">Request a call</p>
        <select
          name="trade"
          aria-label="Your trade"
          value={trade}
          onChange={(e) => onTrade(e.target.value)}
          className={`${field} mb-2.5`}
        >
          <option value="">Your trade</option>
          {TRADES.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
        <div className="mb-4 flex flex-col gap-2.5">
          <input className={field} name="name" placeholder="Name" autoComplete="name" required maxLength={120} />
          <input className={field} name="company" placeholder="Company" autoComplete="organization" required maxLength={160} />
          <input className={field} name="email" placeholder="Email" type="email" autoComplete="email" required maxLength={160} />
          <input className={field} name="number" placeholder="Number" type="tel" autoComplete="tel" required maxLength={40} />
          {/* honeypot - hidden from people, filled by bots. Non-semantic name so a password
              manager or browser autofill never mistakes it for a real field (item 9). */}
          <input className="hidden" name="form_meta" tabIndex={-1} autoComplete="off" aria-hidden />
        </div>
        {Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="h-12 w-full rounded-sm bg-primary-extended text-center text-[15px] font-medium text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending' : 'Request a call'}
        </button>
        <p className="m-0 mt-3 text-[13px]/[1.5] text-text-secondary" aria-live="polite">
          {status === 'error'
            ? 'That did not go through. Please try again, or email support@covarage.com.'
            : 'A person on our team calls you back. No obligation.'}
        </p>
      </form>
      )}
    </div>
  );
}
