import { Link } from 'react-router-dom';
import { IMG, INSURERS, REQUEST_ANCHOR } from './data';
import { requestClick } from './requestFraming';

/** Shared horizontal frame: 1240 max, 100px gutters on desktop, 28px on phone. */
export const WRAP = 'mx-auto w-full max-w-[1240px] px-7 lg:px-[100px]';
export const H2 = 'm-0 font-serif text-text-primary';

/**
 * 1A. The TEAK TRADE BAND. Kong w8, verbatim: "For the businesses Singapre actually runs mayube we
 * use a teak bg instead of the section? use H1 for the slogan and the '...' is listed as a tagline
 * underneath it? otherwise right now u have white section white seciton white seciton again".
 *
 * It carries 7B's founder-note format - centred, the head at display scale, the trades stacked
 * under it as the tagline. Teak vs Sailcloth vs white is what makes the page's alternation real;
 * Sailcloth against white (#faf8f6 vs #ffffff) is too slight to read as rhythm.
 * Band order on the page: hero -> TEAK -> Sailcloth s1F -> white proof -> TEAK stake.
 */
export function TradeLine() {
  return (
    <section className="bg-primary-extended text-white">
      <div className={`${WRAP} py-[52px] text-center lg:py-[88px]`}>
        <h2 className="m-0 mx-auto max-w-[20ch] font-serif text-[34px]/[1.1] tracking-[-1.1px] text-balance lg:text-5xl/[1.08] lg:tracking-[-1.6px]">For the businesses Singapore actually runs.</h2>
        <p className="m-0 mx-auto mt-3.5 max-w-[52ch] text-[15px]/[1.6] text-[#f5efe9]/[0.72] lg:mt-5 lg:text-[18px]/[1.6]">SFA-licensed kitchens. BCA-registered contractors. MOH clinics. Freight forwarders. Tuition centres. Salons. Law firms. SaaS companies. Startups.</p>
      </div>
    </section>
  );
}

/**
 * 1F. The orientation cards - CD's `DIRECTION_s1F-and-sequence.md` s2, Rev 3n copy.
 * The 4B card pattern minus the photo, three across, on Sailcloth.
 *
 * The treatment call that is NOT 4B's, and it is a build constraint rather than taste: cards 1 and
 * 2 take a quiet text link and card 3 takes the solid Teak button. Three buttons would flatten the
 * page's only conversion into one of three equals - browse, browse, act is the ladder.
 *
 * The introducer boundary is held by construction and must not be softened: card 1 says what
 * businesses like yours are COMMONLY ASKED to carry; card 3's adviser REVIEWS AND DISCUSSES.
 * No card asserts what this reader needs.
 */
const ORIENTATION = [
  {
    title: 'Your trade',
    body: 'See the cover and documents businesses like yours are commonly asked to carry.',
    action: 'View your trade guide',
    href: '/blog',
  },
  {
    title: 'Latest changes',
    body: 'Follow new requirements and guidance from official Singapore sources.',
    action: 'View latest updates',
    href: '/updates',
  },
  {
    title: 'Your adviser',
    body: 'A licensed adviser reviews what applies to your business and discusses the available options with you.',
    action: 'Request access',
    href: REQUEST_ANCHOR,
  },
];

export function Orientation() {
  return (
    <section className="border-b border-border-primary bg-background-primary">
      <div className={`${WRAP} py-[52px] lg:py-24`}>
        <div className="mb-[22px] lg:mb-11 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <h2 className={`${H2} mb-2.5 max-w-[20ch] text-[30px]/[1.12] tracking-[-1px] lg:mb-0 lg:text-[40px]/[1.1] lg:tracking-[-1.3px]`}>The things nobody tells you to ask.</h2>
          <p className="m-0 max-w-[44ch] text-sm/[1.6] text-text-secondary lg:text-[15px]">Every trade comes with its own mix of insurance, legal and contract requirements. Knowing where to start is the hard part.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3" data-orientation>
          {ORIENTATION.map((c, i) => (
            <div key={c.title} className="flex flex-col rounded-xl border border-border-primary bg-white px-[22px] pt-5 pb-6 lg:px-[26px] lg:pt-6 lg:pb-7">
              <div className="mb-2.5 font-serif text-[22px] tracking-[-0.6px] text-primary-extended lg:mb-3.5 lg:text-[26px]">{c.title}</div>
              <p className="m-0 mb-5 grow text-sm/[1.6] text-text-secondary lg:text-[15px]/[1.65]">{c.body}</p>
              {/* Both actions carry the SAME vertical padding so their boxes are the same height
                  and the three sit on one line, per CD's acceptance - the button is otherwise
                  ~20px taller than a bare text link and card 3 rides up out of the row. The link's
                  underline moves onto an inner span so the padding does not drag the rule down. */}
              {i === 2 ? (
                <a href={c.href} onClick={requestClick} className="mt-auto inline-block self-start rounded-sm bg-primary-extended px-[22px] py-[11px] text-sm font-medium text-white transition hover:opacity-90">
                  {c.action}
                </a>
              ) : (
                <Link to={c.href} className="mt-auto inline-block self-start py-[11px] text-sm font-medium text-primary">
                  <span className="border-b border-[#c2d4e2] pb-px">{c.action}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
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

/**
 * 3. The numbers and the proof wall - all 24 general insurers on the panel.
 *
 * THE F500 SLOT (Rev 3n's relocation; CD's verdict, DIRECTION_s1F-and-sequence.md s3). Kong's
 * locked line becomes THIS section's head, because the section is the line's own evidence - the
 * metrics and the 24-mark panel prove exactly "you now have what a Fortune 500 has", and a claim
 * sitting on top of its proof stops being a boast. It also bookends against s11's close rather
 * than duplicating it, and the demotion below qualifies the claim in the same breath.
 * `Already placed by...` keeps its copy and loses only its weight - CD's call, not TM's.
 */
export function Proof() {
  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} py-[52px] lg:pt-24 lg:pb-[88px]`}>
        <h2 className={`${H2} mb-2.5 text-[26px]/[1.12] tracking-[-0.8px] text-balance text-primary-extended lg:mb-3.5 lg:text-[34px]/[1.1] lg:tracking-[-1px]`}>Fortune 500 companies have a team for insurance. Now you do.</h2>
        <p className="m-0 mb-7 max-w-[52ch] text-base/[1.55] text-text-secondary lg:mb-12 lg:text-[20px]/[1.5]">Already placed by the advisers we introduce you to.</p>
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
