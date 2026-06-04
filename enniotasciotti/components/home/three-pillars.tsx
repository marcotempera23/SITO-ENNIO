'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/shared/section-heading';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: EASE },
  }),
};

export function ThreePillars() {
  const t = useTranslations('home.pillars');

  const pillars = [
    { number: '01', title: t('nano.title'), body: t('nano.body') },
    { number: '02', title: t('regen.title'), body: t('regen.body') },
    { number: '03', title: t('longevity.title'), body: t('longevity.body') },
  ];

  return (
    <section aria-labelledby="pillars-heading" className="py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="pillars-heading"
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Broken-grid layout: pillar 01 full-left, 02+03 stack on the right */}
        <div className="mt-16 grid md:grid-cols-[1fr_1fr] gap-0 border border-[var(--color-border)]">

          {/* Pillar 01 — tall, full left */}
          <motion.div
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="group relative border-b md:border-b-0 md:border-r border-[var(--color-border)] p-10 md:p-14 flex flex-col justify-end min-h-[340px] overflow-hidden"
          >
            {/* Oversized background number */}
            <span
              aria-hidden="true"
              className="absolute top-6 right-6 font-display text-[9rem] leading-none font-light select-none text-[var(--color-surface-2)] transition-colors duration-500 group-hover:text-[var(--color-accent)] opacity-40"
            >
              {pillars[0].number}
            </span>
            {/* Hover accent line */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[3px] w-full bg-[var(--color-accent)] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <h3 className="font-display text-step-3 font-light leading-snug text-[var(--color-text)] relative z-10">
              {pillars[0].title}
            </h3>
            <p className="mt-4 text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-sm relative z-10">
              {pillars[0].body}
            </p>
          </motion.div>

          {/* Pillars 02 + 03 — stacked right column */}
          <div className="flex flex-col">
            {pillars.slice(1).map((pillar, i) => (
              <motion.div
                key={pillar.number}
                custom={i + 1}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`group relative p-8 md:p-10 flex flex-col justify-end min-h-[170px] overflow-hidden ${i === 0 ? 'border-b border-[var(--color-border)]' : ''
                  }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-6 font-display text-[5rem] leading-none font-light select-none text-[var(--color-surface-2)] transition-colors duration-500 group-hover:text-[var(--color-accent)] opacity-40"
                >
                  {pillar.number}
                </span>
                <motion.div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--color-accent)] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <h3 className="font-display text-step-2 font-light leading-snug text-[var(--color-text)] relative z-10">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-step--1 leading-relaxed text-[var(--color-text-muted)] relative z-10">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
