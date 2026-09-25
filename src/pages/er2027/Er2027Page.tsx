import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Seo, { SITE_URL } from '../../components/Seo';
import { articleUrl } from '../../content/articles';
import { track } from '../../lib/analytics';

/**
 * /emerging-risks-2027 - the seed page for "Emerging Risks 2027: Singapore Edition".
 *
 * Kong 2026-09-14 (CMO's log): "i just want to find a way to seed the term 'emerging risks 2027'
 * now so we can start indexing for it" and "we should allow people to submit their email to
 * receive a copy once it is ready". ONE permanent URL: the report replaces this body in January
 * 2027 and every link earned now keeps its value.
 *
 * Copy of record: CMO's seed-page copy v1.0 (2026-09-14), verbatim.
 * The consent line is COO's cleared string (COO's consent clearance v1.0, s1) and REPLACES the
 * draft line in CMO's copy - the form ships with it or not at all.
 * Dress: CD's lander v1.3 and seed-page direction, s4 - the brief page's dress at a guide's length,
 * the request card's form as its one door. No logos, no price, no second button, and NO THEME LINE
 * (Kong's w7 lock: the theme rides the report).
 *
 * The one photograph is Kong's pick, cut and placed by CD (working/CD_er2027-image, direction s9 +
 * s9a): John T's hawker drink stall, Unsplash Licence, credited in a caption under it. It is illustrative
 * only - no copy near it may imply the stallholder is a customer, member, interviewee or source.
 */

const PHOTO_ALT = 'A stallholder at her drink stall in a Singapore hawker centre.';
const PHOTO_CREDIT = 'Photograph: John T / Unsplash.';

/**
 * Two crops of one photograph (CD install sheet v1.1): >= 1280px the right column of the hero
 * (728x1312, top at the eyebrow, bottom at the form's foot); below that a tight 16:10 crop under the
 * form, never above it, capped at the form's width, from the phone (668w) or tablet (1408w) file.
 * At 1024 the side column made her a 256x824 strip, so the side-by-side starts at 1280.
 *
 * The credit is a caption directly under the photograph at every width - beside the interview
 * invitation, an uncredited photograph of a business owner reads as an interviewee (CD s0p). Beside
 * the form it hangs below the photograph so the photograph still ends at the form's foot.
 */
function HeroPhoto() {
  return (
    <figure className="m-0 mt-7 xl:relative xl:col-start-2 xl:row-start-1 xl:mt-0 xl:flex xl:flex-col" data-er2027-photo>
      <picture className="block xl:min-h-0 xl:flex-1">
        <source media="(min-width: 1280px)" srcSet="/assets/images/er2027/er2027-hawker-stall-desktop.jpg" width={728} height={1312} />
        <img
          src="/assets/images/er2027/er2027-hawker-stall-phone.jpg"
          srcSet="/assets/images/er2027/er2027-hawker-stall-phone.jpg 668w, /assets/images/er2027/er2027-hawker-stall-tablet.jpg 1408w"
          sizes="(min-width: 1280px) 364px, min(704px, calc(100vw - 56px))"
          width={668}
          height={418}
          alt={PHOTO_ALT}
          decoding="async"
          className="block aspect-[16/10] h-auto w-full rounded-xl object-cover xl:aspect-auto xl:h-full"
        />
      </picture>
      <figcaption className="mt-2 text-[13px]/[1.5] text-text-secondary xl:absolute xl:top-full xl:left-0" data-er2027-credit>
        {PHOTO_CREDIT}
      </figcaption>
    </figure>
  );
}

/** COO s2.1: every record says which consent line the person agreed to. Bump with the string. */
export const ER2027_CONSENT_VERSION = 'consent v1.1 2026-09-15';

