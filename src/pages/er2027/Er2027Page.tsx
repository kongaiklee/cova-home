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
 * the request card's form as its one door. No photograph, no logos, no price, no second button,
 * and NO THEME LINE (Kong's w7 lock: the theme rides the report).
 */

/** COO s2.1: every record says which consent line the person agreed to. Bump with the string. */
export const ER2027_CONSENT_VERSION = 'consent v1.0 2026-09-14';

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
const DESCRIPTION = "Emerging Risks 2027 is Covarage's report on the risks Singapore businesses face next year, from AI fraud to heat stress. Get a copy when it publishes.";
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
        <p className="m-0 font-serif text-2xl tracking-[-0.6px] text-text-primary">Thank you.</p>
        <p className="m-0 mt-2 text-[15px]/relaxed text-text-primary">
          {sentOption === 'report_and_participate'
            ? 'We will send you Emerging Risks 2027: Singapore Edition when it publishes, and our founder will be in touch to arrange the conversation.'
            : 'We will send you Emerging Risks 2027: Singapore Edition when it publishes.'}
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
            <span className="mt-1 block text-sm/[1.5] text-text-secondary">A 30-minute conversation with our founder about the risks your business expects in 2027.</span>
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
      {/* COO's cleared consent line (v1.0) - the notice that makes consent valid. Do not edit
          without COO; a changed line means a new ER2027_CONSENT_VERSION. */}
      <p className="m-0 mt-3 text-[13px]/[1.5] text-text-secondary" data-consent-line>
        We will use your details to send you Emerging Risks 2027: Singapore Edition when it publishes and, if you chose to take part, to arrange the conversation with our founder. We will not sell them or pass them to anyone else, including the licensed brokers who write the report's commentary. You can withdraw and ask us to delete them at any time at dpo@covarage.com.{' '}
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
        <div className="max-w-[704px]">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-text-secondary" aria-label="Breadcrumb">
            <Link to="/blog" className="hover:text-text-primary">Guides</Link>
            <span aria-hidden>/</span>
            <Link to="/guides/emerging-risk" className="hover:text-text-primary">Emerging risks</Link>
            <span aria-hidden>/</span>
            <span className="text-text-primary">Emerging Risks 2027</span>
          </nav>
          <p className="m-0 mt-6 text-xs font-medium tracking-[0.14em] text-primary uppercase">Emerging Risks 2027 &middot; Singapore Edition</p>
          <h1 className="m-0 mt-3 font-serif text-3xl/tight font-normal tracking-[-1px] text-text-primary sm:text-4xl/tight lg:text-[2.75rem]/tight lg:tracking-[-1.4px]">{H1}</h1>
          <p className="m-0 mt-4 text-lg/[1.6] text-text-primary">
            Covarage is interviewing business leaders across Singapore about the risks they expect in 2027, and what they have done about each one. The report publishes in January 2027.
          </p>
          <div className="mt-6">
            <Signup />
          </div>

          <h2 className={H2}>What the report measures</h2>
          <p className="m-0 text-[17px]/[1.65]">Two questions, asked of every business: which risks concern you for 2027, and what have you done about each one. The gap between the two is the finding.</p>

          <h2 className={H2}>The ten risks we are asking about</h2>
          <p className="m-0 mb-5 text-[17px]/[1.65]">Each links to what we have already published on it.</p>
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
          </ol>
          <Link to="/guides/emerging-risk" className={`${INK} mt-4 inline-block text-[15px] font-medium`}>All emerging-risk guides</Link>

          <h2 className={H2}>How the report is made</h2>
          <p className="m-0 text-[17px]/[1.65]">
            Interviews with owners, general managers, and heads of operations and HR at Singapore businesses, conducted by Covarage's founder. Findings are reported in aggregate; no business is named without its permission. Licensed insurance brokers write the commentary on what cover responds to each risk.
          </p>
          <p className="m-0 mt-8 text-[17px]/[1.65] font-semibold">Emerging Risks 2027: Singapore Edition. Published by Covarage, January 2027.</p>
        </div>
      </article>
    </>
  );
}
