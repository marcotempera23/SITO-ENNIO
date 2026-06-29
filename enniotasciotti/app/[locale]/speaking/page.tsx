import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';

interface SpeakingEvent {
  date: string;
  event: string;
  role: string;
  topic: string;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('speakingTitle'), description: t('speakingDescription'), path: '/speaking' });
}

export default async function SpeakingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'speaking' });

  const outreach = t.raw('outreach') as {
    divulgazione: { title: string; body: string };
  };
  const events = t.raw('events') as SpeakingEvent[];

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Science Communication Intro */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-6">
            {outreach.divulgazione.title}
          </h2>
          <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl">
            {outreach.divulgazione.body}
          </p>
        </section>

        {/* Detailed Speaking Events Timeline */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-10">
            {t('detailTitle')}
          </h2>
          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            <div className="min-w-[560px] space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            {events.map((item, i) => (
              <div key={i} className="grid md:grid-cols-[10rem_1fr_1fr] bg-[var(--color-surface)]">
                <div className="px-5 py-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex items-start pt-5">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] leading-snug">{item.date}</span>
                </div>
                <div className="px-5 py-4 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex flex-col gap-0.5">
                  <span className="text-step--1 font-medium text-[var(--color-text)] leading-snug">{item.event}</span>
                  <span className="text-step--2 font-mono text-[var(--color-accent)]">{item.role}</span>
                </div>
                <div className="px-5 py-4 flex items-center">
                  <span className="text-step--1 text-[var(--color-text-muted)] leading-relaxed">{item.topic}</span>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section
          aria-labelledby="booking-heading"
          className="mt-16 sm:mt-24 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] p-6 sm:p-10 max-w-2xl"
        >
          <h2
            id="booking-heading"
            className="font-display text-step-3 font-light mb-2 text-[var(--color-text)]"
          >
            {t('booking.title')}
          </h2>
          <p className="text-step-0 leading-relaxed mb-8 text-[var(--color-text-muted)]">
            {t('booking.body')}
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-md bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-colors hover:opacity-90"
          >
            {t('booking.cta')}
          </Link>
        </section>
      </div>
    </div>
  );
}
