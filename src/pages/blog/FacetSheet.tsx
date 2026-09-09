import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { ARTICLES } from '../../content/articles';
import { INTENTS } from '../../content/intents';
import { EMPTY, agencyNameLong, matches, type Axis, type RequiredValue, type Selection } from '../../content/facets';
import { GROUPS, rowsFor } from './FacetRail';
import type { IntentFilterValue } from './IntentFilter';

/**
 * The phone filter panel (CD DIRECTION_blog-sidebar.md s6, BlogMobile.dc.html; Kong 2026-09-09:
 * "the blog/guides page on mobile with the radio buttons seem very unintuitive and hard to
 * navigate ... desktop is so clean").
 *
 * ONE VISIBLE AXIS - the reader's own trade - as a horizontally scrolling chip row in the desktop
 * rail's INDUSTRY order, All first and FILLED when nothing is picked. EVERYTHING ELSE behind one
 * `Filters` button with a live badge, opening a bottom sheet of REAL single-select groups: Journey,
 * then the rail's remaining groups in the rail's own order, then Legal basis. Each group is a
 * radiogroup of input[type=radio] sharing one name, `All` first and checked by default - the
 * browser itself refuses two checked options in a group, which is acceptance item 4.
 *
 * The sheet edits a DRAFT. `Show N guides` names the count the draft would produce before it is
 * applied; `Clear` resets the draft. Applying writes the URL state through the same `onApply` the
 * desktop rail's picks use, so a shared link lands on the same filtered index either way.
 *
 * Desktop (lg and up) never renders this - BlogIndex mounts it under `lg:hidden`. The row
 * vocabulary comes from FacetRail's own GROUPS and rowsFor, so the two surfaces cannot drift.
 */

interface FacetSheetProps {
  selection: Selection;
  intent: IntentFilterValue;
  /** Per-axis value counts with that axis's own selection removed (BlogIndex's facetCounts). */
  counts: Record<Axis, Record<string, number>>;
  allCounts: Record<Axis, number>;
  requiredCounts: Record<RequiredValue, number>;
  onApply: (next: Selection, intent: IntentFilterValue) => void;
}

const REQUIRED_ROWS: { value: RequiredValue; label: string }[] = [
  { value: 'cover', label: 'Required by law' },
  { value: 'duty', label: 'The law also requires' },
];

/** The sheet's group order: Journey, then the rail's groups minus the visible trade axis, then
 * Legal basis. Derived from the rail's GROUPS so acceptance item 6 (order == the rail) is a
 * property of the code, not a promise. */
const SHEET_AXES = GROUPS.filter((g) => g.axis !== 'industry');

function countFor(sel: Selection, intent: IntentFilterValue): number {
  const base = ARTICLES.filter((a) => matches(a, sel));
  return intent === 'all' ? base.length : base.filter((a) => a.intent === intent).length;
}

