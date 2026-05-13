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
      className="py-20 border-t border-b border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="font-mono text-step--1 uppercase tracking-widest mb-3 text-[var(--color-accent)]">
          {t('eyebrow')}
        </p>
        <h2
          id="newsletter-heading"
          className="font-display text-step-3 font-light text-[var(--color-text)]"
        >
          {t('title')}
        </h2>
        <p className="mt-3 text-step-0 leading-relaxed text-[var(--color-text-muted)]">
          {t('body')}
        </p>

        {status === 'success' ? (
          <p className="mt-8 text-step-0 font-medium text-[var(--color-accent)]" role="status">
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
              className="flex-1 h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-step-0 text-[var(--color-text)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-12 rounded-md bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? t('loading') : t('cta')}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-step--1 text-red-600" role="alert">
            {t('errorMessage')}
          </p>
        )}

        <p className="mt-4 text-step--1 text-[var(--color-text-muted)]">
          {t('noSpam')}
        </p>
      </div>
    </section>
  );
}
