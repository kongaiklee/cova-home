import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { ARTICLES, articleUrl } from '../../content/articles';
import { CATEGORY_INTROS, CATEGORY_LABELS } from '../../content/intents';

/**
 * A category hub: one prerendered page per category listing EVERY article in it as a plain
 * `<a href>`.
 *
 * This exists to be crawled, and that constrains how it is built (CMO's indexing plan, s2.1):
 * we publish 525 guides and the blog index exposes 12 of them in prerendered HTML, because its
 * filtering and paging are client-side. A crawler sees none of that. So this page has NO
 * filtering, NO paging and NO client state - the full list is in the served source or the page
 * has failed at its only job. Every article becomes one hop from a hub and each hub one hop from
 * the homepage.
 *
 * The intro copy LANDED 2026-08-30 (CMO's desk draft, eleven lines) and lives in
 * CATEGORY_INTROS. It is rendered ABOVE the count line rather than replacing it: the sourcing
 * sentence is a standing claim carried on other surfaces too, so this pass ADDS the desk line
 * and removes nothing. A hub with no intro still renders correctly - the paragraph elides.
 */
export default function CategoryHub({ category }: { category: string }) {
  const label = CATEGORY_LABELS[category] ?? category;
  const intro = CATEGORY_INTROS[category];
  // Newest first, matching the index's own order. The manifest is pre-sorted.
  const articles = ARTICLES.filter((a) => a.category === category);

  return (
    <>
      <Seo
        title={`${label} - Insurance Guides for Singapore Businesses | Covarage`}
        description={`Every Covarage guide on ${label.toLowerCase()} for Singapore businesses - ${articles.length} sourced articles, each linked to the primary regulator, statute or insurer document.`}
        path={`/guides/${category}`}
      />
      <div className="mx-auto w-full max-w-[1240px] px-7 py-12 lg:px-[100px] lg:py-16">
        <nav className="mb-5 text-sm text-text-secondary" aria-label="Breadcrumb">
          <Link to="/blog" className="border-b border-[#c2d4e2] pb-px text-primary">
            All guides
          </Link>
          <span className="mx-2">/</span>
          <span>{label}</span>
        </nav>

        <h1 className="m-0 mb-3 max-w-[22ch] font-serif text-[32px]/[1.1] tracking-[-1px] text-text-primary lg:text-[44px]/[1.08] lg:tracking-[-1.4px]">
          {label}
        </h1>
        {intro && (
          <p className="m-0 mb-3 max-w-[60ch] text-base/[1.6] text-text-primary lg:text-[17px]">{intro}</p>
        )}
        <p className="m-0 mb-9 max-w-[60ch] text-base/[1.6] text-text-secondary lg:mb-12 lg:text-[17px]">
          {articles.length} guides. Every fact links to a primary regulator, statute or named
          insurer document.
        </p>

        <ul className="m-0 grid list-none gap-0 p-0" data-category-articles>
          {articles.map((a) => (
            <li key={a.slug} className="border-t border-border-primary last:border-b">
              <Link to={articleUrl(a.slug)} className="block py-5 lg:py-6">
                <span className="block max-w-[70ch] font-serif text-[19px]/[1.3] tracking-[-0.4px] text-text-primary lg:text-[22px]">
                  {a.title}
                </span>
                <span className="mt-1.5 block max-w-[80ch] text-sm/[1.6] text-text-secondary lg:text-[15px]">
                  {a.meta_description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** The categories that actually carry articles - the hub set, derived rather than hardcoded. */
export const HUB_CATEGORIES: string[] = [...new Set(ARTICLES.map((a) => a.category))].sort();
