"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroStagger, fadeUp, smoothTransition } from "@/components/motion";
import type { SiteConfig } from "@/lib/config";

interface HeroSectionProps {
  hero: SiteConfig["content"]["hero"];
}

/**
 * HeroSection — Layer 1 component.
 * Full-width hero with parallax background, staggered text reveal,
 * and animated CTA buttons.
 */
export default function HeroSection({ hero }: HeroSectionProps) {
  const hasBgImage = Boolean(hero.background_image_url);
  const ref = useRef<HTMLElement>(null);

  // Parallax: background moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={!hasBgImage ? {
        background: "linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 60%, black) 50%, color-mix(in srgb, var(--color-secondary) 70%, var(--color-primary)) 100%)",
      } : undefined}
    >
      {/* Animated gradient orbs for no-image fallback */}
      {!hasBgImage && (
        <>
          <div
            className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--color-secondary)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{ background: "color-mix(in srgb, var(--color-primary) 50%, white)" }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Parallax background image layer */}
      {hasBgImage && (
        <motion.div
          className="absolute inset-0 -top-[15%] -bottom-[15%]"
          style={{
            backgroundImage: `url(${hero.background_image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: bgY,
          }}
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay — richer than flat black */}
      {hasBgImage && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"
          aria-hidden="true"
        />
      )}

      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content — staggered entrance */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center py-24"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
          variants={fadeUp}
          transition={smoothTransition}
        >
          {hero.headline}
        </motion.h1>

        {hero.subheadline && (
          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto"
            variants={fadeUp}
            transition={smoothTransition}
          >
            {hero.subheadline}
          </motion.p>
        )}

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
          transition={smoothTransition}
        >
          <Link href={hero.cta_href} className="group">
            <motion.span
              className="inline-flex items-center px-8 py-3.5 rounded-xl text-base font-semibold text-white shadow-lg shadow-black/20 transition-shadow hover:shadow-xl"
              style={{ backgroundColor: "var(--color-secondary)" }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {hero.cta_text}
            </motion.span>
          </Link>

          <Link href="/services" className="group">
            <motion.span
              className="inline-flex items-center px-8 py-3.5 rounded-xl text-base font-semibold text-white border border-white/40 backdrop-blur-sm hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Learn More
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade into page content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
