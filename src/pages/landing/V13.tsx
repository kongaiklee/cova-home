import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMG, INSURERS, TOPIC_GROUPS, TRADES, type Trade } from './data';
import RequestCard from './RequestCard';
import { WRAP } from './Sections';
import { ARTICLES, articleUrl } from '../../content/articles';
import { REVIEWED, formatDate } from '../../content/updates';

/**
 * THE LANDER v1.3 - nine sections, built to CD's rendered design mock of 2026-09-14 (approved by
 * Kong the same morning: "beautiful. lets go.") and CD's written direction for it, v1.3. The words
 * and their order are CMO's approved mock v1.3; Kong's changes on the rendered mock are in: the
 * layered band, the live article links on every trade card, and the close H2 with the mark above
 * it. Photos stay (his ruling on the mock).
 *
 * Every string in this file is copy of record. A copy change is an edit here, checked against the
 * mock - never a paraphrase.
 */

const H2C = 'm-0 font-serif text-[30px]/[1.12] font-normal tracking-[-1px] text-text-primary lg:text-[44px] lg:tracking-[-1.4px]';
const EYEBROW = 'm-0 mb-3.5 text-xs font-medium tracking-[0.14em] text-primary uppercase';
const INK = 'text-[15px]/[1.4] font-medium text-text-primary underline decoration-hairline-strong underline-offset-4';
const PSEL = 'block h-[52px] w-full rounded-lg border border-hairline-strong bg-white px-3.5 text-base font-medium text-text-primary';
const BODY = 'text-base/[1.6] lg:text-[17px]';

/* 01 - the hero. The photo follows the trade select (live behaviour); CD's Teak scrim carries
   the white serif H1 on desktop; the phone keeps the split (copy, photo tile, card). */
const SCRIM = 'linear-gradient(90deg, rgba(38,29,22,0.86) 0%, rgba(38,29,22,0.70) 34%, rgba(38,29,22,0.18) 62%, rgba(38,29,22,0.30) 100%)';

export function Hero13() {
  const [trade, setTrade] = useState('');
  const hero = TRADES.find((t) => t.id === trade)?.hero ?? 'fnb';
  const photo = `${IMG}/pg-hero-${hero}.jpg`;
  return (
    <section className="relative overflow-hidden border-b border-border-primary lg:flex lg:min-h-[720px] lg:items-center">
      <div
        className="absolute inset-0 hidden bg-no-repeat motion-safe:transition-[background-image] lg:block"
        style={{ backgroundImage: `${SCRIM}, url(${photo})`, backgroundPosition: '0 0, 52% 50%', backgroundSize: 'auto, cover' }}
        aria-hidden
        data-hero-photo={hero}
      />
      <div className={`${WRAP} relative pt-10 pb-14 lg:grid lg:grid-cols-[1fr_420px] lg:items-center lg:gap-20 lg:py-[88px]`}>
        <div>
          <h1 className="m-0 max-w-[600px] font-serif text-[38px]/[1.05] font-normal tracking-[-1px] text-text-primary lg:text-[64px] lg:tracking-[-2px] lg:text-white">
            Your insurance team, without the insurance department.
          </h1>
          <p className="m-0 mt-[18px] max-w-[520px] text-[17px]/[1.55] text-text-primary lg:mt-[26px] lg:text-[20px] lg:text-[#FDFBF9]">
            You run the business. Your broker advises you. We do the insurance admin in between.
          </p>
          <div className="mt-7 mb-5 aspect-[16/10] w-full rounded-xl bg-cover bg-center lg:hidden" style={{ backgroundImage: `url(${photo})` }} aria-hidden />
        </div>
        <RequestCard trade={trade} onTrade={setTrade} />
      </div>
    </section>
  );
}

/* 02 - legitimacy. The live figures and the live 24-logo panel (routing object v1.2), CD's grid.
   Phone: the three figures on ONE row - never two plus an orphan (CD s2 row 02). */
const NUMBERS = [['24', 'insurance providers'], ['766', 'policies placed'], ['~S$200m', 'sum insured']];

