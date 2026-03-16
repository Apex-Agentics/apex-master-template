import {
  Zap,
  Globe,
  BarChart3,
  MessageSquare,
  FileText,
  Headphones,
  Wrench,
  Settings,
  Shield,
  Star,
  Rocket,
  Code,
  LucideProps,
} from "lucide-react";
import type { ServiceItem } from "@/lib/config";

// ---------------------------------------------------------------------------
// Icon registry — extend as needed when new icon names appear in config.json
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Zap,
  Globe,
  BarChart3,
  MessageSquare,
  FileText,
  Headphones,
  Wrench,
  Settings,
  Shield,
  Star,
  Rocket,
  Code,
};

interface ServiceGridProps {
  services: ServiceItem[];
}

/**
 * ServiceGrid — Layer 2 component.
 * Renders a 3-column grid (for 3 items) or 3-column grid that wraps to 2 rows
 * (for 6 items). Accepts exactly 3 or 6 items — enforced by Zod schema.
 * Each card: Lucide icon (by string name), title, description.
 */
export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What We Do
          </h2>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            End-to-end solutions built for the way modern businesses actually
            operate.
          </p>
        </div>

        {/* Grid — always 3 columns on lg+, 2 on md, 1 on sm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Wrench;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
