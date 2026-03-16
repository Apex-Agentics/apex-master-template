import Link from "next/link";
import { Check } from "lucide-react";
import type { PricingTier } from "@/lib/config";

interface PricingTableProps {
  pricing: PricingTier[];
}

/**
 * PricingTable — Layer 2 component.
 * Renders 2 or 3 pricing tiers side-by-side (enforced by Zod).
 * The featured tier is visually elevated with primary_color border + badge.
 */
export default function PricingTable({ pricing }: PricingTableProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
            No retainers. No surprises. Pay once, automate forever.
          </p>
        </div>

        {/* Tiers */}
        <div
          className={`grid grid-cols-1 gap-8 ${
            pricing.length === 2
              ? "md:grid-cols-2 max-w-3xl mx-auto"
              : "md:grid-cols-3"
          }`}
        >
          {pricing.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.is_featured
                  ? "shadow-xl ring-2"
                  : "shadow-sm border border-gray-100"
              }`}
              style={
                tier.is_featured
                  ? { border: "2px solid var(--color-primary)" }
                  : {}
              }
            >
              {/* Featured badge */}
              {tier.is_featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white shadow"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Most Popular
                </div>
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
                    / {tier.billing_period}
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
              <Link
                href={tier.cta_url}
                className="block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                style={
                  tier.is_featured
                    ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                    : {
                        backgroundColor: "transparent",
                        color: "var(--color-primary)",
                        border: "1.5px solid var(--color-primary)",
                      }
                }
              >
                {tier.cta_text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
