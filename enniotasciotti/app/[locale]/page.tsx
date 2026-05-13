import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { CredentialsStrip } from '@/components/home/credentials-strip';
import { ThreePillars } from '@/components/home/three-pillars';
import { FeaturedDiscoveries } from '@/components/home/featured-discoveries';
import { TedxEmbed } from '@/components/home/tedx-embed';
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
      <ThreePillars />
      <FeaturedDiscoveries />
      <TedxEmbed />
      <NewsletterCta />
    </>
  );
}
