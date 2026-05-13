'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const VIDEO_ID = 'Ipb1Xrq8WVQ';

export function TedxEmbed() {
  const t = useTranslations('home.tedx');
  const [activated, setActivated] = useState(false);

  return (
    <section
      aria-labelledby="tedx-heading"
      className="py-24 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-step--1 uppercase tracking-widest mb-3 text-[var(--color-accent)]">
            {t('eyebrow')}
          </p>
          <h2
            id="tedx-heading"
            className="font-display text-step-4 font-light text-[var(--color-text)]"
          >
            {t('title')}
          </h2>
          <p className="mt-4 text-step-0 leading-relaxed text-[var(--color-text-muted)]">
            {t('body')}
          </p>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--color-border)]">
          {activated ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="TEDx CNR Roma — Ennio Tasciotti"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setActivated(true)}
              aria-label={t('playLabel')}
              className="group absolute inset-0 w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              {/* Thumbnail via YouTube API */}
              <Image
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt={t('thumbnailAlt')}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 1200px"
                data-placeholder="true"
              />
              {/* Overlay */}
              <span
                className="absolute inset-0 bg-black/35"
                aria-hidden="true"
              />
              {/* Play button */}
              <span
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7 translate-x-0.5 text-[#FF0000]"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
