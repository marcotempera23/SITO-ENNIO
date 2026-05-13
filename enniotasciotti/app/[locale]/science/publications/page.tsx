import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';
import publications from '@/content/publications.json';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({
    locale,
    title: t('publicationsTitle'),
    description: t('publicationsDescription'),
    path: '/science/publications',
  });
}

const AREA_LABELS: Record<string, string> = {
  nanomedicine: 'Nanomedicine',
  regen: 'Regenerative',
  regenerative: 'Regenerative',
  longevity: 'Longevity',
  inflammation: 'Inflammation',
  cancer: 'Cancer',
};

export default async function PublicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'publications' });

  const highlights = publications.filter((p) => p.highlight);
  const rest = publications.filter((p) => !p.highlight);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Scholar link */}
        <a
          href="https://scholar.google.com/citations?user=A8sSvg0AAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-step--1 hover:underline"
          style={{ color: 'var(--color-accent)' }}
        >
          {t('viewScholar')} →
        </a>

        {/* Highlight section */}
        <section aria-labelledby="highlights-heading" className="mt-16">
          <h2
            id="highlights-heading"
            className="font-mono text-step--1 uppercase tracking-widest mb-8"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('highlights')}
          </h2>
          <ol className="space-y-6" role="list">
            {highlights.map((pub) => (
              <li
                key={pub.id}
                className="border-l-2 pl-6 py-1"
                style={{ borderColor: 'var(--color-accent)' }}
              >
                <PublicationCard pub={pub} />
              </li>
            ))}
          </ol>
        </section>

        {/* All publications */}
        <section aria-labelledby="all-pubs-heading" className="mt-20">
          <h2
            id="all-pubs-heading"
            className="font-mono text-step--1 uppercase tracking-widest mb-8"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('selected')}
          </h2>
          <ol className="divide-y" style={{ borderColor: 'var(--color-border)' }} role="list">
            {rest.map((pub) => (
              <li key={pub.id} className="py-6">
                <PublicationCard pub={pub} />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function PublicationCard({ pub }: { pub: (typeof publications)[number] }) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {pub.area.map((a) => (
          <span
            key={a}
            className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border"
            style={{
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            {AREA_LABELS[a] ?? a}
          </span>
        ))}
        {pub.coverStory && (
          <span
            className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: 'var(--color-accent-2)', color: 'var(--color-bg)' }}
          >
            Cover Story
          </span>
        )}
      </div>
      <h3
        className="text-step-0 font-medium leading-snug"
        style={{ color: 'var(--color-text)' }}
      >
        {pub.title}
      </h3>
      <p
        className="mt-1 text-step--1 leading-relaxed line-clamp-2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {pub.authors}
      </p>
      <p
        className="mt-1 text-step--1 font-mono"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <em>{pub.journal}</em>, {pub.year}
        {pub.doi && (
          <>
            {' · '}
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: 'var(--color-accent)' }}
            >
              DOI
            </a>
          </>
        )}
      </p>
      {pub.note && (
        <p
          className="mt-2 text-step--1 italic"
          style={{ color: 'var(--color-quote)' }}
        >
          {pub.note}
        </p>
      )}
    </article>
  );
}
