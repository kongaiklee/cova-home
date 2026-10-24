import LanderHeader from './landing/LanderHeader';
import LandingFooter from './landing/LandingFooter';

/**
 * The site's header and footer, pre-rendered once as their own page so the pages served as their own files (covarage.com/investors,
 * public/investors.html) carry the very same ones (Kong 2026-10-24 23:06: "make sure all the pages not touched are updated so the
 * headers, dropdown menu and links are all consistenet. for example the investor page logo doesnt link back to home."). After the
 * build, scripts/inject-shell.mjs copies them into each such page and deletes this page from dist: it is never linked, never in the
 * sitemap, never served.
 */
export default function SiteShell() {
  return (
    <>
      <LanderHeader shell />
      <LandingFooter />
    </>
  );
}
