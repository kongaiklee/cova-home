import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMG, LOGIN_URL, REQUEST_ANCHOR, TRADES } from './data';
import { SOLUTIONS } from './V15';
import { requestClick } from './requestFraming';
import { NOT_A_BODY, agencyName, axisValues, valueSlug, type Axis } from '../../content/facets';

/**
 * The header, v1.4 PREVIEW (branch homepage-v14, CD 2026-10-24; Kong: "i like the stripe mercury ramp xero styles"): the
 * brandmark, How it works, Industries, Guides, Company, then `Log in` and `Request a call`. Guides stays a top-level word (Kong's
 * two-jobs frame, 2026-09-14: the guides pathway lives in the nav). On a phone the groups sit behind a menu button (Kong
 * 2026-09-24: a hamburger, never a sideways strip), `Request a call` stays in view. `Log in` is the platform's sign-in, an
 * absolute address. Off the lander `Request a call` goes to `/#request`.
 *
 * Kong 2026-10-24 (CD's KONG_LOG 376): "for industries on header can we have one of those large menu dropdowns where each industry
 * has their own picture as well? / for the guides downdrop can we show the article types nested as well on the core 3 article
 * types: industry, regulation and policy types". So Industries and Guides open full-width panels: the eight trades each with its
 * own photograph; the guides by the three axes of /blog (Industry, Regulation - the agencies cited, by full name, the statute book
 * left out as on /blog - and Policy types), the most-covered values of each, with their counts, linking to the filtered index.
 */
/* `page`: a page served as its own file, outside the app's router (the investor page, public/investors.html) - a plain link. */
type Item = { label: string; to: string; external?: boolean; page?: boolean };

const COMPANY: Item[] = [
  { label: 'Partners', to: '/partners' },
  // the step-up (the hub's w46 22:03; CMO step-up copy v0.2 (c)): Security beside the company's own pages
  { label: 'Security', to: '/security' },
  // Kong 2026-10-24 19:09: "we actually have an investor page, right, that you didn't link it to the lender as well."
  { label: 'Investors', to: '/investors', page: true },
  { label: 'Contact', to: '/contact' },
  { label: 'Careers', to: '/careers' },
  { label: 'FAQ', to: '/faq' },
  { label: 'LinkedIn', to: 'https://www.linkedin.com/company/covarage', external: true },
];

/** The most-covered values on one axis of /blog, with their counts and their filter links. */
function topOf(axis: Axis, n: number): { label: string; count: number; to: string }[] {
  return Object.entries(axisValues(axis))
    .filter(([v]) => !(axis === 'agency' && NOT_A_BODY.has(v)))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n)
    .map(([v, c]) => ({ label: axis === 'agency' ? agencyName(v) : v, count: c, to: `/blog?${axis}=${valueSlug(axis, v)}` }));
}
const GUIDE_AXES: { title: string; axis: Axis; all: string }[] = [
  { title: 'Industry', axis: 'industry', all: 'All industries' },
  { title: 'Regulation', axis: 'agency', all: 'All regulators' },
  { title: 'Policy types', axis: 'policy', all: 'All policy types' },
];
const GUIDES_MORE: Item[] = [
  { label: 'Required by law', to: '/blog?required=cover' },
  { label: 'Regulatory updates', to: '/updates' },
  { label: 'Cyber and digital risk', to: '/updates/cyber' },
  { label: 'Emerging Risks 2027', to: '/emerging-risks-2027' },
];

function ItemLink({ it, className, onClick, children }: { it: Item; className: string; onClick?: () => void; children?: ReactNode }) {
  if (it.page) return <a href={it.to} className={className} onClick={onClick}>{children ?? it.label}</a>;
  return it.external ? (
    <a href={it.to} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{children ?? it.label}</a>
  ) : (
    <Link to={it.to} className={className} onClick={onClick}>{children ?? it.label}</Link>
  );
}

