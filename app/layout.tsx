import type { ReactNode } from "react";
import { loadConfig } from "@/lib/config";
import { buildMetadata } from "@/components/layer1/SEOMeta";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export async function generateMetadata() {
  const config = loadConfig();
  return buildMetadata(config.seo);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const config = loadConfig();

  return (
    <html lang="en">
      <body>
        <ThemeProvider brand={config.brand}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
