import { getTranslations } from 'next-intl/server';
import { Prose } from '@/components/shared/prose';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('cookiesTitle'), description: t('cookiesDescription'), path: '/cookies' });
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookies' });

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1
          className="font-display text-step-5 font-light mb-12"
          style={{ color: 'var(--color-text)' }}
        >
          {t('title')}
        </h1>
        <Prose>
          <p>{t('lastUpdated', { date: '2025-01-01' })}</p>
          <p>{t('intro')}</p>
          <h2>{t('whatAre.title')}</h2>
          <p>{t('whatAre.body')}</p>
          <h2>{t('types.title')}</h2>
          <p>{t('types.necessary')}</p>
          <p>{t('types.analytics')}</p>
          <h2>{t('manage.title')}</h2>
          <p>{t('manage.body')}</p>
        </Prose>
      </div>
    </div>
  );
}
