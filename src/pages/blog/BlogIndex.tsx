import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ARTICLES } from '../../content/articles';
import { INTENTS } from '../../content/intents';
import { AXES, EMPTY, type Axis, type Selection, axisValues, isEmpty, matches, readSelection, writeSelection } from '../../content/facets';
import FacetFilter from './FacetFilter';
import FacetRail from './FacetRail';
import { ArticleRow } from './ArticleCard';
import type { IntentFilterValue } from './IntentFilter';
import Seo from '../../components/Seo';

const PER_PAGE = 12;

/**
 * The blog index, redesigned per Kong's 2026-08-29 ruling ("wasting alot of prime real estate by
 * not having a side bar") and CD's DIRECTION_blog-sidebar.md + Blog.dc.html: left-aligned
 * tightened header, the sticky 250px rail at lg (industry / insurance types / ministries, single
 * value per group, combinable), the journey tabs surviving as a compact chip row, the status line
 * naming the active set. Phone keeps the existing collapsible panel - no phone redesign.
 */
export default function BlogIndex() {
  const [intent, setIntent] = useState<IntentFilterValue>('all');
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // Three-axis filter state lives in the URL (?industry, ?policy, ?agency, ?required=cover|duty) so
  // the landing page's chips and any shared link land on a filtered index. Read after mount,
  // not during render: the prerendered HTML is the unfiltered index, and reading the URL during
  // the first client render would make hydration disagree with it.
  const [selection, setSelection] = useState<Selection>(EMPTY);
  useEffect(() => {
    setSelection(readSelection(searchParams));
    setPage(1);
  }, [searchParams]);

  // Everything below filters within the selection, so the intent pill counts and
  // the total describe what the reader can actually see.
  const base = useMemo(() => ARTICLES.filter((a) => matches(a, selection)), [selection]);

  // Per-axis counts are taken with that axis's OWN selection removed, so a reader can widen
  // within an axis while the other axes still narrow (AND). The rail's All row carries the
  // same others-only total.
  const facetCounts = useMemo(() => {
    const out = {} as Record<Axis, Record<string, number>>;
    for (const { key } of AXES) {
      const others = { ...selection, [key]: [] } as Selection;
      out[key] = axisValues(key, ARTICLES.filter((a) => matches(a, others)));
    }
    return out;
  }, [selection]);
  const allCounts = useMemo(() => {
    const out = {} as Record<Axis, number>;
    for (const { key } of AXES) {
      const others = { ...selection, [key]: [] } as Selection;
      out[key] = ARTICLES.filter((a) => matches(a, others)).length;
    }
    return out;
  }, [selection]);
  const requiredCounts = useMemo(
    () => ({
      cover: ARTICLES.filter((a) => a.required_by_law === 'cover').length,
      duty: ARTICLES.filter((a) => a.required_by_law === 'duty').length,
    }),
    []
  );

  function update(next: Selection) {
    setSearchParams(writeSelection(searchParams, next), { replace: true });
  }
  function toggle(axis: Axis, label: string) {
    const cur = selection[axis];
    update({ ...selection, [axis]: cur.includes(label) ? cur.filter((v) => v !== label) : [...cur, label] });
  }
  /** Rail pick: one active value per group (null = the group's All reset). */
  function pick(axis: Axis, label: string | null) {
    update({ ...selection, [axis]: label ? [label] : [] });
  }

  const visible = useMemo(
    () => (intent === 'all' ? base : base.filter((a) => a.intent === intent)),
    [base, intent]
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const paged = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function changeIntent(next: IntentFilterValue) {
    setIntent(next);
    setPage(1);
  }

  function goToPage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // The status line names the active set: axis values, plus the required filter's honest label.
  const activeNames = [
    ...selection.industry,
    ...selection.policy,
    ...selection.agency,
    ...(selection.required ? [selection.required === 'cover' ? 'required by law' : 'the law also requires'] : []),
  ];

  const chips: { id: IntentFilterValue; label: string }[] = [
    { id: 'all', label: 'Everything' },
    ...INTENTS.map((i) => ({ id: i.id, label: i.label })),
  ];

  return (
    <>
      <Seo
        title="Covarage Blog: Insurance Guides for Singapore SMEs"
        description="Clear, sourced answers to the insurance questions Singapore business owners actually ask. No jargon, no sales pitch."
        path="/blog"
      />

      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-[100px]">
        {/* header - left-aligned over the grid, tightened (the centred header + chip wall spent ~200px) */}
        <header className="pt-10 pb-7 lg:pt-[52px] lg:pb-9">
          <h1 className="m-0 font-serif text-[32px] tracking-[-1px] text-text-primary lg:text-[40px] lg:tracking-[-1.2px]">
            Covarage Blog
          </h1>
          <p className="mt-2.5 max-w-[62ch] text-base/relaxed text-text-secondary">
            Clear, sourced answers to the insurance questions Singapore business
            owners actually ask. No jargon, no sales pitch, no recommendations.
          </p>
        </header>

        {/* phone keeps the existing collapsible panel - no phone redesign */}
        <div className="mb-4 lg:hidden">
          <FacetFilter
            selection={selection}
            counts={facetCounts}
            onToggle={toggle}
            onToggleRequired={(v) => update({ ...selection, required: selection.required === v ? null : v })}
            onClear={() => update(EMPTY)}
            requiredCounts={requiredCounts}
          />
        </div>

        {/* no items-start: the rail's grid cell must stretch to the row height or sticky has no travel */}
        <div className="pb-24 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14">
          <div className="hidden lg:block">
            <FacetRail selection={selection} counts={facetCounts} allCounts={allCounts} onPick={pick} />
          </div>

          <div>
            {/* the /updates strip - placement ruled by Kong (newsfeed M2) */}
            <Link
              to="/updates"
              data-updates-strip
              className="mb-5 block rounded-lg border border-border-primary bg-white px-4 py-3 text-sm text-text-secondary transition hover:border-primary"
            >
              <span className="font-semibold text-text-primary">Updates</span> - official announcements that matter to business cover, linked to the source.
            </Link>

            {/* journey tabs, compact - the second axis stays */}
            <div className="mb-5 flex flex-wrap gap-2" data-intent-chips>
              {chips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => changeIntent(c.id)}
                  aria-pressed={intent === c.id}
                  className={clsx(
                    'rounded-full px-3.5 py-[7px] text-[13px] transition',
                    intent === c.id ? 'bg-primary font-medium text-white' : 'bg-[#f4f2f0] text-text-primary hover:text-primary-extended'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex items-baseline justify-between gap-4 border-b border-border-primary pb-3">
              <p className="m-0 text-sm text-text-secondary" data-status-line>
                {visible.length} {visible.length === 1 ? 'guide' : 'guides'}
                {activeNames.length > 0 && (
                  <>
                    {' in '}
                    <span className="font-semibold text-primary-extended">{activeNames.join(' + ')}</span>
                  </>
                )}
                {totalPages > 1 && ` · page ${page} of ${totalPages}`}
              </p>
              {!isEmpty(selection) && (
                <button
                  type="button"
                  onClick={() => update(EMPTY)}
                  className="text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase transition hover:text-primary-extended"
                >
                  Clear filters
                </button>
              )}
            </div>

            {paged.length > 0 ? (
              <div>
                {paged.map((article) => (
                  <ArticleRow key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-text-secondary">
                Nothing here yet. Try another filter{!isEmpty(selection) ? ', or clear the filters' : ''}.
              </p>
            )}

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
        </div>
      </div>
    </>
  );
}
