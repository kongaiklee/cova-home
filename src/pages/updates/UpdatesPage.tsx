import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Seo from '../../components/Seo';
import type { Topic } from '../../content/updates';
import { CORPUS_UPDATED, REVIEWED, REVIEWED_LABEL, formatDate, screenedFor, updatesFor } from '../../content/updates';
import { COPY, briefFor, briefPath } from './topics';

/**
 * /updates and /updates/cyber - the weekly screen's output surface (M2, newsfeed v1; Kong: "we
 * become the single newsfeed for all official compliance matters for our users"). Headlines render
 * VERBATIM with source attribution and a plain outbound link - quotation, never COVA speech; no
 * commentary in v1. The review line's date moves only when a screen ran; before the first screen
 * the page carries only the corpus-updated line, derived from the committed article index.
 *
 * 2026-09-11: ONE component, TWO routes (Kong ~20:1x in the CMO window, via the hub; spec s4 + s8
 * of CMO_RESEARCH_cyber-digital-risk-sources_2026-09-11). `topic` decides which items a page
 * renders, which names its `What we screen` line prints, and its copy. Both pages read the one
 * updates.json; an item without a topic is general, so nothing ever published moved.
 */

/**
 * Kong 2026-09-04: "lets show up to 15 at a time, and then pageination the rest".
 *
 * Nothing is dropped by paging - the file is a permanent union now (tm/tools/publish_updates.mjs)
 * and every item stays reachable. Paging is a READING decision, not a retention one.
 * Same shape as the guides index rather than a second pattern: a count line, Previous / Next, and
 * the page position between them.
 */
const PER_PAGE = 15;

