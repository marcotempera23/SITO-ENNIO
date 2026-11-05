import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mark } from '@/components/hlp/experience';
import { HlpMark } from '@/components/hlp/hlp-mark';
import { HLP_URL } from '@/lib/links';

export function Footer() {
  const t = useTranslations('footer');
  const n = useTranslations('nav');
  const h = useTranslations('hx');
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link className="brand" href="/" aria-label={h('home')}>
            <Mark />
            <span>Ennio <em>Tasciotti</em> <small>PhD</small></span>
          </Link>
          <p className="muted" style={{ maxWidth: 380, margin: 0 }}>{h('footer.desc')}</p>
          <a className="footer-hlp" href={HLP_URL} target="_blank" rel="noopener" aria-label={h('hlp.cardLabel')}>
            <HlpMark />
            <span><b>{h('hlpName')} ↗</b><small>{h('hlpSub')}</small></span>
          </a>
        </div>
        <nav aria-label={h('footer.site')}>
          <p className="footer-h">{h('footer.site')}</p>
          <Link href="/about">{n('about')}</Link>
          <Link href="/science">{n('science')}</Link>
          <Link href="/ventures">{n('ventures')}</Link>
          <Link href="/longevity">{n('longevity')}</Link>
          <Link href="/speaking">{n('speaking')}</Link>
          <Link href="/consultancy">{n('consultancy')}</Link>
        </nav>
        <nav aria-label={h('footer.resources')}>
          <p className="footer-h">{h('footer.resources')}</p>
          <Link href="/contact">{n('contact')}</Link>
          <Link href="/press">{n('press')}</Link>
          <Link href="/privacy">{t('privacy')}</Link>
          <Link href="/cookies">{t('cookies')}</Link>
        </nav>
        <nav aria-label={h('footer.profiles')}>
          <p className="footer-h">{h('footer.profiles')}</p>
          <a href="https://scholar.google.com/citations?user=A8sSvg0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">{t('scholar')} ↗</a>
          <a href="https://orcid.org/0000-0003-1187-3205" target="_blank" rel="noopener noreferrer">{t('orcid')} ↗</a>
          <a href="https://www.scopus.com/authid/detail.uri?authorId=23971656200" target="_blank" rel="noopener noreferrer">Scopus ↗</a>
        </nav>
      </div>
      <div className="wrap footer-note">
        <p>{t('rights', { year })} · {t('vat')}</p>
        <p><a href="https://www.youtube.com/watch?v=Ipb1Xrq8WVQ" target="_blank" rel="noopener noreferrer">{h('footer.quote')}</a></p>
      </div>
    </footer>
  );
}
