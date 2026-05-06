import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

type Stage = 'new' | 'existing' | null;
type Intent = 'buy' | 'advice' | 'review' | null;

const STAGES: { value: Exclude<Stage, null>; label: string }[] = [
  { value: 'new', label: 'New business' },
  { value: 'existing', label: 'Existing business' },
];

const INTENTS: { value: Exclude<Intent, null>; label: string }[] = [
  { value: 'buy', label: 'Buy insurance' },
  { value: 'advice', label: 'Get broker advice' },
  { value: 'review', label: 'Review my portfolio' },
];

const LINES = [
  { slug: 'wica', label: 'WICA' },
  { slug: 'fdw', label: 'FDW' },
  { slug: 'public-liability', label: 'Public Liability' },
  { slug: 'fire', label: 'Fire / PAR' },
  { slug: 'motor', label: 'Motor' },
  { slug: 'group-medical', label: 'Group Medical' },
  { slug: 'pi', label: 'PI' },
  { slug: 'd-and-o', label: 'D&O' },
  { slug: 'cyber', label: 'Cyber' },
  { slug: 'marine-cargo', label: 'Marine Cargo' },
  { slug: 'fidelity-guarantee', label: 'Fidelity' },
  { slug: 'not-sure', label: 'Not sure — help me' },
];

export default function NeedsForm() {
  const [stage, setStage] = useState<Stage>(null);
  const [intent, setIntent] = useState<Intent>(null);
  const [lines, setLines] = useState<string[]>([]);

  const toggleLine = (slug: string) => {
    if (slug === 'not-sure') {
      setLines(lines.includes('not-sure') ? [] : ['not-sure']);
      return;
    }
    const withoutNotSure = lines.filter((l) => l !== 'not-sure');
    setLines(
      withoutNotSure.includes(slug)
        ? withoutNotSure.filter((l) => l !== slug)
        : [...withoutNotSure, slug]
    );
  };

  const isValid = stage !== null && intent !== null && lines.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const params = new URLSearchParams({
      stage: stage!,
      intent: intent!,
      lines: lines.join(','),
    });
    window.location.href = `${
      import.meta.env.VITE_APP_COVARAGE_URL
    }/work/signup?${params.toString()}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[420px] rounded-xl border border-border-primary bg-white p-7"
      aria-label="Find your coverage"
    >
      <div className="mb-5">
        <h3 className="font-serif text-2xl/tight text-text-primary">
          Tell us what you need.
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          We&apos;ll match you with a licensed broker.
        </p>
      </div>

      <fieldset className="mb-5">
        <legend className="mb-2 text-[11px] font-medium uppercase tracking-widest text-text-secondary">
          I&apos;m a
        </legend>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStage(s.value)}
              className={clsx(
                'rounded-full px-4 py-2 text-sm transition',
                stage === s.value
                  ? 'bg-primary text-white'
                  : 'border border-border-primary bg-white text-text-primary hover:border-text-secondary'
              )}
              aria-pressed={stage === s.value}
            >
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-5">
        <legend className="mb-2 text-[11px] font-medium uppercase tracking-widest text-text-secondary">
          Looking to
        </legend>
        <div className="flex flex-wrap gap-2">
          {INTENTS.map((i) => (
            <button
              key={i.value}
              type="button"
              onClick={() => setIntent(i.value)}
              className={clsx(
                'rounded-full px-4 py-2 text-sm transition',
                intent === i.value
                  ? 'bg-primary text-white'
                  : 'border border-border-primary bg-white text-text-primary hover:border-text-secondary'
              )}
              aria-pressed={intent === i.value}
            >
              {i.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-2 text-[11px] font-medium uppercase tracking-widest text-text-secondary">
          For
        </legend>
        <div className="flex flex-wrap gap-2">
          {LINES.map((l) => (
            <button
              key={l.slug}
              type="button"
              onClick={() => toggleLine(l.slug)}
              className={clsx(
                'rounded-full px-3 py-1.5 text-[13px] transition',
                lines.includes(l.slug)
                  ? 'bg-primary text-white'
                  : 'border border-border-primary bg-white text-text-primary hover:border-text-secondary'
              )}
              aria-pressed={lines.includes(l.slug)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!isValid}
        className={clsx(
          'inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition',
          isValid
            ? 'bg-primary text-white hover:bg-primary-hover'
            : 'cursor-not-allowed bg-primary/40 text-white'
        )}
      >
        Continue
        <ArrowRight className="size-4" />
      </button>

      <p className="mt-3 text-center text-[11px] text-text-secondary">
        Free. No obligation. Licensed brokers only.
      </p>
    </form>
  );
}
