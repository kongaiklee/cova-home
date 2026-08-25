import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import Seo, { SITE_URL } from '../../components/Seo';
import { track } from '../../lib/analytics';
import {
  ALL_ITEMS,
  BUCKETS,
  DEPENDENTS,
  evaluate,
  QUESTIONS,
  type Answers,
} from './insuranceGap';

const TOOL_PATH = '/guides/tools/insurance-gap-check';

/** The only call to action: the request card on the lander. No self-serve start exists. */
const ctaHref = '/#request?utm_source=guides&utm_medium=tool&utm_campaign=insurance-gap-check';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SME Insurance Gap Check',
  description:
    'A free self-assessment that shows Singapore SMEs which insurance areas are usually required by law for a business of this type, commonly required by contracts, or commonly reviewed at this stage.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}${TOOL_PATH}`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD' },
  provider: { '@type': 'Organization', name: 'Covarage', url: SITE_URL },
};

/** W5 - shared closing disclaimer. Same canonical text as ArticleDisclaimer.
 *  FAA-N02 FREE: no introducer appointment exists as at 2026-08-23. */
function Disclaimer() {
  return (
    <p className="mt-6 text-sm/relaxed text-text-secondary">
      Covarage is a technology platform. We are not an insurer, an insurance broker
      or a financial adviser, and we are not licensed or registered by the
      Monetary Authority of Singapore. We do not advise on, recommend, rank,
      compare or arrange insurance, and we never handle premium or claims. This
      is general information, not financial advice. Where you ask us to, we
      introduce you to a licensed insurance intermediary, who provides all
      advice.
    </p>
  );
}

export default function InsuranceGapTool() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const started = useRef(false);

  const visible = useMemo(
    () => QUESTIONS.filter((q) => !q.showIf || q.showIf(answers)),
    [answers]
  );
  const results = useMemo(() => evaluate(answers), [answers]);
  const answeredCount = visible.filter((q) => answers[q.id]).length;

  function setAnswer(id: string, value: string) {
    if (!started.current) {
      started.current = true;
      track('tool_start');
    }
    setAnswers((prev) => {
      const next: Answers = { ...prev, [id]: value };
      for (const dep of DEPENDENTS[id] ?? []) delete next[dep];
      return next;
    });
  }

  function showResults() {
    setSubmitted(true);
    const segments = BUCKETS.filter((b) => results.some((i) => i.bucket === b.id)).map((b) => b.id);
    track('tool_complete', { result_segments: segments.join(','), item_count: results.length });
    window.scrollTo(0, 0);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    started.current = false;
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Seo
        title="SME Insurance Gap Check: A 2-Minute Self-Assessment | Covarage"
        description="Answer a few questions about your Singapore business and see which insurance areas are usually required by law for a business of this type, commonly required by contracts, or commonly reviewed at this stage. Free, plain English, not advice."
        path={TOOL_PATH}
        jsonLd={jsonLd}
      />

      <section className="mx-auto w-full max-w-2xl px-6 pt-12 pb-16 sm:px-8">
        <h1 className="font-serif text-3xl/tight text-text-primary sm:text-4xl/tight">
          Insurance gap check for Singapore SMEs
        </h1>
        <p className="mt-4 text-base/relaxed text-text-secondary">
          Answer a few questions about your business and see which insurance
          areas are usually required by law for a business of this type,
          commonly required by contracts, or commonly reviewed at this stage.
          About 2 minutes. This is information, not advice.
        </p>

        {!submitted ? (
          <form
            className="mt-10"
            onSubmit={(e) => {
              e.preventDefault();
              showResults();
            }}
          >
            <div className="flex flex-col gap-8">
              {visible.map((q) => (
                <fieldset key={q.id} className="border-0 p-0">
                  <legend className="font-serif text-lg text-text-primary">{q.prompt}</legend>
                  {q.help && (
                    <p className="mt-1 text-sm text-text-secondary">{q.help}</p>
                  )}
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {q.options.map((opt) => {
                      const checked = answers[q.id] === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={[
                            'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition',
                            checked
                              ? 'border-primary bg-primary/5 text-text-primary'
                              : 'border-border-primary bg-background-card text-text-primary hover:border-primary',
                          ].join(' ')}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={opt.value}
                            checked={checked}
                            onChange={() => setAnswer(q.id, opt.value)}
                            className="size-4 shrink-0 accent-primary"
                          />
                          <span>{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={answeredCount === 0}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                See your results
                <ArrowRight className="size-4" />
              </button>
              <span className="text-sm text-text-secondary">
                {answeredCount} of {visible.length} answered
              </span>
            </div>
          </form>
        ) : (
          <div className="mt-10">
            {results.length > 0 ? (
              <div className="flex flex-col gap-8">
                {BUCKETS.map((bucket) => {
                  const items = results.filter((i) => i.bucket === bucket.id);
                  if (items.length === 0) return null;
                  return (
                    <section key={bucket.id}>
                      <h2 className="font-serif text-xl text-text-primary">{bucket.title}</h2>
                      <p className="mt-1 text-sm text-text-secondary">{bucket.blurb}</p>
                      <ul className="mt-4 flex flex-col gap-3">
                        {items.map((item, i) => (
                          <li
                            key={`${bucket.id}-${i}`}
                            className="rounded-xl border border-border-primary bg-background-card p-4"
                          >
                            <p className="text-sm/relaxed text-text-primary">{item.statement}</p>
                            {item.href && (
                              <Link
                                to={item.href}
                                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
                              >
                                Read the guide
                                <ArrowRight className="size-3.5" />
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            ) : (
              <p className="text-base/relaxed text-text-secondary">
                Based on your answers, nothing stood out as clearly mandatory. It
                is still worth a quick review with a licensed adviser to confirm
                you have the cover your business and contracts call for.
              </p>
            )}

            <div className="mt-10 rounded-2xl bg-linear-to-br from-landing-hero-from to-landing-hero-to p-6 sm:p-8">
              <h2 className="font-serif text-xl text-white sm:text-2xl">
                Want a free second opinion on your cover?
              </h2>
              <p className="mt-2 max-w-md text-sm/relaxed text-white/90">
                We can connect you with a licensed broker for a free,
                zero-obligation consultation to talk through your cover and the
                gaps above. No cost, no pressure.
              </p>
              <a
                href={ctaHref}
                onClick={() => track('tool_cta_click')}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Request access
                <ArrowRight className="size-4" />
              </a>
            </div>

            <Disclaimer />

            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition hover:text-primary"
            >
              <RotateCcw className="size-4" />
              Start over
            </button>
          </div>
        )}

        {/* No-JS fallback: a static overview so the page is useful and crawlable without React. */}
        <noscript>
          <div className="mt-10">
            <h2 className="font-serif text-xl text-text-primary">
              Areas Singapore SMEs commonly review
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {ALL_ITEMS.map((item, i) => (
                <li key={i} className="rounded-xl border border-border-primary bg-background-card p-4">
                  <p className="text-sm/relaxed text-text-primary">{item.statement}</p>
                </li>
              ))}
            </ul>
            <Disclaimer />
          </div>
        </noscript>
      </section>
    </>
  );
}
