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

/** The integrity line, built from the screen's own record (wording: CMO_NEWSFEED_whitelist.md). */
function andList(xs: string[]): string {
  return xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0];
}

export function reviewedLine(r: Reviewed): string {
  const pending = r.pending?.length ? ` ${andList(r.pending)} pending manual walk.` : '';
  return `Reviewed against ${andList(r.sources)} on ${formatDate(r.date)}.${r.changes ? '' : ' No changes.'}${pending}`;
}

/** Newest publish date in the committed guides corpus - the honest day-one freshness statement. */
export const CORPUS_UPDATED: string = ARTICLES.reduce((max, a) => (a.published && a.published > max ? a.published : max), '');

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
}
