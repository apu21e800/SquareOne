# OWN-COMPANY BRIEF — make squareonepaving.com unmistakably Square One's

**For Claude Code, on the maintainer's machine. Read all of it before touching a file; re-read it at the start of every phase. The file is the contract.**

Written 25 Sept 2026 after HUB's review of hubss.com ("it looks too much like the new Square One site"). Square One's site was built from the HUBSS template. HUBSS is live and client-approved; Square One is under construction; **Square One is the one that changes.** The measured audit and the signed-off plan live in the Claude project ("Square One": `claude/S1-own-company-audit-2026-09-25.md`, `claude/S1-own-company-plan.md`); the numbers you need are repeated here.

## 0. Rules that override everything below

- **The canon in `CLAUDE.md` and the project's `S1-status.md` rules:** the manufacturer is never named on the website; "installed at", never "for"; no invented facts, figures, places, clients, dates, guarantees, response times, certifications or testimonials; only the published contacts (604-612-6209 office · 250-391-0270 Vancouver Island · 1-877-391-0270 toll-free · office@squareonepaving.com · 19–11720 Stewart Crescent, Maple Ridge, BC V2X 9E7); Vancouver Island is a service region, never an office; no photo counts; no "case studies"; say "Blog", never "journal".
- Never `--force`. Never rewrite history. Never delete a file — move it into `_to_delete/` (gitignored). Never any `vercel` CLI command. Never contact the client. Never edit `D:\STUDIO-01\21e8.studio\clients\hubss-website` (read it if useful; it is the sibling site and it stays as it is).
- `main` moves only by a pull request the maintainer has authorised. Do not push to `main`. Do not push at all unless this brief or the maintainer says so in the same session.
- **Do not break what works.** Do not change: `app/api/contact/route.ts`, the `components/contact/QuoteForm.tsx` payload shape and field names, `lib/site.ts`, `next.config.ts` existing redirects (add, never remove), `vercel.json` headers, `app/sitemap.ts` and `app/robots.ts` logic, `app/llms.txt/route.ts` logic, the Sanity files, `scripts/lint-claims.mjs` rules. The three build landmines in `CLAUDE.md` (`app/icon.png` size, `.ico` RGBA, image bytes across the bridge) still stand.
- Every commit passes `npm run check` (tsc, lint-claims, check-links) and `npm run build`. Commit messages say what changed and why in the site's own voice, and end with the two attribution lines your session provides.

## 1. Where to work

- Repo: `D:\STUDIO-01\21e8.studio\clients\squareone-website` — its own git repo inside the agency repo; run git here only.
- **Branch: `s1-own-company`, created from `s1-v2-prep-2` after the waiting client-notes PR has merged** (that PR is `b13a881`, "the form that can actually send, and the client's notes finished"). The client is mid-review on `s1-v2-prep-2`'s preview (40 open Vercel threads); it must stay as they left it, so this work never lands on `s1-v2-prep-2` directly. Pushing `s1-own-company` gives it its own preview at `https://square-one-git-s1-own-company-based-agency.vercel.app`. It merges into `s1-v2-prep-2` by PR when the maintainer signs off, and from there to `main` by PR.
- The production site is `https://www.squareonepaving.com` (`main`). The sibling site is `https://hubss.com`.

## 2. What the audit found (25 Sept 2026)

