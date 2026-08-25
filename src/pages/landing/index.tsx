import Seo from '../../components/Seo';
import LanderHeader from './LanderHeader';
import Hero from './Hero';
import { Problem, Proof, Stake, TradeLine } from './Sections';
import Trades from './Trades';
import Guides from './Guides';
import { Chase, Close, HowItWorks, Money, Onboarding, Renewal, WhatYouGet } from './Sections2';
import Rotator from './Rotator';
import LandingFooter from './LandingFooter';

/** The vanilla end-user page, Revision 3a. Section order is the artboards' and is not negotiable here. */
export default function LandingPage() {
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo
        title="Covarage: the insurance team you thought you were too small for"
        description="A named adviser who knows your company, a review at every renewal, and someone who chases so you never have to. Free for your business while we are in early access."
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
      <HowItWorks />
      <Onboarding />
      <Rotator />
      <Money />
      <Close />
      <LandingFooter />
    </div>
  );
}
