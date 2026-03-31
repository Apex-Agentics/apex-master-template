# APEX AGENTICS — Master Template Build

## Project Initialization
This is a NEW Next.js 15 project. If package.json does not exist,
initialize with:
npx create-next-app@latest . --typescript --tailwind --eslint --app
--src-dir no --import-alias "@/*"

## Architecture
- Next.js 15, App Router, TypeScript, Tailwind CSS, Shadcn UI
- All content is driven by /config/config.json — never hardcode client data
- Components receive all content via props from the config loader
- No component should import directly from config.json — always
  through lib/config.ts
- Multi-page routing via app/page.tsx (home) and app/[slug]/page.tsx
- lib/renderComponent.tsx is the central component registry

## config.json Shape (source of truth)
{
  "client": { "name": "", "slug": "", "tier": 1, "package": "Full Site", "phone": "", "address": "", "city": "", "state": "" },
  "brand": {
    "logo_url": null, "primary_color": "",
    "secondary_color": "", "font_heading": "Inter", "font_body": "Inter"
  },
  "seo": { "title": "", "description": "" },
  "pages": ["home", "services", "about", "contact", "pricing", "faq"],
  "nav_links": [{ "label": "", "href": "" }],
  "components": {
    "home":     ["NavBar","HeroSection","ServiceGrid","TestimonialCarousel","PricingTable","FAQAccordion","CTABanner","Footer"],
    "services": ["NavBar","ServiceGrid","PricingTable","CTABanner","Footer"],
    "about":    ["NavBar","TeamSection","CTABanner","Footer"],
    "contact":  ["NavBar","ContactForm","GoogleMapEmbed","Footer"],
    "pricing":  ["NavBar","PricingTable","FAQAccordion","CTABanner","Footer"],
    "faq":      ["NavBar","FAQAccordion","CTABanner","Footer"]
  },
  "webhooks": {
    "contact_form": null, "contact_form_enhanced": null,
    "appointment_url": null, "calendly_mode": "link", "payment_url": null
  },
  "lead_magnet": { "webhook_url": null, "headline": "", "button_text": "", "asset_url": null },
  "review_request": { "google_review_url": null, "webhook_url": null, "prompt_text": "" },
  "map_embed_url": null,
  "services": [{ "icon": "", "title": "", "description": "" }],
  "testimonials": [{ "name": "", "company": "", "quote": "", "rating": 5 }],
  "team": [{ "name": "", "title": "", "bio": "", "photo_url": null }],
  "pricing": [{ "name": "", "price": "", "billing_period": "/mo", "features": [], "is_featured": false, "cta_text": "Get Started", "cta_url": "/contact" }],
  "faq": [{ "question": "", "answer": "" }],
  "content": {
    "hero": { "headline": "", "subheadline": "", "cta_text": "", "cta_href": "", "background_image_url": null },
    "cta_banner": { "headline": "", "subheadline": "", "cta_text": "", "cta_href": "" },
    "stripe_payment": { "label": "", "url": null, "variant": "primary" },
    "footer": { "tagline": "", "social_links": [] }
  }
}

## Package → Page Matrix
- Starter:   pages ["home","contact"]
- Full Site: pages ["home","services","about","contact","pricing","faq"]
- Tier 2:    same as Full Site, tier: 2

## Component Rules
- Layer 1: Required on every build, no conditional logic needed
- Layer 2: Conditionally rendered based on config.components array
- Layer 3: Only renders if config.client.tier === 2
- Layer 4: Only renders if corresponding webhook URL is non-null in config

## N8N Pipeline — Key Rules
- When adding a required field to lib/config.ts, ALSO add it to the schema
  object literal in the Build Prompt JS Code node, or Claude will omit it
- Tally sends verbose option labels — Transform Tally Payload normalizes
  package values via startsWith() before the packageMap lookup
- social_links always output as [] — never generate fake social URLs

## File Naming
- Components: PascalCase (NavBar.tsx, HeroSection.tsx)
- Utilities: camelCase (config.ts, registry.ts)
- All components must be typed — no `any` types

## Do Not
- Hardcode any client name, color, copy, or URL
- Install any package not in the approved list below
- Create separate CSS files — Tailwind utility classes only
- Use `any` TypeScript type anywhere

## Approved Packages
- next, react, react-dom, typescript
- tailwindcss, @shadcn/ui
- lucide-react (icons)
- framer-motion (animations, use sparingly)
- @supabase/supabase-js (Layer 3 only)
- stripe, @stripe/stripe-js (Layer 3 only)
- zod (config validation)
