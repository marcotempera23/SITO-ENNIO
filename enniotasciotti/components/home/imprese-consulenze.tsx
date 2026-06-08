'use client';

import { motion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/* Companies with name, brand colour, and style variant */
const COMPANIES: {
    name: string;
    href: string;
    color: string;
    font: 'serif' | 'sans' | 'mono';
    weight: string;
    letter?: string;
}[] = [
    { name: 'Roche',       href: 'https://www.roche.com',        color: '#0066CC', font: 'serif', weight: '700' },
    { name: 'NOVARTIS',    href: 'https://www.novartis.com',      color: '#E5282A', font: 'sans',  weight: '800', letter: '0.06em' },
    { name: 'Gilead',      href: 'https://www.gilead.com',        color: '#C8102E', font: 'sans',  weight: '600' },
    { name: 'Ferrero',     href: 'https://www.ferrero.com',       color: '#8B1A1A', font: 'serif', weight: '700' },
    { name: 'alfasigma',   href: 'https://www.alfasigma.com',     color: '#003087', font: 'sans',  weight: '700', letter: '0.04em' },
    { name: 'aboca',       href: 'https://www.aboca.com',         color: '#3D7A2B', font: 'sans',  weight: '700' },
    { name: 'GreenBone',   href: 'https://www.greenbone.it',      color: '#2E7D32', font: 'sans',  weight: '600' },
    { name: 'NAMED',       href: 'https://www.named.it',          color: '#1A1A2E', font: 'sans',  weight: '900', letter: '0.12em' },
    { name: 'INTEGRA',     href: 'https://www.integralife.com',   color: '#004B87', font: 'sans',  weight: '700', letter: '0.08em' },
    { name: 'Lightscience', href: '#',                            color: '#D97706', font: 'sans',  weight: '500' },
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
                <div className="flex items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">
                            Imprese &amp; Consulenze
                        </p>
                        <h2 id="imprese-heading" className="font-display text-step-4 font-light text-[var(--color-text)]">
                            Partner &amp; collaborazioni<br />di riferimento
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

                {/* ── Infinite logo marquee ── */}
                <div className="imprese-marquee-outer border-y border-[var(--color-border)] py-8 overflow-hidden">
                    <div className="imprese-marquee-track flex items-center gap-16 whitespace-nowrap">
                        {ITEMS.map((co, i) => (
                            <a
                                key={i}
                                href={co.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={co.name}
                                className="imprese-logo-item group inline-flex items-center shrink-0 select-none"
                            >
                                {/* Bullet separator */}
                                {i > 0 && (
                                    <span
                                        className="mr-16 text-[var(--color-border)] text-2xl select-none"
                                        aria-hidden="true"
                                    >
                                        ·
                                    </span>
                                )}
                                <span
                                    className="imprese-name font-sans transition-all duration-500"
                                    style={{
                                        fontFamily: co.font === 'serif' ? 'var(--font-display)' : 'var(--font-sans)',
                                        fontWeight: co.weight,
                                        letterSpacing: co.letter ?? '0',
                                        fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
                                        color: 'var(--color-text-muted)',
                                        '--brand-color': co.color,
                                    } as React.CSSProperties}
                                >
                                    {co.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

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
        @keyframes imprese-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .imprese-marquee-track {
          animation: imprese-scroll 36s linear infinite;
          will-change: transform;
        }
        .imprese-marquee-outer:hover .imprese-marquee-track {
          animation-play-state: paused;
        }
        .imprese-logo-item:hover .imprese-name {
          color: var(--brand-color) !important;
          opacity: 1;
        }
        .imprese-marquee-outer {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .imprese-marquee-track { animation: none; }
        }
      `}</style>
        </motion.section>
    );
}
