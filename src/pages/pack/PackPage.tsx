import { useEffect, useState } from 'react';
import { Head } from 'vite-react-ssg';
import { ARTICLES } from '../../content/articles';
import { Mark } from '../landing/Sections2';
import { TRADES } from '../landing/data';

/**
 * The onboarding pack (plan item 15) - a personalised page at a private link, never a PDF
 * (CD DIRECTION_onboarding-pack.md; copy = PAGE_COPY_vanilla.md s17 Rev 3i, verbatim).
 *
 * The link carries the personalisation: /pack?t=<base64url JSON> minted by
 * scripts/make-pack-link.mjs when the team opens the account. No token, a stale token or a
 * mangled token renders the plain ask-us-again state - never an error dump (CD s5.1). The
 * static prerender is that neutral state, so no personal data ever sits in served HTML.
 * noindex,nofollow; excluded from the sitemap (gen-seo.mjs lists URLs explicitly).
 */

interface PackData {
  name?: string;
  company?: string;
  email?: string;
  /** TRADES id, same vocabulary as the request card. Missing -> the guides index, never broken personalisation. */
  trade?: string;
  /** Step 03 state: true renders Completed, false/absent renders Next. */
  introduced?: boolean;
  /** Renewal dates the account holds. Absent/empty -> the block elides whole. */
  renewals?: { policy: string; date: string }[];
}

function decodeToken(t: string | null): PackData | null {
  if (!t) return null;
  try {
    const json = atob(t.replace(/-/g, '+').replace(/_/g, '/'));
    const data = JSON.parse(json);
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return null;
    return data as PackData;
  } catch {
    return null;
  }
}

const BOOKING_URL = 'https://cal.com/kongaiklee/30min';
const H2 = 'm-0 mb-4 font-serif text-[26px]/[1.15] tracking-[-0.8px] text-primary-extended lg:text-[30px]/[1.12] lg:tracking-[-0.9px]';
const BODY = 'm-0 text-base/[1.6] text-text-primary lg:text-[17px]/[1.6]';

const DOES = 'Organises your insurance information and documents. Keeps your renewal dates visible in one place. Prepares and passes on the information you provide. Introduces you to a licensed intermediary. Follows up and keeps you informed.';
const INTERMEDIARY_DOES = 'Reviews your insurance needs with you. Gives insurance advice. Discusses the available options with you. Provides or obtains quotations. Recommends or arranges insurance products.';
// The ruled "What we are" paragraph - VERBATIM, must never drift; the gate pins the class.
const WHAT_WE_ARE = 'Covarage is a technology platform. We put your insurance in one place, keep the dates visible, and introduce you to a licensed intermediary who advises on and arranges the cover. We do not advise on insurance ourselves, and we are not paid by any insurer.';

const LAW_LABEL: Record<string, string> = { cover: 'Required cover', duty: 'Legal duty' };