const TOP = 'text-sm font-medium text-text-primary no-underline transition hover:text-primary';
const PANEL_SHOW = 'invisible opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100';

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="mt-px transition group-focus-within:rotate-180 group-hover:rotate-180">
      <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** A full-width panel under the header (the item spans the header's height, so the pointer never leaves it on the way down). */
function Mega({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group flex h-full items-center" data-mega={label}>
      <button type="button" className={`${TOP} flex cursor-default items-center gap-1 bg-transparent p-0`} aria-haspopup="true">
        {label}
        <Chevron />
      </button>
      <div className={`absolute inset-x-0 top-full z-50 ${PANEL_SHOW}`}>
        <div className="border-y border-border-primary bg-background-primary shadow-[0_28px_56px_rgba(38,29,22,0.12)]">
          <div className="mx-auto max-w-[1440px] px-[100px] py-9">{children}</div>
        </div>
      </div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div className="grid grid-cols-[250px_minmax(0,1fr)] gap-12">
      <div>
        <p className="m-0 text-xs font-medium tracking-[0.14em] text-primary uppercase">Industries</p>
        <p className="m-0 mt-3 font-serif text-[22px]/[1.25] text-text-primary-extended">Built for the businesses Singapore actually runs.</p>
        <p className="m-0 mt-3 text-sm/[1.6] text-text-secondary">What businesses in your trade commonly hold, and why.</p>
      </div>
      <ul className="m-0 grid list-none grid-cols-4 gap-x-5 gap-y-6 p-0">
        {TRADES.map((t) => (
          <li key={t.id}>
            <Link to={t.href} className="group/card block no-underline" data-mega-trade={t.id}>
              <img src={`${IMG}/pg-card-${t.card}.jpg`} alt="" loading="lazy" decoding="async" className="block aspect-16/10 w-full rounded-lg object-cover transition group-hover/card:opacity-90" />
              <span className="mt-2.5 block font-serif text-[16px]/[1.3] text-text-primary-extended">{t.title}</span>
              <span className="mt-1 block text-[13px] font-medium text-primary">{t.cta ?? 'Read the checklist'}&nbsp;&rarr;</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GuidesPanel() {
  const col = 'm-0 mb-3 text-xs font-medium tracking-[0.14em] text-text-secondary uppercase';
  const row = 'flex items-baseline justify-between gap-3 rounded-md px-2 py-1.5 -mx-2 text-[14px]/[1.35] text-text-primary no-underline hover:bg-section-alt';
  return (
    <div className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))_180px] gap-9">
      <div>
        <p className="m-0 text-xs font-medium tracking-[0.14em] text-primary uppercase">Guides</p>
        <p className="m-0 mt-3 font-serif text-[22px]/[1.25] text-text-primary-extended">Know what your business is required to carry, and who requires it.</p>
        <Link to="/blog" className="mt-4 inline-block text-sm font-medium text-text-primary underline decoration-hairline-strong underline-offset-4">All guides&nbsp;&rarr;</Link>
      </div>
      {GUIDE_AXES.map((g) => (
        <div key={g.axis} data-mega-axis={g.axis}>
          <p className={col}>{g.title}</p>
          {topOf(g.axis, 8).map((v) => (
            <Link key={v.to} to={v.to} className={row}>
              <span className="min-w-0">{v.label}</span>
              <span className="shrink-0 text-xs text-text-secondary tabular-nums">{v.count}</span>
            </Link>
          ))}
          <Link to="/blog" className="mt-2 inline-block text-[13px] font-medium text-primary no-underline">{g.all}&nbsp;&rarr;</Link>
        </div>
      ))}
      <div className="border-l border-border-primary pl-8">
        <p className={col}>More from Covarage</p>
        {GUIDES_MORE.map((it) => <ItemLink key={it.to} it={it} className="block py-1.5 text-[14px] text-text-primary no-underline hover:text-primary" />)}
      </div>
    </div>
  );
}

/* `shell`: the header as pre-rendered once for the pages served as their own files (src/pages/SiteShell.tsx, read by
   scripts/inject-shell.mjs): the phone menu is drawn into the page closed (`hidden`) so a few lines of script can open it without React. */
export default function LanderHeader({ shell = false }: { shell?: boolean }) {
  const onLander = useLocation().pathname === '/';
  const [open, setOpen] = useState(false);
  const request = onLander ? REQUEST_ANCHOR : `/${REQUEST_ANCHOR}`;
  const close = () => setOpen(false);
  const menu = (
    <nav id="site-menu" hidden={shell && !open} className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-border-primary bg-background-primary px-5 pt-2 pb-8 sm:px-8 lg:hidden" aria-label="Menu">
      <a href="/#how" className="block border-b border-border-primary py-3.5 text-[15px] font-medium text-text-primary no-underline" onClick={close}>How it works</a>
      <div className="border-b border-border-primary py-3.5">
        <p className="m-0 mb-1.5 text-xs font-medium tracking-[0.12em] text-text-secondary uppercase">Solutions</p>
        {SOLUTIONS.map((s) => (
          <Link key={s.label} to={s.to} className="block py-1.5 no-underline" onClick={close}>
            <span className="block text-[15px] text-text-primary">{s.label}</span>
            <span className="block text-[13px] text-text-secondary">{s.line}</span>
          </Link>
        ))}
      </div>
      <Link to="/pricing" className="block border-b border-border-primary py-3.5 text-[15px] font-medium text-text-primary no-underline" onClick={close}>Pricing</Link>
      <div className="border-b border-border-primary py-3.5">
        <p className="m-0 mb-2.5 text-xs font-medium tracking-[0.12em] text-text-secondary uppercase">Industries</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          {TRADES.map((t) => (
            <Link key={t.id} to={t.href} className="flex items-center gap-2.5 text-[14px]/[1.3] text-text-primary no-underline" onClick={close}>
              <img src={`${IMG}/pg-card-${t.card}.jpg`} alt="" loading="lazy" className="block size-11 shrink-0 rounded-md object-cover" />
              <span className="min-w-0">{t.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="border-b border-border-primary py-3.5">
        <p className="m-0 mb-1 text-xs font-medium tracking-[0.12em] text-text-secondary uppercase">Guides</p>
        {GUIDE_AXES.map((g) => (
          <details key={g.axis} className="group/d border-b border-border-primary last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 text-[15px] text-text-primary">
              {g.title}
              <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden className="transition group-open/d:rotate-180"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </summary>
            <div className="pb-2.5 pl-3">
              {topOf(g.axis, 6).map((v) => (
                <Link key={v.to} to={v.to} className="flex justify-between gap-3 py-1.5 text-[14px] text-text-primary no-underline" onClick={close}>
                  <span>{v.label}</span><span className="text-xs text-text-secondary">{v.count}</span>
                </Link>
              ))}
            </div>
          </details>
        ))}
        {GUIDES_MORE.map((it) => <ItemLink key={it.to} it={it} className="block py-1.5 text-[15px] text-text-primary no-underline" onClick={close} />)}
        <Link to="/blog" className="mt-1 block py-1.5 text-[15px] font-medium text-text-primary no-underline" onClick={close}>All guides&nbsp;&rarr;</Link>
      </div>
      <div className="py-3.5">
        <p className="m-0 mb-1.5 text-xs font-medium tracking-[0.12em] text-text-secondary uppercase">Company</p>
        {COMPANY.map((it) => <ItemLink key={it.label} it={it} className="block py-1.5 text-[15px] text-text-primary no-underline" onClick={close} />)}
      </div>
      <a href={LOGIN_URL} className="mt-2 block text-[15px] font-medium text-text-primary no-underline">Log in</a>
    </nav>
  );
  const head = (
    <header className="sticky top-0 z-40 border-b border-border-primary bg-background-primary/95 backdrop-blur-sm" data-header-v14>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[72px] lg:px-[100px]">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Covarage home">
          <img src="/assets/brand/covarage-lockup-black.svg" alt="Covarage" width={220} height={40} className="block h-6 w-auto lg:h-7" />
        </Link>
        <nav className="hidden h-full flex-1 items-center gap-8 lg:flex" aria-label="Primary">
          <a href="/#how" className={TOP}>How it works</a>
          {/* the menu by company size (CMO step-up copy v0.2 (c)): Stripe's, Xero's and Ramp's word for it */}
          <div className="group relative flex h-full items-center" data-solutions>
            <button type="button" className={`${TOP} flex cursor-default items-center gap-1 bg-transparent p-0`} aria-haspopup="true">
              Solutions
              <Chevron />
            </button>
            <div className={`absolute top-full left-[-16px] z-50 ${PANEL_SHOW}`}>
              <div className="w-[380px] rounded-xl border border-hairline-strong bg-white p-3 shadow-[0_18px_40px_rgba(38,29,22,0.12)]">
                <p className="m-0 px-3 pt-1 pb-2 text-xs font-medium tracking-[0.12em] text-text-secondary uppercase">By company size</p>
                {SOLUTIONS.map((s) => (
                  <Link key={s.label} to={s.to} className="block rounded-lg px-3 py-2.5 no-underline hover:bg-section-alt">
                    <span className="block font-serif text-[17px] text-text-primary-extended">{s.label}</span>
                    <span className="mt-0.5 block text-[13px]/[1.45] text-text-secondary">{s.line}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/pricing" className={TOP}>Pricing</Link>
          <Mega label="Industries"><IndustriesPanel /></Mega>
          <Mega label="Guides"><GuidesPanel /></Mega>
          <div className="group relative flex h-full items-center">
            <button type="button" className={`${TOP} flex cursor-default items-center gap-1 bg-transparent p-0`} aria-haspopup="true">
              Company
              <Chevron />
            </button>
            <div className={`absolute top-full left-[-16px] z-50 ${PANEL_SHOW}`}>
              <ul className="m-0 min-w-[220px] list-none rounded-xl border border-hairline-strong bg-white p-2 shadow-[0_18px_40px_rgba(38,29,22,0.12)]">
                {COMPANY.map((it) => (
                  <li key={it.label}><ItemLink it={it} className="block rounded-lg px-3 py-2 text-sm text-text-primary no-underline hover:bg-section-alt" /></li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-3 lg:gap-6">
          <a href={LOGIN_URL} className={`${TOP} hidden sm:inline`} data-login>Log in</a>
          <a
            href={request}
            onClick={onLander ? requestClick : undefined}
            className="rounded-md bg-primary-extended px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-white no-underline transition hover:opacity-90 lg:px-4 lg:text-sm"
          >
            Request a call
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md border border-hairline-strong bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              {open ? <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.6" /> : <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" />}
            </svg>
          </button>
        </div>
      </div>
      {open && !shell && menu}
    </header>
  );
  // In the shell the phone menu sits just after the header, closed: the header's own links stay exactly the homepage's
  return shell ? <>{head}{menu}</> : head;
}
