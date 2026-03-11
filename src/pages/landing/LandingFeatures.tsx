import clsx from 'clsx';
import { Trash2, X } from 'lucide-react';
import { useState } from 'react';

const FEATURES = [
  {
    id: 'company-profile',
    title: 'Company Profile',
    description:
      'One set of details. Reused across every submission. Never fill in the same form twice.',
  },
  {
    id: 'employee-management',
    title: 'Employee Management',
    description:
      'Your team sees what applies to them. Nothing more, nothing less.',
  },
  {
    id: 'vehicle-management',
    title: 'Vehicle Management',
    description:
      'Every company vehicle tracked. Renewals flagged before they lapse.',
  },
];

import { LANDING_CONTAINER_CLASS } from './landingContainer';

export default function LandingFeatures() {
  const [activeId, setActiveId] = useState('employee-management');

  return (
    <section className="bg-landing-section py-16 lg:py-24">
      <div className={clsx(LANDING_CONTAINER_CLASS, 'flex flex-col gap-10')}>
        {/* Label + headline */}
        <div>
          <p className="text-xs font-semibold tracking-tight">
            Coverage features
          </p>
          <h2 className="mt-3 text-3xl/tight font-serif hidden lg:block text-text-primary sm:text-4xl lg:text-4xl/tight">
            You didn&apos;t build this business to spend
            <br />
            <span className="text-text-primary">
              Fridays chasing renewal paperwork
            </span>
          </h2>
          <h2 className="block lg:hidden text-3xl/tight font-serif text-text-primary sm:text-4xl lg:text-4xl/tight mt-3">
            Built for business owners and operators.
          </h2>
        </div>

        {/* Image + feature list in one row; on mobile list first, then image */}
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-10 sm:items-start">
          {/* Image with overlay */}
          <div className="relative order-2 min-w-0 flex-1 overflow-hidden rounded-xl shadow-md ring-1 ring-border-primary/60 sm:order-0">
            <img
              src="/assets/images/landing/getty-images-3uqoKNEU39k-unsplash.png"
              alt=""
              className="w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background-muted to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-4 inset-x-4 max-w-[280px] rounded-xl bg-white p-3 shadow-xl ring-1 ring-border-primary/80 sm:left-6">
              {/* Mobile: rule/verification card style */}
              <div className="lg:hidden">
                <p className="text-[11px] font-normal text-text-secondary">
                  Rule: At least one proposed insured
                </p>
                <p className="mt-2 text-sm/snug font-bold text-text-primary">
                  Checked that there is at least one proposed insured.
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="rounded-md bg-amber-100 px-2.5 py-1.5 text-xs font-normal text-text-primary">
                    Running
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border-primary text-xs text-text-secondary"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border-primary text-primary"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              {/* Desktop: Add employee form */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-normal text-text-primary">
                    Add employee
                  </h3>
                  <button
                    type="button"
                    className="rounded-sm p-1 text-text-secondary hover:bg-background-primary hover:text-text-primary"
                    aria-label="Close"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                <p className="mt-2 border-t border-border-primary pt-2 text-[10px] font-normal uppercase tracking-wider text-text-secondary">
                  Personal Information
                </p>
                <div className="mt-0 space-y-0">
                  <div className="border-t border-border-primary pt-2">
                    <label className="block text-[10px] font-normal text-text-secondary">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="mt-0.5 w-full rounded-sm border border-border-primary px-2.5 py-1.5 text-[11px] font-normal placeholder:text-text-secondary focus:border-border-primary focus:outline-none"
                      readOnly
                      tabIndex={-1}
                    />
                  </div>
                  <div className="border-t border-border-primary pt-2">
                    <label className="block text-[10px] font-normal text-text-secondary">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      placeholder="1029384758"
                      className="mt-0.5 w-full rounded-sm border border-border-primary px-2.5 py-1.5 text-[11px] font-normal placeholder:text-text-secondary focus:border-border-primary focus:outline-none"
                      readOnly
                      tabIndex={-1}
                    />
                  </div>
                  <div className="flex gap-2 border-t border-border-primary pt-2">
                    <div className="min-w-0 flex-1">
                      <label className="block text-[10px] font-normal text-text-secondary">
                        Department
                      </label>
                      <select
                        className="mt-0.5 w-full rounded-sm border border-border-primary bg-white px-2.5 py-1.5 text-[11px] font-normal text-text-secondary focus:border-border-primary focus:outline-none"
                        disabled
                      >
                        <option>Select option</option>
                      </select>
                    </div>
                    <div className="min-w-0 flex-1">
                      <label className="block text-[10px] font-normal text-text-secondary">
                        Designation
                      </label>
                      <select
                        className="mt-0.5 w-full rounded-sm border border-border-primary bg-white px-2.5 py-1.5 text-[11px] font-normal text-text-secondary focus:border-border-primary focus:outline-none"
                        disabled
                      >
                        <option>Select option</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-0 flex justify-end gap-2 border-t border-border-primary pt-3">
                  <button
                    type="button"
                    className="rounded-sm border border-border-primary bg-white px-3 py-1.5 text-[11px] font-normal text-text-secondary hover:bg-background-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-sm bg-primary px-3 py-1.5 text-[11px] font-normal text-white hover:bg-primary-hover"
                  >
                    Add employee
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Numbered feature list */}
          <ul className="order-1 w-full shrink-0 space-y-6 sm:order-0 sm:w-[320px] sm:pt-2">
            {FEATURES.map((feature, index) => {
              const isActive = activeId === feature.id;
              return (
                <li
                  key={feature.id}
                  role="button"
                  tabIndex={0}
                  className={clsx(
                    'flex cursor-pointer gap-4 border-t border-border-primary pt-4 transition-[opacity,background-color] duration-200 rounded-lg -mx-1 px-1 hover:bg-border-primary/10',
                    isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  )}
                  onClick={() => setActiveId(feature.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveId(feature.id);
                    }
                  }}
                >
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                    {/* Circle: stable size, deactive = gray, active = black */}
                    <span
                      className={clsx(
                        'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                        isActive
                          ? 'bg-text-primary text-white'
                          : 'bg-text-secondary text-white'
                      )}
                    >
                      {index + 1}
                    </span>
                    {/* Active only: 90° pie border (arc) outside circle with gap */}
                    {isActive && (
                      <svg
                        className="absolute inset-0 h-full w-full -rotate-90"
                        viewBox="0 0 32 32"
                        aria-hidden
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="var(--color-text-primary)"
                          strokeWidth="2"
                          strokeDasharray="23.6 70.6"
                          strokeLinecap="butt"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base text-text-primary lg:text-sm">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs/relaxed text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
