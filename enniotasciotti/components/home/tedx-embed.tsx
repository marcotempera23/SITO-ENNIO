'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const VIDEO_ID = 'Ipb1Xrq8WVQ';

export function TedxEmbed() {
  const t = useTranslations('home.tedx');
  const [activated, setActivated] = useState(false);

  return (
    <section aria-labelledby="tedx-heading" className="py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header — asymmetric: text left, em-dash accent right */}
        <div className="flex items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <p className="font-mono text-step--1 uppercase tracking-[0.2em] mb-3 text-[var(--color-accent)]">
              {t('eyebrow')}
            </p>
            <h2
              id="tedx-heading"
              className="font-display text-step-4 font-light text-[var(--color-text)]"
            >
              {t('title')}
            </h2>
            <p className="mt-4 text-step-0 leading-relaxed text-[var(--color-text-muted)] max-w-xl">
              {t('body')}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="hidden lg:block font-display text-[7rem] leading-none font-light text-[var(--color-surface-2)] select-none shrink-0"
          >
            &#8212;
          </span>
        </div>

        {/* Video — full-bleed, no rounded corners, cinematic */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video overflow-hidden border border-[var(--color-border)]"
        >
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
              <Image
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt={t('thumbnailAlt')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 1200px"
                data-placeholder="true"
              />
              {/* Dark overlay — lifts on hover */}
              <span className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" aria-hidden="true" />

              {/* Text overlay at bottom */}
              <span className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between pointer-events-none">
                <span className="font-display text-step-2 font-light text-white leading-snug max-w-sm">
                  {t('title')}
                </span>
                {/* Play button */}
                <span className="h-14 w-14 rounded-full border-2 border-white/70 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-0.5 text-white group-hover:text-[var(--color-accent)] transition-colors">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </motion.div>

      </div>
    </section>
  );
}
