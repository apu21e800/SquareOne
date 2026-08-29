# S1 BUILD PROMPT — Square One Paving, from "mostly built" to agency-grade live

**For Vern.** Start Claude Code in the S1 folder with read access to HUBSS, then
paste the one-liner. Say `go` at each gate to advance. The file is the contract;
the agent re-reads it every phase.

```
cd C:\Users\cleve\Based_Agency\based-agncy_os\Web_Projects\squareone-website
claude --add-dir ..\hubss-website
```

> Read `S1-BUILD-PROMPT.md` in full. Then run **Phase 0** exactly as written and
> stop at its gate with the report. Do not start Phase 1 until I say `go`.

Later: `Run Phase N.` — the agent re-reads this file and `S1-STATUS.md` first.

**Before you begin: read §10. It records four verified deltas between this
document and the actual repository state as of the last audit.**

---

## 0. Who you are, what this is

You are the build lead on **squareonepaving.com** — the website of Square One
Paving (S1), a BC decorative pavement studio that **installs** HUB Surface Systems
products across the Lower Mainland and Vancouver Island. The site is a Next.js
16 / React 19 / Tailwind 4 / TypeScript-strict app with an MDX journal, a Resend
contact form, folder-driven galleries, and a self-hosted technical library. The
v2 design system is done. Your job is everything between "done design system"
and "live, fast, correct, and maintainable by the client without a developer."

The finish line is **cutover of squareonepaving.com from WordPress to this app**,
passing the launch gate in §7. Sanity CMS comes *after* launch (§6, Phase 8).

You work in **one session, phase by phase**. Every phase ends with a report in
the §8 format and a hard stop. Vern says `go`. You never skip a gate, and you
never do anything irreversible (DNS, deletes, force-push, Vercel settings)
without asking first, even mid-phase.

---

## 1. Hard rules — never break these

1. **Vercel contamination.** This folder was once `vercel link`ed to the
   **hubss-website** project. A deploy from here would have overwritten HUB's
   production site. Before *any* `vercel` command, in *any* folder:
   `cat .vercel/project.json` -> `projectName` must be `square-one` and
   `projectId` must be `prj_D0j2acUvhY0ObF5lCMP6dnJrGer3`. Mismatch = stop and
   report. Never run `vercel deploy`, `vercel --prod`, `vercel link`, or
   `vercel env pull` unless Phase 5 says so and the preflight passes.
2. **`vercel link` and `vercel env pull` overwrite `.env.local`.** Back it up
   first, every time: `cp .env.local .env.local.bak-YYYYMMDD`.
3. **HUBSS is a read-only reference.** `..\hubss-website` (also on GitHub as
   `apu21e800/hubss-website`). Read it, copy files *out* of it, never write into
   it, never run its scripts from inside it, never touch its git. If you can't
   read it, ask Vern to restart the session with `--add-dir ..\hubss-website`.
4. **Secrets never pass through chat.** Report env vars by *name* only. When a
   value is needed, give Vern the exact command to run in his own shell and
   wait. Never paste a token, never commit `.env*`, never echo a value.
5. **Git safety.** No force-push. No history rewriting. No deleting branches.
   Push to a branch, open a PR, let Vern merge or say `merge`. If a push is
   rejected as non-fast-forward, stop and report — don't "fix" it.
6. **Photos.** Originals are never deleted or modified in place. Nothing with
   EXIF GPS reaches `public/`. Nothing raw from a phone reaches `public/`.
7. **Truth over polish.** S1 installs; HUB manufactures. Never claim S1 makes
   the products. Never invent clients, dates, stats, or spec figures — product
   performance data comes from the HUB spec sheets already in `public/docs/`.
   Never present HUBSS's Ontario proof points (York Region, Toronto) as S1's.
8. **Canon wins.** §2 is the single source of truth. If the code, a journal
   post, a PDF, or a previous commit disagrees with §2, §2 is right. If §2 is
   missing something, ask — don't guess.
9. **Report honestly.** A check that fails stays red in the report with the
   reason. Never green a check by weakening it.

---

## 2. Canon — single source of truth

### 2.1 Contact (put this in `lib/site.ts`; nothing else hardcodes it)

| Field | Value |
|---|---|
| Legal / display name | Square One Paving |
| Office | 505-20800 Lougheed Hwy, Maple Ridge, BC V2X 3P2 |
| Office phone | 604-466-9902 |
| Vancouver Island phone | 250-391-0270 |
| Email | office@squareonepaving.com |
| Regions served | Lower Mainland (Maple Ridge office) - Vancouver Island (region, **no office address**) |
| Domain | squareonepaving.com |

**Forbidden anywhere on the site:** `604-612-6209` (in any format), `Ladysmith`
as a location, `info@hubss.com`, `604-309-8212`, `416-540-9287`, any HUBSS
office address, `America/Toronto`. (Currently 13 instances of the wrong number
across 10 files — Phase 2 fixes them; Phase 1 adds a tripwire so they can't
come back.)

### 2.2 Products — 10

The existing nine plus **StreetBondSR** (decision, Aug 2026). Grouped the way
HUBSS's `lib/product-taxonomy.ts` groups them:

| Family | Products |
|---|---|
| Preformed thermoplastics | TrafficPatternsXD, TrafficPatterns, PreMark, DuraTherm, DecoMark |
| Coatings | StreetBond, **StreetBondSR** (new), MMAX, DuraShield |
| Stamped asphalt | StreetPrint |

**Not on S1:** AirMark (airports-only), and HUB's asphalt-repair family —
ChipFill, AggreFill, Fast Patch DPR. Do not add them; do not reference them in
`relatedProducts`.

Spelling is exact: `StreetPrint`, `StreetBond`, `StreetBondSR`, `TrafficPatterns`,
`TrafficPatternsXD`, `DecoMark`, `DuraShield`, `DuraTherm`, `MMAX`, `PreMark`.

