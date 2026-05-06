import LandingBrokers from './LandingBrokers';
import LandingFooter from './LandingFooter';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <LandingHeader />
      <LandingHero />
      <LandingBrokers />
      <LandingFooter />
    </div>
  );
}
