import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../../components/Seo';
import LanderHeader from './LanderHeader';
import Hero from './Hero';
import { frameRequestArrival } from './requestFraming';
import { Problem, Proof, Stake, TradeLine } from './Sections';
import Trades from './Trades';
import Guides from './Guides';
import { Chase, Close, FounderNote, HowItWorks, Money, Onboarding, Renewal, WhatYouGet } from './Sections2';
import Rotator from './Rotator';
import LandingFooter from './LandingFooter';

/** The vanilla end-user page, Revision 3a. Section order is the artboards' and is not negotiable here. */
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
      />
      <LanderHeader />
      <Hero />
      <TradeLine />
      <Stake />
      <Proof />
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
