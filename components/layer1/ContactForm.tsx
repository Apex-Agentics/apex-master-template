"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeInView, smoothTransition } from "@/components/motion";
import { Send, CheckCircle2, MapPin, Phone, Mail, Clock } from "lucide-react";
import type { SiteConfig } from "@/lib/config";

interface ContactFormProps {
  webhookUrl: string | null;
  client: SiteConfig["client"];
  services: SiteConfig["services"];
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  contactMethod: string;
  message: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * ContactForm — Layer 1 component.
 * Two-column layout: business details on left, rich form on right.
 * Config-driven contact info and service-based inquiry types.
 */
export default function ContactForm({ webhookUrl, client, services }: ContactFormProps) {
  return <ContactFormInner webhookUrl={webhookUrl} client={client} services={services} />;
}

function ContactFormInner({
  webhookUrl,
  client,
  services,
}: {
  webhookUrl: string | null;
  client: SiteConfig["client"];
  services: SiteConfig["services"];
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    contactMethod: "Email",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
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

    if (!webhookUrl) {
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", inquiryType: "", contactMethod: "Email", message: "" });
      }, 800);
      return;
    }

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", inquiryType: "", contactMethod: "Email", message: "" });
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // Build inquiry type options from services
  const inquiryOptions = [
    ...services.map((s) => s.title),
    "General Inquiry",
    "Other",
  ];

  return (
    <FadeInView as="section" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section header */}
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 opacity-50"
          >
            Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            We&apos;d Love<br />to Hear From You.
          </h2>
        </div>

        {status === "success" ? (
          <motion.div
            className="rounded-2xl bg-green-900/30 border border-green-700/40 p-10 text-center max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={smoothTransition}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            >
              <CheckCircle2 size={44} className="text-green-400 mx-auto mb-4" />
            </motion.div>
            <p className="text-green-300 font-semibold text-xl">Message sent!</p>
            <p className="text-green-400/70 text-sm mt-2">
              Thanks for reaching out. We&apos;ll respond within 1 business day.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* LEFT — Contact Details */}
            <div className="space-y-8">
              <ContactDetail
                icon={<MapPin size={16} />}
                label="Address"
              >
                <p>{client.address}</p>
                <p>{client.city}, {client.state}</p>
              </ContactDetail>

              <ContactDetail
                icon={<Phone size={16} />}
                label="Phone"
              >
                <a
                  href={`tel:${client.phone.replace(/\D/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {client.phone}
                </a>
              </ContactDetail>

              <ContactDetail
                icon={<Mail size={16} />}
                label="Email"
              >
                <p className="text-sm opacity-60">
                  Use the form to send us a message
                </p>
              </ContactDetail>

              <ContactDetail
                icon={<Clock size={16} />}
                label="Response Time"
              >
                <p>Within 1 business day</p>
              </ContactDetail>
            </div>

            {/* RIGHT — Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <FormField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>

              {/* Row 2: Phone + Inquiry Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  label="Phone"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="inquiryType"
                    className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-gray-500"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-white/10 text-white text-sm px-4 py-3 outline-none transition-colors focus:border-[var(--color-primary)] cursor-pointer appearance-none rounded-none"
                  >
                    <option value="">Select...</option>
                    {inquiryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-gray-500">
                  Preferred Contact Method
                </span>
                <div className="flex gap-8">
                  {["Email", "Phone"].map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-2.5 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors"
                    >
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={form.contactMethod === method}
                        onChange={handleChange}
                        className="w-4 h-4"
                        style={{ accentColor: "var(--color-primary)" }}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-gray-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us what you're looking for..."
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 border text-white text-sm px-4 py-3 outline-none transition-colors focus:border-[var(--color-primary)] resize-vertical min-h-[140px] rounded-none ${
                    errors.message ? "border-red-500" : "border-white/10"
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 px-6 text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                style={{ backgroundColor: "var(--color-primary)" }}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {status === "submitting" ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        )}
      </div>
    </FadeInView>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ContactDetail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: "var(--color-primary)" }}>{icon}</span>
        <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-gray-500">
          {label}
        </span>
      </div>
      <div className="text-sm text-gray-400 leading-relaxed">{children}</div>
    </div>
  );
}

function FormField({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-gray-500"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full bg-gray-800 border text-white text-sm px-4 py-3 outline-none transition-colors focus:border-[var(--color-primary)] rounded-none ${
          error ? "border-red-500" : "border-white/10"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
