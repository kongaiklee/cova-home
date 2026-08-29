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

/** Static + per-article URLs. lastmod uses the article publish date. */
const urls = [
  { loc: `${SITE}/`, lastmod: null, priority: '1.0' },
  { loc: `${SITE}/blog`, lastmod: null, priority: '0.9' },
  { loc: `${SITE}/updates`, lastmod: updates.reviewed?.date ?? null, priority: '0.7' },
  { loc: `${SITE}/guides/tools/insurance-gap-check`, lastmod: null, priority: '0.6' },
  { loc: `${SITE}/contact`, lastmod: null, priority: '0.5' },
  { loc: `${SITE}/careers`, lastmod: null, priority: '0.5' },
  { loc: `${SITE}/terms`, lastmod: null, priority: '0.3' },
  { loc: `${SITE}/privacy`, lastmod: null, priority: '0.3' },
  ...articles.map((a) => ({
    loc: `${SITE}/guides${a.slug}`,
    lastmod: a.published,
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
const robots =
  `# Content (c) Covarage Pte. Ltd. All rights reserved. Attribution required in quotations\n` +
  `# and AI answers: credit "Covarage" + link. Commercial use prohibited; republication\n` +
  `# requires prior written consent. All rights and remedies reserved.\n` +
  `# Usage terms: ${SITE}/llms.txt\n` +
  'Content-Signal: search=yes, ai-input=yes\n\n' +
  'User-agent: *\n' +
  'Allow: /\n\n' +
  `Sitemap: ${SITE}/sitemap.xml\n`;

const publicDir = path.join(REPO_ROOT, 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`SEO: wrote sitemap.xml (${urls.length} URLs) and robots.txt`);
