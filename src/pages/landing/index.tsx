import LandingBrokers from './LandingBrokers';
import LandingFeatures from './LandingFeatures';
import LandingFooter from './LandingFooter';
import LandingHandles from './LandingHandles';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import LandingMap from './LandingMap';
import LandingProducts from './LandingProducts';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <LandingHeader />
      <LandingHero />
      <LandingBrokers />
      <LandingProducts />
      <LandingHandles />
      <LandingFeatures />
      <LandingMap />
      <LandingFooter />
    </div>
  );
}
