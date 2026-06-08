'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* Rotating ticker items */
const TICKER = [
    'Direttore — Human Longevity Program',
    'Nanomedicina & Drug Delivery',
    'Medicina Rigenerativa',
    'Biologia delle Cellule Staminali',
    'Ricerca Traslazionale',
];

export function ChiSonoTeaser() {
    const t = useTranslations('home.hero');

    return (
        <section
            aria-labelledby="chisono-heading"
            className="relative overflow-hidden min-h-[80svh] flex flex-col justify-end"
        >
            {/* Background photo */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/ennio-conference.jpg"
                    alt="Prof. Tasciotti at conference"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* Gradient overlay — dark at bottom, transparent at top right */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(10,15,24,0.85) 0%, rgba(10,15,24,0.4) 60%, rgba(10,15,24,0.1) 100%)',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-0">
                <div className="max-w-2xl py-20">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="font-mono text-step--1 uppercase tracking-[0.22em] text-[var(--color-accent-2)] mb-6"
                    >
                        Chi sono
                    </motion.p>
                    <motion.h2
                        id="chisono-heading"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
                        className="font-display font-light text-step-5 leading-[1.05] text-white"
                    >
                        Scienziato.<br />
                        Imprenditore.<br />
                        Innovatore.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
                        className="mt-6 text-step-0 leading-relaxed text-white/75 max-w-md"
                    >
                        Professore e ricercatore di fama internazionale, pioniere della nanomedicina e della medicina della longevità. Con 200+ pubblicazioni e 13.000+ citazioni, traduce la scienza in impatto reale.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                        className="mt-8"
                    >
                        <Link
                            href="/about"
                            className="group inline-flex h-12 items-center gap-3 border border-white/40 bg-white/10 backdrop-blur-sm px-7 text-step-0 font-medium text-white transition-all duration-300 hover:bg-white hover:text-[var(--color-text)]"
                        >
                            Scopri la biografia completa
                            <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Rotating ticker at bottom */}
            <div className="chi-sono-ticker relative z-10 w-full border-t border-white/20 bg-black/30 backdrop-blur-sm py-3 overflow-hidden">
                <div className="flex animate-marquee-slow whitespace-nowrap">
                    {[...TICKER, ...TICKER].map((item, i) => (
                        <span key={i} className="mx-10 font-mono text-step--1 text-white/70 shrink-0">
                            {item}
                            <span className="ml-10 text-white/30" aria-hidden="true">·</span>
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes marquee-slow {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 38s linear infinite;
        }
        .chi-sono-ticker:hover .animate-marquee-slow {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-slow { animation: none; }
        }
      `}</style>
        </section>
    );
}
