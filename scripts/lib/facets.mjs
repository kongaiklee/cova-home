/**
 * Article facets - the three axes Kong ruled on 2026-08-26 (industry / policy / agency), derived
 * from the article itself so a tag is never an assertion:
 *
 *   industries - TITLE + SLUG against the 16 trade rules (what the article is visibly about)
 *   policies   - the frontmatter `topics` the migration already writes
 *   agencies   - the government / statute / court / industry-body hosts the body ACTUALLY LINKS TO,
 *                counted per link. The tag IS the backlink.
 *
 * Shared by migrate-articles.mjs (emits at migration) and enrich-facets.mjs (re-derives over the
 * committed corpus). Ported from nodes/working/CMO_article_facets.mjs and CMO_corpus_by_trade.mjs
 * so the numbers reconcile with CMO's census; the host map is content/agencies.json, which the
 * client (src/content/facets.ts) reads too - one map, no drift.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const { hosts: AGENCIES, nobody: NOBODY } = JSON.parse(
  fs.readFileSync(path.join(HERE, '..', '..', 'content', 'agencies.json'), 'utf8')
);

/** Trade -> title regex. Word-ish boundaries where a short token would otherwise false-match. */
export const TRADES = {
  'F&B':                  /f&b|\bfood\b|restaurant|caf[eé]|hawker|catering|caterer|liquor|kitchen|bakery/i,
  'Construction':         /construction|contractor|renovation|bizsafe|\bbca\b|\bscal\b|builder/i,
  'Logistics':            /logistics|freight|transport|delivery|courier|truck|fleet|warehouse|3pl/i,
  'Maritime / cargo':     /maritime|marine|shipping|vessel|\bport\b|cargo|yacht/i,
  'Retail / e-commerce':  /retail|\bshop\b|e-commerce|ecommerce|\bstore\b|pharmacy/i,
  'Healthcare':           /clinic|medical|dental|healthcare|\btcm\b|nursing|eldercare|physio|allied health/i,
  'Education':            /education|tuition|enrichment|childcare|preschool|kindergarten|edutrust|\bschool\b/i,
  'Tech / startup':       /\btech\b|saas|software|startup|fintech|payment services|\bai\b/i,
  'Professional services':/professional|accountant|accounting|law firm|consult|\bagency\b|architect|engineer/i,
  'Property':             /property|real estate|landlord|mcst|tenant/i,
  'Beauty / wellness':    /beauty|salon|\bspa\b|wellness|\bgym\b|fitness|massage|yoga/i,
  'Security / facilities':/security|cleaning|facilities|landscap|pest/i,
  'Hospitality / travel': /hotel|hospitality|travel|\btour\b/i,
  'Events':               /\bevent\b|wedding|photograph|entertainment/i,
  'Manufacturing':        /manufactur|factory|workshop|industrial/i,
  'Foreign workers':      /foreign worker|\bfdw\b|work permit|migrant|dormitory/i,
};

export function agencyFor(host) {
  host = host.toLowerCase().replace(/^www\./, '');
  if (NOBODY.some((n) => host === n || host.endsWith('.' + n))) return null;
  for (const [suffix, label] of Object.entries(AGENCIES)) {
    if (host === suffix || host.endsWith('.' + suffix)) return label;
  }
  const m = host.match(/(?:^|\.)([a-z0-9-]+)\.gov\.sg$/);
  return m ? m[1].toUpperCase() : null;
}

export function industriesFor(title, slug) {
  const hay = `${title} ${slug}`;
  return Object.entries(TRADES).filter(([, re]) => re.test(hay)).map(([k]) => k);
}

/** { label: linkCount } over every absolute URL in the text, in first-seen order. */
export function agencyCounts(text) {
  const agencies = {};
  for (const m of text.matchAll(/https?:\/\/([^/\s)"']+)/g)) {
    const a = agencyFor(m[1]);
    if (a) agencies[a] = (agencies[a] || 0) + 1;
  }
  return agencies;
}

/** The facets for one article, from its title, slug and full markdown (frontmatter included). */
export function deriveFacets(title, slug, markdown) {
  return {
    industries: industriesFor(title, slug),
    agencies: Object.keys(agencyCounts(markdown)),
  };
}
