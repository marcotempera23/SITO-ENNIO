'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';

interface Discovery {
  id: string;
  tag: string;
  title: string;
  body: string;
  year: string;
}

export function FeaturedDiscoveries() {
  const t = useTranslations('home.discoveries');

  const discoveries: Discovery[] = [
    { id: 'leukosome', tag: t('leukosome.tag'), title: t('leukosome.title'), body: t('leukosome.body'), year: '2016' },
    { id: 'msv', tag: t('msv.tag'), title: t('msv.title'), body: t('msv.body'), year: '2008' },
    { id: 'precision-longevity', tag: t('longevity.tag'), title: t('longevity.title'), body: t('longevity.body'), year: '2023' },
  ];

  return (
    <section
      aria-labelledby="discoveries-heading"
      className="py-24 bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <SectionHeading
            id="discoveries-heading"
            eyebrow={t('eyebrow')}
            title={t('title')}
          />
          <Link
            href="/science/publications"
            className="shrink-0 group flex items-center gap-2 text-step--1 font-medium text-[var(--color-accent)]"
          >
            {t('viewAll')}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {discoveries.map(({ id, tag, title, body, year }, i) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border border-[var(--color-border)] bg-[var(--color-surface)] p-8 overflow-hidden transition-colors duration-300 hover:border-[var(--color-accent)]"
            >
              {/* Large year background — appears on hover */}
              <span
                aria-hidden="true"
                className="absolute -bottom-4 -right-2 font-display text-[7rem] leading-none font-light select-none text-[var(--color-surface-2)] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              >
                {year}
              </span>

              {/* Tag + year row */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] px-2 py-1 border border-[var(--color-accent)] text-[var(--color-accent)]">
                  {tag}
                </span>
                <span className="font-mono text-step--1 text-[var(--color-text-muted)]">{year}</span>
              </div>

              <h3 className="font-display text-step-1 font-light leading-snug text-[var(--color-text)] relative z-10">
                {title}
              </h3>
              <p className="mt-3 text-step--1 leading-relaxed text-[var(--color-text-muted)] relative z-10">
                {body}
              </p>

              {/* Bottom accent line — grows on hover */}
              <motion.div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-accent)] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
