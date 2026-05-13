interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className="text-step--1 font-mono uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-accent)' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display text-step-4 font-light leading-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-step-0 leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
