import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';
import pressData from '@/content/press.json';
import awards from '@/content/awards.json';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('pressTitle'), description: t('pressDescription'), path: '/press' });
}

export default async function PressPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'press' });
  const isIT = locale === 'it';

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Awards & Recognition */}
        <section aria-labelledby="awards-heading" className="mt-16">
          <h2
            id="awards-heading"
            className="font-mono text-step--1 uppercase tracking-widest mb-8 text-[var(--color-text-muted)]"
          >
            {t('awardsTitle')}
          </h2>
          <ul className="space-y-6" role="list">
            {awards.map((award) => (
              <li
                key={award.id}
                className="flex items-start gap-6 border-b border-[var(--color-border)] pb-6"
              >
                <span
                  className="font-mono text-step-1 font-bold shrink-0 text-[var(--color-accent)]"
                >
                  {award.year}
                </span>
                <div>
                  <p className="text-step-0 font-medium text-[var(--color-text)]">
                    {isIT ? award.desc_it : award.desc_en}
                  </p>
                  <p className="text-step--1 text-[var(--color-text-muted)]">
                    {award.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Press features */}
        <section aria-labelledby="press-heading" className="mt-20">
          <h2
            id="press-heading"
            className="font-mono text-step--1 uppercase tracking-widest mb-8 text-[var(--color-text-muted)]"
          >
            {t('pressTitle2')}
          </h2>
          <ul className="divide-y divide-[var(--color-border)]" role="list">
            {pressData.map((item) => (
              <li key={item.id} className="py-6">
                <div className="flex items-start gap-4">
                  <span
                    className="font-mono text-step--1 shrink-0 text-[var(--color-text-muted)]"
                  >
                    {item.year}
                  </span>
                  <div>
                    <p className="text-step-0 font-medium text-[var(--color-text)]">
                      {isIT ? item.title_it : item.title_en}
                    </p>
                    <p className="text-step--1 text-[var(--color-text-muted)]">
                      {item.outlet}
                    </p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-step--1 text-[var(--color-accent)] hover:underline"
                      >
                        {t('watch')} →
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Press kit download */}
        <div
          className="mt-16 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] p-8"
        >
          <p
            className="font-display text-step-2 font-light text-[var(--color-text)]"
          >
            {t('kitTitle')}
          </p>
          <p className="mt-2 text-step-0 leading-relaxed text-[var(--color-text-muted)]">
            {t('kitBody')}
          </p>
          <a
            href="/pdf/ennio-tasciotti-press-kit.pdf"
            download
            className="mt-6 inline-flex h-12 items-center rounded-md bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-colors"
          >
            {t('kitCta')}
          </a>
        </div>
      </div>
    </div>
  );
}
