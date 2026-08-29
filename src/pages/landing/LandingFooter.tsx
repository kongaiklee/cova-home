import { Link } from 'react-router-dom';
import { WRAP } from './Sections';
import { HUB_CATEGORIES } from '../blog/CategoryHub';
import { CATEGORY_LABELS } from '../../content/intents';

/**
 * Site footer, shared by the lander, the blog, the legal pages and the 404. One status line,
 * the entity line, the document versions. Links in the artboards' order; News & Updates + RSS
 * added on KONG's word (2026-08-29, TM window).
 */
export default function LandingFooter() {
  const link = 'text-[13px] font-medium text-text-primary no-underline hover:text-primary';
  const fine = 'm-0 text-[11px]/[1.6] tracking-[0.05em] text-[#b3aca6]';
  return (
    <footer className={`${WRAP} border-t border-border-primary pt-7 pb-11 lg:border-t-0 lg:pt-14 lg:pb-[72px]`}>
      <div className="mb-3.5 flex items-center gap-2.5 lg:mb-5">
        <img src="/assets/images/landing/Logo.png" alt="" className="block h-5 w-auto opacity-70" />
        <span className="text-[15px] font-semibold text-text-secondary">Covarage</span>
      </div>
      <nav className="mb-[18px] flex flex-wrap gap-4 lg:gap-7" aria-label="Footer">
        <Link to="/blog" className={link}>Guides</Link>
        <Link to="/updates" className={link}>News & Updates</Link>
        <Link to="/privacy" className={link}>Privacy Policy</Link>
        <Link to="/terms" className={link}>Terms of Use</Link>
        <Link to="/contact" className={link}>Contact</Link>
        <Link to="/careers" className={link}>Careers</Link>
        {/* plain <a>: the feed is a static file, not a route */}
        <a href="/feed.xml" className={link}>RSS</a>
      </nav>
      {/* The category hubs, in the footer of EVERY page so the whole guide tree is one hop from
          anywhere a crawler lands. This is the cheap half of the indexing fix (CMO's plan s2.3):
          the hubs carry the 525 article links, and this carries the hubs. Derived from the index,
          never hardcoded - a new category appears here on its own. */}
      <nav className="mb-[18px] flex flex-wrap gap-x-4 gap-y-2 lg:gap-x-6" aria-label="Guide categories">
        {HUB_CATEGORIES.map((c) => (
          <Link key={c} to={`/guides/${c}`} className="text-[13px] text-text-secondary no-underline hover:text-primary">
            {CATEGORY_LABELS[c] ?? c}
          </Link>
        ))}
      </nav>
      <p className={`${fine} mb-2.5 max-w-[90ch]`}>
        Covarage is a technology platform. We are not a licensed insurance broker regulated by the Monetary Authority of Singapore (MAS) and do not provide any financial advice.
      </p>
      <p className={`${fine} mb-2.5`}>
        Covarage Pte. Ltd. &middot; UEN 202531227H &middot; 20 Cecil Street, #22-00 PLUS Building, Singapore 049705 &middot; Data protection: dpo@covarage.com
      </p>
      <p className={fine}>&copy; Covarage 2026 &middot; Privacy Policy v1.0 and Terms of Use v1.0, 25 August 2026</p>
    </footer>
  );
}
