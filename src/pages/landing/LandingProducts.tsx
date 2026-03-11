import { LANDING_CONTAINER_CLASS } from './landingContainer';

export default function LandingProducts() {
  return (
    <section className="bg-landing-section py-12 lg:py-24">
      <div className={LANDING_CONTAINER_CLASS}>
        <p className="text-center text-[13px] font-medium tracking-widest text-text-primary">
          Covarrage Product Suite
        </p>
        <h2 className="mt-3 text-center text-2xl/tight tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
          <span className="block lg:hidden">Get to know</span>
          <span className="block lg:hidden">Covarrage</span>
          <span className="hidden lg:block">Everything in one berth</span>
        </h2>
        <div className="mt-8 flex justify-center lg:mt-12">
          <div className="w-full max-w-6xl overflow-hidden rounded-lg shadow-2xl shadow-border-primary/50 ring-1 ring-border-primary/80">
            {/* Mobile: vertical monitor image; Desktop: wide computer image */}
            <img
              src="/assets/images/landing/mobile-computer.png"
              alt="Covarrage product on screen"
              className="w-full object-contain object-top lg:hidden"
            />
            <img
              src="/assets/images/landing/computer.png"
              alt="Covarrage product suite on desktop"
              className="hidden w-full object-cover object-top lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
