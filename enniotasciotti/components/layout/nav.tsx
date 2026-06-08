'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeToggle } from './theme-toggle';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)]',
          'bg-[var(--color-surface)]/95 backdrop-blur-[16px]',
          'transition-shadow duration-500',
          scrolled ? 'shadow-sm' : 'shadow-none'
        )}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-step-1 font-light tracking-tight text-[var(--color-text)]"
            aria-label="Ennio Tasciotti — Home"
          >
            Ennio Tasciotti
          </Link>

          {/* Desktop nav */}
          <ul
            className="hidden lg:flex items-center gap-6"
            role="list"
          >
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-step--1 duration-300 transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop controls */}
          <div className="hidden lg:flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <Link
              href="/contact"
              className="ml-2 inline-flex h-9 items-center rounded-md px-4 text-step--1 font-medium transition-colors bg-[var(--color-accent)] text-white"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text)]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-controls="mobile-menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu — animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[100] flex flex-col bg-[var(--color-bg)]"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-display text-step-1 font-light text-[var(--color-text)]"
              >
                Ennio Tasciotti
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text)] transition-transform duration-300 hover:rotate-90"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-1" role="list">
                {NAV_LINKS.map(({ key, href }, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-step-3 font-display font-light leading-tight transition-colors duration-300 text-[var(--color-text)] min-h-[48px] hover:text-[var(--color-accent)] hover:translate-x-1"
                    >
                      {t(key)}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + NAV_LINKS.length * 0.06, ease: EASE }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-step-3 font-display font-light leading-tight text-[var(--color-accent)] min-h-[48px] transition-opacity duration-300 hover:opacity-70"
                  >
                    {t('contact')}
                  </Link>
                </motion.li>
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex items-center gap-4 px-8 py-6 border-t border-[var(--color-border)]"
            >
              <LocaleSwitcher />
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
