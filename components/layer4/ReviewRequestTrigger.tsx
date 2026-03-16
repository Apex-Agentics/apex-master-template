"use client";

import { Star } from "lucide-react";
import type { SiteConfig } from "@/lib/config";

interface ReviewRequestTriggerProps {
  reviewRequest: SiteConfig["review_request"];
}

/**
 * ReviewRequestTrigger — Layer 4 component.
 * Renders a prompt with a CTA link to the Google review page.
 * On click, fires a fire-and-forget POST to the optional webhook_url so
 * N8N can track click-throughs without blocking navigation.
 * Returns null silently if google_review_url is null.
 */
export default function ReviewRequestTrigger({
  reviewRequest,
}: ReviewRequestTriggerProps) {
  if (!reviewRequest.google_review_url) return null;

  function handleClick() {
    if (!reviewRequest.webhook_url) return;

    // Fire-and-forget — do not await, do not block navigation
    fetch(reviewRequest.webhook_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "review_cta_clicked",
        timestamp: new Date().toISOString(),
        destination: reviewRequest.google_review_url,
      }),
    }).catch((err) => {
      console.error("[ReviewRequestTrigger] Webhook ping failed:", err);
    });
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Star decoration */}
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={22}
              className="fill-amber-400 text-amber-400"
            />
          ))}
        </div>

        <p
          className="text-xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {reviewRequest.prompt_text}
        </p>

        <a
          href={reviewRequest.google_review_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Star size={16} />
          Leave a Google Review
        </a>
      </div>
    </section>
  );
}
