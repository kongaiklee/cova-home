import React from 'react';
import FeatureSection, {
  type FeatureSectionProps,
} from '../components/FeatureSection';
import SectionHero from '../components/SectionHero';

const corporatesFeatures: FeatureSectionProps[] = [
  {
    categoryLabel: 'quotations',
    heading: 'Business insurance, explored and purchased digitally',
    description:
      'Browse, compare, and secure insurance plans for your business without offline paperwork or fragmented communication.',
    image: '/assets/banner/banner_image_07.jpg',
    imagePosition: 'left',
    className: 'md:min-h-[804px]',
    bulletPoints: [
      {
        title: 'Plan discovery',
        description:
          'Explore insurance options suited to your business size and industry.',
      },
      {
        title: 'Quotation management',
        description: 'Request, review, and track quotations in one place.',
      },
      {
        title: 'Direct purchase',
        description:
          'Complete insurance purchases digitally and keep records automatically stored.',
      },
    ],
  },
  {
    categoryLabel: 'documents',
    heading: 'One source of truth for company insurance',
    description:
      'Keep all business insurance documents organised, accessible, and up to date.',
    image: '/assets/banner/banner_image_08.jpg',
    imagePosition: 'right',
    className: 'md:min-h-[700px]',
    bulletPoints: [
      {
        title: 'Policy storage',
        description:
          'Upload existing and new company insurance policies securely.',
      },
      {
        title: 'Central access',
        description:
          'Ensure authorised admins can access documents when needed.',
      },
      {
        title: 'Renewal readiness',
        description: 'Maintain clear records to simplify renewals and audits.',
      },
    ],
  },
  {
    categoryLabel: 'employees',
    heading: 'Insurance data that stays in sync with your team',
    description:
      'Manage employee information centrally while keeping individual coverage accurate and visible.',
    image: '/assets/banner/banner_image_09.jpg',
    imagePosition: 'left',
    className: 'md:min-h-[776px]',
    bulletPoints: [
      {
        title: 'Employee list management',
        description: 'Add, update, and maintain employee records in one place.',
      },
      {
        title: 'Profile linkage',
        description:
          'Employer details appear automatically on employees’ individual COVA profiles.',
      },
      {
        title: 'Coverage accuracy',
        description:
          'Reduce discrepancies between HR records and insurance information.',
      },
    ],
  },
  {
    categoryLabel: 'vehicles',
    heading: 'Company vehicles, clearly tracked',
    description:
      'Manage insured vehicles alongside your other business assets.',
    image: '/assets/banner/banner_image_10.jpg',
    imagePosition: 'right',
    className: 'md:min-h-[700px]',
    bulletPoints: [
      {
        title: 'Vehicle records',
        description: 'Maintain a list of company vehicles within the platform.',
      },
      {
        title: 'Insurance alignment',
        description: 'Link vehicle insurance details directly to each record.',
      },
      {
        title: 'Simplified oversight',
        description:
          'Keep documentation organised without external spreadsheets.',
      },
    ],
  },
  {
    categoryLabel: 'company management',
    heading: 'Control how your organisation operates',
    description:
      'Set up and manage company details, admin access, and permissions from a single dashboard.',
    image: '/assets/banner/banner_image_11.jpg',
    imagePosition: 'left',
    className: 'md:min-h-[700px]',
    bulletPoints: [
      {
        title: 'Company details',
        description: 'Manage registered information and company addresses.',
      },
      {
        title: 'Admin management',
        description: 'Add sub-admins and assign access levels.',
      },
      {
        title: 'Roles and permissions',
        description:
          'Control who can view, edit, or manage different areas of the account.',
      },
    ],
  },
];

const Corporates: React.FC = () => {
  return (
    <React.Fragment>
      <SectionHero
        heading="Insurance that scales with your business"
        description="COVA gives businesses a central place to manage insurance, people, and assets — without disconnect from individual employees."
        image="/assets/banner/banner_image_06.jpg"
        primaryButtonText="Try COVA Corporate"
        primaryButtonLink={`${import.meta.env.VITE_APP_COVARAGE_URL}/work/signup`}
      />

      {corporatesFeatures.map((feature) => (
        <FeatureSection key={feature.categoryLabel} {...feature} />
      ))}
    </React.Fragment>
  );
};

export default Corporates;
