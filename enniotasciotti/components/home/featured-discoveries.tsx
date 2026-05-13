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
    {
      id: 'leukosome',
      tag: t('leukosome.tag'),
      title: t('leukosome.title'),
      body: t('leukosome.body'),
      year: '2016',
    },
    {
      id: 'msv',
      tag: t('msv.tag'),
      title: t('msv.title'),
      body: t('msv.body'),
      year: '2008',
    },
    {
      id: 'precision-longevity',
      tag: t('longevity.tag'),
      title: t('longevity.title'),
      body: t('longevity.body'),
      year: '2023',
    },
  ];

  return (
    <section
      aria-labelledby="discoveries-heading"
      className="py-24"
      style={{ backgroundColor: 'var(--color-surface)' }}
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
            className="shrink-0 text-step--1 font-medium hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
            {t('viewAll')} →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {discoveries.map(({ id, tag, title, body, year }) => (
            <article
              key={id}
              className="group border rounded-lg p-8 transition-colors hover:border-[var(--color-accent)]"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-step--1 uppercase tracking-widest"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {tag}
                </span>
                <span
                  className="font-mono text-step--1"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {year}
                </span>
              </div>
              <h3
                className="font-display text-step-1 font-light leading-snug"
                style={{ color: 'var(--color-text)' }}
              >
                {title}
              </h3>
              <p
                className="mt-3 text-step--1 leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
