import { useTranslations } from 'next-intl';

export function CredentialsStrip() {
  const t = useTranslations('home.credentialsStrip');

  const items = [
    { label: t('publications'), value: '200+' },
    { label: t('citations'), value: '8,500+' },
    { label: t('patents'), value: '30+' },
    { label: t('hIndex'), value: 'h-index 47' },
    { label: t('ventures'), value: '5' },
  ];

  return (
    <div
      className="w-full border-y py-4"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <ul
        className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-y-3 gap-x-4"
        role="list"
        aria-label="Credentials at a glance"
      >
        {items.map(({ label, value }) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className="font-mono text-step-0 font-bold"
              style={{ color: 'var(--color-accent)' }}
            >
              {value}
            </span>
            <span
              className="text-step--1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
