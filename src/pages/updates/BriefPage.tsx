import { Link } from 'react-router-dom';
import Seo, { SITE_URL } from '../../components/Seo';
import { articleUrl } from '../../content/articles';
import ArticleEnquiry from '../blog/ArticleEnquiry';
import { CTA_BY_INTENT, type ResolvedCta } from '../../content/articleCtas';
import type { BriefItem } from './topics';
import { COPY, briefPath, formatDate, guideForBrief } from './topics';

/**
 * A BRIEF page - one page per emerging-risk item the screen assessed and CMO wrote a brief for
 * (P2; CD's `DIRECTION_emerging-risk-surfaces.md` s2, ruled once, 2026-09-11).
 *
 * The shape in one sentence: a guide's page dress cut to a brief's length, with the source and the
 * matching guide as its two cards. Nothing new is drawn - every element here already exists on the
 * guides or the update pages, composed.
 *
 * WHY THE URL CARRIES THE TOPIC (`/updates/cyber/<slug>`): CD's one rule on the route, because the
 * breadcrumb is built from it. The list pages are the indexes of these pages and `topic` decides
 * which index a brief appears in, exactly as it decides which list an item renders on.
 *
 * WHAT A BRIEF IS NOT: it is not a guide. It carries no cover, no price, no insurer and no
 * recommendation - the introducer boundary is held by the lane's G1 gate in the copy and by this
 * page's shape, which has nowhere to put one.
 */
export default function BriefPage({ item }: { item: BriefItem }) {
  const copy = COPY[item.topic];
  const brief = item.brief;
  const guide = guideForBrief(item);
  const path = briefPath(item);
  /*
   * The end-of-article door, once, after the cards. A 250-word page has no middle, so no mid slot.
   * `beyond-the-basics` is the emerging-risk intent's own CTA, so a brief's door reads exactly as
   * the guides in the same category do. `trade` is empty because a brief is about an EVENT, not an
   * industry, and a prefilled trade the reader never chose is a guess.
   */
  const cta: ResolvedCta = {
    ...CTA_BY_INTENT['beyond-the-basics'],
    questionPrefill: `About: ${brief.h1}`,
    trade: '',
  };

  return (
    <>
      <Seo
        title={`${brief.h1} | Covarage`}
        description={brief.text.slice(0, 155).trim()}
        path={path}
        type="article"
        publishedTime={item.date}
        modifiedTime={brief.gated_at.slice(0, 10)}
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: brief.h1,
              description: brief.text.slice(0, 155).trim(),
              datePublished: item.date,
              dateModified: brief.gated_at.slice(0, 10),
              author: { '@type': 'Organization', name: 'Covarage', url: SITE_URL },
              publisher: {
                '@type': 'Organization',
                name: 'Covarage',
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/logo.png` },
              },
              mainEntityOfPage: `${SITE_URL}${path}`,
              isBasedOn: item.url,
              copyrightHolder: { '@type': 'Organization', name: 'Covarage Pte. Ltd.' },
              license: `${SITE_URL}/llms.txt#usage`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Updates', item: `${SITE_URL}/updates` },
                { '@type': 'ListItem', position: 2, name: copy.h1, item: `${SITE_URL}${copy.path}` },
                { '@type': 'ListItem', position: 3, name: brief.h1, item: `${SITE_URL}${path}` },
              ],
            },
          ],
        }}
      />

      <article className="mx-auto w-full max-w-3xl px-6 pt-10 pb-16 sm:px-8">
        {/* The guides breadcrumb component, built from the route - CD's reason for the topic in the URL. */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-text-secondary" aria-label="Breadcrumb">
          <Link to="/updates" className="hover:text-primary">Updates</Link>
          <span aria-hidden>/</span>
          <Link to={copy.path} className="hover:text-primary">{copy.h1}</Link>
        </nav>

        {/* The two-chip topic row, same place and vocabulary as the list pages, so a reader can step sideways. */}
        <nav className="mt-4 flex flex-wrap gap-2" aria-label="Update topics" data-topic-chips>
          {(Object.keys(COPY) as (keyof typeof COPY)[]).map((t) => (
            <Link
              key={t}
              to={COPY[t].path}
              aria-current={t === item.topic ? 'page' : undefined}
              className={
                t === item.topic
                  ? 'rounded-full bg-primary px-3.5 py-[7px] text-[13px] font-medium text-white'
                  : 'rounded-full bg-pill px-3.5 py-[7px] text-[13px] text-text-primary transition hover:text-primary-extended'
              }
            >
              {COPY[t].chip}
            </Link>
          ))}
        </nav>

        {/* The event date, not the publish date - the event is what the page is about. */}
        <p className="mt-6 mb-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase" data-brief-eyebrow>
          {item.source} &middot; {formatDate(item.date)}
        </p>

        <h1 className="mt-3 font-serif text-3xl/tight text-text-primary sm:text-4xl/tight lg:text-[2.75rem]/tight tracking-[-1px] lg:tracking-[-1.4px]">
          {brief.h1}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
          <span>Covarage</span>
          <span aria-hidden>&middot;</span>
          <span>Published {formatDate(item.date)}</span>
          <span aria-hidden>&middot;</span>
          <span>Reviewed {formatDate(brief.gated_at.slice(0, 10))}</span>
        </div>

        {/* The guides' article measure and type. The brief is 200-300 words, plain paragraphs. */}
        <div className="article-body mt-9" data-brief-body>
          {brief.text.split(/\n{2,}/).map((para, i) => {
            const head = para.trim();
            // The one optional H2 the brief may carry, written as its own paragraph by the assess step.
            if (head === 'What this means for a Singapore SME') {
              return (
                <h2 key={i} className="mt-8 mb-3 font-serif text-2xl text-text-primary">
                  {head}
                </h2>
              );
            }
            return (
              <p key={i} className="mb-4 text-[17px]/[1.6] text-text-primary">
                {head}
              </p>
            );
          })}
        </div>

        {/* Card one: the source. The headline is the publisher's own, verbatim - quotation, never ours. */}
        <div className="mt-12 rounded-xl border border-border-primary bg-white px-[22px] py-5" data-brief-source>
          <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">Source</p>
          <p className="m-0 mt-2 text-[15px] font-semibold text-text-primary">{item.source}</p>
          <p className="m-0 mt-1 text-[15px]/[1.5] text-text-secondary">{item.title}</p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block py-1 text-sm font-medium text-primary"
          >
            <span className="border-b border-[#c2d4e2] pb-px">Read the source</span>
          </a>
        </div>

        {/* Card two: the matching guide, by CMO's topic-to-guide map. No match, no card - never a generic link. */}
        {guide && (
          <div className="mt-6 rounded-xl border border-border-primary bg-white px-[22px] py-5" data-brief-guide>
            <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">The guide</p>
            <Link to={articleUrl(guide.slug)} className="mt-2 block font-serif text-[19px]/[1.3] text-text-primary hover:text-primary-extended">
              {guide.title}
            </Link>
            <p className="m-0 mt-1.5 text-sm/[1.6] text-text-secondary">{guide.meta_description}</p>
          </div>
        )}

        <div className="mt-12">
          <ArticleEnquiry cta={cta} page={path} placement="end" />
        </div>
      </article>
    </>
  );
}
