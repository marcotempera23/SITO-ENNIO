'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === 'it' ? 'en' : 'it';

  const handleSwitch = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      aria-label={`Switch to ${otherLocale === 'it' ? 'Italian' : 'English'}`}
      className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-step--1 font-mono uppercase tracking-wider transition-colors hover:bg-[var(--color-surface-2)]"
      style={{ color: 'var(--color-text-muted)' }}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
