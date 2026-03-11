import clsx from 'clsx';
import Chinataiping from '../../components/landing/Chinataiping';
import Fwd from '../../components/landing/Fwd';
import Income from '../../components/landing/Income';
import Raffles from '../../components/landing/Raffles';
import Singlife from '../../components/landing/Singlife';
import Zurich from '../../components/landing/Zurich';

const PARTNER_LOGOS = [
  { Component: Raffles, name: 'Raffles' },
  { Component: Chinataiping, name: 'China Taiping' },
  { Component: Zurich, name: 'Zurich' },
  { Component: Singlife, name: 'Singlife' },
  { Component: Fwd, name: 'FWD' },
  { Component: Income, name: 'Income' },
];

export default function LandingBrokers() {
  return (
    <section className="bg-transparent -mt-[64px] px-0 sm:bg-landing-brokers sm:px-12 sm:py-8 max-w-[100vw] overflow-hidden sm:mt-0">
      <div className="mx-auto max-w-5xl">
        {/* Heading: hidden on mobile, visible on desktop */}
        <h2 className="hidden text-center font-semibold text-xs tracking-widest text-text-primary sm:block">
          Access licensed brokers who place policies with leading insurers.
        </h2>
        <div className="relative">
          <div
            className={clsx(
              'flex flex-nowrap items-center gap-x-8 py-4 lg:mt-4 lg:justify-center lg:gap-x-12 lg:overflow-hidden xl:gap-x-16',
              'overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth',
              'touch-pan-x px-4 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
            )}
            style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            {PARTNER_LOGOS.map(({ Component, name }) => (
              <div
                key={name}
                className="flex shrink-0 items-center justify-center [&_svg]:h-8 [&_svg]:w-auto [&_svg]:max-w-[120px] [&_path]:fill-(--color-text-secondary)"
              >
                <Component />
              </div>
            ))}
          </div>
          {/* Mobile: gradient on left and right */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-landing-brokers to-transparent lg:hidden"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-landing-brokers to-transparent lg:hidden"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
