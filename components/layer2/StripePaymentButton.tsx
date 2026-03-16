interface StripePaymentButtonProps {
  label: string;
  url: string | null;
  variant: "primary" | "secondary";
}

/**
 * StripePaymentButton — Layer 2 component.
 * Renders a CTA anchor that opens an external Stripe payment URL.
 * Link-only — no Stripe SDK, no API keys, no webhook handling.
 * Returns null silently if url is null or empty.
 */
export default function StripePaymentButton({
  label,
  url,
  variant,
}: StripePaymentButtonProps) {
  if (!url) return null;

  const isPrimary = variant === "primary";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
      style={
        isPrimary
          ? { backgroundColor: "var(--color-primary)", color: "#fff" }
          : {
              backgroundColor: "transparent",
              color: "var(--color-primary)",
              border: "1.5px solid var(--color-primary)",
            }
      }
    >
      {label}
    </a>
  );
}
