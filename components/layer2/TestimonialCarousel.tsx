"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/config";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

/**
 * TestimonialCarousel — Layer 2 component.
 * Auto-advances every 5 seconds. Manual prev/next controls pause auto-advance
 * until the user stops interacting, then resume.
 */
export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + total) % total),
    [total]
  );

  // Auto-advance every 5 seconds
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const testimonial = testimonials[current];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Card */}
        <div className="relative bg-gray-50 rounded-3xl p-10 sm:p-14 text-center shadow-sm border border-gray-100">
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
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    i === current
                      ? "var(--color-primary)"
                      : "rgb(209 213 219)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
