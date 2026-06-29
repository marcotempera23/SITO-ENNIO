'use client';

import { useRef, useEffect, useCallback, type ReactNode } from 'react';

interface DragMarqueeProps {
  children: ReactNode;
  /** Duration of one full loop in seconds. Default: 45 */
  duration?: number;
  /** Extra CSS class for the outer wrapper */
  className?: string;
  /** Gap between items (Tailwind class or px value). Default: 'gap-6' */
  gap?: string;
}

/**
 * DragMarquee — infinite horizontal marquee with:
 *  - No pause-on-hover
 *  - Mouse drag (desktop) and touch swipe (mobile) to scroll manually
 *  - Auto-resumes from current position after release
 */
export function DragMarquee({ children, duration = 45, className = '', gap = 'gap-6' }: DragMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animNameRef = useRef(`dm-${Math.random().toString(36).slice(2, 7)}`);
  const drag = useRef({ active: false, startX: 0, startOffset: 0 });

  /** Read the current animated translateX in pixels via computed style */
  const readTranslateX = (el: HTMLElement): number => {
    const style = window.getComputedStyle(el);
    const m = new DOMMatrix(style.transform);
    return m.m41;
  };

  /** Restart animation from a given px offset */
  const resumeFrom = useCallback((offsetPx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const halfW = track.scrollWidth / 2;
    if (halfW === 0) return;

    // Normalize offset into [−halfW, 0]
    let norm = offsetPx % halfW;
    if (norm > 0) norm -= halfW;

    const progress = norm / -halfW;          // 0…1
    const delay = -(progress * duration);    // negative = start partway through

    const animName = animNameRef.current;
    track.style.animation = 'none';
    // Force reflow to flush the "none" before restarting
    void track.offsetWidth;
    track.style.transform = '';
    track.style.animation = `${animName} ${duration}s linear ${delay}s infinite`;
  }, [duration]);

  /* ── Drag: mouse ── */
  const onMouseDown = useCallback((e: MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const currentX = readTranslateX(track);
    drag.current = { active: true, startX: e.clientX, startOffset: currentX };
    // Freeze animation and switch to manual transform
    track.style.animation = 'none';
    track.style.transform = `translateX(${currentX}px)`;
    track.style.cursor = 'grabbing';
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!drag.current.active || !trackRef.current) return;
    const delta = e.clientX - drag.current.startX;
    const newX = drag.current.startOffset + delta;
    trackRef.current.style.transform = `translateX(${newX}px)`;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!drag.current.active || !trackRef.current) return;
    drag.current.active = false;
    const finalX = readTranslateX(trackRef.current);
    trackRef.current.style.cursor = 'grab';
    resumeFrom(finalX);
  }, [resumeFrom]);

  /* ── Drag: touch ── */
  const onTouchStart = useCallback((e: TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const currentX = readTranslateX(track);
    drag.current = { active: true, startX: e.touches[0].clientX, startOffset: currentX };
    track.style.animation = 'none';
    track.style.transform = `translateX(${currentX}px)`;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!drag.current.active || !trackRef.current) return;
    const delta = e.touches[0].clientX - drag.current.startX;
    const newX = drag.current.startOffset + delta;
    trackRef.current.style.transform = `translateX(${newX}px)`;
    // Prevent page scroll while swiping the marquee
    e.preventDefault();
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!drag.current.active || !trackRef.current) return;
    drag.current.active = false;
    const finalX = readTranslateX(trackRef.current);
    resumeFrom(finalX);
  }, [resumeFrom]);

  /* ── Initialise animation + attach listeners ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animName = animNameRef.current;

    // Inject keyframe into the document once
    const styleId = `style-${animName}`;
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        @keyframes ${animName} {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dm-track-${animName} { animation: none !important; }
        }
      `;
      document.head.appendChild(styleEl);
    }

    track.classList.add(`dm-track-${animName}`);
    track.style.animation = `${animName} ${duration}s linear infinite`;
    track.style.cursor = 'grab';

    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });
    track.addEventListener('touchend', onTouchEnd);

    return () => {
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, [duration, onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd]);

  return (
    <div className={`overflow-hidden select-none ${className}`}>
      <div
        ref={trackRef}
        className={`flex w-max ${gap} py-2`}
        style={{ willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
