import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { IMG, TRADES, type Trade } from './data';
import { H2, WRAP } from './Sections';

function Card({ t }: { t: Trade }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border-primary bg-white">
      <img src={`${IMG}/pg-card-${t.card}.jpg`} alt="" className="block h-60 w-full shrink-0 border-b border-border-primary object-cover lg:h-[220px]" loading="lazy" />
      <div className="flex flex-1 flex-col px-[22px] pt-5 pb-6 lg:px-[26px] lg:pt-6 lg:pb-7">
        <div className={clsx('font-serif text-[22px] tracking-[-0.6px] text-text-primary lg:text-[26px]', t.sub ? 'mb-1' : 'mb-2.5 lg:mb-3.5')}>{t.title}</div>
        {t.sub && <div className="mb-2.5 text-xs text-text-secondary lg:mb-3.5 lg:text-[13px]">{t.sub}</div>}
        <div className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase lg:mb-2.5">Usually holds</div>
        {/*
          Recut 2026-08-30: one paragraph became two `<cover> - <reason>` lines, and the FULL LINE is the
          link, not a trailing read-more. That is the copywriter's instruction and it is also why `law`
          is safe as a card reason: the qualifying detail sits one click away on the guide, so the
          shortest honest phrasing does not have to carry the caveat.
          A <ul> rather than stacked <p>s - two related items IS a list, and it gives assistive tech the
          count for free.
        */}
        <ul className="m-0 mb-3 list-none p-0 lg:mb-4">
          {t.holds.map((h) => (
            <li key={h.href + h.text} className="mb-1.5 last:mb-0">
              <Link
                to={h.href}
                className="text-sm/[1.6] text-text-secondary underline decoration-[#d8cec4] underline-offset-[3px] hover:text-text-primary hover:decoration-[#a8968a] lg:text-[15px]/[1.65]"
              >
                {h.text}
              </Link>
            </li>
          ))}
        </ul>
        {/*
          CD s13.4, 2026-08-30: `Read the checklist` sat at FOUR heights across row 1 - a 65px
          spread - because the card content is top-aligned and the CTA simply followed the last
          body line, so a shorter card floated its CTA up. Grid items already stretch to the row
          height; what was missing was making the card a COLUMN and pushing the CTA to its foot.
          `mt-auto` with `self-start`, so the link keeps its own width and the underline is drawn
          under the text rather than the column.
          DELIBERATELY LENGTH-INDEPENDENT, which is CD's whole point: Rev 3q changes every line
          again, so a fix keyed to copy length would just break differently next revision.
        */}
        <Link to={t.href} className="mt-auto self-start border-b border-[#c2d4e2] pb-px text-sm font-medium text-primary">{t.cta ?? 'Read the checklist'}</Link>
      </div>
    </div>
  );
}

/**
 * 4B. Eight trades. Desktop: a 4 x 2 grid, no script. Phone: one card at a time - a scroll-snap
 * track with arrows and dots; swipe works with no script at all.
 *
 * Card body is TWO LINKED COVER LINES (recut 2026-08-30, Kong rejected the paragraph form). Every
 * string lives in data.ts by that file's own rule - a copy change is an edit there, never here.
 * Second-order reason this is more than a trim: it puts eight guide links on the highest-traffic
 * page we own, which is the G17 internal-linking motion aimed at the front door.
 */
export default function Trades() {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setI(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = (n: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(TRADES.length - 1, n));
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  };

  const arrow = 'flex size-11 items-center justify-center rounded-full border border-border-primary bg-white text-text-primary';

  return (
    <section className="border-b border-border-primary">
      <div className={`${WRAP} py-[52px] lg:py-24`}>
        <div className="mb-[22px] lg:mb-11 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <h2 className={`${H2} mb-2.5 max-w-[20ch] text-[30px]/[1.12] tracking-[-1px] lg:mb-0 lg:text-[40px]/[1.1] lg:tracking-[-1.3px]`}>Built for businesses like yours.</h2>
          <p className="m-0 max-w-[44ch] text-sm/[1.6] text-text-secondary lg:text-[15px]">What businesses in your trade commonly hold, and why. Your own cover is a conversation with a licensed adviser.</p>
        </div>

        {/* desktop grid */}
        <div className="hidden grid-cols-4 gap-6 lg:grid" data-trades-grid>
          {TRADES.map((t) => <Card key={t.id} t={t} />)}
        </div>

        {/* phone carousel */}
        <div className="lg:hidden" data-trades-carousel>
          <div ref={track} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TRADES.map((t) => (
              <div key={t.id} className="w-full shrink-0 snap-start">
                <Card t={t} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button type="button" className={arrow} aria-label="Previous trade" onClick={() => go(i - 1)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <div className="flex items-center gap-1.5" aria-hidden>
              {TRADES.map((t, k) => (
                <span key={t.id} className={clsx('inline-block h-1.5 rounded-full transition-all', k === i ? 'w-[18px] bg-primary' : 'w-1.5 bg-[#d9d4cf]')} />
              ))}
            </div>
            <button type="button" className={arrow} aria-label="Next trade" onClick={() => go(i + 1)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
          <div className="mt-2.5 text-center text-xs text-text-secondary">{i + 1} of {TRADES.length} - swipe for your trade</div>
        </div>
      </div>
    </section>
  );
}
