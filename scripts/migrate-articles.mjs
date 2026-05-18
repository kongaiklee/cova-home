/**
 * COVA SEO article migration.
 *
 * Reads the canonical append-only master and writes one Markdown file per
 * article into content/articles/{category}/{slug}.md with YAML frontmatter.
 *
 * The master is READ ONLY. This script never writes to it.
 *
 * Usage:
 *   node scripts/migrate-articles.mjs            migrate all articles
 *   node scripts/migrate-articles.mjs --pilot    migrate ~15 across all 5 intents
 *   node scripts/migrate-articles.mjs --dry-run  parse + report, write nothing
 *
 * Spec: D:\vault\Covarage - Working folder\SEO\COVA_SEO_TM_Migration_Handover.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

const MASTER_PATH =
  process.env.COVA_MASTER ||
  'D:\\vault\\Covarage - Working folder\\SEO\\COVA_SEO_Article_Master.md';
const OUT_ROOT = path.join(REPO_ROOT, 'content', 'articles');

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const PILOT = args.has('--pilot');
const PILOT_PER_INTENT = 3;

/** category -> intent bucket key (see src/content/intents.ts). */
const CATEGORY_INTENT = {
  'procedural-howto': 'get-it-right',
  'document-legal': 'get-it-right',
  'regulatory-change': 'know-where-you-stand',
  licensing: 'know-where-you-stand',
  association: 'know-where-you-stand',
  comparison: 'make-the-call',
  'decision-tree': 'make-the-call',
  crisis: 'steady-the-ship',
  'edge-case': 'beyond-the-basics',
  'cross-border': 'beyond-the-basics',
  'emerging-risk': 'beyond-the-basics',
};

/** Topic tags keyed by insurance line. First match wins order; multiple allowed. */
const TOPIC_RULES = [
  ['Work Injury (WICA)', /\bwica\b|work[\s-]?injury|work injury compensation/i],
  ['Foreign Workers', /foreign worker|\bfdw\b|domestic worker|migrant worker|work permit|\bs pass\b/i],
  ['Public Liability', /public liability|\bpli\b/i],
  ['Property & Fire', /\bfire\b|property all risk|\bpar\b|industrial all risk|business interruption/i],
  ['Motor & Fleet', /\bmotor\b|vehicle|fleet|commercial vehicle/i],
  ['Marine & Cargo', /\bmarine\b|cargo|freight|goods in transit/i],
  ['Professional Indemnity', /professional indemnity|\bpi\b|errors? (?:and|&) omissions|tech e&o/i],
  ['Management Liability (D&O)', /\bd&o\b|directors? (?:and|&) officers?|management liability/i],
  ['Cyber', /\bcyber\b|data breach|ransomware|\bpdpa\b/i],
  ['Group Health', /group (?:medical|hospital|health)|\bghs\b|employee benefits|health screening/i],
  ['Construction', /construction|contractors? all risk|\bcar\b|builder|\bbca\b|\bscal\b|renovation/i],
  ['Fidelity', /fidelity|employee dishonesty|crime insurance/i],
];

const MONTHS = {
  january: '01', february: '02', march: '03', april: '04', may: '05',
  june: '06', july: '07', august: '08', september: '09', october: '10',
  november: '11', december: '12',
};

/** Hero image per category (public/assets/blog/{category}.jpg). */
const heroImageFor = (category) => `/assets/blog/${category}.jpg`;

function toISODate(human) {
  const m = String(human).trim().match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return null;
  const mm = MONTHS[m[2].toLowerCase()];
  if (!mm) return null;
  return `${m[3]}-${mm}-${String(m[1]).padStart(2, '0')}`;
}

/** Strip Markdown to plain text for meta descriptions. */
function toPlainText(md) {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> anchor text
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return cut.slice(0, lastSpace > 60 ? lastSpace : max).trim() + '...';
}

function classifyTopics(haystack) {
  const hits = [];
  for (const [topic, re] of TOPIC_RULES) {
    if (re.test(haystack)) hits.push(topic);
  }
  return hits.length ? hits.slice(0, 3) : ['General'];
}

