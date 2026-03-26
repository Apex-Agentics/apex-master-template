"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Shared animation variants — used across all upgraded components
// ---------------------------------------------------------------------------

/** Fade up from below — default entrance for sections and cards */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

/** Fade in without movement — for overlays and subtle reveals */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Scale up from slightly smaller — for buttons, badges */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

/** Stagger children — apply to a parent motion element */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Slower stagger for hero text elements */
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

// ---------------------------------------------------------------------------
// Default transition configs
// ---------------------------------------------------------------------------

export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

// ---------------------------------------------------------------------------
// Reusable wrapper — triggers animation when scrolled into view
// ---------------------------------------------------------------------------

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  /** HTML tag to render as */
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
  /** Override variants (default: fadeUp) */
  variants?: Variants;
  /** Viewport trigger amount (0–1, default 0.15) */
  viewportAmount?: number;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * FadeInView — scroll-triggered entrance wrapper.
 * Plays the animation once when the element enters the viewport.
 */
export function FadeInView({
  children,
  className,
  as = "div",
  variants = fadeUp,
  viewportAmount = 0.15,
  style,
}: FadeInViewProps) {
  const Component = motion.create(as);

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      transition={smoothTransition}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

export { motion, type Variants };
