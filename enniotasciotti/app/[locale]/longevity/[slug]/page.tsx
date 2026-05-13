import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
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

La longevità sana non è semplicemente l'assenza di malattia: è il risultato di un approccio integrato che unisce diagnostica di precisione, prevenzione personalizzata e interventi mirati. Con il nostro gruppo di ricerca presso l'IRCCS Ospedale San Raffaele, abbiamo sviluppato un modello — il **Blueprint per la Longevità di Precisione** — che offre una visione sistemica della salute nel corso della vita.

## I quattro pilastri

Il blueprint si articola in quattro aree interconnesse: **diagnostica avanzata** (genomica, proteomica, metabolomica), **modulazione dell'inflammaging**, **ottimizzazione nutrizionale e dell'esercizio fisico**, e **salute cognitiva e psicosociale**.

## Dalla scienza alla pratica

Ogni pilastro si traduce in protocolli clinici applicabili nella medicina primaria. La sfida non è più di natura scientifica, ma organizzativa: come integrare questi strumenti in sistemi sanitari costruiti per la cura della malattia acuta.

## Conclusioni

La longevità di precisione richiede un cambiamento di paradigma: da un sistema reattivo a uno proattivo, dove il paziente è al centro di un percorso continuo di monitoraggio e intervento preventivo.
    `,
    bodyEN: `
## Introduction

Healthy longevity is not merely the absence of disease: it is the outcome of an integrated approach combining precision diagnostics, personalised prevention and targeted interventions. With our research group at IRCCS Ospedale San Raffaele, we developed a model — the **Blueprint for Precision Longevity** — offering a systemic vision of health across the lifespan.

## The four pillars

The blueprint is structured around four interconnected domains: **advanced diagnostics** (genomics, proteomics, metabolomics), **inflammaging modulation**, **nutritional and physical activity optimisation**, and **cognitive and psychosocial health**.

## From science to practice

Each pillar translates into clinical protocols applicable in primary medicine. The challenge is no longer scientific but organisational: how to integrate these tools into health systems built around acute disease management.

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

La medicina della longevità introduce un approccio **preventivo e personalizzato** in grado di identificare i fattori di rischio decenni prima che si manifestino come patologia. Questo non è fantascienza: gli strumenti esistono già — genomica, bioindicatori, wearables.

## Proposta di riforma

Proponiamo l'integrazione di **Longevity Medicine Clinics** nei presidi di medicina primaria. Queste unità, guidate da medici specializzati in longevità, fungono da hub di prevenzione, coordinando specialisti, nutrizionisti, fisioterapisti e psicologi.

## Implicazioni di sistema

L'investimento nella prevenzione genera risparmi significativi sul lungo periodo. Le proiezioni indicano una riduzione del 30–40% dei ricoveri ospedalieri evitabili nella coorte 50–70 anni se si adottano protocolli di longevità di precisione.

## Verso un nuovo contratto sociale sulla salute

Riformare la medicina primaria con i principi della longevità significa anche cambiare la relazione tra medico e paziente: da consulto episodico a partnership continua per il benessere.
    `,
    bodyEN: `
## The problem

Western healthcare systems were designed to manage acute illness. Today, with an ageing population and the rising prevalence of chronic conditions, this model is showing its structural limits.

## Longevity medicine as the answer

Longevity medicine introduces a **preventive and personalised** approach capable of identifying risk factors decades before they manifest as disease. This is not science fiction: the tools already exist — genomics, biomarkers, wearables.

## Reform proposal

We propose the integration of **Longevity Medicine Clinics** within primary care facilities. These units, led by longevity-trained physicians, serve as prevention hubs, coordinating specialists, nutritionists, physiotherapists and psychologists.

## System implications

Investment in prevention generates significant long-term savings. Projections indicate a 30–40% reduction in avoidable hospital admissions in the 50–70 age cohort if precision longevity protocols are adopted.

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
          <p
            className="font-mono text-step--1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}{article.readTime}
          </p>
          <h1
            className="mt-4 font-display text-step-5 font-light leading-tight"
            style={{ color: 'var(--color-text)' }}
          >
            {title}
          </h1>
        </header>

        <Prose>
          {/* Render simple markdown-like content as HTML */}
          <div
            // eslint-disable-next-line react/no-danger
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
        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-step--1 italic" style={{ color: 'var(--color-quote)' }}>
            {isIT
              ? 'Prof. Ennio Tasciotti — IRCCS Ospedale San Raffaele, Milano'
              : 'Prof. Ennio Tasciotti — IRCCS Ospedale San Raffaele, Milan'}
          </p>
        </div>
      </div>
    </div>
  );
}