### 2.3 Applications — mirror HUBSS's 19

S1 has 7. Target: **every application in HUBSS `lib/applications.ts` has a home
on S1.** The 19 slugs: `crosswalks`, `bike-lanes`, `bus-lanes`, `parking-lots`,
`parks-paths`, `playgrounds`, `community-branding`, `private-driveways`,
`sport-courts`, `splash-pads`, `public-spaces`, `commercial-spaces`, `townhomes`,
`residential-driveways`, `pedestrian-safety`, `traffic-calming`, `airports`,
`leed-urban-heat-island`, `public-art`.

Two rules: S1 already has a richer `/driveways` page — **do not** build
`private-driveways` and `residential-driveways` as separate pages; 301 both to
`/driveways` and list "Driveways" once in the applications index. `airports` is
built around PreMark / TrafficPatterns / DuraTherm — **no AirMark**.

### 2.4 Services and other pages — keep

4 services, `/driveways`, the vapour-blasting pages (see §10.2 for the route
spelling), `/about`, `/resources` (HUB PDF library, `lib/resources.ts`), the
quote-request route, journal (51 posts), 21 projects. Proofread against §2.1;
don't restructure.

### 2.5 Brand tokens (v2 design system — already built; enforce, don't redesign)

Light theme: white / `#FAF8F5` paper / `#F1EEE9` stone / `#14181D` slate.
Accent `#F26430`, **budgeted to <=3 elements per viewport**. Inter only. 2px
radius. Hairline borders, no shadows. 1280 container. **Exactly one dark band per
page.** No gradients, glows, shimmer, or decorative effects. Signature motif: a
6px orange square before every eyebrow and as the full stop after display
headlines. `#F26430` on white is ~3:1 contrast — fine for large/bold text and
UI marks, **fails AA for body-size text**; never use it for small text.

> **AMENDED per client direction, 2026-08-28 (docs/ROCKSTAR-PASS.md):**
> "Inter only" no longer holds. Display/H1/H2 are **Fraunces (variable,
> 600–640)**; eyebrows, labels and button text are **spaced-caps Inter 600
> (0.12em)**; body is **Inter 450–500 at 17px**. Nothing renders below
> weight 400 (ghost numerals excepted — texture, not text). Do not "fix"
> the site back to Inter-only-300. Everything else in this section stands.

### 2.6 Voice

Installer, not manufacturer. "We install HUB's StreetBond...", "our crews", "on
the Island and across the Lower Mainland." Concrete and civic, not salesy.
Canadian spelling (colour, centre, metres). BC context: rain,
freeze-thaw, Vision Zero (Vancouver), Complete Streets, strata and municipal
buyers. Product performance claims are HUB's, cited from the spec sheet, and
phrased as such.

### 2.7 Conversion

Primary CTA: **Request a Quote** (form: name, email, phone, city, project type,
message). Secondary: **Call** (office or Island number by region) and **See our
projects**. Every product, application, service, and project page ends in the
quote CTA. Spec sheets are a supporting download, not the headline ask — that's
HUB's job.

---

## 3. Decisions already made — don't relitigate

- **Launch code-driven; Sanity after.** Content stays in `lib/*.ts`, MDX, and
  folder galleries through cutover. Sanity is Phase 8.
- **Products = 10** (§2.2). **Applications = HUBSS's 19** (§2.3).
- **One session, phase-gated.** Reports in §8 format; `go` between phases.
- **Branching.** `s1-v2-prep-2` gets pushed as-is (backup). Work happens on
  `s1-launch`. PR -> `main` at each gate. `main` is Vercel's production branch.
- **Preview loop.** Once Vercel is Git-connected (Phase 1), every push to
  `s1-launch` gets a preview URL. That URL is how Vern reviews. Put it at the
  top of every report.
- **Media source of truth** is `_incoming/` (moved out of `public/` in Phase 1).
  Vern decides keep/kill from contact sheets; you never guess which photo is
  which project.

---

## 4. HUBSS — what to port, by path (read-only; copy out, then adapt)

HUBSS solved most of what S1 still needs. Port these; do not reinvent them.

