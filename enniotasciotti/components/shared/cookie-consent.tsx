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
      className="cookie-bar"
    >
      <p className="cookie-text">
        {t('body')}{' '}
        <Link href="/cookies" className="eyebrow-link">
          {t('learnMore')}
        </Link>
      </p>
      <div className="cookie-actions">
        <button
          onClick={decline}
          className="btn btn-ghost btn-sm"
        >
          {t('decline')}
        </button>
        <button
          onClick={accept}
          className="btn btn-primary btn-sm"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
