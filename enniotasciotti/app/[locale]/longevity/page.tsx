import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { LongevityClient } from '@/components/longevity/longevity-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('longevityTitle'), description: t('longevityDescription'), path: '/longevity' });
}

export default async function LongevityPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'longevity' });

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <LongevityClient />
      </div>
    </div>
  );
}