| Need | HUBSS path | Notes |
|---|---|---|
| CI + verification harness | `scripts/verify-site.mjs`, `docs/VERIFICATION.md`, `.github/workflows/verify.yml` | 9 checks (routes, links, files on disk, built-pages-reachable, gallery distinctness, CMS contract, "undefined" tripwire, image weight, axe). Skip the Sanity check when no Sanity env. Read the comment above each check — each one names the bug that earned it. |
| Photo ingestion | `scripts/add-images.mjs` | EXIF rotation baked in, EXIF+GPS stripped, hash de-dupe, series naming, <=2400px q85. `--dry-run` first. |
| Raw-image optimiser | `scripts/optimize-raw-images.mjs` | For images that bypass `next/image` (markdown images, CSS backgrounds). Idempotent. |
| Gallery manifest | `scripts/gen-gallery-manifest.mjs`, `lib/gallery-crossposts.mjs` | Build-time index so no `fs` reads land in the serverless bundle (the 250 MB function-limit trap). S1 currently relies on `outputFileTracingExcludes` — fine; port this if the build ever trips the limit or if you want cross-posting without duplicate files. |
| Asset inventory | `scripts/asset-inventory.mjs`, `docs/ASSET-INVENTORY.md` | Counts and sizes per gallery folder. |
| Vern's image manual | `docs/IMAGE-WORKFLOW.md` | Rewrite for S1 paths. This is the client-facing "how to add a photo" doc. |
| Line endings | `.gitattributes`, `docs/FIX-LINE-ENDINGS.md` | HUBSS's `.gitattributes` also declares binaries; adopt the full file. Step 5 in the doc is the safety check — respect it. |
| SEO metadata | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `components/ui/JsonLd.tsx` | `buildMetadata()` with title/description clamps, canonical, OG, Twitter. Change `BASE_URL`, `SITE_NAME`, suffix. |
| Security headers + redirects | `next.config.ts` | `SECURITY_HEADERS` block and the 198-entry WordPress->Next redirect map — the *pattern* for S1's own map. Strip Crisp/Unsplash/Carto from the CSP. |
| Contact route | `app/api/contact/route.ts` | Resend + honeypot + HTML email. Change `TO_EMAIL` default, timezone (`America/Vancouver`), subject lines, remove lunch-learn/newsletter branches unless S1 uses them. |
| StreetBondSR content | `lib/products.ts` (the `streetbondsr` entry), `public/images/products/streetbondsr/`, `public/docs/StreetBondSR/` | Specs, colour collections, 8 photos (+ product and LEED logos), 4 PDFs (brochure, colour guide 2026, flat-surface spec, friction CoA). Rewrite the description in S1 voice. |
| 19 applications content | `lib/applications.ts` | Port `name, slug, shortDesc, description, relatedProducts, seoTitle, seoDescription`. **Not** `imageUrl`/`gallery` — S1 galleries are folder-driven. |
| Handover runbook (later) | `docs/VERCEL-TRANSFER-RUNBOOK.md` | Template for moving `square-one` to a client-owned Vercel team after launch. |
| Sanity (Phase 8) | `sanity.config.ts`, `sanity/`, `lib/sanity.client.ts`, `lib/sanity.queries.ts`, `lib/*.server.ts`, `types/sanity.ts`, `scripts/migrate-to-sanity.ts`, `docs/SANITY-FINDINGS.md` | The `*.server.ts` merge layer (per-field fallback to `lib/*.ts`) is the pattern that lets the site run with Sanity empty. Read `SANITY-FINDINGS.md` and `docs/VERIFICATION.md` §6 before touching any of it. |

**Do not port:** the admin/AI blog generator, social posting, Crisp chat, the
catalogue/flipbook, the mega-menu, the dark theme, the map, the lunch & learn
funnel, HUBSS's palette. S1 is the lighter sibling on purpose.

**Good from S1 -> HUBSS (not your job, but note it in reports if you improve it):**
`/resources` architecture and `lib/resources.ts`.

---

## 5. Phase protocol

- **Start of every phase:** re-read this file and `S1-STATUS.md`. State the
  phase goal in one sentence. Confirm the preflight (§1 rule 1) if the phase
  touches Vercel.
- **During:** small commits with conventional messages (`feat(applications):
  ...`, `fix(canon): ...`, `chore(media): ...`). Push to `s1-launch` often. Ask
  immediately on anything irreversible or on anything §2 doesn't answer.
- **End of every phase, in this order:**
  `npx tsc --noEmit` -> `npm run lint` -> `npm run build` -> `npm run verify -- --quick`
  (full `npm run verify` from Phase 3 on). Update `S1-STATUS.md`. Open/refresh
  the PR to `main`. Post the §8 report. **Stop.**
  (See §10.3 — the `lint` script does not exist yet; Phase 0 adds it.)
- **`S1-STATUS.md`** lives at repo root and survives context resets: current
  phase, gate results, open questions for Vern, preview URL, what's blocked and
  on whom. Keep it under 80 lines; it's a dashboard, not a log. (`S1-STATUS.md`
  and `S1-BUILD-PROMPT.md` are the only new root-level markdown files you
  create. Everything else goes in `docs/`.)
- **Estimates:** Phases 0-2 are days, not weeks, and need nothing from anyone.
  Phases 3-4 are gated on Vern's photo and logo calls. Phases 5-7 are gated on
  **DNS access** — the critical path. Ask §9 Q1 in the Phase 0 report.

---

## 6. Phases

### Phase 0 — Orient and secure (read-only except one safe push)

Goal: know exactly what exists, protect the 32 unpushed commits, change nothing
about the product.

1. **Where am I.** `pwd` ends in `squareone-website`. `cat .vercel/project.json`
   -> `square-one` / `prj_D0j2acUvhY0ObF5lCMP6dnJrGer3`. Anything else: stop.
2. **Env.** `cp .env.local .env.local.bak-$(date +%Y%m%d)`. List variable
   *names* in `.env.local` and `.env.local.example`. Flag anything that looks
   like HUBSS's (`CRISP_*`, `SANITY_*`, `ANTHROPIC_*`, `ADMIN_*`) — those are
   residue from the old link. Don't remove yet; list them for Phase 5.
3. **Git.** `git status`, `git branch -vv`, `git remote -v`,
   `git rev-list --count origin/s1-v2-prep-2..s1-v2-prep-2` (expect ~32),
   `git config core.autocrlf`, `cat .gitattributes`,
   `git diff --ignore-all-space --stat` (phantom-diff check — expect quiet).
   What does `main` hold? (`git log --oneline -5 main`, and whether it's the
   pre-v2 site.)
4. **Backup push.** `git push -u origin s1-v2-prep-2`. Fast-forward only. If
   rejected, stop and report. This is the only write in Phase 0.
