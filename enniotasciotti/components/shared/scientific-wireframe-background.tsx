'use client';

import { usePathname } from 'next/navigation';

type BackgroundVariant = 'home' | 'science' | 'longevity' | 'ventures' | 'default';

interface MotifProps {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  className?: string;
}

function getVariant(pathname: string): BackgroundVariant {
  const segments = pathname.split('/').filter(Boolean);
  const contentPath = ['en', 'it'].includes(segments[0]) ? `/${segments.slice(1).join('/')}` : pathname;

  if (contentPath.includes('/science')) return 'science';
  if (contentPath.includes('/longevity')) return 'longevity';
  if (contentPath.includes('/ventures') || contentPath.includes('/consultancy')) return 'ventures';
  if (contentPath === '/' || contentPath === '') return 'home';
  return 'default';
}

function transform({ x, y, scale = 1, rotate = 0 }: MotifProps) {
  return `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`;
}

function MolecularLattice(props: MotifProps) {
  return (
    <g className={props.className} transform={transform(props)} opacity={props.opacity ?? 0.58}>
      <g stroke="var(--color-accent)" strokeWidth="1.05">
        <path d="M44 60 92 32l48 28v56l-48 28-48-28z" />
        <path d="M140 60 188 32l48 28v56l-48 28-48-28z" strokeOpacity="0.78" />
        <path d="M92 144v56l48 28 48-28v-56" strokeOpacity="0.62" />
        <path d="M44 116 0 142v56l44 26" strokeOpacity="0.42" />
        <path d="M236 60 280 34l48 28v56l-48 28-44-26" strokeOpacity="0.42" />
        <path d="M92 32v-54M188 32v-54M280 34l34-44" strokeOpacity="0.36" />
        <path d="M140 228v54M44 224l-34 44M236 120l52 30" strokeOpacity="0.36" />
      </g>
      <g fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.05">
        <circle cx="44" cy="60" r="4.5" />
        <circle cx="92" cy="32" r="4.5" />
        <circle cx="140" cy="60" r="4.5" />
        <circle cx="188" cy="32" r="4.5" />
        <circle cx="236" cy="60" r="4.5" />
        <circle cx="280" cy="34" r="4.5" />
        <circle cx="328" cy="62" r="4.5" />
        <circle cx="188" cy="200" r="4.5" />
        <circle cx="140" cy="228" r="4.5" />
        <circle cx="92" cy="200" r="4.5" />
      </g>
      <g stroke="var(--color-accent-2)" strokeWidth="1" strokeOpacity="0.42">
        <path d="M68 74h48M164 74h48M116 158l48 28" />
        <path d="M164 102h48M68 102h48" />
      </g>
    </g>
  );
}

function BiomimeticVesicle(props: MotifProps) {
  return (
    <g className={props.className} transform={transform(props)} opacity={props.opacity ?? 0.5}>
      <g stroke="var(--color-accent)" strokeWidth="1.05">
        <circle cx="150" cy="150" r="104" />
        <circle cx="150" cy="150" r="86" strokeOpacity="0.48" />
        <circle cx="150" cy="150" r="48" strokeOpacity="0.22" />
      </g>
      <g stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.42">
        <path d="M150 46v24M150 230v24M46 150h24M230 150h24" />
        <path d="M76 76 92 92M224 76l-16 16M76 224l16-16M224 224l-16-16" />
        <path d="M112 54l8 22M188 54l-8 22M112 246l8-22M188 246l-8-22" />
        <path d="M54 112l22 8M246 112l-22 8M54 188l22-8M246 188l-22-8" />
      </g>
      <g fill="var(--color-bg)" stroke="var(--color-accent-2)" strokeWidth="1" opacity="0.82">
        <circle cx="150" cy="46" r="5" />
        <circle cx="224" cy="76" r="5" />
        <circle cx="254" cy="150" r="5" />
        <circle cx="224" cy="224" r="5" />
        <circle cx="150" cy="254" r="5" />
        <circle cx="76" cy="224" r="5" />
        <circle cx="46" cy="150" r="5" />
        <circle cx="76" cy="76" r="5" />
      </g>
      <g stroke="var(--color-accent-2)" strokeWidth="1.05" strokeOpacity="0.48">
        <path d="M98 134c28-22 76-22 104 0" />
        <path d="M96 166c30 24 78 24 108 0" />
      </g>
    </g>
  );
}

function CollagenFiber(props: MotifProps) {
  return (
    <g className={props.className} transform={transform(props)} opacity={props.opacity ?? 0.46}>
      <g stroke="var(--color-accent-2)" strokeWidth="1.05">
        <path d="M0 78c52-58 112-58 180 0s128 58 190 0" />
        <path d="M0 136c52-58 112-58 180 0s128 58 190 0" strokeOpacity="0.72" />
        <path d="M0 194c52-58 112-58 180 0s128 58 190 0" strokeOpacity="0.52" />
      </g>
      <g stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.34">
        <path d="M56 42c12 62 14 126 6 192" />
        <path d="M148 36c-12 68-12 134 0 200" />
        <path d="M242 42c12 62 14 126 6 192" />
        <path d="M328 36c-12 68-12 134 0 200" />
      </g>
      <g fill="var(--color-bg)" stroke="var(--color-accent-2)" strokeWidth="1">
        <circle cx="56" cy="78" r="5" />
        <circle cx="148" cy="136" r="5" />
        <circle cx="242" cy="78" r="5" />
        <circle cx="328" cy="194" r="5" />
      </g>
    </g>
  );
}

