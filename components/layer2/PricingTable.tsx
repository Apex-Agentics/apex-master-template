"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  FadeInView,
  fadeUp,
  staggerContainer,
  smoothTransition,
} from "@/components/motion";
import type { PricingTier } from "@/lib/config";

interface PricingTableProps {
  pricing: PricingTier[];
}

/**
 * PricingTable — Layer 2 component.
 * Staggered scroll entrance. Featured tier has glow effect.
 * Cards lift on hover with shadow elevation.
 */
export default function PricingTable({ pricing }: PricingTableProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInView className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            No retainers. No surprises. Pay once, automate forever.
          </p>
        </FadeInView>

        {/* Tiers */}
        <motion.div
          className={`grid grid-cols-1 gap-8 ${
            pricing.length === 2
              ? "md:grid-cols-2 max-w-3xl mx-auto"
              : "md:grid-cols-3"
          }`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {pricing.map((tier) => (
            <motion.div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.is_featured
                  ? "shadow-xl ring-2 ring-[var(--color-primary)]"
                  : "shadow-sm border border-gray-100"
              }`}
              variants={fadeUp}
              transition={smoothTransition}
              whileHover={{
                y: -8,
                boxShadow: tier.is_featured
                  ? "0 25px 50px -12px rgba(0,0,0,0.15)"
                  : "0 20px 40px -12px rgba(0,0,0,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              {/* Featured badge */}
              {tier.is_featured && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white shadow-md"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  initial={{ opacity: 0, y: 8, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, ...smoothTransition }}
                >
                  Most Popular
                </motion.div>
              )}

              {/* Tier name */}
              <h3
                className="text-lg font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  {tier.price}
                </span>
                {tier.billing_period && (
                  <span className="text-sm text-gray-400 ml-1">
                    {tier.billing_period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={tier.cta_url}>
                <motion.span
                  className="block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-colors"
                  style={
                    tier.is_featured
                      ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                      : {
                          backgroundColor: "transparent",
                          color: "var(--color-primary)",
                          border: "1.5px solid var(--color-primary)",
                        }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {tier.cta_text}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
