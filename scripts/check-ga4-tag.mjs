/**
 * scripts/check-ga4-tag.mjs - the GA4 tag reports on production and NOWHERE else.
 *
 * The measurement ID sits in index.html rather than a dashboard setting (Kong, 2026-09-09: "u
 * cant insert a ga4 tag?"), which means every build of this repo carries a live ID: previews,
 * branch deployments and every localhost render a seat does while working. The only thing
 * standing between those and Kong's analytics property is a hostname guard, and a guard nobody
 * tests is a guard that silently stops guarding.
 *
 * Two failures matter equally and neither is visible by looking at a page. Too loose, and the
 * numbers are polluted by our own work. Too tight, and production quietly reports nothing while
 * every dashboard looks merely empty rather than broken.
 *
 * This extracts the real inline script from the BUILT index.html and runs it under four
 * hostnames with a fake document, so it tests what ships, not a copy of it.
 *
 *   node scripts/check-ga4-tag.mjs [dist/index.html]
 */
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';

const file = process.argv[2] || 'dist/index.html';
const html = readFileSync(file, 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const tag = scripts.find((s) => s.includes('gtag'));
if (!tag) {
  console.error(`no inline gtag script found in ${file}`);
  process.exit(1);
}

function run(hostname) {
  const created = [];
  const ctx = createContext({
    window: {},
    location: { hostname },
    document: {
      createElement: () => ({ set src(v) { this._src = v; }, get src() { return this._src; } }),
      head: { appendChild: (el) => created.push(el.src) },
    },
  });
  ctx.window = ctx;
  runInContext(tag, ctx);
  return { loaded: created[0] || null, dataLayer: ctx.dataLayer || [] };
}

const EXPECT = [
  ['covarage.com', true],
  ['www.covarage.com', true],
  ['cova-home-abc123-hellokonglee-gmailcoms-projects.vercel.app', false],
  ['localhost', false],
];

let ok = 0;
const fails = [];
for (const [host, shouldReport] of EXPECT) {
  const { loaded, dataLayer } = run(host);
  const reports = Boolean(loaded);
  const configured = dataLayer.filter((a) => Array.from(a)[0] === 'config').map((a) => Array.from(a)[1]);
  if (reports !== shouldReport) {
    fails.push(`${host}: reports=${reports}, expected ${shouldReport}`);
    console.log(`FAIL  ${host.padEnd(56)} reports=${reports} expected=${shouldReport}`);
    continue;
  }
  if (shouldReport) {
    if (!/^G-[A-Z0-9]+$/.test(configured[0] || '')) {
      fails.push(`${host}: configured id ${JSON.stringify(configured[0])}`);
      console.log(`FAIL  ${host.padEnd(56)} configured id ${JSON.stringify(configured[0])}`);
      continue;
    }
    if (!loaded.includes(configured[0])) {
      fails.push(`${host}: loader id does not match the configured id`);
      console.log(`FAIL  ${host.padEnd(56)} loader/config id mismatch`);
      continue;
    }
    console.log(`PASS  ${host.padEnd(56)} reports as ${configured[0]}`);
  } else {
    console.log(`PASS  ${host.padEnd(56)} silent`);
  }
  ok += 1;
}

console.log(`\n${ok}/${EXPECT.length} hosts behave`);
if (fails.length) { console.error('FAILURES:\n' + fails.join('\n')); process.exitCode = 1; }
