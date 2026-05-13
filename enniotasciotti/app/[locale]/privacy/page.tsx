import { getTranslations } from 'next-intl/server';
import { Prose } from '@/components/shared/prose';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('privacyTitle'), description: t('privacyDescription'), path: '/privacy' });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const isIT = locale === 'it';

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-step-5 font-light mb-12 text-[var(--color-text)]">
          {t('title')}
        </h1>
        <Prose>
          <p>{t('lastUpdated', { date: '2025-01-01' })}</p>
          <p>{t('intro')}</p>
          <h2>{t('controller.title')}</h2>
          <p>{t('controller.body')}</p>
          <h2>{t('data.title')}</h2>
          <p>{t('data.body')}</p>
          <h2>{t('rights.title')}</h2>
          <p>{t('rights.body')}</p>
          <h2>{t('contact.title')}</h2>
          <p>
            {isIT ? 'Per esercitare i tuoi diritti: ' : 'To exercise your rights: '}
            <a href="mailto:ennio.tasciotti@sanraffaele.it">
              ennio.tasciotti@sanraffaele.it
            </a>
          </p>
        </Prose>
      </div>
    </div>
  );
}
