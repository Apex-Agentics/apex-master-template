import { z } from "zod";
import configJson from "@/config/config.json";

// ---------------------------------------------------------------------------
// Primitive / shared schemas
// ---------------------------------------------------------------------------

const NavLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const SocialLinkSchema = z.object({
  platform: z.string(),
  href: z.string().url(),
});

// ---------------------------------------------------------------------------
// Layer 2 schemas
// ---------------------------------------------------------------------------

const ServiceItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
});

const TestimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  company: z.string(),
  rating: z.number().int().min(1).max(5).optional(),
});

const TeamMemberSchema = z.object({
  photo_url: z.string().url().nullable(),
  name: z.string().min(1),
  title: z.string(),
  bio: z.string(),
});

const PricingTierSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  billing_period: z.string(),
  features: z.array(z.string()),
  cta_text: z.string().min(1),
  cta_url: z.string(),
  is_featured: z.boolean(),
});

const FAQItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

// ---------------------------------------------------------------------------
// Root schema
// ---------------------------------------------------------------------------

export const SiteConfigSchema = z.object({
  client: z.object({
    name: z.string().min(1, "client.name is required"),
    slug: z.string().min(1, "client.slug is required"),
    tier: z.union([z.literal(1), z.literal(2)]),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
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
  // Layer 2 — top-level arrays
  map_embed_url: z.string().url().nullable(),
  services: z
    .array(ServiceItemSchema)
    .refine((a) => a.length === 3 || a.length === 6, {
      message: "services must contain exactly 3 or 6 items",
    }),
  testimonials: z.array(TestimonialSchema).min(3),
  team: z.array(TeamMemberSchema).min(1),
  pricing: z
    .array(PricingTierSchema)
    .refine((a) => a.length === 2 || a.length === 3, {
      message: "pricing must contain exactly 2 or 3 tiers",
    }),
  faq: z.array(FAQItemSchema).min(1),
  content: z.object({
    hero: z.object({
      headline: z.string().min(1),
      subheadline: z.string(),
      cta_text: z.string().min(1),
      cta_href: z.string(),
      background_image_url: z.string().url().optional(),
    }),
    cta_banner: z.object({
      headline: z.string().min(1),
      subheadline: z.string(),
      cta_text: z.string().min(1),
      cta_href: z.string(),
    }),
    footer: z.object({
      tagline: z.string(),
      social_links: z.array(SocialLinkSchema),
    }),
  }),
});

// ---------------------------------------------------------------------------
// Derived TypeScript types — inferred from Zod (never hand-duplicated)
// ---------------------------------------------------------------------------

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type NavLink = z.infer<typeof NavLinkSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type ServiceItem = z.infer<typeof ServiceItemSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type PricingTier = z.infer<typeof PricingTierSchema>;
export type FAQItem = z.infer<typeof FAQItemSchema>;

// ---------------------------------------------------------------------------
// loadConfig — validates and returns the typed config object.
// Throws a descriptive ZodError if required fields are missing or malformed.
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