const RISKS: { risk: string; guides: [string, string][] }[] = [
  { risk: 'Cyber attacks and data breaches', guides: [
    ['Unpatched software and your cyber policy', '/emerging-risk/unpatched-software-cyber-insurance-singapore-sme'],
    ['Software supply-chain attacks', '/emerging-risk/software-supply-chain-attack-vendor-compromise-singapore-sme'],
  ] },
  { risk: 'AI-enabled fraud and deepfakes', guides: [
    ['Deepfake funds-transfer fraud', '/emerging-risk/ai/deepfake-funds-transfer-fraud-singapore-sme'],
    ['The scam wave reaches the company account', '/emerging-risk/scam-wave-money-mule-exposure-singapore-sme'],
  ] },
  { risk: 'AI in how you work', guides: [
    ['AI-generated content and copyright', '/emerging-risk/ai/ai-generated-content-copyright-ip-infringement-singapore-sme'],
    ['When your AI agent goes rogue', '/emerging-risk/ai/autonomous-ai-agent-rogue-actions-singapore-sme'],
    ['When your chatbot lies', '/emerging-risk/ai/chatbot-misrepresentation-liability-singapore-sme'],
  ] },
  { risk: 'Personal data', guides: [
    ['Biometric data and the PDPA', '/emerging-risk/biometric-data-pdpa-liability-singapore'],
  ] },
  { risk: 'Supply-chain disruption', guides: [
    ['Supply-chain disruption and contingent business interruption', '/emerging-risk/supply-chain-contingent-business-interruption-singapore'],
  ] },
  { risk: 'Climate and flood', guides: [
    ['Flash floods and climate risk', '/emerging-risk/flood-climate-business-interruption-singapore'],
  ] },
  { risk: 'Heat and workplace injury', guides: [
    ['Heat stress and the WSH framework', '/emerging-risk/heat-stress-wsh-work-injury-singapore'],
    ['Platform and gig workers', '/emerging-risk/platform-gig-workers-wica-singapore'],
  ] },
  { risk: 'Fire and new equipment', guides: [
    ['Lithium-battery and EV fire risk', '/emerging-risk/ev-lithium-battery-fire-singapore'],
  ] },
  { risk: 'Reputation', guides: [
    ['Reputational harm and social-media crises', '/emerging-risk/reputational-social-media-crisis-singapore'],
  ] },
  { risk: 'Directors and governance', guides: [
    ['ESG and greenwashing', '/emerging-risk/esg-greenwashing-do-liability-singapore'],
    ['AI bias in hiring and promotion', '/emerging-risk/ai/ai-bias-hiring-promotion-epl-claims-singapore-sme'],
  ] },
];

