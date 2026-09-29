#!/usr/bin/env node
/**
 * check-tool-links.mjs - fail the build when a tool's "Read the guide" link names no article.
 *
 * WHY IT EXISTS. The Insurance Gap Check held 15 article paths in the old /<category>/<slug>
 * form and rendered them as client-side links. The router serves articles only under /guides,
 * so every click inside the tool landed on the 404 page (the 308 in vercel.json only helps a
 * full page load). Found live 2026-09-28. The links now go through articleUrl(); this check
 * keeps every path they carry an article that exists.
 *
 * WHAT IT CHECKS: every string literal in the tool's data file that starts with '/' is a slug
 * in content/articles-index.json. A path that is not an article, or a /guides/... path (which
 * articleUrl() would prefix twice), fails. So does a file that yields no paths at all, so a
 * rewrite of the file cannot quietly turn this check off.
 *
 * EXIT 0 only when every tool link names an article.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.argv[2] || '.';
const TOOL_FILES = ['src/pages/tools/insuranceGap.ts'];
const index = JSON.parse(readFileSync(join(ROOT, 'content', 'articles-index.json'), 'utf8'));
const slugs = new Set(index.map((a) => a.slug));

let checked = 0;
const bad = [];
for (const rel of TOOL_FILES) {
  const src = readFileSync(join(ROOT, rel), 'utf8');
  const paths = [...src.matchAll(/(['"`])(\/[^'"`\s]*)\1/g)].map((m) => m[2]);
  if (!paths.length) bad.push(`${rel}: no article paths found - the check would pass on nothing`);
  for (const p of paths) {
    checked++;
    if (!slugs.has(p)) bad.push(`${rel}: ${p} is not an article slug in content/articles-index.json`);
  }
}

if (bad.length) {
  console.error(`check-tool-links: FAILED (${bad.length})`);
  bad.forEach((b) => console.error(`  ${b}`));
  process.exit(1);
}
console.log(`check-tool-links: ${checked} tool links, every one an article. OK`);
