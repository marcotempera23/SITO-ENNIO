'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const JOURNALS = [
    {
        name: 'Nature Biomedical Engineering',
        src: '/images/journals/nature-biomedical.png',
        href: 'https://www.nature.com/natbiomedeng/',
        bg: '#FFFFFF',
    },
    {
        name: 'Advanced Materials',
        src: '/images/journals/advanced-materials.png',
        href: 'https://onlinelibrary.wiley.com/journal/15214095',
        bg: '#FFFFFF',
    },
    {
        name: 'Nature Nanotechnology',
        src: '/images/journals/nature-nano.png',
        href: 'https://www.nature.com/nnano/',
        bg: '#FFFFFF',
    },
    {
        name: 'ACS Nano',
        src: '/images/journals/acs-nano.png',
        href: 'https://pubs.acs.org/journal/ancac3',
        bg: '#FFFFFF',
    },
];

const MACRO_AREAS = [
    {
        id: 'drug-delivery',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
                <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="4" fill="currentColor" />
                <path d="M20 4v6M20 30v6M4 20h6M30 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
        ),
        title: 'Drug Delivery',
        body: 'Nanovettori biomimetici per la somministrazione mirata di farmaci antitumorali.',
        href: '/science',
    },
    {
        id: 'medicina-rigenerativa',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
                <path d="M20 6c-2 4-8 6-8 12a8 8 0 0016 0c0-6-6-8-8-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 22c0 3.3 2.7 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M20 28v6M17 34h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'Medicina Rigenerativa',
        body: 'Scaffold biomimetici e ingegneria tissutale per la rigenerazione ossea e cartilaginea.',
        href: '/science',
    },
    {
        id: 'cellule-immunitarie',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
                <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 4c0 4-4 6-4 10M20 4c0 4 4 6 4 10M20 36c0-4-4-6-4-10M20 36c0-4 4-6 4-10M4 20c4 0 6-4 10-4M4 20c4 0 6 4 10 4M36 20c-4 0-6-4-10-4M36 20c-4 0-6 4-10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Biologia Cellule Immunitarie e Staminali',
        body: 'Studio della risposta immunitaria e delle cellule staminali per terapie di nuova generazione.',
        href: '/science',
    },
    {
        id: 'ricerca-traslazionale',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
                <path d="M6 34L20 8l14 26" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M11 26h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="20" cy="8" r="2" fill="currentColor" />
                <path d="M28 14l6-6M28 14h5M28 14v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Ricerca Traslazionale',
        body: 'Dal laboratorio al paziente: percorsi accelerati dalla scoperta alla clinica.',
        href: '/science',
    },
];

export function ScienzaTeaser() {
    return (
        <section aria-labelledby="scienza-heading" className="py-24 bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
                    <div>
                        <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">Ricerca Scientifica</p>
                        <h2 id="scienza-heading" className="font-display text-step-4 font-light text-[var(--color-text)]">
                            Le quattro aree<br />di ricerca
                        </h2>
                    </div>
                    <Link
                        href="/science"
                        className="group shrink-0 inline-flex items-center gap-2 px-6 h-11 border border-[var(--color-accent)] text-step--1 font-medium text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white"
                    >
                        Leggi di più sulla mia ricerca
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>

                {/* 4 macro-area banners */}
                <div className="grid sm:grid-cols-2 gap-0 border border-[var(--color-border)]">
                    {MACRO_AREAS.map((area, i) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                        >
                            <Link
                                href={area.href}
                        className={`group block relative p-8 md:p-10 overflow-hidden transition-colors duration-500 hover:bg-[var(--color-surface-2)] ${i === 0 || i === 1 ? 'border-b border-[var(--color-border)]' : ''
                                    } ${i % 2 === 0 ? 'sm:border-r border-[var(--color-border)]' : ''}`}
                            >
                                {/* Bottom accent line */}
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--color-accent)] origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="text-[var(--color-accent)] mb-4">{area.icon}</div>
                                <h3 className="font-display text-step-1 font-light text-[var(--color-text)] leading-snug mb-2">
                                    {area.title}
                                </h3>
                                <p className="text-step--1 leading-relaxed text-[var(--color-text-muted)]">
                                    {area.body}
                                </p>
                                <span className="mt-4 inline-block text-step--1 font-mono text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1">
                                    Approfondisci →
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Cover Stories — horizontal scroll gallery */}
                <div className="mt-16">
                    <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-6">
                        Pubblicato su
                    </p>
                    <div className="journal-scroll-wrap relative">
                        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                        {JOURNALS.map((j) => (
                            <a
                                key={j.name}
                                href={j.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group snap-start shrink-0 relative flex items-center justify-center w-52 h-28 border border-[var(--color-border)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg"
                                style={{ backgroundColor: j.bg }}
                                aria-label={j.name}
                            >
                                <Image
                                    src={j.src}
                                    alt={j.name}
                                    fill
                                    className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-400"
                                    sizes="208px"
                                />
                            </a>
                        ))}
                        {/* Add more placeholder */}
                        <a
                            href="/science"
                            className="snap-start shrink-0 flex items-center justify-center w-52 h-28 border border-dashed border-[var(--color-border)] text-step--1 font-mono text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
                        >
                            200+ articoli →
                        </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .journal-scroll-wrap {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        }
      `}</style>
        </section>
    );
}
