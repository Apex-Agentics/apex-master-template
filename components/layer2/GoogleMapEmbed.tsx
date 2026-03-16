interface GoogleMapEmbedProps {
  mapEmbedUrl: string | null;
}

/**
 * GoogleMapEmbed — Layer 2 component.
 * Renders an iframe embed of a Google Maps URL from config.
 * Returns null silently if mapEmbedUrl is null — never crashes.
 */
export default function GoogleMapEmbed({ mapEmbedUrl }: GoogleMapEmbedProps) {
  if (!mapEmbedUrl) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Find Us
          </h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-96">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Business location map"
          />
        </div>
      </div>
    </section>
  );
}
