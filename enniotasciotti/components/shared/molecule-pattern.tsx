type MoleculeVariant = 'lipid' | 'protein' | 'dna';

interface MoleculePatternProps {
  variant?: MoleculeVariant;
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
}

const patterns: Record<MoleculeVariant, React.ReactNode> = {
  lipid: (
    <>
      <defs>
        <pattern id="lipid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="8" r="5" fill="currentColor" fillOpacity="0.6" />
          <line x1="20" y1="13" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="20" y1="32" x2="12" y2="38" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="20" y1="32" x2="28" y2="38" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lipid)" />
    </>
  ),
  protein: (
    <>
      <defs>
        <pattern id="protein" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="3" fill="currentColor" fillOpacity="0.5" />
          <circle cx="30" cy="20" r="4" fill="currentColor" fillOpacity="0.4" />
          <circle cx="50" cy="10" r="3" fill="currentColor" fillOpacity="0.5" />
          <circle cx="20" cy="40" r="3.5" fill="currentColor" fillOpacity="0.45" />
          <circle cx="45" cy="45" r="3" fill="currentColor" fillOpacity="0.4" />
          <line x1="10" y1="10" x2="30" y2="20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="30" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="30" y1="20" x2="20" y2="40" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="20" y1="40" x2="45" y2="45" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#protein)" />
    </>
  ),
  dna: (
    <>
      <defs>
        <pattern id="dna" x="0" y="0" width="30" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 Q 20 20 10 40 Q 0 60 10 80"
            fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5"
          />
          <path
            d="M 20 0 Q 10 20 20 40 Q 30 60 20 80"
            fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5"
          />
          <line x1="10" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="10" y1="32" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="10" y1="48" x2="20" y2="48" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="10" y1="64" x2="20" y2="64" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dna)" />
    </>
  ),
};

export function MoleculePattern({
  variant = 'lipid',
  className = '',
  width = 200,
  height = 200,
  opacity = 0.15,
}: MoleculePatternProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className={className}
      style={{ color: 'var(--color-accent)', opacity }}
    >
      {patterns[variant]}
    </svg>
  );
}
