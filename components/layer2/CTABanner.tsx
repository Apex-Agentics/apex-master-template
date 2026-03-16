import Link from "next/link";
import type { SiteConfig } from "@/lib/config";

interface CTABannerProps {
  ctaBanner: SiteConfig["content"]["cta_banner"];
}

/**
 * CTABanner — Layer 2 component.
 * Full-width banner with headline, subheadline, and a single CTA button.
 * Background colour is driven entirely by --color-primary CSS custom property.
 */
export default function CTABanner({ ctaBanner }: CTABannerProps) {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {ctaBanner.headline}
        </h2>

        {ctaBanner.subheadline && (
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            {ctaBanner.subheadline}
          </p>
        )}

        <div className="mt-10">
          <Link
            href={ctaBanner.cta_href}
            className="inline-flex items-center px-8 py-3.5 rounded-xl text-base font-semibold bg-white transition-opacity hover:opacity-90 shadow-lg"
            style={{ color: "var(--color-primary)" }}
          >
            {ctaBanner.cta_text}
          </Link>
        </div>
      </div>
    </section>
  );
}
