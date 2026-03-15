import type { Metadata } from "next";
import type { SiteConfig } from "@/lib/config";

/**
 * buildMetadata — constructs a Next.js Metadata object from SiteConfig.seo.
 *
 * Usage: export const metadata = buildMetadata(loadConfig().seo);
 *
 * This is a helper function, not a React component, because Next.js 15
 * requires metadata to be exported from Server Components as a static
 * export — it cannot be rendered as JSX.
 */
export function buildMetadata(seo: SiteConfig["seo"]): Metadata {
  return {
    title: seo.title,
    description: seo.description,
  };
}

/**
 * SEOMeta — re-exported type for convenience so callers don't need to
 * import from "next" directly.
 */
export type { Metadata };
