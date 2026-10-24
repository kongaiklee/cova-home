import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';
import { IMG } from '../landing/data';
import { PARTNERS } from '../landing/V13';
import { Proud14 } from '../landing/V14';

/**
 * /partners - PREVIEW on branch homepage-v14 (CD 2026-10-24). Kong (CD's KONG_LOG 376): "can we also have a partnerships page".
 * A new public page: drawn for Kong before TM builds it (his 2026-10-17 rule). Every partner's standing is printed only from the
 * record: CIMB as "partner" and never its rate (Kong 2026-10-17); Deskimo's 100+ locations (Kong 2026-10-22, checked by COO for
 * the investor page); The Runway Ventures on board; the memberships as Kong states them (ASME, SFA, SRA, SMF, SMCCI, RAS).
 * The logos whose standing is not on record appear in Kong's row only, with no description. The four ways to partner are Kong's
 * acquisition strategy (his ruling of 2026-10-06 20:37: associations, HR software - "we make their software more valuable" -
 * corporate secretaries, workspaces and communities). Words: CMO's homepage-v14 lines v1.0 and v1.2 s7 (the hub's w46 21:20, 22:06:
 * Kong 22:03, "Partnerships that empower our users" - the value to users first, the ways to partner second); COO checks each before live.
 */
const logo = (slug: string) => PARTNERS.find((p) => p.slug === slug)!;

function Logo({ slug, h = 28 }: { slug: string; h?: number }) {
  const p = logo(slug);
  return (
    <span className={`inline-flex items-center ${p.light.tile ? 'rounded-lg bg-(--tl) px-[11px] py-[7px]' : ''}`} style={{ '--tl': p.light.tile } as CSSProperties}>
      <img src={`${IMG}/partners/${p.light.file}`} alt={p.alt} className="block w-auto" style={{ height: h }} />
    </span>
  );
}

/** A partner whose logo is not yet cleared for this page (Kong 2026-10-06: its own file and its OK first) - its name, set in type */
function Named({ children }: { children: ReactNode }) {
  return <span className="font-serif text-[22px] text-text-primary-extended">{children}</span>;
}

/** How a user claims a perk today: ask the team (CMO v1.4 - nothing on the platform claims one yet) */
function AskUs({ children }: { children: ReactNode }) {
  return <Link to="/contact" className="font-medium text-primary no-underline hover:underline">{children}</Link>;
}

function Card({ title, children, logos }: { title: string; children: ReactNode; logos: ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl border border-hairline-strong bg-white p-6 lg:p-8">
      <div className="flex min-h-12 flex-wrap items-center gap-x-5 gap-y-3">{logos}</div>
      <h3 className="m-0 mt-6 font-serif text-[24px]/[1.2] font-normal text-text-primary-extended">{title}</h3>
      <p className="m-0 mt-2.5 text-base/[1.6] text-text-secondary">{children}</p>
    </div>
  );
}

const WAYS = [
  ['Associations and chambers', 'Help your members keep their insurance in order: what the law asks of their trade, where their policies are, and when each one renews.'],
  ['HR and payroll software', 'Make your software more valuable. When your customers add or remove staff, we get their work injury and medical cover changed to match.'],
  ['Corporate secretaries', 'Give the companies you set up and serve one place for their insurance, from the first policy.'],
  ['Workspaces and communities', 'Bring the businesses in your spaces and programmes someone who keeps track of their insurance.'],
];

