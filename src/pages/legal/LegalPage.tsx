import type { ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';

/** Same link behaviour as the article body: internal links stay in the SPA. */
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

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  body: string;
}

/**
 * Shared shell for the published legal documents (/terms, /privacy).
 *
 * The text is Markdown in `src/content/legal/` and is rendered through the same
 * react-markdown pipeline and `article-body` styles the blog uses, so a wording
 * change is a text edit and never a JSX edit. Each document carries its own
 * version line as its first paragraph - that is what an audit reads to tell
 * which revision is deployed, so do not move it into this component.
 */
export default function LegalPage({ title, description, path, body }: LegalPageProps) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <article className="mx-auto w-full max-w-3xl px-6 pt-10 pb-16 sm:px-8">
        <h1 className="font-serif text-3xl/tight text-text-primary sm:text-4xl/tight">
          {title}
        </h1>
        <div className="article-body mt-8">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {body}
          </Markdown>
        </div>
      </article>
    </>
  );
}
