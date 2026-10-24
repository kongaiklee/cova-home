import { Link } from 'react-router-dom';
import { WRAP } from './Sections';

/**
 * The step-up for bigger companies - DRAWN on branch stepup-v15 for Kong before TM builds (the hub's w46 22:03 (1): Kong's yes,
 * "agree on all 4 points referring to this"; the why at 21:4x, "the real money is in with the MNCs"). The SME story stays on top of
 * the homepage; this section sits lower. Every word is CMO's copy (CMO_COPY_step-up-pages_2026-10-24.md v0.2 (b) and (c)); the
 * "who it's for" lines are the pricing page's (v0.7), so the two pages say one thing. No prices here: /pricing has the currency
 * switch. COO checks every claim before live.
 */

/** (c) the menu by company size - the header's Solutions panel, the phone menu and the footer's Solutions column */
export const SOLUTIONS: { label: string; line: string; to: string }[] = [
  { label: 'Small business', line: 'Your insurance in one place, free.', to: '/pricing#module-insurance' },
  { label: 'Growing business', line: 'Protect your devices and staff, and prove it.', to: '/pricing#module-cyber' },
  { label: 'Enterprise', line: 'One platform for every company and office in your group.', to: '/enterprise' },
];

const STEPS: [string, string, string][] = [
  ['Basic', 'You have staff and policies to keep track of.', 'Every policy, renewal and request in one place. Free.'],
  ['Protection', 'Your team works on laptops and holds customer data.', 'Cyber protection for your devices and training for your staff.'],
  ['Compliance', 'A customer, a tender or an auditor asks you to prove your business is secure.', 'Support to certify for CSA Cyber Essentials and IMDA Data Protection Essentials.'],
  ['Enterprise', 'You run several companies or offices, across countries.', 'One platform for your whole group, under your own name.'],
];

const H2 = 'm-0 font-serif text-[32px]/[1.1] font-normal tracking-[-1px] text-text-primary-extended lg:text-[48px] lg:tracking-[-1.6px]';

/** (b) "Grows with your business" - four steps, each by the moment a business needs it */
export function Grow15() {
  return (
    <section className="scroll-mt-24 bg-section-alt" data-grow>
      <div className={`${WRAP} py-16 lg:py-24`}>
        <p className="m-0 text-xs font-medium tracking-[0.14em] text-primary uppercase">Grows with your business</p>
        <h2 className={`${H2} mt-4 max-w-[900px]`}>
          Start with your insurance in one place. <span className="text-[#a3978c]">Add more when your business needs it.</span>
        </h2>
        <ol className="m-0 mt-10 grid list-none gap-4 p-0 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-0" data-grow-steps>
          {STEPS.map(([name, when, adds], k) => (
            <li key={name} className="relative flex flex-col rounded-2xl border border-hairline-strong bg-white p-6 lg:rounded-none lg:border-y lg:border-r-0 lg:border-l lg:p-7 lg:first:rounded-l-2xl lg:last:rounded-r-2xl lg:last:border-r">
              <span className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary-extended text-[13px] font-medium text-white tabular-nums">{String(k + 1).padStart(2, '0')}</span>
                <span className="h-px flex-1 bg-hairline-strong" aria-hidden />
              </span>
              <span className="mt-5 font-serif text-[26px]/[1.15] text-text-primary-extended">{name}</span>
              <span className="mt-2 text-[15px]/[1.5] text-text-primary">{when}</span>
              <span className="mt-auto pt-5 text-sm/[1.55] text-text-secondary">{adds}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
          <Link to="/pricing" className="inline-flex items-center rounded-md bg-primary-extended px-5 py-3 text-[15px] font-medium text-white no-underline hover:opacity-90">See pricing</Link>
          <Link to="/enterprise" className="inline-flex items-center rounded-md border border-hairline-strong bg-white px-5 py-3 text-[15px] font-medium text-text-primary no-underline">Covarage for Enterprise&nbsp;&rarr;</Link>
        </div>
      </div>
    </section>
  );
}