5. **Toolchain.** `node -v` (need 20+; 22 preferred), `npm ci` (if the lockfile
   is out of sync, report — don't `npm install` yet), `npx tsc --noEmit`,
   `npm run lint`, `npm run build`. Record: pass/fail, build time, route count,
   the ten largest routes, any warnings. **Add the missing `lint` script — see §10.3.**
6. **Canon audit** (counts + file list for each):
   `604-612-6209` and separator variants (`612.6209`, `612 6209`, `(604) 612`),
   `Ladysmith`, `hubss` (every occurrence; classify each as *legitimate
   manufacturer reference* or *contamination*), `info@hubss.com`, `604-309-8212`,
   `416-540-9287`, `America/Toronto`. Then open `app/api/contact/route.ts` and
   report the **default TO/FROM addresses** — if a quote request would default
   to a HUB inbox, that's the first fix in Phase 2 and it goes in the report in
   bold.
7. **Media inventory.** `public/images/S1_update_v2/`: file count by extension,
   total size, how many are git-tracked, how many carry GPS EXIF, how many are
   `UNADJUSTEDNONRAW*`. Is the folder served? (Anything under `public/` is —
   tracing excludes don't change that.) Also: the 21 project folders under
   `public/images/projects/` — confirm empty. Product folders — image count
   each. Applications — image count each. **Also audit `public/docs/` — see §10.4.**
8. **Existing scaffolding.** Does S1 have `CLAUDE.md`, `README.md`, any
   `scripts/`, any CI, `app/sitemap.ts`, `app/robots.ts`, JSON-LD, security
   headers, redirects? A `lib/site.ts`-style config? List what exists so Phase
   1-2 don't duplicate it.
9. **Write `S1-STATUS.md`** and post the §8 report. Include §9 Q1-Q3 verbatim —
   they gate later phases and Vern should start on them now. **Stop.**

Gate: report posted; nothing changed except the backup push, the env backup, and
the `lint` script.

---

### Phase 1 — Pipeline and safety net

Goal: a branch, a preview URL for every push, CI that catches the bugs HUBSS
already paid for, and the raw media out of `public/`.

1. **Branch.** `git checkout -b s1-launch` from `s1-v2-prep-2`. Push it.
2. **Quarantine raw media.** `mkdir _incoming && git mv public/images/S1_update_v2 _incoming/`
   keeps it versioned. If Vern would rather stop versioning ~600 raw files,
   `git rm -r --cached _incoming` after the move and add `_incoming/` to
   `.gitignore` — history keeps the bytes either way. Nothing raw is served
   from now on. Confirm `npm run build` still passes and no page referenced
   that folder.
3. **Line endings.** Replace `.gitattributes` with HUBSS's full version (binary
   declarations included). If `git status` then shows a mass diff, run
   `docs/FIX-LINE-ENDINGS.md` steps exactly; step 5 must print nothing before
   you commit.
4. **Port the harness.** `scripts/verify-site.mjs`, `docs/VERIFICATION.md`,
   `.github/workflows/verify.yml` -> S1. Dev deps: `playwright`,
   `@axe-core/playwright`. Adapt: base URL, skip the Sanity contract check when
   `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, empty the `ACCEPTED` duplicates
   set. Add `verify`, `verify:quick` scripts to `package.json`.
5. **Add check #10 — forbidden strings.** Scan the built HTML for every string
   in §2.1's forbidden list, phone numbers as a separator-tolerant regex.
   Comment above it: "13 instances of a retired number across 10 files, a
   Ladysmith 'office' that never existed, and a contact route that could default
   to the manufacturer's inbox." **It will be red until Phase 2. Report it red.**
6. **Preflight guard.** `scripts/preflight.mjs`: reads `.vercel/project.json`,
   exits non-zero unless name and id match §1 rule 1. `npm run preflight`.
   Document it in `CLAUDE.md` as mandatory before any `vercel` command. (Also
   confirm `.vercel/` is gitignored.)
7. **`CLAUDE.md` for S1.** Create or update: the contamination rule, the canon
   table, the 10 products / 19 applications decision, commands, the phase
   protocol pointer, "HUBSS at `../hubss-website` is read-only reference."
   Short. Facts only.
8. **Connect Vercel to Git.** Vern does this in the dashboard (`square-one` ->
   Settings -> Git -> Connect -> `apu21e800/SquareOne`, production branch `main`).
   If it has to be the CLI: `npm run preflight` first, then
   `vercel git connect https://github.com/apu21e800/SquareOne` — never
   `vercel link`. Then: Deployment Protection — decide with Vern whether
   previews need Vercel login. Confirm the first preview deploy of `s1-launch`
   builds green on Vercel.
9. **PR to `main`.** Title it for the phase. Vern merges; production
   (`square-one.vercel.app`) now shows current work with no real domain attached.

Gate: preview URL in the report; `tsc`, lint, build green; `verify --quick`
9/10 with #10 red and explained; CI ran on the PR.

---

### Phase 2 — Content canon: contact, StreetBondSR, 19 applications

Goal: nothing on the site is wrong, and the content set matches §2.

1. **`lib/site.ts`.** Export `SITE` with §2.1 (name, url, email, phones by
   region, address as structured fields, regions, social handles if any). Every
   component, page, email template, JSON-LD, and metadata reads from it. Replace
   all 13 wrong-number instances and any HUB residue. Contact route defaults ->
   `office@squareonepaving.com`, timezone `America/Vancouver`. "Vancouver
   Island" is a region with its own phone number, never an address.
2. **StreetBondSR.** Add to `lib/products.ts` (port specs and colour collections
   from HUBSS; rewrite description in §2.6 voice, ~120-180 words, LEED / heat
   island / parking-lots-and-schools angle). Taxonomy, product index, nav, quote
   form's product-type options. Gallery folder
   `public/images/products/streetbondsr/` seeded with HUBSS's 8 photos via
   `add-images.mjs` (HUB photography of HUB products is fair for an installer —
   confirm with Vern in the report). PDFs: copy `public/docs/StreetBondSR/*` and
   register in `lib/resources.ts`. Cross-link from `leed-urban-heat-island`,
   `parking-lots`, `playgrounds`, `parks-paths`, `commercial-spaces`.
3. **Applications 7 -> 19.** For each missing slug, port from HUBSS
   `lib/applications.ts` the fields in §4, then rewrite: installer voice, BC
   context, 120-220 words, `relatedProducts` a subset of §2.2's ten (drop
   `airmark`, `chipfill`, `aggrefill`, `fast-patch`), `seoTitle` <= 65 chars,
   `seoDescription` <= 155. Driveways and airports per §2.3. Create each
   gallery folder with a `.gitkeep`. **The template must look finished with
   zero photos** — fall back to related project images or the lead product's
   hero; never an empty grid or a broken image. Update the applications index
   and nav. Add the two driveway redirects to `next.config.ts`.
