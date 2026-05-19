import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/section-heading';
import { buildMetadata } from '@/lib/seo';

interface TalkItem {
  event: string;
  location: string;
  year: number | null;
  talkTitle: string;
  body: string;
}

interface AppearanceItem {
  outlet: string;
  years: string;
  body: string;
}

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
    descIT: "Un modello scientifico integrato per la prevenzione e l'ottimizzazione della salute nel corso della vita.",
    descEN: 'An integrated scientific model for lifelong health prevention and optimisation.',
  },
  {
    id: 'science-venture',
    tagIT: 'Innovation',
    tagEN: 'Innovation',
    titleIT: "Dalla scoperta scientifica all'impresa: il coraggio della traslazione",
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

  const outreach = t.raw('outreach') as {
    divulgazione: { title: string; body: string };
    tedx: { title: string; intro: string; talks: TalkItem[] };
    media: { title: string; intro: string; appearances: AppearanceItem[] };
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* 1. Science Communication */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-6">
            {outreach.divulgazione.title}
          </h2>
          <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl">
            {outreach.divulgazione.body}
          </p>
        </section>

        {/* 2. TEDx Talks */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-4">
            {outreach.tedx.title}
          </h2>
          <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl mb-10">
            {outreach.tedx.intro}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {outreach.tedx.talks.map((talk, i) => (
              <article
                key={i}
                className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] p-8 space-y-3"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--color-accent)] text-[var(--color-accent)]">
                    TEDx
                  </span>
                  <span className="font-mono text-step--2 text-[var(--color-text-muted)]">
                    {talk.event}
                    {talk.location ? ` · ${talk.location}` : ''}
                    {talk.year ? ` · ${talk.year}` : ''}
                  </span>
                </div>
                <h3 className="font-display text-step-1 font-light text-[var(--color-text)] leading-snug">
                  &ldquo;{talk.talkTitle}&rdquo;
                </h3>
                <p className="text-step--1 leading-relaxed text-[var(--color-text-muted)]">
                  {talk.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 3. TV & Media */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-4">
            {outreach.media.title}
          </h2>
          <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-4xl mb-10">
            {outreach.media.intro}
          </p>
          <div className="space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            {outreach.media.appearances.map((app, i) => (
              <div key={i} className="grid md:grid-cols-[14rem_1fr] bg-[var(--color-surface)]">
                <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-[var(--color-border)]">
                  <p className="font-mono text-step--1 font-medium text-[var(--color-text)]">
                    {app.outlet}
                  </p>
                  <p className="font-mono text-step--2 text-[var(--color-accent)] mt-1">
                    {app.years}
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-step-0 leading-relaxed text-[var(--color-text-muted)]">
                    {app.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Proposed Topics */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-16">
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)] mb-10">
            {t('topics')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {TOPICS.map((topic) => (
              <article
                key={topic.id}
                className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] p-8 space-y-3"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--color-accent)] text-[var(--color-accent)] inline-block">
                  {isIT ? topic.tagIT : topic.tagEN}
                </span>
                <h3 className="font-display text-step-1 font-light leading-snug text-[var(--color-text)]">
                  {isIT ? topic.titleIT : topic.titleEN}
                </h3>
                <p className="text-step--1 leading-relaxed text-[var(--color-text-muted)]">
                  {isIT ? topic.descIT : topic.descEN}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Booking CTA */}
        <section
          aria-labelledby="booking-heading"
          className="mt-24 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] p-10 max-w-2xl"
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
