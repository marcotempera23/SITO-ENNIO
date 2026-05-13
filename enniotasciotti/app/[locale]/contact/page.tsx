import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/section-heading';
import { ContactForm } from '@/components/shared/contact-form';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('contactTitle'), description: t('contactDescription'), path: '/contact' });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {/* Contact info */}
          <aside>
            <dl className="space-y-8">
              <div>
                <dt
                  className="font-mono text-step--1 uppercase tracking-widest mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t('info.email')}
                </dt>
                <dd>
                  <a
                    href="mailto:ennio.tasciotti@sanraffaele.it"
                    className="text-step-0 hover:underline"
                    style={{ color: 'var(--color-text)' }}
                  >
                    ennio.tasciotti@sanraffaele.it
                  </a>
                </dd>
              </div>
              <div>
                <dt
                  className="font-mono text-step--1 uppercase tracking-widest mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t('info.institution')}
                </dt>
                <dd className="text-step-0" style={{ color: 'var(--color-text)' }}>
                  IRCCS Ospedale San Raffaele<br />
                  Via Olgettina 60, 20132 Milano, IT
                </dd>
              </div>
              <div>
                <dt
                  className="font-mono text-step--1 uppercase tracking-widest mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t('info.profiles')}
                </dt>
                <dd className="space-y-1">
                  <a
                    href="https://orcid.org/0000-0003-1187-3205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-step-0 hover:underline"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    ORCID
                  </a>
                  <a
                    href="https://scholar.google.com/citations?user=A8sSvg0AAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-step-0 hover:underline"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Google Scholar
                  </a>
                </dd>
              </div>
            </dl>
          </aside>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
