import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('longevityTitle'), description: t('longevityDescription'), path: '/longevity' });
}

const ARTICLES = [
  {
    slug: 'blueprint-for-precision-longevity',
    date: '2025-01-15',
    readTime: '5 min',
    titleIT: 'Blueprint per una Longevità di Precisione',
    titleEN: 'Blueprint for Precision Longevity',
    excerptIT: 'Un modello integrato per la longevità sana che combina diagnostica avanzata, prevenzione personalizzata e medicina di precisione.',
    excerptEN: 'An integrated model for healthy longevity combining advanced diagnostics, personalised prevention and precision medicine.',
    tag: 'Longevity Medicine',
  },
  {
    slug: 'primary-care-reform',
    date: '2025-02-10',
    readTime: '7 min',
    titleIT: 'Riformare la Medicina di Base con la Longevità',
    titleEN: 'Reforming Primary Care through Longevity Medicine',
    excerptIT: 'Come la medicina della longevità può trasformare la cura primaria in un sistema di prevenzione proattiva.',
    excerptEN: 'How longevity medicine can transform primary healthcare into a system of proactive prevention.',
    tag: 'Healthcare Reform',
  },
];

export default async function LongevityPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'longevity' });
  const isIT = locale === 'it';

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-16 space-y-0 divide-y" style={{ borderColor: 'var(--color-border)' }}>
          {ARTICLES.map((article) => (
            <article key={article.slug} className="py-10 group">
              <Link href={`/longevity/${article.slug}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                  >
                    {article.tag}
                  </span>
                  <span
                    className="font-mono text-step--1"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                    {' · '}{article.readTime}
                  </span>
                </div>
                <h2
                  className="font-display text-step-3 font-light leading-snug group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text)' }}
                >
                  {isIT ? article.titleIT : article.titleEN}
                </h2>
                <p
                  className="mt-3 text-step-0 leading-relaxed max-w-2xl"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {isIT ? article.excerptIT : article.excerptEN}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-step--1 font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {t('readMore')} →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