4. **Journal and projects proofread.** `grep` all 51 posts and 21 projects for
   the forbidden list, for HUBSS/Ontario proof points presented as S1's, and for
   product-name spelling. Fix canon issues directly; list editorial doubts for
   Vern rather than rewriting posts.
5. **Legal pages.** Privacy and terms exist? Make sure they name Square One
   Paving, the Maple Ridge address, and — if analytics ship — what's collected.
   Mark for client review; you're not their lawyer.

Gate: `verify` fully green including #10; every application URL 200; every
`relatedProducts` slug resolves; applications index shows 18 entries (17 + one
Driveways); StreetBondSR in nav, index, resources, and quote form.

---

### Phase 3 — Media

Goal: real photography on every page, correctly named, stripped, and light.
Vern decides *which*; you do everything else.

1. **Tools first.** Port `add-images.mjs`, `optimize-raw-images.mjs`,
   `asset-inventory.mjs`; rewrite `docs/IMAGE-WORKFLOW.md` for S1 ("the folder
   is the gallery", naming rules, `_` to hide, number to order, size limits,
   the exact prompt to send Claude Code). Add `images:add`, `images:optimize`,
   `assets:inventory` scripts.
2. **Inventory `_incoming/S1_update_v2/`.** CSV: filename, size, dimensions,
   EXIF date, GPS y/n, camera, a guessed subject from the filename (legacy WP
   names are often descriptive). Separate the three populations: ~139 fresh
   photos, ~426 legacy WP assets, 19 logo files (-> Phase 4).
3. **Contact sheets.** Numbered thumbnail grids (~30 per sheet, `sharp`) into
   `_incoming/contact-sheets/`. Group fresh photos by EXIF date (a date is
   roughly a site visit, which is roughly a project). Vern answers per sheet:
   keep/kill, which project or application or product, which is the hero.
   Propose a mapping using the 21 project entries in `lib/projects.ts`
   (location, date, products) — propose, never assume.
4. **Ingest** with `add-images.mjs --dry-run` then for real, per gallery:
   projects first (21 folders, >=4 each), then the new application galleries
   (>=6 each), then products (>=6 each), then the homepage hero set. Names carry
   meaning (`maple-ridge-crosswalk-streetbond-02.jpg`); alt text is built from
   them. Legacy WP assets: only genuine S1 project photography comes across;
   everything else stays in `_incoming/` untouched.
5. **Swatches and patterns.** Colour-swatch and asphalt-pattern PNGs ->
   `public/images/products/<slug>/swatches/` and `/patterns/`. Confirm the
   product template renders them; if it doesn't, add the section — small,
   on-system, no new colours.
6. **Cross-posting.** One photo in several galleries -> HUBSS's
   `gallery-crossposts` manifest pattern, not duplicate files.
7. **Weight.** Run `optimize-raw-images.mjs`. Budget: `public/images` <= ~150 MB
   total, no non-hero file > 1 MB, hero LCP <= 350 KB at 1440. Report
   before/after.

Gate: full `npm run verify` green (gallery distinctness, <= 2000 KB per route at
390 px); a table of gallery -> image count with shortfalls named; contact sheets
for anything still undecided.

---

### Phase 4 — Brand and polish

Goal: it looks like an agency built it, on every template, at every width.

1. **Logos.** From the 19 files pick the canonical set with Vern -> `public/brand/`:
   primary (SVG if one exists — if only raster, **ask for the vector**; don't
   auto-trace), light-band and dark-band variants, mono. Nav, footer, email
   template, OG image. Favicons via Next file conventions: `app/icon.svg`,
   `app/icon.png` (512), `app/apple-icon.png` (180). Default OG at
   `app/opengraph-image.tsx` (1200x630, logo + one line on paper); product,
   application, and project pages use their hero.
2. **Design-system audit** per template against §2.5: accent count per
   viewport, one dark band, radius, borders, motif on every eyebrow and
   headline, Inter only, no stray effects. Fix drift; don't redesign.
3. **Screenshots for Vern.** Playwright: each of the 13 templates at 390 / 768 /
   1440 -> `_incoming/qa/<template>-<width>.png`. He reviews these, not the
   codebase.
4. **States.** On-brand 404 and `error.tsx`, `loading.tsx`, empty gallery,
   form success/error, `:focus-visible` everywhere, `prefers-reduced-motion`
   respected by every Framer Motion use.
5. **Copy.** Homepage hero (headline, sub, CTA), about page (team names, roles,
   photos — from Vern; Jan Stewart is the card on file), footer line about HUB
   ("Installer of HUB Surface Systems products" — exact wording from Vern, §9 Q6),
   dynamic copyright year.

Gate: screenshot set delivered; accent/dark-band audit table per template;
`verify` green; axe 0 critical / 0 serious.

---

### Phase 5 — Forms, environment, Vercel

Goal: a quote request on the live preview lands in office@squareonepaving.com.

1. **Route hardening.** `app/api/contact/route.ts`: `zod` validation,
   honeypot, basic per-IP throttle, `from` on a **verified** Resend domain
   (`quotes@squareonepaving.com` or `noreply@`), `to` from `SITE.email`,
   `replyTo` = submitter, subject `Quote request — {name}, {city}`. Graceful
   failure: user sees a phone number and a `mailto:` fallback, the error is
   logged, never a silent 200.
