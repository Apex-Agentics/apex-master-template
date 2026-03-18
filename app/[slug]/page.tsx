import { notFound } from "next/navigation";
import { loadConfig } from "@/lib/config";
import { renderComponent } from "@/lib/renderComponent";

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const config = loadConfig();
  // Exclude "home" — handled by app/page.tsx at the "/" route.
  return config.pages
    .filter((page) => page !== "home")
    .map((page) => ({ slug: page }));
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const config = loadConfig();

  if (!config.pages.includes(slug)) notFound();

  const components = config.components[slug];
  if (!components || components.length === 0) notFound();

  return <>{components.map((name, i) => renderComponent(name, config, i))}</>;
}
