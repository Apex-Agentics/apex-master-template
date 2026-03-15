import { z } from "zod";
import configJson from "@/config/config.json";

// ---------------------------------------------------------------------------
// Zod schemas — source of truth for runtime shape validation
// ---------------------------------------------------------------------------

const NavLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const SocialLinkSchema = z.object({
  platform: z.string(),
  href: z.string().url(),
});

export const SiteConfigSchema = z.object({
  client: z.object({
    name: z.string().min(1, "client.name is required"),
    slug: z.string().min(1, "client.slug is required"),
    tier: z.union([z.literal(1), z.literal(2)]),
  }),
  brand: z.object({
    logo_url: z.string().url("brand.logo_url must be a valid URL"),
    primary_color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{3,8}$/, "brand.primary_color must be a hex color"),
    secondary_color: z
      .string()
      .regex(
        /^#[0-9A-Fa-f]{3,8}$/,
        "brand.secondary_color must be a hex color"
      ),
    font_heading: z.string().min(1),
    font_body: z.string().min(1),
  }),
  seo: z.object({
    title: z.string().min(1, "seo.title is required"),
    description: z.string().min(1, "seo.description is required"),
  }),
  pages: z.array(z.string()).min(1, "At least one page is required"),
  nav_links: z.array(NavLinkSchema),
  components: z.record(z.string(), z.array(z.string())),
  webhooks: z.object({
    contact_form: z.string().url().nullable(),
  }),
  content: z.object({
    hero: z.object({
      headline: z.string().min(1),
      subheadline: z.string(),
      cta_text: z.string().min(1),
      cta_href: z.string(),
      background_image_url: z.string().url().optional(),
    }),
    footer: z.object({
      tagline: z.string(),
      social_links: z.array(SocialLinkSchema),
    }),
  }),
});

// ---------------------------------------------------------------------------
// Derived TypeScript types — inferred from the Zod schema (never duplicated)
// ---------------------------------------------------------------------------

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type NavLink = z.infer<typeof NavLinkSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;

// ---------------------------------------------------------------------------
// loadConfig — validates and returns the typed config object.
// Throws a descriptive ZodError if required fields are missing or malformed.
// Call this in Server Components / layout.tsx — NOT in client components.
// ---------------------------------------------------------------------------

let _cached: SiteConfig | null = null;

export function loadConfig(): SiteConfig {
  if (_cached) return _cached;

  const result = SiteConfigSchema.safeParse(configJson);

  if (!result.success) {
    const messages = result.error.errors
      .map((e) => `  • ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    throw new Error(
      `[apex-master-template] config/config.json validation failed:\n${messages}`
    );
  }

  _cached = result.data;
  return _cached;
}
