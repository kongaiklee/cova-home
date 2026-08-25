import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { GUIDE_GROUPS } from './data';
import { H2, WRAP } from './Sections';

/**
 * 4C. The guides section. Desktop: a group rail and one open list; `Required by law` opens on
 * load. Phone: an accordion, one group open at a time. Every one of the thirty headlines is in
 * the markup; only one group is visible. No JS: the first group is open and every other rail
 * name is a plain link to its `More articles` target.
 */
export default function Guides() {
  const [open, setOpen] = useState(0);

  return (
    <section className="border-b border-border-primary bg-white">
      <div className={`${WRAP} py-[52px] lg:py-24`}>
        <h2 className={`${H2} mb-2.5 max-w-[24ch] text-[30px]/[1.12] tracking-[-1px] lg:mb-3.5 lg:text-[40px]/[1.1] lg:tracking-[-1.3px]`}>When it comes to compliance, ignorance is not bliss.</h2>
        <p className="m-0 text-base/[1.5] text-text-secondary lg:text-lg">Guides by the cover you have been asked for.</p>

        {/* desktop: rail + one list */}
        <div className="mt-13 hidden grid-cols-[300px_minmax(0,1fr)] items-start gap-16 lg:grid" data-guides-desktop>
          <div className="pl-5" role="tablist" aria-label="Guide groups">
            {GUIDE_GROUPS.map((g, k) => (
              <a
                key={g.name}
                href={g.moreHref}
                role="tab"
                aria-selected={k === open}
                onClick={(e) => { e.preventDefault(); setOpen(k); }}
                className={clsx('-ml-5 block cursor-pointer border-l-2 py-3 pl-[18px] font-serif text-xl tracking-[-0.4px] no-underline', k === open ? 'border-primary-extended text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary')}
              >
                {g.name}
              </a>
            ))}
          </div>
          <div>
            {GUIDE_GROUPS.map((g, k) => (
              <div key={g.name} className={k === open ? 'block' : 'hidden'} role="tabpanel">
                {g.items.map((it) => (
                  <Link key={it.href} to={it.href} className="block border-t border-border-primary py-[18px] font-serif text-[22px]/[1.3] tracking-[-0.5px] text-text-primary no-underline hover:text-primary">{it.title}</Link>
                ))}
                <div className="mt-[22px]">
                  <Link to={g.moreHref} className="inline-block border-b border-[#c2d4e2] pb-px text-[15px] font-medium text-primary">{g.more} &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* phone: accordion */}
        <div className="mt-7 lg:hidden" data-guides-phone>
          {GUIDE_GROUPS.map((g, k) => (
            <div key={g.name} className="border-t border-border-primary">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={k === open}
                onClick={() => setOpen(k === open ? -1 : k)}
              >
                <span className={clsx('font-serif text-xl tracking-[-0.4px]', k === open ? 'text-text-primary' : 'text-text-secondary')}>{g.name}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={clsx('transition-transform', k === open && 'rotate-180')}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div className={clsx('pb-[18px]', k === open ? 'block' : 'hidden')}>
                {g.items.map((it) => (
                  <Link key={it.href} to={it.href} className="block border-t border-border-primary py-3.5 font-serif text-[19px]/[1.3] tracking-[-0.4px] text-text-primary no-underline">{it.title}</Link>
                ))}
                <div className="mt-4">
                  <Link to={g.moreHref} className="inline-block border-b border-[#c2d4e2] pb-px text-sm font-medium text-primary">{g.more} &rarr;</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
