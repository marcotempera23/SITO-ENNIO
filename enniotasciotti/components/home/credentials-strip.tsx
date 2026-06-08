'use client';

import { useTranslations } from 'next-intl';

export function CredentialsStrip() {
  const t = useTranslations('home.credentialsStrip');

  const items = [
    { label: t('publications'), value: '200+' },
    { label: t('citations'), value: '13,000+' },
    { label: t('patents'), value: '15' },
    { label: t('hIndex'), value: 'h-index 63' },
    { label: t('ventures'), value: '4 Ventures' },
    /* repeated for seamless loop */
    { label: t('publications'), value: '200+' },
    { label: t('citations'), value: '13,000+' },
    { label: t('patents'), value: '15' },
    { label: t('hIndex'), value: 'h-index 63' },
    { label: t('ventures'), value: '4 Ventures' },
  ];

  return (
    <div
      aria-label="Credentials at a glance"
      className="credentials-strip w-full border-y border-[var(--color-border)] bg-[var(--color-surface)] py-3 overflow-hidden"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map(({ label, value }, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-12 shrink-0"
          >
            <span className="font-mono text-step-0 font-semibold text-[var(--color-accent)]">
              {value}
            </span>
            <span className="text-step--1 text-[var(--color-text-muted)]">{label}</span>
            <span className="ml-12 text-[var(--color-border)] select-none" aria-hidden="true">·</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .credentials-strip:hover .animate-marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}
