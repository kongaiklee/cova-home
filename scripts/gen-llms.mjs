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

  // Kong 2026-09-04: "let us block no crawlers and serve summaries with links instead". The
  // [Full corpus] line pointed every crawler that read this file at the whole corpus in one
  // download, which is the opposite of serving a summary and a link.
  const resources = `## Resources

- [Sitemap](${SITE}/sitemap.xml): machine-readable URL index`;

  return `${HEADER}\n${sections}\n\n${resources}\n`;
}

/*
 * llms-full.txt IS DELIBERATELY NOT GENERATED - Kong ruled it off on 2026-09-04: "agree let us
 * block no crawlers and serve summaries with links instead". It served 7.4MB, the full text of all
 * 524 articles, so a crawler had no reason to follow a single link. llms.txt already carries a
 * title, a URL and a one-sentence summary for every guide, which IS the ruled shape.
 *
 * THE GENERATOR IS THE FIX, NOT THE FILE. Deleting the artifact alone is a change that undoes
 * itself on the next build. /llms-full.txt now redirects to /llms.txt rather than 404ing, because
 * the URL served 200 for weeks and crawlers hold it - a redirect hands them the summaries.
 */
const publicDir = path.join(REPO_ROOT, 'public');
fs.mkdirSync(publicDir, { recursive: true });

const llmsTxt = buildLlmsTxt();
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8');

// Assert the ruled-off artifact is not present. A stale copy on disk would keep serving from
// public/ even though nothing writes it any more, which is exactly the failure that hides until
// the next deploy.
const stale = path.join(publicDir, 'llms-full.txt');
if (fs.existsSync(stale)) {
  console.error('gen-llms: llms-full.txt exists in public/ and is ruled off (Kong 2026-09-04). Delete it.');
  process.exit(1);
}

console.log(
  `LLM: wrote llms.txt (${(llmsTxt.length / 1024).toFixed(0)} KB) covering ${articles.length} articles. ` +
    `llms-full.txt is ruled off and asserted absent.`
);
