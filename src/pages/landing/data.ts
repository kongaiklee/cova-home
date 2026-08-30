/**
 * Lander content. Copy of record: the approved design artboards (Revision 3a, row 23) - every
 * string here is carried verbatim from them. A copy change is an edit here, never in JSX.
 */
import { articleUrl } from '../../content/articles';

export const IMG = '/assets/images/lander';

export interface Trade {
  id: string;
  /** Option label in the request card's trade select. */
  label: string;
  /** Hero photograph key: IMG/pg-hero-<hero>.jpg. Trades without their own hero share one. */
  hero: string;
  card: string;
  title: string;
  sub?: string;
  /**
   * The two cover lines, `<cover> - <short reason>`, each a LINK to the guide carrying the
   * qualifying detail. Recut 2026-08-30 from a paragraph after Kong rejected the live copy;
   * copy of record is the desk draft `cmo/copywriter/drafts/trade-cards-recut.md`.
   *
   * `law` is a compact card reason, NOT a claim that every business is insurable under the
   * same rule - the copywriter's own flag. The linked guide carries the qualification, which
   * is why the WHOLE line is clickable rather than a trailing read-more.
   */
  holds: { text: string; href: string }[];
  href: string;
}

export const TRADES: Trade[] = [
  { id: 'fnb', label: 'Food and beverage', hero: 'fnb', card: 'fnb', title: 'Food and beverage',
    holds: [
      { text: 'Work injury cover - law', href: articleUrl('/document-legal/wica-section-24-mandatory-insurance') },
      { text: 'Public liability - lease, customer exposure', href: articleUrl('/procedural-howto/pl-claim-customer-slip-fnb') },
    ],
    href: articleUrl('/decision-tree/opening-cafe-checklist') },
  { id: 'construction', label: 'Construction', hero: 'construction', card: 'construction', title: 'Construction',
    holds: [
      { text: 'Work injury cover - law', href: articleUrl('/document-legal/wica-section-24-mandatory-insurance') },
      { text: 'Contractors\' all risks, public liability - main contract', href: articleUrl('/comparison/annual-blanket-car-vs-project-specific-car-sme-contractor') },
    ],
    href: articleUrl('/decision-tree/opening-interior-design-renovation-checklist') },
  { id: 'logistics', label: 'Logistics', hero: 'logistics', card: 'logistics', title: 'Logistics',
    holds: [
      { text: 'Third-party motor - law', href: articleUrl('/document-legal/compulsory-motor-insurance-singapore-third-party') },
      { text: 'Goods in transit, marine cargo - client contract', href: articleUrl('/comparison/annual-open-cover-vs-specific-voyage-marine-cargo-sme') },
    ],
    href: articleUrl('/decision-tree/opening-logistics-freight-forwarder-checklist') },
  { id: 'retail', label: 'Retail', hero: 'retail', card: 'retail', title: 'Retail',
    holds: [
      { text: 'Work injury cover - law', href: articleUrl('/document-legal/wica-section-24-mandatory-insurance') },
      { text: 'Public liability, fire - lease', href: articleUrl('/comparison/fire-vs-par') },
    ],
    href: articleUrl('/regulatory-change/fire-code-2023') },
  { id: 'maritime', label: 'Maritime', hero: 'maritime', card: 'maritime', title: 'Maritime',
    holds: [
      { text: 'Marine cargo - client contract', href: articleUrl('/comparison/annual-open-cover-vs-specific-voyage-marine-cargo-sme') },
      { text: 'Work injury cover - law', href: articleUrl('/document-legal/wica-section-24-mandatory-insurance') },
    ],
    href: articleUrl('/comparison/annual-open-cover-vs-specific-voyage-marine-cargo-sme') },
  { id: 'professional', label: 'Professional services', hero: 'tech', card: 'professional', title: 'Professional services',
    holds: [
      { text: 'Professional indemnity - client contract', href: articleUrl('/comparison/pi-vs-tech-eo-for-saas') },
      { text: 'Work injury cover - law', href: articleUrl('/document-legal/wica-section-24-mandatory-insurance') },
    ],
    href: articleUrl('/decision-tree/opening-law-firm-checklist') },
  { id: 'tech', label: 'Tech companies', hero: 'tech', card: 'tech', title: 'Tech companies', sub: 'SaaS, software houses, IT vendors.',
    holds: [
      { text: 'Professional indemnity, cyber - client contract', href: articleUrl('/comparison/pi-vs-tech-eo-for-saas') },
      { text: 'Work injury cover - law', href: articleUrl('/document-legal/wica-section-24-mandatory-insurance') },
    ],
    href: articleUrl('/comparison/pi-vs-tech-eo-for-saas') },
  { id: 'startups', label: 'Startups', hero: 'startups', card: 'startups', title: 'Startups', sub: 'Pre-seed to Series A. First hires, first office.',
    holds: [
      { text: 'Work injury cover - law', href: articleUrl('/document-legal/wica-section-24-mandatory-insurance') },
      { text: 'Directors\' and officers\' cover - investor', href: articleUrl('/comparison/do-vs-pi-vs-epl') },
    ],
    href: articleUrl('/decision-tree/starting-saas-startup-checklist') },
];