function yamlString(s) {
  return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function buildFrontmatter(fm) {
  const lines = ['---'];
  lines.push(`title: ${yamlString(fm.title)}`);
  lines.push(`slug: ${yamlString(fm.slug)}`);
  lines.push(`category: ${yamlString(fm.category)}`);
  if (fm.subcategory) lines.push(`subcategory: ${yamlString(fm.subcategory)}`);
  lines.push(`intent: ${yamlString(fm.intent)}`);
  lines.push(`topics: [${fm.topics.map(yamlString).join(', ')}]`);
  lines.push(`article_number: ${fm.article_number}`);
  lines.push(`published: ${yamlString(fm.published)}`);
  lines.push(`source_verified: ${yamlString(fm.source_verified)}`);
  lines.push(`word_count: ${fm.word_count}`);
  lines.push(`status: "published"`);
  lines.push(`hero_image: ${yamlString(fm.hero_image)}`);
  lines.push(`canonical_url: ${yamlString(fm.canonical_url)}`);
  lines.push(`meta_description: ${yamlString(fm.meta_description)}`);
  lines.push(`og_title: ${yamlString(fm.og_title)}`);
  lines.push(`og_description: ${yamlString(fm.og_description)}`);
  lines.push('---');
  return lines.join('\n');
}

function main() {
  if (!fs.existsSync(MASTER_PATH)) {
    console.error(`Master not found: ${MASTER_PATH}`);
    console.error('Set COVA_MASTER env var to override.');
    process.exit(1);
  }

  let content = fs.readFileSync(MASTER_PATH, 'utf8');
  content = content.replace(/\r\n/g, '\n'); // normalise CRLF -> LF
  content = content.replace(/<\/strong>/g, ''); // quirk 2

  // Split on H3 article headers: [preamble, num, title, body, num, title, body, ...]
  const blocks = content.split(/^### Article (\d+)\s*[—-]\s*(.+?)$/m);

  const articles = [];
  const errors = [];

  for (let i = 1; i < blocks.length; i += 3) {
    const articleNum = parseInt(blocks[i], 10);
    const title = blocks[i + 1].trim();
    let body = blocks[i + 2] || '';

    // Truncate at trailing master sections that follow the last article.
    body = body.split(/^## (?:Session log|Defensive standard|Pending)\b/m)[0];

    // Slug (quirk 4 resolved at master level; tolerate backticks anyway).
    const slugMatch = body.match(/^\*\*URL slug:\*\*\s*`?(\/[^\s`\n]+)/m);
    if (!slugMatch) {
      errors.push(`Article ${articleNum}: missing URL slug`);
      continue;
    }
    const slug = slugMatch[1].replace(/`/g, '').replace(/\/+$/, '');

    // Dates (quirk 3: tolerate optional colon-bold).
    const dateMatch = body.match(
      /\*\*Published:?\*?\*?\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4}).*?Source verified:?\*?\*?\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/s
    );
    if (!dateMatch) {
      errors.push(`Article ${articleNum}: missing Published/Source verified dates`);
      continue;
    }
    const published = toISODate(dateMatch[1]);
    const sourceVerified = toISODate(dateMatch[2]);

    // Category / subcategory / filename from slug depth.
    const parts = slug.replace(/^\//, '').split('/');
    let category, subcategory, filename;
    if (parts.length === 2) {
      [category, filename] = parts;
      subcategory = null;
    } else if (parts.length === 3) {
      [category, subcategory, filename] = parts;
    } else {
      errors.push(`Article ${articleNum}: unexpected slug depth: ${slug}`);
      continue;
    }
    const intent = CATEGORY_INTENT[category];
    if (!intent) {
      errors.push(`Article ${articleNum}: unknown category "${category}"`);
      continue;
    }

    // 60-second answer blockquote (quirk 1: 51 articles lack it).
    const answerMatch = body.match(
      /^>\s*\*\*The Answer in 60 Seconds\*\*\s*\n((?:^>.*\n?)*)/m
    );
    let summary = '';
    if (answerMatch) {
      summary = toPlainText(
        answerMatch[1].replace(/^>\s?/gm, '').trim()
      );
    }

    // Clean body: drop slug line, published line, IFA CTA lines, anchors, batch headers.
    let cleanBody = body
      .replace(/^\*\*URL slug:\*\*.*$/m, '')
      .replace(/^\*\*Published.*$/m, '')
      .replace(/^\*\*\[[^\]]*IFA[^\]]*\]\*\*\s*$/gm, '')
      .replace(/^<a id="article-\d+"><\/a>\s*$/gm, '')
      .replace(/^## BATCH \d+.*$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Fallback meta source: first real paragraph of the body.
    if (!summary) {
      const firstPara = cleanBody
        .split(/\n\n+/)
        .map((p) => p.trim())
        .find((p) => p && !p.startsWith('#') && !p.startsWith('>'));
      summary = firstPara ? toPlainText(firstPara) : title;
    }

    const wordCount = (cleanBody.match(/\b[\w'-]+\b/g) || []).length;
    const heroImage = heroImageFor(category);

    const metaDescription = truncate(summary, 155);
    const canonicalUrl = `https://covarage.com${slug}`;

    articles.push({
      articleNum, title, slug, category, subcategory, intent, filename,
      published, sourceVerified, wordCount, heroImage, canonicalUrl,
      summary, metaDescription, cleanBody,
      topics: classifyTopics(`${title} ${slug} ${summary}`),
    });
  }

  // Some articles list cross-references as bare paths (e.g. "- /comparison/x")
  // instead of Markdown links. Linkify them using the real article titles.
  const slugToTitle = new Map(articles.map((a) => [a.slug, a.title]));
  let linkified = 0;
  for (const a of articles) {
    a.cleanBody = a.cleanBody.replace(
      /^([ \t]*[-*][ \t]+)(\/[A-Za-z0-9/_-]+)[ \t]*$/gm,
      (whole, bullet, slug) => {
        const t = slugToTitle.get(slug);
        if (!t) return whole;
        linkified++;
        return `${bullet}[${t}](${slug})`;
      }
    );
  }
  if (linkified) console.log(`Linkified ${linkified} bare-path cross-references.`);

  // Pilot: take the first N articles per intent bucket.
  let selected = articles;
  if (PILOT) {
    const perIntent = {};
    selected = articles.filter((a) => {
      perIntent[a.intent] = (perIntent[a.intent] || 0) + 1;
      return perIntent[a.intent] <= PILOT_PER_INTENT;
    });
  }

  console.log(`Master parsed: ${articles.length} articles, ${errors.length} errors.`);
  if (errors.length) errors.forEach((e) => console.log(`  ! ${e}`));
  console.log(`${PILOT ? 'PILOT' : 'FULL'} migration: writing ${selected.length} files.`);

  if (DRY_RUN) {
    console.log('Dry run: no files written.');
    return;
  }

  let written = 0;
  const index = [];
  for (const a of selected) {
    const fm = buildFrontmatter({
      title: a.title, slug: a.slug, category: a.category,
      subcategory: a.subcategory, intent: a.intent, topics: a.topics,
      article_number: a.articleNum, published: a.published,
      source_verified: a.sourceVerified, word_count: a.wordCount,
      hero_image: a.heroImage, canonical_url: a.canonicalUrl,
      meta_description: a.metaDescription, og_title: a.title,
      og_description: a.metaDescription,
    });
    const outDir = path.join(OUT_ROOT, a.category, a.subcategory || '');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
      path.join(outDir, `${a.filename}.md`),
      `${fm}\n\n${a.cleanBody}\n`,
      'utf8'
    );
    written++;
    index.push({
      title: a.title, slug: a.slug, category: a.category,
      subcategory: a.subcategory || undefined, intent: a.intent,
      topics: a.topics, published: a.published,
      meta_description: a.metaDescription, hero_image: a.heroImage,
      word_count: a.wordCount, article_number: a.articleNum,
    });
  }
  // Lightweight manifest for the blog index (no article bodies). Newest first.
  index.sort((x, y) => (x.published < y.published ? 1 : -1));
  fs.writeFileSync(
    path.join(REPO_ROOT, 'content', 'articles-index.json'),
    JSON.stringify(index, null, 2) + '\n',
    'utf8'
  );
  console.log(`Done: ${written} files + articles-index.json (${index.length} entries).`);
}

main();
