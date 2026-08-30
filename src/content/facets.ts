import agencyData from '../../content/agencies.json';
import { ARTICLES, type ArticleMeta } from './articles';
import { TOPICS } from './topics';

/**
 * The three filter axes on /blog (Kong, 2026-08-26): industry, policy, agency - plus the
 * `required_by_law` flag. Values come from the index; nothing here is a hand-typed list except
 * the policy slug contract in topics.ts. Agency LINKS on an article page are derived from the
 * article body at render time with the same host map the generator uses (content/agencies.json).
 */
export type Axis = 'industry' | 'policy' | 'agency';

/**
 * The full agency name, for DISPLAY only (Kong, 2026-08-30: name the agency out rather than
 * abbreviate, with the short form kept in braces where it helps).
 *
 * The facet VALUE and the URL slug stay the abbreviation. That is not laziness - `slugify(label)`
 * derives the query string, so renaming the value would turn `?agency=mom` into
 * `?agency=ministry-of-manpower` and break every link already published, including the generated
 * facets contract other seats link from.
 *
 * An unmapped label returns itself. Deliberate: a guessed agency name on a public page is a
 * factual error, and an abbreviation is merely terse.
 */
const AGENCY_NAMES: Record<string, string> = (agencyData as { names?: Record<string, string> }).names ?? {};

export function agencyName(label: string): string {
  return AGENCY_NAMES[label] ?? label;
}

/**
 * Full name, keeping the short form in braces where the short form adds something:
 * `Ministry of Manpower (MOM)`, but `Singapore Customs` rather than
 * `Singapore Customs (CUSTOMS)` and `Singapore Statutes Online` rather than a stutter.
 *
 * The test is whether the label already reads inside the full name. If it does, repeating it is
 * noise; if it does not, the abbreviation is the form a reader may already recognise and is worth
 * carrying.
 */
export function agencyNameLong(label: string): string {
  const full = AGENCY_NAMES[label];
  if (!full || full === label) return label;
  const redundant = full.toLowerCase().includes(label.toLowerCase());
  return redundant ? full : `${full} (${label})`;
}

export const AXES: { key: Axis; label: string; field: 'industries' | 'topics' | 'agencies' }[] = [
  { key: 'policy', label: 'Policy', field: 'topics' },
  { key: 'industry', label: 'Industry', field: 'industries' },
  { key: 'agency', label: 'Agency cited', field: 'agencies' },
];

/** Mechanical slug: "F&B" -> "f-and-b", "Tech / startup" -> "tech-startup", "CPF Board" -> "cpf-board". */
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Slug for a value on an axis. Policies keep their contract slugs from topics.ts. */
export function valueSlug(axis: Axis, label: string): string {
  if (axis === 'policy') {
    const k = Object.keys(TOPICS).find((key) => TOPICS[key] === label);
    if (k) return k;
  }
  return slugify(label);
}

/** All labels seen on an axis across the given articles, with document counts. */
export function axisValues(axis: Axis, within: ArticleMeta[] = ARTICLES): Record<string, number> {
  const field = AXES.find((a) => a.key === axis)!.field;
  const out: Record<string, number> = {};
  for (const a of within) for (const v of a[field] ?? []) out[v] = (out[v] ?? 0) + 1;
  return out;
}

/**
 * Resolve one raw URL token to a label on an axis: the contract slug, the mechanical slug, or
 * the label itself in any case. Unknown -> null, and the caller ignores it - a bad link must
 * never produce an empty page.
 */
export function resolveValue(axis: Axis, raw: string): string | null {
  const key = raw.trim().toLowerCase();
  if (!key) return null;
  if (axis === 'policy' && TOPICS[key]) return TOPICS[key];
  const all = Object.keys(axisValues(axis));
  return all.find((l) => slugify(l) === key) ?? all.find((l) => l.toLowerCase() === key) ?? null;
}