2. **Resend.** Vern's account or Based's (§9 Q3). Add `squareonepaving.com` as
   a sending domain -> Resend gives DKIM/SPF (and DMARC) records -> those need
   DNS (§9 Q1). Until verified, Resend only delivers to the account owner —
   so the end-to-end test waits on DNS.
3. **Env on `square-one`.** Names: `RESEND_API_KEY`, `CONTACT_EMAIL`,
   `NEXT_PUBLIC_SITE_URL`. Vern sets values in the Vercel dashboard (Production
   + Preview). Then, **preflight first, backup first**, `vercel env pull
   .env.local` — or skip the pull entirely and keep a hand-written `.env.local`.
   Remove the HUBSS residue vars from `.env.local` with Vern's ok. Update
   `.env.local.example` to match reality.
4. **Analytics.** `@vercel/analytics` + `@vercel/speed-insights`. GA4 only if
   Vern supplies a property ID (§9 Q8), via `@next/third-parties`, disclosed in
   the privacy page.
5. **Test.** Submit on the preview: success path (Vern confirms receipt),
   validation path, honeypot path, missing-key path (temporarily unset in a
   preview env, confirm the fallback renders).

Gate: a real email received at office@ from the preview; env var names match
the expected set on Vercel and locally; no HUBSS keys remain.

---

### Phase 6 — SEO, redirects, performance, accessibility

Goal: launch without losing the rankings WordPress has, and score like an
agency site.

1. **Metadata.** Port `lib/seo.ts` (`BASE_URL` = `https://squareonepaving.com`,
   suffix `Square One Paving`). Every route uses `buildMetadata`; canonical on
   all; OG images per Phase 4 step 1.
2. **`app/sitemap.ts` + `app/robots.ts`.** All public routes; `/api` disallowed.
3. **JSON-LD.** Root layout: `Organization` + a `LocalBusiness` subtype
   (`GeneralContractor` fits) with the Maple Ridge `address`, two
   `contactPoint`s (Lower Mainland office, Vancouver Island), `areaServed`
   [Lower Mainland, Vancouver Island, British Columbia], `logo`, `sameAs`.
   `Service` on service pages, `BreadcrumbList` on every detail page, `Article`
   on journal posts. Vern runs Google's Rich Results Test on the preview;
   paste the URLs in the report.
4. **Redirect map — the SEO-critical step.** Fetch the live WordPress sitemap
   (`/wp-sitemap.xml`, else `/sitemap_index.xml`, else `/sitemap.xml`) and
   crawl the nav. Every URL on the old site gets a row in `docs/REDIRECTS.md`:
   old -> new -> reason. Pages map to their new home; posts to journal slugs;
   categories/tags/author/feed/`wp-json` -> nearest index; `/wp-content/uploads/*`
   -> 410 (optional, one rule). Encode as `permanent: true` redirects in
   `next.config.ts`. **Add check #11 to `verify-site.mjs`:** read the map, hit
   every old path on the target base, require 301/308 -> 200. Vern's Search
   Console top-landing-pages export, if he has it, takes priority over the
   sitemap for what matters.
5. **Security headers.** Port `SECURITY_HEADERS`; CSP trimmed to what S1 loads
   (self, Vercel analytics, GA if used, fonts if not self-hosted).
6. **Performance.** Lighthouse mobile on home, one product, one application,
   one project, one journal post, the quote page. Targets: perf >= 90, a11y 100,
   best-practices >= 95, SEO 100. Hero via `next/image` with `priority` and
   `sizes`; `next/font` Inter with `display: swap`; explicit dimensions
   everywhere; check the `next build` size table for any route dragging
   Framer Motion where a CSS transition would do.
7. **Accessibility.** axe 0 critical/serious on every template; full keyboard
   pass (nav, menus, lightbox, forms); skip link; heading order; labels; the
   §2.5 contrast rule enforced.

Gate: `verify` 11/11 green; the Lighthouse table; `docs/REDIRECTS.md` with 100%
of old URLs mapped; Rich Results URLs.

---

### Phase 7 — QA and cutover

Goal: live on squareonepaving.com with nothing left for the client to find.

1. **Full QA pass** on the preview: every route at 3 widths, every external
   link, every PDF, lightbox, nav, 404, forms, print-free. Canadian spelling
   sweep. Product-name spelling sweep. Final `grep` for the forbidden list.
2. **`docs/CUTOVER-RUNBOOK.md`** (model: HUBSS `docs/VERCEL-TRANSFER-RUNBOOK.md`):
   pre-cutover snapshot (WP export + DB backup, screenshots of every WP page,
   current DNS records, current GSC coverage); canonical host decision (www vs
   apex — match what WordPress ranked with, §9 Q7); add both hosts to
   `square-one` in Vercel and copy the *exact* A / CNAME values Vercel shows;
   lower TTL to 300 the day before; cut over Tue-Thu morning Pacific; checks at
   +15 min / +1 h / +24 h (TLS issued, 301s from the map, forms, sitemap
   fetchable, GSC verified and sitemap submitted); rollback = repoint DNS; keep
   the WordPress host alive 30 days.
3. **Merge `s1-launch` -> `main`.** Production builds on Vercel. Vern executes
   the DNS steps himself, from the runbook, with you on the line.
4. **Post-cutover.** `npm run verify -- --base=https://squareonepaving.com`
   must be green. GSC: verify property, submit sitemap, note baseline.
   Google Business Profile website/phone updated (Vern). Old WP admin
   bookmarked for the 30-day window.
5. **Handover docs.** `README.md` (commands, structure), `docs/IMAGE-WORKFLOW.md`,
   `docs/EDITING.md` (add a project, add a journal post, swap a hero — no
   developer needed), `docs/CUTOVER-RUNBOOK.md` (executed, with what actually
   happened), `docs/VERIFICATION.md`.

