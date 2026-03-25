# Square One Paving — Project Intelligence File

## Client
Square One Paving — BC's trusted decorative pavement applicator since 2000.
Authorized HUB Surface Systems applicator serving Western Canada.
- Office: Ladysmith, BC (info@squareonepaving.ca / 604-309-8212)

## What They Do
Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting
for municipalities, developers, and contractors across BC. Products include
StreetPrint, StreetBond SR, TrafficPatterns, DecoMark, DuraTherm, and mobile
vapor blasting equipment.

Services: Stamped Asphalt, Decorative Coatings, Preformed Thermoplastic, Vapor Blasting
Applications: Crosswalks, Bus & Bike Lanes, Parking Lots, School Zones, Surface Prep

## Brand
- Colors: Warm beige background (#F5F3F0), orange accent (#C85A3A), stone (#8B8680), charcoal (#2D2D2D)
- Tone: Professional, practical, BC-focused
- Positioning: "BC's Trusted Decorative Pavement Applicators" — quality work that lasts
- Service area: Lower Mainland + Vancouver Island

## Tech Stack
- Next.js 16.1.6 (App Router)
- Tailwind CSS 4
- TypeScript (strict)
- Resend for transactional email (contact form)
- Images: /public/images/ — swap by replacing files, no code change needed

## Environment Variables
Copy .env.local.example → .env.local and fill in:
- RESEND_API_KEY — from resend.com (required for contact form)
- CONTACT_EMAIL — receiving address (defaults to info@squareonepaving.ca)

## Project Structure
squareone-website/
├── app/
│   ├── page.tsx (landing page)
│   ├── services/
│   │   ├── page.tsx (services listing)
│   │   └── [slug]/page.tsx (service detail)
│   ├── projects/
│   │   ├── page.tsx (project listing)
│   │   └── [slug]/page.tsx (project detail)
│   ├── about/
│   ├── contact/
│   ├── privacy/
│   └── terms/
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── S1Logo.tsx
│   └── sections/ (Hero, StatsBar, ServicesGrid, etc.)
├── lib/
│   ├── services.ts (service data)
│   ├── projects.ts (project data)
│   └── seo.ts (metadata helper)
├── public/
│   └── images/
└── CLAUDE.md

## Pages
1. Landing page — Hero, StatsBar, ServicesGrid, VaporBlastingBand, ProjectsPreview, TrustStrip, CTA
2. Services listing — grid of 4 services
3. Service detail — full service info with applications, benefits
4. Projects listing — filterable grid by service/application
5. Project detail — gallery + details + related projects
6. About — company story, service area
7. Contact — form + location info

## Adding Content
- New project: add entry to lib/projects.ts
- New service: add entry to lib/services.ts (rare)
- Swap hero image: replace /public/images/hero.jpg

## Conversion Goals
Primary CTA: "Request a Quote" → Contact form
Secondary: Browse projects → Contact form

## Commands
npm run dev     # local development
npm run build   # production build
npm run start   # run production locally

## Deploy
Vercel — connected to GitHub, auto-deploys on push to main