/** `?policy=cyber,fidelity` -> the labels. Repeated params are read too; `topic` is a policy alias. */
export function readAxis(params: URLSearchParams, axis: Axis): string[] {
  const keys: string[] = axis === 'policy' ? ['policy', 'topic'] : [axis];
  const raw = keys.flatMap((k) => params.getAll(k)).flatMap((v) => v.split(','));
  const labels = raw.map((r) => resolveValue(axis, r)).filter((l): l is string => !!l);
  return [...new Set(labels)];
}

/**
 * The two-value `required_by_law` filter (CMO curation 2026-08-26): `cover` = statute or licence
 * requires HOLDING the insurance; `duty` = the law requires an act or standard. Never a boolean -
 * one `Required by law` heading over a duty article would be a false compliance claim.
 */
export type RequiredValue = 'cover' | 'duty';

/** `?required=cover|duty`; the retired boolean's `law` reads as `cover` so old links keep working. */
function readRequired(raw: string | null): RequiredValue | null {
  if (raw === 'cover' || raw === 'duty') return raw;
  if (raw === 'law') return 'cover';
  return null;
}

export interface Selection {
  policy: string[];
  industry: string[];
  agency: string[];
  required: RequiredValue | null;
}

export const EMPTY: Selection = { policy: [], industry: [], agency: [], required: null };

export function readSelection(params: URLSearchParams): Selection {
  return {
    policy: readAxis(params, 'policy'),
    industry: readAxis(params, 'industry'),
    agency: readAxis(params, 'agency'),
    required: readRequired(params.get('required')),
  };
}

/** Write a selection back to the URL. Empty axes drop their param; `topic` is always dropped. */
export function writeSelection(params: URLSearchParams, sel: Selection): URLSearchParams {
  const next = new URLSearchParams(params);
  next.delete('topic');
  for (const { key } of AXES) {
    const vals = sel[key];
    if (vals.length) next.set(key, vals.map((v) => valueSlug(key, v)).join(','));
    else next.delete(key);
  }
  if (sel.required) next.set('required', sel.required);
  else next.delete('required');
  return next;
}

/** Multi-select within an axis (OR), AND across axes. */
export function matches(a: ArticleMeta, sel: Selection): boolean {
  if (sel.required && a.required_by_law !== sel.required) return false;
  for (const { key, field } of AXES) {
    const want = sel[key];
    if (want.length && !want.some((v) => (a[field] ?? []).includes(v))) return false;
  }
  return true;
}

export function isEmpty(sel: Selection): boolean {
  return !sel.required && AXES.every(({ key }) => sel[key].length === 0);
}

/* ---------- agency links on an article page ---------- */

const HOSTS: Record<string, string> = agencyData.hosts;
const NOBODY: string[] = agencyData.nobody;

export function agencyFor(hostIn: string): string | null {
  const host = hostIn.toLowerCase().replace(/^www\./, '');
  if (NOBODY.some((n) => host === n || host.endsWith('.' + n))) return null;
  for (const [suffix, label] of Object.entries(HOSTS)) {
    if (host === suffix || host.endsWith('.' + suffix)) return label;
  }
  const m = host.match(/(?:^|\.)([a-z0-9-]+)\.gov\.sg$/);
  return m ? m[1].toUpperCase() : null;
}

export interface AgencyLink {
  name: string;
  /** The first URL the article cites on that agency's host - the proof is one click away. */
  url: string;
  count: number;
}

/** Every agency the markdown links to, first-seen order, with the first cited URL and link count. */
export function agencyLinks(markdown: string): AgencyLink[] {
  const out = new Map<string, AgencyLink>();
  for (const m of markdown.matchAll(/https?:\/\/([^/\s)"']+)[^\s)"']*/g)) {
    const name = agencyFor(m[1]);
    if (!name) continue;
    const cur = out.get(name);
    if (cur) cur.count++;
    else out.set(name, { name, url: m[0], count: 1 });
  }
  return [...out.values()];
}
