import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';

/**
 * /pricing - PREVIEW on branch homepage-v14 (CD 2026-10-24). Kong in the hub's window 19:1x: "Can you draw up those pricing and
 * features page to show coverage free, what does it come with, right? Then the coverage, the other two plans, and the coverage
 * enterprise, right? What is customizable?"; then in CMO's window 20:13: "I think good to break it into modules, right? Until each
 * module, what price, what do you receive, right?" A new public page: drawn for Kong before TM builds it (his 2026-10-17 rule).
 * Every word is CMO's copy v0.7 (v0.5's modules; v0.6, COO's three shoulds; v0.7, each module's "who it's for" by the moment a
 * business needs it - Kong's yes to the step-up, the hub's 22:03): four modules, each with its price and what you receive; under them the four plans built from the
 * modules, at the totals Kong signed off (19:42: S$129 and S$379); monthly only with no yearly toggle until the partner's price is
 * known; USD first as the partner's own page has it. The security partner is NOT named until it approves in writing (Kong 19:1x) -
 * the "Protection by StrongKeep" slot and its logo stay empty. The plans say "Talk to us" until a checkout exists (TM). The
 * Compliance module's US$200 / S$250 is CFO's call (the hub's 20:17: only S$129 + S$250 makes the ruled S$379). COO checks every
 * line against its source before live.
 */
type Cur = 'USD' | 'SGD';
const SIGNUP_URL = 'https://platform.covarage.com/sign-up';
const MONEY: Record<string, Record<Cur, string>> = {
  cyber: { USD: 'US$99', SGD: 'S$129' },
  compliance: { USD: 'US$200', SGD: 'S$250' },
  complianceAll: { USD: 'US$299', SGD: 'S$379' },
  device: { USD: 'US$5.50', SGD: 'S$6.90' },
};

type Module = { id: string; name: string; price: (c: Cur) => string; per?: string; note: (c: Cur) => string; for: string; needs?: string; lead: string; items: string[]; foot?: (c: Cur) => [string, string] };
const MODULES: Module[] = [
  {
    id: 'insurance', name: 'Insurance', price: () => 'Free', note: () => 'In every plan', for: 'You have staff and policies to keep track of.',
    lead: 'You receive:',
    items: [
      'Every policy, document and renewal date in one place',
      'Set up your company yourself, or send it to us to set up',
      'Requests to a licensed broker - new cover, a renewal or a review - and follow each one',
      'People and vehicles added to or removed from cover, confirmed with the insurer',
      'Compare at renewal: your broker brings quotes before a policy renews',
      'A quarterly check-in that keeps your cover up to date',
      'Keep your own broker - our team sends them your requests',
      'Each employee sees their own cover, family cover included where the policy allows',
      'What the law requires for your trade, in plain words',
      'Ask Covarage, and help to see a doctor',
    ],
  },
  {
    id: 'cyber', name: 'Cyber Protection', price: (c) => MONEY.cyber[c], per: 'a month', note: () => '5 devices included', for: 'Your team works on laptops and holds customer data.',
    lead: 'Insurance, plus cyber protection from our security partner:',
    items: [
      'Protection for 5 devices: anti-malware and a web filter',
      'Scans of your website and email for weaknesses, for up to 10 domains',
      'A password manager for your team',
      'Staff training on phishing and security, and a practice crisis',
      'Help working out what happened if something goes wrong',
    ],
    foot: (c) => ['Add more devices', `${MONEY.device[c]} a month for each device over 5`],
  },
  {
    id: 'compliance', name: 'Compliance', price: (c) => MONEY.compliance[c], per: 'a month more', note: (c) => `on top of Cyber Protection, ${MONEY.complianceAll[c]} a month in all`,
    for: 'A customer, a tender or an auditor asks you to prove your business is secure.', needs: 'Cyber Protection',
    lead: 'You receive:',
    items: [
      'Support to certify for CSA Cyber Essentials and IMDA Data Protection Essentials',
      'Readiness for the Health Information Act, for healthcare businesses',
      'Ready-made procedures, evidence tracking and audit logs',
      'A licensed broker to arrange cyber insurance when you are ready',
    ],
  },
  {
    id: 'enterprise', name: 'Enterprise options', price: () => 'Quoted', note: () => 'Add any of these to a plan', for: 'You run several companies or offices, across countries.',
    lead: 'You choose from:',
    items: [
      'Your own branding on the platform',
      'A dedicated phone line and an AI support agent',
      'Hosting of your choice, including on your own premises',
      'Each office set up on its own, with single sign-on',
      'Full testing and an independent penetration test',
      'The certifications your organisation needs, at cost',
    ],
    foot: () => ['How it is priced', 'Supplier costs at cost, plus implementation, testing and a monthly service fee.'],
  },
];

