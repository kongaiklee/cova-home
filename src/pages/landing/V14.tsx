import { Fragment, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IMG, INSURERS, TOPIC_GROUPS, TRADES } from './data';
import RequestCard from './RequestCard';
import { WRAP } from './Sections';
import { REVIEWED, formatDate } from '../../content/updates';
import { articleUrl } from '../../content/articles';
import { DESKTOP_BREAKS, DOORS, EMERGING, NUMBERS, PARTNERS, PHONE_BREAKS, STEPS, rowEyebrow, shortLine } from './V13';

/**
 * THE LANDER v1.4 - a PREVIEW on branch homepage-v14 (CD, 2026-10-24), not live. Kong 2026-10-24 (CD's KONG_LOG 373-375):
 * "i want to update covarage's homepage to make it look more established", "i like the stripe mercury ramp xero styles",
 * "work on a preview for me before we push anything live thanks, separate branch".
 *
 * The direction of those four, in Covarage's own logo, fonts and colours (Kong: change only the imagery): a light canvas and a
 * two-tone statement (Stripe), one button and a quieter second link (Ramp, Mercury), the product itself under the statement
 * (Ramp, Xero), proof right under the hero (Stripe's logo row), one band of big numbers (Stripe), product tiles (Stripe, Ramp),
 * industry cards with real people (Xero), a closing band with the one action (Xero), a footer in columns.
 *
 * Every word is copy of record from V13 (CMO's approved v1.3) unless named here as new: the news bar's short phone link, "See
 * how it works", the hero's floating check-in card (the platform's own words), the nav's group names. Kong's rulings kept: his
 * logo heading and order (2026-10-01, Kong 344), each logo its owner's own file (Kong 330), Guides in the header (his two-jobs
 * frame), the one #request anchor - now on the close's card.
 */

const H2 = 'm-0 font-serif text-[32px]/[1.1] font-normal tracking-[-1px] text-text-primary-extended lg:text-[48px] lg:tracking-[-1.6px]';
const SOFT = 'text-[#a3978c]';
const EYEBROW = 'm-0 text-xs font-medium tracking-[0.14em] uppercase';
const BODY = 'text-base/[1.6] lg:text-[17px]';
const BTN = 'inline-flex items-center justify-center rounded-md bg-primary-extended px-5 py-3 text-[15px] font-medium text-white no-underline transition hover:opacity-90';
const BTN2 = 'inline-flex items-center justify-center gap-1.5 rounded-md border border-hairline-strong bg-white px-5 py-3 text-[15px] font-medium text-text-primary no-underline transition hover:border-text-secondary';
const PRODUCT = '/assets/images/lander/product';

