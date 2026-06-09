'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    {
        name: 'Nanomaterials',
        src: '/images/journals/nanomaterials.png',
        href: 'https://www.mdpi.com/journal/nanomaterials',
        bg: '#FFFFFF',
    },
    {
        name: 'npj Breast Cancer',
        src: '/images/journals/npj-breast-cancer.png',
        href: 'https://www.nature.com/npjbcancer/',
        bg: '#FFFFFF',
    },
    {
        name: 'Journal of Nanomedicine & Nanotechnology',
        src: '/images/journals/nanomedicine-nanotechnology.png',
        href: 'https://www.omicsonline.org/open-access/nanomedicine-nanotechnology.php',
        bg: '#FFFFFF',
    },
];

const MACRO_AREAS = [
    {
        id: 'drug-delivery',
        image: '/images/areas/drug-delivery.png',
        title: 'Drug Delivery',
        body: 'Nanovettori biomimetici per la somministrazione mirata di farmaci antitumorali.',
        href: '/science',
    },
    {
        id: 'medicina-rigenerativa',
        image: '/images/areas/regenerative-medicine.png',
        title: 'Medicina Rigenerativa',
        body: 'Scaffold biomimetici e ingegneria tessutale per la rigenerazione ossea e cartilaginea.',
        href: '/science',
    },
    {
        id: 'cellule-immunitarie',
        image: '/images/areas/stem-cells.png',
        title: 'Biologia Cellule Immunitarie e Staminali',
        body: 'Studio della risposta immunitaria e delle cellule staminali per terapie di nuova generazione.',
        href: '/science',
    },
    {
        id: 'ricerca-traslazionale',
        image: '/images/areas/translational-research.png',
        title: 'Ricerca Traslazionale',
        body: 'Dal laboratorio al paziente: percorsi accelerati dalla scoperta alla clinica.',
        href: '/science',
    },
    {
        id: 'longevity',
        image: '/images/areas/longevity.png',
        title: 'Longevity',
        body: "Ricerca traslazionale focalizzata sullo sviluppo di diverse strategie per la prevenzione e l'estensione della longevità in salute.",
        href: '/science',
    },
];

export function ScienzaTeaser() {
    return (
        <section aria-labelledby="scienza-heading" className="py-24 bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
                    <div>
                        <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">Ricerca Scientifica</p>
                        <h2 id="scienza-heading" className="font-display text-step-4 font-light text-[var(--color-text)] leading-tight">
                            Le cinque aree di ricerca
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

                {/* 5 macro-area cards in balanced grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-6">
                    {MACRO_AREAS.map((area, i) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                            className={cn(
                                "col-span-1",
                                i === 4 ? "md:col-span-6 lg:col-span-3" :
                                i === 3 ? "md:col-span-3 lg:col-span-3" :
                                "md:col-span-3 lg:col-span-2"
                            )}
                        >
                            <Link
                                href={area.href}
                                className="group block relative p-8 md:p-10 h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between min-h-[280px]"
                            >
                                {/* Background Image - visible and scaled on hover */}
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                                    <Image
                                        src={area.image}
                                        alt={area.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    {/* Soft overlay to blend image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-[var(--color-surface)]" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex-grow">
                                    <h3 className="font-display text-step-1 font-light text-[var(--color-text)] leading-snug mb-3">
                                        {area.title}
                                    </h3>
                                    <p className="text-step--1 leading-relaxed text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-300">
                                        {area.body}
                                    </p>
                                </div>

                                <div className="relative z-10 mt-6 flex items-center gap-1 text-step--1 font-mono text-[var(--color-accent)] transition-all duration-300 group-hover:gap-2">
                                    <span>Approfondisci</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </div>

                                {/* Bottom accent line */}
                                <div
                                    aria-hidden="true"
                                    className="absolute bottom-0 left-0 h-[2.5px] w-full bg-[var(--color-accent)] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Cover Stories — horizontal scroll gallery */}
                <div className="mt-16 overflow-hidden">
                    <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-6">
                        Pubblicato su
                    </p>
                    <div className="journal-scroll-wrap relative w-full overflow-hidden">
                        <div className="flex w-max gap-6 animate-marquee-journals py-2">
                            {[
                                ...JOURNALS.map(j => ({ ...j, isPlaceholder: false })),
                                { name: '200+ articoli', href: '/science', isPlaceholder: true, src: '', bg: '' },
                                ...JOURNALS.map(j => ({ ...j, isPlaceholder: false })),
                                { name: '200+ articoli', href: '/science', isPlaceholder: true, src: '', bg: '' }
                            ].map((j, idx) => (
                                j.isPlaceholder ? (
                                    <Link
                                        key={`placeholder-${idx}`}
                                        href={j.href || ''}
                                        className="snap-start shrink-0 flex items-center justify-center w-52 h-28 border border-dashed border-[var(--color-border)] text-step--1 font-mono text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] bg-[var(--color-surface)] transition-colors duration-300"
                                    >
                                        200+ articoli →
                                    </Link>
                                ) : (
                                    <a
                                        key={`${j.name}-${idx}`}
                                        href={j.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group snap-start shrink-0 relative flex items-center justify-center w-52 h-28 border border-[var(--color-border)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg"
                                        style={{ backgroundColor: 'bg' in j ? j.bg : undefined }}
                                        aria-label={j.name}
                                    >
                                        <Image
                                            src={j.src || ''}
                                            alt={j.name || ''}
                                            fill
                                            className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-400"
                                            sizes="208px"
                                        />
                                    </a>
                                )
                            ))}
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
        @keyframes marquee-journals {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee-journals {
          animation: marquee-journals 45s linear infinite;
        }
        .journal-scroll-wrap:hover .animate-marquee-journals {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-journals { animation: none; }
        }
      `}</style>
        </section>
    );
}
