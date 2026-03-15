import Link from "next/link";
import type { SiteConfig } from "@/lib/config";

interface HeroSectionProps {
  hero: SiteConfig["content"]["hero"];
}

/**
 * HeroSection — Layer 1 component.
 * Full-width hero with headline, subheadline, and CTA button.
 * Uses background_image_url when provided; falls back to a solid primary-color bg.
 */
export default function HeroSection({ hero }: HeroSectionProps) {
  const hasBgImage = Boolean(hero.background_image_url);

  return (
    <section
      className="relative flex items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={
        hasBgImage
          ? {
              backgroundImage: `url(${hero.background_image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { backgroundColor: "var(--color-primary)" }
      }
    >
      {/* Overlay — darkens the background image for text legibility */}
      {hasBgImage && (
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          {hero.headline}
        </h1>

        {hero.subheadline && (
          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {hero.subheadline}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={hero.cta_href}
            className="inline-flex items-center px-8 py-3 rounded-xl text-base font-semibold text-white shadow-lg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            {hero.cta_text}
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 rounded-xl text-base font-semibold text-white border border-white/50 hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
