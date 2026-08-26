import type { RouteRecord } from 'vite-react-ssg';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import NotFound from '../pages/NotFound';
import Landing from '../pages/landing/index';
import BlogLayout from '../pages/blog/BlogLayout';
import BlogIndex from '../pages/blog/BlogIndex';
import ArticlePage from '../pages/blog/ArticlePage';
import Terms from '../pages/legal/Terms';
import Privacy from '../pages/legal/Privacy';
import Contact from '../pages/company/Contact';
import Careers from '../pages/company/Careers';
import InsuranceGapTool from '../pages/tools/InsuranceGapTool';
import { ARTICLES, GUIDES_PREFIX, loadArticle } from '../content/articles';

/**
 * Route table consumed by vite-react-ssg.
 *
 * - A pathless root mounts ScrollToTop once for every route - React Router does
 *   not reset scroll on client-side navigation (the component came from
 *   cova-blog with the corpus; a hash in the URL is left to the browser).
 * - `/` renders the existing landing page.
 * - `/contact` and `/careers` carry the lander's own header and footer, so they
 *   sit beside it rather than inside BlogLayout.
 * - `/blog` and every article URL share BlogLayout (header + footer).
 * - `/terms` and `/privacy` share the same shell. They are static documents, not
 *   articles, so they sit beside the blog rather than inside the article index.
 * - Article routes are generated explicitly from the article index. Each one
 *   lazily loads its own Markdown chunk, so the static build prerenders one
 *   HTML file per article while the client only downloads the article it needs.
 */
export const routes: RouteRecord[] = [
  {
    element: (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Landing /> },
      { path: 'contact', element: <Contact /> },
      { path: 'careers', element: <Careers /> },
      {
        element: <BlogLayout />,
        children: [
          { path: 'blog', element: <BlogIndex /> },
          { path: 'terms', element: <Terms /> },
          { path: 'privacy', element: <Privacy /> },
          // moved from blog.covarage.com with the corpus; the blog host 301s its old path here
          { path: 'guides/tools/insurance-gap-check', element: <InsuranceGapTool /> },
          // Every article lives under /guides/<category>/<slug>; the old paths 301 here (vercel.json).
          ...ARTICLES.map((a) => ({
            path: `${GUIDES_PREFIX}${a.slug}`.replace(/^\//, ''),
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
    ],
  },
];
