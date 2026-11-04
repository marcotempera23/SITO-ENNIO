'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface PortfolioItem {
  id: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

export function LeadershipPortfolio() {
  const t = useTranslations('home.leadershipPortfolio');
  const items = t.raw('items') as PortfolioItem[];

  return (
    <section aria-labelledby="leadership-portfolio-heading" className="py-20 sm:py-28 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="leadership-portfolio-heading"
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <Link
                href={item.href}
                className="group relative flex flex-col justify-between h-full p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-400 hover:border-[var(--color-accent)]/50 hover:-translate-y-1 hover:shadow-xl active:border-[var(--color-accent)]/50 active:shadow-lg"
              >
                {/* Subtle top indicator */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="font-mono text-step--2 uppercase tracking-widest text-[var(--color-accent)] font-semibold">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-step--2 text-[var(--color-text-muted)] opacity-60 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-display text-step-2 font-normal text-[var(--color-text)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-step--1 leading-relaxed text-[var(--color-text-muted)]">
                    {item.desc}
                  </p>
                </div>

                {/* CTA link */}
                <div className="mt-8 pt-4 border-t border-[var(--color-border)] flex items-center gap-2 text-step--1 font-medium text-[var(--color-accent)] group-hover:gap-3 transition-all duration-300">
                  <span>{item.cta}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>

                {/* Accent highlight line — visible on hover (desktop) and always visible on mobile via in-view */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--color-accent)] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 portfolio-accent-line"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: trigger accent line and card highlight on scroll (viewport intersection) */}
      <style>{`
        @media (hover: none) and (pointer: coarse) {
          .group:active .portfolio-accent-line,
          .group:focus-within .portfolio-accent-line {
            transform: scaleX(1);
          }
          .group {
            border-color: color-mix(in srgb, var(--color-accent) 30%, transparent) !important;
          }
          .group h3 {
            color: var(--color-accent) !important;
          }
          .group .font-mono.text-step--2:last-child {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
