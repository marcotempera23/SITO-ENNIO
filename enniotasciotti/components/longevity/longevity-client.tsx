'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useTranslations } from 'next-intl';

export function LongevityClient() {
  const t = useTranslations('longevity');
  const [bridgeGap, setBridgeGap] = useState(false);

  return (
    <div className="space-y-32">
      {/* ────────────────────────────────────────────────────────
          BLOCK 1: Scenario 2026 (L'Apertura)
          ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] block">
            {t('eyebrow')}
          </span>
          <h1 className="font-display text-step-4 font-light leading-tight text-[var(--color-text)]">
            {t('title')}
          </h1>
          <p className="text-step-1 font-light text-[var(--color-text-muted)] border-l-2 border-[var(--color-accent)] pl-4 italic max-w-3xl mx-auto text-left">
            {t('subtitle')}
          </p>
          <div className="space-y-4 text-step-0 text-[var(--color-text-muted)] leading-relaxed font-light text-left max-w-3xl mx-auto">
            <p>{t('introText1')}</p>
            <p>{t('introText2')}</p>
          </div>
        </div>

        {/* KPI grid inside the text area - now horizontal banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm rounded-xl text-center">
            <span className="block font-display text-step-3 font-semibold text-[var(--color-accent)] mb-1">
              {t('stat1Val')}
            </span>
            <span className="block text-step--1 text-[var(--color-text-muted)] leading-normal font-light">
              {t('stat1Lbl')}
            </span>
          </div>
          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm rounded-xl text-center">
            <span className="block font-display text-step-3 font-semibold text-[var(--color-accent)] mb-1">
              {t('stat2Val')}
            </span>
            <span className="block text-step--1 text-[var(--color-text-muted)] leading-normal font-light">
              {t('stat2Lbl')}
            </span>
          </div>
          <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm rounded-xl text-center">
            <span className="block font-display text-step-2 font-semibold text-[var(--color-accent)] mb-1">
              {t('stat3Val')}
            </span>
            <span className="block text-step--1 text-[var(--color-text-muted)] leading-normal font-light">
              {t('stat3Lbl')}
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Area Chart - now positioned below */}
        <div className="mt-16 max-w-3xl mx-auto flex flex-col items-center justify-center p-6 border border-[var(--color-border)] bg-[var(--color-surface)]/30 backdrop-blur-sm rounded-2xl">
          <div className="w-full mb-6 flex justify-between items-center px-2">
            <span className="font-mono text-step--2 text-[var(--color-text-muted)] uppercase tracking-wider">
              Lifespan vs Healthspan Visualizer
            </span>
            <button
              onClick={() => setBridgeGap(!bridgeGap)}
              className="px-4 py-1.5 font-mono text-step--2 uppercase border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 rounded-md"
            >
              {bridgeGap ? 'Reset' : 'Bridge the Gap'}
            </button>
          </div>

          {/* SVG Interactive Chart with improved viewBox and spacing to prevent overlapping */}
          <div className="w-full relative h-[360px] bg-[var(--color-surface)]/60 border border-[var(--color-border)] overflow-hidden rounded-xl">
            {/* Grid Background */}
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none opacity-20">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="border-t border-l border-[var(--color-text)]/40" />
              ))}
            </div>

            <svg viewBox="0 0 600 320" className="w-full h-full p-6 overflow-visible">
              {/* Axes */}
              <line x1="50" y1="240" x2="520" y2="240" stroke="var(--color-text-muted)" strokeWidth="1" />
              <line x1="50" y1="40" x2="50" y2="240" stroke="var(--color-text-muted)" strokeWidth="1" />

              {/* X labels (Age in years) */}
              <text x="50" y="265" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">0</text>
              <text x="160" y="265" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">20</text>
              <text x="270" y="265" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">40</text>
              <text x="380" y="265" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">60</text>
              <text x="520" y="265" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">85</text>

              {/* Lifespan Curve (Background Area - Grey/Blue) */}
              <path
                d="M 50 240 C 180 180, 320 110, 520 80 L 520 240 Z"
                fill="var(--color-border)"
                opacity="0.3"
              />
              <path
                d="M 50 240 C 180 180, 320 110, 520 80"
                fill="none"
                stroke="var(--color-text-muted)"
                strokeWidth="2"
                strokeDasharray="4"
              />
              <text x="510" y="65" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace" textAnchor="end">
                Lifespan (85 yrs)
              </text>

              {/* Healthspan Area (Dynamic - Accent Color) */}
              <motion.path
                d={
                  bridgeGap
                    ? "M 50 240 C 180 180, 320 110, 520 80 L 520 240 Z"
                    : "M 50 240 C 180 200, 280 160, 420 145 L 420 240 Z"
                }
                fill="url(#healthspanGrad)"
                transition={{ duration: 1.2, ease: EASE }}
              />
              <motion.path
                d={
                  bridgeGap
                    ? "M 50 240 C 180 180, 320 110, 520 80"
                    : "M 50 240 C 180 200, 280 160, 420 145"
                }
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                transition={{ duration: 1.2, ease: EASE }}
              />

              {/* Gap Bracket Annotation */}
              <AnimatePresence>
                {!bridgeGap && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Vertical bracket for gap */}
                    <path d="M 425 97 L 435 97 M 430 97 L 430 145 M 425 145 L 435 145" stroke="var(--color-accent)" strokeWidth="1.5" />
                    <text x="445" y="125" fontSize="11" fill="var(--color-accent)" fontWeight="bold" fontFamily="monospace">
                      -12.7 Yrs Gap
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Gradients */}
              <defs>
                <linearGradient id="healthspanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>

            {/* Float label */}
            <div className="absolute bottom-12 left-6 right-6 text-center">
              <span className="text-step--2 text-[var(--color-text-muted)] font-mono block">
                {bridgeGap ? 'Target: Healthspan aligned to Lifespan' : 'Current: Sarcopenia & disease gap'}
              </span>
            </div>
          </div>

          <p className="text-step--1 text-[var(--color-text-muted)] font-light text-center leading-normal mt-4">
            Clicca su &quot;Bridge the Gap&quot; per visualizzare l&apos;impatto dei protocolli di longevità sull&apos;allineamento biologico.
          </p>
        </div>

        {/* Clean text display instead of copy-to-clipboard box */}
        <p className="mt-12 text-center text-step-1 font-display font-light text-[var(--color-text)] italic max-w-3xl mx-auto leading-relaxed">
          &quot;{t('social1Text')}&quot;
        </p>
      </section>

      {/* ────────────────────────────────────────────────────────
          BLOCK 2: I Pilastri della Longevità (Orizzontali)
          ──────────────────────────────────────────────────────── */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] block">
            The Methodology
          </span>
          <h2 className="font-display text-step-3 font-light text-[var(--color-text)]">
            {t('pillarsTitle')}
          </h2>
          <p className="text-step-0 text-[var(--color-text-muted)] font-light">
            {t('pillarsSubtitle')}
          </p>
        </div>

        {/* Horizontal Row Layout - 3 symmetric columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Nutrire */}
          <div
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between min-h-[380px]"
          >
            {/* Background Image - visible and scaled on hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
              <Image
                src="/images/pillars/nutrire.png"
                alt={t('pillar1Title')}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-[var(--color-surface)]" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="font-display text-step-2 font-light text-[var(--color-text)] leading-snug">
                {t('pillar1Title')}
              </h3>
              <p className="font-mono text-step--1 text-[var(--color-accent)] mt-1 mb-4">
                {t('pillar1Subtitle')}
              </p>
              <p className="text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed group-hover:text-[var(--color-text)] transition-colors duration-300">
                {t('pillar1Body')}
              </p>
            </div>
          </div>

          {/* Card 2: Muovere */}
          <div
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between min-h-[380px]"
          >
            {/* Background Image - visible and scaled on hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
              <Image
                src="/images/pillars/muovere.png"
                alt={t('pillar2Title')}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-[var(--color-surface)]" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="font-display text-step-2 font-light text-[var(--color-text)] leading-snug">
                {t('pillar2Title')}
              </h3>
              <p className="font-mono text-step--1 text-[var(--color-accent)] mt-1 mb-4">
                {t('pillar2Subtitle')}
              </p>
              <p className="text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed group-hover:text-[var(--color-text)] transition-colors duration-300">
                {t('pillar2Body')}
              </p>
            </div>
          </div>

          {/* Card 3: Connettere */}
          <div
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between min-h-[380px]"
          >
            {/* Background Image - visible and scaled on hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
              <Image
                src="/images/pillars/connettere.png"
                alt={t('pillar3Title')}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-[var(--color-surface)]" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="font-display text-step-2 font-light text-[var(--color-text)] leading-snug">
                {t('pillar3Title')}
              </h3>
              <p className="font-mono text-step--1 text-[var(--color-accent)] mt-1 mb-4">
                {t('pillar3Subtitle')}
              </p>
              <p className="text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed group-hover:text-[var(--color-text)] transition-colors duration-300">
                {t('pillar3Body')}
              </p>
            </div>
          </div>
        </div>

        {/* Clean text display instead of copy-to-clipboard box */}
        <p className="mt-12 text-center text-step-1 font-display font-light text-[var(--color-text)] italic max-w-3xl mx-auto leading-relaxed">
          &quot;{t('social2Text')}&quot;
        </p>
      </section>

      {/* ────────────────────────────────────────────────────────
          BLOCK 3: Lavori Scientifici e Progetti sulla Longevità
          ──────────────────────────────────────────────────────── */}
      <section className="space-y-16 border-t border-[var(--color-border)] pt-16">
        {/* Title and Metrics side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio & Intro Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] block">
              Evidence &amp; Clinical Impact
            </span>
            <h2 className="font-display text-step-3 font-light leading-tight text-[var(--color-text)]">
              {t('evidenceTitle')}
            </h2>
            <p className="text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed">
              {t('evidenceBio')}
            </p>
          </div>

          {/* Impact Metrics Widget */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 border border-[var(--color-border)] p-8 bg-[var(--color-surface)]/30 backdrop-blur-sm rounded-xl">
              <div>
                <span className="block font-display text-step-4 font-extralight text-[var(--color-accent)]">
                  {t('metric1Val')}
                </span>
                <span className="block text-step--2 uppercase font-mono tracking-wider text-[var(--color-text-muted)] mt-1">
                  {t('metric1Lbl')}
                </span>
              </div>
              <div>
                <span className="block font-display text-step-4 font-extralight text-[var(--color-accent)]">
                  {t('metric2Val')}
                </span>
                <span className="block text-step--2 uppercase font-mono tracking-wider text-[var(--color-text-muted)] mt-1">
                  {t('metric2Lbl')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Peer-reviewed publications list (Below title and metrics) */}
        <div className="space-y-8 mt-12">
          <h3 className="font-display text-step-1 font-light text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
            {t('papersTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paper 1: Nature Materials (PMC4538992) */}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4538992/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-lg rounded-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] uppercase tracking-wider">
                    Nature Materials, 2015
                  </span>
                  <span className="text-step--2 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <h4 className="font-display text-step-0 font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-2">
                  {t('paper2Title')}
                </h4>
                <p className="text-step--1 text-[var(--color-text-muted)] font-light mt-2 leading-relaxed">
                  {t('paper2Desc')}
                </p>
              </div>
            </a>

            {/* Paper 2: Circulation Research (CIRCRESAHA.119.315185) */}
            <a
              href="https://www.ahajournals.org/doi/10.1161/CIRCRESAHA.119.315185?url_ver=Z39.88-2003&rfr_id=ori:rid:crossref.org&rfr_dat=cr_pub%20%200pubmed"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-lg rounded-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] uppercase tracking-wider">
                    Circulation Research, 2020
                  </span>
                  <span className="text-step--2 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <h4 className="font-display text-step-0 font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-2">
                  {t('paper3Title')}
                </h4>
                <p className="text-step--1 text-[var(--color-text-muted)] font-light mt-2 leading-relaxed">
                  {t('paper3Desc')}
                </p>
              </div>
            </a>

            {/* Paper 3: Journal of Xenobiotics (PMC13010698) */}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13010698/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-lg rounded-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] uppercase tracking-wider">
                    Journal of Xenobiotics, 2026
                  </span>
                  <span className="text-step--2 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <h4 className="font-display text-step-0 font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-2">
                  {t('paper5Title')}
                </h4>
                <p className="text-step--1 text-[var(--color-text-muted)] font-light mt-2 leading-relaxed">
                  {t('paper5Desc')}
                </p>
              </div>
            </a>

            {/* Paper 4: Mechanisms of Ageing and Development (S0047637426000394) */}
            <a
              href="https://www.sciencedirect.com/science/article/pii/S0047637426000394?via%3Dihub"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-accent)]/30 hover:-translate-y-1 hover:shadow-lg rounded-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] uppercase tracking-wider">
                    Mechanisms of Ageing and Development, 2026
                  </span>
                  <span className="text-step--2 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <h4 className="font-display text-step-0 font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-2">
                  {t('paper6Title')}
                </h4>
                <p className="text-step--1 text-[var(--color-text-muted)] font-light mt-2 leading-relaxed">
                  {t('paper6Desc')}
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Patents & Active Grants - Well aligned to the left */}
        <div className="mt-20 space-y-8 max-w-4xl text-left">
          <h3 className="font-display text-step-2 font-light text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
            {t('patentsTitle')}
          </h3>

          <div className="space-y-6">
            <div className="border-l-2 border-[var(--color-accent)] pl-6 py-2">
              <span className="font-mono text-step--1 text-[var(--color-accent)] block mb-2 uppercase tracking-wider">
                {t('patent1Title')}
              </span>
              <p className="text-step-0 font-light text-[var(--color-text-muted)] leading-relaxed">
                {t('patent1Desc')}
              </p>
            </div>

            <div className="border-l-2 border-[var(--color-accent)] pl-6 py-2">
              <span className="font-mono text-step--1 text-[var(--color-accent)] block mb-2 uppercase tracking-wider">
                {t('grant1Title')}
              </span>
              <p className="text-step-0 font-light text-[var(--color-text-muted)] leading-relaxed">
                {t('grant1Desc')}
              </p>
            </div>

            <div className="border-l-2 border-[var(--color-accent)] pl-6 py-2">
              <span className="font-mono text-step--1 text-[var(--color-accent)] block mb-2 uppercase tracking-wider">
                {t('prpTitle')}
              </span>
              <p className="text-step-0 font-light text-[var(--color-text-muted)] leading-relaxed">
                {t('prpDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Clean text display instead of copy-to-clipboard box */}
        <p className="mt-12 text-center text-step-1 font-display font-light text-[var(--color-text)] italic max-w-3xl mx-auto leading-relaxed">
          &quot;{t('social3Text')}&quot;
        </p>
      </section>
    </div>
  );
}
