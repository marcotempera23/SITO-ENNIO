'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export function NewsletterCta() {
  const t = useTranslations('home.newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-20 border-t border-b"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p
          className="font-mono text-step--1 uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-accent)' }}
        >
          {t('eyebrow')}
        </p>
        <h2
          id="newsletter-heading"
          className="font-display text-step-3 font-light"
          style={{ color: 'var(--color-text)' }}
        >
          {t('title')}
        </h2>
        <p
          className="mt-3 text-step-0 leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t('body')}
        </p>

        {status === 'success' ? (
          <p
            className="mt-8 text-step-0 font-medium"
            role="status"
            style={{ color: 'var(--color-accent)' }}
          >
            {t('successMessage')}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-label="Newsletter subscription form"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {t('emailLabel')}
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('emailPlaceholder')}
              disabled={status === 'loading'}
              className="flex-1 h-12 rounded-md border px-4 text-step-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-12 rounded-md px-6 text-step-0 font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
            >
              {status === 'loading' ? t('loading') : t('cta')}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p
            className="mt-3 text-step--1"
            role="alert"
            style={{ color: '#DC2626' }}
          >
            {t('errorMessage')}
          </p>
        )}

        <p
          className="mt-4 text-step--1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t('noSpam')}
        </p>
      </div>
    </section>
  );
}
