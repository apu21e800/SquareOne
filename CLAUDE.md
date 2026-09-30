# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Client
Square One Paving — BC's trusted decorative pavement studio since 2000.
Independent BC installer of HUB Surface Systems products, serving the Lower Mainland and Vancouver Island.
**Installer, not manufacturer.** HUB makes StreetPrint, StreetBond, TrafficPatterns etc.; Square One installs them. Never "our StreetPrint", never "we developed"; performance figures are HUB's and are attributed; ® / ™ on first mention per page; no warranty wording anywhere on the site (the client on the preview, 6 Oct 2026: "remove anything about warranty"; the terms page's legal "No warranty on the Site" clause is not about the work and stays); no pricing, lead times or stock claims.
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
`components/DrivewayComposer.tsx` — pattern × colour sample board (drawn, not photographed). The file exists but renders nowhere as of 26 Sept 2026: no page imports it (held back from /driveways on 19 Sept; the home materials board links to /patterns and the colour chart instead). Do not build on it; leaving or moving it is the maintainer's call (docs/OWN-COMPANY-BRIEF.md §2).

## Documents (lib/resources.ts)
107 hosted PDFs in /public/docs, page-one previews pre-rendered to /public/docs-previews by `node scripts/doc-previews.mjs` (run it after adding or replacing a PDF; needs poppler + Pillow locally). 36 documents carry `hub:` — the identical file on hubss.com, verified against HUB's own registry. Product pages render a typed rail (components/documents/DocumentRail); /resources and the search overlay share the preview modal.

