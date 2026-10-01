/**
 * scripts/check-ssr-shell.mjs - every built page is one whole document: one <html, one <head>, one <body, one id="root".
 *
 * vite-react-ssg puts each page's HTML into index.html with String.prototype.replace and a STRING replacement, where "$&"
 * means "the text that matched". A guide whose text holds a "$" before a character React escapes - 'the "S$" prefix'
 * renders as S$&quot; - came out with a second, empty root element where the "$&" stood and the rest of the entity
 * printed as text; the browser's copy then differed from the server's and React threw error #418 on the page. index.html's
 * root is written so that exact replace never fires (the library falls back to joining the strings); this check fails the
 * build if any page is ever assembled wrong again, whatever the cause.
 *
 *   node scripts/check-ssr-shell.mjs [dist]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] || 'dist';
const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) pages.push(p);
  }
};
walk(root);

const count = (text, s) => text.split(s).length - 1;
const bad = [];
for (const p of pages) {
  const t = readFileSync(p, 'utf8');
  const got = { '<html': count(t, '<html'), '<head>': count(t, '<head>'), '<body': count(t, '<body'), 'id="root"': count(t, 'id="root"') };
  const off = Object.entries(got).filter(([, n]) => n !== 1).map(([k, n]) => `${k} x${n}`);
  if (off.length) bad.push(`  ${relative(root, p)}: ${off.join(', ')}`);
}
if (!pages.length) {
  console.error(`check-ssr-shell: no pages under ${root}`);
  process.exit(1);
}
if (bad.length) {
  console.error(`check-ssr-shell: FAILED - ${bad.length} of ${pages.length} pages are not one whole document:\n${bad.join('\n')}`);
  process.exit(1);
}
console.log(`check-ssr-shell: ${pages.length} pages, each one whole document. OK`);
