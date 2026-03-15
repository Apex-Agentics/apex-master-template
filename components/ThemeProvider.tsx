"use client";

import { useEffect } from "react";
import type { SiteConfig } from "@/lib/config";

interface ThemeProviderProps {
  brand: SiteConfig["brand"];
  children: React.ReactNode;
}

/**
 * ThemeProvider injects brand CSS custom properties onto :root at runtime.
 * Wrap the root layout children with this so every component can consume
 * --color-primary, --color-secondary, --font-heading, --font-body via CSS.
 */
export default function ThemeProvider({ brand, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", brand.primary_color);
    root.style.setProperty("--color-secondary", brand.secondary_color);
    root.style.setProperty("--font-heading", `"${brand.font_heading}", sans-serif`);
    root.style.setProperty("--font-body", `"${brand.font_body}", sans-serif`);
  }, [brand]);

  return <>{children}</>;
}
