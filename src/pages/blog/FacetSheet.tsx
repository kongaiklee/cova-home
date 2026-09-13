import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { ARTICLES } from '../../content/articles';
import { INTENTS } from '../../content/intents';
import { NOT_A_BODY, agencyNameLong, matches, type Axis, type RequiredValue, type Selection } from '../../content/facets';
import { GROUPS, rowsFor } from './FacetRail';
import type { IntentFilterValue } from './IntentFilter';

/**
 * The phone filter panel.
 *
 * v2, 2026-09-09, on Kong's read of v1 on the staging preview: "seems unintuitive. how can we
 * allow users to search or sort by the 3 main categories which is either industry type, insurance
 * type or reg authority?" and "right now your industry pills are scroll to right which makes it
 * hard for user to decide where the search term may appear". v1 (CD s6) showed one axis as a
 * scrolling chip row and hid the other two in a sheet; a scrolling row hides most of its vocabulary
 * off-screen, so a reader cannot see whether their term exists at all.
 *
 * v2: THREE NATIVE PICKERS, one per axis, in the desktop rail's group order - Industry, Insurance
 * type, Regulatory authority. One tap opens the phone's own picker with the FULL list, All first,
 * every option carrying its count. A pick applies at once and writes the URL, exactly as the
 * desktop rail's rows do, and the three combine. Nothing scrolls sideways and nothing is hidden.
 *
 * Journey and Legal basis (the secondary axes) stay behind one `More filters` button opening the
 * s6 sheet of real radio groups, with the draft-then-apply footer.
 *
 * Desktop (lg and up) never renders this - BlogIndex mounts it under `lg:hidden`. Group order
 * and the leading rows come from FacetRail's own GROUPS and rowsFor, so the two cannot drift.
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

/** The picker labels Kong used, keyed on the rail's axes; order is the rail's. */
const PICKER_LABEL: Record<Axis, string> = {
  industry: 'Industry',
  policy: 'Insurance type',
  agency: 'Regulatory authority',
};

/**
 * Every value a picker offers: the rail's own leading rows first (its order), then the rest of the
 * vocabulary by count, so the list is complete - the whole point of a picker over a chip row.
 */
function optionsFor(axis: Axis, counts: Record<string, number>, active: string | undefined): string[] {
  const lead = rowsFor(axis, counts, active);
  const rest = Object.entries(counts)
    .filter(([v, n]) => (n > 0 || v === active) && !lead.includes(v))
    .filter(([v]) => axis !== 'agency' || !NOT_A_BODY.has(v) || v === active)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([v]) => v);
  return [...lead, ...rest];
}

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

  // The badge counts the SECONDARY groups that are not at their default - what the sheet holds.
  const nonDefault = (intent === 'all' ? 0 : 1) + (selection.required ? 1 : 0);

  const draftCount = useMemo(() => countFor(draft, draftIntent), [draft, draftIntent]);

  function pickAxis(axis: Axis, value: string) {
    onApply({ ...selection, [axis]: value ? [value] : [] }, intent);
  }
  function apply() {
    onApply(draft, draftIntent);
    setOpen(false);
  }
  function clearDraft() {
    setDraft({ ...draft, required: null });
    setDraftIntent('all');
  }

  const groupLabel = 'm-0 mb-1 text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase';

  return (
    <div data-facet-sheet>
      {/* THE THREE MAIN CATEGORIES, each a native picker with its full list. */}
      <div className="flex flex-col gap-3 sm:flex-row" data-pickers>
        {GROUPS.map(({ axis, all }) => {
          const active = selection[axis][0];
          return (
            <label key={axis} className="block flex-1" data-picker={axis}>
              <span className={groupLabel}>{PICKER_LABEL[axis]}</span>
              <span className="relative block">
                <select
                  value={active ?? ''}
                  onChange={(e) => pickAxis(axis, e.target.value)}
                  aria-label={PICKER_LABEL[axis]}
                  className={clsx(
                    'block w-full appearance-none rounded-lg border py-3 pr-10 pl-4 text-[15px] transition',
                    active ? 'border-primary-extended bg-primary-extended font-medium text-white' : 'border-border-primary bg-white text-text-primary'
                  )}
                >
                  <option value="">{all} ({allCounts[axis]})</option>
                  {optionsFor(axis, counts[axis], active).map((value) => (
                    <option key={value} value={value}>
                      {axis === 'agency' ? agencyNameLong(value) : value} ({counts[axis][value] ?? 0})
                    </option>
                  ))}
                </select>
                <ChevronDown className={clsx('pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2', active ? 'text-white' : 'text-text-secondary')} />
              </span>
            </label>
          );
        })}
      </div>

      {/* The secondary axes behind one button with a live badge. */}
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
          More filters
          <span
            data-filters-badge
            className={clsx('inline-flex min-w-5 justify-center rounded-full px-1.5 text-[11px] font-semibold', nonDefault ? 'bg-primary-extended text-white' : 'bg-pill text-text-secondary')}
          >
            {nonDefault}
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="More filters" data-sheet>
          <button type="button" aria-label="Close filters" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-background-primary shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-border-primary" />
            <div className="flex shrink-0 items-center justify-between px-6 pt-3 pb-2">
              <h2 className="m-0 font-serif text-[22px] tracking-[-0.5px] text-text-primary">More filters</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 text-text-secondary hover:text-text-primary">
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">
              {/* JOURNEY - the intent axis, single-select. */}
              <fieldset className="m-0 mt-2 border-0 p-0" role="radiogroup" data-group="journey">
                <legend className={groupLabel}>Journey</legend>
                <Option name="journey" label="Everything" checked={draftIntent === 'all'} onPick={() => setDraftIntent('all')} count={countFor(draft, 'all')} />
                {INTENTS.map((i) => (
                  <Option key={i.id} name="journey" label={i.label} checked={draftIntent === i.id} onPick={() => setDraftIntent(i.id)} count={countFor(draft, i.id)} />
                ))}
              </fieldset>

              {/* LEGAL BASIS - the two orphan chips with a group name (s6 ruling 2). */}
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
      {count !== undefined && <span className="text-xs text-text-secondary">{count}</span>}
      <input id={id} type="radio" name={name} checked={checked} onChange={onPick} className="size-4 accent-[#423226]" />
    </label>
  );
}
