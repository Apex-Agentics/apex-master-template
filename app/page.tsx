import { loadConfig } from "@/lib/config";
import NavBar from "@/components/layer1/NavBar";
import HeroSection from "@/components/layer1/HeroSection";
import Footer from "@/components/layer1/Footer";
import ServiceGrid from "@/components/layer2/ServiceGrid";
import TestimonialCarousel from "@/components/layer2/TestimonialCarousel";
import TeamSection from "@/components/layer2/TeamSection";
import PricingTable from "@/components/layer2/PricingTable";
import FAQAccordion from "@/components/layer2/FAQAccordion";
import CTABanner from "@/components/layer2/CTABanner";
import GoogleMapEmbed from "@/components/layer2/GoogleMapEmbed";

export default function HomePage() {
  const config = loadConfig();

  return (
    <>
      <NavBar
        brand={config.brand}
        navLinks={config.nav_links}
        ctaText={config.content.hero.cta_text}
        ctaHref={config.content.hero.cta_href}
      />
      <main>
        <HeroSection hero={config.content.hero} />
        <ServiceGrid services={config.services} />
        <TestimonialCarousel testimonials={config.testimonials} />
        <TeamSection team={config.team} />
        <PricingTable pricing={config.pricing} />
        <FAQAccordion faq={config.faq} />
        <CTABanner ctaBanner={config.content.cta_banner} />
        <GoogleMapEmbed mapEmbedUrl={config.map_embed_url} />
      </main>
      <Footer
        clientName={config.client.name}
        navLinks={config.nav_links}
        footer={config.content.footer}
      />
    </>
  );
}