/* A screen of the platform in a plain window frame - demo records only (the live sign-off of 2026-10-21, demo account). */
function Screen({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-hairline-strong bg-white shadow-[0_24px_60px_rgba(38,29,22,0.16)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-border-primary bg-[#f6f3f0] px-3.5 py-2.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#e2dcd6]" /><span className="size-2.5 rounded-full bg-[#e2dcd6]" /><span className="size-2.5 rounded-full bg-[#e2dcd6]" />
        <span className="ml-3 text-[11px] text-text-secondary">platform.covarage.com</span>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </div>
  );
}

/* 00 - the news bar: one line of news above the header (Airwallex, Ramp, Mercury). The words are the ER2027 band's. */
export function NewsBar14() {
  return (
    <div className="bg-primary-extended text-white" data-news-bar>
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-5 py-2.5 text-[13px]/[1.4] lg:px-[100px]">
        <span className="font-medium">Emerging Risks 2027: Singapore Edition</span>
        <span className="hidden text-white/70 md:inline">What Singapore businesses expect in 2027.</span>
        <Link to="/emerging-risks-2027" className="font-medium text-white underline decoration-white/45 underline-offset-4">
          <span className="sm:hidden">Take part&nbsp;&rarr;</span>
          <span className="hidden sm:inline">Take part, or get a copy&nbsp;&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

/* 01 - the hero: the statement in two tones (Stripe), one button and a quieter link, then the product over a real photograph
   (Ramp's product composite, Xero's person with a card on it). */
export function Hero14() {
  return (
    <section className="overflow-hidden" data-hero>
      <div className={`${WRAP} pt-12 pb-10 lg:pt-24 lg:pb-14`}>
        <h1 className="m-0 max-w-[1040px] font-serif text-[34px]/[1.08] font-normal tracking-[-1px] text-text-primary-extended text-balance lg:text-[56px] lg:tracking-[-1.8px]">
          Your insurance team, without the insurance department.{' '}
          <span className={SOFT}>You run the business. Your broker advises you. We do the insurance admin in between.</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
          <a href="#request" className={BTN}>Request a call</a>
          <a href="#tour" className={BTN2}>See how it works&nbsp;&rarr;</a>
        </div>
      </div>
      <div className={`${WRAP} pb-16 lg:pb-24`}>
        <div className="relative h-[460px] overflow-hidden rounded-2xl bg-section-alt sm:h-[540px] lg:h-[620px]" data-hero-visual>
          <img src={`${IMG}/pg-hero-fnb.jpg`} alt="" className="absolute inset-0 h-[64%] w-full object-cover object-[38%_50%] lg:h-full" />
          <div className="absolute top-4 left-4 max-w-[250px] rounded-xl bg-white/95 px-4 py-3 shadow-[0_12px_30px_rgba(38,29,22,0.18)] lg:top-10 lg:left-10" aria-hidden>
            <p className="m-0 text-[13px] font-semibold text-text-primary">Quarterly check-in</p>
            <p className="m-0 mt-0.5 text-[12px]/[1.45] text-text-secondary">Q4 2026: has anything changed since September?</p>
          </div>
          <Screen
            src={`${PRODUCT}/home.webp`}
            alt="The Covarage platform's home for a business: active policies, annual premiums, what renews next and what needs a decision"
            className="absolute right-[-38%] bottom-[-6%] w-[128%] sm:right-[-12%] sm:w-[96%] lg:right-[-2%] lg:bottom-[-16%] lg:w-[58%]"
          />
        </div>
      </div>
    </section>
  );
}

/* 02 - proof under the hero (Stripe's logo row): Kong's heading and his order, each logo its owner's light-ground file at one
   optical height on Sailcloth, a tile only where its owner's file needs one. */
export function Proud14() {
  const shown = PARTNERS.filter((p) => p.on);
  return (
    <section className="border-y border-border-primary" data-proud>
      <div className={`${WRAP} py-10 lg:py-12`}>
        <p className={`${EYEBROW} mb-6 text-center text-text-secondary lg:mb-8`}>Proud to work with and alongside</p>
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-[22px] gap-y-6 p-0 lg:justify-between lg:gap-8">
          {shown.map((p, i) => (
            <Fragment key={p.slug}>
              <li className="flex items-center" data-partner={p.slug}>
                <span
                  className={`flex items-center ${p.light.tile ? 'rounded-lg bg-(--tl) px-[11px] py-[7px]' : ''} ${p.name ? 'gap-2' : ''}`}
                  style={{ '--tl': p.light.tile } as CSSProperties}
                  {...(p.name ? { role: 'img', 'aria-label': p.alt } : {})}
                >
                  <img
                    src={`${IMG}/partners/${p.light.file}`}
                    alt={p.name ? '' : p.alt}
                    className="block h-(--ph) w-auto lg:h-(--dh)"
                    style={{ '--ph': `${p.phonePx}px`, '--dh': `${p.desktopPx}px` } as CSSProperties}
                    decoding="async"
                  />
                  {p.name && (
                    <span className="font-['Space_Grotesk',Inter,sans-serif] text-[13px]/none font-bold tracking-[-0.02em] lg:text-base/none" style={{ color: p.name.light }} aria-hidden>
                      {p.name.text}
                    </span>
                  )}
                </span>
              </li>
              {i < shown.length - 1 && PHONE_BREAKS.includes(i + 1) && <li aria-hidden className="h-0 basis-full lg:hidden" />}
              {i < shown.length - 1 && DESKTOP_BREAKS.includes(i + 1) && <li aria-hidden className="hidden h-0 basis-full lg:block" />}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 03 - one band of big numbers (Stripe's "backbone" band), with the panel of insurers in their own colours. */
export function Numbers14() {
  return (
    <section className="bg-primary-extended text-white" data-numbers>
      <div className={`${WRAP} py-16 lg:py-24`}>
        <p className={`${EYEBROW} text-[#C2D4E2]`}>Already placed by the advisers we introduce you to</p>
        <dl className="m-0 mt-6 grid grid-cols-3 border-y border-white/15 lg:mt-8">
          {NUMBERS.map(([n, t], k) => (
            <div key={n} className={`flex flex-col py-6 lg:py-10 ${k ? 'border-l border-white/15 pl-3 lg:pl-10' : 'pr-3'}`}>
              <dd className="order-first m-0 font-serif text-[23px]/none tracking-[-0.6px] whitespace-nowrap min-[400px]:text-[26px] lg:text-[84px] lg:tracking-[-3px]">{n}</dd>
              <dt className="mt-2 text-[13px] text-white/75 lg:mt-4 lg:text-base">{t}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-8 grid grid-cols-6 gap-1.5 lg:mt-12 lg:grid-cols-12 lg:gap-2.5" data-insurers>
          {INSURERS.map((i) => (
            <span key={i.slug} className="flex aspect-square items-center justify-center rounded-lg bg-white p-1.5 lg:p-2">
              <img src={`${IMG}/insurers/logo-${i.slug}.gif`} alt={i.alt} loading="lazy" className="block max-h-full w-full object-contain" />
            </span>
          ))}
        </div>
        <p className="m-0 mt-7 max-w-[760px] text-[13px]/[1.5] text-white/70">
          All cover is placed by licensed intermediaries. The figures and the panel are theirs. Set up your company yourself, or send it to us to set up.
        </p>
      </div>
    </section>
  );
}

/* 05 - how it works: the three steps as product tiles (Stripe, Ramp), each with its screen, and the "has anything changed?" card. */
function Tile({ n, title, body, children, className = '' }: { n: string; title: string; body: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl bg-section-alt ${className}`}>
      <div className="px-6 pt-7 pb-6 lg:px-9 lg:pt-9">
        <p className="m-0 font-serif text-[22px]/none text-primary">{n}</p>
        <h3 className="m-0 mt-4 font-serif text-[24px]/[1.2] font-normal tracking-[-0.5px] text-text-primary-extended lg:text-[28px]">{title}</h3>
        <p className={`m-0 mt-3 max-w-[560px] text-text-secondary ${BODY}`}>{body}</p>
      </div>
      <div className="mt-auto pl-6 lg:pl-9">{children}</div>
    </div>
  );
}

export function How14() {
  const [a, b, c] = STEPS;
  return (
    <section id="how" className="scroll-mt-24" data-how>
      <div className={`${WRAP} py-16 lg:py-28`}>
        <h2 className={`${H2} max-w-[900px]`}>You grow the business. We keep track. <span className={SOFT}>We're the admin of your admin.</span></h2>
        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          <Tile n={a[0]} title={a[1]} body={a[2]} className="lg:col-span-7">
            <Screen src={`${PRODUCT}/policies.webp`} alt="Every policy in one place: insurer, policy number, expiry date, premium and broker" className="rounded-r-none rounded-bl-none border-r-0 border-b-0" />
          </Tile>
          <Tile n={b[0]} title={b[1]} body={b[2]} className="lg:col-span-5">
            <Screen src={`${PRODUCT}/needs.webp`} alt="What needs the business: a quote to decide on, a renewal to review, the quarterly check-in" className="rounded-r-none rounded-bl-none border-r-0 border-b-0" />
          </Tile>
          <Tile n={c[0]} title={c[1]} body={c[2]} className="lg:col-span-7">
            <Screen src={`${PRODUCT}/renewals.webp`} alt="Renewals by year, each with its insurer, premium, broker, days to go and status" className="rounded-r-none rounded-bl-none border-r-0 border-b-0" />
          </Tile>
          <div className="flex flex-col justify-between rounded-2xl bg-primary-extended px-6 py-8 text-white lg:col-span-5 lg:px-9 lg:py-10" data-changed-band>
            <h3 className="m-0 font-serif text-[26px]/[1.2] font-normal tracking-[-0.6px] lg:text-[32px]">Has anything changed?</h3>
            <div className="mt-8 grid gap-6">
              <div><p className="m-0 font-serif text-[44px]/none lg:text-6xl">No?</p><p className="m-0 mt-2 text-[17px] text-[#E8E3DD]">Ignore us.</p></div>
              <div className="border-t border-white/20 pt-6"><p className="m-0 font-serif text-[44px]/none lg:text-6xl">Yes?</p><p className="m-0 mt-2 text-[17px]/[1.5] text-[#E8E3DD]">We contact your broker and follow up. Your broker advises you.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 05b - the tour, public (the hub's w46 19:04; Kong in its window 19:0x: "what you are showing here is not really a quote-unquote demo,
   right? ... I think this static images one can actually go on the lander."). No entry, no notice, no tracking: anyone on the page can
   click through. Real screens of the live platform's demo company (the 2026-10-20/21 captures, demo accounts, contact details masked;
   COO checked them, 18:26), in TWO views (Kong 384-385, 2026-10-24: "simplify to 2 views"; the live platform's roles unchanged):
   "Business owner or HR" - the owner's six screens and HR's Employees - and Employee. Every word is CMO's: the
   entry and the last screen (copy v0.6 s0, the hub's 19:06), the picker, each role's line, the frame and one caption per screen (v0.5).
   Recaptured 2026-10-24 23:2x on the live demo company after its UEN fix (the hub's 23:18; CD's tools/tour_cut.py); the Employee's
   empty Alerts screen dropped (Kong 23:1x in TM's window, "3. no need"). */
const TOUR: { id: string; label: string; line: string; screens: [string, string][] }[] = [
  { id: 'admin', label: 'Business owner or HR', line: 'Every policy, renewal and request for the company, and who each policy covers, in one place.', screens: [
      ['Home', 'Where an owner or HR starts: what needs attention now, and what is already moving.'],
      ['Policies', 'Every policy the company holds, with its insurer, broker, number and expiry date, in one list.'],
      ['A policy', 'One policy in full: what it is for, who is covered, its documents and when it renews.'],
      ['Renewals', 'Every renewal ahead, and Compare at renewal to have the broker bring quotes in good time.'],
      ['Requests', 'Each request to a broker, from new cover to a review, and where it stands.'],
      ['Employees', 'The staff list, and the cover each person is on.'],
      ['My brokers', 'The brokers who look after the company, and the policies each one handles.'],
    ] },
  { id: 'employee', label: 'Employee', line: 'What I am covered for, my family\'s cover, and help when I need it.', screens: [
      ['Home', 'What an employee sees first: their own cover, in plain words.'],
      ['My cover', 'Every policy the employee is on, from work injury to medical.'],
      ['A cover', 'One cover in detail: what it is, the insurer, and the dates it runs.'],
      ['Another cover', 'Each cover has its own page, with family cover where the policy allows it.'],
      ['Concierge', 'Questions to Covarage, asked and answered on a ticket.'],
    ] },
];
const TOUR_IMG = '/assets/images/lander/tour';
/* The homepage itself carries no sign-up button (Log in, Request a call); this is the site's own sign-up link, as the pack page has it. */
const SIGNUP_URL = 'https://platform.covarage.com/sign-up';

export function Tour14() {
  const [role, setRole] = useState(0);
  const [at, setAt] = useState(0);
  const r = TOUR[role];
  const [title, caption] = r.screens[at];
  const last = at === r.screens.length - 1;
  const pick = (k: number) => { setRole(k); setAt(0); };
  return (
    <section id="tour" className="scroll-mt-24 bg-section-alt" data-tour>
      <div className={`${WRAP} py-16 lg:py-24`}>
        <p className={`${EYEBROW} text-primary`}>See how it works</p>
        <h2 className={`${H2} mt-4 max-w-[860px]`}>See Covarage the way your business, your HR team and your staff will.</h2>
        <p className={`${BODY} m-0 mt-4 max-w-[640px] text-text-secondary`}>A short tour of the real platform, on a demo company with no real data. Pick a view to start.</p>
        <h3 className="m-0 mt-10 font-serif text-[20px]/[1.25] font-normal text-text-primary-extended lg:mt-14 lg:text-[24px]">Whose view would you like to see?</h3>
        <div role="tablist" aria-label="Whose view would you like to see?" className="mt-4 grid grid-cols-2 gap-2 lg:gap-4">
          {TOUR.map((t, k) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={k === role}
              aria-controls="tour-panel"
              onClick={() => pick(k)}
              className={`cursor-pointer rounded-xl border p-3 text-left transition lg:p-5 ${k === role ? 'border-primary-extended bg-white shadow-[0_12px_30px_rgba(38,29,22,0.10)]' : 'border-hairline-strong bg-white/60 hover:bg-white'}`}
              data-tour-role={t.id}
            >
              <span className="block font-serif text-[16px]/[1.2] text-text-primary-extended lg:text-[22px]">{t.label}</span>
              <span className="mt-1.5 hidden text-sm/normal text-text-secondary lg:block">{t.line}</span>
            </button>
          ))}
        </div>
        <p className="m-0 mt-3 text-sm/[1.6] text-text-secondary">Demo company: Marina Bay Logistics Pte. Ltd. (DEMO). Its people, policies and figures are made up.</p>
        <div id="tour-panel" role="tabpanel" className="mt-8 lg:mt-10">
          <p className="m-0 text-sm text-text-secondary tabular-nums" data-tour-at>{r.label} view&nbsp;&nbsp;|&nbsp;&nbsp;{at + 1} of {r.screens.length}</p>
          <h4 className="m-0 mt-2 font-serif text-[22px]/[1.2] font-normal text-text-primary-extended lg:text-[28px]">{title}</h4>
          <p className="m-0 mt-2 max-w-[760px] text-base/[1.6] text-text-secondary" data-tour-caption>{caption}</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-hairline-strong bg-white shadow-[0_24px_60px_rgba(38,29,22,0.12)]">
            <div className="flex items-center gap-1.5 border-b border-border-primary bg-[#f6f3f0] px-3.5 py-2.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#e2dcd6]" /><span className="size-2.5 rounded-full bg-[#e2dcd6]" /><span className="size-2.5 rounded-full bg-[#e2dcd6]" />
              <span className="ml-3 text-[11px] text-text-secondary">platform.covarage.com</span>
            </div>
            <picture>
              <source media="(max-width: 640px)" srcSet={`${TOUR_IMG}/${r.id}-${at + 1}-phone.webp`} />
              <img
                src={`${TOUR_IMG}/${r.id}-${at + 1}-desk.webp`}
                alt={`${r.label} view: ${title}, on the demo company`}
                decoding="async"
                className="block w-full"
                data-tour-screen
              />
            </picture>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <button type="button" onClick={() => setAt(Math.max(0, at - 1))} disabled={at === 0} className={`${BTN2} disabled:cursor-default disabled:opacity-40`}>Back</button>
            <div className="flex gap-1.5" aria-hidden>
              {r.screens.map((_, k) => <span key={k} className={`size-2 rounded-full ${k === at ? 'bg-primary-extended' : 'bg-pill'}`} />)}
            </div>
            {last ? (
              <button type="button" onClick={() => pick((role + 1) % TOUR.length)} className={BTN2}>See another view</button>
            ) : (
              <button type="button" onClick={() => setAt(at + 1)} className={BTN}>Next</button>
            )}
          </div>
          {last && (
            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-hairline-strong bg-white p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6" data-tour-end>
              <p className="m-0 font-serif text-[20px]/[1.3] text-text-primary-extended lg:text-[24px]">Ready to see your own policies and renewal dates in one place?</p>
              <a href={SIGNUP_URL} className={`${BTN} shrink-0`}>Sign up</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* 06 - a customer's story, coming soon (Stripe's story card). Kong 2026-10-24 (CD's KONG_LOG 377): "for testimonial use a nice
   picture of zames and his fleet from repair.sg ... and indicate that the customer tesimonial is coming soon". The photograph is
   Repair.sg's own (its website's main image, 2025); the page names Zames as the person whose story is coming, never as a person in
   the picture, and puts no words in his mouth. Before live: Repair.sg's written OK to use the photograph. */
export function Story14() {
  return (
    <section className="bg-section-alt" data-story>
      <div className={`${WRAP} py-16 lg:py-24`}>
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="/assets/images/lander/stories/repair-sg-fleet.webp"
            alt="A row of yellow Repair.sg vans on a shophouse street, two of the team standing in front"
            loading="lazy"
            decoding="async"
            className="block aspect-4/3 w-full object-cover object-[30%_60%] sm:aspect-video lg:aspect-1240/600"
          />
          <div className="relative -mt-10 mx-3 mb-3 rounded-xl bg-white p-6 shadow-[0_18px_44px_rgba(38,29,22,0.16)] sm:absolute sm:right-6 sm:bottom-6 sm:m-0 sm:max-w-[420px] lg:right-10 lg:bottom-10 lg:p-8" data-story-card>
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center rounded-lg bg-[#333333] px-[11px] py-[7px]">
                <img src="/assets/images/lander/partners/repair-sg.png" alt="Repair.sg" className="block h-5 w-auto" />
              </span>
              <span className="rounded-full bg-pill px-3 py-1 text-xs font-medium tracking-[0.08em] text-text-primary uppercase">Coming soon</span>
            </div>
            <p className={`${EYEBROW} mt-6 text-primary`}>Customer story</p>
            <p className="m-0 mt-3 font-serif text-[24px]/[1.25] text-text-primary-extended lg:text-[30px]">Zames Chew, <span className="whitespace-nowrap">co-founder</span> of Repair.sg, on working with Covarage.</p>
            <p className="m-0 mt-3 text-sm/[1.6] text-text-secondary">His full story is coming soon.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 07 - industries (Xero's cards): every trade as a photograph and its checklist, eight at every width, two across on a phone. */
export function Trades14() {
  return (
    <section data-trades>
      <div className={`${WRAP} py-16 lg:py-28`}>
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <h2 className={`${H2} max-w-[640px]`}>Built for the businesses Singapore actually runs.</h2>
          <p className={`m-0 mt-4 max-w-[440px] text-text-secondary lg:mt-0 ${BODY}`}>What businesses in your trade commonly hold, and why. Your own cover is a conversation with a licensed adviser.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-3.5 gap-y-8 lg:mt-14 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {TRADES.map((t) => (
            <Link key={t.id} to={t.href} className="group block no-underline" data-trade-card={t.id}>
              <img src={`${IMG}/pg-card-${t.card}.jpg`} alt="" loading="lazy" className="block aspect-4/3 w-full rounded-2xl object-cover transition group-hover:opacity-90" />
              <h3 className="m-0 mt-3.5 font-serif text-[17px]/[1.3] font-normal text-text-primary-extended lg:mt-4 lg:text-[21px]">{t.title}</h3>
              <p className="m-0 mt-1.5 text-[13px] font-medium text-primary lg:text-sm">{t.cta ?? 'Read the checklist'}&nbsp;&rarr;</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 08 - resources, one band (the Emerging Risks and Topics sections merged): the ER2027 report, this week's changes, the two
   doors, and the guides by cover. */
export function Resources14() {
  const reviewed = REVIEWED ? `Last reviewed ${formatDate(REVIEWED.date)}.` : null;
  return (
    <section className="bg-open-water-wash" data-resources>
      <div className={`${WRAP} py-16 lg:py-28`}>
        <h2 className={`${H2} max-w-[820px]`}>Know what your business is required to carry, and who requires it.</h2>
        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          <div className="grid overflow-hidden rounded-2xl bg-primary-extended text-white lg:col-span-7 lg:grid-cols-[1fr_36%]" data-er2027-band>
            <div className="px-6 py-8 lg:px-9 lg:py-10">
              <h3 className="m-0 font-serif text-[28px]/[1.12] font-normal tracking-[-1px] lg:text-[32px]">Emerging Risks 2027:<br />Singapore Edition</h3>
              <p className="m-0 mt-2.5 text-[18px]/[1.4] text-[#C2D4E2]">What Singapore businesses expect in 2027.</p>
              <p className="m-0 mt-4 text-[15px]/[1.6] text-[#E8E3DD]">We are interviewing business leaders across Singapore about the risks they expect next year, and what they have done about each one. The report publishes in January 2027.</p>
              <Link to="/emerging-risks-2027" className="mt-5 inline-block text-[15px] font-medium text-white underline decoration-white/45 underline-offset-4">Take part, or get a copy&nbsp;&rarr;</Link>
            </div>
            <img src="/assets/images/lander/er2027-band.jpg" alt="" loading="lazy" className="block h-full min-h-[200px] w-full object-cover" />
          </div>
          <div className="rounded-2xl border border-hairline-strong bg-white px-6 pt-6 pb-6 lg:col-span-5 lg:px-8">
            <p className={`${EYEBROW} text-text-secondary`}>What changed this week</p>
            {EMERGING.map((a) => (
              <Link key={a.slug} to={articleUrl(a.slug)} className="block border-b border-border-primary py-4 no-underline">
                <small className="block text-xs font-medium tracking-[0.08em] text-text-secondary uppercase">{rowEyebrow(a)}</small>
                <span className="mt-1 block font-serif text-[17px]/[1.35] text-text-primary">{shortLine(a)}</span>
              </Link>
            ))}
            <Link to="/guides/emerging-risk" className="mt-4 inline-block text-sm font-medium text-text-primary underline decoration-hairline-strong underline-offset-4">All emerging-risk guides</Link>
          </div>
          {DOORS.map((d) => (
            <div key={d.title} className="rounded-2xl border border-hairline-strong bg-white px-6 py-7 lg:col-span-6 lg:px-8">
              <h3 className="m-0 font-serif text-2xl font-normal text-text-primary-extended">{d.title}</h3>
              <p className="m-0 mt-2.5 text-base/[1.6]">{d.body}</p>
              {reviewed && <p className="m-0 mt-3 text-[13px] text-text-secondary">{reviewed}</p>}
              <Link to={d.href} className="mt-3 inline-block text-sm font-medium text-text-primary underline decoration-hairline-strong underline-offset-4">{d.action}</Link>
            </div>
          ))}
        </div>
        <div className="mt-10 lg:mt-12">
          <p className="m-0 text-[17px]/[1.6] lg:text-[19px]">Guides by the cover you have been asked for.</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {TOPIC_GROUPS.map((g) => (
              <Link key={g.name} to={g.moreHref} className="rounded-full border border-hairline-strong bg-white px-4 py-2 text-sm text-text-primary no-underline transition hover:border-text-secondary">{g.name}</Link>
            ))}
            <Link to="/blog" className="rounded-full bg-primary-extended px-4 py-2 text-sm font-medium text-white no-underline">All guides&nbsp;&rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 09 - the founder line, centred (Mercury's quote). */
export function Founder14() {
  return (
    <section data-founder>
      <div className={`${WRAP} py-20 text-center lg:py-32`}>
        <img src="/assets/brand/covarage-mark-black.svg" alt="" width={40} height={40} className="mx-auto mb-7 block size-7 lg:size-8" />
        <blockquote className="m-0 mx-auto max-w-[940px] font-serif text-[26px]/[1.35] tracking-[-0.4px] text-text-primary-extended italic lg:text-[40px]">
          &ldquo;We built Covarage to give growing businesses someone who keeps track, follows through and makes sure the right people are paying attention.&rdquo;
        </blockquote>
        <p className="m-0 mt-7 text-[15px]/[1.4] text-text-secondary">Lee Kong Aik, Co-founder and Chief Executive</p>
      </div>
    </section>
  );
}

/* 10 - the close (Xero's band with its card): the one request form, carrying the page's #request anchor. */
export function Close14() {
  const [trade, setTrade] = useState('');
  return (
    <section className="bg-primary-extended" data-close>
      <div className={`${WRAP} py-16 lg:grid lg:grid-cols-[6fr_5fr] lg:items-center lg:gap-20 lg:py-28`}>
        <div className="mb-10 lg:mb-0">
          <h2 className="m-0 font-serif text-[32px]/[1.1] font-normal tracking-[-1px] text-white lg:text-[48px] lg:tracking-[-1.6px]">You shouldn't have to manage insurance alone.</h2>
          <p className="m-0 mt-5 text-[17px]/[1.6] text-[#E8E3DD] lg:text-[19px]">Tell us what your business does. Our team calls you back.</p>
        </div>
        <RequestCard trade={trade} onTrade={setTrade} />
      </div>
    </section>
  );
}
