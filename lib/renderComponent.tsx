import type { ReactElement } from "react";
import type { SiteConfig } from "@/lib/config";

import NavBar from "@/components/layer1/NavBar";
import HeroSection from "@/components/layer1/HeroSection";
import Footer from "@/components/layer1/Footer";
import ContactForm from "@/components/layer1/ContactForm";
import ServiceGrid from "@/components/layer2/ServiceGrid";
import TestimonialCarousel from "@/components/layer2/TestimonialCarousel";
import TeamSection from "@/components/layer2/TeamSection";
import PricingTable from "@/components/layer2/PricingTable";
import FAQAccordion from "@/components/layer2/FAQAccordion";
import CTABanner from "@/components/layer2/CTABanner";
import GoogleMapEmbed from "@/components/layer2/GoogleMapEmbed";
import StripePaymentButton from "@/components/layer2/StripePaymentButton";
import ContactFormWebhook from "@/components/layer4/ContactFormWebhook";
import AppointmentWidget from "@/components/layer4/AppointmentWidget";
import LeadMagnetCapture from "@/components/layer4/LeadMagnetCapture";
import ReviewRequestTrigger from "@/components/layer4/ReviewRequestTrigger";

/**
 * renderComponent — maps a component name string + full SiteConfig to a React
 * element with the correct props. Used by both app/page.tsx and app/[slug]/page.tsx
 * so that config.components drives what renders on every page.
 *
 * Returns null for SEOMeta (handled by layout.tsx generateMetadata) and unknown names.
 */
export function renderComponent(
  name: string,
  config: SiteConfig,
  index: number
): ReactElement | null {
  switch (name) {
    // ── Layer 1 ────────────────────────────────────────────────────────────
    case "NavBar":
      return (
        <NavBar
          key={`${name}-${index}`}
          brand={config.brand}
          navLinks={config.nav_links}
          ctaText={config.content.hero.cta_text}
          ctaHref={config.content.hero.cta_href}
        />
      );
    case "HeroSection":
      return (
        <HeroSection
          key={`${name}-${index}`}
          hero={config.content.hero}
        />
      );
    case "Footer":
      return (
        <Footer
          key={`${name}-${index}`}
          clientName={config.client.name}
          navLinks={config.nav_links}
          footer={config.content.footer}
        />
      );
    case "ContactForm":
      return (
        <ContactForm
          key={`${name}-${index}`}
          webhookUrl={config.webhooks.contact_form}
        />
      );
    case "SEOMeta":
      // Handled via generateMetadata in layout.tsx — never rendered in body.
      return null;

    // ── Layer 2 ────────────────────────────────────────────────────────────
    case "ServiceGrid":
      return (
        <ServiceGrid
          key={`${name}-${index}`}
          services={config.services}
        />
      );
    case "TestimonialCarousel":
      return (
        <TestimonialCarousel
          key={`${name}-${index}`}
          testimonials={config.testimonials}
        />
      );
    case "TeamSection":
      return (
        <TeamSection
          key={`${name}-${index}`}
          team={config.team}
        />
      );
    case "PricingTable":
      return (
        <PricingTable
          key={`${name}-${index}`}
          pricing={config.pricing}
        />
      );
    case "FAQAccordion":
      return (
        <FAQAccordion
          key={`${name}-${index}`}
          faq={config.faq}
        />
      );
    case "CTABanner":
      return (
        <CTABanner
          key={`${name}-${index}`}
          ctaBanner={config.content.cta_banner}
        />
      );
    case "GoogleMapEmbed":
      return (
        <GoogleMapEmbed
          key={`${name}-${index}`}
          mapEmbedUrl={config.map_embed_url}
        />
      );
    case "StripePaymentButton":
      return (
        <StripePaymentButton
          key={`${name}-${index}`}
          label={config.content.stripe_payment.label}
          url={config.content.stripe_payment.url}
          variant={config.content.stripe_payment.variant}
        />
      );

    // ── Layer 4 ────────────────────────────────────────────────────────────
    case "ContactFormWebhook":
      return (
        <ContactFormWebhook
          key={`${name}-${index}`}
          webhookUrl={config.webhooks.contact_form_enhanced}
        />
      );
    case "AppointmentWidget":
      return (
        <AppointmentWidget
          key={`${name}-${index}`}
          calendlyUrl={config.webhooks.calendly_url}
          calendlyMode={config.webhooks.calendly_mode}
        />
      );
    case "LeadMagnetCapture":
      return (
        <LeadMagnetCapture
          key={`${name}-${index}`}
          leadMagnet={config.lead_magnet}
        />
      );
    case "ReviewRequestTrigger":
      return (
        <ReviewRequestTrigger
          key={`${name}-${index}`}
          reviewRequest={config.review_request}
        />
      );

    // ── Unknown ────────────────────────────────────────────────────────────
    default:
      console.warn(
        `[renderComponent] Unknown component name "${name}" — skipping. Check config.components entries.`
      );
      return null;
  }
}
