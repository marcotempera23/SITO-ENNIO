import type { Person, Article, BreadcrumbList, WithContext } from 'schema-dts';

export function personSchema(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ennio Tasciotti',
    jobTitle: 'Full Professor of Applied Medical Sciences and Technologies',
    url: 'https://enniotasciotti.com',
    email: 'ennio.tasciotti@sanraffaele.it',
    sameAs: [
      'https://orcid.org/0000-0003-1187-3205',
      'https://scholar.google.com/citations?user=A8sSvg0AAAAJ&hl=en',
      'https://www.scopus.com/authid/detail.uri?authorId=23971656200',
      'https://www.youtube.com/watch?v=Ipb1Xrq8WVQ',
    ],
    affiliation: {
      '@type': 'Organization',
      name: 'San Raffaele University, Rome',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Pisa',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Scuola Normale Superiore di Pisa',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'International Centre for Genetic Engineering and Biotechnology',
      },
    ],
    knowsAbout: [
      'Nanomedicine',
      'Biomimetic Nanotechnology',
      'Regenerative Medicine',
      'Longevity Medicine',
      'Drug Delivery Systems',
      'Precision Medicine',
    ],
  };
}

interface ArticleSchemaOptions {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
}

export function articleSchema(opts: ArticleSchemaOptions): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    url: opts.url,
    author: {
      '@type': 'Person',
      name: 'Ennio Tasciotti',
      url: 'https://enniotasciotti.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Ennio Tasciotti',
    },
    ...(opts.imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: opts.imageUrl,
      },
    }),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
