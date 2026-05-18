import { useMemo, useState } from 'react';
import { ARTICLES } from '../../content/articles';
import { INTENTS } from '../../content/intents';
import { ArticleRow } from './ArticleCard';
import IntentFilter, { type IntentFilterValue } from './IntentFilter';
import Seo from '../../components/Seo';

export default function BlogIndex() {
  const [intent, setIntent] = useState<IntentFilterValue>('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const i of INTENTS) {
      c[i.id] = ARTICLES.filter((a) => a.intent === i.id).length;
    }
    return c;
  }, []);

  const visible = useMemo(
    () => (intent === 'all' ? ARTICLES : ARTICLES.filter((a) => a.intent === intent)),
    [intent]
  );

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
          owners actually ask. No jargon, no sales pitch, just what you need to
          protect what you have built.
        </p>
        <div className="mt-10">
          <IntentFilter value={intent} onChange={setIntent} counts={counts} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-24 sm:px-10">
        <p className="border-b border-border-primary pb-3 text-sm text-text-secondary">
          {visible.length} {visible.length === 1 ? 'guide' : 'guides'}
        </p>
        {visible.length > 0 ? (
          <div>
            {visible.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-text-secondary">
            Nothing here yet. Try another filter.
          </p>
        )}
      </section>
    </>
  );
}
