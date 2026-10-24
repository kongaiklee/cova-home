import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';

/**
 * /security - DRAWN on branch stepup-v15 for Kong before TM builds (the hub's w46 22:03 (1)(e)): from the technical overview's generic
 * controls, NO client named, no counts (tables, policies, checks go stale the day the schema grows). Every word is CMO's copy
 * (CMO_COPY_step-up-pages_2026-10-24.md v0.2 (e), COO's check taken in: Twilio "(company-wide)" until Kong's request for its report
 * confirms messaging in scope; "Your records and documents are encrypted"; the hosting provider's US line; a line to report a security
 * issue). TM builds /.well-known/security.txt with the same address, on Kong's yes to this drawing.
 */
const SECTIONS: [string, string[]][] = [
  ['Signing in', [
    'Everyone signs in with a second factor, an authenticator app. Without it, the database refuses the request.',
    'Signed out means signed out: an ended session stops on its next request.',
    'You can see the devices you are signed in on, and end any of them.',
    'On Enterprise, your people sign in through your own identity provider.',
  ]],
  ['Who sees what', [
    "Every record is guarded by the database's own access rules, so each person sees only what their role allows.",
    'Every access rule is tested automatically on every change to the platform.',
  ]],
  ['Medical details', ['Medical details are read only by the person they belong to and our medical concierge team. Never by their employer, its HR or a broker.']],
  ['Documents', ['Documents are kept in private storage. Each opens through a link that lasts a minute or two, issued only after we check you may see it.']],
  ['Encryption', ['Your records and documents are encrypted in transit and at rest. Identity numbers are encrypted a second time, by Covarage, inside the database.']],
  ['A record of every change', [
    "Every change our team makes to your records is logged: who made it, what changed and when. When our team opens someone's personal details, that is logged too.",
    'The log has no time limit, and no one can edit it through the platform.',
  ]],
  ['Changes to the platform', ['Every change is checked automatically before release. A change to the database is reviewed and tested on a copy first.']],
  ['Backups', ['The database is backed up every day, and a separate full copy of every record and file is taken and kept outside the platform.']],
  ['If something goes wrong', ["We have a written incident response plan, and a personal data breach plan under Singapore's Personal Data Protection Act."]],
  ['Where your data is held', [
    "Your records, your documents and the platform's servers are in Singapore, and our emails are sent from Singapore.",
    "WhatsApp and SMS messages pass through our messaging provider's United States region.",
    'Our hosting provider may process operational data, such as logs, in the United States.',
    'On Enterprise, your group can have a private instance in a region it chooses, or run Covarage on its own servers.',
  ]],
];
const SUPPLIERS: [string, string, string][] = [
  ['Vercel', 'Hosts the platform', 'SOC 2 Type II; ISO/IEC 27001'],
  ['Supabase', 'Database, sign-in and file storage', 'SOC 2 Type II; ISO/IEC 27001'],
  ['Amazon Web Services', 'Email', 'ISO/IEC 27001; SOC 1, 2 and 3'],
  ['Twilio', 'WhatsApp and SMS', 'ISO/IEC 27001, 27017 and 27018; SOC 2 Type II (company-wide)'],
];
const AFTER: [string, string][] = [
  ['Our own certifications', "We have begun our groundwork for Singapore's Cyber Trust mark and Data Protection Trustmark."],
  ['For your IT team', "Enterprise customers receive a written technical overview for their IT team's review, and an independent penetration test before go-live."],
];

const H3 = 'm-0 font-serif text-[22px]/[1.25] font-normal text-text-primary-extended';

export default function Security() {
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo title="Security | Covarage" description="How Covarage protects your business's records and your people's personal details: sign-in, access, files, audit, backups and where your data is held." path="/security" />
      <LanderHeader />
      <main data-security>
        <section className={`${WRAP} pt-12 pb-10 lg:pt-20 lg:pb-14`}>
          <p className="m-0 text-xs font-medium tracking-[0.14em] text-primary uppercase">Security</p>
          <h1 className="m-0 mt-4 max-w-[980px] font-serif text-[34px]/[1.08] font-normal tracking-[-1px] text-balance text-text-primary-extended lg:text-[56px] lg:tracking-[-1.8px]">
            How we keep your records safe. <span className="text-[#a3978c]">Your policies, your people and their personal details, protected at every step.</span>
          </h1>
        </section>

        <section className={`${WRAP} pb-16 lg:pb-20`}>
          <div className="grid gap-x-12 gap-y-10 border-t border-hairline-strong pt-10 md:grid-cols-2 lg:pt-12" data-sections>
            {SECTIONS.map(([t, lines]) => (
              <div key={t}>
                <h2 className={H3}>{t}</h2>
                <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
                  {lines.map((l) => (
                    <li key={l} className="flex gap-2.5 text-[15px]/[1.6] text-text-primary">
                      <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-section-alt">
          <div className={`${WRAP} py-16 lg:py-20`}>
            <h2 className="m-0 font-serif text-[28px]/[1.15] font-normal tracking-[-0.8px] text-text-primary-extended lg:text-[40px]">Our suppliers</h2>
            <table className="mt-8 w-full border-collapse text-left" data-suppliers>
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-hairline-strong">
                  <th className="py-3 pr-4 text-sm font-medium text-text-secondary">Supplier</th>
                  <th className="py-3 pr-4 text-sm font-medium text-text-secondary">What it does</th>
                  <th className="py-3 text-sm font-medium text-text-secondary">Its certifications</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLIERS.map(([s, does, certs]) => (
                  <tr key={s} className="block border-b border-border-primary py-3 md:table-row md:py-0">
                    <th scope="row" className="block py-0.5 pr-4 font-serif text-[18px] font-normal text-text-primary-extended md:table-cell md:py-4">{s}</th>
                    <td className="block py-0.5 pr-4 text-[15px] text-text-primary md:table-cell md:py-4">{does}</td>
                    <td className="block py-0.5 text-[15px] text-text-secondary md:table-cell md:py-4">{certs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="m-0 mt-4 text-sm text-text-secondary">Each supplier publishes its reports on its own trust page.</p>
          </div>
        </section>

        <section className={`${WRAP} py-16 lg:py-20`}>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {AFTER.map(([t, b]) => (
              <div key={t} className="border-t border-hairline-strong pt-5">
                <h2 className={H3}>{t}</h2>
                <p className="m-0 mt-3 text-[15px]/[1.6] text-text-primary">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 rounded-2xl bg-primary-extended p-7 text-white lg:mt-20 lg:p-10" data-close>
            <p className="m-0 font-serif text-[24px]/[1.25] lg:text-[30px]">Questions from your IT or security team?</p>
            <p className="m-0 mt-3 text-base text-[#E8E3DD]">Write to us at <a href="mailto:support@covarage.com" className="text-white underline underline-offset-4">support@covarage.com</a>.</p>
            <p className="m-0 mt-5 border-t border-white/20 pt-5 text-[14px] text-[#E8E3DD]">To report a security issue, write to support@covarage.com with Security in the subject.</p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
