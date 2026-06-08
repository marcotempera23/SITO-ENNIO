'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* SVG icons — one per pillar */
const ICONS = {
  nano: (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.5" />
      <circle cx="24" cy="6" r="2.5" fill="currentColor" />
      <circle cx="38" cy="33" r="2.5" fill="currentColor" />
      <circle cx="10" cy="33" r="2.5" fill="currentColor" />
      <path d="M24 12v4M24 32v4M12 24H8M40 24h-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  regen: (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
      <path d="M24 8C14 8 8 16 8 24s6 16 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 8L20 14M24 8l4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 40C34 40 40 32 40 24s-6-16-16-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M24 40l4-6M24 40l-4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  ),
  longevity: (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
      <path d="M24 10c-4 0-10 4-10 12 0 10 10 16 10 16s10-6 10-16c0-8-6-12-10-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 22c0 4 3 8 6 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M24 38v4M21 42h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 18l4 2M36 18l-4 2M12 10l3 3M36 10l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
};

export function ThreePillars() {
  const t = useTranslations('home.pillars');

  const pillars = [
    { key: 'nano', icon: ICONS.nano, title: t('nano.title'), body: t('nano.body'), href: '/science' },
    { key: 'regen', icon: ICONS.regen, title: t('regen.title'), body: t('regen.body'), href: '/science' },
    { key: 'longevity', icon: ICONS.longevity, title: t('longevity.title'), body: t('longevity.body'), href: '/longevity' },
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

        {/* Broken-grid: pillar 0 tall left, 1+2 stack right */}
        <div className="mt-16 grid md:grid-cols-[1fr_1fr] gap-0 border border-[var(--color-border)]">

          {/* Pillar 0 — tall left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link
              href={pillars[0].href}
              className="group relative flex flex-col justify-end min-h-[340px] p-10 md:p-14 border-b md:border-b-0 md:border-r border-[var(--color-border)] overflow-hidden transition-colors duration-500 hover:bg-[var(--color-surface-2)] block"
            >
              {/* Icon watermark */}
              <div className="absolute top-8 right-8 text-[var(--color-surface-2)] transition-all duration-700 group-hover:text-[var(--color-accent)] opacity-40 group-hover:opacity-70 scale-[2.2] origin-top-right">
                {pillars[0].icon}
              </div>
              {/* Hover expand accent line */}
              <motion.div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-full bg-[var(--color-accent)] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <div className="text-[var(--color-accent)] mb-4 relative z-10">{pillars[0].icon}</div>
              <h3 className="font-display text-step-3 font-light leading-snug text-[var(--color-text)] relative z-10">
                {pillars[0].title}
              </h3>
              {/* Expand on hover — extra text */}
              <p className="mt-4 text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-sm relative z-10 transition-all duration-400">
                {pillars[0].body}
              </p>
              <span className="mt-4 font-mono text-step--1 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                Esplora →
              </span>
            </Link>
          </motion.div>

          {/* Pillars 1 + 2 stacked right */}
          <div className="flex flex-col">
            {pillars.slice(1).map((pillar, i) => (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: (i + 1) * 0.12, ease: EASE }}
              >
                <Link
                  href={pillar.href}
                  className={`group relative flex flex-col justify-end min-h-[170px] p-8 md:p-10 overflow-hidden transition-colors duration-500 hover:bg-[var(--color-surface-2)] block ${i === 0 ? 'border-b border-[var(--color-border)]' : ''
                    }`}
                >
                  {/* Icon watermark */}
                  <div className="absolute top-4 right-6 text-[var(--color-surface-2)] transition-all duration-700 group-hover:text-[var(--color-accent)] opacity-40 group-hover:opacity-70 scale-[1.6] origin-top-right">
                    {pillar.icon}
                  </div>
                  <motion.div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--color-accent)] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  <div className="text-[var(--color-accent)] mb-2 relative z-10">{pillar.icon}</div>
                  <h3 className="font-display text-step-2 font-light leading-snug text-[var(--color-text)] relative z-10">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-step--1 leading-relaxed text-[var(--color-text-muted)] relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                    {pillar.body}
                  </p>
                  <span className="mt-1 font-mono text-step--2 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                    Esplora →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
