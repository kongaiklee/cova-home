import { useRef, useState, type FormEvent } from 'react';
import { TRADES } from '../landing/data';
import { track } from '../../lib/analytics';
import { CTA_BODY, CTA_FOOTNOTE, CTA_WHATSAPP, type ResolvedCta } from '../../content/articleCtas';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** The same onboarding call the homepage form offers - one flow, one booking link. */
const BOOKING_URL = 'https://cal.com/kongaiklee/30min';

/**
 * The in-article enquiry block (CMO spec `CMO_SPEC_in-article-enquiry_2026-09-09.md` v1.3; the
 * five lines are Kong's own, 2026-09-09 17:5x).
 *
 * Two placements, one component. `mid` sits directly after the 60-second answer and is a line
 * plus a button, because a reader who has just been given the answer should be able to ask
 * without leaving the paragraph - the button opens the form inline rather than navigating. `end`
 * replaces the old CTA band at the foot and shows the form already open.
 *
 * It posts to the SAME endpoint as the homepage form, with `source: 'article'` so the handler
 * knows the reader gave one way to be reached rather than two, and knows not to send them the
 * founder welcome written for someone who asked for access.
 */
export default function ArticleEnquiry({
  cta,
  page,
  placement,
}: {
  cta: ResolvedCta;
  page: string;
  placement: 'mid' | 'end';
}) {
  const [open, setOpen] = useState(placement === 'end');
  const [status, setStatus] = useState<Status>('idle');
  const [sentAs, setSentAs] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const data = new FormData(e.currentTarget);
    const payload: Record<string, string> = { source: 'article', page, company: '(from article)' };
    for (const [k, v] of data.entries()) {
      const value = String(v).trim();
      if (value) payload[k] = value;
    }
    // One field, either kind of answer: an address with an @ is an email, anything else is a
    // number. The reader should not have to know which box the office wants.
    const contact = payload.contact ?? '';
    delete payload.contact;
    if (contact.includes('@')) payload.email = contact;
    else payload.number = contact;
    if (typeof document !== 'undefined') {
      const from = document.referrer;
      if (from) payload.from = from.slice(0, 160);
    }
    setStatus('sending');
    try {
      const r = await fetch('/api/request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        track('request_submit', { page, trade: payload.trade, placement });
        setSentAs(payload);
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const dark = placement === 'end';
  const field =
    'w-full rounded-sm border px-3.5 py-3 text-[15px] focus:outline-none ' +
    (dark
      ? 'border-white/25 bg-white/10 text-white placeholder:text-white/60 focus:border-white/70'
      : 'border-border-primary bg-white text-text-primary placeholder:text-[#b3aca6] focus:border-primary');

  if (status === 'sent') {
    // The same landing as a homepage lead - Kong, 2026-09-09: "lets sync everything to the same
    // flow first, founders welcome + onboarding call". The reply promise is stated against what
    // they actually left us: a number can be called, an address cannot.
    const booking = `${BOOKING_URL}?${new URLSearchParams({
      ...(sentAs.name ? { name: sentAs.name } : {}),
      ...(sentAs.email ? { email: sentAs.email } : {}),
    }).toString()}`.replace(/[?]$/, '');
    return (
      <div
        role="status"
        data-article-enquiry={placement}
        className={
          dark
            ? 'rounded-xl bg-white/10 px-6 py-8 text-white'
            : 'my-8 rounded-xl border border-border-primary bg-[#faf8f5] px-6 py-7'
        }
      >
        <p className={dark ? 'font-serif text-2xl text-white' : 'font-serif text-xl text-text-primary'}>
          Thank you. Your question is with us.
        </p>
        <p className={dark ? 'mt-2 text-sm/relaxed text-white/90' : 'mt-2 text-[15px]/relaxed text-text-secondary'}>
          {sentAs.number
            ? `We reply within one working day, on ${sentAs.number}.`
            : 'We reply within one working day, to the address you gave us.'}
        </p>
        <a
          href={booking}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('article_cta_click', { page, placement: 'booking' })}
          className={
            'mt-4 block rounded-sm py-3 text-center text-[15px] font-medium transition ' +
            (dark
              ? 'bg-white text-primary hover:bg-white/90'
              : 'border border-border-primary bg-white text-text-primary hover:border-primary')
          }
        >
          Or pick a time with Kong, our founder
        </a>
        <p className={'mt-3 text-center text-[13px] ' + (dark ? 'text-white/80' : 'text-text-secondary')}>
          Prefer to message? WhatsApp {CTA_WHATSAPP}
        </p>
      </div>
    );
  }

  const form = (
    <form ref={formRef} onSubmit={submit} className="mt-4 flex flex-col gap-2">
      <input className={field} name="name" placeholder="Name" autoComplete="name" required maxLength={120} />
      <input
        className={field}
        name="contact"
        placeholder="Email or mobile"
        autoComplete="email"
        required
        maxLength={160}
      />
      <textarea
        className={field}
        name="question"
        rows={3}
        maxLength={240}
        defaultValue={cta.questionPrefill}
        aria-label="What do you need to carry?"
        placeholder="What do you need to carry?"
      />
      <select
        className={field + (dark ? ' [&>option]:text-text-primary' : '')}
        name="trade"
        defaultValue={cta.trade}
        aria-label="What does your company do?"
      >
        <option value="">What does your company do?</option>
        {TRADES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      {/* honeypot - hidden from people, filled by bots */}
      <input className="hidden" name="form_meta" tabIndex={-1} autoComplete="off" aria-hidden />
      <button
        type="submit"
        disabled={status === 'sending'}
        className={
          'mt-1 rounded-sm py-3.5 text-center text-[15px] font-medium transition disabled:opacity-70 ' +
          (dark ? 'bg-white text-primary hover:bg-white/90' : 'bg-primary-extended text-white hover:opacity-90')
        }
      >
        {status === 'sending' ? 'Sending' : cta.button}
      </button>
      <p
        className={'text-center text-[13px] ' + (dark ? 'text-white/80' : 'text-text-secondary')}
        aria-live="polite"
      >
        {status === 'error'
          ? 'That did not go through. Please try again, or email support@covarage.com.'
          : CTA_FOOTNOTE}
      </p>
    </form>
  );

  if (placement === 'mid') {
    return (
      <aside className="my-8 rounded-xl border border-border-primary bg-[#faf8f5] px-6 py-6" data-article-enquiry="mid">
        <p className="text-[15px]/relaxed font-medium text-text-primary">{cta.line}</p>
        {open ? (
          form
        ) : (
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              track('article_cta_click', { page, placement: 'mid' });
            }}
            className="mt-4 rounded-sm bg-primary-extended px-5 py-3 text-[15px] font-medium text-white transition hover:opacity-90"
          >
            {cta.button}
          </button>
        )}
      </aside>
    );
  }

  return (
    <div className="text-white" data-article-enquiry="end">
      <h2 className="font-serif text-2xl text-white sm:text-3xl">{cta.headline}</h2>
      <p className="mt-2 text-sm/relaxed text-white/90">{cta.line}</p>
      <p className="mt-3 text-sm/relaxed text-white/80">{CTA_BODY}</p>
      {form}
      <p className="mt-4 text-center text-[13px] text-white/80">
        Prefer to message? WhatsApp {CTA_WHATSAPP}
      </p>
    </div>
  );
}
