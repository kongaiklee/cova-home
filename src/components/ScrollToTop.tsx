import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reset scroll to the top of the page on route change.
 *
 * React Router v6 (used by vite-react-ssg) does not reset scroll position on
 * client-side navigation, so following an in-article link would otherwise leave
 * you at the previous page's scroll offset. Mounted once in the layout; the
 * effect runs on every pathname change. A hash present in the URL is left to the
 * browser so in-page anchors still work.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
