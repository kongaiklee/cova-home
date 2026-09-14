import { Link } from 'react-router-dom';
import Seo, { SITE_URL } from '../../components/Seo';
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
/**
 * The hub meta descriptions - CMO's hub description table of 2026-09-11, v1.1,
 * rows 3-13 verbatim (desk S2: PASS; Kong's list item 0f CLOSED 2026-09-14 02:0x, TM applies).
 * Written FROM each hub's own contents. A category with no row falls back to the template.
 */
const HUB_DESCRIPTIONS: Record<string, string> = {
  association: "Which trade bodies and statutory boards ask for cover: BCA's CRS workheads, ISCA, IES, SIA, the hotel and spa associations, and what each membership expects.",
  comparison: 'Side by side decisions Singapore SMEs face: marine cargo clauses A, B and C, first loss vs full value, PI vs public liability, surety vs performance bonds.',
  crisis: 'The first day of a bad week, step by step: a vendor data breach, an MAS findings letter, a PDPA access request, a ransomware demand, an IRAS audit.',
  'cross-border': 'Cover that follows a Singapore business abroad: ASEAN expansion, remote hires in Malaysia, expatriate staff, foreign subsidiaries, SaaS data residency.',
  'decision-tree': 'Checklists that turn a decision into the policies it needs: opening a restaurant or tuition centre, group health for a small team, sole prop vs Pte Ltd.',
  'document-legal': 'The complete guides to the covers Singapore SMEs sign for: professional indemnity, public liability, WICA, foreign worker insurance and construction.',
  'edge-case': 'Businesses the standard packages were not built for: TCM clinics, art conservators, drone operators, home-based firms and pre-owned luxury resellers.',
  'emerging-risk': "What AI does to a Singapore SME's cover: hiring bias as an EPL claim, a chatbot that misstates, a rogue agent, deepfake fraud and content that infringes.",
  licensing: 'Singapore licences that carry an insurance condition, and those that do not: BCA builders and CW01 contractors, SCDF fire safety, SFA food, AVS animal, TCM.',
  'procedural-howto': 'How to do the insurance admin itself: verify a broker on the MAS register, file a MOM incident, obtain event liability cover, claim GST on premiums.',
  'regulatory-change': "Every change and what it does to your cover: BCA's CRS evolution, the PDPA three-day breach clock, MAS notices FAA-N02, N16 and N20, SCDF's 36-month cycle.",
};

export default function CategoryHub({ category }: { category: string }) {
  const label = CATEGORY_LABELS[category] ?? category;
  const intro = CATEGORY_INTROS[category];
  // Newest first, matching the index's own order. The manifest is pre-sorted.
  const articles = ARTICLES.filter((a) => a.category === category);

  return (
    <>
      {/* CMO's machine-readability spec s2 (Kong 2026-09-12 02:54): the hub's first JSON-LD - two
          crumbs, Guides then this category, both links a reader can click on the page. */}
      <Seo
        title={`${label} - Insurance Guides for Singapore Businesses | Covarage`}
        description={HUB_DESCRIPTIONS[category] ?? `Every Covarage guide on ${label.toLowerCase()} for Singapore businesses - ${articles.length} sourced articles, each linked to the primary regulator, statute or insurer document.`}
        path={`/guides/${category}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Guides', item: `${SITE_URL}/blog` },
            { '@type': 'ListItem', position: 2, name: label, item: `${SITE_URL}/guides/${category}` },
          ],
        }}
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
        {/* CMO s1 item 1 (CMO_POSITION_updates-on-site-and-lander_2026-09-11): the reader already
            thinking about emerging risk is told where the live alert list is - the guides index's
            strip pattern, reused, on this hub only. Contextual placement, never a global strip. */}
        {category === 'emerging-risk' && (
          <Link
            to="/updates/cyber"
            data-cyber-strip
            className="mb-9 block rounded-lg border border-border-primary bg-white px-4 py-3 text-sm text-text-secondary transition hover:border-primary lg:mb-12"
          >
            <span className="font-semibold text-text-primary">Cyber and digital risk</span> - alerts and advisories screened Monday and Thursday, linked to the source.
          </Link>
        )}

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
