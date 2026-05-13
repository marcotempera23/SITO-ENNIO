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
  return buildMetadata({ locale, title: t('consultancyTitle'), description: t('consultancyDescription'), path: '/consultancy' });
}

const SERVICES = [
  {
    id: 'scientific-advisory',
    icon: '◆',
  },
  {
    id: 'clinical-translation',
    icon: '◆',
  },
  {
    id: 'longevity-protocol',
    icon: '◆',
  },
  {
    id: 'speaking-corporate',
    icon: '◆',
  },
];

export default async function ConsultancyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consultancy' });

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Services grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {SERVICES.map((svc) => (
            <article
              key={svc.id}
              className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] p-8 space-y-3"
            >
              <span
                className="text-step-2 text-[var(--color-accent)]"
                aria-hidden="true"
              >
                {svc.icon}
              </span>
              <h3
                className="font-display text-step-1 font-light text-[var(--color-text)]"
              >
                {t(`services.${svc.id}.title`)}
              </h3>
              <p
                className="text-step-0 leading-relaxed text-[var(--color-text-muted)]"
              >
                {t(`services.${svc.id}.body`)}
              </p>
            </article>
          ))}
        </div>

        {/* Notable clients / orgs */}
        <section aria-labelledby="orgs-heading" className="mt-20">
          <h2
            id="orgs-heading"
            className="font-mono text-step--1 uppercase tracking-widest mb-8 text-[var(--color-text-muted)]"
          >
            {t('orgsTitle')}
          </h2>
          <p className="text-step-0 leading-relaxed max-w-2xl text-[var(--color-text-muted)]">
            {t('orgsBody')}
          </p>
        </section>

        {/* CTA */}
        <div
          className="mt-20 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <p
              className="font-display text-step-2 font-light text-[var(--color-text)]"
            >
              {t('cta.title')}
            </p>
            <p
              className="mt-2 text-step-0 leading-relaxed max-w-lg text-[var(--color-text-muted)]"
            >
              {t('cta.body')}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex h-12 items-center rounded-md bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-colors"
          >
            {t('cta.button')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
