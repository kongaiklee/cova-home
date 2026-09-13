import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../../components/Seo';
import LanderHeader from './LanderHeader';
import Hero from './Hero';
import { frameRequestArrival } from './requestFraming';
import { Orientation, Problem, Proof, Stake, TradeLine } from './Sections';
import Trades from './Trades';
import Guides from './Guides';
import { Chase, Close, FounderNote, HowItWorks, Money, Onboarding, Renewal, WhatYouGet } from './Sections2';
import Rotator from './Rotator';
import LandingFooter from './LandingFooter';

/** The vanilla end-user page, Revision 3a. Section order is the artboards' and is not negotiable here. */
/**
 * Organization + WebSite, on Kong's 2026-09-12 02:54 word ("org schema on homepage, breadcrumb,
 * robots.text pls"). Payload: CMO's machine-readability spec v1.0 s1, applied as written.
 *
 * EVERY VALUE HAS A SOURCE ON A CLEARED SURFACE, verified before it was written here: legal name,
 * UEN, address and the DPO address are the legal footer's own line (LandingFooter.tsx); the support
 * address is Kong's ruled one; the LinkedIn URL is the live s16 footer link; the logo is measured
 * 789 x 789; the description is the cleared About paragraph verbatim.
 *
 * WHAT IS DELIBERATELY ABSENT, and must stay absent unless Kong says otherwise: any customer count,
 * any licence claim, any word in the advice family about Covarage, any rating, any founder name.
 * The description says what the rulings say - we introduce; the intermediary advises and arranges.
 */
const ORGANIZATION_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://covarage.com/#organization',
      name: 'Covarage',
      legalName: 'Covarage Pte. Ltd.',
      url: 'https://covarage.com/',
      logo: { '@type': 'ImageObject', url: 'https://covarage.com/assets/favicon-mark.png', width: 512, height: 512 },
      image: 'https://covarage.com/assets/og-card.png',
      description:
        'Covarage is a technology platform. We put your insurance in one place, keep the dates visible, and introduce you to a licensed intermediary who advises on and arranges the cover. We do not advise on insurance ourselves.',
      foundingDate: '2025',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '20 Cecil Street, #22-00 PLUS Building',
        addressLocality: 'Singapore',
        postalCode: '049705',
        addressCountry: 'SG',
      },
      identifier: { '@type': 'PropertyValue', propertyID: 'UEN', value: '202531227H' },
      areaServed: { '@type': 'Country', name: 'Singapore' },
      contactPoint: [
        { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@covarage.com', areaServed: 'SG', availableLanguage: 'en' },
        { '@type': 'ContactPoint', contactType: 'data protection officer', email: 'dpo@covarage.com', areaServed: 'SG' },
      ],
      sameAs: ['https://www.linkedin.com/company/covarage'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://covarage.com/#website',
      url: 'https://covarage.com/',
      name: 'Covarage',
      inLanguage: 'en-SG',
      publisher: { '@id': 'https://covarage.com/#organization' },
      copyrightHolder: { '@id': 'https://covarage.com/#organization' },
      license: 'https://covarage.com/llms.txt#usage',
    },
  ],
};

export default function LandingPage() {
  const { hash } = useLocation();
  // Arriving at /#request (blog header, articles, contact, the gap tool): on desktop the browser's
  // native jump parks the card at the top edge; re-frame to header + hero (Kong w6). Phone: native.
  useEffect(() => {
    frameRequestArrival(hash);
  }, [hash]);
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo
        title="Covarage: Your insurance team, without the insurance department"
        description="A named adviser who knows your company, a review at every renewal, and someone who follows up so you never have to. Free for your business while we are in early access."
        path="/"
        jsonLd={ORGANIZATION_GRAPH}
      />
      <LanderHeader />
      <Hero />
      <TradeLine />
      <Orientation />
      <Proof />
      {/* 1B THE STAKE sits BELOW the proof strip - CD's sequence verdict, and it is a MOVE: the
          stake was live directly after the hero. Credibility before cost (74/23/85 read as scare
          copy from an unproven source and as expertise after 24 insurers / 766 policies), and the
          introducer boundary improves with it - a stake before any proof reads as COVA calling
          your cover inadequate, which is assessing adequacy; after a strip whose own footnote
          credits the intermediaries, it reads as the context advisers operate in. */}
      <Stake />
      <Problem />
      <Trades />
      <Guides />
      <WhatYouGet />
      <Renewal />
      <Chase />
      <FounderNote />
      <HowItWorks />
      <Onboarding />
      <Rotator />
      <Money />
      <Close />
      <LandingFooter />
    </div>
  );
}
