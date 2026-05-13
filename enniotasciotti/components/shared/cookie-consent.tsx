'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { initDefaultConsent, updateGtagConsent, storeConsent, getStoredConsent } from '@/lib/analytics';

export function CookieConsent() {
  const t = useTranslations('cookies.banner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initDefaultConsent();
    const stored = getStoredConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    const consent = { analytics: 'granted' as const, marketing: 'granted' as const };
    updateGtagConsent(consent);
    storeConsent(consent);
    setVisible(false);
  };

  const decline = () => {
    const consent = { analytics: 'denied' as const, marketing: 'denied' as const };
    updateGtagConsent(consent);
    storeConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t('ariaLabel')}
      className="fixed bottom-0 left-0 right-0 z-50 border-t px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <p
        className="text-step--1 flex-1 leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {t('body')}{' '}
        <Link href="/cookies" className="underline" style={{ color: 'var(--color-accent)' }}>
          {t('learnMore')}
        </Link>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="h-10 px-5 text-step--1 rounded-md border transition-colors hover:bg-[var(--color-surface-2)]"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          {t('decline')}
        </button>
        <button
          onClick={accept}
          className="h-10 px-5 text-step--1 rounded-md font-medium transition-colors"
          style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
