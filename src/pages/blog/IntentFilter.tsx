import clsx from 'clsx';
import { useState } from 'react';
import { ALL_INTENT, INTENTS, type IntentId } from '../../content/intents';

export type IntentFilterValue = IntentId | 'all';

interface IntentFilterProps {
  value: IntentFilterValue;
  onChange: (value: IntentFilterValue) => void;
  /** Article count per intent, for the pill counts. */
  counts: Record<string, number>;
}

/**
 * The blog's intent filter. Each pill shows a "clever" label with its plain
 * label beneath it, so a reader who does not know insurance can still
 * self-select. The two-sentence subtext shows below the row on hover or when
 * a filter is active, and as a native tooltip via the title attribute.
 */
export default function IntentFilter({ value, onChange, counts }: IntentFilterProps) {
  const [hovered, setHovered] = useState<IntentFilterValue | null>(null);

  const pills: { id: IntentFilterValue; label: string; clearLabel?: string; subtext: string }[] = [
    { id: 'all', label: ALL_INTENT.label, subtext: ALL_INTENT.subtext },
    ...INTENTS.map((i) => ({
      id: i.id,
      label: i.label,
      clearLabel: i.clearLabel,
      subtext: i.subtext,
    })),
  ];

  const described = pills.find((p) => p.id === (hovered ?? value));

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap items-stretch justify-center gap-2.5">
        {pills.map((pill) => {
          const active = pill.id === value;
          const count = pill.id === 'all'
            ? Object.values(counts).reduce((a, b) => a + b, 0)
            : counts[pill.id] ?? 0;
          return (
            <button
              key={pill.id}
              type="button"
              title={pill.subtext}
              onClick={() => onChange(pill.id)}
              onMouseEnter={() => setHovered(pill.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(pill.id)}
              onBlur={() => setHovered(null)}
              aria-pressed={active}
              className={clsx(
                'group flex flex-col items-center rounded-2xl border px-4 py-2.5 text-center transition',
                active
                  ? 'border-primary bg-primary text-white'
                  : 'border-border-primary bg-background-card text-text-primary hover:border-primary'
              )}
            >
              <span className="text-sm font-semibold">
                {pill.label}
                <span
                  className={clsx(
                    'ml-1.5 text-xs font-normal',
                    active ? 'text-white/70' : 'text-text-secondary'
                  )}
                >
                  {count}
                </span>
              </span>
              {pill.clearLabel && (
                <span
                  className={clsx(
                    'text-xs',
                    active ? 'text-white/80' : 'text-text-secondary'
                  )}
                >
                  {pill.clearLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {described && (
        <p className="mt-4 max-w-2xl text-center text-sm/relaxed text-text-secondary">
          {described.subtext}
        </p>
      )}
    </div>
  );
}
