import React, { useCallback } from 'react';
import Button from './Button';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

export interface SectionHeroProps {
  heading: string;
  description: string;
  image: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  className?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({
  heading,
  description,
  image,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonLink,
  secondaryButtonLink,
  className,
}) => {
  const handlePrimaryButtonClick = useCallback(() => {
    if (primaryButtonLink) {
      window.open(primaryButtonLink, '_blank', 'noopener,noreferrer');
    }
  }, [primaryButtonLink]);

  const handleSecondaryButtonClick = useCallback(() => {
    if (secondaryButtonLink) {
      window.open(secondaryButtonLink, '_blank', 'noopener,noreferrer');
    }
  }, [secondaryButtonLink]);

  return (
    <section
      className={clsx(
        'bg-background-primary-extended flex flex-col lg:flex-row gap-4 lg:gap-4 min-h-[500px] lg:h-[680px] pt-20 lg:pt-0',
        className
      )}
    >
      <div className="flex-1 flex items-center px-6 md:px-12 lg:px-0 lg:pl-20">
        <div className="w-full py-8 lg:py-0">
          <motion.h1
            className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight lg:text-[56px] lg:leading-[64px] font-medium text-text-primary mb-2 max-w-full lg:max-w-[632px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            {heading}
          </motion.h1>
          <motion.p
            className="text-text-primary text-base sm:text-lg max-w-[430px] mt-4 sm:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            {description}
          </motion.p>
          {(primaryButtonText || secondaryButtonText) && (
            <motion.div
              className="flex gap-3 mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              {primaryButtonText && (
                <Button variant="primary" onClick={handlePrimaryButtonClick}>
                  {primaryButtonText}
                </Button>
              )}
              {secondaryButtonText && (
                <Button
                  variant="secondary"
                  onClick={handleSecondaryButtonClick}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <div
        className="bg-cover bg-center bg-no-repeat w-full lg:size-full h-[300px] sm:h-[400px] md:h-[500px] lg:max-w-[604px] 2xl:max-w-[780px] shrink-0"
        style={{ backgroundImage: `url(${image})` }}
      />
    </section>
  );
};

export default SectionHero;
