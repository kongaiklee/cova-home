import { Link } from 'react-router-dom';
import type { ArticleMeta } from '../../content/articles';
import { INTENT_BY_ID } from '../../content/intents';
import { formatDate, readingTime } from './util';

/** Wide row card used in the blog index list. */
export function ArticleRow({ article }: { article: ArticleMeta }) {
  const intent = INTENT_BY_ID[article.intent];
  return (
    <Link
      to={article.slug}
      className="group flex flex-col gap-5 border-b border-border-primary py-7 sm:flex-row sm:items-center sm:gap-8"
    >
      <div className="aspect-16/10 w-full shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-44">
        <img
          src={article.hero_image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {intent?.clearLabel}
        </p>
        <h3 className="mt-1.5 font-serif text-xl/snug text-text-primary transition group-hover:text-primary sm:text-2xl/snug">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          {formatDate(article.published)} &middot; {readingTime(article.word_count)}
        </p>
      </div>
    </Link>
  );
}

/** Compact vertical card used in the "Explore more" rail. */
export function ArticleTile({ article }: { article: ArticleMeta }) {
  const intent = INTENT_BY_ID[article.intent];
  return (
    <Link
      to={article.slug}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-primary bg-background-card transition hover:border-primary"
    >
      <div className="aspect-16/10 w-full overflow-hidden">
        <img
          src={article.hero_image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {intent?.clearLabel}
        </p>
        <h3 className="mt-1.5 font-serif text-lg/snug text-text-primary transition group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-auto pt-3 text-sm text-text-secondary">
          {formatDate(article.published)}
        </p>
      </div>
    </Link>
  );
}
