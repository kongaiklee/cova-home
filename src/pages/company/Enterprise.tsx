import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';

/**
 * /enterprise - DRAWN on branch stepup-v15 (the hub's w46 22:03 (1)(d)); Kong's go 22:45 [RELAY]: "stepup drawing is ok i told cd i
 * want the enterprise page to feel more expensive and premium. different imagery". For an HR director, procurement and IT at a group.
 * Every word is CMO's copy (CMO_COPY_step-up-pages_2026-10-24.md v0.2 (d), COO's check taken in); no per-employee figure anywhere -
 * "Quoted for your group."; no client named until one signs and agrees in writing.
 * THE DRESS (Kong 388 and 390, "the bg color should change also for enterprise? so the mood feels more premium?"): the page runs dark,
 * in the brand's own Teak family - near-black warm grounds, cream type, Horizon as the one accent; no new colour. THE IMAGERY (388:
 * "heavy industries, shipping or oil and gas"): an offshore gas platform at sunset carries the hero, a refinery at blue hour the open
 * book - both free under the Unsplash License, no company or brand readable (../../working/CD_RESEARCH_enterprise-hero_2026-10-24/).
 * BOOK: Kong 389 (2) and 22:38 ("both booking links are the same") - Kong's calendar, in a new tab.
 */
const BOOK = 'https://calendar.app.google/8nyiKRr6RcMbVZgz5';
const IMG = '/assets/images/enterprise';

const GETS: [string, string][] = [
  ['Every company and office', 'Each company and office set up with its own policies, its people and their dependants, on one platform.'],
  ['Connected to your HR system', 'We connect Covarage to your HR system during implementation, or load your staff lists, so joiners and leavers reach their cover.'],
  ['A line for your staff', 'Your staff call or WhatsApp a dedicated number. An AI agent helps them use the platform and hands them to our team when they need a person. It never gives insurance advice.'],
  ['Your own branding', 'Your name, logo and colours, on your own web address, with emails sent from your own domain.'],
  ['Single sign-on', 'Your people sign in through your own identity provider, such as Microsoft Entra ID.'],
  ['Hosting of your choice', 'Our cloud in Singapore, a private instance for your group alone, or your own servers.'],
  ['Tested before go-live', 'Full testing, and an independent penetration test scoped with your IT team.'],
  ['The certifications you need', 'Any certification your group requires of us, obtained for you at cost.'],
];
const BOOK_PARTS: [string, string][] = [
  ['Supplier costs, at cost', 'Hosting, messaging, the penetration test and certifications, passed to you at what they cost us, with no mark-up.'],
  ['Implementation and testing', 'A fixed fee for setting up your group and testing it, agreed before work starts.'],
  ['A monthly service fee', 'One fee for each employee on the platform, each month.'],
];
const TEAMS: [string, string][] = [
  ['HR', "Every employee's cover and their dependants', across the group, kept current as people join and leave."],
  ['Procurement', 'Supplier costs at cost, fixed fees for implementation and testing, and one monthly fee per employee. Nothing in between.'],
  ['IT', 'Single sign-on, hosting of your choice, an independent penetration test, and a written technical overview for your review.'],
];
const START: [string, string][] = [
  ['A discovery session', "We learn how your group's benefits run today, and what your IT team will need."],
  ['A technical overview and a quote', 'A written overview for your IT team to review, and an open-book quote.'],
  ['Implementation', 'We set up each company and office, connect your HR system or load your staff lists, set up sign-in, and test it all before go-live.'],
];

// the dark dress: the Teak family deepened, cream type, Horizon lightened for the dark (one accent)
const RAISED = 'bg-[#1e1712]';
const CREAM = 'text-[#f4eee7]';
const MUTED = 'text-[#b8aca0]';
const ACCENT = 'text-[#9fbcd6]';
const HAIR = 'border-white/10';
const H2 = `m-0 font-serif text-[30px]/[1.12] font-normal tracking-[-0.9px] ${CREAM} lg:text-[46px] lg:tracking-[-1.5px]`;
const EYEBROW = `m-0 text-xs font-medium tracking-[0.16em] uppercase ${ACCENT}`;

function Book({ className }: { className: string }) {
  return <a href={BOOK} target="_blank" rel="noopener noreferrer" className={className} data-book>Book a discovery session</a>;
}

