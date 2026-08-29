/**
 * Generates /feed.xml - RSS 2.0 of the guides corpus (newsfeed v0, build order item 16).
 *
 * The site's OWN feed, nothing ingested: the 50 newest guides from the same committed
 * corpus the pages build from (content/articles-index.json), newest first. Titles and
 * descriptions are the corpus's own gate-approved strings, XML-escaped, never rewritten.
 *
 * Runs from the build script alongside gen-seo.mjs and gen-llms.mjs; writes public/feed.xml
 * so the artifact ships with the static build. lastBuildDate follows the newest item, not
 * the build clock, so the file only changes when content does.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SITE = 'https://covarage.com';
const GUIDES = '/guides';
const CAP = 50;

const index = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'content', 'articles-index.json'), 'utf8'));
const articles = Array.isArray(index) ? index : index.articles;
if (!Array.isArray(articles) || articles.length === 0) {
  console.error('gen-feed: articles-index.json yielded no articles');
  process.exit(1);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
}

/** RFC 822 date at Singapore midnight - `published` is a date, not an instant. */
function rfc822(published) {
  const d = new Date(`${published}T00:00:00+08:00`);
  if (Number.isNaN(d.getTime())) return null;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const p = (n) => String(n).padStart(2, '0');
  return `${days[d.getUTCDay()]}, ${p(d.getUTCDate())} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} 00:00:00 +0800`;
}

const newest = [...articles]
  .filter((a) => a.title && a.slug && a.published && rfc822(a.published))
  .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : a.slug < b.slug ? -1 : 1))
  .slice(0, CAP);

if (newest.length === 0) {
  console.error('gen-feed: no articles carried a parsable published date');
  process.exit(1);
}

const items = newest.map((a) => {
  const url = `${SITE}${GUIDES}${a.slug}`;
  return [
    '    <item>',
    `      <title>${esc(a.title)}</title>`,
    `      <link>${esc(url)}</link>`,
    `      <guid isPermaLink="true">${esc(url)}</guid>`,
    `      <pubDate>${rfc822(a.published)}</pubDate>`,
    `      <description>${esc(a.meta_description || '')}</description>`,
    '    </item>',
  ].join('\n');
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  '    <title>Covarage Guides</title>',
  `    <link>${SITE}/blog</link>`,
  // The blog index's own approved description, character for character.
  '    <description>Clear, sourced answers to the insurance questions Singapore business owners actually ask. No jargon, no sales pitch.</description>',
  '    <language>en-sg</language>',
  '    <copyright>(c) Covarage Pte. Ltd. All rights reserved. Attribution required in quotation; republication requires prior written consent.</copyright>',
  `    <lastBuildDate>${rfc822(newest[0].published)}</lastBuildDate>`,
  `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
  ...items,
  '  </channel>',
  '</rss>',
  '',
].join('\n');

fs.writeFileSync(path.join(REPO_ROOT, 'public', 'feed.xml'), xml);
console.log(`gen-feed: ${newest.length} items (of ${articles.length} articles), newest ${newest[0].published}`);
