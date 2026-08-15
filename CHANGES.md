# Square One Paving — Overnight Redesign

Architectural-studio redesign executed on `claude/epic-leakey-fc9755`.
All commits pushed to `main` — auto-deployed via Vercel.

---

## Design System

- Typography scale: Playfair Display (italic, editorial) + Inter (300–700)
- Refined color tokens: warm beige (#F5F3F0), charcoal (#1C2026), orange (#C85A3A), stone (#8B8680)
- Editorial density restored across all sections

## Navigation

- Flat white top bar, top-level high-intent links
- Services, Products, Driveways, Projects, Journal, Contact
- Sharp-edged CTA pill

## Homepage Composition (commercial-first)

Order: `Hero → ServicesGrid → StatsBar → ProjectsPreview → VaporBlastingBand → DrivewaysBand → Testimonials → BlogFeed → CTASection`

- **Hero:** static typographic split, no carousel
- **ServicesGrid:** 2×2 sharp cards, vapor-blasting dark variant
- **StatsBar:** dark band with Playfair italic numerals
- **ProjectsPreview:** editorial split-grid, cinematic overlays, commercial-featured
- **VaporBlastingBand:** dark band, 3px orange accent, `bg-[#1C2026]`
- **DrivewaysBand:** lower-priority residential band
- **Testimonials (new):** Playfair italic quotes, white cards, 8px orange rule
- **BlogFeed (new):** 3-up Journal feed
- **CTASection:** dark band, split layout, measured tone

## Standalone Pages

- **`/driveways`** — full SEO landing page. Metro Vancouver + Vancouver Island blocks. Target domains: `vancouverdriveways.com`, `victoriadriveways.com`. Process, Products, Gallery, Local SEO sections.
- **`/vapor-blasting`** — dark editorial rewrite. Hero `bg-[#1C2026]`, What Is It, Applications (6-item grid), Why Square One, CTA.
- **`/projects`** — restored as real page (legacy redirect removed); driven by `lib/projects.ts`
- **`/applications/private-driveways`** — retained from prior work

## Footer

- Dark editorial, 4-col top (Brand, Services, Studio, Contact)
- Regional blocks: Lower Mainland + Vancouver Island city lists
- Bottom bar with tagline + copyright

## Blog Posts — 15 total

**Generalist (batch 0):** 5 posts on BC transit lanes, school zones, commercial parking, stamped asphalt vs concrete, crosswalk art.

**Commercial case studies (batch 1):**
1. UBC & Musqueam Crosswalk
2. Joyce SkyTrain Public Art (TransLink / Renée Van Halm)
3. Langley Events Centre — Circle of Life (Spring Salmon Studio)
4. Brighouse Station TrafficPatternsXD (TransLink Richmond)
5. Every Child Matters New Westminster (Charliss Santos)

**Commercial case studies (batch 2):**
6. Agnes Greenway (Rain Pierre / Katzie First Nation)
7. South Langford Elementary (DecoMark + TrafficPatterns)
8. Little Italy Vancouver Crosswalks
9. Keswick Water Park Burnaby (StreetBond 150 recoat)
10. Mission BC Streetscape (StreetPrint + Pewter)

All posts use Jan Stewart voice — no exclamation points, no superlatives, precise and local. External WP image URLs in frontmatter (enabled by `squareonepaving.com` remote-images config).

## Projects Data

- `lib/projects.ts` replaced with 21 real BC installs
- 10 featured commercial projects (matching blog posts)
- 5 residential/secondary BC projects (Bowen Island, Windsor Gate, Maple Ridge, Tsuyuki, Nanaimo Rainbow)
- Transit, bike, parking, and surface-prep entries retained
- Keswick location corrected (Surrey → Burnaby)

## Config

- `next.config.ts`: added `squareonepaving.com` + `www.squareonepaving.com` to `images.remotePatterns`
- Removed legacy `/projects → /blog` and `/featured-projects → /blog` redirects that conflicted with real `/projects` page
- Added `/case-studies → /projects` redirect

## Brand & Content

- All HUB Surface Systems branding removed (S1 is an independent studio)
- Copy tone constraints: no exclamations, no superlatives, precise, confident, local

## Pre-authorized pushes

Per CLAUDE.md, all commits pushed directly to `main`. Vercel auto-deploys on each push.
