import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { CredentialsStrip } from '@/components/home/credentials-strip';
import { ChiSonoTeaser } from '@/components/home/chi-sono-teaser';
import { ThreePillars } from '@/components/home/three-pillars';
import { ScienzaTeaser } from '@/components/home/scienza-teaser';
import { ImpreseConsulenzeTeaser } from '@/components/home/imprese-consulenze';
import { SpeakingTeaser } from '@/components/home/speaking-teaser';
import { NewsletterCta } from '@/components/home/newsletter-cta';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({
    locale,
    title: t('homeTitle'),
    description: t('homeDescription'),
  });
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredentialsStrip />
      <ChiSonoTeaser />
      <ThreePillars />
      <ScienzaTeaser />
      <ImpreseConsulenzeTeaser />
      <SpeakingTeaser />
      <NewsletterCta />
    </>
  );
}
