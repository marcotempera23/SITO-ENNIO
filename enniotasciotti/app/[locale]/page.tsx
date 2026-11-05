import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo';
import { HLP_URL } from '@/lib/links';
import { COMPANIES, JOURNALS, MEDIA } from '@/lib/logos';
import { Mark } from '@/components/hlp/experience';
import { HlpMark } from '@/components/hlp/hlp-mark';
import { Scrub, Words } from '@/components/hlp/text';
import { Newsletter, TalkVideo } from '@/components/hlp/home-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('homeTitle'), description: t('homeDescription') });
}

type Step = { key: string; href: string; label: string; verb: string; title: string; body: string; points: string[] };
type Portfolio = { id: string; title: string; desc: string; cta: string; href: string };

const STEP_COLORS = ['#f2a28f', '#e9dfc9', '#7ce0bf', '#8fd8ff'];
const CHIP_DOTS = ['hud-pulse', 'st st-sand', 'st st-mint', 'st st-coral'];

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hx' });
  const home = await getTranslations({ locale, namespace: 'home' });
  const steps = t.raw('story.steps') as Step[];
  const meta = t.raw('hero.meta') as [string, string, string][];
  const chips = t.raw('hero.chips') as string[];
  const facts = t.raw('about.facts') as [string, string][];
  const tags = t.raw('about.tags') as string[];
  const center = t.raw('story.center') as string[];
  const portfolio = home.raw('leadershipPortfolio.items') as Portfolio[];
  const numLocale = locale === 'it' ? 'it-IT' : 'en-US';

  const logoRow = (items: { name: string; src: string; href: string }[], rev = false) => (
    <div className={`logo-track${rev ? ' rev' : ''}`}>
      {[0, 1, 2, 3].map((k) => items.map((l) => (
        <a key={`${k}-${l.name}`} className="logo-tile" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.name} tabIndex={k ? -1 : 0} aria-hidden={k ? true : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.src} alt="" loading="lazy" decoding="async" />
        </a>
      )))}
    </div>
  );

  return (
    <div className="hx">
      {/* ═══ APERTURA ═══ */}
      <section className="hx-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-in">
            <span>
              <a className="eyebrow-link" href={HLP_URL} target="_blank" rel="noopener">Human Longevity Program ↗</a>
              <span className="eb-rest">{t('hero.eyebrowRest')}</span>
            </span>
          </p>
          <h1 className="hx-title">
            <span className="line"><Words text={t('hero.line1')} /></span>
            <span className="line accent"><Words text={t('hero.line2')} /></span>
          </h1>
          <p className="lead hero-in">{home('heroSubtitle')}</p>
          <div className="hero-cta hero-in">
            <a className="btn btn-primary btn-lg" href="#ricerca">{t('hero.ctaPrimary')} <span className="arrow" aria-hidden="true">→</span></a>
            <Link className="btn btn-ghost btn-lg" href="/contact">{t('hero.ctaSecondary')}</Link>
          </div>
          <ul className="hero-meta hero-in">
            {meta.map(([n, suffix, label]) => (
              <li key={label}>
                <b data-count={n} data-suffix={suffix} data-locale={numLocale}>{Number(n).toLocaleString(numLocale)}{suffix}</b>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hud" aria-hidden="true">
          {chips.map((c, i) => (
            <div key={c} className={`hud-chip hud-${'abcd'[i]}`}><span className={CHIP_DOTS[i]} />{c}</div>
          ))}
        </div>
        <a className="scroll-cue" href="#pensiero" aria-label={t('hero.scrollLabel')}>
          <span className="scroll-mouse"><span /></span>
          {t('hero.scroll')}
        </a>
      </section>

      {/* ═══ MANIFESTO: la camera entra nella nanoparticella ═══ */}
      <section className="manifesto" id="pensiero" data-scene="manifesto">
        <div className="wrap narrow">
          <p className="eyebrow">{t('manifesto.eyebrow')}</p>
          <span className="quote-mark" aria-hidden="true">“</span>
          <Scrub as="blockquote" className="scrub-text" text={home('tedxQuote')} />
          <span className="manifesto-cite">{t('manifesto.cite')}</span>
          <p className="manifesto-sub" data-reveal>{home('hero.subheadline')}</p>
        </div>
      </section>

      {/* ═══ RICERCA: quattro aree, la materia cambia forma ═══ */}
      <section className="story" id="ricerca" aria-labelledby="story-title">
        <div className="story-intro" data-scene="trasportare">
          <p className="eyebrow">{t('story.eyebrow')}</p>
          <h2 id="story-title">{t('story.title')}</h2>
          <p className="lead">{t('story.lead')}</p>
        </div>
        <div className="hx-steps">
          {steps.map((s, i) => (
            <article key={s.key} className="hx-step" data-step={s.key} style={{ '--c': STEP_COLORS[i] } as React.CSSProperties} aria-labelledby={`step-${s.key}`}>
              <p className="step-num">0{i + 1} · {s.label}</p>
              <h3 className="step-verb" id={`step-${s.key}`}>{s.verb}</h3>
              <p className="step-title">{s.title}</p>
              <p className="step-body">{s.body}</p>
              {s.points.length > 0 && (
                <ul className="step-points">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              )}
              <Link className="hx-link" href={s.href}>{t('story.more')} <span className="arrow" aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      {/* il ciclo resta visibile mentre si attraversano le quattro aree */}
      <div className="cycle-hud" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <circle className="cy-track" cx="100" cy="100" r="78" />
          <circle className="cy-arc" id="cy-arc" cx="100" cy="100" r="78" pathLength={1} />
          <g className="cy-node"><circle cx="100" cy="22" r="7" /><text x="100" y="8" textAnchor="middle">{steps[0].verb}</text></g>
          <g className="cy-node"><circle cx="178" cy="100" r="7" /><text x="186" y="104" textAnchor="start">{steps[1].verb}</text></g>
          <g className="cy-node"><circle cx="100" cy="178" r="7" /><text x="100" y="198" textAnchor="middle">{steps[2].verb}</text></g>
          <g className="cy-node"><circle cx="22" cy="100" r="7" /><text x="14" y="104" textAnchor="end">{steps[3].verb}</text></g>
          <text className="cy-center" x="100" y="96">{center[0]}</text>
          <text className="cy-center" x="100" y="114">{center[1]}</text>
        </svg>
      </div>

      {/* ═══ PORTFOLIO (da qui la scena sfuma) ═══ */}
      <section className="section" id="portfolio" data-stage-fade aria-labelledby="portfolio-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">{home('leadershipPortfolio.eyebrow')}</p>
            <h2 id="portfolio-title">{home('leadershipPortfolio.title')}</h2>
            <p className="lead">{home('leadershipPortfolio.subtitle')}</p>
          </div>
          <ol className="grid-num">
            {portfolio.map((p, i) => (
              <li key={p.id} data-reveal>
                <Link href={p.href}>
                  <span className="ik">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="hx-link">{p.cta} <span className="arrow" aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ CHI SONO ═══ */}
      <section className="section" id="chi-sono" aria-labelledby="about-title" style={{ paddingTop: 0 }}>
        <div className="wrap split-2 about-split">
          <figure className="portrait" data-reveal style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/portrait-dark.jpg" alt={t('about.photoAlt')} loading="lazy" />
            <figcaption>{tags.map((x) => <span key={x}>{x}</span>)}</figcaption>
          </figure>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">{t('about.eyebrow')}</p>
            <h2 id="about-title" className="about-title">{t('about.title1')} <em>{t('about.title2')}</em></h2>
            <p className="lead">{t('about.body')}</p>
            <ul className="facts">
              {facts.map(([b, s]) => <li key={s}><b>{b}</b><span>{s}</span></li>)}
            </ul>
            <div className="hero-cta">
              <Link className="btn btn-ghost btn-lg" href="/about">{t('about.cta')} <span className="arrow" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HUMAN LONGEVITY PROGRAM: il collegamento al sito del programma ═══ */}
      <section className="section hlp-band" id="human-longevity-program" aria-labelledby="hlp-title">
        <div className="hx-glow" aria-hidden="true" />
        <div className="wrap narrow center">
          <p className="eyebrow">{t('hlp.eyebrow')}</p>
          <Scrub id="hlp-title" className="scrub-text" text={t('hlp.text')} />
          <a className="hlp-card" href={HLP_URL} target="_blank" rel="noopener" aria-label={t('hlp.cardLabel')} data-reveal>
            <HlpMark />
            <span><b>{t('hlpName')}</b><small>{t('hlp.cardSub')}</small></span>
            <span className="go" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* ═══ RIVISTE E IMPRESE ═══ */}
      <section className="section" id="imprese" aria-labelledby="partners-title" style={{ overflow: 'hidden' }}>
        <div className="wrap">
          <div className="section-head row" data-reveal>
            <div>
              <p className="eyebrow">{t('partners.eyebrow')}</p>
              <h2 id="partners-title">{t('partners.title')}</h2>
              <p className="partners-intro">{t('partners.body')}</p>
            </div>
            <Link className="btn btn-ghost" href="/consultancy">{t('partners.cta')} <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="logo-block" data-reveal>
          <p className="wrap logo-label">{t('partners.journals')}</p>
          <div className="logo-rows">{logoRow(JOURNALS)}</div>
        </div>
        <div className="logo-block" data-reveal>
          <p className="wrap logo-label">{t('partners.companies')}</p>
          <div className="logo-rows">{logoRow(COMPANIES, true)}</div>
        </div>
      </section>

      {/* ═══ SPEAKING ═══ */}
      <section className="section" id="speaking" aria-labelledby="speaking-title">
        <div className="wrap">
          <div className="section-head row" data-reveal>
            <div>
              <p className="eyebrow">{t('speaking.eyebrow')}</p>
              <h2 id="speaking-title">{t('speaking.title')}</h2>
            </div>
            <Link className="btn btn-ghost" href="/speaking">{t('speaking.cta')} <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
          <div className="split-2" style={{ alignItems: 'start' }}>
            <div data-reveal>
              <p className="media-cat">{t('speaking.tv')}</p>
              <ul className="media-list">
                {MEDIA.tv.map((m) => (
                  <li key={m.show}><span className="media-badge" style={{ background: m.color }}>{m.logo}</span><b>{m.show}</b><small>{m.years}</small></li>
                ))}
              </ul>
              <p className="media-cat">{t('speaking.conf')}</p>
              <ul className="media-list">
                {MEDIA.conf.map((m) => (
                  <li key={m.show}><span className="media-badge" style={{ background: m.color }}>{m.logo}</span><b>{m.show}</b><small>{m.years}</small></li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="media-cat">{t('speaking.video')}</p>
              <TalkVideo watch={t('speaking.watch')} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="section" aria-label="Newsletter" style={{ paddingTop: 0 }}>
        <div className="wrap"><Newsletter /></div>
      </section>

      {/* ═══ CHIUSURA ═══ */}
      <section className="section final" aria-labelledby="final-title">
        <div className="final-glow" aria-hidden="true" />
        <div className="wrap center" data-reveal>
          <Mark size="xl" />
          <h2 id="final-title">{t('final.title1')}<br /><em>{t('final.title2')}</em></h2>
          <p className="lead">{t('final.lead')}</p>
          <div className="hero-cta center">
            <Link className="btn btn-primary btn-lg" href="/contact">{t('final.cta')} <span className="arrow" aria-hidden="true">→</span></Link>
            <a className="btn btn-ghost btn-lg" href={HLP_URL} target="_blank" rel="noopener">{t('hlpName')} <span className="arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