export function Legit() {
  return (
    <section className="border-b border-border-primary">
      <div className={`${WRAP} py-14 lg:grid lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-x-[72px] lg:gap-y-9 lg:py-20`}>
        <div>
          <p className={EYEBROW}>Already placed by the advisers we introduce you to</p>
          <div className="mb-8 flex justify-between gap-3 lg:mt-1.5 lg:mb-0 lg:justify-start lg:gap-11" data-stats>
            {NUMBERS.map(([n, t]) => (
              <div key={n}>
                <span className="block font-serif text-[29px]/none tracking-[-0.8px] whitespace-nowrap text-primary-extended lg:text-[56px] lg:tracking-[-1.5px]">{n}</span>
                <span className="mt-1.5 block text-[13px] lg:mt-2.5 lg:text-sm lg:whitespace-nowrap">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1 lg:grid-cols-8 lg:gap-1.5" data-insurers>
          {INSURERS.map((i) => (
            <img key={i.slug} src={`${IMG}/insurers/logo-${i.slug}.gif`} alt={i.alt} loading="lazy" className="aspect-square w-full object-contain opacity-90 mix-blend-multiply grayscale" />
          ))}
        </div>
        <p className="col-span-full m-0 mt-5 border-t border-border-primary pt-[18px] text-[13px]/[1.5] text-text-secondary lg:mt-2">
          All cover is placed by licensed intermediaries. The figures and the panel are theirs. Every account is opened by our team.
        </p>
      </div>
    </section>
  );
}

/* 03 - the problem. The six questions are the canon's pill (accent_pill, no outline). */
const QUESTIONS = [
  'Do you know where your insurance is?',
  'Do you know what you are covered for?',
  'What are the exclusions?',
  'How much is your premium?',
  'When does it renew?',
  'When was the last time you reviewed it?',
];

export function Problem13() {
  return (
    <section className="bg-section-alt">
      <div className={`${WRAP} py-[72px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-28`}>
        <div>
          <h2 className={H2C}>The big companies have an entire employee benefits department. The small guy has nothing.</h2>
          <p className={`m-0 mt-[22px] max-w-[560px] ${BODY}`}>
            They have Aon. They have Mercer. They have Marsh. Someone owns the policies, the renewals, the certificates, the claims and the paperwork. In your business that job is split between you, finance, HR and whoever spoke to the agent last.
          </p>
          <p className={`m-0 mt-7 font-medium ${BODY}`}>Insurance isn't fire-and-forget. And it isn't a once-a-year review.</p>
        </div>
        <div className="relative mt-9 lg:mt-0 lg:mb-10">
          <img src={`${IMG}/pg-img02-documents.jpg`} alt="" loading="lazy" className="block aspect-[4/3.4] w-full rounded-xl object-cover" />
          <div className="relative mx-3 -mt-7 flex flex-wrap gap-2 rounded-xl border border-hairline-strong bg-white p-4 shadow-[0_14px_34px_rgba(38,29,22,0.12)] lg:absolute lg:right-12 lg:-bottom-10 lg:-left-12 lg:mx-0 lg:mt-0 lg:p-5" data-questions>
            {QUESTIONS.map((q) => (
              <span key={q} className="rounded-full bg-pill px-3 py-[7px] text-[13px]/[1.3] lg:px-3.5 lg:py-2 lg:text-sm">{q}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 04 - what we do. The H2 is Kong's ruled brand idea at the site's H2 size. The
   band is LAYERED (Kong 09:22): Teak ground, rounded-2xl, the two decisions on one line at 1440. */
const STEPS = [
  ['01', 'First, we come to you.', 'You hand over your company information, employee information and policy documents. We store, organise and classify every policy, and the platform fills the forms, so you see what you hold, what it excludes and when it renews.'],
  ['02', 'Every quarter, a few simple questions.', 'Hired somebody? Raised a salary? New premises, new equipment, more cash on site? Nothing applies, ignore us. Yes to one, we contact your broker and follow up.'],
  ['03', 'Request for additional quotations before every renewal.', 'With your consent we pass your information to your broker and request additional quotations before expiry. Stay, switch or keep your programme, with time to decide.'],
];

export function WhatWeDo() {
  const big = 'm-0 mb-2 font-serif text-[38px]/none tracking-[-1px] text-white lg:mb-3 lg:text-5xl';
  const subt = 'm-0 text-[17px]/[1.5] text-[#E8E3DD]';
  return (
    <section>
      <div className={`${WRAP} py-[72px] lg:py-28`}>
        <h2 className={`${H2C} max-w-[760px]`}>You grow the business. We keep track.</h2>
        <div className="mt-8 lg:mt-14 lg:grid lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-[72px]">
          <img src={`${IMG}/pg-img05-onboarding.jpg`} alt="" loading="lazy" className="mb-9 block aspect-[16/10] w-full rounded-xl object-cover lg:mb-0 lg:aspect-[4/5]" />
          <ol className="m-0 list-none p-0" data-steps>
            {STEPS.map(([n, t, b], i) => (
              <li key={n} className="relative grid grid-cols-[56px_1fr] gap-2 pb-8 lg:grid-cols-[72px_1fr] lg:pb-10">
                {i < STEPS.length - 1 && <span aria-hidden className="absolute top-[46px] bottom-1.5 left-[17px] w-px bg-hairline-strong lg:top-[58px] lg:left-[23px]" />}
                <span className="font-serif text-[32px]/none text-primary lg:text-[40px]">{n}</span>
                <div>
                  <h3 className="m-0 mt-1 mb-2.5 font-serif text-[22px]/[1.25] font-normal tracking-[-0.4px] text-text-primary lg:text-[26px]">{t}</h3>
                  <p className={`m-0 ${BODY}`}>{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 rounded-2xl bg-primary-extended px-6 py-7 lg:grid lg:grid-cols-[4fr_3fr_5fr] lg:items-center lg:gap-10 lg:px-12 lg:py-11" data-changed-band>
          <h3 className="m-0 mb-3.5 font-serif text-[26px]/[1.2] font-normal tracking-[-0.6px] text-white lg:mb-0 lg:text-[30px]">Has anything changed?</h3>
          <div className="lg:self-start" data-band-no>
            <p className={big}>No?</p>
            <p className={subt}>Ignore us.</p>
          </div>
          <div className="mt-5 border-t border-white/20 pt-5 lg:mt-0 lg:self-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10" data-band-yes>
            <p className={big}>Yes?</p>
            <p className={subt}>We contact your broker and follow up. Your broker advises you.</p>
          </div>
        </div>
        <p className={`m-0 mt-7 font-medium ${BODY}`}>We're the admin of your admin.</p>
      </div>
    </section>
  );
}

/* 05 - emerging risk. The live P1 block in the mock's arrangement: the four newest emerging-risk
   pages left, the two topic doors right. The eyebrow IS the ER2027 link (CD s2 row 05). */
const EMERGING = [...ARTICLES.filter((a) => a.category === 'emerging-risk')]
  .sort((a, b) => ((b.updated ?? b.published) < (a.updated ?? a.published) ? -1 : 1))
  .slice(0, 4);

/* The row's short line and eyebrow - the same mechanisms as the live block (CD s0k/s0l). */
const shortLine = (a: { short_title?: string; title: string }) =>
  a.short_title ?? (a.title.includes(':') ? a.title.slice(0, a.title.indexOf(':')).trim() : a.title);
const rowDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
const rowEyebrow = (a: { subcategory?: string; updated?: string; published: string }) => {
  const date = rowDate(a.updated ?? a.published);
  return a.subcategory ? `${a.subcategory.replace(/-/g, ' ')} · ${date}` : date;
};

const DOORS = [
  { title: 'Cyber risk', body: 'Follow the alerts on vulnerabilities, scams and breaches from CSA, the police and overseas agencies.', action: 'View cyber alerts', href: '/updates/cyber' },
  { title: 'Regulatory changes', body: 'Follow new requirements and guidance from official Singapore sources.', action: 'View regulatory updates', href: '/updates' },
];

export function EmergingRisk13() {
  const reviewed = REVIEWED ? `Last reviewed ${formatDate(REVIEWED.date)}.` : null;
  return (
    <section className="bg-open-water-wash">
      <div className={`${WRAP} py-[72px] lg:py-28`} data-emerging-block>
        <p className={EYEBROW}>
          <Link to="/emerging-risks-2027" className="text-primary underline underline-offset-[3px]" data-er2027-link>
            Emerging Risks 2027: Singapore Edition&nbsp;&rarr;
          </Link>
        </p>
        <h2 className={H2C}>What changed this week.</h2>
        <div className="mt-7 lg:mt-10 lg:grid lg:grid-cols-[7fr_5fr] lg:gap-6">
          <div className="rounded-xl border border-hairline-strong bg-white px-5 pt-1 pb-5 lg:px-7 lg:pt-2.5 lg:pb-6">
            {EMERGING.map((a) => (
              <Link key={a.slug} to={articleUrl(a.slug)} className="block border-b border-border-primary py-[18px] no-underline">
                <small className="block text-xs font-medium tracking-[0.08em] text-text-secondary uppercase">{rowEyebrow(a)}</small>
                <span className="mt-1.5 block font-serif text-lg/[1.35] text-text-primary lg:text-xl">{shortLine(a)}</span>
              </Link>
            ))}
            <Link to="/guides/emerging-risk" className={`${INK} mt-[18px] inline-block`}>All emerging-risk guides</Link>
          </div>
          <div className="mt-4 grid gap-4 lg:mt-0 lg:gap-6">
            {DOORS.map((d) => (
              <div key={d.title} className="rounded-xl border border-hairline-strong bg-white px-5 py-6 lg:px-7 lg:py-[26px]">
                <h3 className="m-0 font-serif text-2xl font-normal text-text-primary">{d.title}</h3>
                <p className="m-0 mt-2.5 text-base/[1.6]">{d.body}</p>
                {reviewed && <p className="m-0 mt-3.5 text-[13px] text-text-secondary" data-reviewed-meta>{reviewed}</p>}
                <Link to={d.href} className={`${INK} mt-1.5 inline-block`}>{d.action}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 06 - guides by trade. Desktop: the 4 x 2 grid of the eight live photographs with their live
   links (Kong 09:22). Phone: a native select and ONE card (Kong 09:37, CD v1.3, superseding the
   carousel). Every card is in the served HTML at every width - the select only hides. */
function TradeCard({ t }: { t: Trade }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-hairline-strong bg-white">
      <img src={`${IMG}/pg-card-${t.card}.jpg`} alt="" loading="lazy" className="block aspect-[16/10] w-full object-cover" />
      <div className="flex flex-1 flex-col px-[18px] pt-4 pb-5">
        <Link to={t.href} className="font-serif text-[19px]/[1.3] text-text-primary no-underline">{t.title}&nbsp;&rarr;</Link>
        <p className="m-0 mt-4 mb-1 text-[11px] font-medium tracking-[0.12em] text-text-secondary uppercase">Usually holds</p>
        {t.holds.map((h) => (
          <Link key={h.href + h.text} to={h.href} className="block py-[5px] text-sm/[1.45] text-text-primary underline decoration-hairline-strong underline-offset-[3px]">{h.text}</Link>
        ))}
        <Link to={t.href} className="mt-auto self-start pt-3.5 text-sm font-medium text-primary underline underline-offset-[3px]">{t.cta ?? 'Read the checklist'}</Link>
      </div>
    </div>
  );
}

export function Trades13() {
  const [pick, setPick] = useState(0);
  return (
    <section>
      <div className={`${WRAP} py-[72px] lg:py-28`}>
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <h2 className={H2C}>Built for the businesses Singapore actually runs.</h2>
          <p className={`m-0 mt-3.5 max-w-[440px] lg:mt-0 ${BODY}`}>What businesses in your trade commonly hold, and why. Your own cover is a conversation with a licensed adviser.</p>
        </div>
        <div className="mt-7 lg:hidden" data-trade-picker>
          <label htmlFor="trade-pick" className={`${EYEBROW} mb-2.5 block`}>Choose your trade</label>
          <select id="trade-pick" value={pick} onChange={(e) => setPick(Number(e.target.value))} className={PSEL}>
            {TRADES.map((t, k) => <option key={t.id} value={k}>{t.title}</option>)}
          </select>
        </div>
        <div className="mt-4 lg:mt-12 lg:grid lg:grid-cols-4 lg:gap-5" data-trades-grid>
          {TRADES.map((t, k) => (
            <div key={t.id} className={`${k === pick ? 'flex' : 'hidden'} lg:flex`} data-trade-card={t.id}>
              <TradeCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 07 - guides by topic. Desktop: the live group rail, one list open. Phone: a native select
   (Kong 09:37, CD v1.3). `All guides` is an ink link - the dark fill belongs to the request act. */
export function Topics13() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-section-alt">
      <div className={`${WRAP} py-[72px] lg:py-28`}>
        <h2 className={H2C}>Know what your business is required to carry, and who requires it.</h2>
        <p className="m-0 mt-[18px] text-[17px]/[1.6] lg:text-[19px]">Guides by the cover you have been asked for.</p>
        <div className="mt-6 mb-2 lg:hidden" data-topic-picker>
          <label htmlFor="cover-pick" className={`${EYEBROW} mb-2.5 block`}>Choose the cover</label>
          <select id="cover-pick" value={open} onChange={(e) => setOpen(Number(e.target.value))} className={PSEL}>
            {TOPIC_GROUPS.map((g, k) => <option key={g.name} value={k}>{g.name}</option>)}
          </select>
        </div>
        <div className="mt-5 lg:mt-12 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          <div className="hidden border-l border-hairline-strong lg:block" role="tablist" aria-label="Guide groups">
            {TOPIC_GROUPS.map((g, k) => (
              <button
                key={g.name}
                type="button"
                role="tab"
                aria-selected={k === open}
                onClick={() => setOpen(k)}
                className={`-ml-px block w-full cursor-pointer border-l-2 py-3 pl-[22px] text-left font-serif text-xl/[1.3] ${k === open ? 'border-primary-extended text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
              >
                {g.name}
              </button>
            ))}
          </div>
          <div>
            {TOPIC_GROUPS.map((g, k) => (
              <div key={g.name} className={k === open ? 'block' : 'hidden'} role="tabpanel" data-topic-list={k}>
                {g.items.map((it) => (
                  <Link key={it.href} to={it.href} className="block border-b border-border-primary py-4 font-serif text-lg/[1.35] text-text-primary no-underline lg:py-5 lg:text-[22px]">{it.title}</Link>
                ))}
                <Link to={g.moreHref} className={`${INK} mt-[22px] inline-block`}>{g.more}&nbsp;&rarr;</Link>
              </div>
            ))}
          </div>
        </div>
        <Link to="/blog" className={`${INK} mt-8 inline-block lg:mt-12`}>All guides&nbsp;&rarr;</Link>
      </div>
    </section>
  );
}

/* 08 - the founder line. */
export function Founder13() {
  return (
    <section className="bg-primary-extended">
      <div className={`${WRAP} py-[72px] lg:py-28`}>
        <blockquote className="m-0 max-w-[980px] font-serif text-[26px]/[1.35] italic tracking-[-0.4px] text-white lg:text-[40px]">
          &ldquo;We built Covarage to give growing businesses someone who keeps track, follows through and makes sure the right people are paying attention.&rdquo;
        </blockquote>
        <p className="m-0 mt-7 text-[15px]/[1.4] text-pill">Lee Kong Aik, Co-founder and Chief Executive</p>
      </div>
    </section>
  );
}

/* 09 - the close: Kong's H2 (09:22) with the mark above it, and the SAME request card - a second
   instance. One form, two places; the #request anchor stays on the hero's card only. */
export function Close13() {
  const [trade, setTrade] = useState('');
  return (
    <section className="border-b border-border-primary">
      <div className={`${WRAP} py-[72px] lg:grid lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-20 lg:py-28`}>
        <div>
          <img src="/assets/brand/covarage-mark-black.svg" alt="" width={40} height={40} className="mb-[18px] block size-[26px] lg:mb-[22px] lg:size-[30px]" />
          <h2 className={H2C}>You shouldn't have to manage insurance alone.</h2>
          <p className="m-0 mt-[18px] mb-8 text-[17px]/[1.6] lg:mb-9 lg:text-[19px]">Tell us what your business does. Our team calls you back.</p>
          <img src={`${IMG}/pg-img01-reader.jpg`} alt="" loading="lazy" className="hidden aspect-[16/10] w-full rounded-xl object-cover lg:block" />
        </div>
        <RequestCard trade={trade} onTrade={setTrade} anchor={false} flat />
      </div>
    </section>
  );
}
