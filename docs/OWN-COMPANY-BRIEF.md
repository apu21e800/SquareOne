# OWN-COMPANY BRIEF — make squareonepaving.com unmistakably Square One's

**For Claude Code, on the maintainer's machine. Read all of it before touching a file; re-read it at the start of every phase. The file is the contract.**

Revised 25 Sept 2026, 23:50 UTC: **this is a restyle, not a redesign.** The maintainer's steer: sharing frames with HUB is fine; the styles and layouts are what is too similar; nothing too dramatic; **leave the hero slider alone**; the two sites will share a lot of content; it needs to look different and stay ultra professional. So: every page keeps its skeleton and the hero keeps its reel; the surface changes (§3.7). Structure (§3.3, §3.4, §3.9) is Phase 2 and happens only if Phase 1 is not enough. Written 25 Sept 2026 after HUB's review of hubss.com ("it looks too much like the new Square One site"). Square One's site was built from the HUBSS template. HUBSS is live and client-approved; Square One is under construction; **Square One is the one that changes.** The measured audit and the signed-off plan live in the Claude project ("Square One": `claude/S1-own-company-audit-2026-09-25.md`, `claude/S1-own-company-plan.md`); the numbers you need are repeated here.

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
- **Photographs: of 421 images the preview renders, 128 (30%) are the same frame as one on hubss.com.** Measured and accepted: the two companies share frames, and that is fine. No photograph is moved, replaced or removed for that reason.
- **The shape is the same:** full-bleed photo hero with a spaced-caps eyebrow led by an orange square, a heavy sans headline, a lede and two buttons; a three-persona strip; a nine-name applications grid; a systems row; a patterns-and-colours block; photo cards with chips and arrow links; filter chips and "Show all"; a spec table, a colour chart and a document rail on every product page; a dark closing band into a four-column footer; a photo-tile mega menu. Both type stacks are a bold geometric/grotesk display over Inter with tracked-caps eyebrows. Colour already differs (Square One light, HUBSS dark) and it was not enough.

## 3. The plan, as signed off

**The restyle first (no URL moves, skeletons kept, the hero reel kept); structure second, only if still needed.** Ten calls:

1. **Nav — services lead, text menus, no mega menu.** `What we do ▾ · Who we work with ▾ · Projects · For specifiers · About · [Get a quote]`, with the office number in the bar. What we do: Stamped asphalt · Coloured coatings · Line & symbol markings · Vapour blasting · Driveways · "The systems we install". Who we work with: Municipal & transit · Commercial, strata & property managers · Homeowners · Parks, schools & recreation. The Applications photo-tile panel retires. Phone: the same list, number and Get a quote pinned at the foot.
2. **(Phase 2, only if needed) Products → `/systems` plus eight one-screen installer pages.** The eight `/products/[slug]` URLs stay (they hold the system-name search equity and the WordPress redirects land on them) but each becomes one screen: where it fits, what installation involves, season and lead times, care, three BC installs, a quote. **Off every product page:** the spec table, the colour chart, the document rail, the "reference photography" band, "Related systems we install". Those move to `/specifiers` (§4 below). `/products` becomes `/systems` ("The systems we install"); `/products` 308s to `/systems`.
3. **(Phase 2, only if needed) Applications → four buyer pages.** In Phase 1 the menu groups the existing application pages under the four buyer headings and nothing moves. `/who-we-work-with/municipal-transit`, `/who-we-work-with/commercial-strata`, `/who-we-work-with/homeowners` (a hub that points at `/driveways` and the city pages), `/who-we-work-with/parks-schools`. Each is written from the crew's experience: site conditions, traffic control, scheduling and seasons, what the owner needs to do, the systems that fit, projects filtered to that buyer. The ten application galleries survive as `/projects` filters (`lib/work.ts` is untouched; the photographs stay). The ten `/applications/[slug]` URLs and `/applications` 308 to the buyer page's section (table in §6).
4. **Proof only an installer has.** One numbered "How a job goes" band — Site visit → Written quote → Install → Aftercare — on the home page and every service page (`/contact` and `/about` already carry the five steps; consolidate to one component). Crew and equipment frames from the record (`langley-railways-crossing-crew-on-site-trafficpatternsxd-01`, the Richmond crew, the North Van template layout, the Penticton install in `_image-queue/curated/process/` and `public/images/applications/`). Service area drawn from the canon's two regions and the places on record — never a Canada map. Before/after only where both frames exist (the vapour wipe stays, captioned as a demonstration). **Safety records and certifications: nothing exists on record beyond "BBB Accredited Business"; a section appears only when the maintainer supplies the document.**
5. **Conversion is a quote, a site visit or a call.** "Specs and documents →" comes off every card in Phase 1 (an underlined "Specifications" word where a link is needed); the spec-library button and the "All 14 pattern sheets" button become text links. Whether the document rails leave the product pages is the Phase 2 call.
6. **Light stays; the type stack changes; orange for actions only.** Make the `futura-serif` setting live in `lib/typefaces.ts` / `app/refine.css` (Futura Bold headings, Source Serif 4 reading text — already loaded in `app/layout.tsx`; preload it), retire the spaced-caps eyebrow and its orange square (`.eyebrow`, `.label`, the `.stop::after` full stop): labels are small, sentence case, in the serif; a numbered rule only where the content is a real sequence. Orange (`--accent`) only on `.btn-primary` and the wordmark; every other orange (links, chips, eyebrows, the hero full stop, `--accent-deep` text) becomes ink or charcoal. Retire the type switch and the other three settings once the maintainer has confirmed the setting on the preview (they are one entry each in git).
7. **The surface changes — this is the whole of Phase 1.** HUB's signature moves, each replaced by a move HUB does not make, on the same page skeletons. Apply this table to every page; when in doubt, choose the right-hand column, and when a change would be dramatic, choose the smaller version of it.

   | HUB's move (hubss.com today, and this site in light) | This site's move (same skeleton, different surface) |
   |---|---|
   | Hero: tracked-caps eyebrow with an orange dot, heavy headline with an orange word and an orange full stop, lede, two buttons over the photograph | **The reel stays as it is** (`sections/Hero.tsx` keeps its frames, pace and controls). Over it: the headline alone in Futura sentence case, one line, one button; no eyebrow, no `.stop` full stop; the caption line stays |
   | Section header: caps eyebrow (orange) → big headline → lede → "All … →" on the right | A hairline above the section, the heading in Futura sentence case at 28–36px, the section's one link as an underlined word. No eyebrow, no lede. Where a section carries a label, the label sits in a left margin column (3 of 12) beside the content on desktop and stacks under 900px — `components/ui/Container.tsx` gains a `Section` with `label`; this is the one layout move |
   | Photo cards in 3-up grids: image on top, title, one-liner, chip row, arrow | The same items as rows divided by hairlines: photograph inset with its caption (place · system · year), text beside it. No chips, no arrows, no boxes, no hover zoom (`RecordCard` restyled or replaced by a `Row`) |
   | Photo tiles with captions over gradients (the applications grid, the menu tiles) | Captions under the frame, never over it; the menu is text |
   | Galleries: large frame + 3×2 thumbs, filter chips, "Show all N" pill | The same grid with a caption under each frame; `FilterBar` as underlined text links; "Show all" as a text link (`WorkGallery`, `FrameGallery`, `ProjectGallery`) |
   | Spec table, colour swatch strip, document rows on every product page | Kept in Phase 1, restyled: the spec as a plain two-column list without a box; colours as one row of swatches with names in the serif; documents as a plain list with underlined links and no type badges. Moving them to /specifiers is the Phase 2 call |
   | Dark CTA band with an orange button; four-column dark footer | `CTASection` goes light: the line and one button on paper (`FooterClose` retires). The footer is the one dark band, set as a letterhead: wordmark, the office address and the three lines as one text block, then one row of links, then the legal line |
   | Display at 60–92px over Inter, tracked-caps labels | Futura Bold at 28–44px in sentence case (`.display-xl`, `.display-fit` sizes come down); Source Serif 4 at 18px for reading; labels small, sentence case, in the serif |
   | Orange on eyebrows, headline words, links, chips, buttons | Orange on `.btn-primary` and the wordmark only; links are ink, underlined |
   | Rounded orange buttons with "→", two per hero | Square-cornered, sentence case, no arrow glyphs anywhere, one primary per view; the secondary action is an underlined word |
   | Hover zooms, city ticker, a sticky "Book a Lunch & Learn" bar | Nothing sticky but `MobileStickyCTA`; `MotionBreath` reduced to a fade; the hero reel keeps its pace |