Gate: live; production `verify` green; §7 launch gate every box ticked, with
evidence.

---

### Phase 8 — Post-launch: Sanity CMS

Goal: the client edits projects, journal, testimonials, and gallery images in a
Studio; product specs, services, applications, and resources stay in code.

1. **A new Sanity project, not HUBSS's.** The residue token in the old
   `.env.local` pointed at HUB's dataset. Create `square-one`, own env vars,
   Editor token set by Vern in his shell.
2. Port from HUBSS in this order: `types/sanity.ts` (subset), `sanity/` schemas
   for the four document types, `sanity.config.ts`, `lib/sanity.client.ts`,
   `lib/sanity.queries.ts`, then the `*.server.ts` merge layer so every page
   keeps working with an empty dataset. Studio at `/studio`, auth-gated.
3. `scripts/migrate-to-sanity.ts` `--dry-run` -> migrate projects and journal;
   gallery images via the HUBSS sync script pattern (idempotent, `--only=`).
4. Re-enable verify check #6 (CMS contract). It's the one TypeScript can't do.
   Read HUBSS `docs/SANITY-FINDINGS.md` first — four shipped bugs, one root
   cause.
5. `docs/EDITING.md` updated for the Studio; 30-minute walkthrough for the
   client.

Gate: `verify` 11/11 with #6 live; a project edited in Studio appears on
production after revalidation; code-side content untouched.

---

## 7. Launch gate — the definition of agency-grade

Every box, with evidence in the Phase 7 report.

