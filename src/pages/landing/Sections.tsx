import { IMG, INSURERS } from './data';

/** Shared horizontal frame: 1240 max, 100px gutters on desktop, 28px on phone. */
export const WRAP = 'mx-auto w-full max-w-[1240px] px-7 lg:px-[100px]';
export const H2 = 'm-0 font-serif text-text-primary';

/** 1A. The trade line. */
export function TradeLine() {
  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} grid gap-3 py-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-baseline lg:gap-12 lg:py-11`}>
        <div className="font-serif text-2xl/[1.15] tracking-[-0.7px] text-text-primary lg:text-[30px]/[1.15] lg:tracking-[-0.9px]">For the businesses Singapore actually runs.</div>
        <p className="m-0 text-[15px]/[1.6] text-text-secondary lg:text-[17px]">SFA-licensed kitchens. BCA-registered contractors. MOH clinics. Freight forwarders. Tuition centres. Salons. Law firms. SaaS companies. Startups.</p>
      </div>
    </section>
  );
}

const STATS = [
  { n: '74%', t: 'of Singapore SMEs say business interruption is a concern.' },
  { n: '23%', t: 'carry cover for it.' },
  { n: '85%', t: 'The standard market wording carries an 85% condition of average. Insure for less than it is worth, and a partial loss is cut back in proportion.' },
];

/** 1B. The stake - the one dark band on the page. */
export function Stake() {
  return (
    <section className="bg-primary-extended text-white">
      <div className={`${WRAP} py-[52px] lg:py-[88px]`}>
        <div className="mb-7 grid gap-3.5 lg:mb-14 lg:grid-cols-2 lg:gap-16">
          <h2 className="m-0 font-serif text-[30px]/[1.1] tracking-[-1px] text-balance lg:text-[40px]/[1.08] lg:tracking-[-1.4px]">When your business changes, your cover gets another look.</h2>
          <p className="m-0 max-w-[44ch] text-base/[1.55] text-[#c2d4e2] lg:mt-1.5 lg:text-[19px]/[1.5]">Your headcount moved. You took a second unit. You signed a contract with a new indemnity. <strong className="font-semibold text-white">The policy renewed anyway.</strong></p>
        </div>
        <div className="grid gap-[22px] border-t border-white/14 pt-[26px] lg:grid-cols-3 lg:gap-12 lg:pt-11">
          {STATS.map((s) => (
            <div key={s.n}>
              <div className="font-serif text-[64px]/none tracking-[-2px] text-[#c2d4e2] lg:text-[84px] lg:tracking-[-3px]">{s.n}</div>
              <p className="m-0 mt-2.5 max-w-[30ch] text-[15px]/[1.5] lg:mt-3.5 lg:text-base">{s.t}</p>
            </div>
          ))}
        </div>
        <p className="m-0 mt-[26px] text-[11px]/[1.6] text-white/60 lg:mt-10 lg:text-xs">Sources: QBE Singapore SME survey. MSIG SUMO policy wording.</p>
      </div>
    </section>
  );
}

// `providers` is Kong's word (2026-08-29), taken on the NARROW reading: the WORD changes, `24`
// stands. The four other strings carrying the same fact (s5 `24 of them`, s6 `24 insurers to
// choose from`, the `Across 24 insurers` sub-line, and the 24-logo strip below) are deliberately
// HELD until he rules whether `providers` means the same 24 or the wider panel of 35 - changing
// this tile alone would already make the page disagree with itself within one scroll.
const NUMBERS = [['24', 'providers'], ['766', 'policies placed'], ['~S$200m', 'sum insured']];

/** 3. The numbers and the proof wall - all 24 general insurers on the panel. */
export function Proof() {
  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} py-[52px] lg:pt-24 lg:pb-[88px]`}>
        <h2 className={`${H2} mb-7 text-[26px]/[1.12] tracking-[-0.8px] lg:mb-12 lg:text-[34px]/[1.1] lg:tracking-[-1px]`}>Already placed by the advisers we introduce you to.</h2>
        <div className="mb-9 grid gap-[22px] lg:mb-16 lg:grid-cols-3 lg:gap-12" data-stats>
          {NUMBERS.map(([n, t]) => (
            <div key={n}>
              <span className="font-serif text-[52px]/none tracking-[-2px] whitespace-nowrap text-primary lg:text-[64px]">{n}</span>
              <div className="mt-2.5 text-base lg:mt-3 lg:text-lg">{t}</div>
            </div>
          ))}
        </div>
        <div className="mb-4 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-border-primary bg-black/8 lg:grid-cols-6" data-insurers>
          {INSURERS.map((i) => (
            <div key={i.slug} className="flex h-[84px] items-center justify-center bg-white p-1 lg:h-[150px]">
              <img src={`${IMG}/insurers/logo-${i.slug}.gif`} alt={i.alt} className="max-h-full max-w-full" loading="lazy" />
            </div>
          ))}
        </div>
        <p className="m-0 text-[13px]/[1.6] text-text-secondary lg:text-sm">All cover is placed by licensed intermediaries. The figures and the panel are theirs.</p>
      </div>
    </section>
  );
}

/** 4. The problem. */
export function Problem() {
  return (
    <section className="border-b border-border-primary">
      <div className={`${WRAP} grid gap-6 py-[52px] lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24`}>
        <div>
          <h2 className={`${H2} mb-4 max-w-[20ch] text-[30px]/[1.12] tracking-[-1px] lg:mb-5 lg:text-[42px]/[1.1] lg:tracking-[-1.4px]`}>Nobody joined this company to chase for insurance quotes.</h2>
          <p className="m-0 max-w-[46ch] text-base/[1.6] text-text-secondary lg:text-lg">The renewal email arrives. The certificate is in someone's inbox. The adviser needs the same details you sent last year. And nobody is quite sure what happens if something goes wrong tomorrow.</p>
        </div>
        <img src={`${IMG}/pg-img01-reader.jpg`} alt="" className="block h-[200px] w-full rounded-xl object-cover lg:h-[340px]" loading="lazy" />
      </div>
    </section>
  );
}
