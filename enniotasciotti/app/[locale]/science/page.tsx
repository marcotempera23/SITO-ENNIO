import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { KpiCounter } from '@/components/shared/kpi-counter';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('scienceTitle'), description: t('scienceDescription'), path: '/science' });
}

export default async function SciencePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'science' });

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* KPI row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-y py-12" style={{ borderColor: 'var(--color-border)' }}>
          <KpiCounter value={200} suffix="+" label={t('kpi.papers')} />
          <KpiCounter value={8500} suffix="+" label={t('kpi.citations')} />
          <KpiCounter value={47} label={t('kpi.hIndex')} />
          <KpiCounter value={30} suffix="+" label={t('kpi.patents')} />
        </div>

        {/* Research areas */}
        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {(['nano', 'regen', 'longevity'] as const).map((area) => (
            <article key={area} className="space-y-3">
              <h3
                className="font-display text-step-2 font-light"
                style={{ color: 'var(--color-text)' }}
              >
                {t(`areas.${area}.title`)}
              </h3>
              <p className="text-step-0 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {t(`areas.${area}.body`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/science/publications"
            className="inline-flex h-12 items-center rounded-md px-6 text-step-0 font-medium transition-colors"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
          >
            {t('viewPublications')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
