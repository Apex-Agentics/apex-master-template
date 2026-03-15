import { loadConfig } from "@/lib/config";
import NavBar from "@/components/layer1/NavBar";
import HeroSection from "@/components/layer1/HeroSection";
import Footer from "@/components/layer1/Footer";

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
      </main>
      <Footer
        clientName={config.client.name}
        navLinks={config.nav_links}
        footer={config.content.footer}
      />
    </>
  );
}
