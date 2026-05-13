import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative overflow-hidden pt-24 pb-0 min-h-[90svh] flex items-end md:items-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-16 md:pb-0">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Text column */}
          <div>
            <p
              className="font-mono text-step--1 uppercase tracking-widest mb-6"
              style={{ color: 'var(--color-accent)' }}
            >
              {t('eyebrow')}
            </p>
            <h1
              id="hero-headline"
              className="font-display font-light text-step-5 leading-[1.05] tracking-tight"
              style={{ color: 'var(--color-text)' }}
            >
              {t('headline')}
            </h1>
            <p
              className="mt-6 text-step-0 leading-relaxed max-w-lg"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {t('subheadline')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/science"
                className="inline-flex h-12 items-center rounded-md px-6 text-step-0 font-medium transition-colors"
                style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
              >
                {t('ctaPrimary')}
              </Link>
              <Link
                href="/longevity"
                className="inline-flex h-12 items-center rounded-md border px-6 text-step-0 font-medium transition-colors hover:bg-[var(--color-surface-2)]"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          {/* Portrait column */}
          <div className="relative flex justify-center md:justify-end">
            <picture>
              <source
                srcSet="/images/portrait-dark.jpg"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                src="/images/portrait-light.jpg"
                alt="Prof. Ennio Tasciotti"
                width={520}
                height={680}
                priority
                className="relative z-10 object-cover"
                style={{ maxHeight: '70svh', width: 'auto' }}
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
