import { Link, useLocation } from 'react-router-dom';
import { LOGIN_URL, REQUEST_ANCHOR } from './data';
import { requestClick } from './requestFraming';

/**
 * Full-width header: brandmark left, `Log in` + `Request access` right, on every breakpoint.
 * `Log in` is the app's sign-in, env-derived - never a relative /signin, which the marketing
 * host answers with the homepage. Off the lander (/contact, /careers, the 404) `Request access`
 * goes to `/#request` - a bare `#request` there would anchor to nothing.
 */
export default function LanderHeader() {
  const onLander = useLocation().pathname === '/';
  return (
    <header className="border-b border-border-primary">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-[100px] lg:py-5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Covarage home">
          {/* CD brand pass s1: the one supplied lockup file, 32px from 640 up and 24px below; the mark alone
              where the lockup leaves no air. With `Guides` in the nav (2026-09-14) that line moved from 380px
              to 460px, measured: lockup + three items wraps the header at 380-414 and touches `Guides` at
              430-440; 460 leaves 31px of air. CD to rule the phone treatment. */}
          <img src="/assets/brand/covarage-lockup-black.svg" alt="Covarage" width={220} height={40} className="hidden h-6 w-auto min-[460px]:block sm:h-8" />
          <img src="/assets/brand/covarage-mark-black.svg" alt="Covarage" width={40} height={40} className="block size-6 min-[460px]:hidden" />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-7" aria-label="Primary">
          {/* Kong's two-jobs frame (2026-09-14, hub /check #2 w20; CMO lander position v1.3): the guides
              pathway lives in the nav, so it survives any cut to the page below it. Same target as the
              footer's and the guides header's `Guides`. */}
          <Link to="/blog" className="text-sm font-medium text-text-primary transition hover:text-primary" data-guides>
            Guides
          </Link>
          <a
            href={LOGIN_URL}
            className="text-sm font-medium text-text-primary transition hover:text-primary"
            data-login
          >
            Log in
          </a>
          <a
            href={onLander ? REQUEST_ANCHOR : `/${REQUEST_ANCHOR}`}
            onClick={onLander ? requestClick : undefined}
            className="rounded-sm bg-primary-extended px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition hover:opacity-90"
          >
            Request a call
          </a>
        </nav>
      </div>
    </header>
  );
}
