/**
 * Data and logic for the SME insurance-gap self-assessment (lead-gen Move 2).
 *
 * Firewall rules (same as the articles): neutral language only. No insurer or
 * policy is named, recommended, or ranked. Never "you must buy X". Every
 * "likely mandatory" statement links to a primary-sourced explainer. This is
 * information that points to areas to review with a licensed adviser, not advice.
 */

export type Answers = Record<string, string>;

export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  prompt: string;
  help?: string;
  options: Option[];
  /** Show only when the predicate over current answers holds (conditional follow-ups). */
  showIf?: (a: Answers) => boolean;
}

export type BucketId = 'mandatory' | 'contract' | 'review';

export interface Bucket {
  id: BucketId;
  title: string;
  blurb: string;
}

export const BUCKETS: Bucket[] = [
  {
    id: 'mandatory',
    title: 'Usually required by law for a business of this type',
    blurb: 'Areas the law generally requires of businesses of this kind.',
  },
  {
    id: 'contract',
    title: 'Commonly required by contracts',
    blurb: 'Not required by law, but landlords or clients often ask for these.',
  },
  {
    id: 'review',
    title: 'Commonly reviewed at this stage',
    blurb: 'Real exposures for a business like yours, worth a look with an adviser.',
  },
];

export interface ResultItem {
  bucket: BucketId;
  statement: string;
  href?: string;
}

const YES_NO: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export const QUESTIONS: Question[] = [
  {
    id: 'structure',
    prompt: 'How is your business set up?',
    options: [
      { value: 'sole', label: 'Sole proprietor' },
      { value: 'partnership', label: 'Partnership' },
      { value: 'pte', label: 'Private limited (Pte Ltd)' },
      { value: 'llp', label: 'Limited liability partnership (LLP)' },
    ],
  },
  {
    id: 'employs',
    prompt: 'Do you employ anyone under a contract of service?',
    options: YES_NO,
  },
  {
    id: 'employs_manual',
    prompt: 'Do any of them do manual work, or earn $2,600 a month or less?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'unsure', label: 'Not sure' },
    ],
    showIf: (a) => a.employs === 'yes',
  },
  {
    id: 'employs_pass',
    prompt: 'Do any of them hold a Work Permit or S Pass?',
    options: YES_NO,
    showIf: (a) => a.employs === 'yes',
  },
  {
    id: 'premises',
    prompt: 'Do you lease or own commercial premises?',
    options: [
      { value: 'lease', label: 'Lease' },
      { value: 'own', label: 'Own' },
      { value: 'home', label: 'Home-based' },
      { value: 'none', label: 'None' },
    ],
  },
  {
    id: 'advice',
    prompt: 'Do you give professional advice, designs, or services that clients rely on?',
    options: YES_NO,
  },
  {
    id: 'assets',
    prompt: 'Do you hold stock, equipment, or fit-out of material value?',
    options: YES_NO,
  },
  {
    id: 'data',
    prompt: "Do you handle customers' personal data, or sell online?",
    options: YES_NO,
  },
  {
    id: 'vehicles',
    prompt: 'Do you operate vehicles for the business?',
    options: YES_NO,
  },
  {
    id: 'licensed',
    prompt: 'Are you in a licensed trade?',
    help: 'For example food and beverage, employment agency, travel agent, security, pawnbroking, childcare, or pharmacy.',
    options: YES_NO,
  },
  {
    id: 'licensed_which',
    prompt: 'Which best describes it?',
    options: [
      { value: 'fnb', label: 'Food and beverage' },
      { value: 'employment', label: 'Employment agency' },
      { value: 'travel', label: 'Travel agent' },
      { value: 'security', label: 'Security agency' },
      { value: 'pawn', label: 'Pawnbroker' },
      { value: 'childcare', label: 'Childcare centre' },
      { value: 'pharmacy', label: 'Pharmacy' },
      { value: 'other', label: 'Another licensed trade' },
    ],
    showIf: (a) => a.licensed === 'yes',
  },
];

