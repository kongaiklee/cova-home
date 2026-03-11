import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'SOLUTIONS', to: '#solutions' },
  { label: 'PRICING', to: '#pricing' },
  { label: 'RESOURCES', to: '#resources' },
] as const;

export default function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute top-0 lg:top-4 left-0 right-0 z-50 w-full lg:bg-transparent">
      {/* Mobile: blurred bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 backdrop-blur-md bg-white/10 lg:bg-transparent lg:backdrop-blur-none lg:px-12">
        <nav
          className="hidden items-center gap-6 lg:flex lg:gap-8"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-sm uppercase tracking-wide text-white transition hover:text-white/90"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          className="flex shrink-0 items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <span className="[&_svg]:h-6 [&_svg]:w-auto lg:[&_svg]:h-8">
            <img src="/assets/images/landing/LOGOMARK.png" />
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-sm p-2 text-white hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <div className="hidden items-center gap-6 lg:flex">
            <a
              target="_blank"
              href="https://app.covarage.com/signin"
              className="text-sm uppercase tracking-wide text-white transition hover:text-white/90"
            >
              LOGIN
            </a>
            <a
              target="_blank"
              href="https://app.covarage.com/work/signup"
              className="rounded-full border border-white bg-transparent px-4 py-2 text-sm uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              SIGNUP
            </a>
          </div>
        </div>
      </div>

      {/* Mobile accordion menu */}
      <div
        className={clsx(
          'overflow-hidden transition-all duration-200 ease-out lg:hidden',
          mobileOpen ? 'max-h-68 opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="border-t border-white/20 bg-white/10 px-4 py-4 backdrop-blur-md">
          <nav className="flex flex-col gap-1 pb-3" aria-label="Mobile menu">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-white hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="my-2 border-t border-white/20" />
            <a
              target="_blank"
              href="https://app.covarage.com/signin"
              className="rounded-lg px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-white hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              LOGIN
            </a>
            <a
              target="_blank"
              href="https://app.covarage.com/work/signup"
              className="rounded-lg border border-white bg-white/10 px-3 py-2.5 text-center text-sm font-medium uppercase tracking-wide text-white hover:bg-white/20"
              onClick={() => setMobileOpen(false)}
            >
              SIGNUP
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
