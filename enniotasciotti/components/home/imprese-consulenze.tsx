'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DragMarquee } from '@/components/ui/drag-marquee';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* Companies with name, brand colour, and style variant */
const COMPANIES: {
    name: string;
    href: string;
    color: string;
    font: 'serif' | 'sans' | 'mono';
    weight: string;
    letter?: string;
    image?: string;
}[] = [
    { name: 'Roche',       href: 'https://www.roche.com',        color: '#0066CC', font: 'serif', weight: '700', image: '/images/partners/roche.png' },
    { name: 'NOVARTIS',    href: 'https://www.novartis.com',      color: '#E5282A', font: 'sans',  weight: '800', letter: '0.06em', image: '/images/partners/novartis.png' },
    { name: 'Gilead',      href: 'https://www.gilead.com',        color: '#C8102E', font: 'sans',  weight: '600', image: '/images/partners/gilead.png' },
    { name: 'Ferrero',     href: 'https://www.ferrero.com',       color: '#8B1A1A', font: 'serif', weight: '700', image: '/images/partners/ferrero.png' },
    { name: 'alfasigma',   href: 'https://www.alfasigma.com',     color: '#003087', font: 'sans',  weight: '700', letter: '0.04em', image: '/images/partners/alfasigma.png' },
    { name: 'aboca',       href: 'https://www.aboca.com',         color: '#3D7A2B', font: 'sans',  weight: '700', image: '/images/partners/aboca.png' },
    { name: 'GreenBone',   href: 'https://www.greenbone.it',      color: '#2E7D32', font: 'sans',  weight: '600', image: '/images/partners/greenbone.png' },
    { name: 'NAMED',       href: 'https://www.named.it',          color: '#1A1A2E', font: 'sans',  weight: '900', letter: '0.12em', image: '/images/partners/named.png' },
];

/* Duplicated for seamless infinite loop */
const ITEMS = [...COMPANIES, ...COMPANIES];

export function ImpreseConsulenzeTeaser() {
    return (
        <motion.section
            aria-labelledby="imprese-heading"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="py-24 bg-[var(--color-bg)]"
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-8">
                    <div>
                        <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">
                            Imprese &amp; Consulenze
                        </p>
                        <h2 id="imprese-heading" className="font-display text-step-4 font-light text-[var(--color-text)] leading-tight">
                            Partnership
                        </h2>
                    </div>
                    <a
                        href="/consultancy"
                        className="group shrink-0 hidden sm:inline-flex items-center gap-2 text-step--1 font-mono text-[var(--color-accent)] hover:underline"
                    >
                        Tutte le consulenze
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                </div>

                {/* Subtitle Description */}
                <div className="max-w-3xl mb-12">
                    <p className="text-step-0 font-light leading-relaxed text-[var(--color-text-muted)]">
                        Direttore Scientifico (R&D) e membro del Consiglio di Amministrazione di diverse società biotecnologiche, responsabile del programma industriale DARPA &ldquo;Fracture Putty&rdquo; ($15M). Inventore e detentore di 12 brevetti internazionali su nano e biomateriali.
                    </p>
                </div>

                {/* ── Infinite logo marquee with drag/swipe ── */}
                <DragMarquee
                    duration={45}
                    className="[mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]"
                >
                    {ITEMS.map((co, i) => (
                        <a
                            key={i}
                            href={co.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={co.name}
                            className="group shrink-0 relative flex items-center justify-center w-40 sm:w-52 h-24 sm:h-28 border border-[var(--color-border)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg"
                            style={{ '--brand-color': co.color } as React.CSSProperties}
                        >
                            {co.image ? (
                                <Image
                                    src={co.image}
                                    alt={co.name}
                                    fill
                                    className="object-contain p-4 grayscale dark:invert dark:opacity-70 group-hover:grayscale-0 dark:group-hover:invert-0 dark:group-hover:opacity-100 transition-all duration-400"
                                    sizes="(max-width: 640px) 160px, 208px"
                                />
                            ) : (
                                <span
                                    className="imprese-name font-sans transition-all duration-500 text-[var(--color-text-muted)]"
                                    style={{
                                        fontFamily: co.font === 'serif' ? 'var(--font-display)' : 'var(--font-sans)',
                                        fontWeight: co.weight,
                                        letterSpacing: co.letter ?? '0',
                                        fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
                                    }}
                                >
                                    {co.name}
                                </span>
                            )}
                        </a>
                    ))}
                </DragMarquee>

                {/* Mobile CTA */}
                <div className="mt-6 sm:hidden text-right">
                    <a
                        href="/consultancy"
                        className="group inline-flex items-center gap-2 text-step--1 font-mono text-[var(--color-accent)] hover:underline"
                    >
                        Tutte le consulenze
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>

            <style>{`
        .group:hover .imprese-name {
          color: var(--brand-color) !important;
        }
      `}</style>
        </motion.section>
    );
}
