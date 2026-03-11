import { Link } from 'react-router-dom';
import { LANDING_CONTAINER_CLASS } from './landingContainer';

const FOOTER_COLUMNS = [
  {
    heading: 'PENSION',
    links: [
      { label: 'FAQs', to: '#' },
      { label: 'FUNDS', to: '#' },
      { label: 'FEES', to: '#' },
      { label: 'IOS APP', to: '#' },
      { label: 'ANDROID APP', to: '#' },
    ],
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'ABOUT', to: '#' },
      { label: 'FCA AUTHORISED', to: '#' },
      { label: 'HELP & SUPPORT', to: '#' },
      { label: 'TRANSFERS DUE DILIGENCE', to: '#' },
    ],
  },
  {
    heading: 'RESOURCES',
    links: [
      { label: 'Articles', to: '#' },
      { label: 'Scam Smart', to: '#' },
      { label: 'MoneyHelper', to: '#' },
      { label: 'TERMS & CONDITIONS', to: '#' },
      { label: 'PRIVACY POLICY', to: '#' },
    ],
  },
  {
    heading: 'SOCIAL',
    links: [
      { label: 'LINKEDIN', to: '#' },
      { label: 'INSTAGRAM', to: '#' },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="bg-landing-footer py-12 lg:py-16">
      <div className={LANDING_CONTAINER_CLASS}>
        {/* Top: logo + nav columns */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <Link to="/" className="shrink-0">
            <img
              src="/assets/images/landing/Logo.png"
              alt="Coverage"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <nav
            className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Footer"
          >
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                  {col.heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-text-secondary hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-border-primary pt-8">
          <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">
            Some important things you should know
          </h3>
          <p className="mt-3 max-w-2xl text-sm/relaxed text-text-primary">
            Covarage is a technology platform that helps businesses organise
            insurance information and connect with licensed insurance brokers.
            COVA is not an insurer and does not provide insurance advice or
            recommendations. All insurance quotations, policies, coverage
            decisions, and claims outcomes are provided by licensed brokers and
            insurers and are subject to their terms and approvals.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border-primary pt-6">
          <p className="text-xs uppercase text-text-secondary">
            © Copyright 2025 Penny Technology Limited. Company Registration:
            11999643. FCA Reference Number: 931299.
          </p>
        </div>
      </div>
    </footer>
  );
}
