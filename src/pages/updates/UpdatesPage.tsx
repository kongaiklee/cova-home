import Seo from '../../components/Seo';
import { CORPUS_UPDATED, REVIEWED, UPDATES, formatDate, reviewedLine } from '../../content/updates';

/**
 * /updates - the weekly screen's output surface (M2, newsfeed v1; Kong: "we become the single
 * newsfeed for all official compliance matters for our users"). Headlines render VERBATIM with
 * source attribution and a plain outbound link - quotation, never COVA speech; no commentary
 * in v1. The review line's date moves only when a screen ran; before the first screen the page
 * carries only the corpus-updated line, derived from the committed article index.
 */

/** The screening list, named for the reader (CMO_NEWSFEED_whitelist.md; CNA + IBA per Kong's ruling). */
const SCREENED = ['MOM', 'PDPC', 'IRAS', 'MAS', 'ACRA', 'CPF Board', 'GIA', 'LIA', 'WSH Council', 'CNA Business', 'Insurance Business Asia'];

export default function UpdatesPage() {
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
          <p className="mx-auto mt-6 max-w-xl text-sm font-medium text-primary" data-reviewed-line>
            {reviewedLine(REVIEWED)}
          </p>
        )}
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-24 sm:px-10">
        {UPDATES.length > 0 ? (
          <div>
            {UPDATES.map((u) => (
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

        <div className="mt-14 border-t border-border-primary pt-6">
          <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-text-secondary uppercase">What we screen</p>
          <p className="m-0 mt-2 text-sm/relaxed text-text-secondary">{SCREENED.join(' · ')}</p>
        </div>
      </section>
    </>
  );
}
