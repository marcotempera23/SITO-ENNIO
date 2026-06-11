import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { KpiCounter } from '@/components/shared/kpi-counter';
import { buildMetadata } from '@/lib/seo';

function doiToUrl(doi: string): string {
  if (!doi) return '';
  if (doi.startsWith('http')) return doi;
  return `https://doi.org/${doi}`;
}

interface Publication {
  rank: number;
  journal: string;
  year: number;
  title: string;
  authors: string;
  citations: number;
  doi: string;
}

interface MacroArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  body: string;
  publications: Publication[];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('scienceTitle'), description: t('scienceDescription'), path: '/science' });
}

export default async function SciencePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'science' });
  const macroAreas = t.raw('macroAreas') as MacroArea[];

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* KPI row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-[var(--color-border)] py-12">
          <KpiCounter value={200} suffix="+" label={t('kpi.papers')} />
          <KpiCounter value={13000} suffix="+" label={t('kpi.citations')} />
          <KpiCounter value={63} label={t('kpi.hIndex')} />
          <KpiCounter value={15} label={t('kpi.patents')} />
        </div>

        {/* Macro research areas */}
        <div className="mt-24">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-16">
            {t('macroAreasTitle')}
          </h2>

          <div className="space-y-24">
            {macroAreas.map((area) => (
              <section
                key={area.id}
                id={area.id}
                aria-labelledby={`${area.id}-heading`}
                className="scroll-mt-28"
              >
                {/* Area header */}
                <div className="flex items-start gap-6 mb-8">
                  <div>
                    <h3
                      id={`${area.id}-heading`}
                      className="font-display text-step-3 font-light text-[var(--color-text)]"
                    >
                      {area.title}
                    </h3>
                    <p className="mt-1 font-mono text-step--1 text-[var(--color-accent)] tracking-wide uppercase">
                      {area.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {area.body && (
                  <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl mb-12">
                    {area.body}
                  </p>
                )}

                {/* Publications */}
                {area.publications && area.publications.length > 0 && (
                  <div>
                    <h4 className="font-mono text-step--1 text-[var(--color-text)] uppercase tracking-widest mb-6 pb-3 border-b border-[var(--color-border)]">
                      {area.id === 'longevity' ? t('macroAreasPubTitleLongevity') : t('macroAreasPubTitle')}
                    </h4>
                    <ol className="space-y-0 divide-y divide-[var(--color-border)]">
                      {area.publications.map((pub) => {
                        const url = doiToUrl(pub.doi);
                        const Inner = (
                          <>
                            {/* Content */}
                            <div className="min-w-0">
                              <p className="text-step--1 font-medium text-[var(--color-text)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-200">
                                {pub.title}
                              </p>
                              <p className="mt-1 text-step--2 text-[var(--color-text-muted)]">
                                <span className="font-medium text-[var(--color-text)]">{pub.journal}</span>
                                {' '}·{' '}
                                {pub.year}
                                {' '}·{' '}
                                {pub.authors}
                              </p>
                            </div>

                            {/* Citations badge */}
                            <div className="flex flex-col items-end gap-0.5 pt-0.5 shrink-0">
                              {pub.citations > 0 && (
                                <>
                                  <span className="font-mono text-step-0 font-semibold text-[var(--color-text)] tabular-nums">
                                    {pub.citations.toLocaleString()}
                                  </span>
                                  <span className="font-mono text-step--2 text-[var(--color-text-muted)] whitespace-nowrap">
                                    {t('citations')}
                                  </span>
                                </>
                              )}
                              {url && (
                                <span className="font-mono text-step--2 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap mt-1">
                                  ↗ DOI
                                </span>
                              )}
                            </div>
                          </>
                        );

                        return url ? (
                          <li key={pub.rank}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-4 grid grid-cols-[1fr_auto] gap-x-4 items-start group cursor-pointer block"
                            >
                              {Inner}
                            </a>
                          </li>
                        ) : (
                          <li
                            key={pub.rank}
                            className="py-4 grid grid-cols-[1fr_auto] gap-x-4 items-start group"
                          >
                            {Inner}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}
              </section>

            ))}
          </div>
        </div>

        <div className="mt-20">
          <Link
            href="/science/publications"
            className="inline-flex h-12 items-center rounded-md bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-colors hover:opacity-90"
          >
            {t('viewPublications')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
