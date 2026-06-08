'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const VIDEO_ID = 'Ipb1Xrq8WVQ'; // TEDxCNR

const MEDIA_CATEGORIES = [
    {
        cat: 'Televisione',
        items: [
            { logo: 'Rai 1', color: '#009AC7', show: 'Superquark', years: '2015–2020' },
            { logo: 'Rai 3', color: '#E2001A', show: 'Presa Diretta', years: '2021' },
            { logo: 'Real Time', color: '#E4002B', show: 'La Clinica della Longevità', years: '2025' },
            { logo: 'TV2000', color: '#004B87', show: 'Il Mio Medico', years: '2026' },
        ],
    },
    {
        cat: 'Conferenze',
        items: [
            { logo: 'TEDx', color: '#E62B1E', show: 'TEDxCNR — Oltre il conosciuto', years: '2016' },
            { logo: 'TEDx', color: '#E62B1E', show: 'TEDxLago di Fogliano', years: '' },
        ],
    },
];

const TALKS = [
    {
        id: 'tedx-cnr',
        title: 'Oltre il conosciuto — TEDxCNR',
        thumb: `https://img.youtube.com/vi/${VIDEO_ID}/mqdefault.jpg`,
        videoId: VIDEO_ID,
        year: '2016',
    },
];

export function SpeakingTeaser() {
    const t = useTranslations('home.tedx');
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [videoIdx, setVideoIdx] = useState(0);

    return (
        <section aria-labelledby="speaking-heading" className="py-24 bg-transparent">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
                    <div>
                        <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">
                            Speaking &amp; Media
                        </p>
                        <h2 id="speaking-heading" className="font-display text-step-4 font-light text-[var(--color-text)]">
                            Talk, conferenze<br />e apparizioni media
                        </h2>
                    </div>
                    <Link
                        href="/speaking"
                        className="group shrink-0 inline-flex items-center gap-2 text-step--1 font-mono text-[var(--color-accent)] hover:underline"
                    >
                        Tutti gli eventi (52+)
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">

                    {/* Left — category list with logo badges */}
                    <div className="space-y-8">
                        {MEDIA_CATEGORIES.map((cat) => (
                            <div key={cat.cat}>
                                <p className="font-mono text-step--2 uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-3 border-b border-[var(--color-border)] pb-2">
                                    {cat.cat}
                                </p>
                                <div className="space-y-3">
                                    {cat.items.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                                            className="flex items-center gap-4"
                                        >
                                            {/* Logo badge */}
                                            <span
                                                className="shrink-0 inline-flex items-center justify-center min-w-[4.5rem] h-8 px-2 font-mono text-[0.65rem] font-bold tracking-wide text-white transition-transform duration-300 hover:scale-[1.04]"
                                                style={{ backgroundColor: item.color }}
                                                aria-hidden="true"
                                            >
                                                {item.logo}
                                            </span>
                                            <span className="text-step--1 text-[var(--color-text)]">
                                                {item.show}
                                                {item.years && (
                                                    <span className="ml-2 text-[var(--color-text-muted)]">{item.years}</span>
                                                )}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right — video mini-gallery */}
                    <div>
                        <p className="font-mono text-step--2 uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-3 border-b border-[var(--color-border)] pb-2">
                            Video Talk
                        </p>

                        {/* Main video */}
                        <div className="relative aspect-video border border-[var(--color-border)] overflow-hidden">
                            {activeVideo === TALKS[videoIdx].videoId ? (
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${TALKS[videoIdx].videoId}?autoplay=1&rel=0`}
                                    title={TALKS[videoIdx].title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            ) : (
                                <button
                                    onClick={() => setActiveVideo(TALKS[videoIdx].videoId)}
                                    className="group absolute inset-0 w-full h-full focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                                    aria-label={`Guarda: ${TALKS[videoIdx].title}`}
                                >
                                    <Image
                                        src={TALKS[videoIdx].thumb}
                                        alt={TALKS[videoIdx].title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        sizes="600px"
                                    />
                                    <span className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:bg-black/20" aria-hidden="true" />
                                    <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                        <span className="font-display text-step-0 text-white font-light">
                                            {TALKS[videoIdx].title}
                                        </span>
                                        <span className="relative h-12 w-12 flex items-center justify-center shrink-0">
                                            {/* Pulsing ring */}
                                            <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-play-pulse" aria-hidden="true" />
                                            <span className="h-10 w-10 rounded-full border-2 border-white/70 flex items-center justify-center group-hover:bg-white transition-all duration-400 shrink-0">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-0.5 text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                                    <polygon points="5,3 19,12 5,21" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </button>
                            )}
                        </div>

                        {/* Arrow nav — shows only if >1 talk */}
                        {TALKS.length > 1 && (
                            <div className="flex items-center gap-2 mt-3">
                                <button
                                    onClick={() => { setVideoIdx(i => Math.max(0, i - 1)); setActiveVideo(null); }}
                                    disabled={videoIdx === 0}
                                    className="h-8 w-8 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text)] disabled:opacity-30 hover:border-[var(--color-accent)] transition-colors"
                                    aria-label="Precedente"
                                >←</button>
                                <span className="text-step--1 text-[var(--color-text-muted)]">{videoIdx + 1} / {TALKS.length}</span>
                                <button
                                    onClick={() => { setVideoIdx(i => Math.min(TALKS.length - 1, i + 1)); setActiveVideo(null); }}
                                    disabled={videoIdx === TALKS.length - 1}
                                    className="h-8 w-8 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text)] disabled:opacity-30 hover:border-[var(--color-accent)] transition-colors"
                                    aria-label="Successivo"
                                >→</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
