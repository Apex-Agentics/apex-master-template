"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInView, smoothTransition } from "@/components/motion";
import type { Testimonial } from "@/lib/config";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

/**
 * TestimonialCarousel — Layer 2 component.
 * Smooth slide transitions with AnimatePresence. Auto-advances.
 */
export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + total) % total);
  }, [total]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Auto-advance every 6 seconds
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const testimonial = testimonials[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInView className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our Clients Say
          </h2>
        </FadeInView>

        {/* Card with slide animation */}
        <div className="relative bg-gray-50 rounded-3xl p-10 sm:p-14 text-center shadow-sm border border-gray-100 min-h-[320px] flex items-center justify-center">
          {/* Decorative quote mark */}
          <Quote
            size={48}
            className="absolute top-6 left-8 opacity-[0.06] rotate-180"
            style={{ color: "var(--color-primary)" }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Star rating */}
              {testimonial.rating && (
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < testimonial.rating!
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-xl sm:text-2xl text-gray-700 font-medium leading-relaxed italic mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div>
                <p
                  className="font-semibold text-gray-900"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {testimonial.name}
                </p>
                {testimonial.company && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {testimonial.company}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Dot indicators */}
          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative w-2.5 h-2.5 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    i === current ? "var(--color-primary)" : "rgb(209 213 219)",
                }}
              >
                {i === current && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    layoutId="testimonial-dot"
                    transition={smoothTransition}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
