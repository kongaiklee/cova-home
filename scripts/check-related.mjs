#!/usr/bin/env node
/**
 * check-related.mjs - fail the build when a guide's Related Information list breaks the house shape.
 *
 * WHY IT EXISTS. Every other link check reads only lines already written as links, so a Related
 * entry that should have been a link and was not - a bare /category/slug path, a plain title, a
 * link to a page that does not exist - passed every check for four months: 194 broken entries
 * stayed live until the Related repair (CMO Part A, 2026-09-28). This keeps them from coming back.
 *
 * THE HOUSE SHAPE (CMO route working/CMO_ROUTE_tm-safeguards_2026-09-28.md item 4; the same rules
 * as cmo/tools/CMO_article_gate.py RELATED-SHAPE / RELATED-TITLE). Every guide has one
 * `## Related Information` (or ###) heading, and under it, for every item:
 *   - [<the target's exact title>](/<category>/<slug>)
 * optionally followed by ` - <a short description>` (Kong 2026-09-28 12:03, "keep"). Rules:
 *   R1 SHAPE    every `- ` line is a Markdown link to /<category>/<slug>, nothing before it
 *   R2 TARGET   the target is an article in content/articles-index.json
 *   R3 TITLE    the link text is the target's title, exactly
 *   R4 NUMBER   no internal article number after the link ("Article 397", "(article 411)")
 *   R5 URLTEXT  the link text is not a web address
 *   R6 EMPTY    the list has at least one item
 *   R7 BLANK    a blank line separates the list from the `*Published` line (otherwise Markdown
 *               folds the Published line into the last bullet)
 *   R8 HEADING  exactly one Related Information heading per guide
 * A group label line ending in ':' and blank lines are allowed between items; any other line is R1.
 *
 * EXIT 0 only when every guide's list keeps the shape. Every failure names its rule, file and line.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.argv[2] || '.';
const ARTICLES = join(ROOT, 'content', 'articles');
const index = JSON.parse(readFileSync(join(ROOT, 'content', 'articles-index.json'), 'utf8'));
const titles = new Map(index.map((a) => [a.slug, a.title]));

const HEAD = /^#{2,3} Related Information[ \t]*$/;
const STOP = /^(\*Published|#{1,3} |---)/;
// link text may hold one level of balanced brackets: "OCBC v Argoglobal [2025] SGHC 82" is a title
const ITEM = /^- \[((?:[^[\]]|\[[^[\]]*\])+)\]\((\/[a-z0-9-]+\/[a-z0-9-]+(?:\/[a-z0-9-]+)?)\)(?: - (.*\S))?\s*$/;
const NUMBER = /\b[Aa]rticle\s+\d/;
const URLTEXT = /^(?:https?:\/\/|www\.|covarage\.com)/i;

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : n.endsWith('.md') ? [p] : [];
  });
}

const fails = [];
let guides = 0;
let items = 0;
for (const file of walk(ARTICLES)) {
  guides++;
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  const heads = lines.map((l, i) => (HEAD.test(l) ? i : -1)).filter((i) => i >= 0);
  if (heads.length !== 1) {
    fails.push(`R8 HEADING ${rel}: ${heads.length} Related Information headings, want 1`);
    if (!heads.length) continue;
  }
  const start = heads[0] + 1;
  let end = start;
  while (end < lines.length && !STOP.test(lines[end])) end++;
  let count = 0;
  for (let i = start; i < end; i++) {
    const line = lines[i];
    const at = `${rel}:${i + 1}`;
    if (!line.trim() || (!line.startsWith('- ') && line.trim().endsWith(':'))) continue;
    const m = line.match(ITEM);
    if (!m) {
      fails.push(`R1 SHAPE   ${at}: not "- [Title](/category/slug)": ${line.slice(0, 100)}`);
      continue;
    }
    count++;
    const [, text, slug, desc] = m;
    if (!titles.has(slug)) fails.push(`R2 TARGET  ${at}: ${slug} is not an article in the index`);
    else if (text !== titles.get(slug))
      fails.push(`R3 TITLE   ${at}: link text "${text.slice(0, 80)}" is not the target's title "${titles.get(slug)}"`);
    if (desc && NUMBER.test(desc)) fails.push(`R4 NUMBER  ${at}: an article number after the link: ${desc.slice(0, 80)}`);
    if (URLTEXT.test(text)) fails.push(`R5 URLTEXT ${at}: the link text is a web address: ${text.slice(0, 80)}`);
  }
  items += count;
  if (!count) fails.push(`R6 EMPTY   ${rel}:${heads[0] + 1}: the Related Information list has no items`);
  if (end < lines.length && lines[end].startsWith('*Published') && lines[end - 1].trim() !== '')
    fails.push(`R7 BLANK   ${rel}:${end + 1}: no blank line between the list and the *Published line`);
}

if (fails.length) {
  console.error(`check-related: FAILED - ${fails.length} defect(s) across ${guides} guides`);
  fails.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log(`check-related: ${guides} guides, ${items} Related links, every list in the house shape. OK`);
