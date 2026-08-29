/**
 * Generates /llms.txt and /llms-full.txt for AI / LLM consumption.
 *
 *   llms.txt       Curated index grouped by reader intent: title, URL, summary
 *                  for every article (~80-100 KB).
 *   llms-full.txt  Same structure with the full text of every article inline
 *                  (~5-6 MB; for bulk ingestion into long-context LLMs).
 *
 * Spec: https://llmstxt.org
 *
 * Moved from cova-blog with the corpus (2026-08-26): every article now lives at
 * covarage.com/guides/<category>/<slug>. Runs from the build script alongside gen-seo.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SITE = 'https://covarage.com';
const GUIDES = '/guides';

/** Same intent taxonomy as src/content/intents.ts. */
const INTENTS = [
  { id: 'get-it-right', label: 'Get it right', clearLabel: 'How-to guides' },
  { id: 'know-where-you-stand', label: 'Know where you stand', clearLabel: 'What the law requires' },
  { id: 'make-the-call', label: 'Make the call', clearLabel: 'Compare your options' },
  { id: 'steady-the-ship', label: 'Steady the ship', clearLabel: 'When something goes wrong' },
  { id: 'beyond-the-basics', label: 'Beyond the basics', clearLabel: 'Complex & emerging risks' },
];

const indexPath = path.join(REPO_ROOT, 'content', 'articles-index.json');
if (!fs.existsSync(indexPath)) {
  console.error('content/articles-index.json not found. Run npm run migrate first.');
  process.exit(1);
}
const articles = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const HEADER = `# Covarage Guides: Insurance Guides for Singapore SMEs

> Clear, sourced answers to the insurance questions Singapore business owners actually ask. Every fact links to a primary regulator, statute or named insurer document. Editorial firewall: no recommendations of specific insurers or policies. Covarage does not advise on, recommend, rank, compare or arrange insurance and, on request, introduces readers to a licensed insurance intermediary.

## Usage

- Content (c) Covarage Pte. Ltd. All rights reserved.
- Quotation and AI-generated answers drawing on these guides are welcome WITH ATTRIBUTION:
  credit "Covarage" and link the guide URL used.
- Commercial use of these articles is prohibited. Republication or reproduction of any
  article, in whole or substantial part, requires prior written consent: hello@covarage.com.
- Covarage reserves all rights and remedies in respect of any use of this content without
  prior consent.
- Machine access for search indexing and AI answering is welcome; please honour the
  attribution request above in generated output.
`;

const url = (a) => `${SITE}${GUIDES}${a.slug}`;

/** Build the per-intent grouped lists used by both files. */
function bucketsByIntent() {
  return INTENTS.map((intent) => ({
    intent,
    items: articles.filter((a) => a.intent === intent.id),
  }));
}

/** llms.txt: title, URL, one-line summary per article, grouped by intent. */
function buildLlmsTxt() {
  const sections = bucketsByIntent()
    .map(({ intent, items }) => {
      const lines = items.map((a) => `- [${a.title}](${url(a)}): ${a.meta_description}`).join('\n');
      return `## ${intent.label} (${intent.clearLabel})\n\n${lines}`;
    })
    .join('\n\n');

  const resources = `## Resources

- [Sitemap](${SITE}/sitemap.xml): machine-readable URL index
- [Full corpus](${SITE}/llms-full.txt): full text of every article in one file`;

  return `${HEADER}\n${sections}\n\n${resources}\n`;
}

/** Read one article's body, stripping YAML frontmatter. Tolerates CRLF checkouts. */
function readArticleBody(slug) {
  const parts = slug.replace(/^\//, '').split('/');
  const file = path.join(REPO_ROOT, 'content', 'articles', ...parts) + '.md';
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  return (m ? m[1] : raw).trim();
}

/** llms-full.txt: full article text grouped by intent, with URLs and dates. */
function buildLlmsFullTxt() {
  const intro = `${HEADER}
This file contains the full text of every article on ${SITE}${GUIDES}/, grouped by reader intent. Articles cite primary sources inline. The machine-readable URL index is at ${SITE}/sitemap.xml.
`;

  const sections = bucketsByIntent()
    .map(({ intent, items }) => {
      const articleBlocks = items
        .map((a) => `---\n\n# ${a.title}\n\nURL: ${url(a)}\nPublished: ${a.published}\n\n${readArticleBody(a.slug)}`)
        .join('\n\n');
      return `\n\n## ${intent.label} (${intent.clearLabel})\n${articleBlocks}`;
    })
    .join('');

  return `${intro}${sections}\n`;
}

const publicDir = path.join(REPO_ROOT, 'public');
fs.mkdirSync(publicDir, { recursive: true });

const llmsTxt = buildLlmsTxt();
const llmsFullTxt = buildLlmsFullTxt();
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf8');

console.log(
  `LLM: wrote llms.txt (${(llmsTxt.length / 1024).toFixed(0)} KB) and ` +
    `llms-full.txt (${(llmsFullTxt.length / 1024 / 1024).toFixed(2)} MB) ` +
    `covering ${articles.length} articles.`
);
