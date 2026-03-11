import { Link } from 'react-router-dom';

export default function LandingMap() {
  return (
    <section className="bg-landing-section px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl/tight font-serif hidden lg:block text-text-primary sm:text-4xl lg:text-[2.5rem]">
          Whatever the weather.
          <br />
          You&apos;re in the right harbour
        </h2>
        <h2 className="block lg:hidden text-3xl/tight font-serif text-text-primary sm:text-4xl lg:text-4xl/tight mt-3">
          Built to navigate uncertainty.
        </h2>
        <div className="mt-6 flex justify-center">
          <Link
            to="/work/signup"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-background-primary"
          >
            Start for free
          </Link>
        </div>
        <div className="relative mt-10 overflow-hidden rounded-lg">
          <img
            src="/assets/images/landing/MAP.png"
            alt="Coverage map"
            className="w-full object-contain object-center"
          />
          <span
            className="absolute left-[18%] bottom-[50%] text-sm font-medium text-text-primary sm:text-base"
            aria-hidden
          >
            Covarage
          </span>
          <span
            className="absolute right-[5%] top-[52%] text-sm font-medium text-text-primary sm:text-base"
            aria-hidden
          >
            Gets you there
          </span>
        </div>
      </div>
    </section>
  );
}
