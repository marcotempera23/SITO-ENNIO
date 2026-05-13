interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  id,
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
        <p className="text-step--1 font-mono uppercase tracking-widest mb-3 text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="font-display text-step-4 font-light leading-tight text-[var(--color-text)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-step-0 leading-relaxed text-[var(--color-text-muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
