import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ARTICLES } from '../../content/articles';
import { INTENTS } from '../../content/intents';
import { resolveTopic, TOPIC_COUNTS, topicSlug } from '../../content/topics';
import { ArticleRow } from './ArticleCard';
import IntentFilter, { type IntentFilterValue } from './IntentFilter';
import Seo from '../../components/Seo';

const PER_PAGE = 12;

export default function BlogIndex() {
  const [intent, setIntent] = useState<IntentFilterValue>('all');
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // `?topic=<slug>` pre-filters on the corpus topic tags. The landing page's
  // cover-line chips deep-link here. Read after mount, not during render: the
  // prerendered HTML is the unfiltered index, and reading the URL during the
  // first client render would make hydration disagree with it.
  const [topic, setTopic] = useState<string | null>(null);
  useEffect(() => {
    setTopic(resolveTopic(searchParams.get('topic')));
    setPage(1);
  }, [searchParams]);

  // Everything below filters within the topic, so the intent pill counts and
  // the total describe what the reader can actually see.
  const base = useMemo(
    () => (topic ? ARTICLES.filter((a) => a.topics.includes(topic)) : ARTICLES),
    [topic]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const i of INTENTS) {
      c[i.id] = base.filter((a) => a.intent === i.id).length;
    }
    return c;
  }, [base]);

  const visible = useMemo(
    () => (intent === 'all' ? base : base.filter((a) => a.intent === intent)),
    [base, intent]
  );

  function clearTopic() {
    const next = new URLSearchParams(searchParams);
    next.delete('topic');
    setSearchParams(next, { replace: true });
  }

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

  return (
    <>
      <Seo
        title="Covarage Blog: Insurance Guides for Singapore SMEs"
        description="Clear, sourced answers to the insurance questions Singapore business owners actually ask. No jargon, no sales pitch."
        path="/blog"
      />

      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-10 text-center sm:px-10 lg:px-16 lg:pt-20">
        <h1 className="font-serif text-4xl text-text-primary sm:text-5xl lg:text-6xl">
          Covarage Blog
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base/relaxed text-text-secondary">
          Clear, sourced answers to the insurance questions Singapore business
          owners actually ask. No jargon, no sales pitch, no recommendations.
        </p>
        <div className="mt-10">
          <IntentFilter value={intent} onChange={changeIntent} counts={counts} />
        </div>
        {topic && (
          <p className="mt-6 text-sm text-text-secondary" data-topic={topicSlug(topic)}>
            Showing guides on{' '}
            <span className="font-semibold text-text-primary">{topic}</span>
            <span className="ml-1.5 text-xs">{TOPIC_COUNTS[topic] ?? 0}</span>
            <button
              type="button"
              onClick={clearTopic}
              className="ml-3 inline-flex items-center gap-1 rounded-full border border-border-primary px-3 py-1 text-xs font-medium text-text-primary transition hover:border-primary"
            >
              <X className="size-3" />
              Show all topics
            </button>
          </p>
        )}
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-24 sm:px-10">
        <p className="border-b border-border-primary pb-3 text-sm text-text-secondary">
          {visible.length} {visible.length === 1 ? 'guide' : 'guides'}
          {totalPages > 1 && ` · page ${page} of ${totalPages}`}
        </p>

        {paged.length > 0 ? (
          <div>
            {paged.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-text-secondary">
            Nothing here yet. Try another filter{topic ? ', or show all topics' : ''}.
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
      </section>
    </>
  );
}
