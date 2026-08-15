# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Client
Square One Paving — BC's trusted decorative pavement studio since 2000.
Independent BC pavement specialists serving the Lower Mainland and Vancouver Island.
- Office: Ladysmith, BC (info@squareonepaving.ca / 604-309-8212)

## What They Do
Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting
for municipalities, developers, and contractors across BC.

**Services** (4): Stamped Asphalt, Decorative Coatings, Preformed Thermoplastic, Vapor Blasting
**Products** (9): StreetPrint, StreetBond, TrafficPatterns, TrafficPatternsXD, DecoMark, DuraShield, DuraTherm, MMAX, PreMark
**Applications**: Crosswalks, Bus & Bike Lanes, Parking Lots, Driveways, School Zones, Public Spaces, Surface Prep

## Brand
- Colors: Warm beige background (#F5F3F0), orange accent (#C85A3A), stone (#8B8680), charcoal (#2D2D2D)
- Tone: Professional, practical, BC-focused
- Positioning: "BC's Trusted Decorative Pavement Applicators" — quality work that lasts
- Service area: Lower Mainland + Vancouver Island

## Tech Stack
- Next.js 16.1.6 (App Router)
- Tailwind CSS 4
- TypeScript (strict)
- Resend for transactional email (contact form with honeypot spam protection)
- MDX for blog content (gray-matter + next-mdx-remote)
- Framer Motion for animations
- Form validation: react-hook-form + zod
- Image gallery: yet-another-react-lightbox
- Images: /public/images/ — swap by replacing files, no code change needed

## Environment Variables
Copy .env.local.example → .env.local and fill in:
- RESEND_API_KEY — from resend.com (required for contact form)
- CONTACT_EMAIL — receiving address (defaults to info@squareonepaving.ca)
- NEXT_PUBLIC_SITE_URL — public site URL for sitemap/OG tags (defaults to https://squareonepaving.ca)

## Architecture

### Data Layer (lib/)
All content is managed via TypeScript interfaces in `lib/`:

**lib/services.ts** — 4 services (Stamped Asphalt, Vapor Blasting, Decorative Coatings, Preformed Thermoplastic)
- Interface: `Service` with slug, name, tagline, descriptions, productsIncluded, applications, idealClients, benefits, imageUrl
- Export: `services[]` array + `getServiceBySlug(slug)` helper

**lib/products.ts** — 9 HUB Surface Systems products
- Interface: `Product` with slug, name, category, descriptions, keyBenefits, applications, image, galleryImages, **serviceSlug** (links product → service)
- Categories: "Stamped Asphalt" | "Decorative Coatings" | "Thermoplastic" | "Surface Protection"
- Export: `products[]` array + `getProductBySlug(slug)` helper

**lib/projects.ts** — Project portfolio data (interface defined here)

**lib/blog.ts** — MDX blog system using gray-matter
- Reads from `content/blog/*.mdx` (or `.md`)
- Interface: `BlogPost` with slug, title, description, date, author, category, featured_image, tags, content
- Frontmatter parsed with gray-matter, sorted by date descending
- Export: `getAllPosts()` (metadata only) + `getPostBySlug(slug)` (full post with content)

**lib/seo.ts** — Metadata helper for consistent SEO across pages

### Routing Structure
```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout (Nav + Footer)
├── services/
│   ├── page.tsx                # Services listing (4 services)
│   ├── [slug]/page.tsx         # Service detail
│   └── vapor-blasting/page.tsx # Dedicated vapor blasting page
├── products/
│   ├── page.tsx                # Products listing (9 products)
│   └── [slug]/page.tsx         # Product detail (gallery + specs)
├── applications/
│   ├── page.tsx                # Applications listing
│   └── private-driveways/page.tsx  # Example application detail
├── projects/
│   ├── page.tsx                # Projects listing (filterable)
│   └── [slug]/page.tsx         # Project detail (gallery + related)
├── blog/
│   ├── page.tsx                # Blog listing
│   └── [slug]/page.tsx         # Blog post (MDX rendered)
├── driveways/page.tsx          # Dedicated driveways page
├── vapor-blasting/page.tsx     # Vapor blasting standalone page
├── about/page.tsx
├── contact/
│   ├── page.tsx
│   └── layout.tsx              # Contact-specific layout
├── privacy/page.tsx
├── terms/page.tsx
└── api/
    └── contact/route.ts        # Resend email API (POST)
```

### Service-Product Relationship
Products link to services via `serviceSlug`:
- "stamped-asphalt" service → StreetPrint, TrafficPatternsXD products
- "decorative-coatings" service → StreetBond, MMAX, DuraShield products
- "preformed-thermoplastic" service → TrafficPatterns, DecoMark, DuraTherm, PreMark products
- "vapor-blasting" service → standalone (no products)

### Legacy Redirects (next.config.ts)
136+ redirects from old URL structure. This site replaced a WordPress site with different URL patterns:
- Old product pages → `/products/[slug]`
- Old application pages → `/applications/[slug]` or `/driveways`
- Old blog posts → `/blog/[slug]`
- Old case studies → `/blog` (consolidated)

When adding new content, check `next.config.ts` redirects first to avoid conflicts.

### API Routes
**POST /api/contact** — Contact form submission
- Sends email via Resend to `process.env.CONTACT_EMAIL`
- Honeypot field (`website`) for spam protection — if filled, silently succeeds without sending
- Dev fallback: logs to console when RESEND_API_KEY is missing
- Email format: HTML table with form fields + PT timezone timestamp

## Adding Content

### Blog Posts
1. Create MDX file: `content/blog/my-post-slug.mdx`
2. Add frontmatter:
```yaml
---
title: "Post Title"
description: "Meta description for SEO"
date: "2026-04-16"
author: "Square One Paving"
category: "Case Studies" # or "Products", "Applications", etc.
featured_image: "/images/blog/my-post/hero.jpg"
tags: ["stamped asphalt", "crosswalks", "bc"]
---
```
3. Write content in MDX (supports JSX components)
4. Blog automatically appears on `/blog` (sorted by date)

### Products
- Add to `lib/products.ts` → `products[]` array
- Link to parent service via `serviceSlug` field
- Product auto-appears on `/products` and linked service page

### Projects
- Add to `lib/projects.ts` → `projects[]` array
- Upload images to `/public/images/projects/[project-slug]/`
- Project auto-appears on `/projects` listing

### Services
- Add to `lib/services.ts` → `services[]` array (rarely changes — only 4 core services)

### Images
- Swap by replacing files in `/public/images/` — no code changes needed
- Hero image: `/public/images/hero.jpg`
- Maintain directory structure: `/public/images/[type]/[slug]/[image-name].jpg`

## Conversion Goals
Primary CTA: "Request a Quote" → Contact form
Secondary: Browse projects/products → Contact form

## Commands
```bash
npm run dev     # Start dev server (http://localhost:3000)
npm run build   # Production build (validates types, generates static pages)
npm run start   # Run production build locally

# No test/lint scripts configured — ESLint config present but not in package.json scripts
```

## Development Notes
- TypeScript strict mode enabled — never use `any`
- All data changes (services, products, projects) require code changes in `lib/` files
- Blog is the only content type that supports non-developer edits (MDX files in `content/blog/`)
- Contact form requires RESEND_API_KEY to actually send emails (dev mode just logs to console)
- Form has honeypot spam protection via hidden `website` field
- Images are direct file references — no image optimization service, uses Next.js `<Image>` component

## Deployment
- **Platform**: Vercel
- **Repo**: Connected to GitHub
- **Auto-deploy**: Push to `main` branch triggers production deployment
- **Environment variables**: Set in Vercel dashboard (RESEND_API_KEY, CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL)
- **Domain**: squareonepaving.ca (and .com redirect)