function StepChip({ state }: { state: 'Completed' | 'Next' }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.08em] uppercase ${
        state === 'Completed' ? 'bg-[#eaf1f7] text-primary' : 'border border-border-primary text-text-secondary'
      }`}
    >
      {state}
    </span>
  );
}

export default function PackPage() {
  const [data, setData] = useState<PackData | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(decodeToken(new URLSearchParams(window.location.search).get('t')));
    setReady(true);
  }, []);

  const trade = TRADES.find((t) => t.id === data?.trade);
  const tradeSlug = trade?.href.replace(/^\/guides/, '');
  const lawFlag = tradeSlug ? ARTICLES.find((a) => a.slug === tradeSlug)?.required_by_law : undefined;
  const renewals = (data?.renewals ?? []).filter((r) => r && r.policy && r.date);
  const booking = `${BOOKING_URL}?${new URLSearchParams({
    ...(data?.name ? { name: data.name } : {}),
    ...(data?.email ? { email: data.email } : {}),
  }).toString()}`.replace(/\?$/, '');

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Head>
        <title>Your onboarding pack - Covarage</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{'@page { size: A4 portrait; margin: 18mm; }'}</style>
      </Head>

      <div className="mx-auto w-full max-w-[720px] px-6 py-10 lg:py-16">
        {/* The lockup, small, top left - a letter, not a lander. */}
        <div className="mb-10 flex items-center gap-2 lg:mb-14">
          <Mark className="block size-6 text-primary-extended" />
          <span className="text-[17px] font-semibold tracking-[-0.2px]">Covarage</span>
        </div>

        {ready && !data ? (
          /* The ask-us-again state: a wrong or stale link, said plainly (CD s5.1). */
          <section id="welcome">
            <h1 className="m-0 mb-4 font-serif text-[32px]/[1.1] tracking-[-1px]">This link needs a refresh.</h1>
            <p className={BODY}>
              The page could not read your link - it may be stale or incomplete. Reply to the email
              that brought you here, or message +65 8867 0918 on WhatsApp, and we will send you a
              fresh one.
            </p>
          </section>
        ) : (
          <>
            {/* MOVE 1 - the personal head. Empty name/company elide whole (the s15 rule). */}
            <section id="welcome" className="mb-12 lg:mb-16">
              <h1 className="m-0 mb-4 font-serif text-[32px]/[1.1] tracking-[-1px] lg:text-[40px]/[1.08] lg:tracking-[-1.3px]">
                {data?.name ? `Welcome to Covarage, ${data.name}.` : 'Welcome to Covarage.'}
              </h1>
              <p className={BODY}>
                {data?.company ? `I'm glad to welcome you and the team at ${data.company}. ` : "I'm glad to welcome you. "}
                This page shows you what happens next and who is here when you need us.
              </p>
            </section>

            {/* MOVE 2 - what Covarage is, and is not. The ruled paragraph, pull-quote weight. */}
            <section id="what-we-are" className="mb-12 lg:mb-16">
              <h2 className={H2}>What we are</h2>
              <p className="m-0 mb-7 font-serif text-[20px]/[1.5] text-primary-extended lg:text-[22px]/[1.5]">{WHAT_WE_ARE}</p>
              <div className="grid gap-6 border-t border-border-primary pt-6 sm:grid-cols-2 lg:gap-10">
                <p className="m-0 text-[15px]/[1.65] text-text-secondary">
                  <strong className="font-semibold text-text-primary">What Covarage does:</strong> {DOES}
                </p>
                <p className="m-0 text-[15px]/[1.65] text-text-secondary">
                  <strong className="font-semibold text-text-primary">What a licensed intermediary does:</strong> {INTERMEDIARY_DOES}
                </p>
              </div>
            </section>

            {/* MOVE 3 - the first weeks, in the new-user tense. */}
            <section id="first-weeks" className="mb-12 lg:mb-16">
              <h2 className={H2}>Your first weeks with Covarage</h2>
              <div className="flex flex-col gap-5">
                <div className="border-t border-border-primary pt-5">
                  <StepChip state="Completed" />
                  <p className={`${BODY} mt-2`}><strong className="font-semibold">01 - You spoke to us.</strong> You told us what your business does and what you hold today.</p>
                </div>
                <div className="border-t border-border-primary pt-5">
                  <StepChip state="Completed" />
                  <p className={`${BODY} mt-2`}><strong className="font-semibold">02 - We set you up.</strong> We opened your account and started bringing your policies, certificates and renewal dates together with you.</p>
                </div>
                <div className="border-t border-border-primary pt-5">
                  <StepChip state={data?.introduced ? 'Completed' : 'Next'} />
                  <p className={`${BODY} mt-2`}><strong className="font-semibold">03 - We introduce you.</strong> We introduce you to a licensed intermediary, who reviews your needs with you. We follow up and keep you informed.</p>
                </div>
              </div>
            </section>

            {/* MOVE 4 - your trade, your dates. Missing trade -> the guides index; no dates -> the block elides whole. */}
            <section id="your-trade" className="mb-12 lg:mb-16">
              {trade ? (
                <>
                  <h2 className={H2}>A checklist for {trade.label}</h2>
                  {lawFlag && LAW_LABEL[lawFlag] && (
                    <p className="m-0 mb-2 text-[11px] font-semibold tracking-[0.12em] text-primary uppercase">{LAW_LABEL[lawFlag]}</p>
                  )}
                  <p className={`${BODY} mb-5`}>See the cover and documents businesses in {trade.label} are commonly asked to carry.</p>
                  <a href={trade.href} className="inline-block rounded-sm bg-primary-extended px-6 py-3 text-[15px] font-medium text-white transition hover:opacity-90 print:hidden">
                    Read the {trade.label} checklist
                  </a>
                </>
              ) : (
                <>
                  <h2 className={H2}>Business insurance guides</h2>
                  <p className={`${BODY} mb-5`}>Browse practical guides to the cover and documents businesses are commonly asked to carry.</p>
                  <a href="/guides" className="inline-block rounded-sm bg-primary-extended px-6 py-3 text-[15px] font-medium text-white transition hover:opacity-90 print:hidden">
                    Open the guides
                  </a>
                </>
              )}
              {renewals.length > 0 && (
                <div className="mt-9">
                  <h2 className={H2}>Your renewal dates</h2>
                  <p className={`${BODY} mb-4`}>These are the renewal dates currently held in your account.</p>
                  <div className="flex flex-col">
                    {renewals.map((r) => (
                      <div key={`${r.policy}-${r.date}`} className="flex items-baseline justify-between gap-6 border-t border-border-primary py-3">
                        <span className="text-[15px] text-text-primary">{r.policy}</span>
                        <span className="text-[15px] font-medium whitespace-nowrap text-primary">{r.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* MOVE 5 - who to reach. The page ends with a person, not a footer wall. */}
            <section id="reach-us">
              <h2 className={H2}>You can reach us directly</h2>
              <div className="flex flex-col gap-4">
                <p className={BODY}><strong className="font-semibold">Reply by email.</strong> Reply to the email that brought you here. A person monitors the inbox.</p>
                <p className={BODY}><strong className="font-semibold">Message us on WhatsApp.</strong> +65 8867 0918</p>
                <p className={BODY}><strong className="font-semibold">Book time with Kong.</strong> Choose a 30-minute time with Kong, our founder.</p>
              </div>
              <a
                href={booking}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-sm border border-border-primary bg-white px-6 py-3 text-[15px] font-medium text-text-primary transition hover:border-primary print:hidden"
              >
                Book time with Kong
              </a>
              <p className={`${BODY} mt-10`}>We are here when you need us.</p>
              <p className="m-0 mt-6 font-serif text-[19px] tracking-[-0.4px] text-text-primary">Kong Aik Lee</p>
              <p className="m-0 mt-1 text-[14px] text-text-secondary">Founder, Covarage</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
