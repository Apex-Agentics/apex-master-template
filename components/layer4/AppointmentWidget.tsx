import { Calendar } from "lucide-react";

interface AppointmentWidgetProps {
  calendlyUrl: string | null;
  calendlyMode: "embed" | "link";
}

/**
 * AppointmentWidget — Layer 4 component.
 * "link" mode: renders a styled CTA button that opens the Calendly URL.
 * "embed" mode: renders the Calendly scheduling page inside an iframe.
 * Returns null silently if calendlyUrl is null.
 */
export default function AppointmentWidget({
  calendlyUrl,
  calendlyMode,
}: AppointmentWidgetProps) {
  if (!calendlyUrl) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Calendar size={22} />
        </div>
        <h2
          className="text-3xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Book a Free Discovery Call
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Choose a time that works for you. We&apos;ll identify your top
          automation opportunities in 30 minutes.
        </p>

        {calendlyMode === "link" ? (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Calendar size={18} />
            Schedule Now
          </a>
        ) : (
          // Embed mode — Calendly inline scheduling page via iframe
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              src={calendlyUrl}
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule an appointment"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
