import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t mt-24"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Identity */}
          <div>
            <p className="font-display text-step-1 font-light" style={{ color: 'var(--color-text)' }}>
              Ennio Tasciotti
            </p>
            <p className="mt-2 text-step--1" style={{ color: 'var(--color-text-muted)' }}>
              {t('vat')}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="text-step--1 hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-step--1 hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t('cookies')}
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-step--1 hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Press kit
                </Link>
              </li>
            </ul>
          </nav>

          {/* Scholarly / social */}
          <div>
            <p className="text-step--1 font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>
              Scholarly profiles
            </p>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href="https://scholar.google.com/citations?user=A8sSvg0AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-step--1 hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t('scholar')}
                </a>
              </li>
              <li>
                <a
                  href="https://orcid.org/0000-0003-1187-3205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-step--1 hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t('orcid')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.scopus.com/authid/detail.uri?authorId=23971656200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-step--1 hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Scopus
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-step--1" style={{ color: 'var(--color-text-muted)' }}>
            {t('rights', { year })}
          </p>
          <a
            href="https://www.youtube.com/watch?v=Ipb1Xrq8WVQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-step--1 italic hover:text-[var(--color-accent)] transition-colors"
            style={{ color: 'var(--color-quote)' }}
          >
            &ldquo;Per vincere il cancro bisogna pensare come una cellula.&rdquo;
          </a>
        </div>
      </div>
    </footer>
  );
}
