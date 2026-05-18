/**
 * Reader-facing intent taxonomy for the blog.
 *
 * Articles are stored under 11 technical categories (which form the URL path).
 * Readers, however, browse by INTENT: what they are trying to do right now.
 * Each of the 11 categories maps to exactly one of these 5 intent buckets.
 *
 * Each pill carries a "clever" label (shown) and a "clear" label (shown with it),
 * plus an explicit two-sentence subtext, so a reader who does not yet know what
 * they need can still self-select.
 */

export type IntentId =
  | 'get-it-right'
  | 'know-where-you-stand'
  | 'make-the-call'
  | 'steady-the-ship'
  | 'beyond-the-basics';

export interface Intent {
  id: IntentId;
  /** Primary pill label. */
  label: string;
  /** Plain-language label shown alongside the pill label. */
  clearLabel: string;
  /** Two-sentence explainer, shown on hover and when the filter is active. */
  subtext: string;
  /** Technical categories that roll up into this intent. */
  categories: string[];
}

export const INTENTS: Intent[] = [
  {
    id: 'get-it-right',
    label: 'Get it right',
    clearLabel: 'How-to guides',
    subtext:
      'Step-by-step walkthroughs for the things you have to do yourself: filing a claim, reading a policy schedule, requesting a certificate of insurance, renewing on time. Start here when you know the task in front of you but not the steps to finish it.',
    categories: ['procedural-howto', 'document-legal'],
  },
  {
    id: 'know-where-you-stand',
    label: 'Know where you stand',
    clearLabel: 'What the law requires',
    subtext:
      'What Singapore law, the regulators (MOM, ACRA, MAS) and your industry body require your business to carry: work-injury compensation (WICA), licensing conditions, and trade-association rules. Start here if you are not certain your business is legally covered, or whether a recent rule change affects you.',
    categories: ['regulatory-change', 'licensing', 'association'],
  },
  {
    id: 'make-the-call',
    label: 'Make the call',
    clearLabel: 'Compare your options',
    subtext:
      'Plain-language comparisons of one type of cover against another, plus decision guides for what a business like yours genuinely needs. Start here when you have choices in front of you, such as two quotes, two policy types, or whether to renew or switch, and you need to decide with a clear head.',
    categories: ['comparison', 'decision-tree'],
  },
  {
    id: 'steady-the-ship',
    label: 'Steady the ship',
    clearLabel: 'When something goes wrong',
    subtext:
      'What to do when something has already happened: an accident at work, a claim, a customer dispute, a letter from a regulator. Start here if you are dealing with a problem right now and need your next move before it gets worse.',
    categories: ['crisis'],
  },
  {
    id: 'beyond-the-basics',
    label: 'Beyond the basics',
    clearLabel: 'Complex & emerging risks',
    subtext:
      'Cover for situations that do not fit a standard template: operating or hiring across borders, niche trades, and newer threats like cyber attacks and AI. Start here if your business has moving parts that a simple off-the-shelf policy was never built for.',
    categories: ['edge-case', 'cross-border', 'emerging-risk'],
  },
];

/** The default "no filter" pill. */
export const ALL_INTENT = {
  id: 'all' as const,
  label: 'Everything',
  subtext:
    'Every guide we have published, newest first. Browse the full library if you are not yet sure which question is yours, and the filters will help you narrow down.',
};

export const INTENT_BY_ID: Record<IntentId, Intent> = Object.fromEntries(
  INTENTS.map((i) => [i.id, i])
) as Record<IntentId, Intent>;

/** Human-readable names for the 11 technical categories (breadcrumbs, tags). */
export const CATEGORY_LABELS: Record<string, string> = {
  'procedural-howto': 'How-To Guides',
  'document-legal': 'Documents & Contracts',
  'regulatory-change': 'Regulatory Changes',
  licensing: 'Licensing',
  association: 'Industry Bodies',
  comparison: 'Comparisons',
  'decision-tree': 'Decision Guides',
  crisis: 'Crisis Response',
  'edge-case': 'Edge Cases',
  'cross-border': 'Cross-Border',
  'emerging-risk': 'Emerging Risks',
};

export function intentForCategory(category: string): IntentId | undefined {
  return INTENTS.find((i) => i.categories.includes(category))?.id;
}
