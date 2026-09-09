/**
 * scripts/check-cta-placement.mjs - where the in-article enquiry block lands, on every guide.
 *
 * The block is placed by splitting the article body in two and rendering between the halves, so
 * two things can go wrong silently and both are worse than a visible bug: the split can land in
 * the wrong place (an ask before the reader has been told anything), or it can LOSE a line, which
 * would delete article text on up to 524 published pages without failing a build.
 *
 * This runs the real splitter - the same module the page imports, transformed with esbuild, never
 * a second copy of the logic - across every article and asserts both. Placement is asserted per
 * branch, and the branch counts are printed because they are themselves a measurement: the corpus
 * had 481 guides opening with a 60-second answer when the block was specced.
 *
 *   node scripts/check-cta-placement.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const tmp = mkdtempSync(join(tmpdir(), 'cta-'));
const out = join(tmp, 'articleCtas.mjs');
execFileSync('npx', ['esbuild', 'src/content/articleCtas.ts', '--format=esm', '--platform=node', `--outfile=${out}`], { stdio: 'pipe', shell: process.platform === 'win32' });
const { splitAtAnswer, ctaForArticle, CTA_BY_INTENT } = await import(pathToFileURL(out).href);

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

const files = walk(join('content', 'articles'));
const fails = [];
const branch = { answer: 0, blockquote: 0, heading: 0 };
let checked = 0;

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const end = raw.indexOf('\n---', 3);
  const front = raw.slice(0, end);
  const body = raw.slice(end + 5).replace(/^\n+/, '').trim();
  const [before, after] = splitAtAnswer(body);
  checked += 1;
  const name = file.split(sep).slice(-2).join('/');

  // 1. NOTHING MAY BE LOST. The splitter slices the body's lines in two and the page joins
  //    the halves back together with the block between, so the two halves must rebuild the
  //    body exactly. A splitter that drops one line deletes article text on every page it
  //    touches, and no build gate would notice.
  const rebuilt = after ? before + '\n' + after : before;
  if (rebuilt !== body) {
    fails.push(`${name}: the split does not reconstruct the body (${body.length} chars in, ${rebuilt.length} out)`);
  }

  // 2. the block must never be the first thing a reader meets
  if (!before.trim()) { fails.push(`${name}: nothing renders before the block`); continue; }

  // 3. placement, per branch
  const hasAnswer = /^>.*60[- ]second/im.test(body);
  const lastLine = before.trim().split('\n').pop().trim();
  if (hasAnswer) {
    branch.answer += 1;
    if (!lastLine.startsWith('>')) fails.push(`${name}: has a 60-second answer but the block does not follow it (before ends "${lastLine.slice(0, 60)}")`);
  } else if (body.trimStart().startsWith('>')) {
    branch.blockquote += 1;
    if (!lastLine.startsWith('>')) fails.push(`${name}: opens with a blockquote but the block does not follow it`);
  } else {
    branch.heading += 1;
    if (/^#{1,6}\s/.test(lastLine)) fails.push(`${name}: the block sits directly under a bare heading, before any prose`);
  }

  // 4. every article resolves to one of the five CTAs
  const fm = Object.fromEntries(
    front.split('\n').map((l) => {
      const i = l.indexOf(':');
      return i === -1 ? ['', ''] : [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')];
    })
  );
  if (!CTA_BY_INTENT[fm.intent]) fails.push(`${name}: intent ${JSON.stringify(fm.intent)} has no CTA copy`);
}

rmSync(tmp, { recursive: true, force: true });
console.log(`${checked} articles checked`);
console.log(`  after the 60-second answer : ${branch.answer}`);
console.log(`  after a leading blockquote : ${branch.blockquote}`);
console.log(`  after the first heading    : ${branch.heading}`);
if (fails.length) {
  console.error(`\n${fails.length} FAILURE(S):`);
  for (const f of fails.slice(0, 20)) console.error('  ' + f);
  process.exitCode = 1;
} else {
  console.log('\nALL PLACEMENTS PASS');
}
