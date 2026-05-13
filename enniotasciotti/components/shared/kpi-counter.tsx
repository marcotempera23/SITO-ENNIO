'use client';

import { useEffect, useRef, useState } from 'react';

interface KpiCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export function KpiCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1200,
  label,
}: KpiCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(value);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-step-4 font-bold" style={{ color: 'var(--color-accent)' }}>
        {prefix}{count.toLocaleString('en')}{suffix}
      </p>
      <p className="text-step--1 mt-1" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </p>
    </div>
  );
}