/** Follow-up questions whose answers should be cleared when their parent changes. */
export const DEPENDENTS: Record<string, string[]> = {
  employs: ['employs_manual', 'employs_pass'],
  licensed: ['licensed_which'],
};

/** Licensed-trade value -> the relevant explainer. Verified against the corpus. */
const LICENCE_ARTICLE: Record<string, string> = {
  fnb: '/licensing/sfa-food-establishment-licence-insurance',
  employment: '/licensing/employment-agency-licence-insurance-requirements-singapore',
  travel: '/licensing/travel-agent-licence-insurance-singapore',
  security: '/licensing/security-agency-licence-insurance-singapore',
  pawn: '/licensing/pawnbroker-licence-insurance-singapore',
  childcare: '/licensing/ecda-licensed-childcare-centre-insurance',
  pharmacy: '/licensing/hsa-pharmacy-licence-insurance-singapore',
};

/** Map answers to a flat list of result items. Order defines display order within a bucket. */
export function evaluate(a: Answers): ResultItem[] {
  const items: ResultItem[] = [];

  if (a.employs === 'yes' && a.employs_manual === 'yes') {
    items.push({
      bucket: 'mandatory',
      statement:
        'Work injury compensation (WICA) insurance is generally required by law for employees who do manual work or earn $2,600 a month or less.',
      href: '/document-legal/wica-complete-guide-singapore-employers',
    });
  }

  if (a.employs === 'yes' && a.employs_pass === 'yes') {
    items.push({
      bucket: 'mandatory',
      statement:
        'Medical insurance and a security bond are generally required for Work Permit and S Pass holders.',
      href: '/document-legal/foreign-worker-insurance-complete-guide-singapore',
    });
  }

  if (a.vehicles === 'yes') {
    items.push({
      bucket: 'mandatory',
      statement: 'Motor third-party cover is required by law to drive a vehicle for the business.',
      href: '/comparison/commercial-motor-excess-ncd-fleet-pricing-singapore',
    });
  }

  if (a.premises === 'lease') {
    items.push({
      bucket: 'contract',
      statement:
        "Commercial leases usually require public liability cover, and your landlord's policy will not cover your fit-out, stock, or liability.",
      href: '/document-legal/tenant-landlord-insurance-responsibilities-commercial-lease-singapore',
    });
  }

  if (a.advice === 'yes') {
    items.push({
      bucket: 'contract',
      statement:
        'Clients often require professional indemnity by contract. It is written on a claims-made basis, so timing matters.',
      href: '/document-legal/professional-indemnity-complete-guide-singapore',
    });
  }

  if (a.assets === 'yes') {
    items.push({
      bucket: 'review',
      statement:
        'Property or fire cover for your assets is worth reviewing. Watch for underinsurance and the average clause.',
      href: '/document-legal/commercial-property-fire-complete-guide-singapore',
    });
  }

  if (a.data === 'yes') {
    items.push({
      bucket: 'review',
      statement:
        'Handling personal data or selling online carries cyber exposure and a PDPA breach-notification duty. This is not mandatory insurance, but it is a real exposure.',
      href: '/document-legal/cyber-insurance-complete-guide-singapore-sme',
    });
  }

  if (a.licensed === 'yes') {
    items.push({
      bucket: 'review',
      statement:
        'Your licence regime may carry its own insurance or bond conditions, separate from general business cover.',
      href: LICENCE_ARTICLE[a.licensed_which],
    });
  }

  if (a.structure === 'pte' && a.advice === 'yes') {
    items.push({
      bucket: 'review',
      statement:
        'As a private limited company serving clients under contract, directors may want to review directors and officers (D&O) exposure.',
      href: '/decision-tree/does-my-sme-need-do-singapore',
    });
  }

  return items;
}

/** Every possible item, for the no-JS static overview. */
export const ALL_ITEMS: ResultItem[] = evaluate({
  structure: 'pte',
  employs: 'yes',
  employs_manual: 'yes',
  employs_pass: 'yes',
  premises: 'lease',
  advice: 'yes',
  assets: 'yes',
  data: 'yes',
  vehicles: 'yes',
  licensed: 'yes',
  licensed_which: 'other',
});
