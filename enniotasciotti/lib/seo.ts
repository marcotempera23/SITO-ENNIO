import type { Metadata } from 'next';

interface BuildMetadataOptions {
  locale: string;
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://enniotasciotti.com';

export function buildMetadata({
  locale,
  title,
  description,
  path = '',
  ogImage = '/og-default.jpg',
}: BuildMetadataOptions): Metadata {
  const url = `${BASE_URL}${locale === 'it' ? '' : '/en'}${path}`;
  const alternateUrl = `${BASE_URL}${locale === 'it' ? '/en' : ''}${path}`;

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
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
