"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import { FadeInView } from "@/components/motion";
import type { SiteConfig } from "@/lib/config";

interface FooterProps {
  clientName: SiteConfig["client"]["name"];
  navLinks: SiteConfig["nav_links"];
  footer: SiteConfig["content"]["footer"];
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Twitter: <Twitter size={18} />,
  LinkedIn: <Linkedin size={18} />,
  GitHub: <Github size={18} />,
};

/**
 * Footer — Layer 1 component.
 * Subtle scroll entrance. Business name, nav links, social links.
 */
export default function Footer({ clientName, navLinks, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <FadeInView
      as="footer"
      className="text-gray-300 relative overflow-hidden"
      style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 25%, #111118)" }}
      viewportAmount={0.05}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand column */}
          <div className="space-y-3">
            <h3
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {clientName}
            </h3>
            {footer.tagline && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {footer.tagline}
              </p>
            )}
          </div>

          {/* Nav links column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {footer.social_links.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                >
                  {SOCIAL_ICONS[social.platform] ?? (
                    <span className="text-xs">{social.platform}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            &copy; {currentYear} {clientName}. All rights reserved.
          </p>
          <p className="text-gray-600">Built with Apex Master Template</p>
        </div>
      </div>
    </FadeInView>
  );
}
