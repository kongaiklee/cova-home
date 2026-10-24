/**
 * scripts/inject-shell.mjs - the pages served as their own files carry THE site's header and footer.
 *
 * Kong 2026-10-24 23:06: "make sure all the pages not touched are updated so the headers, dropdown menu and links are all consistenet.
 * for example the investor page logo doesnt link back to home." covarage.com/investors is a whole page of its own (public/investors.html,
 * outside the app), so it cannot render LanderHeader itself. vite-react-ssg pre-renders the header and footer once, as dist/_shell.html
 * (src/pages/SiteShell.tsx); this script copies them into each page below where it carries `<div data-site-header></div>` and
 * `<div data-site-footer></div>` (not comments: the investor page's own build strips every comment), then deletes dist/_shell.html. The copy is the build's own, so its links, words and guide counts never drift from the homepage's.
 *
 * Each part sits in a shadow root (declarative, `<template shadowrootmode="open">`) holding the site's own stylesheet: the site's styles
 * and the page's never touch each other. The phone menu is drawn closed and opened by a few lines of script, as the app's own button does.
 * Fails the build on: no dist/_shell.html; a page whose markers are not there exactly once; a header or footer not found in the shell.
 *
 *   node scripts/inject-shell.mjs [dist]
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const PAGES = ['investors.html'];
const HEAD = '<div data-site-header></div>';
const FOOT = '<div data-site-footer></div>';
const shellPath = [join(dist, '_shell.html'), join(dist, '_shell', 'index.html')].find((p) => existsSync(p));
const fail = (why) => { console.error(`inject-shell: ${why}`); process.exit(1); };
if (!shellPath) fail(`no _shell.html in ${dist} - is the _shell route still in src/routes/index.tsx?`);

const shell = readFileSync(shellPath, 'utf8');
const header = shell.match(/<header\b[\s\S]*?<\/header>/i)?.[0];
const footer = shell.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0];
// the phone menu sits just after the header in the shell (closed), so the header's own links are exactly the homepage's
const menu = shell.match(/<nav\b[^>]*id="site-menu"[\s\S]*?<\/nav>/i)?.[0];
if (!header || !footer || !menu) fail('the shell page has no <header>, no phone menu or no <footer>');
const css = [...shell.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/gi)].map((m) => m[0]).join('');
if (!css) fail('the shell page links no stylesheet');

const part = (cls, html, style) =>
  `<div class="${cls}" style="${style}"><template shadowrootmode="open">${css}<style>:host{display:block}</style>${html}</template></div>`;
const MENU = `<script>(function(){var h=document.querySelector('.site-shell-head'),r=h&&h.shadowRoot;if(!r)return;` +
  `var b=r.querySelector('[aria-controls="site-menu"]'),n=r.getElementById('site-menu');if(!b||!n)return;` +
  `b.addEventListener('click',function(){var o=n.hasAttribute('hidden');if(o)n.removeAttribute('hidden');else n.setAttribute('hidden','');` +
  `b.setAttribute('aria-expanded',String(o));b.setAttribute('aria-label',o?'Close menu':'Open menu');});})();</script>`;

for (const name of PAGES) {
  const p = join(dist, name);
  let page = readFileSync(p, 'utf8');
  for (const mark of [HEAD, FOOT]) {
    const n = page.split(mark).length - 1;
    if (n !== 1) fail(`${name} carries ${mark} ${n} times, not once`);
  }
  // not sticky here: the page keeps its own sticky bar (its progress and Back) under it, and two sticky bars eat a phone's screen
  page = page.replace(HEAD, () => part('site-shell-head', header + menu, 'position:relative;z-index:40') + MENU);
  page = page.replace(FOOT, () => part('site-shell-foot', footer, ''));
  writeFileSync(p, page);
  console.log(`inject-shell: ${name} carries the site's header and footer`);
}
rmSync(shellPath);
if (shellPath.endsWith('index.html')) rmSync(join(dist, '_shell'), { recursive: true, force: true });
