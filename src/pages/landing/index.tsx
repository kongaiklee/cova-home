import Seo from '../../components/Seo';
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
    <>
      <Seo
        title="Covarage: Insurance, Without the Admin"
        description="Covarage connects Singapore businesses to licensed insurance brokers and keeps every policy organised in one place. No chasing, no paperwork pile-ups."
        path="/"
      />
      <LandingHeader />
      <LandingHero />
      <LandingBrokers />
      <LandingProducts />
      <LandingHandles />
      <LandingFeatures />
      <LandingMap />
      <LandingFooter />
    </>
  );
}
