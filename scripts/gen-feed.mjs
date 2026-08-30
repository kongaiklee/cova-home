/**
 * Generates /feed.xml - RSS 2.0 of the guides corpus PLUS the /updates items (newsfeed v0, item
 * 16; the /updates fold ruled by CPO 2026-08-30 - ONE feed, not two, because one feed is one
 * thing to keep correct).
 *
 * WHY AN UPDATE LINKS TO covarage.com/updates AND NOT STRAIGHT TO THE REGULATOR: check-feed.mjs
 * requires every item link to be an absolute covarage.com URL, and that rule is right - a feed
 * published under our channel should not send a reader off-domain from the link itself. The
 * source's own URL rides in the description with its attribution, exactly as the /updates page
 * shows it. Update guids are therefore synthetic and isPermaLink="false", because guids must be
 * unique and every update shares the one link.
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
const updatesFile = path.join(REPO_ROOT, 'content', 'updates.json');
const updates = fs.existsSync(updatesFile) ? JSON.parse(fs.readFileSync(updatesFile, 'utf8')) : { items: [] };
const articles = Array.isArray(index) ? index : index.articles;
if (!Array.isArray(articles) || articles.length === 0) {
  console.error('gen-feed: articles-index.json yielded no articles');
  process.exit(1);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
}

/**
 * RFC 822 date at Singapore midnight - `published` is a date, not an instant.
 *
 * PARSED AS Z, LABELLED +0800, and the two must not be mixed. Parsing SG midnight
 * (`...T00:00:00+08:00`) gives an instant that is 16:00 UTC on the PREVIOUS day, so reading it
 * back with getUTC* printed every pubDate one day early - `2026-08-28` shipped as `Thu, 27 Aug`.
 * Parsing as Z makes the UTC getters return the calendar date that was asked for, and the
 * weekday that actually belongs to it. Found 2026-08-30 while folding /updates in, where a
 * dated news item made the slip visible; it had been wrong for every guide since the feed shipped.
 */
function rfc822(published) {
  const d = new Date(`${published}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const p = (n) => String(n).padStart(2, '0');
  return `${days[d.getUTCDay()]}, ${p(d.getUTCDate())} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} 00:00:00 +0800`;
}

/** A stable, unique guid for an update - they all share one link, and guids must not collide. */
function updateGuid(u) {
  const key = String(u.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
  return `covarage-update-${u.date}-${key}`;
}

const guideEntries = articles
  .filter((a) => a.title && a.slug && a.published && rfc822(a.published))
  .map((a) => {
    const url = `${SITE}${GUIDES}${a.slug}`;
    return {
      date: a.published, sort: a.slug, title: a.title,
      link: url, guid: url, permalink: true,
      description: a.meta_description || '', category: null,
    };
  });

// Source headlines are carried VERBATIM with attribution - updates.json's own contract. The
// description names the publisher and its canonical URL, so the attribution travels with the
// item into any reader, where the surrounding channel is OURS and the headline is not.
const updateEntries = (updates.items || [])
  .filter((u) => u.title && u.date && u.url && u.source && rfc822(u.date))
  .map((u) => ({
    date: u.date, sort: u.title, title: u.title,
    link: `${SITE}/updates`, guid: updateGuid(u), permalink: false,
    description: `Published by ${u.source}. Source: ${u.url}`,
    category: 'Official update',
  }));

const newest = [...guideEntries, ...updateEntries]
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.sort < b.sort ? -1 : 1))
  .slice(0, CAP);

if (newest.length === 0) {
  console.error('gen-feed: no guide or update carried a parsable date');
  process.exit(1);
}

const items = newest.map((e) => [
  '    <item>',
  `      <title>${esc(e.title)}</title>`,
  `      <link>${esc(e.link)}</link>`,
  `      <guid isPermaLink="${e.permalink}">${esc(e.guid)}</guid>`,
  `      <pubDate>${rfc822(e.date)}</pubDate>`,
  ...(e.category ? [`      <category>${esc(e.category)}</category>`] : []),
  `      <description>${esc(e.description)}</description>`,
  '    </item>',
].join('\n'));

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
  `    <lastBuildDate>${rfc822(newest[0].date)}</lastBuildDate>`,
  `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
  ...items,
  '  </channel>',
  '</rss>',
  '',
].join('\n');

fs.writeFileSync(path.join(REPO_ROOT, 'public', 'feed.xml'), xml);
const nUpd = newest.filter((e) => e.category).length;
console.log(`gen-feed: ${newest.length} items - ${newest.length - nUpd} guides + ${nUpd} updates (pool ${guideEntries.length} + ${updateEntries.length}), newest ${newest[0].date}`);
