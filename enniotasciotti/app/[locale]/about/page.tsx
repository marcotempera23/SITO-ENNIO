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
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-16 space-y-16">

          {/* Biografia */}
          <section aria-labelledby="bio-heading">
            <h2
              id="bio-heading"
              className="font-display text-step-3 font-light mb-6 text-[var(--color-text)]"
            >
              {t('bio.title')}
            </h2>
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <p key={i} className="text-step-0 leading-relaxed text-[var(--color-text-muted)]">
                  {t(`bio.p${i + 1}`)}
                </p>
              ))}
            </div>
          </section>

          {/* Formazione */}
          <section aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="font-display text-step-3 font-light mb-8 text-[var(--color-text)]"
            >
              {t('education.title')}
            </h2>
            <ol className="relative border-l border-[var(--color-border)] pl-8 space-y-8">
              {(t.raw('education.items') as Array<{ year: string; degree: string; place: string }>).map((item, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[calc(2rem+1px)] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-step--1 text-[var(--color-accent)]">{item.year}</span>
                  <p className="mt-1 text-step-0 font-medium text-[var(--color-text)]">{item.degree}</p>
                  <p className="text-step--1 text-[var(--color-text-muted)]">{item.place}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Affiliazioni Accademiche */}
          <section aria-labelledby="affiliations-heading">
            <h2
              id="affiliations-heading"
              className="font-display text-step-3 font-light mb-8 text-[var(--color-text)]"
            >
              {t('academicAffiliations.title')}
            </h2>
            <ol className="relative border-l border-[var(--color-border)] pl-8 space-y-8">
              {(t.raw('academicAffiliations.items') as Array<{ years: string; role: string; place: string }>).map((item, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[calc(2rem+1px)] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-step--1 text-[var(--color-accent)]">{item.years}</span>
                  <p className="mt-1 text-step-0 font-medium text-[var(--color-text)]">{item.role}</p>
                  <p className="text-step--1 text-[var(--color-text-muted)]">{item.place}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Attività Didattica */}
          <section aria-labelledby="teaching-heading">
            <h2
              id="teaching-heading"
              className="font-display text-step-3 font-light mb-8 text-[var(--color-text)]"
            >
              {t('teaching.title')}
            </h2>
            <div className="space-y-8">
              {(t.raw('teaching.items') as Array<{ period: string; role: string; place: string; body: string }>).map((item, i) => (
                <div key={i} className="border-l-2 border-[var(--color-border)] pl-6">
                  <span className="font-mono text-step--1 text-[var(--color-accent)]">{item.period}</span>
                  <p className="mt-1 text-step-0 font-medium text-[var(--color-text)]">{item.role}</p>
                  <p className="text-step--1 text-[var(--color-text-muted)]">{item.place}</p>
                  {item.body ? (
                    <p className="mt-2 text-step--1 leading-relaxed text-[var(--color-text-muted)]">{item.body}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* Carriera Scientifica */}
          <section aria-labelledby="career-heading">
            <h2
              id="career-heading"
              className="font-display text-step-3 font-light mb-8 text-[var(--color-text)]"
            >
              {t('scientificCareer.title')}
            </h2>
            <ol className="relative border-l border-[var(--color-border)] pl-8 space-y-8">
              {(t.raw('scientificCareer.items') as Array<{ years: string; role: string; place: string }>).map((item, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[calc(2rem+1px)] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-step--1 text-[var(--color-accent)]">{item.years}</span>
                  <p className="mt-1 text-step-0 font-medium text-[var(--color-text)]">{item.role}</p>
                  <p className="text-step--1 text-[var(--color-text-muted)]">{item.place}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Ruoli di Leadership Scientifica */}
          <section aria-labelledby="leadership-heading">
            <h2
              id="leadership-heading"
              className="font-display text-step-3 font-light mb-8 text-[var(--color-text)]"
            >
              {t('leadershipRoles.title')}
            </h2>
            <ul className="space-y-4">
              {(t.raw('leadershipRoles.items') as Array<{ years: string; role: string; place: string }>).map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-step--1 text-[var(--color-accent)] shrink-0 w-36">{item.years}</span>
                  <span className="text-step--1 text-[var(--color-text-muted)]">
                    {item.role}{item.place ? `, ${item.place}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Responsabilità Amministrative */}
          <section aria-labelledby="admin-heading">
            <h2
              id="admin-heading"
              className="font-display text-step-3 font-light mb-8 text-[var(--color-text)]"
            >
              {t('adminResponsibilities.title')}
            </h2>
            <ul className="space-y-3">
              {(t.raw('adminResponsibilities.items') as Array<{ years: string; role: string }>).map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-step--1 text-[var(--color-accent)] shrink-0 w-28">{item.years}</span>
                  <span className="text-step--1 text-[var(--color-text-muted)]">{item.role}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Premi e Riconoscimenti */}
          <section aria-labelledby="honors-heading">
            <h2
              id="honors-heading"
              className="font-display text-step-3 font-light mb-8 text-[var(--color-text)]"
            >
              {t('honors.title')}
            </h2>
            <ul className="space-y-4">
              {(t.raw('honors.items') as Array<{ year: string; award: string }>).map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-step--1 text-[var(--color-accent)] shrink-0 w-28">{item.year}</span>
                  <span className="text-step--1 text-[var(--color-text-muted)]">{item.award}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