// The plans, built from the modules (CMO v0.5 s2b), at the totals Kong signed off
const PLANS: { id: string; name: string; modules: string[]; price: (c: Cur) => string; button: [string, string] }[] = [
  { id: 'basic', name: 'Covarage Basic', modules: ['Insurance'], price: () => 'Free', button: ['Sign up free', SIGNUP_URL] },
  { id: 'protection', name: 'Covarage Protection', modules: ['Insurance', 'Cyber Protection'], price: (c) => MONEY.cyber[c], button: ['Talk to us', '/contact'] },
  { id: 'compliance', name: 'Covarage Compliance', modules: ['Insurance', 'Cyber Protection', 'Compliance'], price: (c) => MONEY.complianceAll[c], button: ['Talk to us', '/contact'] },
  { id: 'enterprise', name: 'Covarage Enterprise', modules: ['Any plan', 'Enterprise options'], price: () => 'Quoted', button: ['Talk to us', '/contact'] },
];

// The comparison (CMO v0.5 s3): true is a tick, false is not included, a string is said as written
type Cell = boolean | string;
const perMonth = (c: Cur) => `${MONEY.device[c]} a month`;
const GROUPS: [string, [string, (c: Cur) => Cell[]][]][] = [
  ['Insurance', [
    ['Every policy, document and renewal date in one place', () => [true, true, true, true]],
    ['Requests to a licensed broker, followed for you', () => [true, true, true, true]],
    ['Cover changes confirmed with the insurer', () => [true, true, true, true]],
    ['Compare at renewal', () => [true, true, true, true]],
    ['Quarterly check-in', () => [true, true, true, true]],
    ["Each employee's own view of their cover", () => [true, true, true, true]],
  ]],
  ['Cyber Protection', [
    ['Device protection (anti-malware, web filter)', () => [false, '5 devices', '5 devices', 'custom']],
    ['Each extra device', (c) => [false, perMonth(c), perMonth(c), 'custom']],
    ['Website and email scans', () => [false, true, true, true]],
    ['Password manager', () => [false, true, true, true]],
    ['Staff security training', () => [false, true, true, true]],
  ]],
  ['Compliance', [
    ['CSA Cyber Essentials and IMDA Data Protection Essentials support', () => [false, false, true, true]],
    ['Procedures, evidence tracking and audit logs', () => [false, false, true, true]],
  ]],
  ['Enterprise options', [
    ['Your branding, dedicated support line and AI agent', () => [false, false, false, true]],
    ['Hosting of your choice, single sign-on, penetration test', () => [false, false, false, true]],
  ]],
];

const QA: [string, string][] = [
  ['Is Basic really free?', 'Yes. Covarage Basic costs your business nothing. Our licensed broker partners pay us.'],
  ['Who arranges my insurance?', 'A licensed broker - yours, or one we work with. Covarage keeps the record and does the admin; it gives no advice and does not recommend policies.'],
];

const BTN = 'inline-flex items-center justify-center rounded-md bg-primary-extended px-5 py-3 text-[15px] font-medium text-white no-underline transition hover:opacity-90';
const BTN2 = 'inline-flex items-center justify-center rounded-md border border-hairline-strong bg-white px-5 py-3 text-[15px] font-medium text-text-primary no-underline transition hover:bg-section-alt';

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden className="shrink-0 text-primary-extended">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Go({ label, to, primary }: { label: string; to: string; primary?: boolean }) {
  const cls = `${primary ? BTN : BTN2} w-full sm:w-auto`;
  return to.startsWith('http') ? <a href={to} className={cls}>{label}</a> : <Link to={to} className={cls}>{label}</Link>;
}

function Say({ v }: { v: Cell }) {
  if (v === true) return <span className="inline-flex justify-center"><Tick /><span className="sr-only">Included</span></span>;
  if (v === false) return <span className="text-text-secondary" aria-label="Not included">-</span>;
  return <span className="text-sm text-text-primary">{v}</span>;
}

