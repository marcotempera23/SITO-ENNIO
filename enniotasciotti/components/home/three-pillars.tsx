import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/shared/section-heading';

export function ThreePillars() {
  const t = useTranslations('home.pillars');

  const pillars = [
    {
      number: '01',
      title: t('nano.title'),
      body: t('nano.body'),
    },
    {
      number: '02',
      title: t('regen.title'),
      body: t('regen.body'),
    },
    {
      number: '03',
      title: t('longevity.title'),
      body: t('longevity.body'),
    },
  ];

  return (
    <section
      aria-labelledby="pillars-heading"
      className="py-24"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="pillars-heading"
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-16 grid gap-0 md:grid-cols-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {pillars.map(({ number, title, body }) => (
            <div
              key={number}
              className="relative border-b md:border-b-0 md:border-r last:border-r-0 pt-8 pb-10 pr-0 md:pr-10"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="pl-0 md:pl-8">
                <span
                  className="font-mono text-step-5 font-bold leading-none select-none"
                  aria-hidden="true"
                  style={{ color: 'var(--color-surface-2)' }}
                >
                  {number}
                </span>
                <h3
                  className="font-display text-step-2 font-light mt-2 leading-snug"
                  style={{ color: 'var(--color-text)' }}
                >
                  {title}
                </h3>
                <p
                  className="mt-3 text-step-0 leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
