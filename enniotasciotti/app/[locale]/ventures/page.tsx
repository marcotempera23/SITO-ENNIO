import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';
import ventures from '@/content/ventures.json';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('venturesTitle'), description: t('venturesDescription'), path: '/ventures' });
}

export default async function VenturesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ventures' });
  const isIT = locale === 'it';

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Entrepreneurial Vision */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-8">
            {t('vision.title')}
          </h2>
          <div className="max-w-4xl space-y-5">
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)]">
              {t('vision.body1')}
            </p>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)]">
              {t('vision.body2')}
            </p>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)]">
              {t('vision.body3')}
            </p>
          </div>
        </section>

        {/* Startups & Board Roles */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-4">
            {t('startupsTitle')}
          </h2>
          <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl mb-12">
            {t('startupsIntro')}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ventures.map((v) => (
              <article
                key={v.id}
                className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] p-8 flex flex-col gap-3 hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-step-1 font-light leading-snug text-[var(--color-text)]">
                    {v.name}
                  </h3>
                  <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
                    {v.type === 'founded' ? t('founded') : t('advisory')}
                  </span>
                </div>

                <p className="font-mono text-step--1 text-[var(--color-accent)]">
                  {isIT ? v.role_it : v.role_en}
                </p>

                <p className="text-step--1 text-[var(--color-text-muted)]">
                  {v.location}
                  {' · '}
                  {v.years}
                </p>

                <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] flex-1">
                  {isIT ? v.desc_it : v.desc_en}
                </p>

                {v.url && (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-step--1 text-[var(--color-accent)] hover:underline"
                  >
                    {t('visitWebsite')} →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Consulting / Advisory CTA */}
        <div className="mt-24 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] p-10 text-center">
          <p className="font-display text-step-3 font-light text-[var(--color-text)]">
            {t('cta.title')}
          </p>
          <p className="mt-3 text-step-0 max-w-xl mx-auto leading-relaxed text-[var(--color-text-muted)]">
            {t('cta.body')}
          </p>
          <Link
            href="/consultancy"
            className="mt-6 inline-flex h-12 items-center rounded-md bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-colors hover:opacity-90"
          >
            {t('cta.button')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
