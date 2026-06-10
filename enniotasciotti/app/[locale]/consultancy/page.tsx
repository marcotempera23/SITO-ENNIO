import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
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

const getLogoPath = (orgName: string) => {
  const normalized = orgName.toLowerCase();
  
  if (normalized.includes('roche')) return '/images/partners/roche.png';
  if (normalized.includes('novartis')) return '/images/partners/novartis.png';
  if (normalized.includes('gilead')) return '/images/partners/gilead.png';
  if (normalized.includes('alfasigma')) return '/images/partners/alfasigma.png';
  if (normalized.includes('named')) return '/images/partners/named.png';
  if (normalized.includes('aboca')) return '/images/partners/aboca.png';
  if (normalized.includes('ferrero')) return '/images/partners/ferrero.png';
  
  // New logos batch 1
  if (normalized.includes('longevity')) return '/images/partners/longevity-community.png';
  if (normalized.includes('cube labs')) return '/images/partners/cube-labs.png';
  if (normalized.includes('cluster scienze della vita')) return '/images/partners/cluster-fvg.png';
  if (normalized.includes('corden')) return '/images/partners/corden-pharma.png';
  if (normalized.includes('sclavo')) return '/images/partners/sclavo.png';

  // New logos batch 2
  if (normalized.includes('inpeco')) return '/images/partners/inpeco.png';
  if (normalized.includes('protiviti')) return '/images/partners/protiviti.png';
  if (normalized.includes('coris')) return '/images/partners/coris.png';
  if (normalized.includes('g-factor')) return '/images/partners/g-factor.png';
  if (normalized.includes('comonext')) return '/images/partners/comonext.png';

  // New logos batch 3
  if (normalized.includes('thd')) return '/images/partners/thd.png';
  if (normalized.includes('eos')) return '/images/partners/eos.png';
  if (normalized.includes('technoscience')) return '/images/partners/technoscience.png';
  if (normalized.includes('panakes')) return '/images/partners/panakes.png';
  if (normalized.includes('principia')) return '/images/partners/principia.png';

  // New logos batch 4
  if (normalized.includes('auroratt') || normalized.includes('aurora tt') || normalized.includes('aurora-tt')) return '/images/partners/auroratt.png';
  if (normalized.includes('utopia')) return '/images/partners/utopia.png';
  if (normalized.includes('sofinnova')) return '/images/partners/sofinnova.png';
  if (normalized.includes('cascade')) return '/images/partners/cascade.png';
  if (normalized.includes('texas a&m')) return '/images/partners/texas-am.png';

  // New logos batch 5
  if (normalized.includes('texas medical') || normalized.includes('tmc')) return '/images/partners/tmc.png';
  if (normalized.includes('president')) return '/images/partners/presidential.png';
  if (normalized.includes('ministero')) return '/images/partners/ministero-salute.png';
  
  return null;
};

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
            <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-6">
              {areas.corporate_pharma.title}
            </h2>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl">
              {areas.corporate_pharma.body}
            </p>
          </section>

          {/* Area 2: Investment Funds */}
          <section className="border-t border-[var(--color-border)] pt-16">
            <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-6">
              {areas.investment_funds.title}
            </h2>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl">
              {areas.investment_funds.body}
            </p>
          </section>

          {/* Area 3: Innovation Ecosystems */}
          <section className="border-t border-[var(--color-border)] pt-16">
            <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-6">
              {areas.innovation_ecosystems.title}
            </h2>
            <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl">
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
            {roles.map((item, i) => {
              const logoPath = getLogoPath(item.org);
              return (
                <div key={i} className="grid md:grid-cols-[10rem_14rem_1fr] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors duration-200 group">
                  {/* Left Column: Logo Container */}
                  <div className="px-6 py-6 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex items-center justify-center bg-white/5 dark:bg-white/[0.02]">
                    {logoPath ? (
                      <div className="relative w-full h-12 flex items-center justify-center">
                        <Image
                          src={logoPath}
                          alt={item.org}
                          width={120}
                          height={48}
                          className="object-contain max-h-12 w-auto max-w-full grayscale dark:invert dark:opacity-80 group-hover:grayscale-0 dark:group-hover:invert-0 dark:group-hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <span className="font-mono text-step--2 text-[var(--color-text-muted)] uppercase tracking-wider text-center block w-full truncate px-2">
                        {item.org}
                      </span>
                    )}
                  </div>

                  {/* Middle Column: Organization & Date */}
                  <div className="px-6 py-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex flex-col justify-center">
                    <span className="font-sans text-step--1 font-medium text-[var(--color-text)]">{item.org}</span>
                    <span className="font-mono text-step--2 text-[var(--color-accent)] mt-1">{item.period}</span>
                  </div>

                  {/* Right Column: Role */}
                  <div className="px-6 py-4 flex items-center">
                    <span className="text-step--1 text-[var(--color-text-muted)]">{item.role}</span>
                  </div>
                </div>
              );
            })}
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
