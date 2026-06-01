/**
 * Audits internal article-to-article links in the migrated content.
 *
 * For every Markdown link to an internal path it reports:
 *   SELF    - the link points at the article's own slug
 *   BROKEN  - the target is not an article anywhere in the master corpus
 *   PENDING - the target exists in the master but is not migrated yet
 *   OK      - the target is a migrated article
 *
 * Usage: node scripts/audit-links.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const MASTER_PATH =
  process.env.COVA_MASTER ||
  'D:\\vault\\Covarage - Working folder\\SEO\\COVA_SEO_Article_Master.md';
const ARTICLES_DIR = path.join(REPO_ROOT, 'content', 'articles');

// Universe of valid article slugs = every slug in the master.
const master = fs.readFileSync(MASTER_PATH, 'utf8').replace(/\r\n/g, '\n');
const corpus = new Set(
  [...master.matchAll(/^\*\*URL slug:\*\*\s*`?(\/[^\s`\n]+)/gm)].map((m) =>
    m[1].replace(/`/g, '').replace(/\/+$/, '')
  )
);

// Every migrated .md file.
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}
const files = fs.existsSync(ARTICLES_DIR) ? walk(ARTICLES_DIR) : [];
const migrated = new Set();
for (const f of files) {
  const m = fs.readFileSync(f, 'utf8').match(/^slug:\s*"([^"]+)"/m);
  if (m) migrated.add(m[1]);
}

const tally = { OK: 0, PENDING: 0, BROKEN: 0, SELF: 0, ANCHOR: 0 };
const problems = [];

for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const ownSlug = raw.match(/^slug:\s*"([^"]+)"/m)?.[1];
  // Every Markdown link; external https links are skipped.
  for (const m of raw.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^https?:/i.test(target)) continue;
    let status;
    if (target.startsWith('#')) {
      status = 'ANCHOR'; // dead single-document fragment
    } else if (target.startsWith('/')) {
      const slug = target.replace(/[#?].*$/, '').replace(/\/+$/, '');
      if (slug === ownSlug) status = 'SELF';
      else if (migrated.has(slug)) status = 'OK';
      else if (corpus.has(slug)) status = 'PENDING';
      else status = 'BROKEN';
    } else {
      continue; // relative or other, not audited
    }
    tally[status]++;
    if (status !== 'OK' && status !== 'PENDING') {
      problems.push(`  ${status}  ${ownSlug}  ->  ${target}`);
    }
  }
}

console.log(`Corpus: ${corpus.size} article slugs in master.`);
console.log(`Migrated: ${migrated.size} articles.`);
console.log(
  `Internal links: ${tally.OK} OK, ${tally.PENDING} pending migration, ` +
    `${tally.SELF} self-links, ${tally.ANCHOR} dead anchors, ${tally.BROKEN} broken.`
);
if (problems.length) {
  console.log('\nProblems (self-links, dead anchors, broken targets):');
  problems.slice(0, 40).forEach((p) => console.log(p));
  if (problems.length > 40) console.log(`  ... and ${problems.length - 40} more`);
} else {
  console.log('\nNo self-links, dead anchors or broken targets.');
}
