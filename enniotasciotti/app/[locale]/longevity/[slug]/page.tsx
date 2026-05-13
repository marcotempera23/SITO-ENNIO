import { notFound } from 'next/navigation';
import { Prose } from '@/components/shared/prose';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const ARTICLES: Record<string, {
  titleIT: string; titleEN: string;
  date: string; readTime: string;
  bodyIT: string; bodyEN: string;
}> = {
  'blueprint-for-precision-longevity': {
    titleIT: 'Blueprint per una Longevità di Precisione',
    titleEN: 'Blueprint for Precision Longevity',
    date: '2025-01-15',
    readTime: '5 min',
    bodyIT: `
## Introduzione

La longevità sana non è semplicemente l'assenza di malattia: è il risultato di un approccio integrato che unisce prevenzione, biomarcatori, stratificazione del rischio e monitoraggio nel tempo. Nel lavoro **Blueprint for Healthy & Precision Longevity**, il contributo del Prof. Tasciotti è inquadrato nello Human Longevity Program dell'IRCCS San Raffaele e nel Dipartimento di Scienze Umane e Promozione della Qualità della Vita dell'Università Telematica San Raffaele Roma.

## Le cinque priorità

Il blueprint identifica cinque priorità operative: **biomarcatori clinicamente validati dell'età biologica**, **piattaforme digitali interoperabili**, **trial multimodali adattivi**, **strumenti di stratificazione del rischio basati su AI spiegabile** e **formazione professionale sulla relazione tra aging, patologia e disabilità**.

## Dalla scienza alla pratica

La sfida è organizzativa e scientifica insieme: integrare prevenzione di precisione, dati longitudinali e percorsi multidisciplinari in sistemi sanitari ancora prevalentemente centrati sulla malattia acuta.

## Conclusioni

La longevità di precisione richiede un cambiamento di paradigma: da un sistema reattivo a uno proattivo, dove il paziente è al centro di un percorso continuo di monitoraggio e intervento preventivo.
    `,
    bodyEN: `
## Introduction

Healthy longevity is not merely the absence of disease: it is the outcome of an integrated approach combining prevention, biomarkers, risk stratification and longitudinal monitoring. In **Blueprint for Healthy & Precision Longevity**, Prof. Tasciotti's contribution is framed through the Human Longevity Program at IRCCS San Raffaele and the Department of Human Sciences and Quality of Life at San Raffaele University, Rome.

## The five priorities

The blueprint identifies five operational priorities: **clinically validated biomarkers of biological age**, **interoperable digital monitoring platforms**, **adaptive multimodal trials**, **explainable-AI risk stratification tools** and **professional training on the relationship between ageing, pathology and disability**.

## From science to practice

The challenge is both organisational and scientific: integrating precision prevention, longitudinal data and multidisciplinary care pathways into health systems still largely built around acute disease management.

## Conclusions

Precision longevity demands a paradigm shift: from a reactive system to a proactive one, where the patient is at the centre of a continuous pathway of monitoring and preventive intervention.
    `,
  },
  'primary-care-reform': {
    titleIT: 'Riformare la Medicina di Base con la Longevità',
    titleEN: 'Reforming Primary Care through Longevity Medicine',
    date: '2025-02-10',
    readTime: '7 min',
    bodyIT: `
## Il problema

I sistemi sanitari occidentali sono stati progettati per gestire malattie acute. Oggi, con una popolazione che invecchia e la prevalenza crescente di condizioni croniche, questo modello mostra i suoi limiti strutturali.

## La medicina della longevità come risposta

La medicina della longevità introduce un approccio **preventivo e personalizzato** basato su prevenzione primaria, stratificazione predittiva del rischio, biomarcatori validati e team multidisciplinari supportati dai dati.

## Proposta di riforma

Il documento propone **longevity clinics** accessibili pubblicamente, con assessment standardizzati, percorsi stepped-care, cartelle digitali integrate ed endpoint funzionali ed economici misurabili.

## Implicazioni di sistema

L'investimento nella prevenzione richiede una combinazione di strumenti di policy: infrastrutture informative, standard regolatori e di accreditamento, finanziamenti orientati alla prevenzione, hub territoriali e formazione di team multidisciplinari data-literate.

## Verso un nuovo contratto sociale sulla salute

Riformare la medicina primaria con i principi della longevità significa anche cambiare la relazione tra medico e paziente: da consulto episodico a partnership continua per il benessere.
    `,
    bodyEN: `
## The problem

Western healthcare systems were designed to manage acute illness. Today, with an ageing population and the rising prevalence of chronic conditions, this model is showing its structural limits.

## Longevity medicine as the answer

Longevity medicine introduces a **preventive and personalised** approach grounded in primary prevention, predictive risk stratification, validated biomarkers and multidisciplinary, data-enabled teams.

## Reform proposal

The document proposes publicly accessible **longevity clinics** with standardized assessment, stepped-care pathways, integrated digital records and measurable functional and economic endpoints.

## System implications

Investment in prevention requires a policy mix of information infrastructures, regulatory and accreditation standards, prevention-focused financing, community hubs and workforce development for multidisciplinary, data-literate teams.

## Towards a new social contract on health

Reforming primary medicine with longevity principles also means reshaping the doctor–patient relationship: from episodic consultation to a continuous partnership for wellbeing.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  return buildMetadata({
    locale,
    title: locale === 'it' ? article.titleIT : article.titleEN,
    description: '',
    path: `/longevity/${slug}`,
  });
}

export default async function LongevityArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  const isIT = locale === 'it';
  const title = isIT ? article.titleIT : article.titleEN;
  const body = isIT ? article.bodyIT : article.bodyEN;

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="mb-12">
          <p className="font-mono text-step--1 text-[var(--color-text-muted)]">
            {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}{article.readTime}
          </p>
          <h1
            className="mt-4 font-display text-step-5 font-light leading-tight text-[var(--color-text)]"
          >
            {title}
          </h1>
        </header>

        <Prose>
          {/* Render simple markdown-like content as HTML */}
          <div
            dangerouslySetInnerHTML={{
              __html: body
                .trim()
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<h)(.)/m, '<p>$1')
                + '</p>',
            }}
          />
        </Prose>

        {/* Attribution */}
        <div className="mt-16 border-t border-[var(--color-border)] pt-8">
          <p className="text-step--1 italic text-[var(--color-quote)]">
            {isIT
              ? 'Prof. Ennio Tasciotti — IRCCS San Raffaele, Roma'
              : 'Prof. Ennio Tasciotti — IRCCS San Raffaele, Rome'}
          </p>
        </div>
      </div>
    </div>
  );
}