export default function FacetSheet({ selection, intent, counts, allCounts, requiredCounts, onApply }: FacetSheetProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Selection>(selection);
  const [draftIntent, setDraftIntent] = useState<IntentFilterValue>(intent);

  // Opening the sheet starts the draft from what is applied, never from a stale earlier draft.
  function openSheet() {
    setDraft(selection);
    setDraftIntent(intent);
    setOpen(true);
  }

  // Lock the page behind the sheet and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const trade = selection.industry[0];
  const tradeRows = rowsFor('industry', counts.industry, trade);

  // The badge counts groups that are NOT at their default - what the sheet would show as changed.
  const nonDefault =
    (intent === 'all' ? 0 : 1) +
    SHEET_AXES.filter(({ axis }) => selection[axis].length > 0).length +
    (selection.required ? 1 : 0);

  const draftCount = useMemo(() => countFor(draft, draftIntent), [draft, draftIntent]);

  function pickTrade(value: string | null) {
    onApply({ ...selection, industry: value ? [value] : [] }, intent);
  }
  function apply() {
    onApply(draft, draftIntent);
    setOpen(false);
  }
  function clearDraft() {
    setDraft({ ...EMPTY, industry: draft.industry });
    setDraftIntent('all');
  }

  const chip = 'shrink-0 rounded-full border px-3.5 py-[7px] text-[13px] whitespace-nowrap transition';
  const groupLabel = 'm-0 mb-1 text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase';

  return (
    <div data-facet-sheet>
      {/* ONE VISIBLE AXIS: the reader's trade. */}
      <p className={groupLabel}>Your trade</p>
      <div className="relative -mx-6 sm:-mx-10">
        <div className="flex gap-2 overflow-x-auto px-6 pb-1 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-trade-row>
          <button
            type="button"
            onClick={() => pickTrade(null)}
            aria-pressed={!trade}
            className={clsx(chip, !trade ? 'border-primary-extended bg-primary-extended font-medium text-white' : 'border-border-primary bg-white text-text-primary')}
          >
            All industries
          </button>
          {tradeRows.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => pickTrade(trade === value ? null : value)}
              aria-pressed={trade === value}
              className={clsx(chip, trade === value ? 'border-primary-extended bg-primary-extended font-medium text-white' : 'border-border-primary bg-white text-text-primary')}
            >
              {value}
            </button>
          ))}
        </div>
        {/* the right-edge fade that says "this scrolls" */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background-primary to-transparent" />
      </div>

      {/* EVERYTHING ELSE behind one button with a live badge. The count line sits beside it. */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={openSheet}
          aria-haspopup="dialog"
          aria-expanded={open}
          data-filters-button
          className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-white px-4 py-2 text-sm font-medium text-text-primary transition hover:border-primary"
        >
          <SlidersHorizontal className="size-4" />
          Filters
          <span
            data-filters-badge
            className={clsx('inline-flex min-w-5 justify-center rounded-full px-1.5 text-[11px] font-semibold', nonDefault ? 'bg-primary-extended text-white' : 'bg-[#f4f2f0] text-text-secondary')}
          >
            {nonDefault}
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filter guides" data-sheet>
          <button type="button" aria-label="Close filters" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-background-primary shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-border-primary" />
            <div className="flex shrink-0 items-center justify-between px-6 pt-3 pb-2">
              <h2 className="m-0 font-serif text-[22px] tracking-[-0.5px] text-text-primary">Filter guides</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 text-text-secondary hover:text-text-primary">
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">
              {/* JOURNEY - the intent axis, single-select like everything else here. */}
              <fieldset className="m-0 mt-2 border-0 p-0" role="radiogroup" data-group="journey">
                <legend className={groupLabel}>Journey</legend>
                <Option name="journey" label="Everything" checked={draftIntent === 'all'} onPick={() => setDraftIntent('all')} count={countFor(draft, 'all')} />
                {INTENTS.map((i) => (
                  <Option key={i.id} name="journey" label={i.label} checked={draftIntent === i.id} onPick={() => setDraftIntent(i.id)} count={countFor(draft, i.id)} />
                ))}
              </fieldset>

              {/* The rail's remaining groups, in the rail's order, with the rail's own rows. */}
              {SHEET_AXES.map(({ axis, label, all }) => {
                const active = draft[axis][0];
                return (
                  <fieldset key={axis} className="m-0 mt-6 border-0 p-0" role="radiogroup" data-group={axis}>
                    <legend className={groupLabel}>{label}</legend>
                    <Option name={axis} label={all} checked={!active} onPick={() => setDraft({ ...draft, [axis]: [] })} count={allCounts[axis]} />
                    {rowsFor(axis, counts[axis], active).map((value) => (
                      <Option
                        key={value}
                        name={axis}
                        label={axis === 'agency' ? agencyNameLong(value) : value}
                        checked={active === value}
                        onPick={() => setDraft({ ...draft, [axis]: [value] })}
                        count={counts[axis][value] ?? 0}
                      />
                    ))}
                  </fieldset>
                );
              })}

              {/* LEGAL BASIS - the two orphan chips get a group name (s6 ruling 2). */}
              <fieldset className="m-0 mt-6 border-0 p-0" role="radiogroup" data-group="required">
                <legend className={groupLabel}>Legal basis</legend>
                <Option name="required" label="Any" checked={!draft.required} onPick={() => setDraft({ ...draft, required: null })} />
                {REQUIRED_ROWS.filter((r) => requiredCounts[r.value] > 0).map((r) => (
                  <Option key={r.value} name="required" label={r.label} checked={draft.required === r.value} onPick={() => setDraft({ ...draft, required: r.value })} count={requiredCounts[r.value]} />
                ))}
              </fieldset>
            </div>

            <div className="flex shrink-0 items-center gap-3 border-t border-border-primary bg-background-primary px-6 py-4">
              <button type="button" onClick={clearDraft} className="rounded-full border border-border-primary px-5 py-2.5 text-sm font-medium text-text-primary" data-sheet-clear>
                Clear
              </button>
              <button type="button" onClick={apply} className="flex-1 rounded-full bg-primary-extended px-5 py-2.5 text-sm font-medium text-white" data-sheet-apply>
                Show {draftCount} {draftCount === 1 ? 'guide' : 'guides'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** One single-select row: label, count right-aligned, a real radio that is visibly on. */
function Option({ name, label, checked, onPick, count }: { name: string; label: string; checked: boolean; onPick: () => void; count?: number }) {
  const id = `${name}-${label}`.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  return (
    <label htmlFor={id} className={clsx('flex w-full cursor-pointer items-center gap-3 border-t border-border-primary py-3 text-left text-[15px]', checked ? 'font-semibold text-primary-extended' : 'text-text-primary')}>
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-[#b3aca6]">{count}</span>}
      <input id={id} type="radio" name={name} checked={checked} onChange={onPick} className="size-4 accent-[#423226]" />
    </label>
  );
}
