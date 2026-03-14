import { FileText, MoreHorizontal, Trash2 } from 'lucide-react';

import { LANDING_CONTAINER_CLASS } from './landingContainer';

export default function LandingHandles() {
  return (
    <section className="bg-landing-section py-12 lg:py-24">
      <div className={LANDING_CONTAINER_CLASS}>
        {/* Mobile: heading + image blocks */}
        <div className="block sm:hidden">
          <p className="text-sm font-medium text-text-secondary">
            What You Can Do with Covarage
          </p>
          <h2 className="mt-4 text-3xl/tight font-serif tracking-tight text-text-primary">
            All features in
            <br />
            one place
          </h2>
          <div className="mt-10 flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                Quotation
              </h3>
              <div className="mt-4 overflow-hidden rounded-xl bg-background-card shadow-sm">
                <img
                  src="/assets/images/landing/mobile-quotation.png"
                  alt="Quotation: GL New Business Submission with documents"
                  className="w-full object-contain object-top"
                />
                <p className="border-t border-border-primary px-4 py-3 text-sm/relaxed text-text-secondary">
                  Submit insurance requests in one place and track progress with
                  your broker from enquiry to confirmation.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                Policy Management
              </h3>
              <div className="mt-4 overflow-hidden rounded-xl bg-background-card shadow-sm">
                <img
                  src="/assets/images/landing/mobile-policy.png"
                  alt="Policy Management: Check signature and document verification"
                  className="w-full object-contain object-top"
                />
                <p className="border-t border-border-primary px-4 py-3 text-sm/relaxed text-text-secondary">
                  Store all policies and documents securely in one workspace,
                  with clear visibility of what you have and what&apos;s next.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                Concierge
              </h3>
              <div className="mt-4 overflow-hidden rounded-xl bg-background-card shadow-sm">
                <img
                  src="/assets/images/landing/mobile-concierge.png"
                  alt="Concierge: Claims and document handling"
                  className="w-full object-contain object-top"
                />
                <p className="border-t border-border-primary px-4 py-3 text-sm/relaxed text-text-secondary">
                  Get administrative support for bookings and coordination
                  related to your employee benefits and covered services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: original heading + 3-column grid */}
        <div className="hidden sm:block">
          <p className="text-xs font-semibold tracking-[0.2em]">
            What You Can Do with Coverage
          </p>
          <h2 className="mt-2 text-left text-3xl tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            What we handle so you don&apos;t have to.
          </h2>
        </div>
        <div className="mt-14 hidden gap-6 sm:grid sm:grid-cols-3">
          {/* Quotation — push effect: content extends right and is clipped */}
          <div className="relative">
            <div className="relative flex flex-col overflow-hidden bg-background-card p-6 pb-0 max-h-[425px]">
              <h3 className="text-2xl font-serif text-text-primary">
                Quotation
              </h3>
              <p className="mt-3 text-sm/relaxed text-text-secondary">
                Tell us what your business needs. We get brokers working on it.
                You stay informed without chasing anyone.
              </p>
              <div className="mt-6 -mr-20 min-w-0 lg:-mr-24">
                <div className="bg-white shadow-sm">
                  {/* Quotation Details */}
                  <div>
                    <p className="text-md tracking-wide text-text-primary py-2 px-4 border-b border-border-primary">
                      Quotation Details
                    </p>
                    <div className="mt-3 mx-4 space-y-3 rounded-lg border border-border-primary bg-background-primary/50 p-3">
                      <div className="flex">
                        <div className="flex-1 pr-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                            Quotation Number
                          </p>
                          <p className="mt-0.5 text-sm font-medium text-text-primary">
                            #Q-10102
                          </p>
                        </div>
                        <div
                          className="w-px shrink-0 bg-border-primary"
                          aria-hidden
                        />
                        <div className="flex-1 pl-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                            Requested Date
                          </p>
                          <p className="mt-0.5 text-sm font-medium text-text-primary">
                            24, Mar 2025
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 border-l-2 border-primary bg-background-primary/80 py-2 pl-3 pr-2">
                        <FileText
                          className="size-4 shrink-0 text-text-secondary"
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs/snug font-semibold text-text-primary">
                            Your policy is ready for review.
                          </p>
                          <p className="mt-0.5 truncate text-xs/snug text-text-secondary">
                            This policy has been completed and is ready for
                            review.
                          </p>
                          <p className="mt-0.5 truncate text-xs/snug text-text-secondary">
                            Please review the details before making any payment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Agent Information */}
                  <div className="mt-4 mx-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      Agent Information
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-border-primary">
                        <img
                          src="/assets/images/landing/avatar.png"
                          alt=""
                          aria-hidden
                          className="size-full rounded-md object-none"
                        />
                      </div>
                      <span className="truncate text-sm font-medium text-text-primary">
                        Jonathan David
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute right-0 inset-y-0 w-px bg-blue-200/60 pointer-events-none"
                aria-hidden
              />
            </div>
            {/* Subtle right-edge line to suggest overflow clip */}
            <p className="absolute w-full font-semibold mt-8 text-[11px] leading-relaxed text-black lg:mt-6">
              *Concierge support is administrative in nature and does not
              replace advice from licensed medical or insurance professionals.
            </p>
          </div>

          {/* Policy Management */}
          <div className="flex flex-col bg-background-card p-6">
            <h3 className="text-2xl font-serif text-text-primary">
              Policy Management
            </h3>
            <p className="mt-3 text-sm/relaxed text-text-secondary">
              Every policy. Every renewal date. Every document. In one place
              that doesn&apos;t disappear when a hard drive does.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { name: 'medical-policy.pdf', size: '369 KB' },
                { name: 'medical-policy.pdf', size: '420 KB' },
                { name: 'medical-policy.pdf', size: '670 KB' },
              ].map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm"
                >
                  <FileText className="size-5 shrink-0 text-text-secondary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {doc.name}
                    </p>
                    <p className="text-xs text-text-secondary">{doc.size}</p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-sm p-1 text-text-secondary hover:bg-background-primary hover:text-text-primary"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Concierge */}
          <div className="flex flex-col bg-background-card p-6">
            <h3 className="text-2xl font-serif text-text-primary">Concierge</h3>
            <p className="mt-3 text-sm/relaxed text-text-secondary">
              Clinic bookings. Benefits coordination. The admin your HR team is
              currently doing on WhatsApp. Handled.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl rounded-bl-sm bg-white p-4 shadow-sm max-w-[150px]">
                <p className="text-sm text-text-primary">How can I help?</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-border-primary">
                    <img
                      src="/assets/images/landing/avatar.png"
                      alt=""
                      aria-hidden
                      className="size-full rounded-md object-none"
                    />
                  </div>
                  <span className="text-xs font-medium text-text-secondary">
                    Nathan
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-lg rounded-br-sm bg-white p-4 shadow-sm">
                  <MoreHorizontal className="size-6 text-text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
