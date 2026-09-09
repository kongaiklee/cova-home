/**
 * The in-article CTAs - five, one per reader intent.
 *
 * Copy: CMO's master `nodes/working/CMO_COPY_article-ctas_2026-09-09.md` v1.1, and the five lines
 * are KONG'S OWN - he rewrote them at 17:5x on 2026-09-09 ("reword as necessary but effectively we
 * want to sound more confident"). They ship as written and no seat re-verdicts them.
 *
 * WHY THIS IS FIVE ROWS AND NOT A 524-ROW DATA FILE. CMO's handoff
 * (`cmo/handoff/article-ctas/article-ctas.json`, 429KB) carries one row per article, but its 524
 * rows hold exactly FIVE distinct copy sets, keyed by intent - verified row by row, and the counts
 * match the master (140 / 126 / 107 / 103 / 48). Everything else in that file is already in the
 * article: `question_prefill` is "About: " + the title, and `trade` is a function of the
 * industries. Injecting the generated file would have meant a second copy of the corpus that can
 * disagree with the first, and it would have shipped a real defect: five of its titles carry
 * over-escaped quotes (`What \"Concierge\" ...`), so those five readers would have seen the
 * backslashes in their own form. Reading the live article cannot drift and cannot carry that.
 *
 * The intent ids are `src/content/intents.ts`; an unknown intent renders no CTA rather than a
 * wrong one.
 */
import type { ArticleFrontmatter } from './articles';

export interface ArticleCta {
  /** End-block headline. */
  headline: string;
  /** The mid-article line, and the lede of the end block - the same sentence in both places. */
  line: string;
  /** The button, on both. */
  button: string;
}

/** Under every end block, fixed, all five intents (copy master, "The fixed body"). */
export const CTA_BODY =
  'Covarage keeps your policies, renewals and certificates in one place. Where you ask us to, we introduce you to a licensed insurance adviser who gives the advice and places the cover. No cost to ask.';

/** Printed under the form. The response time is Kong-ruled (2026-09-09 18:0x) and COO owns the rota. */
export const CTA_FOOTNOTE = 'We reply within one working day. Covarage does not advise on or sell insurance.';

/** The second door, under the form. The company line, not a personal one. */
export const CTA_WHATSAPP = '+65 8867 0918';

export const CTA_BY_INTENT: Record<string, ArticleCta> = {
  'get-it-right': {
    headline: 'Let a licensed adviser guide you instead.',
    line: 'You do not have to do this alone. Tell us where you are and we introduce you to a licensed adviser who walks you through it.',
    button: 'Talk to a licensed adviser',
  },
  'know-where-you-stand': {
    headline: 'Know exactly what your business is required to carry.',
    line: 'Tell us what your business does and we introduce you to a licensed adviser who tells you what the law expects of it, and what to do about it.',
    button: 'Ask a licensed adviser',
  },
  'make-the-call': {
    headline: 'You do not have to figure this out by yourself.',
    line: 'Tell us the options in front of you and we introduce you to a licensed adviser who tells you which one, and places it.',
    button: 'Get a second opinion',
  },
  'steady-the-ship': {
    headline: 'Uncertain if your business is left exposed?',
    line: 'Find out before it happens to you. Tell us what your business carries today and we introduce you to a licensed adviser who shows you where the gaps are and places what closes them.',
    button: 'Talk to a licensed adviser now',
  },
  'beyond-the-basics': {
    headline: 'Standard policies were not built for this. Yours can be.',
    line: 'Tell us what you carry today and we introduce you to a licensed adviser who knows this ground and places cover that fits it.',
    button: 'Check with a licensed adviser',
  },
};

/**
 * Which of the request form's trades to preselect, from the article's industries.
 *
 * Reproduces CMO's generator on all 524 rows, including its one judgment call: an article tagged
 * Healthcare gets NO preselection even when it also carries Professional services, because a
 * clinic is not one of the eight trades and a wrong preselection is worse than an empty one. The
 * order below is the priority where an article carries several - the more specific trade wins.
 */
const TRADE_BY_INDUSTRY: Array<[string, string]> = [
  ['Construction', 'construction'],
  ['F&B', 'fnb'],
  ['Logistics', 'logistics'],
  ['Maritime / cargo', 'maritime'],
  ['Retail / e-commerce', 'retail'],
  ['Tech / startup', 'tech'],
  ['Professional services', 'professional'],
];