## Brand
Current as of 7 Oct 2026 (the own-company restyle of 27 Sept, docs/OWN-COMPANY-BRIEF.md, and the client's rounds since). The surface lives in `app/own.css`, which loads last and wins; `app/globals.css` and `app/refine.css` hold the history under it.
- Type: Futura LT Bold for display (an opener's H1 in capitals, section headings in sentence case), Futura Book for a heading's closing phrase; Inter for everything read, including the small voice (labels, captions, notes), with no italics in the design's voice (2 Oct 2026, the client). No tracked capitals.
- Colour: white ground (#FFFFFF) with two light neutral greys (#F1F2F4, #E6E8EB) and hairlines (#E1E4E7); ink #14161A; charcoal (#2D3033) for the footer and the phone quote bar. Buttons are ink at rest and fill with Square One orange on hover; the orange (#C85A3A accent, #B24E2E fill, white on it 5.2 : 1, #963F24 pressed) is the button under a photo opener's H1, the quote form's send, link and menu hovers. The colour card's edge (components/ui/ColourEdge.tsx, 7 Oct 2026): the chart's ten strongest colours with Square One orange among them, warm to cool (Marigold, Nutmeg, the orange, Paprika, Terra Cotta, the three cycle-lane greens, SR Safety Blue, Patriot Blue; Vern, 7 Oct: "make the colours a bit more punchy, they don't really show up"), since 8 Oct 2026 its colours live in `lib/palettes.ts`, the only source of the band, which writes them as CSS variables (--edge-band, --edge-1 to --edge-10, --water-band) on :root through a <style> in <head> (app/layout.tsx); never set them inline on <body> again, an inline style beats the palette rules. **Four palettes** (8 Oct 2026, Vern after the client: "an easter egg in the hero… cycle through style options… apply site wide"): Spectrum (the default, byte-identical to the 7 Oct band), Greyscale (the chart's greys and one Square One orange), Earth (the Drawn to scale strip), Blueprint (cyanotype blues, marked up in Square One orange). html[data-palette] picks one; `PALETTE_BOOT` in <head> sets it before the first paint from `?palette=` or localStorage `s1-palette`; the home hero's ledger has the switch (a small copy of the band beside the frame counter; components/sections/Hero.tsx, lib/use-palette.ts). Every palette keeps the same layout: chip 3 is Square One orange in every palette, chips 5 and 8 the two lightest (section labels never take them), chip 10 the one dark anchor. A palette changes only the card's edge and what reads it; buttons, links, the quote form, focus rings and product colours shown as colours never change. It runs 8px along the foot of every photo opener, the home reel's clock (a 15% white veil on the track, a white playhead) and the footer, 6px under the menu and across the search's top, 4px over the process steps and the quote form's sections, and every section label is led by a square chip from it (the orange first). No greys or sands in Spectrum: they vanished on photographs and on white (Greyscale and Earth carry them on purpose, kept to chips 5 and 8 and between darker neighbours). Vapour blasting keeps its water blue (#1F6FB2, --vapour; --water-band) on its own page and bands. The copper in the logo is the logo's own. Never HUB's cream (#F6F4EF), near-black (#101010) or bright orange (#F97316).
- Shape: square corners for the interface (buttons, fields, chips, swatches); photographs and search's panels round all four corners 10px (--img-r in app/own.css, 7 Oct 2026: "a bit too much right angles"; a square top-left corner was tried and read as a mistake); full-bleed openers stay square; rows divided by hairlines instead of cards; captions under photographs, never over them (the hero reel and the page openers excepted); one primary button per view ("Get a quote"); links are underlined ink; no arrow glyphs in copy; no em dashes in copy.
- Tone: professional, practical, BC-focused; plain, local, "we". Supplier words (specify, submittal, spec package) only on /specifiers.
- Positioning: "BC's Trusted Decorative Pavement Applicators": quality work that lasts
- Service area: Lower Mainland + Vancouver Island

## Tech Stack
- Next.js 16.4.0 (App Router), pinned exactly (`next`, `eslint-config-next`,
  `@next/mdx`); moved from 16.1.6 in the security sweep of 9 Oct 2026. Take
  patch releases of the same major as they come; test before a major.
- Tailwind CSS 4
- TypeScript (strict)
- Resend for transactional email (the quote form; spam handling under "Forms and spam")
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
- CONTACT_FROM — the sending identity. Defaults to
  `Square One <noreply@squareonepaving.com>`. Resend only sends from a domain
  verified in the account, and the **root** is verified (checked 9 Oct 2026:
  DKIM at `resend._domainkey.squareonepaving.com`, bounces handled at
  `send.squareonepaving.com`, which is Resend's return path, not a sending
  domain; never set this to an address @send.). The root also carries Google
  Workspace MX and `v=spf1 include:_spf.google.com ~all`; **never edit those**
  or the client loses their email. No DMARC record yet (Vern's call, at GoDaddy).
- CONTACT_EMAIL — receiving address (defaults to office@squareonepaving.com)
- ANTHROPIC_API_KEY — the quote form's spam screen (lib/form-screen.ts). Unset,
  narrow backup rules decide. Production only, with a monthly spend limit.
- FORM_SCREENED_EMAIL — where held-back enquiries go, marked "[Screened]".
  Unset, they go to CONTACT_EMAIL, still marked, so nothing is ever lost.
- SANITY_REVALIDATE_SECRET — the Sanity webhook's signing secret (docs/CMS.md);
  /api/revalidate refuses anything it didn't sign.
- NEXT_PUBLIC_SITE_URL — public site URL for canonical/sitemap/robots/schema/OG (defaults to https://www.squareonepaving.com in `lib/site.ts` — www, because Vercel serves production on www and the old site's whole Google index was www; every absolute URL derives from `SITE_URL` there — never hard-code the host)
- The CMS (docs/CMS.md) and the blog and social automation (docs/AUTOMATION.md)
  have their own: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
  SANITY_REVALIDATE_SECRET; CRON_SECRET, ANTHROPIC_API_KEY,
  SANITY_API_WRITE_TOKEN, BLOG_DRAFT_NOTIFY, BUFFER_API_KEY, AUTOMATION_PAUSED.

## Blog and social automation (lib/automation/, docs/AUTOMATION.md)
Two Vercel crons (vercel.json, production only). Weekly, `/api/cron/draft-post`
writes a project story from the record for the next project with no post and
saves it as an **unpublished** Sanity draft with "Notes for the editor" (fact
check, style check). Daily, `/api/cron/social-drafts` turns each newly
published post into Instagram, Facebook and LinkedIn **drafts** in Buffer.
Nothing publishes itself. The drafter may state only what
`lib/automation/facts.ts` hands it; `lib/automation/style.ts` is the house style
and the canon as rules (keep it free of the literal tokens lint-claims bans:
lint-claims reads lib/). The pipelines take their services as arguments, so
they can be run end to end against fakes; they never read the filesystem.

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

**lib/projects.ts** — Project portfolio data (interface defined here); since
9 Oct 2026 the fallback behind the Studio.

**lib/projects-cms.ts** — `getProjects()` / `getProject(slug)`: what every page
that shows a project reads (/projects, project pages, the home six, application
and service pages, the sitemap). The Studio's version wins field by field, the
record fills gaps and stands in when Sanity can't be reached; a Studio photo
that is the site's own file (same original name, uncropped) is served from the
site. With the Studio as seeded, all 31 come out exactly as the record
(`npm run test:projects`). Search (lib/search-index.ts) still reads the record.

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
**POST /api/contact** — the quote form (see "Forms and spam" below)
- Sends via Resend from `CONTACT_FROM` to `CONTACT_EMAIL`, reply-to the enquirer
- A real visitor's message is never refused or dropped; doubtful mail goes to
  `FORM_SCREENED_EMAIL` marked "[Screened]". The rules and the mail live in
  `lib/contact.ts` (a route file may only export its handlers).
- **Never fails silently.** No key in production → 503; Resend rejection → 502;
  both carry the phone lines, and the form shows a mailto with what they typed.
  The log keeps one line per request and no personal details (9 Oct 2026;
  until then failures logged the whole enquiry).
- Dev (NODE_ENV !== production) with no key: logs the decision and succeeds
- Email format: HTML table + a plain-text part, PT timezone timestamp

**POST /api/revalidate** — Sanity's webhook; signed (`parseBody` from
`next-sanity/webhook`), fails closed with no secret or a bad signature.

## Forms and spam (9 Oct 2026)
The quote form posts to /api/contact through lib/post-form.ts. The same fix
as the manufacturer's site of 6 Oct 2026, where SEO pitches and phishing
were reaching the office. The rule since: a real visitor's message is never
refused or dropped; anything doubtful goes to FORM_SCREENED_EMAIL instead of
office@, marked "[Screened]" with a banner saying why and its links disabled,
and the visitor sees "sent".
- Vercel BotID: instrumentation-client.ts adds proof to the form's request;
  the route asks BotID about it (2.5 s limit). Only a request with no proof
  and no Origin from this site gets a 403 (a script). A doubted browser, a
  filled honeypot (`website`, sent as typed since 9 Oct; it used to be
  hardcoded "") and a flood from one connection (over five in ten minutes)
  are held, not refused.
- lib/post-form.ts: if BotID's script can't load (content blockers, strict
  office networks), the form sends again without it after an error or 15 s,
  and the route screens it ("unchecked"). Each press of the send button
  carries one `submissionId`, passed to Resend as the idempotency key, so a
  resent form is mailed once (a duplicate answer from Resend means "sent").
- An address the office can't answer ("jane@shaw") with no phone number is
  sent back to the visitor to check, as before 9 Oct; with a phone it goes
  through without a reply-to.
- lib/form-screen.ts: Claude Haiku reads the submission (phone numbers, email
  addresses, postal codes and plain street addresses redacted; never the
  phone field, the full email or the "Where is it?" field) and calls it
  genuine or spam. If it can't answer, narrow rules decide (an outside link
  that isn't .ca/.gov/.edu, this site, the maker's site or the sender's own;
  a pitch phrase) and log an error. Keep the prompt's last line: when unsure,
  genuine. The prompt never names the maker. The privacy page (section 4)
  says exactly what the screen is sent; change both together.
- `npm run test:forms` tests the rules, the redaction and the route's
  decisions (lib/contact.ts) with no network and no mail.
- One log line per request, `[contact] {"form","outcome","gate","by","reason"}`,
  no personal details.
- Probing production: only with a body the route rejects without mailing.
  `{}` from a script gets 403 (no BotID proof, no Origin); `{}` with
  `Origin: https://www.squareonepaving.com` gets 400. Never a filled-in form.

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
- The office adds and edits projects in the Studio (docs/CMS.md); a new one
  is listed at once and gets its page on first request.
- A developer can still add to `lib/projects.ts` → `projects[]` (the
  fallback). For a slug the Studio also has, the Studio's fields win, so
  edit there, not in the file. Extra photographs can still go in
  `/public/images/projects/[project-slug]/`.

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
npm run check   # disk manifest, tsc, lint-claims, check-links
npm run test:forms  # the quote form's spam rules and route decisions (no network, no mail)
```

## Development Notes
- **Disk reads go through `lib/disk.ts`** (7 Oct 2026). With Sanity connected every page also rebuilds itself on Vercel's servers every 60 seconds, and there `public/` is not in the function bundle (excluded in next.config.ts for size) and `content/blog` sits only beside the blog routes. The first production build with Sanity on (7 Oct 2026) served "No photos match this filter" on every gallery and lost the project stories once its pages had rebuilt. `lib/disk.ts` reads the disk first and falls back to `lib/generated/disk.json`, which `scripts/disk-manifest.mjs` writes before every build and dev server (package.json `prebuild`, `predev`; `npm run check` fails if the committed copy is stale, so run the script after adding photos or posts and commit the JSON). Never read `public/` or `content/` with `fs` directly in code that renders a page.
- TypeScript strict mode enabled — never use `any`
- All data changes (services, products, projects) require code changes in `lib/` files
- Blog is the only content type that supports non-developer edits (MDX files in `content/blog/`)
- Contact form requires RESEND_API_KEY to actually send emails (dev mode just logs the decision)
- Every JSON-LD block goes through `components/JsonLd.tsx` (`scriptJson` escapes
  <, > and & so Studio text can't break out of the tag); never
  `JSON.stringify` straight into a <script>
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

### Image files change in transit across the bridge — generate them on the device

`device_commit_files` does not deliver an image byte-for-byte. A C2PA content
credentials manifest is injected on the way, so the file that lands is larger
than the one sent and its checksum is different every time:

```
app/icon.svg   681 bytes sent  →  8,455 landed   <svg … xmlns:c2pa="http://c2pa.org/manifest"><metadata>…
app/icon.png   9,366          →  15,136
app/apple-icon.png 1,527      →  7,297
```

The picture survives intact — the SVG still renders and the PNGs keep their
dimensions and colour — but the bytes do not, so the checksum step of the
handoff rule fails for images and the two checkouts' tree hashes can never
agree. Text files are unaffected; this is images only.

So **icons and other generated images are produced on the device**, by running
the same generator there (`python3` 3.10 with Pillow, and node 22, are
installed in the VM). Then both sides run identical code on identical inputs
and the bytes match. Verified 21 Sept 2026: the same eight-line Pillow script
run in each place produced four identical files.

A photograph that only exists in the sandbox still has to cross, and will pick
up a manifest. That is acceptable for content images — just do not expect its
checksum to match, and do not chase the mismatch.

### Every write across the bridge needs its own fresh staged path

Writing twice to the same `devicePath` from the same `stagedPath` silently does
nothing the second time: the call reports the file written, and the device still
holds the old bytes. It happened three times on 21 Sept 2026 — twice on
`CLAUDE.md`, once on a batch of icons — and `force: true` does not prevent it.

So stage each write under a path that has never been used, for example
`/mnt/user-data/outputs/<name>-$(date +%s)/`, and checksum the landed file
before committing. That check is the only thing standing between a stale write
and a commit that claims work it does not contain.

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

### `app/icon.png` must stay above ~8 KB or the build panics

Replacing the favicon with a smaller file breaks `next build` with a Turbopack
panic that names nothing useful:

```
FATAL: An unexpected Turbopack error occurred.
Error [TurbopackInternalError]: Dependency tracking is disabled so invalidation
is not allowed at turbo-tasks-backend/src/backend/mod.rs:1526:13
```

Bisected on 21 Sept 2026: it is `app/icon.png` alone. The same image at 512px
(4,130 bytes) panics; at 1024px (9,366 bytes) it builds. `app/favicon.ico`,
`app/icon.svg` and `app/apple-icon.png` are all small and all fine — only
`icon.png` trips it, apparently on an asset-inlining path.

So the icon ships at 1024px. If a future pass shrinks or re-encodes it and the
build starts panicking about dependency tracking, this is why: check the file
size before looking anywhere else.

Since 28 Sept 2026 the PNG is **`app/icon1.png`**, and the whole set is the
official logo mark, generated by `python3 scripts/icons.py` from the logo SVG
in `public/images/S1_update_v2/logos/offical logos/`. With `app/icon.svg` and
`app/icon.png` side by side, a clean local build gave both routes one Turbopack
module id and served the PNG at `/icon.svg`; different base names keep them
apart. Check `.next/server/app/icon.svg.meta` says `image/svg+xml` after a build.

`app/favicon.ico` has its own rule: its sub-images must be **RGBA**. Written in
RGB the build fails with `Format error decoding Ico: The PNG is not in RGBA
format!` — a clearer message than the panic above, but the same class of trap.
The PNGs alongside it are RGB and that is fine; only the .ico cares.

### Two sandbox rules that cost real time to rediscover

- Killing `next-server` and starting a new one must be **two separate** shell
  calls. In one call the new server dies with the old.
- Never run two Playwright sweeps, or a sweep and Lighthouse, concurrently. The
  box saturates, the image optimizer wedges, and routes time out — which reads
  as a site bug and is not one.
