import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LANDING_CONTAINER_CLASS } from './landingContainer';

export default function LandingHero() {
  return (
    <section className="flex relative flex-col items-end h-[calc(100vh+64px)] max-h-[calc(100vh+64px)] overflow-hidden bg-linear-to-b from-landing-hero-from to-landing-hero-to pt-18 pb-[96px] sm:pb-0 sm:h-screen sm:max-h-screen">
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
          'relative z-10 flex flex-col h-full'
        )}
      >
        <div className="flex flex-2 items-end">
          <div className="flex-1">
            {/* Mobile: different headline + body */}
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:hidden">
              Navigate business insurance with confidence.
            </h1>
            <p className="mt-6 max-w-xl text-md leading-relaxed text-white/95 sm:hidden">
              Meet landlord and regulatory requirements, keep your insurance
              organised, and get broker support when you need it.
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
                to="/work/signup"
                className="inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-medium text-text-primary shadow-sm transition hover:bg-white/95"
              >
                Start for free
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="hidden sm:block flex-2" />
        </div>

        <div className="flex flex-1 items-end justify-between">
          <p className="pb-8 text-sm text-text-secondary hidden sm:block">
            Free to use. No obligation. Licensed brokers on standby.
          </p>
          <img
            src="/assets/images/landing/Video.png"
            alt=""
            aria-hidden
            className="w-100 h-100 z-100 object-none"
          />
        </div>
      </div>
    </section>
  );
}
