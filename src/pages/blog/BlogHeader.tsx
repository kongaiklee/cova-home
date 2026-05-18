import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const APP_URL = import.meta.env.VITE_APP_COVARAGE_URL;

const NAV = [
  { label: 'Blog', href: '/blog', external: false },
  { label: 'Home', href: '/', external: false },
];

/** Solid header for the blog: dark text on the warm Sailcloth background. */
export default function BlogHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-primary bg-background-primary/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Covarage home">
          <img
            src="/assets/images/landing/Logo.png"
            alt="Covarage"
            className="h-7 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-text-primary transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`${APP_URL}/signin`}
            className="text-sm font-medium text-text-primary transition hover:text-primary"
          >
            Login
          </a>
          <a
            href={`${APP_URL}/work/signup`}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Book a demo
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-text-primary hover:bg-black/5 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={clsx(
          'overflow-hidden border-t border-border-primary transition-all duration-200 ease-out lg:hidden',
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 border-t-0 opacity-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-black/5"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`${APP_URL}/signin`}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-black/5"
          >
            Login
          </a>
          <a
            href={`${APP_URL}/work/signup`}
            className="mt-1 rounded-full bg-primary px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-hover"
          >
            Book a demo
          </a>
        </nav>
      </div>
    </header>
  );
}
