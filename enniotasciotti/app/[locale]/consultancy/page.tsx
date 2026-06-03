import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';

interface Area {
  title: string;
  body: string;
}

interface ConsultingRole {
  period: string;
  org: string;
  role: string;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('consultancyTitle'), description: t('consultancyDescription'), path: '/consultancy' });
}

export default async function ConsultancyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consultancy' });

  const areas = t.raw('areas') as Record<string, Area>;
  const roles = t.raw('roles') as ConsultingRole[];

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Areas of Consultancy */}
        <div className="mt-20 space-y-24">

          {/* Area 1: Corporate Pharma */}
          <section className="border-t border-[var(--color-border)] pt-16">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-mono text-[2.5rem] leading-none font-light text-[var(--color-accent)] opacity-20 select-none" aria-hidden="true">
                01
              </span>
              <h2 className="font-display text-step-3 font-light text-[var(--color-text)]">
                {areas.corporate_pharma.title}
              </h2>
            </div>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl pl-0 md:pl-[calc(2.5rem+1rem)]">
              {areas.corporate_pharma.body}
            </p>
          </section>

          {/* Area 2: Investment Funds */}
          <section className="border-t border-[var(--color-border)] pt-16">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-mono text-[2.5rem] leading-none font-light text-[var(--color-accent)] opacity-20 select-none" aria-hidden="true">
                02
              </span>
              <h2 className="font-display text-step-3 font-light text-[var(--color-text)]">
                {areas.investment_funds.title}
              </h2>
            </div>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl pl-0 md:pl-[calc(2.5rem+1rem)]">
              {areas.investment_funds.body}
            </p>
          </section>

          {/* Area 3: Innovation Ecosystems */}
          <section className="border-t border-[var(--color-border)] pt-16">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-mono text-[2.5rem] leading-none font-light text-[var(--color-accent)] opacity-20 select-none" aria-hidden="true">
                03
              </span>
              <h2 className="font-display text-step-3 font-light text-[var(--color-text)]">
                {areas.innovation_ecosystems.title}
              </h2>
            </div>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl pl-0 md:pl-[calc(2.5rem+1rem)]">
              {areas.innovation_ecosystems.body}
            </p>
          </section>

        </div>

        {/* Detailed Consulting Roles Timeline */}
        <section className="mt-24 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-10">
            {t('detailTitle')}
          </h2>
          <div className="space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            {roles.map((item, i) => (
              <div key={i} className="grid md:grid-cols-[10rem_14rem_1fr] bg-[var(--color-surface)]">
                <div className="px-6 py-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex items-center">
                  <span className="font-mono text-step--2 text-[var(--color-accent)]">{item.period}</span>
                </div>
                <div className="px-6 py-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex items-center">
                  <span className="font-mono text-step--1 font-medium text-[var(--color-text)]">{item.org}</span>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <span className="text-step--1 text-[var(--color-text-muted)]">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-24 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
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