- **Copy: 1.0% of Square One's 4,500 sentences appear on hubss.com.** Product and application pages: 0. The overlap is `/terms` (75%), `/privacy` (61%) — the same legal template — and `/patterns` (43%: HUB's nine pattern notes verbatim). Copy structure is shared (the same heading sequence on product and application pages, "Let's build …", "Follow the work", the "since <year>" footer blurb).
- **Code: 4–17% of lines shared per paired file** (Nav 8%, Footer 9%, product page 4%, application page 5%, `globals.css` 10%); only `/privacy` and `/terms` are the same file with names swapped. `components/sections/Hero.tsx`, `ProductsGrid.tsx`, `StatsBar.tsx` still carry HUB's file names; `StatsBar` is unused.
- **Photographs: of 421 images the preview renders, 128 (30%) are the same frame as one on hubss.com** — 15 byte-identical, 113 near-identical (58 of those are page-one previews of the same manufacturer PDFs; 70 are photographs, most of them Square One's own BC jobs that HUB also uses). The 15 byte-identical live frames: `public/images/applications/commercial-spaces/little-italy-aerial-colourful-intersection-01.jpg`, `applications/private-driveways/estate-herringbone-gated-driveway-01.jpg`, `blog/parc-riviera-streetbond-walkway/featured.jpg`, `blog/roadway-accents-natures-walk/featured.jpg`, `products/decomark/decomark-1.jpg`, `products/durashield/durashield-1.jpg`, `products/durashield/durashield-residential-driveway-01.jpg`, `products/duratherm/duratherm-1.jpg`, `products/premark/premark-1.jpg`, `products/premark/premark-2.jpg`, `products/streetbond/streetbond-1.jpg`, `products/streetbond/streetbond-brick-pattern-red-grey-01.jpg`, `products/streetbond/streetbond-cobblestone-grey-closeup-01.jpg`, `products/trafficpatterns-xd/trafficpatterns-xd-1.jpg`, `products/trafficpatterns/trafficpatterns-1.jpg`. Whole unrendered HUB-library folders sit in `public/images/applications/` (airports, traffic-calming, private-driveways, commercial-spaces, public-spaces, parking-lots, bus-bike-lanes, regulatory-markings) and `public/images/products/airmark/`.
- **The shape is the same:** full-bleed photo hero with a spaced-caps eyebrow led by an orange square, a heavy sans headline, a lede and two buttons; a three-persona strip; a nine-name applications grid; a systems row; a patterns-and-colours block; photo cards with chips and arrow links; filter chips and "Show all"; a spec table, a colour chart and a document rail on every product page; a dark closing band into a four-column footer; a photo-tile mega menu. Both type stacks are a bold geometric/grotesk display over Inter with tracked-caps eyebrows. Colour already differs (Square One light, HUBSS dark) and it was not enough.

## 3. The plan, as signed off

**Skin and story first (no URL moves), bones second (with redirects).** Ten calls:

1. **Nav — services lead, text menus, no mega menu.** `What we do ▾ · Who we work with ▾ · Projects · For specifiers · About · [Get a quote]`, with the office number in the bar. What we do: Stamped asphalt · Coloured coatings · Line & symbol markings · Vapour blasting · Driveways · "The systems we install". Who we work with: Municipal & transit · Commercial, strata & property managers · Homeowners · Parks, schools & recreation. The Applications photo-tile panel retires. Phone: the same list, number and Get a quote pinned at the foot.
2. **Products → `/systems` plus eight one-screen installer pages.** The eight `/products/[slug]` URLs stay (they hold the system-name search equity and the WordPress redirects land on them) but each becomes one screen: where it fits, what installation involves, season and lead times, care, three BC installs, a quote. **Off every product page:** the spec table, the colour chart, the document rail, the "reference photography" band, "Related systems we install". Those move to `/specifiers` (§4 below). `/products` becomes `/systems` ("The systems we install"); `/products` 308s to `/systems`.
3. **Applications → four buyer pages.** `/who-we-work-with/municipal-transit`, `/who-we-work-with/commercial-strata`, `/who-we-work-with/homeowners` (a hub that points at `/driveways` and the city pages), `/who-we-work-with/parks-schools`. Each is written from the crew's experience: site conditions, traffic control, scheduling and seasons, what the owner needs to do, the systems that fit, projects filtered to that buyer. The ten application galleries survive as `/projects` filters (`lib/work.ts` is untouched; the photographs stay). The ten `/applications/[slug]` URLs and `/applications` 308 to the buyer page's section (table in §6).
4. **Proof only an installer has.** One numbered "How a job goes" band — Site visit → Written quote → Install → Aftercare — on the home page and every service page (`/contact` and `/about` already carry the five steps; consolidate to one component). Crew and equipment frames only from the record (`langley-railways-crossing-crew-on-site-trafficpatternsxd-01`, the Richmond crew, the North Van template layout, the Penticton install in `_image-queue/curated/process/` and `public/images/applications/`). Service area drawn from the canon's two regions and the places on record — never a Canada map. Before/after only where both frames exist (the vapour wipe stays, captioned as a demonstration). **Safety records and certifications: nothing exists on record beyond "BBB Accredited Business"; a section appears only when the maintainer supplies the document.**
5. **Conversion is a quote, a site visit or a call.** "Specs and documents →" comes off every card; the document rails come off product and application pages; the spec-library button and "All 14 pattern sheets" go. Specifiers keep "Send drawings" on their own page.
6. **Light stays; the type stack changes; orange for actions only.** Make the `futura-serif` setting live in `lib/typefaces.ts` / `app/refine.css` (Futura Bold headings, Source Serif 4 reading text — already loaded in `app/layout.tsx`; preload it, stop preloading nothing else), retire the spaced-caps eyebrow and its orange square (`.eyebrow`, `.label`, the `.stop::after` full stop): a plain small label in the text face, or a numbered rule where the content is a real sequence. Orange (`--accent`) only on `.btn-primary` and the wordmark; every other orange (links, chips, eyebrows, the hero full stop, `--accent-deep` text) becomes ink or charcoal. Retire the type switch and the three other settings once the maintainer has confirmed the setting on the preview (they are one entry each in git).
7. **No photo cards; a different rhythm.** Editorial rows (photograph one side, story the other, 5/7 grid, wide gutters), full-bleed photograph bands with a caption line, numbered steps on rules, lists divided by hairlines. Retire `RecordCard` as the default unit; the `card`/`chip`/`arrow-link` vocabulary goes with it. Sections alternate white / warm; the footer is the only dark band; no closing CTA band — the quote form is on the page.
8. **Square One's own photographs only.** Replace the 15 byte-identical frames from the record (the five `*-1.jpg` product leads first); move the unrendered HUB-library folders to `_to_delete/`; the UBC × Musqueam crosswalk stops leading the site (it leads hubss.com's home page) — keep it in the record, not in the hero, the menu or the first work tile. Any frame Square One cannot place as its own BC job goes to `_to_delete/`; the maintainer's yes/no list is in the project audit, §9. No more frames from the HUB library, ever.
9. **Resources and patterns serve the customer.** `/patterns` becomes a pattern chooser inside `/services/stamped-asphalt` and `/driveways`: Square One's eight offered sheets (`lib/pattern-sheets.ts`, `offered: true`) as chips at drawing size beside the composer, the nine notes rewritten in Square One's words (§7). `/patterns` 308s to `/services/stamped-asphalt#patterns`. `/resources` becomes a compact document list on `/specifiers#documents` without page-one previews (the previews carry the manufacturer's letterhead), plus a care-and-maintenance guide per service written from what the pages already say. `/resources` 308s to `/specifiers#documents`. `components/documents/DocPreviewModal.tsx`, `DocThumb.tsx`, `public/docs-previews/` and `lib/doc-previews.json` retire (files to `_to_delete/`).
10. **Voice: plain, local, "we".** "We'll walk the site with you." Supplier words — specify, submittal, systems portfolio, spec package — only on `/specifiers`. Rewrite: the nine pattern notes, "Follow the work" (the strip leaves the home page; if it stays anywhere, it is "Recent, on Instagram"), "Let's build something worth looking at", the footer blurb, and `/privacy` and `/terms` in full (same legal substance, Square One's sentences).

## 4. `/specifiers` after the move

The one page that speaks the specifier's language: what to draw (the pattern sheets, dimensioned), what to put in the spec (the system, the substrate, the published figures attributed to "the manufacturer"), the documents list (compact rows: name, type, size, Download), colour off the published card, samples at the site walk, "Send drawings". Keep its five-step band consistent with the home page's four (site visit → written quote and specification support → install → walk-through and warranty). No previews, no manufacturer name, no Lunch & Learn.

## 5. Phases and gates

**Phase 0 — read, verify, stop.** On `s1-own-company`: `git status` clean; `npm run check`; `npm run build`; `node scripts/shared-text.mjs --site http://localhost:3000` on a `next start`; screenshots of the seven pages (§8) at 1440 and 390 into `_shots/before/` (gitignored — add the line). Report: branch, HEAD, check results, the shared-copy share, and any disagreement between this brief and the tree. **Stop until the maintainer says `go`.**

**Phase 1 — skin and story (no URL changes).** In this order, one commit each, `npm run check` + `npm run build` before each commit:
1. Type: `futura-serif` live; eyebrows and the orange square retired; orange on the button and the mark only. (`lib/typefaces.ts`, `app/refine.css`, `app/layout.tsx`, `components/BrandMark.tsx`.)
2. Nav and footer: text menus, the number in the bar, the phone drawer; the footer's blurb and columns (What we do · Who we work with · Projects, specifiers, about · Talk to us); `MobileStickyCTA` keeps its reserved height. (`components/Nav.tsx`, `components/Footer.tsx`, `components/FooterClose.tsx`.)
3. The home page recomposed (§9): hero with a crew frame, "How a job goes", "What we do" as five rows, "Who we work with" as four entries (linking to the existing application pages until Phase 2), one project full width + a list, "Where we work", the quote form on the page, footer. The persona strip, applications grid, patterns-and-colours block, blog cards, Instagram strip and closing CTA band leave the home page. (`app/page.tsx`, `components/sections/*` — new components get Square One names; `Hero.tsx`, `ProductsGrid.tsx`, `StatsBar.tsx` are renamed or retired.)
4. Service pages and driveways: the same components; the pattern chooser lands on `/services/stamped-asphalt` and `/driveways` now (the `/patterns` redirect waits for Phase 2).
5. Product pages cut to one screen each (the spec table, colour chart, document rail and reference band come off; the eight URLs stay).
6. Photographs: the 15 frames replaced, the HUB-library folders to `_to_delete/`, the UBC frame out of the lead positions.
7. Voice: the rewrites in §3.10; `/privacy` and `/terms`.
8. Screenshots into `_shots/after-phase-1/`; `node scripts/shared-text.mjs` again; push `s1-own-company` (this push is authorised by the maintainer's `go`); report with the preview URL. **Stop for the maintainer's look.**

**Phase 2 — bones (with redirects).** One commit per item: `/systems`; the four buyer pages; `/specifiers` with the document list; the redirects in §6 added to `next.config.ts`; `/patterns`, `/resources`, `/applications` and `/products` index pages removed (files to `_to_delete/`, or left as thin redirect-only routes if `next.config.ts` cannot own them); sitemap and llms.txt confirmed to regenerate without the moved URLs; `node scripts/check-links.mjs` green (it reads redirect destinations); every entry in §6 answered `curl -sI` 308 → 200 on `next start`. Screenshots; shared-text; push; report. **Stop.**

**Phase 3 — proof that needs the maintainer.** Certifications (documents in hand only), crew shot list to the client via the maintainer, service-area map, driveway before/afters where both frames exist. Nothing here is invented to fill a slot.

## 6. Redirects (add to `next.config.ts`, `permanent: true`; never remove an existing entry)

| from | to |
|---|---|
| `/products` | `/systems` |
| `/patterns` | `/services/stamped-asphalt#patterns` |
| `/resources` | `/specifiers#documents` |
| `/applications` | `/who-we-work-with` |
| `/applications/crosswalks`, `/applications/roundabouts`, `/applications/bike-lanes`, `/applications/streetscapes`, `/applications/public-art`, `/applications/branding-wayfinding` | `/who-we-work-with/municipal-transit#<slug>` |
| `/applications/parking-lots` | `/who-we-work-with/commercial-strata#parking-lots` |
| `/applications/parks-paths`, `/applications/schools-sports-courts` | `/who-we-work-with/parks-schools#<slug>` |
| `/applications/driveways`, `/applications/private-driveways` | `/driveways` |

The WordPress map already points old URLs at `/products/[slug]` and `/applications/[slug]`; Next follows the new rule on the second hop. Retarget the WordPress entries that point at a moved URL directly at the new destination, so no visitor crosses two redirects. Each buyer page carries an `id` for every slug it receives.

## 7. The nine pattern notes to rewrite (HUB's words, verbatim today)

"The classic interlock — strongest visual texture per pass" · "45° set — dynamic movement across the surface" · "Standard field with a stacked-brick frame" · "Standard field with a square-tile frame" · "Diagonal Herringbone + Tile Border" · "Running bond — the street-brick standard" · "Running bond with a soldier-course frame" · "Mixed-size cut stone — natural randomness" · "Tile edging that follows curves". Rewrite as what a homeowner or engineer sees on the ground, in Square One's voice; the sheet names stay as the manufacturer prints them (they are what people ask for).

## 8. Screenshots

Seven pages at 1440×900 and 390×844, full page, before and after each phase: `/`, `/services/stamped-asphalt`, `/products/streetbond`, `/applications/crosswalks` (Phase 2: its buyer page), `/driveways`, `/specifiers`, `/blog`, plus the nav open at both widths. Playwright is in `node_modules`; write `scripts/shots.mjs` if none exists (viewport, `networkidle`, scroll to load lazy images, `fullPage`). Never run two Playwright sweeps at once.

## 9. The home page, band by band

1. Nav (text, number, Get a quote).
2. Hero: a full-bleed frame of the crew at work in a BC place (not a landmark, not the UBC crosswalk), caption "place · subject · system". Headline: "Decorative pavement, installed by our own crews." Line: "Lower Mainland and Vancouver Island since 2000. One office in Maple Ridge, crews on both sides of the Strait." One primary button (Get a quote), one quiet link (See the work).
3. How a job goes: 1 Site visit (free) · 2 Written quote (specification support if you need it) · 3 Install (our crews, to the published specification) · 4 Aftercare (walk-through, workmanship warranty).
4. What we do: five rows — stamped asphalt, coloured coatings, line & symbol markings, vapour blasting, driveways — each a photograph from the record and three lines in the site's voice, linking to the service page.
5. Who we work with: four entries, one line each on what the crew handles for that buyer (traffic control and night work; phased lots that stay open; the site visit and a week's install; summer windows and cure times), linking to the buyer pages (Phase 1: the nearest existing page).
6. Recent work: one project full width with its caption, then a hairline list of four more by place and year; "All projects →".
7. Where we work: the two regions and the places on record, as text (a drawn map only in Phase 3, from the same list).
8. Tell us the job. We'll walk the site.: the quote form (`QuoteForm` unchanged) beside the three lines and the mailbox.
9. Footer: the one dark band.

## 10. Reporting

After every phase: the branch and HEAD, the commits, the preview URL, the check results, the shared-copy share, the screenshot folders, what needs the maintainer, and anything in the tree that disagrees with this brief. Short, in plain words; the maintainer reads on a phone.
