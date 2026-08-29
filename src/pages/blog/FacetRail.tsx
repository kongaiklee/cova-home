import clsx from 'clsx';
import type { Axis, Selection } from '../../content/facets';

/**
 * The blog sidebar (Kong 2026-08-29: "the side bar should sort articles by industry, insurance
 * types and relevant governtment ministries"; CD DIRECTION_blog-sidebar.md + Blog.dc.html are the
 * spec). Three groups in HIS order; one active value per group, combinable across groups; the
 * first row of each group is its All reset. Desktop only - below lg the existing collapsible
 * filter panel stays (no phone redesign).
 */

const GROUPS: { axis: Axis; label: string; all: string }[] = [
  { axis: 'industry', label: 'Industry', all: 'All industries' },
  { axis: 'policy', label: 'Insurance types', all: 'All types' },
  { axis: 'agency', label: 'Ministries & regulators', all: 'All bodies' },
];

/** The artboard's curated order for the bodies group - ministries and regulators before courts,
 * industry bodies and statutes; anything else joins by count. */
const AGENCY_ORDER = ['MOM', 'MAS', 'ACRA', 'PDPC', 'SCDF', 'Courts', 'GIA', 'Singapore Statutes'];

const TOP_N = 8;

interface FacetRailProps {
  selection: Selection;
  /** Per-axis value counts with that axis's own selection removed (BlogIndex's facetCounts). */
  counts: Record<Axis, Record<string, number>>;
  /** Count of articles matching the OTHER axes - the All row's number. */
  allCounts: Record<Axis, number>;
  onPick: (axis: Axis, label: string | null) => void;
}

function rowsFor(axis: Axis, counts: Record<string, number>, active: string | undefined): string[] {
  let rows = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_N)
    .map(([label]) => label);
  if (axis === 'agency') {
    rows = [
      ...AGENCY_ORDER.filter((l) => rows.includes(l)),
      ...rows.filter((l) => !AGENCY_ORDER.includes(l)),
    ];
  }
  if (active) {
    // the active value always shows, hoisted under the All row (the artboard's own layout)
    rows = [active, ...rows.filter((l) => l !== active)].slice(0, TOP_N);
  }
  return rows;
}

export default function FacetRail({ selection, counts, allCounts, onPick }: FacetRailProps) {
  const row = 'flex w-full items-baseline justify-between gap-3 border-l-2 py-2 pl-4 text-left text-sm transition';
  return (
    <nav className="sticky top-6 pl-[18px]" aria-label="Article filters" data-facet-rail>
      {GROUPS.map(({ axis, label, all }) => {
        const active = selection[axis][0];
        return (
          <div key={axis} className="mb-8 last:mb-0">
            <p className="m-0 mb-2 text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase">{label}</p>
            <div className="-ml-[18px]">
              <button
                type="button"
                onClick={() => onPick(axis, null)}
                className={clsx(row, !active ? 'border-primary-extended font-semibold text-primary-extended' : 'border-transparent text-text-primary hover:text-primary-extended')}
              >
                <span>{all}</span>
                <span className="text-xs text-[#b3aca6]">{allCounts[axis]}</span>
              </button>
              {rowsFor(axis, counts[axis], active).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onPick(axis, active === value ? null : value)}
                  className={clsx(row, active === value ? 'border-primary-extended font-semibold text-primary-extended' : 'border-transparent text-text-primary hover:text-primary-extended')}
                >
                  <span>{value}</span>
                  <span className="text-xs text-[#b3aca6]">{counts[axis][value] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
