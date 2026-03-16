/**
 * registry.ts — Component layer registry.
 *
 * Documents which components belong to which layer.
 * Used as the authoritative reference when wiring pages from config.components.
 *
 * Layer 1 — Required on every build; no conditional logic needed.
 * Layer 2 — Conditionally rendered based on config.components array.
 * Layer 3 — Only renders if config.client.tier === 2.
 * Layer 4 — Only renders if the corresponding webhook URL is non-null in config.
 */

export const LAYER_1_COMPONENTS = [
  "NavBar",
  "HeroSection",
  "Footer",
  "ContactForm",
  "SEOMeta",
] as const;

export const LAYER_2_COMPONENTS = [
  "ServiceGrid",
  "TestimonialCarousel",
  "TeamSection",
  "PricingTable",
  "FAQAccordion",
  "CTABanner",
  "GoogleMapEmbed",
  "StripePaymentButton",
] as const;

export const LAYER_3_COMPONENTS = [
  // Supabase auth, Stripe checkout, member dashboard — added in Layer 3 build
] as const;

export const LAYER_4_COMPONENTS = [
  "ContactFormWebhook",
  "AppointmentWidget",
  "LeadMagnetCapture",
  "ReviewRequestTrigger",
] as const;

export type Layer1Component = (typeof LAYER_1_COMPONENTS)[number];
export type Layer2Component = (typeof LAYER_2_COMPONENTS)[number];
export type Layer3Component = (typeof LAYER_3_COMPONENTS)[number];
export type Layer4Component = (typeof LAYER_4_COMPONENTS)[number];
