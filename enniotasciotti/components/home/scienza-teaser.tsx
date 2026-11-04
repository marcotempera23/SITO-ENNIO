'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DragMarquee } from '@/components/ui/drag-marquee';

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
        subtitle: 'Piattaforme di Trasporto Mirato',
        body: 'Superamento delle barriere biologiche e de-risking delle terapie oncologiche, infiammatorie e neurologiche con vettori biomimetici.',
        href: '/science#drugDelivery',
    },
    {
        id: 'medicina-rigenerativa',
        image: '/images/areas/regenerative-medicine.png',
        title: 'Medicina Rigenerativa',
        subtitle: 'BioNanoScaffolds',
        body: 'Sviluppo di scaffold 3D biomimetici e matrici polimeriche con particelle di silicio per guidare la rigenerazione tissutale.',
        href: '/science#regenerative',
    },
    {
        id: 'immunomodulazione',
        image: '/images/areas/stem-cells.png',
        title: 'Immunomodulazione',
        subtitle: 'Targeting Infiammazione e Fibrosi',
        body: 'Interazione sinergica tra biomateriali e sistema immunitario, polarizzando i macrofagi verso un fenotipo pro-rigenerativo.',
        href: '/science#immunology',
    },
    {
        id: 'longevity',
        image: '/images/areas/longevity.png',
        title: 'Longevità & Healthspan',
        subtitle: 'Medicina 4P',
        body: 'Paradigma della Medicina 4P per contrastare la neurodegenerazione indotta da inflammaging e preservare le funzioni cognitive.',
        href: '/science#longevityPipeline',
    },
];

export function ScienzaTeaser() {
    const t = useTranslations('home.scienzaTeaser');

    return (
        <section aria-labelledby="scienza-heading" className="py-16 sm:py-24 bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
                    <div>
                        <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">{t('eyebrow')}</p>
                        <h2 id="scienza-heading" className="font-display text-step-4 font-light text-[var(--color-text)] leading-tight">
                            {t('title')}
                        </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/science"
                            className="group shrink-0 inline-flex items-center gap-2 px-6 h-11 border border-[var(--color-accent)] text-step--1 font-medium text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white"
                        >
                            {t('cta')}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="group shrink-0 inline-flex items-center gap-2 px-6 h-11 border border-[var(--color-border)] bg-[var(--color-surface)] text-step--1 font-medium text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5"
                        >
                            {t('contactCta')}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* 4 macro-area cards in 4-col grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MACRO_AREAS.map((area, i) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                            className="col-span-1"
                        >
                            <Link
                                href={area.href}
                                className="scienza-card group block relative p-6 md:p-10 h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between min-h-[220px] sm:min-h-[280px]"
                            >
                                {/* Background Image — visible on hover (desktop) or always subtle on mobile */}
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 scienza-card-bg transition-opacity duration-500 pointer-events-none">
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
                                    className="scienza-accent-line absolute bottom-0 left-0 h-[2.5px] w-full bg-[var(--color-accent)] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Cover Stories — horizontal scroll marquee with drag/swipe */}
                <div className="mt-16">
                    <p className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-6">
                        Pubblicato su
                    </p>
                    <DragMarquee
                        duration={45}
                        className="[mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]"
                    >
                        {[
                            ...JOURNALS.map(j => ({ ...j, isPlaceholder: false })),
                            { name: '200+ articoli', href: '/science', isPlaceholder: true, src: '', bg: '' },
                            ...JOURNALS.map(j => ({ ...j, isPlaceholder: false })),
                            { name: '200+ articoli', href: '/science', isPlaceholder: true, src: '', bg: '' },
                        ].map((j, idx) =>
                            j.isPlaceholder ? (
                                <Link
                                    key={`placeholder-${idx}`}
                                    href={j.href || ''}
                                    className="shrink-0 flex items-center justify-center w-40 sm:w-52 h-24 sm:h-28 border border-dashed border-[var(--color-border)] text-step--1 font-mono text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] bg-[var(--color-surface)] transition-colors duration-300"
                                >
                                    200+ articoli →
                                </Link>
                            ) : (
                                <a
                                    key={`${j.name}-${idx}`}
                                    href={j.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group shrink-0 relative flex items-center justify-center w-40 sm:w-52 h-24 sm:h-28 border border-[var(--color-border)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg"
                                    aria-label={j.name}
                                >
                                    <Image
                                        src={j.src || ''}
                                        alt={j.name || ''}
                                        fill
                                        className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-400"
                                        sizes="(max-width: 640px) 160px, 208px"
                                    />
                                </a>
                            )
                        )}
                    </DragMarquee>
                </div>
            </div>

            {/* Mobile: show background images and accent line for touch devices */}
            <style>{`
                @media (hover: none) and (pointer: coarse) {
                    .scienza-card-bg {
                        opacity: 0.07 !important;
                    }
                    .scienza-accent-line {
                        transform: scaleX(1) !important;
                    }
                    .scienza-card {
                        border-color: color-mix(in srgb, var(--color-accent) 20%, var(--color-border)) !important;
                    }
                }
            `}</style>
        </section>
    );
}
