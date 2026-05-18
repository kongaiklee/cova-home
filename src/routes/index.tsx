import type { RouteRecord } from 'vite-react-ssg';
import NotFound from '../pages/NotFound';
import Landing from '../pages/landing/index';
import BlogLayout from '../pages/blog/BlogLayout';
import BlogIndex from '../pages/blog/BlogIndex';
import ArticlePage from '../pages/blog/ArticlePage';
import { ARTICLES } from '../content/articles';

/**
 * Route table consumed by vite-react-ssg.
 *
 * - `/` renders the existing landing page.
 * - `/blog` and every article URL share BlogLayout (header + footer).
 * - Article routes are generated explicitly from the article index so the
 *   static-site build prerenders one HTML file per article.
 */
export const routes: RouteRecord[] = [
  { path: '/', element: <Landing /> },
  {
    element: <BlogLayout />,
    children: [
      { path: 'blog', element: <BlogIndex /> },
      ...ARTICLES.map((a) => ({
        path: a.slug.replace(/^\//, ''),
        element: <ArticlePage slug={a.slug} />,
      })),
    ],
  },
  { path: '*', element: <NotFound /> },
];
