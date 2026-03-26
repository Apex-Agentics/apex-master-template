"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInView, fadeUp, smoothTransition } from "@/components/motion";
import type { SiteConfig } from "@/lib/config";

interface CTABannerProps {
  ctaBanner: SiteConfig["content"]["cta_banner"];
}

/**
 * CTABanner — Layer 2 component.
 * Full-width banner with gradient overlay, subtle pattern texture,
 * scroll entrance, and animated CTA button.
 */
export default function CTABanner({ ctaBanner }: CTABannerProps) {
  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/10"
        aria-hidden="true"
      />

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <FadeInView className="relative z-10 max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {ctaBanner.headline}
        </h2>

        {ctaBanner.subheadline && (
          <p className="mt-5 text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            {ctaBanner.subheadline}
          </p>
        )}

        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...smoothTransition, delay: 0.2 }}
        >
          <Link href={ctaBanner.cta_href}>
            <motion.span
              className="inline-flex items-center px-8 py-3.5 rounded-xl text-base font-semibold bg-white shadow-lg"
              style={{ color: "var(--color-primary)" }}
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {ctaBanner.cta_text}
            </motion.span>
          </Link>
        </motion.div>
      </FadeInView>
    </section>
  );
}
