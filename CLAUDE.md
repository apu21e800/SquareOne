# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Client
Square One Paving — BC's trusted decorative pavement studio since 2000.
Independent BC installer of HUB Surface Systems products, serving the Lower Mainland and Vancouver Island.
**Installer, not manufacturer.** HUB makes StreetPrint, StreetBond, TrafficPatterns etc.; Square One installs them. Never "our StreetPrint", never "we developed"; performance figures are HUB's and are attributed; ® / ™ on first mention per page; HUB warrants the material, Square One warrants the workmanship; no pricing, lead times or stock claims.
- Office: 19-11720 Stewart Crescent, Maple Ridge, BC V2X 9E7 (office@squareonepaving.com / 604-612-6209)
- Vancouver Island is a service region with its own line (250-391-0270) — never an office, address or "base"
- Toll-free 1-877-391-0270. No other phone numbers, emails or addresses belong on the site.

## What They Do
Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting
for municipalities, developers, and contractors across BC.

**Services** (4): Stamped Asphalt, Decorative Coatings, Preformed Thermoplastic, Vapor Blasting
**Products** (8): StreetPrint, StreetBond, TrafficPatterns, TrafficPatternsXD, DecoMark, DuraShield, DuraTherm, PreMark
(MMAX and the StreetBond Pro 220 / Pro 250 [MMA] variants were removed 11 Sept 2026 — Square One does not install MMA systems. Do not add them back.)
**Applications**: Crosswalks, Bus & Bike Lanes, Parking Lots, Driveways, School Zones, Public Spaces, Surface Prep

## Answer-engine SEO
FAQPage / BreadcrumbList / Service JSON-LD via `components/JsonLd.tsx`; `/llms.txt` is generated from lib data (app/llms.txt/route.ts); every metadata description goes through `clampDescription` (lib/seo.ts). Service FAQs live in lib/services.ts and may only restate what the page already says.

## Driveway composer
`components/DrivewayComposer.tsx` — pattern × colour sample board (drawn, not photographed). On /driveways and /driveways/[city]; the home materials board deep-links into it; the enquiry arrives at /contact pre-filled.

## Documents (lib/resources.ts)
107 hosted PDFs in /public/docs, page-one previews pre-rendered to /public/docs-previews by `node scripts/doc-previews.mjs` (run it after adding or replacing a PDF; needs poppler + Pillow locally). 36 documents carry `hub:` — the identical file on hubss.com, verified against HUB's own registry. Product pages render a typed rail (components/documents/DocumentRail); /resources and the search overlay share the preview modal.

