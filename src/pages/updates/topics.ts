import updatesData from '../../../content/updates.json';
import guideMap from '../../../content/cyber-guide-map.json';
import { ARTICLES } from '../../content/articles';
import type { Reviewed, Topic, UpdateItem } from '../../content/updates';

/**
 * The two update topics, their copy, and everything derived from `updates.json` that BOTH the list
 * pages and the brief pages need. It lives here rather than in a page component because the brief
 * page, the list pages and the route table all read it, and a second copy of the chip vocabulary is
 * how two surfaces drift apart.
 *
 * General strings are CMO's s9 exact replacements (Kong: "apply now"); the cyber strings are CMO's
 * restamp, `CMO_POSITION_updates-on-site-and-lander_2026-09-11` s3.
 */
export const COPY: Record<Topic, { path: string; chip: string; feed: string; h1: string; lede: string; seoTitle: string; seoDescription: string }> = {
  general: {
    path: '/updates',
    chip: 'Regulatory',
    feed: '/updates/feed.xml',
    h1: 'Regulatory updates',
    lede: "Regulatory updates from Singapore's agencies and industry bodies, screened weekly. Headlines appear as published, linked to the source.",
    seoTitle: 'Regulatory Updates for Singapore Businesses | Covarage',
    seoDescription: "Regulatory updates from Singapore's agencies and industry bodies, screened weekly, each linked to its official source, with the date we last reviewed stated.",
  },
  cyber: {
    path: '/updates/cyber',
    chip: 'Cyber and digital risk',
    feed: '/updates/cyber/feed.xml',
    h1: 'Cyber and digital risk',
    lede: 'Cyber and digital-risk alerts and advisories screened Monday and Thursday from CSA, GovTech, the Singapore Police Force, overseas agencies and the security press. Headlines appear as published, linked to the source.',
    seoTitle: 'Cyber and Digital Risk Updates, Singapore | Covarage',
    seoDescription: 'Cyber and digital-risk alerts for Singapore SMEs, screened Monday and Thursday from CSA, GovTech, the police and overseas agencies, linked to the source.',
  },
};

/** What CMO's assess step writes on a FIT item it briefed. The page type renders exactly this. */
export interface Brief {
  /** Sentence case, the assess step's own line - never the scraped headline, which is the source card's. */
  h1: string;
  /** 200-300 words; blank lines separate paragraphs, one optional H2 line. */
  text: string;
  words: number;
  /** When the brief passed CMO's gate, ISO datetime; the page's Reviewed date reads its date half. */
  gated_at: string;
  by: string;
}

export type BriefItem = UpdateItem & { topic: Topic; brief: Brief };

interface UpdatesFile {
  reviewed: Reviewed | null;
  items: UpdateItem[];
}
const data = updatesData as UpdatesFile;

/**
 * A brief's URL slug, derived from its H1 the same way every time: lowercase, non-alphanumerics to
 * hyphens, capped. Derived rather than authored so CMO's screen never has to invent one, and stable
 * so a published URL does not move when the file is regenerated.
 */
export function briefSlug(brief: Brief): string {
  return brief.h1
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
    .replace(/-$/, '');
}

/** `/updates/cyber/<slug>` or `/updates/<slug>` - CD's one rule on the route: the URL carries the topic. */
export function briefPath(item: BriefItem): string {
  return `${COPY[item.topic].path}/${briefSlug(item.brief)}`;
}

/** Every item carrying a well-formed brief, newest first. Empty until CMO's assess step writes them. */
export const BRIEFS: BriefItem[] = data.items
  .filter((u): u is BriefItem => {
    const b = (u as BriefItem).brief;
    return Boolean(b && b.h1 && b.text && b.gated_at);
  })
  .map((u) => ({ ...u, topic: u.topic ?? 'general' }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/** The brief for one list item, if it has one - the list card links the page instead of the source. */
export function briefFor(item: UpdateItem): BriefItem | undefined {
  return BRIEFS.find((b) => b.url === item.url);
}

interface GuideRule {
  keywords: string[];
  guide: string;
  label: string;
}
const RULES = (guideMap as { rules: GuideRule[] }).rules;

/**
 * The matching guide for a brief, by CMO's topic-to-guide map: first rule whose keyword appears in
 * the source headline or the brief's H1 wins, rules ordered most specific first. Resolved against
 * the COMMITTED corpus, so a rule pointing at a guide that does not exist yields NO card rather than
 * a dead link - CD's ruling is that no match omits the card, never a generic one.
 */
export function guideForBrief(item: BriefItem) {
  const hay = `${item.title} ${item.brief.h1}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => hay.includes(k.toLowerCase()))) {
      const guide = ARTICLES.find((a) => a.slug === rule.guide);
      if (guide) return guide;
    }
  }
  return undefined;
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
}