export default function Enterprise() {
  return (
    <div className={`bg-[#15100c] ${CREAM}`} data-enterprise-dark>
      <Seo title="Covarage for Enterprise | Covarage" description="Employee benefits across every company and country in your group, priced on an open book: supplier costs at cost and a monthly fee per employee." path="/enterprise" />
      <LanderHeader />
      <main data-enterprise>
        <section className="relative isolate overflow-hidden bg-[#1c1510]" data-enterprise-hero>
          <img src={`${IMG}/hero-offshore.jpg`} alt="An offshore gas platform standing in a calm sea at sunset" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-[64%_50%] lg:object-[60%_55%]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(21,16,12,0.15)_0%,rgba(21,16,12,0.55)_45%,rgba(21,16,12,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(21,16,12,0.9)_0%,rgba(21,16,12,0.62)_38%,rgba(21,16,12,0.06)_70%)]" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(21,16,12,0)_0%,#15100c_100%)]" />
          <div className={`${WRAP} flex min-h-[660px] items-end pt-40 pb-16 lg:min-h-[min(88vh,840px)] lg:items-center lg:py-28`}>
            <div className="max-w-[660px]">
              <p className={EYEBROW}>Covarage Enterprise</p>
              <h1 className={`m-0 mt-4 font-serif text-[36px]/[1.06] font-normal tracking-[-1px] text-balance ${CREAM} lg:text-[66px] lg:tracking-[-2.2px]`}>
                Employee benefits for your whole group, priced on an open book.
              </h1>
              <p className="m-0 mt-5 max-w-[560px] text-base/[1.6] text-[#e6ddd3] lg:text-[19px]">
                You pay what our suppliers charge, at cost, a fixed fee to set up and test, and one monthly service fee for each employee.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Book className="inline-flex items-center justify-center rounded-md bg-[#f4eee7] px-5 py-3 text-[15px] font-medium text-[#2a1f17] no-underline transition hover:bg-white" />
                <Link to="/security" className="inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 text-[15px] font-medium text-white no-underline transition hover:bg-white/10">Read about security</Link>
              </div>
              <p className="m-0 mt-6 max-w-[520px] text-[13px]/[1.6] text-[#cfc4b8]">Covarage keeps the records and does the admin. Advice, quotations and cover come from licensed intermediaries and insurers.</p>
            </div>
          </div>
        </section>

        <section className={`${WRAP} py-20 lg:py-28`}>
          <h2 className={H2}>What your group gets</h2>
          <div className={`mt-10 grid gap-px overflow-hidden rounded-2xl border ${HAIR} bg-white/10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4`} data-gets>
            {GETS.map(([t, b], k) => (
              <div key={t} className={`${RAISED} p-6 lg:p-8`}>
                <span className={`font-serif text-[15px] ${ACCENT} tabular-nums`}>{String(k + 1).padStart(2, '0')}</span>
                <h3 className={`m-0 mt-4 font-serif text-[21px]/[1.25] font-normal ${CREAM}`}>{t}</h3>
                <p className={`m-0 mt-2.5 text-sm/[1.65] ${MUTED}`}>{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative isolate overflow-hidden" data-open-book>
          <img src={`${IMG}/band-refinery.jpg`} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover object-[60%_40%]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#15100c_0%,rgba(21,16,12,0.5)_24%,rgba(21,16,12,0.58)_76%,#15100c_100%)]" />
          <div className={`${WRAP} py-24 lg:py-36`}>
            <h2 className={H2}>Priced on an open book</h2>
            <div className={`mt-10 grid gap-px overflow-hidden rounded-2xl border ${HAIR} bg-white/10 md:grid-cols-3 lg:mt-14`}>
              {BOOK_PARTS.map(([t, b]) => (
                <div key={t} className="bg-[rgba(21,16,12,0.78)] p-6 backdrop-blur-sm lg:p-9">
                  <h3 className={`m-0 font-serif text-[22px]/[1.25] font-normal ${CREAM}`}>{t}</h3>
                  <p className={`m-0 mt-3 text-[15px]/[1.65] ${MUTED}`}>{b}</p>
                </div>
              ))}
            </div>
            <p className={`m-0 mt-12 font-serif text-[34px]/[1.12] tracking-[-0.8px] ${CREAM} lg:text-[52px] lg:tracking-[-1.6px]`} data-quoted>Quoted for your group.</p>
          </div>
        </section>

        <section className={`${WRAP} py-20 lg:py-28`}>
          <h2 className={H2}>For each team that signs off</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 lg:mt-14 lg:gap-14">
            {TEAMS.map(([t, b]) => (
              <div key={t} className={`border-t ${HAIR} pt-6`}>
                <h3 className={`m-0 font-serif text-[26px]/[1.2] font-normal ${CREAM}`}>{t}</h3>
                <p className={`m-0 mt-3 text-base/[1.65] ${MUTED}`}>{b}</p>
                {t === 'IT' && <Link to="/security" className={`mt-4 inline-block text-[15px] font-medium ${ACCENT} no-underline hover:underline`}>Read about security&nbsp;&rarr;</Link>}
              </div>
            ))}
          </div>
        </section>

        <section className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-20 lg:py-28`}>
            <h2 className={H2}>How we start</h2>
            <ol className="m-0 mt-10 grid list-none gap-4 p-0 md:grid-cols-3 lg:mt-14 lg:gap-5">
              {START.map(([t, b], k) => (
                <li key={t} className={`rounded-2xl border ${HAIR} ${RAISED} p-6 lg:p-8`}>
                  <span className={`flex size-9 items-center justify-center rounded-full border border-[#9fbcd6]/50 font-serif text-[15px] ${ACCENT} tabular-nums`}>{k + 1}</span>
                  <h3 className={`m-0 mt-5 font-serif text-[22px]/[1.25] font-normal ${CREAM}`}>{t}</h3>
                  <p className={`m-0 mt-2.5 text-[15px]/[1.65] ${MUTED}`}>{b}</p>
                </li>
              ))}
            </ol>
            <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl bg-[#f4eee7] p-8 text-[#2a1f17] sm:flex-row sm:items-center sm:justify-between lg:mt-24 lg:p-12">
              <p className="m-0 font-serif text-[26px]/[1.2] lg:text-[36px]">Ready to talk about your group?</p>
              <Book className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#2a1f17] px-5 py-3 text-[15px] font-medium text-white no-underline transition hover:opacity-90" />
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
