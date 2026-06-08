/**
 * Shared Framer Motion variants & easing curves.
 * Import from here — never redefine EASE or variants inline.
 */
import { type Variants } from 'framer-motion';

/** Premium cubic-bezier — smooth deceleration */
export const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/** Snappier spring-like curve for UI responses */
export const EASE_SNAP = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Fade + subtle rise — standard scroll-triggered entrance */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Fade only — for backgrounds and images */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.0, ease: 'easeOut' },
  },
};

/** Fade + slide from left — for list items */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Scale in — for cards and images */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

/** Stagger container — wraps fadeUp/slideLeft children */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Stagger container with more breathing room */
export const staggerContainerRelaxed: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};
