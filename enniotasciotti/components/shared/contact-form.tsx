'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const fieldClass =
    'w-full h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-step-0 text-[var(--color-text)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]';
  const labelClass = 'block text-step--1 mb-1.5 text-[var(--color-text-muted)]';
  const errorClass = 'mt-1 text-step--1 text-red-600';

  if (status === 'success') {
    return (
      <p className="text-step-0 font-medium py-8 text-[var(--color-accent)]" role="status">
        {t('successMessage')}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      aria-label={t('ariaLabel')}
      noValidate
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          {t('name')} *
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register('name')}
          disabled={status === 'loading'}
          className={fieldClass}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className={errorClass} role="alert">
            {t('nameError')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {t('email')} *
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          disabled={status === 'loading'}
          className={fieldClass}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className={errorClass} role="alert">
            {t('emailError')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          {t('subject')} *
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          disabled={status === 'loading'}
          className={fieldClass}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className={errorClass} role="alert">
            {t('subjectError')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t('message')} *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          disabled={status === 'loading'}
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-step-0 text-[var(--color-text)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] resize-y"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className={errorClass} role="alert">
            {t('messageError')}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="h-12 rounded-md bg-[var(--color-accent)] px-8 text-step-0 font-medium text-white transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? t('loading') : t('submit')}
      </button>

      {status === 'error' && (
        <p className={errorClass} role="alert">
          {t('errorMessage')}
        </p>
      )}
    </form>
  );
}
