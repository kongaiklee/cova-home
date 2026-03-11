import React, { useState } from 'react';
import clsx from 'clsx';
import SectionHero from '../components/SectionHero';
import FeatureSection from '../components/FeatureSection';
import { motion } from 'motion/react';

const features = [
  {
    key: 'concierge',
    title: 'Concierge',
    description:
      'Book GP visits, health screenings, and other covered services directly through COVA so you know what applies before you go.',
    image: '/assets/banner/banner_image_02.jpg',
  },
  {
    key: 'documents',
    title: 'Documents',
    description:
      'Upload, store, and manage your policies in one secure location. Track coverage details and keep documents accessible whenever you need them.',
    image: '/assets/banner/banner_image_03.jpg',
  },
  {
    key: 'profile',
    title: 'Profile',
    description:
      'Manage personal information, addresses, and employer details. If your insurance is provided through work, your employer information appears automatically.',
    image: '/assets/banner/banner_image_04.jpg',
  },
];

const Home: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  return (
    <React.Fragment>
      <SectionHero
        heading="Insurance, without the admin."
        description="COVA helps you book healthcare services based on your coverage, keep policies organised, and manage personal details without paperwork or back-and-forth."
        image="/assets/banner/banner_image_01.jpg"
        primaryButtonText="Start for free"
        primaryButtonLink={`${import.meta.env.VITE_APP_COVARAGE_URL}/registration-type`}
        secondaryButtonText="COVA for Corporates"
        secondaryButtonLink={`${import.meta.env.VITE_APP_COVARAGE_URL}/work/signup`}
      />

      <motion.section
        className="flex flex-col md:flex-row justify-between items-stretch max-w-container gap-6 p-6 md:p-12 lg:p-20 mx-auto md:min-h-[864px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-cover bg-center bg-no-repeat w-full max-w-full md:max-w-[632px] aspect-3/2 md:aspect-auto"
          style={{ backgroundImage: `url(${activeFeature.image})` }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          key={activeFeature.key}
        />
        <motion.div
          className="w-full max-w-full md:max-w-[524px] flex flex-col justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-text-primary text-3xl lg:text-5xl font-medium mb-2">
              What You Can Do with COVA
            </h2>
            <p className="text-base lg:text-lg text-text-primary">
              Concierge support, clear coverage, and all your insurance
              documents — managed in one place.
            </p>
          </motion.div>
          <div>
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                className={clsx(
                  'py-3 md:py-5 border-b-2 cursor-pointer',
                  activeFeature.key === feature.key
                    ? 'border-primary'
                    : 'border-border-primary'
                )}
                onClick={() => setActiveFeature(feature)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <h3
                  className={clsx(
                    'text-base font-medium mb-2',
                    activeFeature.key === feature.key
                      ? 'text-text-primary'
                      : 'text-text-secondary'
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={clsx(
                    'text-sm',
                    activeFeature.key === feature.key
                      ? 'text-text-primary'
                      : 'text-text-secondary'
                  )}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <FeatureSection
        heading="Running a business or managing a team?"
        description="COVA also provides tools to manage business insurance, employees, and company assets — all connected to individual accounts."
        image="/assets/banner/banner_image_05.jpg"
        imagePosition="right"
        className="md:min-h-[776px]"
        bulletPoints={[
          {
            title: 'Quotations',
            description:
              'Browse, compare, and secure insurance plans for your business without offline paperwork or fragmented communication.',
          },
          {
            title: 'Employee Management',
            description:
              'Manage employee information centrally while keeping individual coverage accurate and visible.',
          },
          {
            title: 'Vehicle Records',
            description:
              'Manage insured vehicles alongside your other business assets.',
          },
        ]}
        primaryButtonText="Explore COVA Corporate"
        primaryButtonLink={`${import.meta.env.VITE_APP_COVARAGE_URL}/signin`}
      />
    </React.Fragment>
  );
};

export default Home;
