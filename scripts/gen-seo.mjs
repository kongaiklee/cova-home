/**
 * Generates public/sitemap.xml and public/robots.txt from the article index.
 * Runs before the Vite build so both files are copied into dist/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SITE = 'https://covarage.com';

const indexPath = path.join(REPO_ROOT, 'content', 'articles-index.json');
if (!fs.existsSync(indexPath)) {
  console.error('content/articles-index.json not found. Run npm run migrate first.');
  process.exit(1);
}
const articles = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

// /updates lastmod = the weekly screen's review date - it moves only when a screen ran, which
// is the freshness signal the page exists to carry. Null before the first screen.
const updates = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'content', 'updates.json'), 'utf8'));

/** Static + per-article URLs. lastmod is the article's `updated` date where it has one, else its
 *  publish date. WHY (2026-09-08): all 524 descriptions were rewritten on 2026-08-30 and the sitemap
 *  kept saying May, so Google had no reason to re-read a single page - three of four pages Kong saw
 *  with a disclaimer as the snippet had last been crawled BEFORE the rewrite. A tool that changes
 *  what a page says must move `updated`, or the change is invisible to the crawler. */
const lastmodOf = (a) => a.updated ?? a.published;
const urls = [
  { loc: `${SITE}/`, lastmod: null, priority: '1.0' },
  { loc: `${SITE}/blog`, lastmod: null, priority: '0.9' },
  { loc: `${SITE}/updates`, lastmod: updates.reviewed?.date ?? null, priority: '0.7' },
  { loc: `${SITE}/updates/cyber`, lastmod: updates.reviewed?.date ?? null, priority: '0.7' },
  // The Emerging Risks 2027 seed page (Kong 2026-09-14). lastmod moves when the body does -
  // the report replaces it in January 2027 on the same URL.
  { loc: `${SITE}/emerging-risks-2027`, lastmod: '2026-09-14', priority: '0.8' },
  { loc: `${SITE}/guides/tools/insurance-gap-check`, lastmod: null, priority: '0.6' },
  { loc: `${SITE}/contact`, lastmod: null, priority: '0.5' },
  { loc: `${SITE}/careers`, lastmod: null, priority: '0.5' },
  { loc: `${SITE}/terms`, lastmod: null, priority: '0.3' },
  { loc: `${SITE}/privacy`, lastmod: null, priority: '0.3' },
  // Category hubs - derived from the index, exactly as the routes are, so the two can never
  // disagree about which categories exist. lastmod = the newest article in the category, which
  // is the honest recrawl signal: the hub changes when a guide is added to it.
  ...[...new Set(articles.map((a) => a.category))].sort().map((category) => ({
    loc: `${SITE}/guides/${category}`,
    lastmod: articles
      .filter((a) => a.category === category)
      .reduce((max, a) => (lastmodOf(a) > max ? lastmodOf(a) : max), ''),
    priority: '0.9',
  })),
  ...articles.map((a) => ({
    loc: `${SITE}/guides${a.slug}`,
    lastmod: lastmodOf(a),
    priority: '0.8',
  })),
];

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      (u) =>
        '  <url>\n' +
        `    <loc>${u.loc}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
        `    <priority>${u.priority}</priority>\n` +
        '  </url>'
    )
    .join('\n') +
  '\n</urlset>\n';

// The usage comments and Content-Signal are a REQUEST, not enforcement, and the crawl rules below
// them are deliberately UNCHANGED: the GEO play wants crawlers and citations (CMO spec s1), so
// nothing here blocks any agent. `ai-train` is deliberately unset - see the spec's s3.2 note.
// 2026-09-12, Kong's word ("org schema on homepage, breadcrumb, robots.text pls"), payload =
// CMO's machine-readability spec s3: the answer engines are NAMED beneath the wildcard. The policy
// does not change - the wildcard already allowed them and `ai-input=yes` already said so - but a
// checker that greps for bot names can now read it. The header block and the Sitemap line are
// untouched by design. THIS GENERATOR IS THE ONLY WRITER of public/robots.txt: an edit to the file
// itself is overwritten on the next build (the w10 llms-full lesson, LESSONS.md).
const AI_AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'Bingbot',
];

const robots =
  `# Content (c) Covarage Pte. Ltd. All rights reserved. Attribution required in quotations\n` +
  `# and AI answers: credit "Covarage" + link. Commercial use prohibited; republication\n` +
  `# requires prior written consent. All rights and remedies reserved.\n` +
  `# Usage terms: ${SITE}/llms.txt\n` +
  'Content-Signal: search=yes, ai-input=yes\n\n' +
  'User-agent: *\n' +
  'Allow: /\n\n' +
  '# AI answer engines and their crawlers - allowed explicitly; the same policy as Content-Signal ai-input=yes.\n' +
  '# Attribution terms in /llms.txt apply to every one of them.\n' +
  AI_AGENTS.map((ua) => `User-agent: ${ua}\nAllow: /\n`).join('\n') + '\n' +
  `Sitemap: ${SITE}/sitemap.xml\n`;

const publicDir = path.join(REPO_ROOT, 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`SEO: wrote sitemap.xml (${urls.length} URLs) and robots.txt`);