const TITLE = 'Emerging Risks 2027: Singapore Edition';
const DESCRIPTION = "Emerging Risks 2027 will share hard-earned lessons from Singapore founders, owners and senior business leaders. Get a copy when it publishes.";
const PATH = '/emerging-risks-2027';
const H1 = 'Emerging Risks 2027: what Singapore businesses face next year.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${PATH}#webpage`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      headline: H1,
      description: DESCRIPTION,
      inLanguage: 'en-SG',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Covarage',
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/favicon-mark.png`, width: 512, height: 512 },
      },
      breadcrumb: { '@id': `${SITE_URL}${PATH}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Guides', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 2, name: 'Emerging risks', item: `${SITE_URL}/guides/emerging-risk` },
        { '@type': 'ListItem', position: 3, name: 'Emerging Risks 2027', item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

type Option = 'report' | 'report_and_participate';
type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * The signup - the request card's dress, the page's only filled button. `report` is preselected;
 * name, company and role appear (and are required) only for `report_and_participate`. Posts to the
 * existing request pipe tagged `er2027` (no new vendor): the Slack message it produces is the
 * consent record, carrying the option, the time and the consent line's version (COO s2.1).
 */
function Signup() {
  const [option, setOption] = useState<Option>('report');
  const [status, setStatus] = useState<Status>('idle');
  const [sentOption, setSentOption] = useState<Option>('report');
  const participate = option === 'report_and_participate';
  const field = 'block h-[46px] w-full rounded-md border border-hairline-strong bg-white px-3.5 text-[15px] text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none';

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = new FormData(e.currentTarget);
    const payload: Record<string, string> = { source: 'er2027', option, consent_version: ER2027_CONSENT_VERSION, page: PATH };
    for (const [k, v] of form.entries()) if (k !== 'option') payload[k] = String(v).trim();
    const from = typeof document !== 'undefined' ? document.referrer : '';
    if (from) payload.from = from.slice(0, 160);
    setStatus('sending');
    try {
      const r = await fetch('/api/request', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      if (r.ok) {
        track('er2027_signup', { option });
        setSentOption(option);
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-xl border border-hairline-strong bg-white px-5 py-6 sm:px-7" data-er2027-sent>
        <p className="m-0 font-serif text-2xl tracking-[-0.6px] text-text-primary">You are on the list.</p>
        <p className="m-0 mt-2 text-[15px]/relaxed text-text-primary">
          {sentOption === 'report_and_participate'
            ? 'We will email you Emerging Risks 2027: Singapore Edition when it publishes in January 2027. Before then, our founder will email you to find a time for the 30-minute conversation.'
            : 'We will email you Emerging Risks 2027: Singapore Edition when it publishes in January 2027.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-hairline-strong bg-white px-5 pt-6 pb-6 sm:px-7 sm:pt-7" data-er2027-form>
      <p className="m-0 mb-4 text-base/[1.5] font-semibold text-text-primary">Get a copy of Emerging Risks 2027: Singapore Edition when it is ready.</p>
      <fieldset className="m-0 mb-4 border-0 p-0">
        <legend className="sr-only">Choose one</legend>
        <label className="mb-3 flex cursor-pointer items-start gap-3">
          <input type="radio" name="option" value="report" checked={option === 'report'} onChange={() => setOption('report')} className="mt-1 size-4 accent-primary" />
          <span className="text-base/[1.4] font-semibold text-text-primary">Send me the report.</span>
        </label>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="radio" name="option" value="report_and_participate" checked={participate} onChange={() => setOption('report_and_participate')} className="mt-1 size-4 accent-primary" />
          <span>
            <span className="block text-base/[1.4] font-semibold text-text-primary">Send me the report, and I would like to take part.</span>
            <span className="mt-1 block text-sm/[1.5] text-text-secondary">A 30-minute conversation with our founder about something you learned the hard way and what someone starting or leading a business should know before 2027. Any part of building and running a business is in scope.</span>
          </span>
        </label>
      </fieldset>
      <div className="mb-4 flex flex-col gap-2.5">
        <input className={field} name="email" type="email" placeholder="Email" autoComplete="email" required maxLength={160} />
        {participate && (
          <>
            <input className={field} name="name" placeholder="Name" autoComplete="name" required maxLength={120} data-er2027-extra />
            <input className={field} name="company" placeholder="Company" autoComplete="organization" required maxLength={160} data-er2027-extra />
            <input className={field} name="role" placeholder="Your role" autoComplete="organization-title" required maxLength={80} data-er2027-extra />
          </>
        )}
        {/* honeypot - hidden from people, filled by bots (same as the request card) */}
        <input className="hidden" name="form_meta" tabIndex={-1} autoComplete="off" aria-hidden />
      </div>
      <button type="submit" disabled={status === 'sending'} className="h-12 w-full rounded-sm bg-primary-extended text-center text-[15px] font-medium text-white transition hover:opacity-90 disabled:opacity-70">
        {status === 'sending' ? 'Sending' : 'Send'}
      </button>
      {status === 'error' && (
        <p className="m-0 mt-3 text-[13px]/[1.5] text-text-secondary" aria-live="polite">That did not go through. Please try again, or email support@covarage.com.</p>
      )}
      {/* COO's cleared consent line (v1.1, 2026-09-15: licensed brokers -> licensed insurance advisers,
          the ruled chapter authors being AWFA advisers) - the notice that makes consent valid. Do not edit
          without COO; a changed line means a new ER2027_CONSENT_VERSION. */}
      <p className="m-0 mt-3 text-[13px]/[1.5] text-text-secondary" data-consent-line>
        We will use your details to send you Emerging Risks 2027: Singapore Edition when it publishes and, if you chose to take part, to arrange the conversation with our founder. We will not sell them or pass them to anyone else, including the licensed insurance advisers who write the report's commentary. You can withdraw and ask us to delete them at any time at dpo@covarage.com.{' '}
        <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>
      </p>
    </form>
  );
}

const H2 = 'm-0 mt-12 mb-4 font-serif text-[26px]/[1.2] font-normal tracking-[-0.6px] text-text-primary lg:mt-14 lg:text-[30px]';
const INK = 'text-text-primary underline decoration-hairline-strong underline-offset-4';

export default function Er2027Page() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={JSON_LD} />
      <article className="mx-auto w-full max-w-[1240px] px-7 py-10 lg:px-[100px] lg:py-14" data-er2027-page>
        <nav className="flex max-w-[704px] flex-wrap items-center gap-1.5 text-sm text-text-secondary" aria-label="Breadcrumb">
          <Link to="/blog" className="hover:text-text-primary">Guides</Link>
          <span aria-hidden>/</span>
          <Link to="/guides/emerging-risk" className="hover:text-text-primary">Emerging risks</Link>
          <span aria-hidden>/</span>
          <span className="text-text-primary">Emerging Risks 2027</span>
        </nav>
        {/* 704 : 364 with a 72px gap at 1440 (CD's measure). The photo column reaches up to 100px into
            the article's right padding, only as far as a 100px viewport gutter allows (none at <= 1240,
            all of it at >= 1440); from 1280 to 1440 the columns shrink in the same ratio. */}
        <div className="mt-6 max-w-[704px] xl:mr-[calc(-1*clamp(0px,50vw-620px,100px))] xl:grid xl:max-w-none xl:grid-cols-[minmax(0,704fr)_minmax(0,364fr)] xl:gap-x-[72px]" data-er2027-hero>
          <div className="xl:col-start-1 xl:row-start-1">
            <p className="m-0 text-xs font-medium tracking-[0.14em] text-primary uppercase">Emerging Risks 2027 &middot; Singapore Edition</p>
            <h1 className="m-0 mt-3 font-serif text-3xl/tight font-normal tracking-[-1px] text-text-primary sm:text-4xl/tight lg:text-[2.75rem]/tight lg:tracking-[-1.4px]">{H1}</h1>
            <p className="m-0 mt-4 text-lg/[1.6] text-text-primary">
              Covarage is speaking with founders, owners and senior business leaders across Singapore about the decisions, surprises and risks that have shaped how they work. We also ask what they see coming in 2027. The report publishes in January 2027.
            </p>
            <div className="mt-6">
              <Signup />
            </div>
          </div>
          <HeroPhoto />
        </div>

        <div className="max-w-[704px]">
          <h2 className={H2}>What we ask</h2>
          <p className="m-0 text-[17px]/[1.65]">We start with the story: something you did not see coming, what it cost and what you changed afterwards. Then we ask what you see ahead in 2027. The gap between what concerns a business and what it has done about it is the finding.</p>

          <h2 className={H2}>Ten prompts for the conversation</h2>
          <p className="m-0 mb-5 text-[17px]/[1.65]">Use one as a starting point, or tell us about something else that changed how you run your business. Each links to what we have already published on it.</p>
          <ol className="m-0 list-none p-0" data-er2027-risks>
            {RISKS.map((r, i) => (
              <li key={r.risk} className="grid grid-cols-[40px_1fr] gap-2 border-t border-border-primary py-4">
                <span className="font-serif text-2xl/none text-primary">{i + 1}</span>
                <div>
                  <p className="m-0 text-[17px]/[1.4] font-semibold text-text-primary">{r.risk}</p>
                  <p className="m-0 mt-1.5 text-[15px]/[1.6]">
                    {r.guides.map(([label, slug], k) => (
                      <span key={slug}>
                        {k > 0 && <span className="text-text-secondary"> &middot; </span>}
                        <Link to={articleUrl(slug)} className={INK}>{label}</Link>
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
            <li className="grid grid-cols-[40px_1fr] gap-2 border-t border-border-primary py-4">
              <span className="font-serif text-2xl/none text-primary">+</span>
              <div>
                <p className="m-0 text-[17px]/[1.4] font-semibold text-text-primary">Something not on this list</p>
                <p className="m-0 mt-1.5 text-[15px]/[1.6]">A contract clause. The wrong hire. A key person leaving. A decision that saved money and cost more later. If it changed how you run your business, bring that story.</p>
              </div>
            </li>
          </ol>
          <Link to="/guides/emerging-risk" className={`${INK} mt-4 inline-block text-[15px] font-medium`}>All emerging-risk guides</Link>

          <h2 className={H2}>How the report is made</h2>
          <p className="m-0 text-[17px]/[1.65]">
            Interviews with owners, general managers, and heads of operations and HR at Singapore businesses, conducted by Covarage's founder. Findings are reported in aggregate; no business is named without its permission. Licensed insurance advisers write the commentary on what cover responds to each risk.
          </p>
          <p className="m-0 mt-8 text-[17px]/[1.65] font-semibold">Emerging Risks 2027: Singapore Edition. Published by Covarage, January 2027.</p>
        </div>
      </article>
    </>
  );
}
