import type { RouteRecord } from 'vite-react-ssg';
import NotFound from '../pages/NotFound';
import Landing from '../pages/landing/index';
import BlogLayout from '../pages/blog/BlogLayout';
import BlogIndex from '../pages/blog/BlogIndex';
import ArticlePage from '../pages/blog/ArticlePage';
import { ARTICLES, loadArticle } from '../content/articles';

/**
 * Route table consumed by vite-react-ssg.
 *
 * - `/` renders the existing landing page.
 * - `/blog` and every article URL share BlogLayout (header + footer).
 * - Article routes are generated explicitly from the article index. Each one
 *   lazily loads its own Markdown chunk, so the static build prerenders one
 *   HTML file per article while the client only downloads the article it needs.
 */
export const routes: RouteRecord[] = [
  { path: '/', element: <Landing /> },
  {
    element: <BlogLayout />,
    children: [
      { path: 'blog', element: <BlogIndex /> },
      ...ARTICLES.map((a) => ({
        path: a.slug.replace(/^\//, ''),
        lazy: async () => {
          const article = await loadArticle(a.slug);
          return {
            Component: () =>
              article ? <ArticlePage article={article} /> : <NotFound />,
          };
        },
      })),
    ],
  },
  { path: '*', element: <NotFound /> },
];