8. **Photographs stay.** Sharing frames with HUB is fine. Do not replace, move or remove a frame on that account; the client's own "not ours" notes stay with the client-notes process. What changes is how a frame is framed: in rows and galleries, inset with its caption under it; the hero reel keeps its text over the photograph.
9. **(Phase 2, only if needed) Resources and patterns serve the customer.** `/patterns` becomes a pattern chooser inside `/services/stamped-asphalt` and `/driveways`: Square One's eight offered sheets (`lib/pattern-sheets.ts`, `offered: true`) as chips at drawing size beside the composer, the nine notes rewritten in Square One's words (§7). `/patterns` 308s to `/services/stamped-asphalt#patterns`. `/resources` becomes a compact document list on `/specifiers#documents` without page-one previews (the previews carry the manufacturer's letterhead), plus a care-and-maintenance guide per service written from what the pages already say. `/resources` 308s to `/specifiers#documents`. `components/documents/DocPreviewModal.tsx`, `DocThumb.tsx`, `public/docs-previews/` and `lib/doc-previews.json` retire (files to `_to_delete/`).
10. **Voice: plain, local, "we".** "We'll walk the site with you." Supplier words — specify, submittal, systems portfolio, spec package — only on `/specifiers`. Rewrite: the nine pattern notes, "Follow the work" (the strip stays; the heading becomes "Recent, on Instagram"), "Let's build something worth looking at", the footer blurb, and `/privacy` and `/terms` in full (same legal substance, Square One's sentences).

## 4. `/specifiers` after the move

The one page that speaks the specifier's language: what to draw (the pattern sheets, dimensioned), what to put in the spec (the system, the substrate, the published figures attributed to "the manufacturer"), the documents list (compact rows: name, type, size, Download), colour off the published card, samples at the site walk, "Send drawings". Keep its five-step band consistent with the home page's four (site visit → written quote and specification support → install → walk-through and warranty). No previews, no manufacturer name, no Lunch & Learn.

## 5. Phases and gates

**Phase 0 — read, verify, stop.** On `s1-own-company`: `git status` clean; `npm run check`; `npm run build`; `node scripts/shared-text.mjs --site http://localhost:3000` on a `next start`; screenshots of the seven pages (§8) at 1440 and 390 into `_shots/before/` (gitignored — add the line). Report: branch, HEAD, check results, the shared-copy share, and any disagreement between this brief and the tree. **Stop until the maintainer says `go`.**

**Phase 1 — the restyle (no URL changes; skeletons kept; the hero reel kept).** In this order, one commit each, `npm run check` + `npm run build` before each commit:
1. Type: `futura-serif` live; eyebrows and the orange square retired; orange on the button and the mark only; display sizes brought down. (`lib/typefaces.ts`, `app/refine.css`, `app/layout.tsx`, `components/BrandMark.tsx`.)
2. The primitives: `Section` with the margin-column label, `Row`, the captioned inset photograph, buttons and links. (`components/ui/`, `app/refine.css`.)
3. Nav and footer: text menus (What we do; Who we work with, grouping the existing application pages; Projects; For specifiers; About; the number; Get a quote), the phone drawer; the letterhead footer; `MobileStickyCTA` keeps its reserved height. (`components/Nav.tsx`, `components/Footer.tsx`; `FooterClose.tsx` retires; `CTASection` goes light.)
4. The home page on the new primitives (§9): the reel stays; its text block simplified; the process band added; every band below restyled in place.
5. Galleries and openers site-wide: captions under frames, text-link filters, the index-page openers simplified the same way as the hero (`IndexImageHero`, `WorkGallery`, `FrameGallery`, `ProjectGallery`).
6. Service pages, driveways, applications and product pages on the new primitives; product pages keep their sections, restyled as §3.7 says.
7. Voice: the rewrites in §3.10; `/privacy` and `/terms`.
8. Screenshots into `_shots/after-phase-1/`; `node scripts/shared-text.mjs` again; push `s1-own-company` (this push is authorised by the maintainer's `go`); report with the preview URL. **Stop for the maintainer's look. Phase 2 starts only on a second `go`.**

**Phase 2 — structure, only if the maintainer says so after looking at Phase 1 (with redirects).** One commit per item: `/systems`; the four buyer pages; `/specifiers` with the document list; the redirects in §6 added to `next.config.ts`; `/patterns`, `/resources`, `/applications` and `/products` index pages removed (files to `_to_delete/`, or left as thin redirect-only routes if `next.config.ts` cannot own them); sitemap and llms.txt confirmed to regenerate without the moved URLs; `node scripts/check-links.mjs` green (it reads redirect destinations); every entry in §6 answered `curl -sI` 308 → 200 on `next start`. Screenshots; shared-text; push; report. **Stop.**

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

## 9. The home page, band by band (the reel stays; the existing bands stay, restyled in place; one band is added)

1. Nav: text menus, the number, Get a quote.
2. Hero: the reel exactly as it is. Over it: the headline alone ("Surfaces that define a place" stays if the maintainer likes it; no orange full stop), one line ("Lower Mainland and Vancouver Island since 2000. One office in Maple Ridge, crews on both sides of the Strait."), one button (Get a quote), the caption line. No eyebrow. The proof line under the hero stays as a hairline row in the serif.
3. **New:** How a job goes — 1 Site visit (free) · 2 Written quote (specification support if you need it) · 3 Install (our crews, to the published specification) · 4 Aftercare (walk-through, workmanship warranty). Numbered because it is a sequence.
4. Who we work with: today's three-persona strip, restyled as three hairline rows (photograph inset with its caption, text beside it), no chips, one underlined link each.
5. Where these systems are specified → "Who we work with, and where": the same ten application links, grouped under four buyer headings (Municipal & transit · Commercial, strata & property managers · Homeowners · Parks, schools & recreation), thumbnails beside text, no arrows.
6. Three ways we change a surface, and one way we clean it: the same four services as four hairline rows, no thumbnails-in-cards; heading in the margin column.
7. Specified from a drawing, matched from a card: stays, restyled — the fanned sheets and the eight colours as they are, the buttons become one button and one underlined link.
8. Selected work: the same six projects with captions under the frames, no overlays, no chips.
9. The driveway band and the vapour band: stay, restyled on the same primitives (no cards, captions under frames, one button each).
10. Project stories and guides: the same three posts as a hairline list (title, one line, date), no cards.
11. Recent, on Instagram: the strip stays.
12. The CTA band goes light: the line, one button, the office number.
13. Footer: the one dark band, set as a letterhead.

If the maintainer wants fewer bands after seeing it, the candidates are 7, 9 and 11 — remove only on their word.

## 10. Reporting

After every phase: the branch and HEAD, the commits, the preview URL, the check results, the shared-copy share, the screenshot folders, what needs the maintainer, and anything in the tree that disagrees with this brief. Short, in plain words; the maintainer reads on a phone.