- [ ] Every route 200; every internal link resolves; no literal `undefined`
- [ ] Forbidden-strings check green; `lib/site.ts` is the only place contact data lives
- [ ] Quote form delivers to office@ from a verified domain; failure path degrades to phone + mailto
- [ ] 10 products, 17 application pages + `/driveways` (18 index entries), 4 services, 21 projects with >=4 photos, 51 journal posts, resources library — all reachable from nav or index
- [ ] Real logos, favicon set, default and per-page OG images
- [ ] Design-system audit clean on all 13 templates at 390 / 768 / 1440
- [ ] Lighthouse mobile >= 90 / 100 / >= 95 / 100 on the six audited templates
- [ ] axe 0 critical / 0 serious; keyboard-complete; reduced-motion respected
- [ ] Metadata, canonical, sitemap, robots, JSON-LD valid; Rich Results passes
- [ ] 100% of old WordPress URLs 301 to a 200 (check #11 green)
- [ ] Security headers on; no secrets in repo or history
- [ ] CI green on `main`; `npm run verify` documented and green locally and against production
- [ ] `CLAUDE.md`, `README.md`, `docs/IMAGE-WORKFLOW.md`, `docs/EDITING.md`, `docs/CUTOVER-RUNBOOK.md`, `docs/REDIRECTS.md`, `docs/VERIFICATION.md` exist and are true
- [ ] Client can add a photo, a project, and a journal post without a developer — and you've tested that path
- [ ] Nothing raw, nothing with GPS, nothing from `_incoming/` is served
- [ ] Vercel `square-one` is Git-connected to `apu21e800/SquareOne`, `main` is production, env set, HUBSS residue gone, and `npm run preflight` passes

---

## 8. Report template (every gate, no exceptions)

```
PHASE N — <name>                              preview: <url>   PR: <url>

DONE
- <what changed, by area, with commit range>

VERIFIED
- tsc OK | lint OK | build OK (<n> routes, <t>s) | verify <x>/<y>
- <check> — <result>            (red ones first, with the reason)

NEEDS VERN                        (exact steps or exact question; nothing vague)
1. ...

DECISIONS I MADE                  (small ones I didn't want to block on)
- ...

NEXT PHASE WILL                   (three lines max)
- ...

BLOCKED ON: <person/thing> | nothing
```

Numbers over adjectives. Paths over descriptions. If a step didn't happen, say
so — the report is for the next session as much as for Vern.

---

## 9. Questions only Vern can answer — ask early, in the Phase 0 report

1. **DNS / registrar** for squareonepaving.com — who has login? (Gates Resend
   domain verification and the cutover. Longest lead time; ask first.)
2. **WordPress host** — who has access for the backup, and can it stay alive
   30 days after cutover?
3. **Resend** — S1's own account or Based's? Sending address preference.
4. **Logos** — which of the 19 files is canonical, and is there a vector?
5. **About page** — team names, roles, photos; which testimonials are approved.
6. **HUB relationship wording** — "authorized installer", "certified
   installer", or plain "installer of HUB Surface Systems products"?
7. **Canonical host** — `www.squareonepaving.com` or `squareonepaving.com`?
   Which one did WordPress use?
8. **GA4** — existing property ID, or Vercel Analytics only?
9. **Do-not-publish photos** — any private residences or clients who haven't
   approved use?
10. **Journal provenance** — were the 51 posts written for S1, or adapted from
    HUBSS? Anything Ontario-specific to strip?
11. **Ownership after launch** — will `square-one` move to a client-owned Vercel
    team (HUBSS's transfer runbook pattern)? Affects who holds env and billing.

---

## 10. Verified deltas — repo audit, read before Phase 0

Audited directly against the working tree. Where this section and the rest of
the document disagree, **this section is the observed fact** and the phase text
is the intent.

**10.1 — HUBSS reachability is unconfirmed.**
The audit could see only `squareone-website`. `../hubss-website` was not
verifiable from the audit environment; it may well exist on disk. Phase 0 step 1
must add: `ls ../hubss-website` — if it fails, stop and ask Vern to restart with
`--add-dir ..\hubss-website`. **Almost every port in §4 depends on this.** Do
not begin Phase 1 without confirming it.

**10.2 — The route is `vapor-blasting`, not `vapour-blasting`.**
Two routes exist: `app/vapor-blasting/` and `app/services/vapor-blasting/` —
both American spelling. §2.6 mandates Canadian spelling. These conflict.
Renaming is an SEO-visible URL change and §2.4 says don't restructure, so the
resolution is: **keep the American URL slugs, use Canadian spelling in all
visible copy** ("vapour blasting"), and put the question to Vern in the Phase 0
report. Do not rename routes without an explicit `go` and a 301 pair.

**10.3 — There is no `lint` script.** `package.json` defines only `dev`, `build`,
`start`. The §5 phase protocol calls `npm run lint` at every gate and would fail
on step 2, every time. `eslint.config.mjs` and `eslint-config-next` are both
present, so the fix is one line in Phase 0 step 5:
`"lint": "next lint"`. Add it, confirm it runs, and report the first clean or
dirty result. `verify` and `verify:quick` arrive in Phase 1; `preflight` too.

**10.4 — `public/docs/` holds 138 PDFs; `lib/resources.ts` registers 72.**
Roughly 66 files are on disk and served but referenced by nothing. Phase 0
step 7 must inventory `public/docs/` alongside the images: list registered vs
orphaned, with sizes. Do not delete anything in Phase 0 — report it, and let
Vern decide in Phase 3 whether the orphans are future StreetBondSR/HUB
documents worth registering or dead weight worth removing. They also inflate
every deployment.

**10.5 — Confirmed accurate, no action needed.** The following claims in this
document were checked and are true: 13 instances of `604-612-6209` across 10
files; `s1-v2-prep-2` is 32 commits ahead of `origin`; all 21 project gallery
folders exist and are empty; `public/images/S1_update_v2/` holds 593 files;
no `lib/site.ts` exists; `CLAUDE.md`, `README.md`, `scripts/`, `app/sitemap.ts`,
`app/robots.ts` and `.vercel/project.json` all exist; Node is v22.23.2; the v2
design system is in place (Poppins removed, one stray v1 token left in
`app/globals.css`).

---

## 11. S1-only edge cases and the AI-imagery policy (treat as canon, same rank as §2)

Two parts of S1 have no HUBSS equivalent to port from, and one of them has no
real photography at all. This section governs both, plus the rules for
generated images anywhere on the site.

**11.1 — Residential driveways is a different site inside the site.**
Every other page sells to engineers, municipalities, and developers. `/driveways`
sells to homeowners: warmer copy, cost-versus-pavers framing, process
reassurance ("choose your design -> we transform the surface -> make an
impression"), one clear residential CTA ("Book a free site visit"). It absorbs
both HUBSS application slugs (§2.3) and is the one page where the §2.6 civic
voice softens. It is also the page with the best real photography — six live
driveway shots plus the Driveways set in `_incoming/` — so it needs NO
generated imagery. Phase 3 populates it first; Phase 4 audits it against the
softer voice deliberately, not as drift.

**11.2 — Vapour blasting is S1's own service, not a HUB product.**
Nothing to port: HUBSS has no vapour-blasting content, no spec sheets, no
photography. Product claims here are S1's own (dustless, <5% airborne dust, no
slurry runoff, heritage-safe) — phrase them as S1's experience, never cite HUB.
Photography: check reality first — a vapour-blasting hero was committed in the
"Asset push" round, and the fresh `_incoming/` photos may include blasting work.
Inventory before generating anything. Whatever the inventory misses is the
primary legitimate use case for AI generation on this site.

**11.3 — AI image generation: where it is allowed and how it is marked.**
Vern will generate images (his tools, his prompts — the build agent writes the
briefs, flags the gaps, and never fakes provenance).

ALLOWED, with labelling:
- Vapour-blasting process imagery: rig, nozzle, contained mist, half-cleaned
  surface, before/after texture. Generators get the equipment wrong easily —
  the brief must specify: wet vapour abrasive rig (not dry sandblasting, no
  dust cloud), hose-fed nozzle, contained slurry mist, BC exterior light.
- Atmospheric/illustrative banners on application pages that have no real S1
  or HUB photograph (likely: townhomes, sport-courts, traffic-calming,
  pedestrian-safety, airports). Prefer a real HUB manufacturer photo first;
  generate only when neither library has one.
- Abstract surface/texture backgrounds.

FORBIDDEN, no exceptions (this extends §1 rule 7):
- Project galleries and anything under "Selected work" / `lib/projects.ts` —
  those document real installs for municipal buyers who may have stood on them.
- Anything presented as a specific S1 project, crew, client, or completed job.
- People presented as S1 staff or crews.
- Recreations of real First Nations artwork or artist-attributed installs
  (Musqueam, shíshálh, k'wy'i'y'e pieces are real works by real artists —
  photograph or omit, never synthesize).

MECHANICS:
- Generated files live in a `generated/` subfolder of their gallery
  (`public/images/services/vapour-blasting/generated/…`) and are named
  `gen-<subject>-<nn>.jpg`. The folder name is the audit trail.
- Alt text says what it is: "Illustration: vapour blasting nozzle on concrete."
- Art direction matches the real library: overcast BC coastal light, wet
  asphalt, low camera, cedar/fern edges — same grade as the photography so
  pages don't read as two worlds. No text in images, no watermarks, no
  uncanny people, 3:2 or 16:10, >=1920px source, ingested through
  `add-images.mjs` like everything else.
- Phase 3 step 8 (add it): after the real-photo ingest, produce
  `_incoming/GENERATION-BRIEFS.md` — one brief per gap: target folder,
  filename, subject, composition, light, what must NOT appear. Vern generates,
  drops results in `_incoming/generated-review/`, and approves per image;
  approved files are ingested with the naming above. The launch gate gains a
  box: **every generated image on the site is in a `generated/` folder, has
  honest alt text, and appears in no project gallery.**