function PorousNanocarrier(props: MotifProps) {
  return (
    <g className={props.className} transform={transform(props)} opacity={props.opacity ?? 0.52}>
      <g stroke="var(--color-accent-2)" strokeWidth="1.05">
        <ellipse cx="138" cy="138" rx="112" ry="64" />
        <ellipse cx="138" cy="138" rx="78" ry="44" strokeOpacity="0.55" />
        <path d="M38 110h200M38 166h200" strokeOpacity="0.3" />
        <path d="M74 94v88M112 86v104M150 86v104M188 94v88" strokeOpacity="0.28" />
      </g>
      <g fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.86">
        <circle cx="76" cy="124" r="5" />
        <circle cx="112" cy="152" r="5" />
        <circle cx="150" cy="124" r="5" />
        <circle cx="188" cy="152" r="5" />
        <circle cx="132" cy="138" r="5" />
      </g>
      <g stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.34">
        <path d="M244 138h84M328 138l-18-14M328 138l-18 14" />
        <path d="M350 82v112M370 82v112M390 82v112" />
      </g>
    </g>
  );
}

function BiomarkerConstellation(props: MotifProps) {
  return (
    <g className={props.className} transform={transform(props)} opacity={props.opacity ?? 0.42}>
      <g stroke="var(--color-accent)" strokeWidth="1.05">
        <path d="M48 204c62-122 142-170 240-128 70 30 116 82 150 154" />
        <path d="M48 204c92-46 204-46 390 0" stroke="var(--color-accent-2)" strokeOpacity="0.52" />
        <path d="M98 158h304M130 118h224M190 78h108" strokeOpacity="0.24" />
      </g>
      <g fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1">
        <circle cx="98" cy="158" r="5" />
        <circle cx="190" cy="78" r="5" />
        <circle cx="298" cy="78" r="5" />
        <circle cx="402" cy="158" r="5" />
      </g>
      <g stroke="var(--color-accent-2)" strokeWidth="1" strokeOpacity="0.4">
        <circle cx="516" cy="138" r="74" />
        <path d="M516 138h-54M516 138l38-38M516 138V78" />
      </g>
    </g>
  );
}

function BackgroundMotifs({ variant }: { variant: BackgroundVariant }) {
  if (variant === 'science') {
    return (
      <>
        <PorousNanocarrier x={756} y={128} scale={1.12} opacity={0.56} className="hidden md:block" />
        <BiomimeticVesicle x={-118} y={338} scale={1.06} rotate={-8} opacity={0.46} />
        <MolecularLattice x={802} y={774} scale={1.02} rotate={-4} opacity={0.42} className="hidden lg:block" />
      </>
    );
  }

  if (variant === 'longevity') {
    return (
      <>
        <BiomarkerConstellation x={640} y={138} scale={1.16} opacity={0.48} className="hidden md:block" />
        <MolecularLattice x={-104} y={666} scale={0.96} rotate={-10} opacity={0.34} />
        <CollagenFiber x={802} y={824} scale={0.98} opacity={0.32} className="hidden lg:block" />
      </>
    );
  }

  if (variant === 'ventures') {
    return (
      <>
        <PorousNanocarrier x={682} y={126} scale={1.05} opacity={0.46} className="hidden md:block" />
        <MolecularLattice x={-116} y={662} scale={0.98} rotate={-8} opacity={0.38} />
        <BiomarkerConstellation x={786} y={814} scale={0.88} opacity={0.32} className="hidden lg:block" />
      </>
    );
  }

  if (variant === 'home') {
    return (
      <>
        <BiomimeticVesicle x={-76} y={332} scale={0.95} rotate={-8} opacity={0.44} className="hidden md:block" />
        <MolecularLattice x={760} y={118} scale={1.0} rotate={-4} opacity={0.38} className="hidden lg:block" />
        <CollagenFiber x={70} y={724} scale={0.96} opacity={0.34} className="hidden lg:block" />
        <BiomarkerConstellation x={846} y={822} scale={0.82} opacity={0.3} className="hidden lg:block" />
      </>
    );
  }

  return (
    <>
      <MolecularLattice x={-102} y={312} scale={0.98} rotate={-8} opacity={0.38} />
      <BiomarkerConstellation x={840} y={772} scale={0.88} opacity={0.3} className="hidden md:block" />
    </>
  );
}

export function ScientificWireframeBackground() {
  const pathname = usePathname();
  const variant = getVariant(pathname);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.34] dark:opacity-[0.22]"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 1200"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
          <BackgroundMotifs variant={variant} />
        </g>
      </svg>
    </div>
  );
}