export function tradeForArticle(industries: string[] | undefined): string {
  const set = new Set(industries ?? []);
  if (set.has('Healthcare')) return '';
  for (const [industry, trade] of TRADE_BY_INDUSTRY) {
    if (set.has(industry)) return trade;
  }
  return '';
}

export interface ResolvedCta extends ArticleCta {
  /** Prefills the question field so the reader never starts from a blank box. */
  questionPrefill: string;
  /** '' when the article's industries do not map to one of the form's trades. */
  trade: string;
}

export function ctaForArticle(frontmatter: ArticleFrontmatter): ResolvedCta | null {
  const cta = CTA_BY_INTENT[frontmatter.intent];
  if (!cta) return null;
  return {
    ...cta,
    questionPrefill: `About: ${frontmatter.title}`,
    trade: tradeForArticle(frontmatter.industries),
  };
}

/**
 * Where the mid-article block goes: directly after the 60-second answer.
 *
 * Kong ruled the placement (2026-09-09 17:5x) - "a reader who manages to get there can skip the
 * entire article and go straight to requesting for help" - so the anchor is the answer the reader
 * came for, not an arbitrary percentage of the text.
 *
 * The answer is a blockquote, but it is NOT always the first thing in the body: some guides open
 * with a paragraph of scene-setting and put the answer under it. Anchoring on "the body starts
 * with a blockquote" therefore placed the block several headings too deep on those, past the very
 * answer it is meant to follow. So the anchor is the answer's own heading text - the three forms
 * CMO measured across the corpus (466 + 10 + 5 = 481).
 *
 * The other 43 open with prose, a heading or a bold TL;DR. For those the block goes after the
 * first heading AND the paragraph under it, never immediately below a bare heading: an ask placed
 * before the reader has been told anything is an advert.
 *
 * Returns [before, after]. An empty `after` means the whole body renders first and the block sits
 * at its end, which is right for a guide too short to have a second half.
 */
const ANSWER_LINE = /^>.*60[- ]second/i;
const HEADING_LINE = /^#{1,6}\s/;

function endOfBlockquote(lines: string[], from: number): number {
  let i = from;
  while (i < lines.length) {
    if (lines[i].startsWith('>')) { i += 1; continue; }
    if (lines[i].trim() === '' && lines[i + 1] !== undefined && lines[i + 1].startsWith('>')) { i += 2; continue; }
    break;
  }
  return i;
}

export function splitAtAnswer(body: string): [string, string] {
  const lines = body.split('\n');

  // 1. the 60-second answer, wherever in the opening it sits
  const marker = lines.findIndex((l) => ANSWER_LINE.test(l));
  if (marker !== -1) {
    const end = endOfBlockquote(lines, marker);
    return [lines.slice(0, end).join('\n'), lines.slice(end).join('\n')];
  }

  // 2. a body that opens with a blockquote which does not name itself
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i += 1;
  if (lines[i] !== undefined && lines[i].startsWith('>')) {
    const end = endOfBlockquote(lines, i);
    return [lines.slice(0, end).join('\n'), lines.slice(end).join('\n')];
  }

  // 3. no answer block at all (43 guides): the closest analogue is "after the reader has been
  //    told something and before the article proper starts".
  //    - opens with prose, then a heading: after that opening prose, before the heading
  //    - opens with a heading: past it and any further headings, then after the first real
  //      paragraph, so the ask never sits under a bare heading with nothing said yet
  const heading = lines.findIndex((l) => HEADING_LINE.test(l));
  let cut: number;
  if (heading === -1) {
    cut = lines.findIndex((l, n) => n > 0 && l.trim() === '');
  } else if (heading > 0) {
    cut = heading;
  } else {
    let j = heading + 1;
    while (j < lines.length && (lines[j].trim() === '' || HEADING_LINE.test(lines[j]))) j += 1;
    while (j < lines.length && lines[j].trim() !== '') j += 1;
    cut = j;
  }
  if (cut <= 0 || cut >= lines.length) return [body, ''];
  return [lines.slice(0, cut).join('\n'), lines.slice(cut).join('\n')];
}