## Brand
<!-- Type system: ONE face (canon §2.5 as amended 4 Sept 2026, Vern's call) —
     Poppins carries display at 600 spaced caps and body at 400/500. Nothing
     renders below weight 400. The earlier Fraunces + Inter amendment
     (2026-08-28) is superseded. See app/layout.tsx.
     11 Sept 2026: a Futura OPTION exists for comparison only — Jost display +
     Inter text behind <html data-type="futura">, switched by
     components/TypeToggle (visible on preview deployments) or ?type=futura.
     Poppins stays the default until Vern and the client choose. -->
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
- RESEND_API_KEY — from resend.com. **Required in production.** With no key the
  route answers 503 and the visitor is given the office's phone lines and a
  mailto carrying what they typed; it never returns a false "thank you". (It
  did until 21 Sept 2026, and every enquiry from launch to that date went
  nowhere — recoverable only from the Vercel runtime logs.)
- CONTACT_FROM — the sending identity, e.g. `Square One <noreply@send.squareonepaving.com>`.
  Resend only sends from a domain verified in the account. The **root**
  squareonepaving.com carries Google Workspace MX and `v=spf1
  include:_spf.google.com ~all`; **never edit those** or the client loses their
  email. Verify the subdomain `send.squareonepaving.com` in Resend instead and
  point this at it. Defaults to `noreply@squareonepaving.com` (root), which only
  works if the root itself is verified.
- CONTACT_EMAIL — receiving address (defaults to office@squareonepaving.com)
- NEXT_PUBLIC_SITE_URL — public site URL for canonical/sitemap/robots/schema/OG (defaults to https://www.squareonepaving.com in `lib/site.ts` — www, because Vercel serves production on www and the old site's whole Google index was www; every absolute URL derives from `SITE_URL` there — never hard-code the host)

## Architecture

### Data Layer (lib/)
All content is managed via TypeScript interfaces in `lib/`:

**lib/services.ts** — 4 services (Stamped Asphalt, Vapor Blasting, Decorative Coatings, Preformed Thermoplastic)
- Interface: `Service` with slug, name, tagline, descriptions, productsIncluded, applications, idealClients, benefits, imageUrl
- Export: `services[]` array + `getServiceBySlug(slug)` helper

**lib/products.ts** — 8 HUB Surface Systems products (installed by Square One; HUB manufactures)
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
│   ├── page.tsx                # Products listing (8 products)
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
- "decorative-coatings" service → StreetBond, DuraShield products
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
- Sends via Resend from `CONTACT_FROM` to `CONTACT_EMAIL`, reply-to the enquirer
- Honeypot field (`website`) — if filled, answers success without sending
- Validates the email, caps every field, best-effort per-IP throttle (5 / 10 min)
- **Never fails silently.** No key in production → 503; Resend rejection → 502;
  both carry the phone lines, and the form shows a mailto with what they typed.
  Every failure path logs the whole enquiry so a lead is recoverable.
- Dev (NODE_ENV !== production) with no key: logs and succeeds
- Email format: HTML table + a plain-text part, PT timezone timestamp

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
- **Domain**: www.squareonepaving.com is the canonical host in code (`lib/site.ts`); the bare domain 308s to it on Vercel. Live since 19 Sept 2026. If production ever moves to the bare domain, set NEXT_PUBLIC_SITE_URL in Vercel and redeploy.

## Working copy and handoff

Two checkouts exist and they are not equals.

- **The repository on the maintainer's machine is the source of truth.** A cloud
  session reaches it through the device bridge; it is the only checkout whose
  commits can ever reach GitHub.
- **The cloud sandbox copy is a build and test rig** — `next build`, `npm run
  check`, Playwright, Lighthouse, image work. It is disposable.

### The sandbox cannot push. Do not look for a way around it.

Verified 21 Sept 2026, not inferred:

```
remote: access denied by the git proxy: apu21e800/SquareOne is not in this
session's authorized repository set, so the proxy will not inject a credential
for it. To fix, add the repository to the session's sources.
fatal: unable to access 'https://github.com/apu21e800/SquareOne.git/': 403
```

There is no product control that adds a repository to that set — the proxy names
a remedy the UI does not implement (anthropics/claude-code#84581, open, last
reproduced 4 Sept 2026). Do not spend a session hunting for the setting.

The device VM can *fetch* (this repository is public, so anonymous HTTPS read
works) but cannot *push*: no `credential.helper`, no `GH_TOKEN`/`GITHUB_TOKEN`,
no `gh`, and no askpass device — `fatal: could not read Username for
'https://github.com': No such device or address`. Its `$HOME` is session-scoped
(`/sessions/rcw-…/`), so nothing installed there survives; only the mounted
folder persists. It does carry node 22, npm 10, git, tar and rsync, and the
repository's `node_modules` is already on disk.

**Never route around the block with the GitHub MCP** (`push_files`,
`create_or_update_file`). Those build a commit server-side out of file contents:
the tree may match but the SHA and parentage do not, so the local branch
diverges from `origin` permanently — in a repository that auto-deploys to
production, that is an expensive mess for no gain.

So: **pushing is the maintainer's step, and `main` moves only by a pull request
they have authorised.** That second half is deliberate, not friction.

### The handoff rule

Never leave a commit that exists only in the sandbox. In the same turn:

1. `git diff --name-only` (or `--name-status` across the range) in the sandbox.
2. Write those paths into the device checkout — file by file for a normal
   changeset; a tarball only when the change is large or carries binaries past
   the bridge's per-call caps.
3. Commit there, then prove the two checkouts agree:
   `git rev-parse HEAD^{tree}` must return the same hash on both sides.

Step 3 is the whole point. Matching trees mean nothing is stranded; skip it and
a week of work can sit in a sandbox that gets reclaimed.

A write across the bridge can report success and change nothing — it did exactly
that on 21 Sept 2026, while this section was being written. So checksum every
landed file before committing it, and keep the tree comparison as the backstop
that catches whatever the checksum misses.

### The sandbox's branch is a parallel line — its "unpushed" count is meaningless

The sandbox commits the same work separately from the device, so the two
branches never share SHAs even when their trees are identical. A hook counting
`origin/main..HEAD` in the sandbox will report a dozen or more "unpushed"
commits that are already merged into `main` under different hashes. Ignore it.
**The only count that matters is the one in the device checkout.**

Reads through the proxy do work, incidentally: `git fetch` succeeds (verified 21
Sept), so the sandbox's `origin/main` can be kept current and diffed against.
Only *writes* are refused. If the sandbox's remote-tracking ref looks stale,
fetch it rather than assuming the whole remote is unreachable.

### Git in the connected folder needs delete permission — ask for it first

By default the device bridge refuses `rm`/`unlink` inside a connected folder, and
git cannot clean up after itself: every commit leaves `.git/index.lock`,
`.git/HEAD.lock` and `.git/objects/*/tmp_obj_*` behind, and the *next* git
command dies with `Unable to create '.git/index.lock': File exists`. It looks
like a crashed git process. It is not — it is the delete block.

So before the first commit of a session, request delete permission for the
repository folder (one prompt, granted for the rest of the session). Then git
behaves normally. If a session starts with a stale lock already in place, clear
`.git/*.lock` and the `tmp_obj_*` files once and carry on.

Never let this turn into deleting anything else. Files taken off the site still
go to `_to_delete/` and stay there for the maintainer to remove.

### Two sandbox rules that cost real time to rediscover

- Killing `next-server` and starting a new one must be **two separate** shell
  calls. In one call the new server dies with the old.
- Never run two Playwright sweeps, or a sweep and Lighthouse, concurrently. The
  box saturates, the image optimizer wedges, and routes time out — which reads
  as a site bug and is not one.
