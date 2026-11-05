'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { TEDX_VIDEO } from '@/lib/logos';

// Video del talk: si carica YouTube solo quando si preme play
export function TalkVideo({ watch }: { watch: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`video${playing ? ' playing' : ''}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${TEDX_VIDEO.id}?autoplay=1&rel=0`}
          title={TEDX_VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`${watch}: ${TEDX_VIDEO.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://img.youtube.com/vi/${TEDX_VIDEO.id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="video-cap" style={{ zIndex: 1 }}>
            <b>{TEDX_VIDEO.title}</b>
            <span className="video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="7,4 20,12 7,20" /></svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

// Iscrizione alla newsletter (stessa API del sito precedente)
export function Newsletter() {
  const t = useTranslations('home.newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
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
    <div className="news hx-card" data-reveal>
      <div>
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 id="newsletter-title">{t('title')}</h2>
        <p className="muted" style={{ margin: 0 }}>{t('body')}</p>
      </div>
      <div>
        {status === 'success' ? (
          <p className="news-ok" role="status">{t('successMessage')}</p>
        ) : (
          <form className="news-form" onSubmit={submit} aria-labelledby="newsletter-title">
            <label htmlFor="newsletter-email" className="sr-only">{t('emailLabel')}</label>
            <input id="newsletter-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('emailPlaceholder')} disabled={status === 'loading'} />
            <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? t('loading') : t('cta')} <span className="arrow" aria-hidden="true">→</span>
            </button>
          </form>
        )}
        {status === 'error' && <p className="news-err" role="alert">{t('errorMessage')}</p>}
        <p className="news-note">{t('noSpam')}</p>
      </div>
    </div>
  );
}
