import type { ReactNode } from 'react';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

/** A link from an edited page: the site's own pages stay in the app, an email opens mail, anything else a new tab. */
function EditedLink({
  href,
  children,
}: {
  href?: string;
  children?: ReactNode;
}) {
  if (href?.startsWith('/')) return <Link to={href}>{children}</Link>;
  if (href?.startsWith('mailto:') || href?.startsWith('tel:'))
    return <a href={href}>{children}</a>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Words written in one of content/'s edited files, as the page's prose (`.article-body`, the guides' own styles). */
export function EditableMarkdown({
  children,
  components,
}: {
  children: string;
  components?: Components;
}) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{ a: EditedLink, ...components }}
    >
      {children}
    </Markdown>
  );
}

/** One line from a page's settings (a lede, a footnote): bold and links kept, no paragraph of its own. */
export function InlineMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{ a: EditedLink, p: ({ children: inner }) => <>{inner}</> }}
    >
      {children}
    </Markdown>
  );
}