export default function Partners() {
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo title="Partners | Covarage" description="Partnerships that empower our users: the associations, bank, workspaces and communities Covarage works with." path="/partners" />
      <LanderHeader />
      <main>
        <section className={`${WRAP} pt-12 pb-14 lg:pt-24 lg:pb-20`}>
          <p className="m-0 text-xs font-medium tracking-[0.14em] text-primary uppercase">Partners</p>
          <h1 className="m-0 mt-4 max-w-[980px] font-serif text-[34px]/[1.08] font-normal tracking-[-1px] text-balance text-text-primary-extended lg:text-[56px] lg:tracking-[-1.8px]">
            Partnerships that empower our users.{' '}
            <span className="text-[#a3978c]">For the businesses that use Covarage: an introduction to a bank, free workspace credits on the way, and member prices from our partners.</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
            <a href="https://platform.covarage.com/sign-up" className="inline-flex items-center rounded-md bg-primary-extended px-5 py-3 text-[15px] font-medium text-white no-underline hover:opacity-90">Sign up free</a>
            <a href="#who" className="inline-flex items-center rounded-md border border-hairline-strong bg-white px-5 py-3 text-[15px] font-medium text-text-primary no-underline">See who we work with&nbsp;&darr;</a>
          </div>
        </section>
        <Proud14 />
        <section id="who" className="scroll-mt-24">
          <div className={`${WRAP} py-16 lg:py-28`}>
            <h2 className="m-0 font-serif text-[32px]/[1.1] font-normal tracking-[-1px] text-text-primary-extended lg:text-[48px] lg:tracking-[-1.6px]">Who we work with</h2>
            <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-2 lg:gap-5">
              <Card title="Business associations" logos={<><Logo slug="asme" h={34} /><Logo slug="sfa-member" h={27} /><Logo slug="sra" h={26} /><Logo slug="smcci" h={44} /><Logo slug="smf" h={26} /></>}>
                Covarage is a member of ASME, the Singapore FinTech Association, the Singapore Retailers Association, the Singapore Manufacturing Federation, the Singapore Malay Chamber of Commerce and Industry, and the Restaurant Association of Singapore, and an associate member of the Association of Certified Security Agencies and the Federation of Merchants&apos; Associations, Singapore. If your business belongs to one of them, we are members alongside you.
              </Card>
              <Card title="Banking" logos={<Logo slug="cimb" h={26} />}>
                CIMB is a Covarage partner. <AskUs>Ask us</AskUs>, and we will put you in touch with CIMB&apos;s business banking team.
              </Card>
              <Card title="Workspaces" logos={<Logo slug="deskimo" h={22} />}>
                Deskimo, with more than 100 locations across Singapore. Free Deskimo credits for Covarage users are on the way.
              </Card>
              <Card title="Ventures and communities" logos={<Logo slug="runway-ventures" h={18} />}>
                The Runway Ventures is on board with Covarage. Covarage users get a preferential rate on its services. <AskUs>Ask us for an introduction.</AskUs>
              </Card>
              <Card title="Legal" logos={<Named>Charlie AI</Named>}>
                Charlie AI, a legal platform built in Singapore: ask legal questions, draft documents such as employment contracts and NDAs, and upload a contract to see, clause by clause, what to look at before you sign. Covarage users get one month of unlimited use free, then 25% off the paid plans: Plus at S$17.25 a month instead of S$23, and Golden at S$43.50 instead of S$58. Use the code COVARAGE25 at <a href="http://charlie-legal.com/" target="_blank" rel="noopener noreferrer" className="text-text-primary underline underline-offset-4">charlie-legal.com</a> for the member price, and <AskUs>ask us for your free month</AskUs>.
              </Card>
              <Card title="Marketing and growth" logos={<Named>CoInside</Named>}>
                CoInside, a senior marketing and growth consultancy. Planning a launch or a big marketing push? Their Growth and GTM Diagnostic tells you where the opportunity is, what to do first and where to put your marketing budget, with a written report and a review session. Covarage clients pay S$900 instead of S$2,500, after a free 60-minute conversation. <AskUs>Ask us for an introduction.</AskUs>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-primary-extended text-white">
          <div className={`${WRAP} py-16 lg:py-28`}>
            <h2 className="m-0 max-w-[760px] font-serif text-[32px]/[1.1] font-normal tracking-[-1px] lg:text-[48px] lg:tracking-[-1.6px]">Partner with Covarage</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {WAYS.map(([t, b]) => (
                <div key={t} className="bg-primary-extended p-6 lg:p-8">
                  <h3 className="m-0 font-serif text-[22px]/[1.25] font-normal">{t}</h3>
                  <p className="m-0 mt-3 text-[15px]/[1.6] text-[#E8E3DD]">{b}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="mt-10 inline-flex items-center rounded-md bg-white px-5 py-3 text-[15px] font-medium text-text-primary-extended no-underline hover:opacity-90">Talk to us about partnering&nbsp;&rarr;</Link>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
