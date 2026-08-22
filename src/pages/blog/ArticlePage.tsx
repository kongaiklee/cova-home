import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { relatedArticles, type Article } from '../../content/articles';
import { INTENT_BY_ID } from '../../content/intents';
import Seo, { SITE_URL } from '../../components/Seo';
import { ArticleTile } from './ArticleCard';
import { formatDate, readingTime } from './util';

const APP_URL = import.meta.env.VITE_APP_COVARAGE_URL;

/** Render Markdown links as SPA links when internal, new-tab when external. */
const markdownComponents = {
  a({ href, children }: { href?: string; children?: ReactNode }) {
    if (href && href.startsWith('/')) {
      return <Link to={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export default function ArticlePage({ article }: { article: Article }) {
  const { frontmatter, body } = article;
  const intent = INTENT_BY_ID[frontmatter.intent];
  const related = relatedArticles(frontmatter.slug);
  const topics = frontmatter.topics.filter((t) => t !== 'General');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.meta_description,
    image: `${SITE_URL}${frontmatter.hero_image}`,
    datePublished: frontmatter.published,
    dateModified: frontmatter.source_verified,
    author: { '@type': 'Organization', name: 'Covarage', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Covarage',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}${frontmatter.slug}`,
  };

  return (
    <>
      <Seo
        title={`${frontmatter.title} | Covarage`}
        description={frontmatter.meta_description}
        path={frontmatter.slug}
        image={frontmatter.hero_image}
        type="article"
        publishedTime={frontmatter.published}
        modifiedTime={frontmatter.source_verified}
        jsonLd={jsonLd}
      />

      <article className="mx-auto w-full max-w-3xl px-6 pt-10 pb-16 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-text-secondary" aria-label="Breadcrumb">
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          <span aria-hidden>/</span>
          <span>{intent?.clearLabel}</span>
        </nav>

        <h1 className="mt-4 font-serif text-3xl/tight text-text-primary sm:text-4xl/tight lg:text-[2.75rem]/tight">
          {frontmatter.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
          <span>Covarage</span>
          <span aria-hidden>&middot;</span>
          <span>{formatDate(frontmatter.published)}</span>
          <span aria-hidden>&middot;</span>
          <span>{readingTime(frontmatter.word_count)}</span>
        </div>

        {topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {topics.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <img
          src={frontmatter.hero_image}
          alt=""
          className="mt-7 aspect-video w-full rounded-2xl object-cover"
        />

        <div className="article-body mt-9">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {body}
          </Markdown>
        </div>
      </article>

      {/* CTA band */}
      <section className="bg-linear-to-br from-landing-hero-from to-landing-hero-to">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-5 px-6 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-white sm:text-3xl">
              Insurance, without the admin.
            </h2>
            <p className="mt-2 max-w-md text-sm/relaxed text-white/90">
              Covarage keeps your policies in one place and — where you ask us
              to — introduces you to a licensed insurance intermediary.
            </p>
          </div>
          <a
            href={`${APP_URL}/work/signup`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
          >
            Get started
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* Explore more */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
          <h2 className="font-serif text-2xl text-text-primary">Explore more</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleTile key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
