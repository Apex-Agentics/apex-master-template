"use client";

import { useState } from "react";

interface ContactFormWebhookProps {
  webhookUrl: string | null;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * ContactFormWebhook — Layer 4 component.
 * Enhanced version of the Layer 1 ContactForm. Enriches the POST payload with
 * page URL, timestamp, and referrer so N8N can route and attribute submissions.
 * Renders null silently if webhookUrl is null.
 */
export default function ContactFormWebhook({
  webhookUrl,
}: ContactFormWebhookProps) {
  if (!webhookUrl) return null;
  return <ContactFormWebhookInner webhookUrl={webhookUrl} />;
}

function ContactFormWebhookInner({ webhookUrl }: { webhookUrl: string }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Capture browser context — only accessible client-side inside the handler
    const payload = {
      ...form,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      referrer: document.referrer || null,
    };

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Webhook responded with HTTP ${res.status}`);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("[ContactFormWebhook] Submission failed:", err);
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-4">
        <h2
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Get in Touch
        </h2>
        <p className="text-gray-500 mb-8">
          Fill out the form below and we&apos;ll be in touch shortly.
        </p>

        {status === "success" ? (
          <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
            <p className="text-green-700 font-semibold text-lg">
              Message sent!
            </p>
            <p className="text-green-600 text-sm mt-1">
              Thanks for reaching out. We&apos;ll respond within 1 business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="cwh-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="cwh-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)] ${
                  errors.name
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="cwh-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="cwh-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)] ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="cwh-message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="cwh-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)] resize-none ${
                  errors.message
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 px-6 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
