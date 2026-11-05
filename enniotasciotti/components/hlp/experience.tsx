'use client';

/*
 * Esperienza comune a tutte le pagine, ripresa dal sito dello Human Longevity Program:
 * schermata d'ingresso, barra di lettura, scena 3D di particelle che cambia forma
 * per sezione e animazioni GSAP + ScrollTrigger.
 *
 * Le pagine dichiarano cosa animare con attributi:
 *   data-scene="nome"   la scena prende quella forma quando l'elemento è al centro
 *   data-stage-fade     da qui in poi la scena sfuma (sezioni a fondo pieno)
 *   data-reveal         entra dal basso una volta sola
 *   data-scrub          testo le cui parole (.w) si accendono scorrendo
 *   data-count="N"      numero che conta fino a N
 *   .hx-word / .hero-in titolo e testi dell'apertura
 *   .hx-step            passi del racconto (attivano i nodi .cy-node)
 *
 * Con ?test nell'URL GSAP non rallenta a pochi fotogrammi (screenshot automatici).
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type SceneDef = {
  shape: number;
  colors: [string, string];
  dist: number;
  ty: number;
  sx: number;
  halo: number;
  spin: number;
};

type World = {
  state: Record<string, number>;
  colors: Record<'a' | 'b', { r: number; g: number; b: number }>;
  setVisible: (v: boolean) => void;
  Color: new (hex: string) => { r: number; g: number; b: number };
};

const narrow = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 880px)').matches;

// forme: 0 nanoparticella, 1 gemello digitale, 2 Multistage Vector, 3 scaffold di fibre, 4 globo
const SIDE = () => (narrow() ? { ty: 0, sx: 0 } : { ty: 0, sx: 0.2 });
const SCENES: Record<string, () => SceneDef> = {
  hero: () => ({ shape: 0, colors: ['#e9c98f', '#8fd8ff'], dist: narrow() ? 1.25 : 1.1, ty: narrow() ? -0.5 : 0, sx: narrow() ? 0 : 0.2, halo: 1, spin: 0.7 }),
  quote: () => ({ shape: 0, colors: ['#8fd8ff', '#e9dfc9'], dist: narrow() ? 0.62 : 0.52, ty: 0, sx: 0, halo: 0, spin: 0.4 }),
  globe: () => ({ shape: 4, colors: ['#8fd8ff', '#e9c98f'], dist: narrow() ? 1.2 : 1.0, ty: narrow() ? -0.5 : 0.05, sx: 0, halo: 0, spin: 0.15 }),
  msv: () => ({ shape: 2, colors: ['#c4ecff', '#f2a28f'], dist: narrow() ? 1.05 : 0.95, ...SIDE(), halo: 0, spin: 0.55 }),
  scaffold: () => ({ shape: 3, colors: ['#e9dfc9', '#7ce0bf'], dist: narrow() ? 1.05 : 0.98, ...SIDE(), halo: 0, spin: 0.6 }),
  immune: () => ({ shape: 0, colors: ['#f2a28f', '#e9c98f'], dist: narrow() ? 1.05 : 1.0, ...SIDE(), halo: 0, spin: 1.3 }),
  twin: () => ({ shape: 1, colors: ['#8fd8ff', '#e9c98f'], dist: narrow() ? 1.05 : 1.02, ...SIDE(), halo: 0, spin: 0.9 }),
  // pagine interne: la nanoparticella resta sullo sfondo, a lato del titolo
  page: () => ({ shape: 0, colors: ['#8fd8ff', '#e9c98f'], dist: narrow() ? 1.35 : 1.15, ty: narrow() ? -0.55 : 0, sx: narrow() ? 0 : 0.24, halo: 1, spin: 0.6 }),
};

// stato condiviso tra i cambi di pagina (la scena si crea una volta sola)
let world: World | null = null;
let booting: Promise<void> | null = null;
let current = 'hero';
let shapeNow = 0;
let introDone = false;
let sceneCanvas: HTMLCanvasElement | null = null;   // la tela della scena sopravvive ai cambi di lingua
let booted = false;

function go(name: string, duration = 1.8) {
  current = name;
  if (!world || !SCENES[name]) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { shape, colors, ...num } = SCENES[name]();
  const d = reduced ? 0 : duration;
  const s = world.state;
  const w = { w1: +(shape === 1), w2: +(shape === 2), w3: +(shape === 3), w4: +(shape === 4) };
  gsap.to(s, { ...w, ...num, duration: d, ease: 'power3.inOut', overwrite: 'auto' });
  if (shape !== shapeNow && !reduced) {
    // la materia si scioglie in un vortice e si ricompone
    gsap.timeline()
      .to(s, { chaos: 1, duration: d * 0.45, ease: 'power2.out' })
      .to(s, { chaos: 0, duration: d * 0.75, ease: 'power2.inOut' });
  }
  shapeNow = shape;
  const pairs: [keyof World['colors'], string][] = [['a', colors[0]], ['b', colors[1]]];
  for (const [k, hex] of pairs) {
    const c = new world.Color(hex);
    gsap.to(world.colors[k], { r: c.r, g: c.g, b: c.b, duration: d, ease: 'power2.inOut' });
  }
}

const isHome = (path: string) => /^\/(it|en)?\/?$/.test(path);

export function Experience({ label }: { label: string }) {
  const pathname = usePathname();
  const loaderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── avvio: scena e schermata d'ingresso ────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (new URLSearchParams(location.search).has('test')) gsap.ticker.lagSmoothing(0);
    if (booting) {
      // il layout è stato rimontato (cambio di lingua): si riusa la scena già pronta
      const fresh = canvasRef.current;
      if (sceneCanvas && fresh && fresh !== sceneCanvas) fresh.replaceWith(sceneCanvas);
      if (!world && stageRef.current && booted) stageRef.current.style.display = 'none';
      booting.then(() => loaderRef.current?.classList.add('done'));
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    document.body.classList.add('loading');
    booting = (async () => {
      try {
        const [{ createScene }, THREE] = await Promise.all([import('./scene'), import('three')]);
        const scene = createScene({
          canvas: canvasRef.current, mobile: narrow(), reduced,
          onProgress: (p: number) => { if (fillRef.current) fillRef.current.style.width = `${Math.round(p * 100)}%`; },
        });
        world = { ...scene, Color: THREE.Color };
        sceneCanvas = canvasRef.current;
        await scene.loaded;
        if (fillRef.current) fillRef.current.style.width = '100%';
      } catch (err) {
        // senza WebGL il sito resta pienamente leggibile
        console.warn('Scena 3D non disponibile:', err);
        world = null;
        if (stageRef.current) stageRef.current.style.display = 'none';
      }
      const wait = Math.max(0, 1100 - (performance.now() - started));
      await new Promise((r) => setTimeout(r, wait));
      booted = true;
      loaderRef.current?.classList.add('done');
      document.body.classList.remove('loading');
    })();
  }, []);

  // ── per ogni pagina: inquadratura, apertura e animazioni di scorrimento ─
  useEffect(() => {
    let alive = true;
    const ctx = gsap.context(() => {});
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $$ = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
    const home = isHome(pathname);
    const stage = stageRef.current;
    if (stage) stage.style.opacity = '1';
    world?.setVisible(true);

    (booting ?? Promise.resolve()).then(() => {
      if (!alive) return;
      const first = home ? 'hero' : 'page';
      // la scena NON sta nel contesto GSAP: al cambio pagina ctx.revert() la riporterebbe allo stato iniziale
      if (world && !introDone) {
        const sc = SCENES[first]();
        Object.assign(world.state, { ty: sc.ty, sx: sc.sx });
      }
      go(first, introDone ? 1.4 : 0.01);
      if (world && !introDone) {
        if (reduced) Object.assign(world.state, { assemble: 1, dist: SCENES[first]().dist, halo: 1 });
        else {
          gsap.to(world.state, { assemble: 1, duration: 3.6, ease: 'power2.out' });
          gsap.fromTo(world.state, { dist: 1.5 }, { dist: SCENES[first]().dist, duration: 4.6, ease: 'power3.out' });
        }
      }
      const firstVisit = !introDone;
      introDone = true;

      ctx.add(() => {
        // apertura
        if (reduced) {
          gsap.set('.hud-chip', { opacity: 1 });
        } else {
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          if ($$('.hx-word').length) tl.from('.hx-word', { yPercent: 115, opacity: 0, duration: 1.3, stagger: 0.09, ease: 'power4.out' }, firstVisit ? 0.4 : 0.1);
          if ($$('.hero-in').length) tl.from('.hero-in', { y: 26, opacity: 0, duration: 1.1, stagger: 0.12 }, firstVisit ? 1.0 : 0.4);
          if (firstVisit) tl.from('.nav', { y: -30, opacity: 0, duration: 1 }, 1.2);
          if ($$('.hero-photo').length) {
            tl.fromTo('.hero-photo .et-arch', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' }, firstVisit ? 0.5 : 0.1)
              .from('.hero-photo .et-arch img', { scale: 1.35, duration: 2.2, ease: 'power3.out' }, firstVisit ? 0.5 : 0.1)
              .from('.hero-photo .et-orbit', { opacity: 0, scale: 0.7, duration: 1.4 }, firstVisit ? 1.4 : 0.6)
              .from('.hero-photo .et-badge', { y: 30, opacity: 0, duration: 1 }, firstVisit ? 1.8 : 0.8);
          }
          if ($$('.hud-chip').length) tl.to('.hud-chip', { opacity: 1, duration: 0.9, stagger: 0.3 }, firstVisit ? 3.0 : 1.2);
        }

        // l'apertura sfuma salendo
        const hero = document.querySelector('.hx-hero');
        if (hero && !reduced) {
          gsap.to('.hx-hero .hero-photo', { y: -140, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
          gsap.to(['.hx-hero .hero-copy', '.hx-hero .hud', '.hx-hero .scroll-cue'], {
            opacity: 0, y: -80, ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 35%', scrub: true },
          });
        }
        if (hero) ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom center', onEnterBack: () => go(first) });

        // percorso: le tappe scorrono in orizzontale mentre il globo gira
        const journey = document.querySelector<HTMLElement>('.hx-journey');
        const track = journey?.querySelector<HTMLElement>('.journey-track');
        if (journey && track) {
          const stops = Array.from(track.querySelectorAll<HTMLElement>('.stop'));
          const dots = Array.from(journey.querySelectorAll<HTMLElement>('.journey-dots i'));
          const bar = journey.querySelector<HTMLElement>('.journey-bar i');
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const rot0 = world?.state.rot ?? 0;
          gsap.to(track, {
            x: () => -distance(), ease: 'none',
            scrollTrigger: {
              trigger: journey, start: 'top top', end: () => `+=${distance() + window.innerHeight * 0.4}`,
              pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
              onEnter: () => go('globe'), onEnterBack: () => go('globe'),
              onUpdate: (self) => {
                if (world && !reduced) world.state.rot = rot0 - self.progress * Math.PI * 1.1;
                const k = Math.min(stops.length - 1, Math.round(self.progress * (stops.length - 1)));
                stops.forEach((st, i) => st.classList.toggle('on', i === k));
                dots.forEach((d, i) => d.classList.toggle('on', i <= k));
                if (bar) bar.style.transform = `scaleX(${self.progress})`;
              },
            },
          });
        }

        // forme per sezione
        for (const el of $$('[data-scene]')) {
          const name = el.dataset.scene!;
          ScrollTrigger.create({
            trigger: el, start: 'top center', end: 'bottom center',
            onEnter: () => go(name), onEnterBack: () => go(name),
          });
        }

        // parole che si accendono
        for (const el of $$('[data-scrub]')) {
          const words = Array.from(el.querySelectorAll('.w'));
          if (reduced) { gsap.set(words, { opacity: 1 }); continue; }
          gsap.to(words, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 62%', scrub: 0.6 } });
        }

        // parole che emergono dalla sfocatura
        for (const el of $$('[data-blur]')) {
          const words = Array.from(el.querySelectorAll('.w'));
          if (reduced) { gsap.set(words, { opacity: 1, filter: 'none' }); continue; }
          gsap.fromTo(words, { opacity: 0.08, filter: 'blur(14px)', yPercent: 30 }, {
            opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: 0.8 },
          });
        }

        // aree di ricerca: schede che si impilano, la precedente arretra
        const cards = $$('.stack-card');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next || reduced || narrow()) return;
          gsap.to(card, {
            scale: 0.9, opacity: 0.35, filter: 'blur(2px)', ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 20%', scrub: true },
          });
        });

        // passi del racconto e nodi del ciclo
        const nodes = $$('.cy-node');
        const arc = document.getElementById('cy-arc');
        $$('.hx-step').forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step, start: 'top center', end: 'bottom center',
            onToggle: (self) => {
              step.classList.toggle('active', self.isActive);
              if (!self.isActive) return;
              if (step.dataset.step) go(step.dataset.step);
              nodes.forEach((n, k) => { n.classList.toggle('on', k === i); n.classList.toggle('done', k < i); });
            },
          });
          if (!reduced) {
            gsap.from(step.children, { y: 44, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 70%', toggleActions: 'play none none reverse' } });
          }
        });
        const steps = document.querySelector('.hx-steps');
        if (steps) {
          ScrollTrigger.create({
            trigger: steps, start: 'top center', end: 'bottom center',
            onUpdate: (self) => { if (arc) arc.style.strokeDasharray = `${Math.min(0.999, self.progress)} 1`; },
            toggleClass: { targets: document.body, className: 'in-story' },
          });
        }

        // la scena sfuma quando arrivano le sezioni a fondo pieno
        const fade = document.querySelector('[data-stage-fade]');
        if (stage) {
          ScrollTrigger.create({
            trigger: fade ?? 'main', start: fade ? 'top bottom' : '60vh top', end: fade ? 'top 20%' : '130vh top', scrub: true,
            onUpdate: (self) => {
              const o = 1 - self.progress * (fade ? 1 : 0.75);
              stage.style.opacity = String(o);
              world?.setVisible(o > 0.001);
            },
          });
        }

        if (!reduced) {
          for (const el of $$('[data-reveal]')) {
            gsap.from(el, { y: 48, opacity: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
          }
          for (const el of $$('.hx-glow')) {
            gsap.fromTo(el, { scale: 0.6, opacity: 0.4 }, { scale: 1.2, opacity: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
          }
        }

        // numeri che contano
        for (const el of $$('[data-count]')) {
          const end = Number(el.dataset.count);
          const fmt = (v: number) => (el.dataset.prefix ?? '') + Math.round(v).toLocaleString(el.dataset.locale || 'it-IT') + (el.dataset.suffix ?? '');
          if (reduced) { el.textContent = fmt(end); continue; }
          const obj = { v: 0 };
          gsap.to(obj, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(obj.v); }, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
        }

        gsap.to('#progress-fill', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
        ScrollTrigger.refresh();
      });
    });

    return () => {
      alive = false;
      ctx.revert();
      document.body.classList.remove('in-story');
    };
  }, [pathname]);

  // ── luce che segue il puntatore sulle schede ───────────────────────────
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest?.<HTMLElement>('.hx-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    const onResize = () => go(current, 0.6);
    const mq = window.matchMedia('(max-width: 880px)');
    mq.addEventListener('change', onResize);
    return () => { document.removeEventListener('pointermove', onMove); mq.removeEventListener('change', onResize); };
  }, []);

  return (
    <>
      <div className="loader" ref={loaderRef} aria-hidden="true">
        <div className="loader-inner">
          <Mark size="lg" />
          <p className="loader-text">{label}</p>
          <div className="loader-bar"><span ref={fillRef} /></div>
        </div>
      </div>
      <div className="progress" aria-hidden="true"><span id="progress-fill" /></div>
      <div className="stage" ref={stageRef} aria-hidden="true">
        <canvas ref={canvasRef} />
        <div className="stage-vignette" />
      </div>
    </>
  );
}

// Marchio del sito: un nucleo con la sua membrana e un'orbita (la nanoparticella)
export function Mark({ size }: { size?: 'lg' | 'xl' }) {
  return (
    <svg className={`emark${size ? ` emark-${size}` : ''}`} viewBox="0 0 48 48" aria-hidden="true">
      <circle className="emark-ring" cx="24" cy="24" r="15" />
      <ellipse className="emark-orbit" cx="24" cy="24" rx="22" ry="8" transform="rotate(-28 24 24)" />
      <circle className="emark-node" cx="43.4" cy="13.6" r="2.6" />
      <circle className="emark-core" cx="24" cy="24" r="6" />
    </svg>
  );
}
