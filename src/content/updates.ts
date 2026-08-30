/**
 * The /updates surface's data (M2, newsfeed v1). Source of record: content/updates.json - the
 * weekly screen's committed output (see the _contract field there). Headlines render VERBATIM
 * with attribution; nothing here is COVA speech.
 */
import updatesData from '../../content/updates.json';
import { ARTICLES } from './articles';

export interface UpdateItem {
  /** The source's own headline, verbatim - quotation, never authored. */
  title: string;
  /** Source label as screened, e.g. "MOM", "PDPC", "CNA Business". */
  source: string;
  /** Canonical outbound URL at the source. */
  url: string;
  /** Publication date at the source, ISO yyyy-mm-dd. */
  date: string;
}

export interface Reviewed {
  /** Moves ONLY when a screen actually ran. */
  date: string;
  sources: string[];
  changes: boolean;
  /** Whitelist sources the run did NOT reach, named rather than quietly omitted. */
  pending?: string[];
}

interface UpdatesFile {
  reviewed: Reviewed | null;
  items: UpdateItem[];
}

const data = updatesData as UpdatesFile;

export const REVIEWED: Reviewed | null = data.reviewed;
export const UPDATES: UpdateItem[] = [...data.items].sort((a, b) => (a.date < b.date ? 1 : -1));

/**
 * The freshness label. `reviewed`, never `updated`, and the one word is load-bearing: the date
 * moves when the SCREEN RUNS, not when an item lands. A screen that finds nothing still moves it,
 * so `Last updated` would be a claim we did not earn on a quiet week while `Last reviewed` stays
 * exactly true. It is also the stronger line for a reader - when we last checked is the question
 * no agency site answers. (CMO_UPDATES_LINE_AND_FRESHNESS.md s1, on Kong's flag.)
 *
 * Exported as a constant so the page and the plain-text form cannot drift apart.
 */
export const REVIEWED_LABEL = 'Last reviewed';

/**
 * The hero line, now a bare date.
 *
 * It used to name all nine screened sources and the pending clause - 211 characters above the
 * fold, of which 150 duplicated the `What we screen` block 60 lines lower on the same page.
 * NOTHING IS DELETED FROM THE RECORD: `reviewed.sources`, `reviewed.changes` and
 * `reviewed.pending` all stay in updates.json, and the pending disclosure moved INTO
 * `What we screen` where the source list already lives. The hero got shorter; the honesty did not.
 */
export function reviewedLine(r: Reviewed): string {
  return `${REVIEWED_LABEL} ${formatDate(r.date)}`;
}

/** Newest publish date in the committed guides corpus - the honest day-one freshness statement. */
export const CORPUS_UPDATED: string = ARTICLES.reduce((max, a) => (a.published && a.published > max ? a.published : max), '');

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
}
