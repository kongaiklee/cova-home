import { IMG, REQUEST_ANCHOR } from './data';
import { requestClick } from './requestFraming';
import { H2, WRAP } from './Sections';

const LESS = [
  ['Answer once.', 'One form, filled once. We fill the insurer forms for you - 24 of them.'],
  ['Everything in one place.', "The certificate is there when the landlord asks. So is last year's policy."],
  ['Someone else calls the clinic.', 'A specialist appointment for your staff within two days, and cashless hospital admission.'],
];
const KNOW = [
  ['You know what is coming up.', 'Every renewal date, visible in one place.'],
  ['You know what you hold.', 'Every document, every policy, one screen.'],
  ['Your adviser turns up prepared.', 'We hand them the file before they start.'],
];

function Column({ head, rows, teak }: { head: string; rows: string[][]; teak?: boolean }) {
  return (
    <div>
      <div className={`mb-[18px] font-serif text-[26px] tracking-[-0.7px] lg:mb-7 lg:text-[30px] lg:tracking-[-0.9px] ${teak ? 'text-primary-extended' : 'text-primary'}`}>{head}</div>
      <div className="flex flex-col gap-[18px] lg:gap-6">
        {rows.map(([t, b]) => (
          <div key={t} className="border-t border-border-primary pt-[18px] lg:pt-[22px]">
            <div className="mb-1.5 text-base font-semibold text-text-primary lg:mb-[7px] lg:text-[17px]">{t}</div>
            <p className="m-0 text-[15px]/[1.6] text-text-secondary lg:leading-[1.65]">{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 5. What you get. The `Less time` head is Teak per the brown-CTA rule. */
export function WhatYouGet() {
  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} py-[52px] lg:py-24`}>
        <img src={`${IMG}/pg-img02-documents.jpg`} alt="" className="mb-8 block h-[220px] w-full rounded-xl object-cover object-[center_40%] lg:mb-16 lg:h-[400px]" loading="lazy" />
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
          <Column head="Less time" rows={LESS} teak />
          <Column head="No wondering" rows={KNOW} />
        </div>
      </div>
    </section>
  );
}

/** 6. Renewal. */
export function Renewal() {
  return (
    <section className="relative overflow-hidden border-b border-border-primary">
      <div className="absolute top-0 left-0 hidden h-full w-[300px] rounded-r-[100%] bg-[#eaf1f7] lg:block" aria-hidden />
      <div className="absolute -top-20 -left-[140px] size-[280px] rounded-full bg-[#eaf1f7] lg:hidden" aria-hidden />
      <div className={`${WRAP} relative grid gap-6 py-[52px] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-24`}>
        <div>
          <h2 className={`${H2} mb-4 text-[30px]/[1.1] tracking-[-1px] text-balance lg:mb-[22px] lg:text-[44px]/[1.08] lg:tracking-[-1.5px]`}>One platform, one adviser, 24 insurers to choose from.</h2>
          <p className="m-0 mb-3.5 max-w-[42ch] text-[17px]/[1.45] font-medium text-text-primary lg:mb-[18px] lg:text-[19px]">At renewal, everything you hold is already in front of a licensed adviser who can look across the whole panel.</p>
          <p className="m-0 mb-3.5 max-w-[48ch] text-[15px]/[1.6] text-text-secondary italic lg:mb-[18px] lg:leading-[1.65]">We put every document and every renewal date in front of them before they start. The review is theirs.</p>
          <p className="m-0 max-w-[42ch] text-base/[1.5] font-semibold text-text-primary lg:text-[17px]">Your adviser reviews every policy at renewal. Part of the service.</p>
        </div>
        <img src={`${IMG}/pg-img03-handoff.jpg`} alt="" className="hidden h-[300px] w-full rounded-xl object-cover lg:block" loading="lazy" />
      </div>
    </section>
  );
}

/** 7. When nobody calls back. */
export function Chase() {
  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} grid gap-4 py-[52px] lg:grid-cols-2 lg:items-end lg:gap-16 lg:py-24`}>
        <div>
          <h2 className="m-0 mb-1.5 font-serif text-[26px]/[1.12] tracking-[-0.8px] text-text-secondary lg:mb-2 lg:text-[40px]/[1.1] lg:tracking-[-1.3px]">Agent not calling back?</h2>
          <h2 className={`${H2} text-4xl/[1.06] tracking-[-1.2px] lg:text-[52px]/[1.05] lg:tracking-[-1.8px]`}>We chase. You don't have to.</h2>
        </div>
        <p className="m-0 text-lg/[1.4] font-medium text-primary lg:mb-1.5 lg:text-[22px]">A reply in 24 hours, or a new adviser.</p>
      </div>
    </section>
  );
}

const STEPS = [
  ['01', 'Talk to us.', 'Tell us what your business does and what you hold today. Our team calls you back.',
    <path key="a" d="M14 8h6l3 8-4 3a20 20 0 0 0 10 10l3-4 8 3v6a3 3 0 0 1-3 3C21 37 11 27 11 11a3 3 0 0 1 3-3zM29 10a9 9 0 0 1 9 9M29 4a15 15 0 0 1 15 15" />],
  ['02', 'We set you up.', 'We open your account and load your policies, certificates and employee list with you.',
    <path key="b" d="M6 16v22a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2V20a2 2 0 0 0-2-2H24l-4-4H8a2 2 0 0 0-2 2zM18 6h12a2 2 0 0 1 2 2v10M24 4v10M20 10l4 4 4-4" />],
  ['03', 'We introduce you.', 'A licensed adviser picks it up from there, and you stay informed without chasing anyone.',
    <g key="c"><circle cx="13" cy="15" r="5" /><path d="M4 38v-4a9 9 0 0 1 18 0v4" /><circle cx="35" cy="15" r="5" /><path d="M26 38v-4a9 9 0 0 1 18 0v4M19 26h10M26 23l3 3-3 3" /></g>],
] as const;

/** 8. How it works. */
export function HowItWorks() {
  return (
    <section className="border-b border-border-primary">
      <div className={`${WRAP} py-[52px] lg:py-24`}>
        <h2 className={`${H2} mb-6 text-[28px]/[1.12] tracking-[-0.9px] lg:mb-12 lg:text-4xl/[1.1] lg:tracking-[-1.1px]`}>How it works.</h2>
        <div className="grid gap-3.5 lg:grid-cols-3 lg:gap-8">
          {STEPS.map(([n, t, b, icon]) => (
            <div key={n} className="rounded-xl border border-border-primary bg-white p-6 lg:p-7">
              <div className="mb-5 flex h-[90px] items-center justify-center rounded-xl bg-background-primary lg:h-[120px]">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#5f88ae" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
              </div>
              <div className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-primary uppercase lg:mb-2.5">{n}</div>
              <div className="mb-2 font-serif text-[21px] tracking-[-0.5px] text-text-primary lg:mb-2.5 lg:text-[22px]">{t}</div>
              <p className="m-0 text-[15px]/[1.65] text-text-secondary">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 8B. Assisted onboarding. */
export function Onboarding() {
  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} grid gap-6 py-[52px] lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}>
        <div>
          <h2 className={`${H2} mb-3.5 max-w-[18ch] text-[30px]/[1.12] tracking-[-1px] lg:mb-5 lg:text-[42px]/[1.1] lg:tracking-[-1.4px]`}>Every account is opened by our team.</h2>
          <p className="m-0 mb-3.5 max-w-[46ch] text-base/[1.6] text-text-secondary lg:mb-[18px] lg:text-lg">We open your account, sit down with you, and load what you already hold. Every policy, every certificate, your employee list.</p>
          <p className="m-0 text-lg/[1.4] font-medium text-primary lg:text-xl">The vault is complete on day one.</p>
        </div>
        <img src={`${IMG}/pg-img05-onboarding.jpg`} alt="" className="block h-[200px] w-full rounded-xl object-cover lg:h-[340px]" loading="lazy" />
      </div>
    </section>
  );
}

/** 10. How we make money. The only place free appears. */
export function Money() {
  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} py-[52px] lg:py-24`}>
        <h2 className={`${H2} mb-3.5 text-[28px]/[1.12] tracking-[-0.9px] lg:mb-[18px] lg:text-[34px]/[1.1] lg:tracking-[-1px]`}>We only win when you do.</h2>
        <p className="m-0 max-w-[58ch] text-base/[1.6] text-text-primary lg:text-lg">Free for your business while we are in early access. The intermediary pays us an introduction fee out of its own commission. <strong className="font-semibold">No insurer pays us anything.</strong></p>
      </div>
    </section>
  );
}

/** 11. Close. */
export function Close() {
  return (
    <section className="border-b border-border-primary">
      <div className={`${WRAP} py-[52px] text-center lg:py-24`}>
        <h2 className={`${H2} mx-auto mb-[22px] max-w-[22ch] text-[32px]/[1.1] tracking-[-1.1px] lg:mb-[26px] lg:text-[44px]/[1.08] lg:tracking-[-1.5px]`}>What Fortune 500 companies pay a team for. Now yours.</h2>
        <a href={REQUEST_ANCHOR} onClick={requestClick} className="block rounded-sm bg-primary-extended py-4 text-center text-[15px] font-medium text-white transition hover:opacity-90 lg:inline-block lg:px-[26px] lg:py-[13px]">Request access</a>
        <p className="m-0 mt-4 text-[13px] text-text-secondary lg:mt-5 lg:text-sm">Opened by our founder. Your adviser named on day one.</p>
      </div>
    </section>
  );
}
