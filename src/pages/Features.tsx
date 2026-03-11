import React from 'react';
import FeatureSection, {
  type FeatureSectionProps,
} from '../components/FeatureSection';
import SectionHero from '../components/SectionHero';

const features: FeatureSectionProps[] = [
  {
    categoryLabel: 'concierge',
    heading: 'Healthcare bookings, handled for you',
    description:
      'Request appointments and services with confidence, knowing they’re aligned with your insurance coverage.',
    image: '/assets/banner/banner_image_13.jpg',
    imagePosition: 'left',
    className: 'md:min-h-[740px]',
    bulletPoints: [
      {
        title: 'Coverage-aware bookings',
        description:
          'Requests are made based on what your policy includes, reducing uncertainty and manual checks.',
      },
      {
        title: 'Service coordination',
        description:
          'Book GP visits, health screenings, and related services through one channel.',
      },
      {
        title: 'Less back-and-forth',
        description:
          'Spend less time coordinating appointments and more time focusing on your health.',
      },
    ],
  },
  {
    categoryLabel: 'documents',
    heading: 'Your insurance policies, organised and accessible',
    description:
      'Keep all your insurance documents in one secure place, ready whenever you need them.',
    image: '/assets/banner/banner_image_14.jpg',
    imagePosition: 'right',
    className: 'md:min-h-[776px]',
    bulletPoints: [
      {
        title: 'Document uploads',
        description:
          'Add existing and new insurance policies directly to your account.',
      },
      {
        title: 'Central storage',
        description:
          'Access all your coverage documents without searching through emails or folders.',
      },
      {
        title: 'Always up to date',
        description: 'Maintain a clear view of your active insurance policies.',
      },
    ],
  },
  {
    categoryLabel: 'profile management',
    heading: 'Your details, managed with ease',
    description:
      'Keep your personal and insurance-related information accurate and up to date.',
    image: '/assets/banner/banner_image_15.jpg',
    imagePosition: 'left',
    className: 'md:min-h-[700px]',
    bulletPoints: [
      {
        title: 'Personal information',
        description: 'Update contact details and addresses in one place.',
      },
      {
        title: 'Employer information',
        description:
          'View employer-provided insurance details when applicable.',
      },
      {
        title: 'Single account view',
        description:
          'Manage personal and work-related coverage without switching accounts.',
      },
    ],
  },
];

const Features: React.FC = () => {
  return (
    <React.Fragment>
      <SectionHero
        heading="Manage your insurance, in one place"
        description="COVA helps you stay organised, understand your coverage, and access healthcare services — without paperwork or unnecessary complexity."
        image="/assets/banner/banner_image_12.jpg"
        primaryButtonText="Start for free"
        primaryButtonLink={`${import.meta.env.VITE_APP_COVARAGE_URL}/registration-type`}
      />

      {features.map((feature) => (
        <FeatureSection key={feature.categoryLabel} {...feature} />
      ))}
    </React.Fragment>
  );
};

export default Features;