export interface GuideGroup {
  name: string;
  more: string;
  moreHref: string;
  items: { title: string; href: string }[];
}

const g = (path: string, title: string) => ({ title, href: articleUrl(path) });

/** Section 4C. Six groups of five; `Required by law` leads and opens on load. */
export const GUIDE_GROUPS: GuideGroup[] = [
  { name: 'Required by law', more: 'More articles on what the law requires', moreHref: '/blog?required=cover', items: [
    g('/document-legal/wica-section-25-offence', 'No WICA policy? What the Section 25 offence actually costs an employer'),
    g('/crisis/worker-fatality-on-site', 'A Worker Just Died on Site: What Do I Do Now?'),
    g('/crisis/mom-stop-work-order-issued', 'MOM Just Issued a Stop-Work Order on Our Site: What Do I Do Now?'),
    g('/document-legal/wsha-section-48-director-liability', "WSHA Section 48: When a Safety Failure Becomes the Director's Personal Liability"),
    g('/document-legal/employment-pass-holder-insurance-requirements', 'What Insurance Must Employers Provide for Employment Pass Holders?'),
  ] },
  { name: 'Public liability', more: 'More articles on public liability', moreHref: '/blog?policy=public-liability', items: [
    g('/crisis/customer-just-sued', 'A Customer Just Sued Us: What Do I Do Now?'),
    g('/procedural-howto/pl-claim-customer-slip-fnb', 'A Customer Slipped in My Cafe: How the Public Liability Claim Actually Goes'),
    g('/crisis/tenant-caused-major-fire-landlord-sme-workflow', "Tenant-Caused Major Fire: The Landlord's Day-One Workflow"),
    g('/crisis/multi-plaintiff-class-action-threat-multi-line-response', 'Multi-Plaintiff Class Action: When Several Policies Fire at Once'),
    g('/document-legal/see-toh-siew-kee-occupiers-liability', "The Court Decision That Rewrote Occupiers' Liability in Singapore"),
  ] },
  { name: 'Professional indemnity', more: 'More articles on professional indemnity', moreHref: '/blog?policy=professional-indemnity', items: [
    g('/crisis/mass-refund-demand', 'A Customer Group Just Demanded Mass Refunds: What Do I Do Now?'),
    g('/crisis/regulatory-audit-notice-received', 'A Regulator Just Issued an Audit Notice: What Do I Do Now?'),
    g('/crisis/mas-adverse-examination-findings-letter', 'MAS Adverse Examination Findings Letter: Day One of a Regulatory Crisis'),
    g('/crisis/pr-crisis-social-media-incident', 'A PR Crisis Just Hit Our Brand on Social Media: What Do I Do Now?'),
    g('/document-legal/pe-firm-professional-indemnity-pea-section-34', 'When Must an Engineering Firm Carry Professional Indemnity by Law?'),
  ] },
  { name: 'Cyber', more: 'More articles on cyber', moreHref: '/blog?policy=cyber', items: [
    g('/crisis/ransomware-just-hit', 'We Just Discovered Ransomware on Our Systems: What Do I Do Now?'),
    g('/crisis/cyber-extortion-ransomware', 'Our Systems Are Locked and the Attackers Want Bitcoin: What Do I Do Now?'),
    g('/crisis/bec-wire-fraud-loss-discovered', 'Business Email Compromise: The Wire Fraud Was Discovered This Morning'),
    g('/regulatory-change/pdpa-2022-penalty', 'PDPA Penalties Are Now 10% of Turnover for a Data Breach'),
    g('/regulatory-change/pdpc-enforcement-escalation-mbs-marina-bay-sands-2025', 'Marina Bay Sands Was Fined S$315,000: The PDPC Enforcement Pattern'),
  ] },
  { name: 'Property', more: 'More articles on property', moreHref: '/blog?policy=property', items: [
    g('/crisis/equipment-breakdown-halts-production', 'Critical Equipment Just Broke and Halted Our Production: What Do I Do Now?'),
    g('/crisis/anchor-tenant-departure', 'Our Anchor Tenant Just Announced They Are Leaving the Mall: What Do I Do Now?'),
    g('/crisis/supplier-insolvency', 'Our Critical Supplier Just Declared Insolvency: What Do I Do Now?'),
    g('/comparison/first-loss-vs-full-value-average-clause-property', 'Insured for Less Than the Building Is Worth? The Average Clause Cuts Every Claim'),
    g('/regulatory-change/fire-code-2023', 'Fire Code 2023: What Changed for Retail, F&B and Manufacturing'),
  ] },
  { name: 'Directors and officers', more: 'More articles on directors and officers', moreHref: '/blog?policy=directors-and-officers', items: [
    g('/crisis/partner-exit-shareholder-dispute', 'A Co-Founder Wants to Exit and It Has Turned Adversarial: What Do I Do Now?'),
    g('/crisis/director-death-sudden-incapacity-key-person-event', 'Director Death or Sudden Incapacity: The Key-Person Event, Day One'),
    g('/crisis/iras-audit-investigation', 'IRAS Just Notified Us of a Tax Audit: What Do I Do Now?'),
    g('/document-legal/companies-act-section-172-indemnification', 'Why the Company Cannot Always Indemnify Its Directors: Companies Act Section 172'),
    g('/document-legal/irda-2018-director-duties-insolvency', 'Director Personal Liability in Insolvency: What IRDA 2018 Does'),
  ] },
];

