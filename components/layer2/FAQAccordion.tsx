"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FadeInView, fadeUp, staggerContainer, smoothTransition } from "@/components/motion";
import type { FAQItem } from "@/lib/config";

interface FAQAccordionProps {
  faq: FAQItem[];
}

/**
 * FAQAccordion — Layer 2 component.
 * Staggered scroll entrance. One item open at a time with smooth animation.
 */
export default function FAQAccordion({ faq }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="py-24 bg-gray-50/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInView className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Frequently Asked Questions
          </h2>
        </FadeInView>

        {/* Accordion items — staggered entrance */}
        <motion.div
          className="space-y-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                variants={fadeUp}
                transition={smoothTransition}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-gray-900 pr-4 group-hover:text-[var(--color-primary)] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    className="shrink-0 rounded-full p-1"
                    style={{ color: "var(--color-primary)" }}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </motion.span>
                </button>

                {/* Answer — animated */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
