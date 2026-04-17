# Square One Paving — Overnight Redesign Changes

**Prepared by:** Based Agency  
**Date:** April 2026  
**Build status:** ✅ Passes (`next build`, 45 pages, 0 errors)

---

## Design System

### `app/globals.css` — Complete rewrite
- **Brand orange** updated: `#D66620` → `#C8601A` (deeper, earthier, distinct from HUBSS #F97316)
- **Surfaces**: White (`#FFFFFF`) is now primary bg (was warm gray). Added `--bg-warm`, `--bg-stone`, `--bg-dark`, `--bg-dark-surface` tokens
- **Text**: Refined scale — `#111111` primary, `#2C2C2C` body, `#5A5A5A` secondary, `#8C8C8C` muted
- **Borders**: Named hex tokens replacing rgba opacity hacks
- **Shadows**: Structured token system (`--shadow-card`, `--shadow-card-hover`, `--shadow-panel`, `--shadow-cta`)
- **Typography**: Fluid `h1`/`h2`/`h3` with `clamp()` sizing; h1 is now `font-weight: 300` (premium signal)
- **Removed**: Gradient text utility, rounded button/card classes, grid pattern utility
- **Font**: Switched from `"Roboto"` to `var(--font-inter)` (Inter)

### `app/layout.tsx` — Font imports added
- **Inter**: Body font, weights 300–700, CSS var `--font-inter`
- **Playfair Display**: Display font for headlines only, weights 400–700, normal + italic, CSS var `--font-display`
- Both variables applied to `<html>` element

---

## New Components

### `components/ui/HubBadge.tsx` — NEW
Reusable "Authorized HUB Surface Systems Applicator" badge with `light` and `dark` variants.
Used in: Hero, Footer, `/driveways` Materials section.
- Light: `border-[#E2DDD8] text-[#5A5A5A]`
- Dark: `border-white/20 text-white/70`

### `components/sections/DrivewaysBand.tsx` — NEW
Full-width 2-column split section on homepage promoting residential driveways.
- Left: gradient placeholder image
- Right: `bg-[#F6F4F0]`, eyebrow, h2, body copy, 4-benefit list with orange left-bar accents, dark CTA button

### `components/sections/Testimonials.tsx` — NEW
3-column testimonial quote cards on warm bg.
- White cards with 3px orange left accent
- Italic quote, orange separator line, client name + context
- 3 placeholder quotes (TODO: replace with real testimonials from Jan)

---

## Rewritten Sections

### `components/sections/Hero.tsx`
- **Removed**: Framer Motion carousel, slide indicators, animated info card
- **Added**: Static full-viewport split (55/45), HubBadge, eyebrow, Inter light h1, orange rule, body, 2 sharp buttons, 4-stat row
- **Image**: Uses `/images/og-image.jpg` (only confirmed available image)
- Static server component — no "use client"

### `components/sections/ServicesGrid.tsx`
- **Removed**: 4-column rounded card grid
- **Added**: 2×2 grid with `gap-px bg-[#E2DDD8]` (architectural joined-tile look)
- Vapor Blasting card gets dark treatment (`bg-[#1C2026]`) as the differentiator
- Gradient placeholder divs replace missing images
- Hardcoded editorial copy per brief

### `components/sections/StatsBar.tsx`
- **Removed**: White background, vertical orange accent bars
- **Added**: Full-width `bg-[#1C2026]` dark band with Playfair Display italic numbers via `var(--font-display, serif)`

### `components/sections/ProjectsPreview.tsx`
- **Removed**: Rounded cards, service tags, year badges, rounded CTA button
- **Added**: Asymmetric `gap-px` grid, gradient placeholders with bottom title/city overlay
- First card is square (taller), others standard — architectural feel

### `components/sections/VaporBlastingBand.tsx`
- **Removed**: SVG mist illustration, rounded card, Framer Motion
- **Added**: 2-column split — dark content left, before/after visual right
- Feature grid uses `flatMap` to avoid React key warnings

### `components/sections/CTASection.tsx`
- **Removed**: Dark `#32373C` background, orange gradient accent bar
- **Added**: Full-width `bg-[#C8601A]` orange band — the orange moment on the page
- White primary button + outlined phone link

---

## Page Rebuilds

### `app/page.tsx`
New section order:
1. Hero → 2. ServicesGrid → 3. DrivewaysBand → 4. StatsBar → 5. ProjectsPreview → 6. VaporBlastingBand → 7. Testimonials → 8. CTASection

Removed from homepage: ApplicationsSection, DrivewayCTA, TrustStrip

### `app/driveways/page.tsx` — Full rebuild (5 sections)
1. **Hero** — split layout, h1 "Driveways that earn a second look"
2. **Process** — 4-step grid with large outlined numerals
3. **Materials** — StreetPrint + StreetBond cards + HubBadge
4. **Local SEO** — service area copy targeting Lower Mainland + Island
5. **Bottom CTA** — dark band with quote + phone

### `app/vapor-blasting/page.tsx` — Full rebuild (5 sections)
1. **Hero** — dark split, h1 "The most thorough surface preparation in BC"
2. **What Is VB** — explanatory copy + 5-row comparison table (vapor vs sandblasting)
3. **Applications** — 6-card grid with Lucide icons
4. **Why S1** — installer-first positioning with 3 credential rows
5. **CTA** — orange band

---

## Navigation & Footer

### `components/Nav.tsx` — Targeted edits
- Background: `bg-white/97 backdrop-blur-md` → flat `bg-white border-[#E2DDD8]`
- Desktop links: Added **Driveways** (`/driveways`) as top-level link between Projects and Vapor Blasting
- Desktop CTA: Rounded orange → sharp dark `#1C2026` button (hover shifts to `#C8601A`)
- Phone number removed from desktop nav (clutter reduction)
- All Vapor Blasting links unified to `/vapor-blasting` (was `/services/vapor-blasting`)
- All `#C85A3A` hover colors updated to `#C8601A`
- Logo path: `/images/logo/S1_Square.png` → `/images/square-one-logo.png` (confirmed existing)
- Mobile: Added Driveways + Vapor Blasting as direct top-level drawer links
- Mobile CTA: Rounded orange → sharp dark button

### `components/Footer.tsx` — Rewrite
- Background: `#32373C` → `#1C2026` (deeper, matches dark design system)
- Orange accent bar: gradient → solid 3px `#C8601A`
- Col 1: Added `<HubBadge variant="dark" />` below logo
- Col 4 (Contact): Restructured into two regional blocks with orange left-bar accents (Lower Mainland + Vancouver Island)
- Bottom bar: Added "Authorized HUB Surface Systems Applicator · BC Canada" to copyright line

---

## TODOs for Jan / Based Agency

- [ ] **Real hero image**: Replace `/images/og-image.jpg` in `Hero.tsx` with actual stamped asphalt project photo. Drop into `/public/images/hero/hero.jpg` and update the `src`.
- [ ] **Service card images**: Add project photos to `/public/images/` and update `ServicesGrid.tsx` service cards.
- [ ] **Project photos**: Add real project images and update `lib/projects.ts` `imageUrl` fields. `ProjectsPreview.tsx` will automatically use them.
- [ ] **Testimonials**: Replace placeholder quotes in `components/sections/Testimonials.tsx` with real client feedback from Jan.
- [ ] **Driveways page gallery**: The gallery section was specified but not implemented (no images available). Add a before/after slider component when images arrive.
- [ ] **Phone numbers**: Confirm all phone numbers are current in `Footer.tsx` and `Nav.tsx`.
- [ ] **Vapor Blasting service page**: `/services/vapor-blasting` still exists and is separate from `/vapor-blasting`. Consider redirect or consolidation.