/** Section 9. One headline, the word rotates; every frame is in the DOM for the copy gate. */
export const ROTATION: { word: string; body: string }[] = [
  { word: 'the law', body: 'Work injury cover for your staff and third-party motor on every vehicle. Compulsory, whatever your trade.' },
  { word: 'your landlord', body: 'Most leases ask for public liability and fire cover before the keys are handed over.' },
  { word: 'your customer', body: 'Enterprise contracts ask for professional indemnity and cyber. Some ask for both before you can invoice.' },
  { word: 'your main contractor', body: "The main contract puts contractors' all risks and public liability on you before you are on site." },
  { word: 'your investor', body: "Term sheets commonly ask for directors' and officers' cover before the round closes." },
  { word: 'your bank', body: 'A property loan asks for fire cover on the building for as long as the loan runs.' },
];

/** The 24 general insurers on the panel, in the artboard's order. */
export const INSURERS: { slug: string; alt: string }[] = [
  { slug: 'singlife', alt: 'Singlife' }, { slug: 'aig', alt: 'AIG' }, { slug: 'allianz', alt: 'Allianz' },
  { slug: 'allied-world', alt: 'Allied World' }, { slug: 'cigna', alt: 'Cigna' }, { slug: 'chubb', alt: 'Chubb' },
  { slug: 'etiqa', alt: 'Etiqa' }, { slug: 'great-american', alt: 'Great American' }, { slug: 'great-eastern', alt: 'Great Eastern' },
  { slug: 'hl-assurance', alt: 'HL Assurance' }, { slug: 'india-international', alt: 'India International Insurance Singapore' },
  { slug: 'income', alt: 'Income' }, { slug: 'liberty', alt: 'Liberty Insurance' }, { slug: 'msig', alt: 'MSIG' },
  { slug: 'qbe', alt: 'QBE Insurance' }, { slug: 'sompo', alt: 'SOMPO' }, { slug: 'tokio-marine', alt: 'Tokio Marine' },
  { slug: 'bupa', alt: 'Bupa' }, { slug: 'ergo', alt: 'Ergo' }, { slug: 'ecics', alt: 'Ecics' }, { slug: 'hsbc', alt: 'HSBC' },
  { slug: 'fwd', alt: 'FWD Insurance' }, { slug: 'now-health-international', alt: 'Now Health International' },
  { slug: 'direct-asia', alt: 'Direct Asia' },
];

export const LOGIN_URL = `${import.meta.env.VITE_APP_COVARAGE_URL}/signin`;
export const REQUEST_ANCHOR = '#request';

/**
 * The s16 variant switch (s16's binding rule): the post-submit state may claim "the email we just
 * sent" ONLY while the s15 founder-welcome send is live in api/request.js. These flip TOGETHER -
 * if the send is ever disabled there, flip this false in the same commit.
 */
export const EMAIL_SEND_LIVE = true;
