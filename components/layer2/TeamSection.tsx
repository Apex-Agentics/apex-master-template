"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import {
  FadeInView,
  fadeUp,
  staggerContainer,
  smoothTransition,
} from "@/components/motion";
import type { TeamMember } from "@/lib/config";

interface TeamSectionProps {
  team: TeamMember[];
}

/**
 * TeamSection — Layer 2 component.
 * Staggered scroll entrance with hover lift and image scale on cards.
 */
export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <section className="py-24 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInView className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Meet the Team
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            The people behind the automations.
          </p>
        </FadeInView>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-full max-w-sm text-center group"
              variants={fadeUp}
              transition={smoothTransition}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)",
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              {/* Photo / placeholder */}
              <div className="relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-24 h-24 rounded-full text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <User size={40} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  className="text-lg font-semibold text-gray-900"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm font-medium mt-0.5 mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  {member.title}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
