import clsx from 'clsx';
import { useState } from 'react';
import { X } from 'lucide-react';
import { AXES, NOT_A_BODY, type Axis, type RequiredValue, type Selection, isEmpty } from '../../content/facets';

interface FacetFilterProps {
  selection: Selection;
  /** Document counts per value on each axis, computed within the OTHER axes' selection. */
  counts: Record<Axis, Record<string, number>>;
  onToggle: (axis: Axis, label: string) => void;
  onToggleRequired: (value: RequiredValue) => void;
  onClear: () => void;
  /** Article counts per required_by_law value - a chip renders only while its count is nonzero. */
  requiredCounts: Record<RequiredValue, number>;
}

/**
 * The ruled two-value rendering (CMO curation 2026-08-26): the labels MUST differ - `Required by
 * law` over a duty article (a notification, a bond, a certificate) would claim the law mandates
 * insurance it does not mandate.
 */
const REQUIRED_CHIPS: { value: RequiredValue; label: string }[] = [
  { value: 'cover', label: 'Required by law' },
  { value: 'duty', label: 'The law also requires' },
];

const SHOW = 8;

/**
 * Three-axis filter (Kong, 2026-08-26): industry, policy, agency cited. Multi-select within an
 * axis, AND across axes. Values with a zero count under the current selection are hidden; an axis
 * with more than SHOW values collapses behind "All N". State lives in the URL, not here.
 */
export default function FacetFilter({
  selection,
  counts,
  onToggle,
  onToggleRequired,
  onClear,
  requiredCounts,
}: FacetFilterProps) {
  const [open, setOpen] = useState<Record<Axis, boolean>>({ policy: false, industry: false, agency: false });

  return (
    <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col gap-4 text-left" data-facets>
      {AXES.map(({ key, label }) => {
        const all = Object.entries(counts[key])
          .filter(([v, n]) => n > 0 || selection[key].includes(v))
          // Kong 2026-08-30: a value that is not a body earns no chip on the agency axis. Kept
          // when SELECTED so a published ?agency= link stays clearable by whoever followed it.
          .filter(([v]) => key !== 'agency' || !NOT_A_BODY.has(v) || selection[key].includes(v))
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
        if (all.length === 0) return null;
        const shown = open[key] ? all : all.slice(0, SHOW);
        const hidden = all.length - shown.length;
        return (
          <div key={key} className="flex flex-wrap items-baseline gap-x-3 gap-y-2" data-axis={key}>
            <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {label}
            </span>
            <div className="flex flex-1 flex-wrap gap-2">
              {shown.map(([value, n]) => {
                const active = selection[key].includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onToggle(key, value)}
                    aria-pressed={active}
                    className={clsx(
                      'rounded-full border px-3 py-1 text-xs font-medium transition',
                      active
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-primary bg-background-card text-text-primary hover:border-primary'
                    )}
                  >
                    {value}
                    <span className={clsx('ml-1.5 font-normal', active ? 'text-white/70' : 'text-text-secondary')}>
                      {n}
                    </span>
                  </button>
                );
              })}
              {hidden > 0 && (
                <button
                  type="button"
                  onClick={() => setOpen({ ...open, [key]: true })}
                  className="rounded-full px-3 py-1 text-xs font-medium text-primary hover:underline"
                >
                  All {all.length}
                </button>
              )}
              {open[key] && all.length > SHOW && (
                <button
                  type="button"
                  onClick={() => setOpen({ ...open, [key]: false })}
                  className="rounded-full px-3 py-1 text-xs font-medium text-text-secondary hover:underline"
                >
                  Fewer
                </button>
              )}
            </div>
          </div>
        );
      })}

      {(REQUIRED_CHIPS.some(({ value }) => requiredCounts[value] > 0) || !isEmpty(selection)) && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {REQUIRED_CHIPS.map(({ value, label }) =>
            requiredCounts[value] > 0 ? (
              <button
                key={value}
                type="button"
                onClick={() => onToggleRequired(value)}
                aria-pressed={selection.required === value}
                className={clsx(
                  'rounded-full border px-3 py-1 text-xs font-semibold transition',
                  selection.required === value
                    ? 'border-primary bg-primary text-white'
                    : 'border-border-primary bg-background-card text-text-primary hover:border-primary'
                )}
              >
                {label}
                <span className={clsx('ml-1.5 font-normal', selection.required === value ? 'text-white/70' : 'text-text-secondary')}>
                  {requiredCounts[value]}
                </span>
              </button>
            ) : null
          )}
          {!isEmpty(selection) && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 rounded-full border border-border-primary px-3 py-1 text-xs font-medium text-text-primary transition hover:border-primary"
              data-clear
            >
              <X className="size-3" />
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
