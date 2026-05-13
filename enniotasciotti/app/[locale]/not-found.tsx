import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function NotFound({ params }: PageProps) {
  const { locale } = await (params ?? Promise.resolve({ locale: 'it' }));
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6 pt-28 pb-24">
      <p
        className="font-mono text-[8rem] font-bold leading-none"
        style={{ color: 'var(--color-accent)', opacity: 0.15 }}
        aria-hidden="true"
      >
        404
      </p>
      <h1
        className="font-display text-step-4 font-light -mt-8"
        style={{ color: 'var(--color-text)' }}
      >
        {t('notFound.title')}
      </h1>
      <p
        className="mt-4 text-step-0 max-w-md"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {t('notFound.body')}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-md px-8 text-step-0 font-medium transition-colors"
        style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
      >
        {t('notFound.cta')}
      </Link>
    </div>
  );
}