export default function UpdatesPage({ topic }: { topic: Topic }) {
  const copy = COPY[topic];
  const items = updatesFor(topic);
  const screened = screenedFor(topic);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const paged = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function goToPage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Seo title={copy.seoTitle} description={copy.seoDescription} path={copy.path} />

      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-10 text-center sm:px-10 lg:px-16 lg:pt-20">
        <h1 className="font-serif text-4xl tracking-[-1px] text-text-primary sm:text-5xl lg:text-6xl lg:tracking-[-2px]">{copy.h1}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base/relaxed text-text-secondary">{copy.lede}</p>
        {/* CD s0j direction 1 (2026-09-11): the two pages see each other. Two chips in the guides
            index's chip vocabulary, the current one filled, so a phone reader who lands on one list
            from a share can step sideways to the other. One component, two states, no new copy. */}
        <nav className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Update topics" data-topic-chips>
          {(Object.keys(COPY) as Topic[]).map((t) => (
            <Link
              key={t}
              to={COPY[t].path}
              aria-current={t === topic ? 'page' : undefined}
              className={clsx(
                'rounded-full px-3.5 py-[7px] text-[13px] transition',
                t === topic ? 'bg-primary font-medium text-white' : 'bg-pill text-text-primary hover:text-primary-extended'
              )}
            >
              {COPY[t].chip}
            </Link>
          ))}
        </nav>
        {REVIEWED && (
          /*
           * A bare date. The <time> element is not decoration: it makes the freshness signal a
           * PARSE rather than a regex for anything watching this page, which is what the internal
           * dashboard needs (CMO_UPDATES_LINE_AND_FRESHNESS.md s3).
           */
          <p className="mx-auto mt-6 max-w-xl text-sm font-medium text-primary" data-reviewed-line>
            {REVIEWED_LABEL}{' '}
            <time dateTime={REVIEWED.date}>{formatDate(REVIEWED.date)}</time>
          </p>
        )}
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-24 sm:px-10">
        {items.length > 0 ? (
          <div>
            {totalPages > 1 && (
              <p className="m-0 mb-4 text-sm text-text-secondary" data-updates-count>
                {items.length} updates &middot; page {page} of {totalPages}
              </p>
            )}
            {paged.map((u) => {
              /*
               * CD s2, the index card change: where the item has a BRIEF, the title links our page
               * and a 13px `source` link stays for the reader who wants the primary page directly.
               * Where it has none - every item until CMO's assess step writes briefs - the card is
               * exactly what it was, the whole row linking the source. One treatment for press and
               * regulator items either way, as s0j ruled.
               */
              const brief = briefFor(u);
              if (!brief) {
                return (
                  <a
                    key={u.url}
                    href={u.url}
                    className="block border-b border-border-primary py-5 transition hover:bg-white"
                  >
                    <p className="m-0 mb-1.5 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">
                      {u.source} · {formatDate(u.date)}
                    </p>
                    <p className="m-0 text-[17px]/[1.45] font-medium text-text-primary">{u.title}</p>
                  </a>
                );
              }
              return (
                <div key={u.url} className="border-b border-border-primary py-5" data-has-brief>
                  <p className="m-0 mb-1.5 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">
                    {u.source} · {formatDate(u.date)}
                  </p>
                  <Link to={briefPath(brief)} className="m-0 block text-[17px]/[1.45] font-medium text-text-primary hover:text-primary-extended">
                    {brief.brief.h1}
                  </Link>
                  <a
                    href={u.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-[13px] text-text-secondary hover:text-primary-extended"
                  >
                    source
                  </a>
                </div>
              );
            })}

            {/* Same control as the guides index - one paging vocabulary on the site, not two. */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="inline-flex items-center gap-1 rounded-full border border-border-primary px-4 py-2 text-sm font-medium text-text-primary transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>
                <span className="text-sm text-text-secondary">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="inline-flex items-center gap-1 rounded-full border border-border-primary px-4 py-2 text-sm font-medium text-text-primary transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="border-t border-border-primary pt-8 text-center" data-updates-empty>
            <p className="m-0 text-base/relaxed text-text-secondary">
              {CORPUS_UPDATED
                ? `Our guides corpus was last updated on ${formatDate(CORPUS_UPDATED)}.`
                : 'Our guides corpus carries the current state.'}
            </p>
            <a href="/blog" className="mt-3 inline-block text-[15px] font-medium text-primary hover:underline">
              Browse the guides
            </a>
          </div>
        )}

        {/*
          * The pending disclosure lives HERE, beside the source list it qualifies. A source the
          * screen did not reach is NAMED rather than quietly dropped (G15 rule, unchanged). The
          * names come from the reviewed block, per topic, so a source added to the screen appears
          * here without a code change.
          */}
        {screened.sources.length > 0 && (
          <div className="mt-14 border-t border-border-primary pt-6">
            <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">What we screen</p>
            <p className="m-0 mt-2 text-sm/relaxed text-text-secondary" data-screened>
              {screened.sources.map((name, i) => {
                const notReached = screened.pending.includes(name);
                return (
                  <span key={name}>
                    {i > 0 && ' · '}
                    <span className={notReached ? 'text-text-secondary/60' : undefined}>
                      {name}
                      {notReached && '*'}
                    </span>
                  </span>
                );
              })}
            </p>
            {screened.pending.length ? (
              <p className="m-0 mt-2 text-[13px]/relaxed text-text-secondary/70" data-screened-pending>
                * not reached by the last review; checked by hand.
              </p>
            ) : null}
          </div>
        )}
        <div className="mt-8 border-t border-border-primary pt-6">
          <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">Follow along</p>
          <p className="m-0 mt-2 text-sm/relaxed text-text-secondary">
            Subscribe by RSS: add{' '}
            <a href={copy.feed} className="font-medium text-primary hover:underline">covarage.com{copy.feed}</a>{' '}
            to any feed reader to get every item on this page as it publishes. Our guides have their own feed at{' '}
            <a href="/feed.xml" className="font-medium text-primary hover:underline">covarage.com/feed.xml</a>.
          </p>
        </div>
      </section>
    </>
  );
}
