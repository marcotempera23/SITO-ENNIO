'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

/* Typed bezier for Framer Motion */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: 'easeOut' } },
};

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative overflow-hidden min-h-[calc(100svh-3.5rem)] flex items-center bg-transparent"
    >
      {/* Background grid — ultra-subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-20 sm:pt-28 pb-14 sm:pb-20 md:pb-16">

        {/* ── Mobile portrait — elegant cropped photo above text ── */}
        <motion.div
          className="md:hidden relative mb-10 mx-auto max-w-xs"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        >
          {/* Accent rectangle behind portrait */}
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 w-full h-full bg-[var(--color-surface-2)]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          />
          <div className="relative z-10">
            <picture>
              <source srcSet="/images/portrait-dark.jpg" media="(prefers-color-scheme: dark)" />
              <Image
                src="/images/portrait-light.jpg"
                alt="Prof. Ennio Tasciotti"
                width={320}
                height={420}
                priority
                className="w-full h-auto max-h-[50svh] object-cover object-top"
              />
            </picture>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_520px] items-center gap-0">

          {/* ── Text column ── */}
          <motion.div
            className="md:pr-16 lg:pr-24 text-center md:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-step--1 uppercase tracking-[0.22em] mb-8 text-[var(--color-accent)]"
            >
              {t('eyebrow')}
            </motion.p>

            <motion.h1
              id="hero-headline"
              variants={fadeUp}
              className="font-display font-light text-step-6 leading-[1.02] tracking-tight text-[var(--color-text)]"
            >
              {t('headline')}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-1 h-[2px] w-16 bg-[var(--color-accent)] mx-auto md:mx-0"
              aria-hidden="true"
            />

            <motion.p
              variants={fadeUp}
              className="mt-8 text-step-0 leading-[1.75] max-w-lg text-[var(--color-text-muted)] mx-auto md:mx-0"
            >
              {t('subheadline')}
            </motion.p>

            {t.raw('subheadline2') ? (
              <motion.p
                variants={fadeUp}
                className="mt-4 text-step--1 leading-[1.75] max-w-lg text-[var(--color-text-muted)] mx-auto md:mx-0"
              >
                {t('subheadline2')}
              </motion.p>
            ) : null}

            <motion.div variants={fadeUp} className="mt-14 sm:mt-16 md:mt-20 mb-4 sm:mb-8 md:mb-10 flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href="/science"
                className="group inline-flex h-12 items-center rounded-none border-b-2 border-[var(--color-accent)] bg-[var(--color-accent)] px-8 text-step-0 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-[var(--color-accent)] w-full sm:w-auto justify-center"
              >
                {t('ctaPrimary')}
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center rounded-none border border-[var(--color-accent)] bg-transparent px-8 text-step-0 font-medium text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white w-full sm:w-auto justify-center"
              >
                {t('ctaSecondary')}
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Portrait column — Desktop only ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="relative hidden md:flex justify-end"
          >
            {/* Accent rectangle behind portrait */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-4/5 h-[85%] bg-[var(--color-surface-2)]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ originY: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
              className="relative z-10"
            >
              <picture>
                <source srcSet="/images/portrait-dark.jpg" media="(prefers-color-scheme: dark)" />
                <Image
                  src="/images/portrait-light.jpg"
                  alt="Prof. Ennio Tasciotti"
                  width={520}
                  height={680}
                  priority
                  className="max-h-[78svh] w-auto object-cover object-top"
                />
              </picture>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">scroll</span>
        <motion.div
          className="h-8 w-[1px] bg-[var(--color-border)]"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
