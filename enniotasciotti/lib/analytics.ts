/**
 * Google Analytics / GTM helpers.
 * All tracking is gated behind consent.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type ConsentStatus = 'granted' | 'denied';

export interface ConsentState {
  analytics: ConsentStatus;
  marketing: ConsentStatus;
}

const DEFAULT_CONSENT: ConsentState = {
  analytics: 'denied',
  marketing: 'denied',
};

const STORAGE_KEY = 'et_consent';

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function storeConsent(consent: ConsentState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export function updateGtagConsent(consent: ConsentState) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics,
    ad_storage: consent.marketing,
    ad_user_data: consent.marketing,
    ad_personalization: consent.marketing,
  });
}

export function initDefaultConsent() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
  window.gtag('consent', 'default', {
    analytics_storage: DEFAULT_CONSENT.analytics,
    ad_storage: DEFAULT_CONSENT.marketing,
    ad_user_data: DEFAULT_CONSENT.marketing,
    ad_personalization: DEFAULT_CONSENT.marketing,
    wait_for_update: 2000,
  });
}
