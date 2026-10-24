import { Link } from 'react-router-dom';
import { WRAP } from './Sections';
import { LOGIN_URL, TRADES } from './data';
import { SOLUTIONS } from './V15';
import { HUB_CATEGORIES } from '../blog/CategoryHub';
import { CATEGORY_LABELS } from '../../content/intents';

/**
 * Site footer, v1.4 PREVIEW (branch homepage-v14, CD 2026-10-24): the same links as v1.3, grouped in labelled columns
 * (Platform, Industries, Guides, Company, Legal) the way established sites lay theirs out (Xero, Coalition, ERGO NEXT). Shared by
 * the lander, the blog, the legal pages and the 404. Kept as they were: News & Updates and RSS (KONG, 2026-08-29); Emerging Risks
 * 2027 (CD s3, 2026-09-14); LinkedIn the only entry that leaves covarage.com, so target=_blank with rel=noopener noreferrer
 * (Kong 2026-09-04); the category hubs on EVERY page, derived from the index (CMO's indexing plan s2.3 - the hubs carry the
 * article links and this carries the hubs); the status line, the entity line and the document versions, word for word.
 */
export default function LandingFooter() {
  const head = 'm-0 mb-3.5 text-xs font-medium tracking-[0.12em] text-text-secondary uppercase';
  const link = 'block py-1 text-[14px] text-text-primary no-underline hover:text-primary';
  const fine = 'm-0 text-[11px]/[1.6] tracking-[0.05em] text-text-secondary';
  return (
    <footer className="border-t border-border-primary bg-background-primary">
      <div className={`${WRAP} pt-12 pb-11 lg:pt-16 lg:pb-[72px]`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-[1.1fr_1fr_1.1fr_1.4fr_1fr_1fr_0.9fr] lg:gap-x-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <img src="/assets/brand/covarage-lockup-black.svg" alt="Covarage" width={220} height={40} className="block h-6 w-auto sm:h-7" />
          </div>
          <nav aria-label="Platform">
            <p className={head}>Platform</p>
            <a href="/#how" className={link}>How it works</a>
            <Link to="/pricing" className={link}>Pricing</Link>
            <a href={LOGIN_URL} className={link}>Log in</a>
            <a href="/#request" className={link}>Request a call</a>
          </nav>
          <nav aria-label="Solutions">
            <p className={head}>Solutions</p>
            {SOLUTIONS.map((s) => <Link key={s.label} to={s.to} className={link}>{s.label}</Link>)}
          </nav>
          <nav aria-label="Industries">
            <p className={head}>Industries</p>
            {TRADES.map((t) => <Link key={t.id} to={t.href} className={link}>{t.title}</Link>)}
          </nav>
          <nav aria-label="Guides">
            <p className={head}>Guides</p>
            <Link to="/blog" className={link}>All guides</Link>
            <Link to="/updates" className={link}>Regulatory updates</Link>
            <Link to="/updates/cyber" className={link}>Cyber and digital risk</Link>
            <Link to="/emerging-risks-2027" className={link}>Emerging Risks 2027</Link>
            <a href="/feed.xml" className={link}>RSS</a>
          </nav>
          <nav aria-label="Company">
            <p className={head}>Company</p>
            <Link to="/partners" className={link}>Partners</Link>
            <a href="/investors" className={link}>Investors</a>
            <Link to="/security" className={link}>Security</Link>
            <Link to="/contact" className={link}>Contact</Link>
            <Link to="/careers" className={link}>Careers</Link>
            <Link to="/faq" className={link}>FAQ</Link>
            <a href="https://www.linkedin.com/company/covarage" target="_blank" rel="noopener noreferrer" className={link}>LinkedIn</a>
          </nav>
          <nav aria-label="Legal">
            <p className={head}>Legal</p>
            <Link to="/privacy" className={link}>Privacy Policy</Link>
            <Link to="/terms" className={link}>Terms of Use</Link>
          </nav>
        </div>
        <nav className="mt-11 border-t border-border-primary pt-6" aria-label="Guide categories">
          <p className={head}>Guides by category</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {HUB_CATEGORIES.map((c) => (
              <Link key={c} to={`/guides/${c}`} className="text-[13px] text-text-secondary no-underline hover:text-primary">
                {CATEGORY_LABELS[c] ?? c}
              </Link>
            ))}
          </div>
        </nav>
        <div className="mt-8 grid gap-2.5">
          <p className={`${fine} max-w-[90ch]`} data-nosnippet="">
            Covarage is a technology platform. We are not a licensed insurance broker regulated by the Monetary Authority of Singapore (MAS) and do not provide any financial advice.
          </p>
          <p className={fine} data-nosnippet="">
            Covarage Pte. Ltd. &middot; UEN 202531227H &middot; 20 Cecil Street, #22-00 PLUS Building, Singapore 049705 &middot; Data protection: dpo@covarage.com
          </p>
          <p className={fine} data-nosnippet="">&copy; Covarage 2026 &middot; Privacy Policy v1.0 and Terms of Use v1.0, 25 August 2026</p>
        </div>
      </div>
    </footer>
  );
}