export default function Pricing() {
  const [cur, setCur] = useState<Cur>('USD');
  const [col, setCol] = useState(1); // the plan a phone's comparison shows beside the features
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo title="Pricing | Covarage" description="Covarage Basic is free. Protection and Compliance add cyber security for your devices and staff, and support to get the certifications that show it." path="/pricing" />
      <LanderHeader />
      <main data-pricing>
        <section className={`${WRAP} pt-12 pb-10 lg:pt-24 lg:pb-14`}>
          <p className="m-0 text-xs font-medium tracking-[0.14em] text-primary uppercase">Pricing</p>
          <h1 className="m-0 mt-4 max-w-[900px] font-serif text-[34px]/[1.08] font-normal tracking-[-1px] text-balance text-text-primary-extended lg:text-[56px] lg:tracking-[-1.8px]">
            Start free. Add protection when you need it.
          </h1>
          <p className="m-0 mt-5 max-w-[720px] text-base/[1.6] text-text-secondary lg:text-[18px]">
            Covarage Basic keeps your business&apos;s insurance in order, at no cost. Protection and Compliance add cyber security for your devices and your staff, and support to get the certifications that show it.
          </p>
          <div role="radiogroup" aria-label="Currency" className="mt-8 inline-flex rounded-lg border border-hairline-strong bg-white p-1 lg:mt-10" data-currency>
            {(['USD', 'SGD'] as Cur[]).map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={cur === c}
                onClick={() => setCur(c)}
                className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition ${cur === c ? 'bg-primary-extended text-white' : 'text-text-primary hover:bg-section-alt'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* the modules (Kong 20:13): each with its price and what you receive */}
        <section className={`${WRAP} pb-16 lg:pb-20`}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {MODULES.map((m) => (
              <article key={m.id} className="flex flex-col rounded-2xl border border-hairline-strong bg-white p-6 lg:p-7" data-module={m.id}>
                <p className="m-0 text-xs font-medium tracking-[0.12em] text-text-secondary uppercase">Module</p>
                <h2 className="m-0 mt-2 font-serif text-[24px]/[1.2] font-normal text-text-primary-extended">{m.name}</h2>
                <p className="m-0 mt-2 min-h-[3em] text-sm/normal text-text-secondary">{m.for}</p>
                <p className="m-0 mt-4 flex flex-wrap items-baseline gap-x-1.5">
                  <span className="font-serif text-[40px]/[1] tracking-[-1px] text-text-primary-extended tabular-nums" data-price>{m.price(cur)}</span>
                  {m.per && <span className="text-sm text-text-secondary">{m.per}</span>}
                </p>
                <p className="m-0 mt-2 min-h-[2.8em] text-sm/[1.4] text-text-secondary" data-note>{m.note(cur)}</p>
                {m.needs && (
                  <p className="m-0 mt-3 inline-flex self-start rounded-full bg-open-water-wash px-3 py-1 text-[13px] font-medium text-text-primary" data-needs>Needs: {m.needs}</p>
                )}
                <div className="mt-5 border-t border-border-primary pt-5">
                  <p className="m-0 mb-3 text-sm/normal font-medium text-text-primary">{m.lead}</p>
                  <ul className="m-0 grid list-none gap-2.5 p-0">
                    {m.items.map((t) => (
                      <li key={t} className="flex gap-2.5 text-sm/normal text-text-primary"><Tick />{t}</li>
                    ))}
                  </ul>
                </div>
                {m.foot && (
                  <div className="mt-auto pt-5">
                    <div className="rounded-lg bg-section-alt p-3.5 text-sm/normal" data-foot>
                      <span className="block font-medium text-text-primary">{m.foot(cur)[0]}</span>
                      <span className="text-text-secondary">{m.foot(cur)[1]}</span>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* the plans, built from the modules, at the totals Kong signed off (19:42) */}
        <section className={`${WRAP} pb-16 lg:pb-24`}>
          <h2 className="m-0 font-serif text-[28px]/[1.15] font-normal tracking-[-0.8px] text-text-primary-extended lg:text-[40px]">The plans, built from the modules</h2>
          <div className="mt-6 grid gap-3 lg:mt-10">
            {PLANS.map((p) => (
              <div key={p.id} className="grid items-center gap-4 rounded-2xl border border-hairline-strong bg-white p-5 lg:grid-cols-[1.1fr_2fr_0.9fr_auto] lg:gap-6 lg:px-7" data-plan={p.id}>
                <h3 className="m-0 font-serif text-[22px]/[1.2] font-normal text-text-primary-extended">{p.name}</h3>
                <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1.5" data-modules>
                  {p.modules.map((m, k) => (
                    <Fragment key={m}>
                      {k > 0 && <span className="text-text-secondary" aria-hidden>+</span>}
                      <span className={`rounded-full px-3 py-1 text-[13px] font-medium ${m === 'Any plan' ? 'border border-hairline-strong text-text-secondary' : 'bg-pill text-text-primary'}`}>{m}</span>
                    </Fragment>
                  ))}
                </p>
                <p className="m-0 flex items-baseline gap-1.5">
                  <span className="font-serif text-[30px]/[1] tracking-[-0.6px] text-text-primary-extended tabular-nums" data-price>{p.price(cur)}</span>
                  {!['Free', 'Quoted'].includes(p.price(cur)) && <span className="text-sm text-text-secondary">a month</span>}
                </p>
                <Go label={p.button[0]} to={p.button[1]} primary={p.id === 'basic'} />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-section-alt">
          <div className={`${WRAP} py-16 lg:py-24`}>
            <h2 className="m-0 font-serif text-[28px]/[1.15] font-normal tracking-[-0.8px] text-text-primary-extended lg:text-[40px]">Compare the plans</h2>
            {/* a phone shows the features beside one plan at a time, chosen here; never a table scrolled sideways */}
            <div role="tablist" aria-label="Plan to compare" className="mt-6 grid grid-cols-4 gap-1 rounded-lg border border-hairline-strong bg-white p-1 md:hidden">
              {PLANS.map((p, k) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={col === k}
                  onClick={() => setCol(k)}
                  className={`cursor-pointer rounded-md px-1 py-2 text-[13px] font-medium ${col === k ? 'bg-primary-extended text-white' : 'text-text-primary'}`}
                >
                  {p.name.replace('Covarage ', '')}
                </button>
              ))}
            </div>
            <table className="mt-6 w-full table-fixed border-collapse text-left md:mt-10" data-compare>
              <thead>
                <tr className="border-b border-hairline-strong">
                  <th className="w-[58%] py-3 pr-3 text-sm font-medium text-text-secondary md:w-[36%]"><span className="sr-only">Feature</span></th>
                  {PLANS.map((p, k) => (
                    <th key={p.id} className={`w-[42%] py-3 text-center text-sm font-medium text-text-primary md:w-auto ${k === col ? '' : 'hidden md:table-cell'}`}>{p.name.replace('Covarage ', '')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-primary">
                  <th scope="row" className="py-3.5 pr-3 text-sm/[1.45] font-medium text-text-primary">Price a month</th>
                  {PLANS.map((p, k) => (
                    <td key={p.id} className={`py-3.5 text-center font-serif text-[18px] text-text-primary-extended tabular-nums ${k === col ? '' : 'hidden md:table-cell'}`}>{p.price(cur)}</td>
                  ))}
                </tr>
              </tbody>
              {GROUPS.map(([g, rows]) => (
                <tbody key={g}>
                  <tr><th colSpan={5} className="pt-8 pb-2 text-left text-xs font-medium tracking-[0.12em] text-text-secondary uppercase">{g}</th></tr>
                  {rows.map(([label, cells]) => (
                    <tr key={label} className="border-b border-border-primary">
                      <th scope="row" className="py-3.5 pr-3 text-sm/[1.45] font-normal text-text-primary">{label}</th>
                      {cells(cur).map((v, k) => (
                        <td key={k} className={`py-3.5 text-center ${k === col ? '' : 'hidden md:table-cell'}`}><Say v={v} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </section>

        <section className={`${WRAP} py-16 lg:py-24`}>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {QA.map(([q, a]) => (
              <div key={q} className="border-t border-hairline-strong pt-5">
                <h3 className="m-0 font-serif text-[22px]/[1.25] font-normal text-text-primary-extended">{q}</h3>
                <p className="m-0 mt-3 max-w-[560px] text-base/[1.6] text-text-secondary">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-start gap-5 rounded-2xl bg-primary-extended p-7 text-white sm:flex-row sm:items-center sm:justify-between lg:mt-20 lg:p-10">
            <p className="m-0 font-serif text-[24px]/[1.25] lg:text-[30px]">Not sure which plan fits? Talk to us.</p>
            <Link to="/contact" className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-5 py-3 text-[15px] font-medium text-primary-extended no-underline">Talk to us</Link>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
