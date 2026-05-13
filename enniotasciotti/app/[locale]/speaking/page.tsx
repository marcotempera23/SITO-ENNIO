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
  return buildMetadata({ locale, title: t('speakingTitle'), description: t('speakingDescription'), path: '/speaking' });
}

const TOPICS = [
  {
    id: 'nanomed',
    tagIT: 'Nanomedicina',
    tagEN: 'Nanomedicine',
    titleIT: 'Nanotecnologie contro il cancro: pensare come una cellula',
    titleEN: 'Nanotechnology against cancer: think like a cell',
    descIT: 'Come le nanoparticelle biomimetiche stanno rivoluzionando la consegna dei farmaci oncologici.',
    descEN: 'How biomimetic nanoparticles are revolutionising the delivery of oncology drugs.',
  },
  {
    id: 'longevity-medicine',
    tagIT: 'Longevità di Precisione',
    tagEN: 'Precision Longevity',
    titleIT: 'Blueprint per vivere a lungo e bene',
    titleEN: 'Blueprint for living long and well',
    descIT: 'Un modello scientifico integrato per la prevenzione e l\'ottimizzazione della salute nel corso della vita.',
    descEN: 'An integrated scientific model for lifelong health prevention and optimisation.',
  },
  {
    id: 'science-venture',
    tagIT: 'Innovation',
    tagEN: 'Innovation',
    titleIT: 'Dalla scoperta scientifica all\'impresa: il coraggio della traslazione',
    titleEN: 'From scientific discovery to venture: the courage of translation',
    descIT: 'Il percorso dagli articoli accademici alle startup biotech e ai brevetti industriali.',
    descEN: 'The journey from academic papers to biotech startups and industrial patents.',
  },
  {
    id: 'healthcare-reform',
    tagIT: 'Politica Sanitaria',
    tagEN: 'Health Policy',
    titleIT: 'Riformare la sanità con la medicina della longevità',
    titleEN: 'Reforming healthcare with longevity medicine',
    descIT: 'Come la medicina preventiva di precisione può trasformare i sistemi sanitari.',
    descEN: 'How precision preventive medicine can transform healthcare systems.',
  },
];

export default async function SpeakingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'speaking' });
  const isIT = locale === 'it';

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Topics */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {TOPICS.map((topic) => (
            <article
              key={topic.id}
              className="border rounded-lg p-8 space-y-3"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <span
                className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border inline-block"
                style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
              >
                {isIT ? topic.tagIT : topic.tagEN}
              </span>
              <h3
                className="font-display text-step-1 font-light leading-snug"
                style={{ color: 'var(--color-text)' }}
              >
                {isIT ? topic.titleIT : topic.titleEN}
              </h3>
              <p className="text-step--1 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {isIT ? topic.descIT : topic.descEN}
              </p>
            </article>
          ))}
        </div>

        {/* Booking form */}
        <section
          aria-labelledby="booking-heading"
          className="mt-24 border rounded-xl p-10 max-w-2xl"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <h2
            id="booking-heading"
            className="font-display text-step-3 font-light mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            {t('booking.title')}
          </h2>
          <p className="text-step-0 leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
            {t('booking.body')}
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-md px-6 text-step-0 font-medium transition-colors"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
          >
            {t('booking.cta')} →
          </Link>
        </section>
      </div>
    </div>
  );
}
