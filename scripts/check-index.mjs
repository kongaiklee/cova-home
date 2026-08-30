#!/usr/bin/env node
/**
 * check-index.mjs - fail the build when articles-index.json disagrees with article frontmatter.
 *
 * WHY IT EXISTS. The corpus is corrected in place (this repo does not re-run migrate), so the
 * article .md files are the source of truth and the index is a derived copy. Nothing forced them
 * to agree, and they drifted: the desk measured 38 rows where the index carried a different
 * meta_description from the article's own frontmatter, 2026-08-30.
 *
 * WHAT DRIFT ACTUALLY COSTS, which is why this is a build gate and not a lint:
 *   - the PAGE renders from frontmatter, so a visitor sees one description
 *   - gen-seo, gen-llms and gen-feed all read the INDEX, so llms.txt and the RSS feed publish
 *     a different one
 * Two sources, two answers, and neither surface looks broken on its own. That is the shape that
 * survives review.
 *
 * Checks, all of them cheap:
 *   1. every article has an index row, and every index row has an article
 *   2. index title and meta_description equal the article's frontmatter
 *   3. og_description equals meta_description (they are one string in this corpus by measurement,
 *      524 of 524 on 2026-08-30 - if they are ever meant to diverge, relax this rule deliberately)
 *   4. no meta_description is a truncated body excerpt (ends in an ellipsis) - the defect the
 *      524-description rewrite removed; this keeps it removed
 *
 * Fix drift with:  python nodes/tm/tools/sync_index.py <repo-root>
 *
 * EXIT 0 only when the index and the corpus say the same thing.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.argv[2] || '.';
const ARTICLES = join(ROOT, 'content', 'articles');
const INDEX = join(ROOT, 'content', 'articles-index.json');

/** Read one scalar out of the leading frontmatter block. */
function fm(text, field) {
  const end = text.indexOf('\n---', 4);
  const head = end === -1 ? text : text.slice(0, end);
  const m = head.match(new RegExp(`^${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*$`, 'm'));
  return m ? m[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\') : null;
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.md')) out.push(p);
  }
  return out;
}

const files = walk(ARTICLES);
const bySlug = new Map();
for (const f of files) {
  const t = readFileSync(f, 'utf8');
  const slug = fm(t, 'slug');
  if (!slug) continue;
  bySlug.set(slug, {
    file: f,
    title: fm(t, 'title'),
    meta_description: fm(t, 'meta_description'),
    og_description: fm(t, 'og_description'),
  });
}

const index = JSON.parse(readFileSync(INDEX, 'utf8'));
const problems = [];

for (const row of index) {
  const a = bySlug.get(row.slug);
  if (!a) {
    problems.push(`index row has no article: ${row.slug}`);
    continue;
  }
  if (a.title !== row.title) problems.push(`title drift: ${row.slug}`);
  if (a.meta_description !== row.meta_description) problems.push(`meta_description drift: ${row.slug}`);
}
for (const [slug, a] of bySlug) {
  if (!index.some((r) => r.slug === slug)) problems.push(`article missing from index: ${slug}`);
  if (a.og_description !== a.meta_description) problems.push(`og_description != meta_description: ${slug}`);
  if (a.meta_description && /(\.\.\.|…)$/.test(a.meta_description)) {
    problems.push(`meta_description is a truncated excerpt: ${slug}`);
  }
}

if (problems.length) {
  console.error(`check-index: ${problems.length} problem(s) across ${files.length} articles`);
  for (const p of problems.slice(0, 20)) console.error(`  ${p}`);
  if (problems.length > 20) console.error(`  ... and ${problems.length - 20} more`);
  console.error('\nfix with: python nodes/tm/tools/sync_index.py <repo-root>');
  process.exitCode = 1;
} else {
  console.log(`check-index: ${files.length} articles, index agrees with frontmatter. OK`);
}
