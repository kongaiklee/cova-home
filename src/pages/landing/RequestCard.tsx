import { useEffect, useRef, useState, type FormEvent } from 'react';
import { EMAIL_SEND_LIVE, TRADES } from './data';

/** Attribution that rides hidden on the POST: referral code, campaign params, the landing path. */
const HIDDEN_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'policy', 'industry', 'agency'];

const BOOKING_URL = 'https://cal.com/kongaiklee/30min';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Props {
  trade: string;
  onTrade: (id: string) => void;
}

/**
 * The request card. It POSTS to /api/request and creates no account - the team opens every
 * account by hand after the call. Four typed fields and the trade; everything else is hidden.
 */
export default function RequestCard({ trade, onTrade }: Props) {
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

  const field = 'w-full rounded-sm border border-border-primary bg-white px-3.5 py-3 text-[15px] text-text-primary placeholder:text-[#b3aca6] focus:border-primary focus:outline-none';

  const sentTrade = TRADES.find((t) => t.id === sentAs.trade);
  const booking = `${BOOKING_URL}?${new URLSearchParams({
    ...(sentAs.name ? { name: sentAs.name } : {}),
    ...(sentAs.email ? { email: sentAs.email } : {}),
  }).toString()}`.replace(/\?$/, '');

  return (
    <div
      id="request"
      className="scroll-mt-9 overflow-hidden rounded-xl border border-border-primary bg-white lg:scroll-mt-0 lg:shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-border-primary bg-[#f4f2f0] px-3.5" aria-hidden>
        <span className="size-2 rounded-full bg-[#d9d4cf]" /><span className="size-2 rounded-full bg-[#d9d4cf]" /><span className="size-2 rounded-full bg-[#d9d4cf]" />
      </div>
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
            href={sentTrade ? sentTrade.href : '/guides'}
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
      <form ref={bodyRef} className="px-5 pt-6 pb-7 sm:px-7" onSubmit={submit} noValidate={false}>
        <div className="font-serif text-2xl tracking-[-0.6px] text-text-primary">Request a call.</div>
        <p className="mt-2 mb-4 text-[15px]/relaxed text-text-secondary">Tell us what you do. We call you back within 24 hours.</p>

        <label className="mb-3.5 block rounded-sm border border-border-primary bg-white px-3.5 py-3">
          <span className="mb-0.5 block text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase">What does your company do?</span>
          <select
            name="trade"
            value={trade}
            onChange={(e) => onTrade(e.target.value)}
            className="w-full bg-white text-[15px] text-text-primary focus:outline-none"
          >
            {TRADES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </label>

        <div className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase">Your name, company, email and number.</div>
        <div className="mb-4 flex flex-col gap-2">
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
          className="w-full rounded-sm bg-primary-extended py-3.5 text-center text-[15px] font-medium text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending' : 'Request a call'}
        </button>
        <p className="mt-3 text-center text-[13px] text-text-secondary" aria-live="polite">
          {status === 'error'
            ? 'That did not go through. Please try again, or email support@covarage.com.'
            : 'Opened by our founder. Your adviser named on day one.'}
        </p>
      </form>
      )}
    </div>
  );
}
