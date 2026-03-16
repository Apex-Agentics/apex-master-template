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

## config.json Shape (source of truth)
{
  "client": { "name": "", "slug": "", "tier": 1 },
  "brand": {
    "logo_url": "", "primary_color": "", 
    "secondary_color": "", "font_heading": "", "font_body": ""
  },
  "seo": { "title": "", "description": "" },
  "pages": ["home"],
  "components": { "home": ["NavBar", "HeroSection", "Footer"] },
  "webhooks": { "contact_form": null },
  "content": {
    "hero": { "headline": "", "subheadline": "", "cta_text": "" }
  }
}

## Component Rules
- Layer 1: Required on every build, no conditional logic needed
- Layer 2: Conditionally rendered based on config.components array
- Layer 3: Only renders if config.client.tier === 2
- Layer 4: Only renders if corresponding webhook URL is non-null in config

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