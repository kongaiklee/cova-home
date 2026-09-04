import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Seo from '../../components/Seo';
import { CORPUS_UPDATED, REVIEWED, REVIEWED_LABEL, UPDATES, formatDate } from '../../content/updates';

/**
 * /updates - the weekly screen's output surface (M2, newsfeed v1; Kong: "we become the single
 * newsfeed for all official compliance matters for our users"). Headlines render VERBATIM with
 * source attribution and a plain outbound link - quotation, never COVA speech; no commentary
 * in v1. The review line's date moves only when a screen ran; before the first screen the page
 * carries only the corpus-updated line, derived from the committed article index.
 */

/** The screening list, named for the reader (CMO_NEWSFEED_whitelist.md; CNA + IBA per Kong's ruling). */
const SCREENED = ['MOM', 'PDPC', 'IRAS', 'MAS', 'ACRA', 'CPF Board', 'GIA', 'LIA', 'WSH Council', 'CNA Business', 'Insurance Business Asia'];

/**
 * Kong 2026-09-04: "lets show up to 15 at a time, and then pageination the rest".
 *
 * Nothing is dropped by paging - the file is a permanent union now (tm/tools/publish_updates.mjs)
 * and every item stays reachable. Paging is a READING decision, not a retention one.
 * Same shape as the guides index rather than a second pattern: a count line, Previous / Next, and
 * the page position between them.
 */
const PER_PAGE = 15;

export default function UpdatesPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(UPDATES.length / PER_PAGE));
  const paged = UPDATES.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function goToPage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Seo
        title="Covarage Updates: Official Compliance News for Singapore SMEs"
        description="Announcements from Singapore's regulators and industry bodies that matter to business cover, each linked to its official source, with the date we last reviewed stated."
        path="/updates"
      />

      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-10 text-center sm:px-10 lg:px-16 lg:pt-20">
        <h1 className="font-serif text-4xl text-text-primary sm:text-5xl lg:text-6xl">Updates</h1>
        <p className="mx-auto mt-4 max-w-xl text-base/relaxed text-text-secondary">
          Official announcements that matter to business cover in Singapore. Headlines appear as
          published, linked to the source.
        </p>
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
        {UPDATES.length > 0 ? (
          <div>
            {totalPages > 1 && (
              <p className="m-0 mb-4 text-sm text-text-secondary" data-updates-count>
                {UPDATES.length} updates &middot; page {page} of {totalPages}
              </p>
            )}
            {paged.map((u) => (
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
            ))}

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
          * The pending disclosure lives HERE now, not in the hero. It was added at G15 so a
          * whitelist source a screen did not reach is NAMED rather than quietly dropped, and that
          * rule is unchanged - only its position moved, to sit beside the source list it qualifies.
          * Marking the subset in place says more than a sentence did: the reader sees which of the
          * eleven were not reached, rather than being told a count.
          */}
        <div className="mt-14 border-t border-border-primary pt-6">
          <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">What we screen</p>
          <p className="m-0 mt-2 text-sm/relaxed text-text-secondary" data-screened>
            {SCREENED.map((name, i) => {
              const notReached = REVIEWED?.pending?.includes(name) ?? false;
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
          {REVIEWED?.pending?.length ? (
            <p className="m-0 mt-2 text-[13px]/relaxed text-text-secondary/70" data-screened-pending>
              * not reached by the last review; checked by hand.
            </p>
          ) : null}
        </div>
        <div className="mt-8 border-t border-border-primary pt-6">
          <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">Follow along</p>
          <p className="m-0 mt-2 text-sm/relaxed text-text-secondary">
            Subscribe by RSS: add{' '}
            <a href="/feed.xml" className="font-medium text-primary hover:underline">covarage.com/feed.xml</a>{' '}
            to any feed reader to get our newest guides as they publish.
          </p>
        </div>
      </section>
    </>
  );
}
