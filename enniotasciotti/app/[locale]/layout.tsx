import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { CookieConsent } from '@/components/shared/cookie-consent';
import { Experience } from '@/components/hlp/experience';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: {
      default: t('homeTitle'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('homeDescription'),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <div className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} site relative isolate min-h-screen overflow-x-clip font-sans bg-[var(--color-bg)] text-[var(--color-text)]`}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Experience label="Ennio Tasciotti" />
        {/* Skip link for keyboard / AT users */}
        <a
          href="#main-content"
          className="skip-link"
        >
          {locale === 'it' ? 'Vai al contenuto principale' : 'Skip to main content'}
        </a>

        <Nav />

        <main id="main-content" tabIndex={-1} className="relative z-10">
          {children}
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
        <CookieConsent />
      </NextIntlClientProvider>
    </div>
  );
}
