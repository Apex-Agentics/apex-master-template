"use client";

import {
  Zap,
  Globe,
  BarChart3,
  MessageSquare,
  FileText,
  Headphones,
  Wrench,
  Settings,
  Shield,
  Star,
  Rocket,
  Code,
  LucideProps,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  FadeInView,
  fadeUp,
  staggerContainer,
  smoothTransition,
} from "@/components/motion";
import type { ServiceItem } from "@/lib/config";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Zap, Globe, BarChart3, MessageSquare, FileText, Headphones,
  Wrench, Settings, Shield, Star, Rocket, Code,
};

interface ServiceGridProps {
  services: ServiceItem[];
}

/**
 * ServiceGrid — Layer 2 component.
 * Staggered scroll entrance with hover lift + shadow elevation on cards.
 */
export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <section className="py-24 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInView className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What We Do
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            End-to-end solutions built for the way modern businesses actually
            operate.
          </p>
        </FadeInView>

        {/* Grid — staggered entrance */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Wrench;
            return (
              <motion.div
                key={service.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 group cursor-default"
                variants={fadeUp}
                transition={smoothTransition}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 25 },
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  whileHover={{ rotate: -6, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon size={22} />
                </motion.div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
