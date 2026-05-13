import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Identity */}
          <div>
            <p className="font-display text-step-1 font-light text-[var(--color-text)]">
              Ennio Tasciotti
            </p>
            <p className="mt-2 text-step--1 text-[var(--color-text-muted)]">
              {t('vat')}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="text-step--1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-step--1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {t('cookies')}
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-step--1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Press kit
                </Link>
              </li>
            </ul>
          </nav>

          {/* Scholarly / social */}
          <div>
            <p className="text-step--1 font-mono uppercase tracking-widest mb-3 text-[var(--color-text-muted)]">
              Scholarly profiles
            </p>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href="https://scholar.google.com/citations?user=A8sSvg0AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-step--1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {t('scholar')}
                </a>
              </li>
              <li>
                <a
                  href="https://orcid.org/0000-0003-1187-3205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-step--1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {t('orcid')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.scopus.com/authid/detail.uri?authorId=23971656200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-step--1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Scopus
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-step--1 text-[var(--color-text-muted)]">
            {t('rights', { year })}
          </p>
          <a
            href="https://www.youtube.com/watch?v=Ipb1Xrq8WVQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-step--1 italic text-[var(--color-quote)] hover:text-[var(--color-accent)] transition-colors"
          >
            &ldquo;Per vincere il cancro bisogna pensare come una cellula.&rdquo;
          </a>
        </div>
      </div>
    </footer>
  );
}
