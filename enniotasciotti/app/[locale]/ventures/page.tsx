import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';

interface VentureRole {
  period: string;
  org: string;
  role: string;
  activity: string;
}

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
  const roles = t.raw('roles') as VentureRole[];

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24">
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
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)]">
              {t('startupsIntro')}
            </p>
          </div>
        </section>

        {/* Detailed Business Roles Timeline */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-10">
            {t('detailTitle')}
          </h2>
          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            <div className="min-w-[580px] space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            {roles.map((item, i) => (
              <div key={i} className="grid md:grid-cols-[10rem_16rem_1fr] bg-[var(--color-surface)]">
                <div className="px-6 py-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex items-start pt-5">
                  <span className="font-mono text-step--2 text-[var(--color-accent)]">{item.period}</span>
                </div>
                <div className="px-6 py-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex items-start pt-5">
                  <span className="font-mono text-step--1 font-medium text-[var(--color-text)]">{item.org}</span>
                </div>
                <div className="px-6 py-4 flex flex-col gap-1">
                  <span className="text-step--1 font-medium text-[var(--color-text)]">{item.role}</span>
                  <span className="text-step--1 text-[var(--color-text-muted)]">{item.activity}</span>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 sm:mt-24 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-step-2 font-light text-[var(--color-text)]">
              {t('cta.title')}
            </p>
            <p className="mt-2 text-step-0 leading-relaxed max-w-lg text-[var(--color-text-muted)]">
              {t('cta.body')}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex h-12 items-center rounded-md bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-colors hover:opacity-90"
          >
            {t('cta.button')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
