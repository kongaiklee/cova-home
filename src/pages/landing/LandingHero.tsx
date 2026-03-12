import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
          <div className="w-full flex flex-col sm:flex-row justify-between gap-12 sm:gap-4">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center">
                <div className="flex-1 w-full max-w-full sm:max-w-[400px]">
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
                    Coverage is the harbour you come back to.
                  </p>
                  <div className="mt-10">
                    <Link
                      to={`${import.meta.env.VITE_APP_COVARAGE_URL}/work/signup`}
                      className="inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-medium text-text-primary shadow-sm transition hover:bg-white/95"
                    >
                      Start for free
                      <ArrowRight className="size-5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-secondary hidden sm:block">
                  Free to use. No obligation. Licensed brokers on standby.
                </p>
              </div>
            </div>
            <div className="self-center sm:self-end">
              <div>
                <img
                  src="/assets/images/landing/Video.png"
                  alt=""
                  aria-hidden
                  className="w-full max-w-[320px]"
                />
                <p className="text-sm text-white block sm:hidden mt-16">
                  Access to policies from leading insurers, via licensed brokers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
