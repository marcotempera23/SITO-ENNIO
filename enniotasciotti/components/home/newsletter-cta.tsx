'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <motion.section
      aria-labelledby="newsletter-heading"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Split layout: 60% text / 40% form */}
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-12 md:gap-20">

          {/* Left — text */}
          <div>
            <p className="font-mono text-step--1 uppercase tracking-[0.2em] mb-3 text-[var(--color-accent)]">
              {t('eyebrow')}
            </p>
            <h2
              id="newsletter-heading"
              className="font-display text-step-4 font-light text-[var(--color-text)] leading-tight"
            >
              {t('title')}
            </h2>
            <p className="mt-4 text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-lg">
              {t('body')}
            </p>
          </div>

          {/* Right — form */}
          <div className="w-full md:w-80 shrink-0">
            {/* Vertical separator — desktop only */}
            <div className="hidden md:block absolute h-28 w-[1px] bg-[var(--color-border)] -left-10 top-1/2 -translate-y-1/2" aria-hidden="true" />

            {status === 'success' ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-step-0 font-medium text-[var(--color-accent)]"
                role="status"
              >
                {t('successMessage')}
              </motion.p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
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
                  className="h-12 border border-[var(--color-border)] bg-transparent px-4 text-step-0 text-[var(--color-text)] transition-all duration-300 focus-visible:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/20 placeholder:text-[var(--color-text-muted)]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-12 bg-[var(--color-accent)] px-6 text-step-0 font-medium text-white transition-all duration-400 disabled:opacity-50 hover:opacity-90 hover:-translate-y-[1px] flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>{t('loading')}</span>
                    </>
                  ) : t('cta')}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-3 text-step--1 text-red-500" role="alert">
                {t('errorMessage')}
              </p>
            )}

            <p className="mt-4 text-step--1 text-[var(--color-text-muted)]">
              {t('noSpam')}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
