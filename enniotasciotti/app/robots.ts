import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://enniotasciotti.com';
const IS_INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === 'true';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_INDEXABLE
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
