"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { SiteConfig } from "@/lib/config";

interface LeadMagnetCaptureProps {
  leadMagnet: SiteConfig["lead_magnet"];
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * LeadMagnetCapture — Layer 4 component.
 * Single email capture form. On success, POSTs { email, timestamp } to the
 * configured N8N webhook and optionally surfaces a download button if
 * asset_url is provided in config.
 * Returns null silently if webhook_url is null.
 */
export default function LeadMagnetCapture({
  leadMagnet,
}: LeadMagnetCaptureProps) {
  if (!leadMagnet.webhook_url) return null;
  return <LeadMagnetCaptureInner leadMagnet={leadMagnet} webhookUrl={leadMagnet.webhook_url} />;
}

function LeadMagnetCaptureInner({
  leadMagnet,
  webhookUrl,
}: {
  leadMagnet: SiteConfig["lead_magnet"];
  webhookUrl: string;
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }
    setEmailError(null);
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error(`Webhook responded with HTTP ${res.status}`);

      setStatus("success");
    } catch (err) {
      console.error("[LeadMagnetCapture] Submission failed:", err);
      setStatus("error");
    }
  }

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="max-w-xl mx-auto text-center">
        <h2
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {leadMagnet.headline}
        </h2>

        {status === "success" ? (
          <div className="bg-white rounded-xl p-6 mt-4">
            <p className="font-semibold text-gray-900 text-lg mb-1">
              You&apos;re in!
            </p>
            <p className="text-gray-500 text-sm mb-5">
              Check your inbox — your resource is on its way.
            </p>
            {leadMagnet.asset_url && (
              <a
                href={leadMagnet.asset_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Download size={16} />
                Download Now
              </a>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1">
              <input
                type="email"
                placeholder="Your work email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                className={`w-full rounded-xl px-4 py-3 text-sm text-gray-900 outline-none border ${
                  emailError ? "border-red-400 bg-red-50" : "border-transparent bg-white"
                } focus:ring-2 focus:ring-white`}
              />
              {emailError && (
                <p className="mt-1 text-xs text-white/90 text-left">
                  {emailError}
                </p>
              )}
              {status === "error" && (
                <p className="mt-1 text-xs text-white/90 text-left">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 px-6 py-3 rounded-xl text-sm font-semibold bg-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ color: "var(--color-secondary)" }}
            >
              {status === "submitting" ? "Sending…" : leadMagnet.button_text}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
