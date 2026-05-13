import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://enniotasciotti.com';
const LOCALES = ['it', 'en'] as const;

const STATIC_PATHS = [
  '',
  '/about',
  '/science',
  '/science/publications',
  '/ventures',
  '/longevity',
  '/speaking',
  '/press',
  '/consultancy',
  '/contact',
  '/privacy',
  '/cookies',
];

const LONGEVITY_SLUGS = [
  'blueprint-for-precision-longevity',
  'primary-care-reform',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const itUrl = path === '' ? BASE_URL : `${BASE_URL}${path}`;
    const enUrl = `${BASE_URL}/en${path}`;

    entries.push({
      url: itUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          it: itUrl,
          en: enUrl,
        },
      },
    });
  }

  for (const slug of LONGEVITY_SLUGS) {
    const itUrl = `${BASE_URL}/longevity/${slug}`;
    const enUrl = `${BASE_URL}/en/longevity/${slug}`;

    entries.push({
      url: itUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          it: itUrl,
          en: enUrl,
        },
      },
    });
  }

  return entries;
}
