import { Link } from 'react-router-dom';
import { LOGIN_URL, REQUEST_ANCHOR } from './data';

/**
 * Full-width header: brandmark left, `Log in` + `Request access` right, on every breakpoint.
 * `Log in` is the app's sign-in, env-derived - never a relative /signin, which the marketing
 * host answers with the homepage.
 */
export default function LanderHeader() {
  return (
    <header className="border-b border-border-primary">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-[100px] lg:py-5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Covarage home">
          <img src="/assets/images/landing/Logo.png" alt="" className="block h-7 w-auto" />
          <span className="text-lg font-semibold tracking-[-0.2px] text-text-primary">Covarage</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-7" aria-label="Primary">
          <a
            href={LOGIN_URL}
            className="text-sm font-medium text-text-primary transition hover:text-primary"
            data-login
          >
            Log in
          </a>
          <a
            href={REQUEST_ANCHOR}
            className="rounded-sm bg-primary-extended px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Request access
          </a>
        </nav>
      </div>
    </header>
  );
}
