import { ARTICLES } from './articles';

/**
 * Cover-line topics, keyed by URL slug.
 *
 * `/blog?topic=<slug>` pre-filters the index on the `topics` field of
 * articles-index.json. The slugs are the public contract - the landing page's
 * cover-line chips link to them - so add to this map, never rename a key.
 * The labels are the exact strings the corpus tags articles with.
 */
export const TOPICS: Record<string, string> = {
  'work-injury': 'Work Injury (WICA)',
  'public-liability': 'Public Liability',
  'property': 'Property & Fire',
  'professional-indemnity': 'Professional Indemnity',
  'directors-and-officers': 'Management Liability (D&O)',
  'cyber': 'Cyber',
  'marine': 'Marine & Cargo',
  'construction': 'Construction',
  'motor': 'Motor & Fleet',
  'foreign-workers': 'Foreign Workers',
  'group-health': 'Group Health',
  'fidelity': 'Fidelity',
  'general': 'General',
};

/**
 * Resolve a `?topic=` value to a corpus label. Accepts the slug, or the label
 * itself in any case (so a hand-typed `?topic=Cyber` still works). Returns
 * null for anything unknown, and the caller shows the full index - a bad link
 * must never produce an empty page.
 */
export function resolveTopic(raw: string | null): string | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (TOPICS[key]) return TOPICS[key];
  const byLabel = Object.values(TOPICS).find((label) => label.toLowerCase() === key);
  return byLabel ?? null;
}

/** Slug for a corpus label, for building links. */
export function topicSlug(label: string): string | undefined {
  return Object.keys(TOPICS).find((k) => TOPICS[k] === label);
}

/** Article count per topic label, computed once from the index. */
export const TOPIC_COUNTS: Record<string, number> = ARTICLES.reduce(
  (acc, a) => {
    for (const t of a.topics) acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);
