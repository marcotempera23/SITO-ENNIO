import type { Metadata } from 'next';

interface BuildMetadataOptions {
  locale: string;
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://enniotasciotti.com';
const IS_INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === 'true';

export function buildMetadata({
  locale,
  title,
  description,
  path = '',
  ogImage = '/og-default.jpg',
}: BuildMetadataOptions): Metadata {
  const url = `${BASE_URL}${locale === 'it' ? '' : '/en'}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: {
        it: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ennio Tasciotti',
      locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: IS_INDEXABLE,
      follow: IS_INDEXABLE,
      googleBot: {
        index: IS_INDEXABLE,
        follow: IS_INDEXABLE,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
