import React, { useCallback } from 'react';
import clsx from 'clsx';
import Button from './Button';
import { motion } from 'motion/react';

export interface BulletPoint {
  title: string;
  description: string;
}

export interface FeatureSectionProps {
  image: string;
  imagePosition?: 'left' | 'right';
  categoryLabel?: string;
  heading: string;
  description: string;
  bulletPoints: BulletPoint[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  image,
  imagePosition = 'left',
  categoryLabel,
  heading,
  description,
  bulletPoints,
  primaryButtonText,
  primaryButtonLink,
  className = 'md:min-h-[740px]',
}) => {
  const handlePrimaryButtonClick = useCallback(() => {
    if (primaryButtonLink) {
      window.open(primaryButtonLink, '_blank', 'noopener,noreferrer');
    }
  }, [primaryButtonLink]);

  return (
    <motion.section
      className={clsx(
        'flex flex-col justify-between items-stretch max-w-container gap-6 p-6 md:p-12 lg:p-20 mx-auto',
        className,
        imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-cover bg-center bg-no-repeat w-full max-w-full md:max-w-[632px] aspect-3/2 md:aspect-auto"
        style={{ backgroundImage: `url(${image})` }}
        initial={{
          opacity: 0,
          x: imagePosition === 'left' ? -30 : 30,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.div
        className="w-full max-w-full md:max-w-[524px] flex flex-col justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {categoryLabel && (
          <motion.div
            className="mb-2 md:mb-3 w-fit"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-primary text-xs font-medium uppercase">
              {categoryLabel}
            </span>
          </motion.div>
        )}
        <motion.div
          className="mb-6 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-text-primary text-3xl lg:text-5xl font-medium mb-3">
            {heading}
          </h2>
          <p className="text-base lg:text-lg text-text-primary">
            {description}
          </p>
        </motion.div>
        <ul className="space-y-4 list-none">
          {bulletPoints.map((point, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <span className="size-2 bg-primary mt-2 shrink-0" />
              <div>
                <p className="text-sm text-text-primary font-medium">
                  {point.title}
                </p>
                <p className="text-sm text-text-secondary">
                  {point.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
        {primaryButtonText && (
          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button variant="primary" onClick={handlePrimaryButtonClick}>
              {primaryButtonText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default FeatureSection;
