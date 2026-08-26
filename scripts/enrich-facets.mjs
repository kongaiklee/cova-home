#!/usr/bin/env node
/**
 * enrich-facets.mjs - write `industries` and `agencies` into every committed article's frontmatter
 * and into content/articles-index.json, derived from the article itself (scripts/lib/facets.mjs).
 *
 * WHY THIS EXISTS AND WHY migrate-articles.mjs IS NOT RUN INSTEAD. The migration regenerates the
 * corpus from the SEO master, which is dated 2026-06-01. The committed corpus was corrected on
 * 2026-08-23 (861 false regulatory claims removed, pricing re-cut). Re-running the migration would
 * reintroduce every one of them. The master is an ancestor, not the source of truth; the committed
 * files are. So facets are derived from the committed files, and the migration ALSO emits them via
 * the same module for the day the master is re-cut.
 *
 * Idempotent: an existing `industries:` / `agencies:` / `required_by_law:` line is replaced,
 * never duplicated. `required_by_law` is enforced FROM content/required-by-law.json - CMO's
 * curated two-value map (2026-08-26): `cover` = statute or licence requires HOLDING the
 * insurance, `duty` = the law requires an act or standard. NEVER a boolean: one heading over
 * both would publish a false compliance claim. A mapped slug with no article fails the run
 * (the dead-slug class the curation itself caught). Each file keeps its own line endings.
 *
 * Usage:
 *   node scripts/enrich-facets.mjs               write frontmatter + index
 *   node scripts/enrich-facets.mjs --check       derive only; exit 1 if any file or the index is stale
 *   node scripts/enrich-facets.mjs --self-test   prove the derivation on a synthetic article
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deriveFacets, agencyCounts, agencyFor } from './lib/facets.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES = path.join(ROOT, 'content', 'articles');
const INDEX = path.join(ROOT, 'content', 'articles-index.json');
const REQUIRED = path.join(ROOT, 'content', 'required-by-law.json');
const args = new Set(process.argv.slice(2));

const yaml = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const fmLine = (key, list) => `${key}: [${list.map(yaml).join(', ')}]`;

function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith('.md')) out.push(p);
  }
  return out;
}

/** Returns { next, facets, required, slug } for one file's text, or null if it has no frontmatter. */
export function enrichText(raw, requiredMap = new Map()) {
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return null;
  const head = m[1];
  const get = (k) => (head.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm')) || [null, ''])[1];
  const title = get('title');
  const slug = get('slug');
  const facets = deriveFacets(title, slug, text);
  const required = requiredMap.get(slug) ?? null;
  // strip any previous facet/required lines (a legacy boolean included), then insert after topics:
  const lines = head.split('\n').filter((l) => !/^(industries|agencies|required_by_law):/.test(l));
  const at = lines.findIndex((l) => l.startsWith('topics:'));
  const insert = [fmLine('industries', facets.industries), fmLine('agencies', facets.agencies)];
  if (required) insert.push(`required_by_law: ${yaml(required)}`);
  if (at >= 0) lines.splice(at + 1, 0, ...insert);
  else lines.push(...insert);
  const next = text.replace(m[0], `---\n${lines.join('\n')}\n---\n`).replace(/\n/g, eol);
  return { next, facets, required, slug };
}

function loadRequiredMap() {
  const req = JSON.parse(fs.readFileSync(REQUIRED, 'utf8'));
  const map = new Map();
  for (const value of ['cover', 'duty']) for (const s of req[value] ?? []) map.set(s, value);
  return map;
}

function main() {
  if (args.has('--self-test')) return selfTest();
  const check = args.has('--check');
  const requiredMap = loadRequiredMap();
  const bySlug = new Map();
  let changed = 0;
  let files = 0;
  for (const p of walk(ARTICLES)) {
    const raw = fs.readFileSync(p, 'utf8');
    const r = enrichText(raw, requiredMap);
    if (!r) {
      console.error(`no frontmatter: ${p}`);
      process.exit(2);
    }
    files++;
    bySlug.set(r.slug, r);
    if (r.next !== raw) {
      changed++;
      if (!check) fs.writeFileSync(p, r.next, 'utf8');
    }
  }
  const unseen = [...requiredMap.keys()].filter((s) => !bySlug.has(s));
  if (unseen.length) {
    console.error(`required-by-law.json names ${unseen.length} slug(s) with no article: ${unseen.join(', ')}`);
    process.exit(2);
  }
  const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  let indexChanged = 0;
  let missing = 0;
  for (const a of index) {
    const r = bySlug.get(a.slug);
    if (!r) {
      missing++;
      continue;
    }
    const before = JSON.stringify([a.industries, a.agencies, a.required_by_law]);
    a.industries = r.facets.industries;
    a.agencies = r.facets.agencies;
    if (r.required) a.required_by_law = r.required;
    else delete a.required_by_law;
    if (JSON.stringify([a.industries, a.agencies, a.required_by_law]) !== before) indexChanged++;
  }
  if (!check && indexChanged) fs.writeFileSync(INDEX, JSON.stringify(index, null, 2) + '\n', 'utf8');
  const verb = check ? 'stale' : 'written';
  console.log(
    `enrich-facets: ${files} files (${changed} ${verb}), index ${index.length} rows (${indexChanged} ${check ? 'stale' : 'updated'}), ${missing} index rows without a file`
  );
  if (check && (changed || indexChanged)) {
    console.error('enrich-facets: STALE - run without --check');
    process.exit(1);
  }
}

function selfTest() {
  const md = [
    '---',
    'title: "Opening a Cafe in Singapore: Full Insurance Checklist"',
    'slug: "/decision-tree/opening-cafe-checklist"',
    'category: "decision-tree"',
    'topics: ["Work Injury (WICA)", "Public Liability"]',
    'industries: ["stale"]',
    '---',
    'Under [WICA](https://sso.agc.gov.sg/Act/WICA2019) and [MOM](https://www.mom.gov.sg/wica) and [MOM again](https://www.mom.gov.sg/x) and [SFA](https://www.sfa.gov.sg/food-retail) and [MSIG](https://www.msig.com.sg/w.pdf) and [a blog](https://www.blog.com/x).',
  ].join('\n');
  const r = enrichText(md);
  const c = agencyCounts(md);
  const reqMap = new Map([['/decision-tree/opening-cafe-checklist', 'cover']]);
  const withReq = enrichText(md, reqMap);
  const legacyBool = enrichText(md.replace('---\nUnder', 'required_by_law: true\n---\nUnder'));
  const checks = [
    ['industry from title', r.facets.industries.includes('F&B')],
    ['agency counted per link', c.MOM === 2 && c.SFA === 1 && c['Singapore Statutes'] === 1],
    ['an insurer is not an agency', !('MSIG' in c) && Object.keys(c).length === 3],
    ['unknown gov.sg subdomain gets its name', agencyFor('www.mindef.gov.sg') === 'MINDEF'],
    ['a blog is nothing', agencyFor('www.blog.com') === null],
    ['stale line replaced, not duplicated', (r.next.match(/^industries:/gm) || []).length === 1 && !r.next.includes('"stale"')],
    ['facet lines sit under topics', /topics:.*\nindustries:.*\nagencies:/.test(r.next)],
    ['idempotent', enrichText(r.next).next === r.next],
    ['crlf preserved', enrichText(md.replace(/\n/g, '\r\n')).next.includes('\r\n')],
    ['mapped slug gets its string value', /^required_by_law: "cover"$/m.test(withReq.next) && withReq.required === 'cover'],
    ['unmapped article carries no required line', !/required_by_law/.test(r.next)],
    ['a legacy boolean line is stripped, never carried', !/required_by_law/.test(legacyBool.next) && legacyBool.required === null],
    ['idempotent with the map', enrichText(withReq.next, reqMap).next === withReq.next],
  ];
  let fail = 0;
  for (const [n, ok] of checks) {
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${n}`);
    if (!ok) fail++;
  }
  console.log(fail ? `SELF-TEST FAILED (${fail})` : 'SELF-TEST PASSED');
  process.exit(fail ? 1 : 0);
}

main();
