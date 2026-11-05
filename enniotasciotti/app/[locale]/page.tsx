import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo';
import { HLP_URL } from '@/lib/links';
import { COMPANIES, JOURNALS, MEDIA } from '@/lib/logos';
import { Mark } from '@/components/hlp/experience';
import { HlpMark } from '@/components/hlp/hlp-mark';
import { Blur, Words } from '@/components/hlp/text';
import { Newsletter, TalkVideo } from '@/components/hlp/home-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, title: t('homeTitle'), description: t('homeDescription') });
}

type Card = { key: string; href: string; title: string; sub: string; body: string; points: string[] };
type Stop = { year: string; city: string; role: string; place: string; hlp?: boolean };
type Portfolio = { id: string; title: string; desc: string; cta: string; href: string };

const CARD_COLORS = ['#f2a28f', '#e9dfc9', '#e9c98f', '#8fd8ff'];

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hx' });
  const home = await getTranslations({ locale, namespace: 'home' });
  const meta = t.raw('hero.meta') as [string, string, string][];
  const top = t.raw('hero.top') as [string, string];
  const badge = t.raw('hero.badge') as [string, string];
  const stops = t.raw('journey.stops') as Stop[];
  const cards = t.raw('research.cards') as Card[];
  const facts = t.raw('about.facts') as [string, string][];
  const tags = t.raw('about.tags') as string[];
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
      {/* ═══ APERTURA: lui, la sua foto, la nanoparticella che gli orbita dietro ═══ */}
      <section className="hx-hero et-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-in">
            <span>
              <a className="eyebrow-link" href={HLP_URL} target="_blank" rel="noopener">Human Longevity Program ↗</a>
              <span className="eb-rest">{t('hero.eyebrowRest')}</span>
            </span>
          </p>
          <h1 className="et-name">
            <span className="et-prof hero-in">{t('hero.prof')}</span>
            <span className="line"><Words text={t('hero.name1')} /></span>
            <span className="line accent"><Words text={t('hero.name2')} /></span>
          </h1>
          <p className="et-tagline hero-in">{t('hero.tagline')}</p>
          <p className="lead hero-in">{home('heroSubtitle')}</p>
          <div className="hero-cta hero-in">
            <a className="btn btn-primary btn-lg" href="#percorso">{t('hero.ctaPrimary')} <span className="arrow" aria-hidden="true">→</span></a>
            <Link className="btn btn-ghost btn-lg" href="/contact">{t('hero.ctaSecondary')}</Link>
          </div>
          <ul className="hero-meta hero-in">
            {meta.map(([n, suffix, label]) => (
              <li key={label}>
                <b data-count={n} data-suffix={suffix} data-locale={numLocale}>{Number(n).toLocaleString(numLocale)}{suffix}</b>
                <span>{label}</span>
              </li>
            ))}
            <li><b>{top[0]}</b><span>{top[1]}</span></li>
          </ul>
        </div>
        <figure className="et-portrait hero-photo">
          <div className="et-arch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/portrait-dark.jpg" alt={t('hero.photoAlt')} fetchPriority="high" />
          </div>
          <span className="et-orbit" aria-hidden="true"><i /></span>
          <figcaption className="et-badge">
            <HlpMark />
            <span><small>{badge[0]}</small><b>{badge[1]}</b></span>
          </figcaption>
        </figure>
        <a className="scroll-cue" href="#pensiero" aria-label={t('hero.scrollLabel')}>
          <span className="scroll-mouse"><span /></span>
          {t('hero.scroll')}
        </a>
      </section>

      {/* ═══ IL PENSIERO: la camera entra nella cellula, le parole emergono dalla sfocatura ═══ */}
      <section className="et-quote" id="pensiero" data-scene="quote">
        <div className="wrap narrow center">
          <p className="eyebrow">{t('manifesto.eyebrow')}</p>
          <Blur as="blockquote" className="et-quote-text" text={home('tedxQuote')} />
          <span className="manifesto-cite">— {t('manifesto.cite')}</span>
        </div>
      </section>

      {/* ═══ IL PERCORSO: le tappe scorrono in orizzontale sopra il globo ═══ */}
      <section className="hx-journey" id="percorso" aria-labelledby="journey-title">
        <div className="journey-head wrap">
          <div>
            <p className="eyebrow">{t('journey.eyebrow')}</p>
            <h2 id="journey-title">{t('journey.title')}</h2>
          </div>
          <p className="journey-lead">{t('journey.lead')}</p>
        </div>
        <ol className="journey-track">
          {stops.map((s, i) => (
            <li key={`${s.year}-${s.city}`} className={`stop${s.hlp ? ' stop-hlp' : ''}`}>
              <span className="stop-year">{s.year}</span>
              <span className="stop-city"><i aria-hidden="true" />{s.city}</span>
              <p className="stop-role">{s.role}</p>
              <p className="stop-place">{s.place}</p>
              {s.hlp && <a className="hx-link" href={HLP_URL} target="_blank" rel="noopener">{t('hlpName')} <span className="arrow" aria-hidden="true">↗</span></a>}
              <span className="stop-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
        <div className="journey-foot wrap" aria-hidden="true">
          <span className="journey-dots">{stops.map((s) => <i key={`${s.year}-${s.city}`} />)}</span>
          <span className="journey-bar"><i /></span>
          <span className="journey-hint">{t('journey.hint')} →</span>
        </div>
      </section>

      {/* ═══ RICERCA: schede che si impilano, la materia cambia forma ═══ */}
      <section className="et-research" id="ricerca" aria-labelledby="research-title">
        <div className="wrap et-research-head">
          <p className="eyebrow">{t('research.eyebrow')}</p>
          <h2 id="research-title">{t('research.title')}</h2>
          <p className="lead">{t('research.lead')}</p>
        </div>
        <div className="wrap stack">
          {cards.map((c, i) => (
            <article key={c.key} className="stack-card hx-step hx-card" data-step={c.key} style={{ '--c': CARD_COLORS[i], '--i': i } as React.CSSProperties} aria-labelledby={`card-${c.key}`}>
              <p className="stack-k"><span>{String(i + 1).padStart(2, '0')}</span> / {String(cards.length).padStart(2, '0')}</p>
              <h3 id={`card-${c.key}`} className="stack-title">{c.title}</h3>
              <p className="stack-sub">{c.sub}</p>
              <p className="stack-body">{c.body}</p>
              {c.points.length > 0 && <ul className="step-points">{c.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              <Link className="hx-link" href={c.href}>{t('research.more')} <span className="arrow" aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PORTFOLIO: indice a righe (da qui la scena sfuma) ═══ */}
      <section className="section" id="portfolio" data-stage-fade aria-labelledby="portfolio-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">{home('leadershipPortfolio.eyebrow')}</p>
            <h2 id="portfolio-title">{home('leadershipPortfolio.title')}</h2>
            <p className="lead">{home('leadershipPortfolio.subtitle')}</p>
          </div>
          <ol className="idx">
            {portfolio.map((p, i) => (
              <li key={p.id} data-reveal>
                <Link href={p.href}>
                  <span className="idx-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="idx-t">{p.title}</span>
                  <span className="idx-go" aria-hidden="true">→</span>
                  <span className="idx-d"><span>{p.desc}<em>{p.cta} →</em></span></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ CHI SONO ═══ */}
      <section className="section" id="chi-sono" aria-labelledby="about-title" style={{ paddingTop: 0 }}>
        <div className="wrap split-2 about-split">
          <figure className="portrait et-office" data-reveal style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ennio-tasciotti-direttore-hlp.webp" alt={t('about.photoAlt')} loading="lazy" />
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
          <div className="hlp-orbit" aria-hidden="true"><HlpMark /></div>
          <p className="eyebrow">{t('hlp.eyebrow')}</p>
          <Blur id="hlp-title" className="et-hlp-text" text={t('hlp.text')} />
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
