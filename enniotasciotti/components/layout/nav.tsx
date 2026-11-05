'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Mark } from '@/components/hlp/experience';
import { HLP_URL } from '@/lib/links';

const NAV_LINKS = [
  { key: 'about', href: '/about' },
  { key: 'science', href: '/science' },
  { key: 'ventures', href: '/ventures' },
  { key: 'longevity', href: '/longevity' },
  { key: 'speaking', href: '/speaking' },
  { key: 'consultancy', href: '/consultancy' },
] as const;

export function Nav() {
  const t = useTranslations('nav');
  const h = useTranslations('hx');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const other = locale === 'it' ? 'en' : 'it';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // menu per telefono: la pagina sotto non scorre, Esc lo chiude
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (open && menuRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(menuRef.current.querySelectorAll('.mmenu-links a, .mmenu-foot'), { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: 'power3.out', delay: 0.1, overwrite: true });
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 981px)');
    const onChange = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const switchLang = () => router.replace(pathname, { locale: other });

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link className="brand" href="/" aria-label={h('home')}>
          <Mark />
          <span>Ennio <em>Tasciotti</em></span>
        </Link>
        <nav className="nav-links" aria-label={h('sections')}>
          {NAV_LINKS.map(({ key, href }) => (
            <Link key={key} href={href} aria-current={isCurrent(href) ? 'page' : undefined}>{t(key)}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" className="nav-lang" onClick={switchLang} aria-label={h('langLabel')} lang={other}>
            {other.toUpperCase()}
          </button>
          <Link className="btn btn-primary btn-sm nav-desk nav-contact" href="/contact">{t('contact')}</Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? h('menuClose') : h('menuOpen')}
            aria-expanded={open}
            aria-controls="mmenu"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      {/* Menu per telefono: sta fuori dalla barra perché la barra, con backdrop-filter,
          diventerebbe il contenitore degli elementi fissi e il menu resterebbe schiacciato */}
      <div className={`mmenu${open ? ' open' : ''}`} id="mmenu" ref={menuRef} aria-hidden={!open}>
        <nav className="mmenu-links" aria-label={h('sections')}>
          {NAV_LINKS.map(({ key, href }, i) => (
            <Link key={key} href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>{String(i + 1).padStart(2, '0')}</span>{t(key)}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <span>{String(NAV_LINKS.length + 1).padStart(2, '0')}</span>{t('contact')}
          </Link>
        </nav>
        <div className="mmenu-foot">
          <a className="btn btn-primary btn-lg" href={HLP_URL} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
            {h('hlpName')} <span className="arrow" aria-hidden="true">↗</span>
          </a>
          <p>Prof. Ennio Tasciotti · {h('hlpSub').split(' · ')[0]}</p>
        </div>
      </div>
    </>
  );
}
