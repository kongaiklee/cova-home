import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';
import rolesRaw from '../../content/careers.md?raw';

interface Role {
  title: string;
  team: string;
  location: string;
  href: string;
}

/** Roles come from content/careers.md - a text edit and a redeploy, never a JSX edit. */
const ROLES: Role[] = rolesRaw
  .split(/\r?\n/)
  .filter((line) => line.startsWith('- '))
  .map((line) => line.slice(2).split('|').map((part) => part.trim()))
  .filter((parts): parts is [string, string, string, string] => parts.length === 4 && parts.every(Boolean))
  .map(([title, team, location, href]) => ({ title, team, location, href }));

/**
 * /careers - tell a good candidate what this company is and how to write in,
 * without inventing openings. Ships with zero roles and reads well that way.
 * Copy: PAGE_COPY_vanilla.md s14. Design: CD Careers.dc.html / Careers-phone.dc.html.
 * No photograph, no perks, no hiring embed, no count of people or clients.
 */
export default function Careers() {
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo
        title="Work at Covarage"
        description="Keeping your insurance in order should not require a department. We hire into engineering, insurance operations, content and design."
        path="/careers"
      />
      <LanderHeader />
      <main className={`${WRAP} pt-12 pb-16 lg:pt-[88px] lg:pb-[120px]`}>
        <h1 className="m-0 font-serif text-4xl/[1.12] tracking-[-1.2px] text-balance lg:text-[48px]/[1.08] lg:tracking-[-1.4px]">
          Work at Covarage.
        </h1>

        <div className="mt-9 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start lg:gap-x-20">
          <div>
            <p className="m-0 max-w-[26ch] font-serif text-[24px]/[1.3] tracking-[-0.5px] lg:text-[30px]/[1.28] lg:tracking-[-0.6px]">
              Keeping your insurance in order should not require a department.
            </p>
            <p className="m-0 mt-4 max-w-[48ch] text-base/[1.65]">
              We build that department for the companies that will never hire one. A named adviser, a
              review at every renewal, and someone who does the chasing.
            </p>
          </div>
          <div className="mt-10 border-t border-border-primary pt-6 lg:mt-0">
            {/* The four disciplines are the referent for `which of the four you would own` - the emphasis is load-bearing. */}
            <p className="m-0 text-[17px]/[1.75] text-text-secondary">
              We hire into{' '}
              <span className="text-text-primary">engineering, insurance operations, content and design</span>.
              Everything is written down, every claim is measured before it is made, and the standard
              does not move for anyone.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-border-primary pt-10 lg:mt-24 lg:pt-12">
          <h2 className="m-0 font-serif text-[28px]/[1.2] tracking-[-0.5px] lg:text-[34px]/[1.2]">
            Open roles
          </h2>
          <div className="mt-6 lg:mt-8 lg:flex lg:items-start lg:justify-between lg:gap-x-16">
            {ROLES.length === 0 ? (
              <p className="m-0 max-w-[46ch] text-base/[1.65]">
                No roles posted today. Write to careers@covarage.com and tell us which of the four you
                would own.
              </p>
            ) : (
              <ul className="m-0 w-full max-w-[560px] list-none divide-y divide-border-primary p-0">
                {ROLES.map((role) => (
                  <li key={role.title} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4 first:pt-0">
                    <a
                      href={role.href}
                      className="text-[17px] font-semibold text-text-primary underline-offset-2 hover:text-primary"
                    >
                      {role.title}
                    </a>
                    <span className="text-[15px] text-text-secondary">{role.team}</span>
                    <span className="text-[15px] text-text-secondary">{role.location}</span>
                  </li>
                ))}
              </ul>
            )}
            <a
              href="mailto:careers@covarage.com"
              className="mt-7 block rounded-sm bg-primary-extended px-[26px] py-3.5 text-center text-[15px] font-medium text-white transition hover:opacity-90 lg:mt-0 lg:inline-block lg:shrink-0 lg:py-[13px]"
            >
              careers@covarage.com
            </a>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
