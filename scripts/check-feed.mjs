#!/usr/bin/env node
/**
 * check-feed.mjs - the feed validator, wired into the build (plan M1; the R22 candidate named at
 * w5 close). gen-feed.mjs writes public/feed.xml; this fails the build if what it wrote is not a
 * well-formed RSS 2.0 feed a reader would accept. Dependency-free on purpose.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// 2026-09-11: three feeds since the split (site = guides + <= 10 regulatory; two topic feeds in full).
const FEEDS = ['feed.xml', 'updates/feed.xml', 'updates/cyber/feed.xml'];
let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) fails++; };
let total = 0;
for (const rel of FEEDS) {
  const FEED = path.join(REPO_ROOT, 'public', rel);


  if (!fs.existsSync(FEED)) {
    console.error(`check-feed: public/${rel} missing - run gen-feed.mjs first`);
    process.exit(1);
  }
  const xml = fs.readFileSync(FEED, 'utf8');

  ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'XML declaration first');
  ok(/<rss version="2.0"/.test(xml), 'rss 2.0 root');
  ok(/<\/rss>\s*$/.test(xml), 'root closes at EOF');

  const channel = xml.match(/<channel>([\s\S]*)<\/channel>/)?.[1] ?? '';
  ok(channel.length > 0, 'channel element present');
  for (const tag of ['title', 'link', 'description', 'lastBuildDate']) {
    ok(new RegExp(`<${tag}>[^<]+</${tag}>`).test(channel), `channel ${tag} present and non-empty`);
  }
  const lastBuild = channel.match(/<lastBuildDate>([^<]+)<\/lastBuildDate>/)?.[1];
  ok(!!lastBuild && !Number.isNaN(Date.parse(lastBuild)), 'lastBuildDate parses as a date');

  const items = channel.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  ok(items.length > 0 && (rel !== 'feed.xml' || items.length <= 50), `${rel}: item count ${rel === 'feed.xml' ? '1..50' : '1+'} (got ${items.length})`);

  let itemDefects = 0;
  const guids = new Set();
  for (const item of items) {
    const link = item.match(/<link>([^<]+)<\/link>/)?.[1];
    const guid = item.match(/<guid[^>]*>([^<]+)<\/guid>/)?.[1];
    const pub = item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1];
    const title = item.match(/<title>([\s\S]+?)<\/title>/)?.[1];
    if (!title || !link || !guid || !pub) itemDefects++;
    else {
      if (!link.startsWith('https://covarage.com/')) itemDefects++;
      if (Number.isNaN(Date.parse(pub))) itemDefects++;
      if (guids.has(guid)) itemDefects++;
      guids.add(guid);
    }
  }
  ok(itemDefects === 0, `every item carries title/link/guid/pubDate, absolute covarage.com link, valid date, unique guid (${itemDefects} defects)`);

  // Unescaped ampersands are the classic hand-rolled-XML breaker.
  ok(!/&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(xml), 'no raw unescaped ampersands');


  total += items.length;
}
if (fails) {
  console.error(`check-feed: ${fails} check(s) failed`);
  process.exit(1);
}
console.log(`check-feed: OK (${total} items across ${FEEDS.length} feeds)`);
