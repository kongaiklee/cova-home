import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';

const inline = 'underline underline-offset-2 hover:text-primary';
const label = 'm-0 text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase';

/** One route line: bold lead-in qualifies the reader, the rest offers. Copy is CMO s13, Kong's own. */
function Route({ children }: { children: ReactNode }) {
  return <p className="m-0 mb-5 max-w-[54ch] text-base/[1.65] last:mb-0">{children}</p>;
}

/**
 * /contact - one page, one job: reach a person. Not a second request form; the
 * lander's card is the conversion path and there is one endpoint, not two.
 * Copy: PAGE_COPY_vanilla.md s13. Design: CD Contact.dc.html / Contact-phone.dc.html.
 * There is deliberately no Hours block (Kong struck it) and no form.
 */
export default function Contact() {
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo
        title="Contact Covarage"
        description="Every enquiry has a desk. We reply to everyone within 24 hours."
        path="/contact"
      />
      <LanderHeader />
      <main className={`${WRAP} pt-12 pb-16 lg:pt-[88px] lg:pb-[120px]`}>
        <h1 className="m-0 font-serif text-4xl/[1.12] tracking-[-1.2px] text-balance lg:text-[48px]/[1.08] lg:tracking-[-1.4px]">
          Every enquiry has a desk.
        </h1>
        {/* A service standard, not a strapline - serif, directly under the h1, never body text. */}
        <p className="m-0 mt-3 font-serif text-[21px]/[1.35] lg:mt-4 lg:text-[26px]/[1.3]">
          We reply to everyone within 24 hours.
        </p>

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_416px] lg:items-start lg:gap-x-20">
          <div className="border-t border-border-primary pt-8">
            <Route>
              <strong className="font-semibold">Advisers and brokers.</strong> Does your organisation
              have expertise protecting SMEs?{' '}
              <a href="mailto:support@covarage.com" className={inline}>Write to us</a> with the lines
              you place.
            </Route>
            <Route>
              <strong className="font-semibold">Insurers.</strong> Have a product that benefits our
              users? <a href="mailto:support@covarage.com" className={inline}>Send it to us here</a>.
            </Route>
            <Route>
              <strong className="font-semibold">Press.</strong>{' '}
              <a href="mailto:support@covarage.com" className={inline}>Email us</a> for the press kit.
            </Route>
            <Route>
              <strong className="font-semibold">Investors.</strong> If you back making insurance
              accessible to every SME in Singapore,{' '}
              <a href="mailto:support@covarage.com" className={inline}>write to us</a> for the
              investor pack.
            </Route>
            <Route>
              <strong className="font-semibold">Joining us.</strong>{' '}
              <a href="mailto:careers@covarage.com" className={inline}>careers@covarage.com</a>. Open
              roles are at <Link to="/careers" className={inline}>/careers</Link>.
            </Route>
            <Route>
              <strong className="font-semibold">Your data.</strong>{' '}
              <a href="mailto:dpo@covarage.com" className={inline}>dpo@covarage.com</a>. Ask what we
              hold, correct it, or have it deleted. That is the PDPA.
            </Route>
            <Route>
              <strong className="font-semibold">Already a customer?</strong> If the usual channels are
              not working, <a href="mailto:support@covarage.com" className={inline}>support@covarage.com</a>.
            </Route>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="border-t border-border-primary pt-4 pb-7">
              <p className={label}>Email</p>
              <a
                href="mailto:support@covarage.com"
                className="mt-2 inline-block font-serif text-[24px]/[1.2] tracking-[-0.4px] text-text-primary hover:text-primary lg:text-[28px]/[1.2]"
              >
                support@covarage.com
              </a>
            </div>
            <div className="border-t border-border-primary pt-4 pb-7">
              <p className={label}>WhatsApp Business</p>
              <a
                href="https://wa.me/6588670918"
                className="mt-2 inline-block font-serif text-[24px]/[1.2] tracking-[-0.4px] text-text-primary hover:text-primary lg:text-[28px]/[1.2]"
              >
                +65 8867 0918
              </a>
            </div>
            <div className="border-t border-border-primary pt-4 pb-7">
              <p className={label}>Data protection</p>
              <a
                href="mailto:dpo@covarage.com"
                className="mt-2 inline-block text-[17px] text-text-primary hover:text-primary"
              >
                dpo@covarage.com
              </a>
            </div>
            <div className="border-t border-border-primary pt-4 pb-8">
              <p className={label}>Company</p>
              <p className="m-0 mt-2 text-[17px]/[1.7]">
                Covarage Pte. Ltd.<br />
                UEN 202531227H<br />
                20 Cecil Street, #22-00<br />
                PLUS Building, Singapore 049705
              </p>
            </div>
            {/* The lead's redirect - the only line on the page written to the lead. */}
            <div className="border-t border-border-primary pt-7">
              <h2 className="m-0 font-serif text-[22px]/[1.3] tracking-[-0.4px]">
                Looking for cover for your business?
              </h2>
              <p className="m-0 mt-2 text-base/[1.6] text-text-secondary">
                Tell us what you do and we call you back within 24 hours.
              </p>
              <a
                href="/#request"
                className="mt-5 block rounded-sm bg-primary-extended py-3.5 text-center text-[15px] font-medium text-white transition hover:opacity-90"
              >
                Request a call
              </a>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
