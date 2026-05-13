import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('aboutTitle'), description: t('aboutDescription'), path: '/about' });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-16 space-y-16">
          {/* Bio */}
          <section aria-labelledby="bio-heading">
            <h2
              id="bio-heading"
              className="font-display text-step-3 font-light mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              {t('bio.title')}
            </h2>
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <p key={i} className="text-step-0 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {t(`bio.p${i + 1}`)}
                </p>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section aria-labelledby="timeline-heading">
            <h2
              id="timeline-heading"
              className="font-display text-step-3 font-light mb-8"
              style={{ color: 'var(--color-text)' }}
            >
              {t('timeline.title')}
            </h2>
            <ol className="relative border-l pl-8 space-y-8" style={{ borderColor: 'var(--color-border)' }}>
              {(t.raw('timeline.items') as Array<{ year: string; role: string; place: string }>).map((item, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[calc(2rem+1px)] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-accent)]"
                    style={{ backgroundColor: 'var(--color-bg)' }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-step--1" style={{ color: 'var(--color-accent)' }}>
                    {item.year}
                  </span>
                  <p className="mt-1 text-step-0 font-medium" style={{ color: 'var(--color-text)' }}>
                    {item.role}
                  </p>
                  <p className="text-step--1" style={{ color: 'var(--color-text-muted)' }}>
                    {item.place}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Teaching */}
          <section aria-labelledby="teaching-heading">
            <h2
              id="teaching-heading"
              className="font-display text-step-3 font-light mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              {t('teaching.title')}
            </h2>
            <p className="text-step-0 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {t('teaching.body')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
