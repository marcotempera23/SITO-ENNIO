'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useTranslations } from 'next-intl';

export function LongevityClient() {
  const t = useTranslations('longevity');
  // Clipboard states for three social blocks
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const [copied3, setCopied3] = useState(false);

  // Active state for Bento box cards
  const [activePillar, setActivePillar] = useState<number | null>(null);

  // Interactive chart states
  const [bridgeGap, setBridgeGap] = useState(false);

  const copyToClipboard = (text: string, setCopied: (c: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-32">
      {/* ────────────────────────────────────────────────────────
          BLOCK 1: Scenario 2026 (L'Apertura)
          ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] block">
              {t('eyebrow')}
            </span>
            <h1 className="font-display text-step-4 font-light leading-tight text-[var(--color-text)]">
              {t('title')}
            </h1>
            <p className="text-step-1 font-light text-[var(--color-text-muted)] border-l-2 border-[var(--color-accent)] pl-4 italic">
              {t('subtitle')}
            </p>
            <div className="space-y-4 text-step-0 text-[var(--color-text-muted)] leading-relaxed font-light">
              <p>{t('introText1')}</p>
              <p>{t('introText2')}</p>
            </div>

            {/* KPI grid inside the text area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
                <span className="block font-display text-step-3 font-semibold text-[var(--color-accent)] mb-1">
                  {t('stat1Val')}
                </span>
                <span className="block text-step--1 text-[var(--color-text-muted)] leading-normal font-light">
                  {t('stat1Lbl')}
                </span>
              </div>
              <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
                <span className="block font-display text-step-3 font-semibold text-[var(--color-accent)] mb-1">
                  {t('stat2Val')}
                </span>
                <span className="block text-step--1 text-[var(--color-text-muted)] leading-normal font-light">
                  {t('stat2Lbl')}
                </span>
              </div>
              <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
                <span className="block font-display text-step-2 font-semibold text-[var(--color-accent)] mb-1">
                  {t('stat3Val')}
                </span>
                <span className="block text-step--1 text-[var(--color-text-muted)] leading-normal font-light">
                  {t('stat3Lbl')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Area Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 border border-[var(--color-border)] bg-[var(--color-surface)]/30 backdrop-blur-sm rounded-lg">
            <div className="w-full mb-4 flex justify-between items-center">
              <span className="font-mono text-step--2 text-[var(--color-text-muted)] uppercase tracking-wider">
                Lifespan vs Healthspan Visualizer
              </span>
              <button
                onClick={() => setBridgeGap(!bridgeGap)}
                className="px-3 py-1 font-mono text-step--2 uppercase border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 rounded"
              >
                {bridgeGap ? 'Reset' : 'Bridge the Gap'}
              </button>
            </div>

            {/* SVG Interactive Chart */}
            <div className="w-full relative h-[320px] bg-[var(--color-surface)]/60 border border-[var(--color-border)] overflow-hidden rounded">
              {/* Grid Background */}
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none opacity-20">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="border-t border-l border-[var(--color-text)]/40" />
                ))}
              </div>

              <svg viewBox="0 0 400 300" className="w-full h-full p-6 overflow-visible">
                {/* Axes */}
                <line x1="40" y1="240" x2="360" y2="240" stroke="var(--color-text-muted)" strokeWidth="1" />
                <line x1="40" y1="40" x2="40" y2="240" stroke="var(--color-text-muted)" strokeWidth="1" />

                {/* X labels (Age in years) */}
                <text x="40" y="260" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">0</text>
                <text x="120" y="260" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">20</text>
                <text x="200" y="260" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">40</text>
                <text x="280" y="260" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">60</text>
                <text x="360" y="260" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">85</text>

                {/* Lifespan Curve (Background Area - Grey/Blue) */}
                <path
                  d="M 40 240 Q 150 160 280 100 T 360 80 L 360 240 Z"
                  fill="var(--color-border)"
                  opacity="0.3"
                />
                <path
                  d="M 40 240 Q 150 160 280 100 T 360 80"
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                <text x="350" y="70" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace" textAnchor="end">
                  Lifespan (85 yrs)
                </text>

                {/* Healthspan Area (Dynamic - Accent Color) */}
                <motion.path
                  d={
                    bridgeGap
                      ? "M 40 240 Q 150 160 280 100 T 360 80 L 360 240 Z"
                      : "M 40 240 Q 150 170 240 140 T 310 135 L 310 240 Z"
                  }
                  fill="url(#healthspanGrad)"
                  transition={{ duration: 1.2, ease: EASE }}
                />
                <motion.path
                  d={
                    bridgeGap
                      ? "M 40 240 Q 150 160 280 100 T 360 80"
                      : "M 40 240 Q 150 170 240 140 T 310 135"
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
                      <path d="M 315 85 L 325 85 M 320 85 L 320 135 M 315 135 L 325 135" stroke="var(--color-accent)" strokeWidth="1.5" />
                      <text x="332" y="115" fontSize="11" fill="var(--color-accent)" fontWeight="bold" fontFamily="monospace">
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

            <p className="text-step--1 text-[var(--color-text-muted)] font-light text-center leading-normal">
              Clicca su &quot;Bridge the Gap&quot; per visualizzare l&apos;impatto dei protocolli di longevità sull&apos;allineamento biologico.
            </p>
          </div>
        </div>

        {/* SOCIAL LINKEDIN PREVIEW BOX */}
        <div className="mt-12 p-6 border border-[var(--color-border)] bg-[var(--color-surface-2)]/30 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-3">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-mono text-step--2 text-blue-500 uppercase tracking-wider font-semibold">LinkedIn Insight</span>
            </div>
            <button
              onClick={() => copyToClipboard(t('social1Text'), setCopied1)}
              className="text-step--1 font-mono text-[var(--color-accent)] hover:underline flex items-center gap-2"
            >
              {copied1 ? t('copied') : t('copyShare')}
            </button>
          </div>
          <p className="font-sans text-step--1 text-[var(--color-text-muted)] italic leading-relaxed select-all">
            &quot;{t('social1Text')}&quot;
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          BLOCK 2: I Pilastri della Longevità (Bento Box)
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

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1: Nutrire (Large Column) */}
          <div
            onMouseEnter={() => setActivePillar(0)}
            onMouseLeave={() => setActivePillar(null)}
            className="lg:col-span-6 group relative flex flex-col justify-between min-h-[400px] p-8 border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]"
          >
            {/* Background biological animation visualizer */}
            <div className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-700">
              <svg viewBox="0 0 200 200" className="w-full h-full scale-125 origin-center">
                {/* Epigenetic DNA Methylation Helix vector */}
                <g className="origin-center rotate-45 translate-x-12 translate-y-12">
                  <motion.path
                    d="M 20 100 Q 50 50 80 100 T 140 100"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    animate={{ strokeDashoffset: [0, 100] }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    strokeDasharray="4,4"
                  />
                  <motion.path
                    d="M 20 100 Q 50 150 80 100 T 140 100"
                    fill="none"
                    stroke="var(--color-text-muted)"
                    strokeWidth="1.5"
                    animate={{ strokeDashoffset: [100, 0] }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    strokeDasharray="4,4"
                  />
                  {/* Methyl groups */}
                  <circle cx="50" cy="75" r="4" fill="var(--color-accent)" className="animate-pulse" />
                  <circle cx="110" cy="125" r="4" fill="var(--color-accent)" className="animate-pulse" />
                </g>
              </svg>
            </div>

            <div className="relative z-10">
              <span className="font-mono text-step-2 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors duration-500 block mb-6">
                01
              </span>
              <h3 className="font-display text-step-2 font-light text-[var(--color-text)]">
                {t('pillar1Title')}
              </h3>
              <p className="font-mono text-step--1 text-[var(--color-accent)] mt-1 mb-4">
                {t('pillar1Subtitle')}
              </p>
            </div>

            <p className="relative z-10 text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed">
              {t('pillar1Body')}
            </p>
          </div>

          {/* Right Column containing Pillars 2 and 3 stacked */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-8">
            {/* Card 2: Muovere */}
            <div
              onMouseEnter={() => setActivePillar(1)}
              onMouseLeave={() => setActivePillar(null)}
              className="group relative flex flex-col justify-between min-h-[220px] p-8 border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]"
            >
              {/* Background myokines flow diagram */}
              <div className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <motion.g
                    animate={{ x: [0, 40] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  >
                    <circle cx="20" cy="50" r="3" fill="var(--color-accent)" />
                    <circle cx="60" cy="30" r="4" fill="var(--color-accent)" />
                    <circle cx="100" cy="65" r="3" fill="var(--color-accent)" />
                    <circle cx="140" cy="45" r="5" fill="var(--color-accent)" />
                  </motion.g>
                </svg>
              </div>

              <div className="relative z-10">
                <span className="font-mono text-step-1 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors duration-500 block mb-3">
                  02
                </span>
                <h3 className="font-display text-step-1 font-light text-[var(--color-text)]">
                  {t('pillar2Title')}
                </h3>
                <p className="font-mono text-step--1 text-[var(--color-accent)] mt-1 mb-3">
                  {t('pillar2Subtitle')}
                </p>
              </div>

              <p className="relative z-10 text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed">
                {t('pillar2Body')}
              </p>
            </div>

            {/* Card 3: Connettere */}
            <div
              onMouseEnter={() => setActivePillar(2)}
              onMouseLeave={() => setActivePillar(null)}
              className="group relative flex flex-col justify-between min-h-[220px] p-8 border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]"
            >
              {/* Macrophage switch M1 to M2 graphic */}
              <div className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-25 transition-opacity duration-700 flex items-center justify-end pr-12">
                <svg viewBox="0 0 100 100" className="h-24 w-24">
                  {/* Outer morphing macrophage shape */}
                  <motion.path
                    d="M 50 20 Q 80 30 85 50 T 50 85 Q 20 75 15 50 T 50 20 Z"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    animate={{
                      d: [
                        "M 50 20 Q 80 30 85 50 T 50 85 Q 20 75 15 50 T 50 20 Z",
                        "M 50 15 Q 75 40 90 50 T 50 90 Q 25 70 10 50 T 50 15 Z",
                        "M 50 20 Q 80 30 85 50 T 50 85 Q 20 75 15 50 T 50 20 Z"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  />
                  {/* Inside nucleus */}
                  <circle cx="50" cy="50" r="12" fill="var(--color-border)" opacity="0.4" />
                </svg>
              </div>

              <div className="relative z-10">
                <span className="font-mono text-step-1 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors duration-500 block mb-3">
                  03
                </span>
                <h3 className="font-display text-step-1 font-light text-[var(--color-text)]">
                  {t('pillar3Title')}
                </h3>
                <p className="font-mono text-step--1 text-[var(--color-accent)] mt-1 mb-3">
                  {t('pillar3Subtitle')}
                </p>
              </div>

              <p className="relative z-10 text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed">
                {t('pillar3Body')}
              </p>
            </div>
          </div>
        </div>

        {/* SOCIAL PREVIEW BOX */}
        <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface-2)]/30 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-3">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="font-mono text-step--2 text-pink-500 uppercase tracking-wider font-semibold">Social Broadcast</span>
            </div>
            <button
              onClick={() => copyToClipboard(t('social2Text'), setCopied2)}
              className="text-step--1 font-mono text-[var(--color-accent)] hover:underline flex items-center gap-2"
            >
              {copied2 ? t('copied') : t('copyShare')}
            </button>
          </div>
          <p className="font-sans text-step--1 text-[var(--color-text-muted)] italic leading-relaxed select-all">
            &quot;{t('social2Text')}&quot;
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          BLOCK 3: Lavori Scientifici e Progetti sulla Longevità
          ──────────────────────────────────────────────────────── */}
      <section className="space-y-12 border-t border-[var(--color-border)] pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Bio & Intro Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-step--1 uppercase tracking-[0.2em] text-[var(--color-accent)] block">
              Evidence &amp; Clinical Impact
            </span>
            <h2 className="font-display text-step-3 font-light leading-tight text-[var(--color-text)]">
              {t('evidenceTitle')}
            </h2>
            <p className="text-step-0 text-[var(--color-text-muted)] font-light leading-relaxed">
              {t('evidenceBio')}
            </p>

            {/* Impact Metrics Widget */}
            <div className="grid grid-cols-2 gap-4 border-y border-[var(--color-border)] py-8 mt-6">
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

          {/* Interactive Evidence Wall Column */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-display text-step-1 font-light text-[var(--color-text)] border-b border-[var(--color-border)] pb-2">
              {t('papersTitle')}
            </h3>

            {/* Paper Index Grid */}
            <div className="space-y-4">
              <a
                href="https://doi.org/10.1038/nnano.2012.212"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] uppercase tracking-wider">
                    Nature Nanotechnology, 2013
                  </span>
                  <span className="text-step--2 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <h4 className="font-display text-step-0 font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-2">
                  {t('paper1Title')}
                </h4>
                <p className="text-step--1 text-[var(--color-text-muted)] font-light mt-2 leading-relaxed">
                  {t('paper1Desc')}
                </p>
              </a>

              <a
                href="https://doi.org/10.1038/nmat4246"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-all duration-300"
              >
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
              </a>

              <a
                href="https://doi.org/10.1161/CIRCRESAHA.119.316186"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-all duration-300"
              >
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
              </a>

              <a
                href="https://doi.org/10.1038/nnano.2008.34"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] uppercase tracking-wider">
                    Nature Nanotechnology, 2008
                  </span>
                  <span className="text-step--2 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <h4 className="font-display text-step-0 font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-2">
                  {t('paper4Title')}
                </h4>
                <p className="text-step--1 text-[var(--color-text-muted)] font-light mt-2 leading-relaxed">
                  {t('paper4Desc')}
                </p>
              </a>
            </div>

            {/* Patents & Active Grants */}
            <div className="pt-6 space-y-6">
              <h3 className="font-display text-step-1 font-light text-[var(--color-text)] border-b border-[var(--color-border)] pb-2">
                {t('patentsTitle')}
              </h3>

              <div className="space-y-4">
                <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]/20">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] block mb-1">
                    {t('patent1Title')}
                  </span>
                  <p className="text-step-0 font-light text-[var(--color-text-muted)] leading-relaxed">
                    {t('patent1Desc')}
                  </p>
                </div>

                <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]/20">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] block mb-1">
                    {t('grant1Title')}
                  </span>
                  <p className="text-step-0 font-light text-[var(--color-text-muted)] leading-relaxed">
                    {t('grant1Desc')}
                  </p>
                </div>

                <div className="p-5 border border-[var(--color-border)] bg-[var(--color-surface)]/20">
                  <span className="font-mono text-step--2 text-[var(--color-accent)] block mb-1">
                    {t('prpTitle')}
                  </span>
                  <p className="text-step-0 font-light text-[var(--color-text-muted)] leading-relaxed">
                    {t('prpDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL PREVIEW BOX */}
        <div className="p-6 border border-[var(--color-border)] bg-[var(--color-surface-2)]/30 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-3">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-step--2 text-emerald-500 uppercase tracking-wider font-semibold">Scientific Log</span>
            </div>
            <button
              onClick={() => copyToClipboard(t('social3Text'), setCopied3)}
              className="text-step--1 font-mono text-[var(--color-accent)] hover:underline flex items-center gap-2"
            >
              {copied3 ? t('copied') : t('copyShare')}
            </button>
          </div>
          <p className="font-sans text-step--1 text-[var(--color-text-muted)] italic leading-relaxed select-all">
            &quot;{t('social3Text')}&quot;
          </p>
        </div>
      </section>
    </div>
  );
}
