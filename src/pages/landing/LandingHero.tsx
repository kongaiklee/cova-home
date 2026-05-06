import clsx from 'clsx';
import NeedsForm from '../../components/NeedsForm';
import { LANDING_CONTAINER_CLASS } from './landingContainer';

export default function LandingHero() {
  return (
    <>
      <section className="flex relative flex-col items-end overflow-hidden bg-linear-to-b from-landing-hero-from to-landing-hero-to pt-18 pb-16 sm:pb-0 min-h-screen">
        {/* Full-bleed background: boat from top of hero to bottom */}
        <img
          src="/assets/images/landing/boat.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-[1500px] w-full object-cover object-top left-0 sm:left-[300px] sm:-top-[310px] sm:h-[2100px] sm:w-[1575px] sm:object-right"
        />

        {/* Content above background */}
        <div
          className={clsx(
            LANDING_CONTAINER_CLASS,
            'relative z-10 flex flex-1 py-8'
          )}
        >
          <div className="w-full flex flex-col lg:flex-row justify-between gap-10 lg:gap-12">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center">
                <div className="flex-1 w-full max-w-full lg:max-w-[400px]">
                  {/* Mobile: different headline + body */}
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:hidden">
                    Navigate business insurance with confidence.
                  </h1>
                  <p className="mt-6 max-w-xl text-md leading-relaxed text-white/95 sm:hidden">
                    Meet landlord and regulatory requirements, keep your
                    insurance organised, and get broker support when you need
                    it.
                  </p>
                  {/* Desktop: original headline + body */}
                  <h1 className="hidden font-serif text-4xl tracking-tight text-white sm:block sm:text-5xl lg:text-6xl">
                    Built to navigate uncertainty.
                  </h1>
                  <p className="mt-6 max-w-xl text-lg/relaxed text-white/95 hidden sm:block">
                    Every business hits open water.
                  </p>
                  <p className="max-w-xl text-lg/relaxed text-white/95 hidden sm:block">
                    Covarage is the harbour you come back to.
                  </p>
                  {/* CTA removed — NeedsForm in the right column is the conversion path */}
                </div>
              </div>
              <div>
                {/* Trust line moved into NeedsForm component */}
              </div>
            </div>
            <div className="w-full lg:w-auto self-stretch lg:self-center flex justify-center lg:justify-end">
              <NeedsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
