ORIENTATION — Square One Paving website (squareonepaving.com rebuild)

READ THIS FIRST, EVERY SESSION. It is the canonical brief and it lives in
the repo on purpose, so it travels with the code. Every fact below was
verified against disk, the GitHub remote, or the live Vercel API on
2026-09-09 — not copied from an earlier document. Two claims in the previous
orientation were already stale when it was written; see CORRECTIONS.

Client: Square One Paving (S1) — BC decorative pavement installer, owners
Gord and Jan Stewart, trading since 2000. Build by 21e8.studio / Based
Agency (Vern, cleveland.stordy@gmail.com). Benchmark: hubss.com — "no less,
do even better", BUT with Square One's own identity, not HUB's (see DESIGN
CANON).

A second copy of this document lives in the Claude project as
`claude/S1-orientation.md`, for chat sessions with no checkout. THIS FILE IS
CANONICAL. If they disagree, this one is right — update the other.

2026-09-11: section 11 (THE LAUNCH PASS) supersedes anything above it that
it contradicts — in particular the product list (8, no MMA), the canonical
host (lib/site.ts), the documents pipeline, and the type OPTION.


=======================================================================
1. WHERE THINGS ARE
=======================================================================

Repo (canonical):
  C:\Users\cleve\Based_Agency\based-agncy_os\Web_Projects\squareone-website
Remote:  github.com/apu21e800/SquareOne
Branch:  s1-v2-prep-2   <- all work happens here. main is merged by Vern only.
Preview: https://square-one-git-s1-v2-prep-2-based-agency.vercel.app
         <- this is what the client reviews

TRAP 1 — nested repos. `based-agncy_os` is itself a git repo containing this
one. Git run from the wrong directory silently resolves to the PARENT repo
and reports unrelated files. Always confirm before trusting git output:
    git rev-parse --show-toplevel

TRAP 2 — stale D: copies. Copies of this repo sit under D:\STUDIO-01\ from
an ABANDONED migration. Vern, 2026-09-09: "ignore them entirely." They are
stale, they are not a fallback, and one of them nearly caused a production
incident (section 2). C: is the only working copy.


=======================================================================
2. DEPLOYMENT SAFETY — READ BEFORE RUNNING ANY vercel COMMAND
=======================================================================

Correct project:  square-one / prj_D0j2acUvhY0ObF5lCMP6dnJrGer3
Team:             team_7Rnb5FldTGPFFZ4Wo5u8BE5M
The .vercel/project.json on C: is correct — verified 2026-09-09, reads
{"projectId":"prj_D0j2acUvhY0ObF5lCMP6dnJrGer3","projectName":"square-one"}.

THE NEAR-MISS. Two folders on D: holding Square One's code were linked to
prj_b51aCXeI5eihTky167k0gToETRNg / "hubss-website". Verified 2026-09-09 via
the Vercel API: that project has hubss.com AND www.hubss.com attached and
live. A `vercel --prod` from either folder would have replaced HUB's
production website with Square One's — on Based Agency's principal client
relationship.

Both were renamed to `.vercel.WRONG-hubss-link-20260908` on 2026-09-08.
Verified 2026-09-09: D:\STUDIO-01\01-21E8\clients\squareone\site\ now shows
only the renamed folder and no active .vercel. (The second folder,
D:\STUDIO-01\01-21E8\Based_Agency\based-agncy_os\Web_Projects\squareone-website\,
was not connected to that session and remains unverified — check it.)

RESIDUAL RISK — the rename fixes the symptom, not the mechanism. square-one
and hubss-website live in the SAME Vercel team, so both appear in the picker
every time anyone runs `vercel link`, anywhere. The rule is therefore
absolute, and it is Vern's:

    NEVER RUN ANY `vercel` COMMAND. Deployment is by git push — Vercel
    builds the branch automatically. There is no task on this project that
    requires the Vercel CLI.

Reading Vercel state through the Vercel MCP (deployments, projects, comment
threads) is fine. It is the CLI that is banned.
If a relink ever becomes genuinely necessary, it is Vern's to do, with the
square-one ID above — never the ID inside a `.vercel.WRONG-*` folder.


=======================================================================
3. VERIFIED STATE — 2026-09-09
=======================================================================

s1-v2-prep-2 tip:  9b85b56  "Drop four unreferenced section components and
                             the dead colorPaletteImage field"
main tip:          3f6ece6  "chore: normalize line endings (eol=lf)"

s1-v2-prep-2 is 164 commits AHEAD of main; main is 0 ahead of it.
Merge-base is 3f6ece6. That is a clean fast-forward with no divergence.
-> Everything the client is reviewing lives on a branch. The merge to main
  is Vern's decision and has deliberately not been made.

Build (run locally on the actual tip, 2026-09-09 — not just typecheck):
    tsc --noEmit      exit 0
    check-links       clean — 187 assets, 125 routes, 0 warnings
    lint-claims       clean — 145 files
    next build        exit 0, compiled in 50s

Live gate (Playwright, all 120 routes, 1440px AND 390px):
    every route 200 · 0 broken images · 0 ghost numerals ·
    0 HUB-blue elements · no horizontal overflow
    Only flag: /type-test — internal type specimen with a hard-coded old
    swatch. Unlinked, absent from the sitemap. Harmless.

Vercel: the preview alias serves 9b85b56, state READY.
Deployment protection: OFF (password, SSO and trusted-IP all disabled), so
anyone with the link can VIEW.


=======================================================================
4. WHERE IT STANDS WITH THE CLIENT — needs attention
=======================================================================

Vern emailed the review link on Fri 5 Sept 03:28 UTC to sydney@, cc jan@,
samantha@, gord@ (Gmail thread 1a06e985e8974d2e). Addresses live in
`claude/S1-client-email.md` and NEVER go on the website.

A scheduled task ("S1 client notes watch", trig_01LC6jgXqMCNhJnYjwpBcZDH,
every 2h, read-only) has checked Vercel comment threads and Gmail every two
hours since. Last run 2026-09-09 00:33 UTC, succeeded.

RESULT AFTER FOUR DAYS: zero comments, zero replies. The only inbound was
Samantha's automated out-of-office (she returned 8 Sept; nothing since).

The likely cause is not client silence — it is that they CANNOT comment.
`claude/S1-client-notes.md` still marks the Vercel **Share** step as "STILL
TO CONFIRM". Viewing works because protection is off, but people outside the
Vercel team can only leave toolbar comments after: vercel.com -> square-one ->
Deployments -> latest s1-v2-prep-2 -> Share -> invite the four addresses, or set
access to "Anyone with the link". Share the BRANCH link, not the commit link.
Confirm this before concluding the client has no feedback.


=======================================================================
5. DESIGN CANON — decisions already made, with the reasoning
=======================================================================

Do not re-litigate these. Each was decided against evidence.

BRAND — Square One's dark is NOT HUB's.
  The inherited dark was #14181D, a blue-black (R-B = -9). That is HUB's
  colour. A site that borrows it reads as a HUB regional microsite rather
  than a 25-year BC company with its own crews and record — which is exactly
  what S1's positioning leans on. It is now #1E1B18, a warm asphalt
  (R-B = +6), on the same warm axis as the brand beige #F5F3F0 and stone
  #8B8680, and harmonious with the terracotta accent #C85A3A instead of
  fighting it. Materially right too: this company installs on asphalt.
  Contrast on #1E1B18, all AA or better — white 17.1:1, body 11.2:1,
  muted 6.7:1, faint 5.4:1, legal 4.8:1.
  The token is still NAMED --surface-slate (every surface reads it); only
  the value moved. One line reverses the whole site if that call changes.
  Kinship with HUB is carried by STRUCTURE (spec panels, document tables,
  systems named as HUB names them), never by colour.

GHOST NUMERALS — retired 2026-09-07. The big pale 01/02/03 at the page
  edges are gone, markup and all. The section index survives in the eyebrow.
  A CSS guard (.ghost-index{display:none}) catches any stray.

CSS PRECEDENCE — app/refine.css is CURRENT CANON. It is unlayered and loads
  after globals.css and mobile.css, so it beats both and beats Tailwind
  utilities. Where refine.css disagrees with comments in globals.css,
  refine.css wins. Put brand-level overrides there rather than editing
  globals.css (also far cheaper to transmit).

PATTERN TILES — the StreetPrint templates on the home page are asphalt tiles
  with the template drawn as the joint line pressed into them. They were
  #A9A297 line art on white inside a stone band, i.e. invisible. The current
  treatment is both legible and materially honest.

TYPOGRAPHY — Poppins one-face; 700 for display. Headings carry
  overflow-wrap:break-word as a permanent guard, and phones (<=560px) take a
  reduced h1. Reason: ten blog titles contain "TrafficPatternsXD", which is
  380px of Poppins 700 at 40px against 342px of column on a 390px phone. The
  word spilled its line and the whole document scrolled sideways. No
  element's box overflowed, which is why ordinary layout checks miss it —
  measure TEXT NODES with Range.getClientRects(), not element boxes.

PHOTOGRAPHY — lib/curation.ts holds per-gallery verdicts (lead / hide /
  trail) plus a resolution gate; lib/work.ts hands its photos to curate().
  NEVER rename a photo file to reorder a gallery — the order is text.
  The gate ORDERS rather than deletes: 1200px+ first, 800-1199 behind,
  under 800 last. 118 of 270 rendered photos are old 667x402 WordPress
  tiles; hiding them empties whole galleries, so nothing is hidden for size
  alone. One photo is hidden outright (a legible house number).
  Full record: docs/PHOTO-PASS.md and `claude/S1-photo-pass.md`.

THE REAL CEILING — the site's quality is limited by the photo library, not
  the CSS. hubss.com looks better partly because of photography. No amount
  of design work fixes a 667px source. Getting a photographer onto two or
  three jobs is higher-leverage than another polish pass.


=======================================================================
6. CONTENT CANON — never violate
=======================================================================

NEVER INVENT: facts, figures, ratings, testimonials, clients, locations,
guarantees, standards, social posts or handles. If it is not in an S1
document, a filename, or a folder name, it does not go on the site.
  · Photo provenance: no city / client / project name unless a filename,
    folder or S1 document states it. "Lower Mainland, BC" is safe.
  · Photo privacy: hide any photo whose main subject is a licence plate,
    face, house number, or a third party's company sign. Crew in high-vis
    is fine; a customer at their front door is not.
  · S1 has NO TikTok on record. The TikTok button only renders when Site
    settings carries a real account link.

CONTACT CANON — these and nothing else:
  604-466-9902 (office) · 250-391-0270 (Vancouver Island) ·
  1-877-391-0270 (toll-free) · office@squareonepaving.com ·
  505-20800 Lougheed Hwy, Maple Ridge, BC V2X 3P2
  Vancouver Island is a SERVICE REGION with its own line — never an office,
  address or "base". Ladysmith only ever as a service-area city.
  Jan's mobile and jan@ never appear on the website (her name is fine).

FORBIDDEN STRINGS on the site: 604-612-6209, 604-309-8212, 416-540-9287,
  info@hubss.com, cleve.stordy@hubss.com, America/Toronto, any HUBSS address.
  Client email addresses never appear on the website.

HUB RELATIONSHIP — the site says plainly "Installer of HUB Surface Systems
  products" and nothing more. There is an EYES-ONLY fact about S1's standing
  with HUBSS that must never appear on the website; if you have not been
  told it, you do not need it.

PRODUCTS — no repair products (ChipFill / AggreFill / FastPatch) and no
  AirMark / airport material on S1. Business hierarchy, in order:
  1) Commercial and municipal  2) Residential driveways  3) Vapour blasting
  as an EXTRA service. Never resort these "by interest".
  Say "Blog", never "journal".

LEGACY BLOG POSTS are grandfathered — never rewrite, rename or delete a
  body. Image fixes go through lib/blog-ledes.ts.

SCHEMA/SEO claims only what is provable. Low-res sources never run
  full-bleed.


=======================================================================
7. WORKING RULES
=======================================================================

VERN'S STANDING RULES — his words, 2026-09-09
  · Never `--force` anything. No force push, no history rewrite, no forced
    worktree removal.
  · No deletions without asking — give him the command and he runs it.
  · No numbered option menus. Pick the safest non-destructive path, do it,
    and report after.
  · Verify against disk, not against documents. Repeatedly on this project
    a file has confidently described a location that had changed underneath
    it — including, once, this orientation's own predecessor.
  · Batch the work and report once.
  · Never invent a fact, figure, testimonial, location or client. If it is
    not in an S1 document, a filename or a folder name, it does not go on
    the site.
  · All work on `s1-v2-prep-2`. `main` is Vern's to merge.

GIT
  · main is untouched; Vern merges it.
  · Drift truth:
        git fetch -q origin s1-v2-prep-2 && git add -A && \
        git diff --cached --stat origin/s1-v2-prep-2
    (untracked files must be staged or they read as deletions)
  · NEVER `reset --hard` or `add -A` on Vern's machine without checking
    what is there first. A stale .git/index.lock has appeared before and
    blocks every git command until deleted.
  · If pushes 403 with "not in this session's authorized repository set",
    you are in the cloud container: push via the GitHub MCP with FULL exact
    file bytes, then verify byte-exactness with
    `git diff --stat origin/<branch> -- <path>` (empty = exact). Safest
    pattern for a large or character-heavy file: push to a scratch branch,
    diff, then PR + squash-merge — a bad transmission never touches the
    alias the client is watching. The API cannot carry binary files.
  · Adding apu21e800/SquareOne to a session's sources removes all of that
    friction. Worth doing.

TECHNICAL GOTCHAS (each cost real time)
  · Exports from a "use client" module are client references on the server —
    write a local helper instead of importing across the boundary.
  · `grid-cols-1` on phones does NOT reset `col-span-N` children — add
    `max-[900px]:col-span-1`.
  · h2 overrides must exclude `.label` and `.eyebrow`.
  · Galleries paginate client-side (WorkGallery initial={N}), so crawling
    initial HTML UNDERCOUNTS the served set. Union with the work record.
  · `node --experimental-strip-types` cannot resolve the `@/` alias.
  · Restart `next start` after every rebuild — the old process serves
    deleted CSS hashes and the page renders unstyled.
  · `pkill -f "next start"` matches your own shell and kills it. Kill
    next-server by PID.
  · Playwright in the cloud container:
        chromium.launch({ executablePath: "/opt/pw-browsers/chromium",
          proxy: { server: process.env.HTTPS_PROXY },
          args: ["--ignore-certificate-errors"] })
    Local server needs no proxy. Bound every image wait.

VERCEL COMMENT THREADS — never delete one; never resolve one until the
change is live and verified; reply in the thread first.


=======================================================================
8. OPEN — in priority order
=======================================================================

1. RESEND_API_KEY is not set in Vercel. The contact form accepts a
   submission and silently drops it — /api/contact logs to console instead
   of sending. This is a live bug on the site a client is reviewing, and
   the worst possible failure mode for a lead-gen site. Vern sets it in the
   Vercel dashboard (Preview + Production, then redeploy). Never paste the
   key into a chat.

2. Confirm the Vercel Share step, or the client cannot leave notes at all
   (section 4).

3. Merge decision: s1-v2-prep-2 -> main, a clean 164-commit fast-forward.
   Vern's call.

4. Google Drive folder "Square_One" (id 1660PGZPxjA21uZoLneD7vLpekTcGclRZ,
   owned by vernon@hubss.com) is link-shared only, so cleveland.stordy@
   gmail.com can resolve it but cannot list its contents. It needs sharing
   with that address before any of its photos can be used. Samantha's
   Dropbox photos likewise.

5. Held for Vern's yes: two hero swaps (/resources and /applications) and
   six "uncertain" photos where the location cannot be confirmed without
   inventing it. Listed in docs/PHOTO-PASS.md.

6. /services/vapor-blasting hero is a placeholder — every vapour photo on
   record is 524x315. Needs a real rig-at-work photograph from the client.

7. Sanity CMS is built but PARKED (sanity/, /studio, /api/revalidate,
   lib/cms.ts, scripts/cms-seed.ts, docs/CMS.md). Vern's email promised the
   client they could edit text, images and blog posts, so this is now a
   client-facing commitment. Needs Vern to create the project and set the
   env vars — account creation and secrets are his, never an agent's.

8. Design queue: the cards. "Three kinds of owner" and "Four services" are
   still photo-plus-white-box with two lines and an arrow — the last
   generic thing on the home page. hubss's equivalents carry application
   tag chips and a spec link.

9. Archive the April branches rather than merging them (section 9).


=======================================================================
9. THE APRIL BRANCHES — decided: DO NOT MERGE
=======================================================================

Four commits were rescued from local disk and pushed to
claude/loving-booth-bd3f7c (a7b28d6, 9c911f1, da36bb0) and
claude/mystifying-hellman (ab5d2d9). The earlier orientation framed merging
them as an open question. The evidence says no:

  · The main line has moved 272 commits since 2026-04-17. Every file those
    commits touch has been rebuilt since — Nav.tsx 31 times, globals.css 24,
    app/page.tsx 20, Hero.tsx 19.
  · ab5d2d9's "blog system" already exists on the main line and has since
    been extended to merge Sanity over MDX. Merging it re-adds a March
    lib/blog.ts.
  · The only file unique to them is components/sections/Testimonials.tsx —
    and inventing testimonials is forbidden by this project's own canon.
    That is not stranded value; it is a landmine.

Keep them as history, out of the branch list. Vern runs:
    git tag archive/2026-04-homepage-redesign origin/claude/loving-booth-bd3f7c
    git tag archive/2026-03-blog-system      origin/claude/mystifying-hellman
    git push origin archive/2026-04-homepage-redesign archive/2026-03-blog-system


=======================================================================
10. CORRECTIONS TO THE 2026-09-08 ORIENTATION
=======================================================================

· "main had one unpushed line-ending normalization commit (3f6ece6) —
  verify whether that got pushed." -> It IS pushed. It is the tip of
  origin/main and the merge-base with s1-v2-prep-2.

· "A real next build has NOT been run." -> It has, on the actual tip, on
  2026-09-09. Clean, exit 0. Vercel has also built every commit on the
  branch successfully.

· "Decide deliberately whether that redesign work should land on the main
  line — it's substantial." -> Decided. It is superseded, not stranded.
  See section 9.

· The document did not say that hubss.com and www.hubss.com are LIVE on the
  mislinked project. They are. That reframes the near-miss from a
  configuration error to a production incident that did not happen.


=======================================================================
11. THE LAUNCH PASS — 2026-09-11 (launch is planned for the week of 14 Sept)
=======================================================================

Vern's brief, executed in one batch and verified before delivery. What
changed and why, so nobody undoes it by accident:

INSTALLER, NOT MANUFACTURER. Square One installs HUB Surface Systems
products; HUB makes them. Never "our StreetPrint", never "we developed".
Performance figures are HUB's and say so (10-20 years for StreetPrint and
8+ years for StreetBond are both published on hubss.com product pages —
verified 11 Sept). HUB warrants the material (limited warranty against
manufacturing defects — its spec guide), Square One warrants the
workmanship. No pricing, lead times or "in stock" anywhere. (R) / (TM) on
first mention per page: Product.mark in lib/products.ts, rendered as a
superscript in the product H1 — never appended to the name string,
lib/work.ts matches on the bare name.

MMA IS GONE. MMAX, StreetBond Pro 220 [MMA] and Pro 250 [MMA] were removed
from lib/products, lib/resources, lib/search-index, lib/work, the nav, the
home/products/resources/about/services copy, the applications pages, the
Sanity schema and the /mmax-2 redirect (now -> /products). One old-site
photo captioned as MMAX is HIDDEN in lib/curation.ts (HIDE_EVERYWHERE)
pending Vern. The blog post "why-green-means-more-than-visibility" had
"we install MMAX" rewritten — the one deliberate exception to the
grandfathered-blog rule. The MMA files on disk (public/images/products/
mmax, public/docs/MMAX, public/docs/StreetBond/StreetBond Pro 220 [MMA],
.../Pro 250 [MMA]) are unreferenced and await Vern's git rm.

TEMPLATES. lib/palette.ts STREETPRINT_PATTERNS = HUB's ten "Popular
Patterns" from HUB's own StreetPrint Template Catalog PDF, named as HUB
prints them (Offset Brick, Diagonal Herringbone, Standard Herringbone,
Ashlar Slate, British Cobble, Stone, Eurofan, Scallop, Tile Sets, Border).
Special-purpose sections were left out on purpose. No part numbers. The
materials band links to HUB's hosted catalogue. Vern confirms the set.

CANONICAL HOST. lib/site.ts exports SITE_URL (default
https://squareonepaving.com, overridable with NEXT_PUBLIC_SITE_URL). Every
canonical, sitemap, robots, schema and OG URL derives from it — 25 files
were rewritten; the old .ca/.com split is gone. Do not hard-code a host.
Which domain is production is still Vern's call. Preview deployments are
not indexable: Vercel adds x-robots-tag: noindex on the preview host.

SCHEMA. PavingContractor without priceRange (was invented) and without
founder (nothing on record says who founded the company). geo and
openingHours are absent until Vern supplies them.

DOCUMENTS. 107 HUB PDFs stay hosted in /public/docs. Page one of every
document is pre-rendered by scripts/doc-previews.mjs into
public/docs-previews (1000px preview + 320px thumb, WebP) and indexed in
lib/doc-previews.json; run the script after adding or replacing a PDF
(needs poppler + Pillow locally, nothing runs on Vercel). 36 documents
carry hub: — the identical file on hubss.com, verified against HUB's own
registry — and the preview modal links to it as "current edition at HUB".
Product pages render a typed rail (components/documents/DocumentRail);
/resources and the search overlay share the same rows and modal. Square
One's own documents (insurance, WCB, capabilities, workmanship warranty
terms) are still missing — Vern supplies the files.

SECURITY. vercel.json now carries Content-Security-Policy-Report-Only
(report-only: logs to the browser console, blocks nothing) alongside the
existing HSTS / nosniff / frame / referrer / permissions headers. Allowed:
self, inline scripts and styles (Next needs them), cdn.sanity.io images,
Sanity API for the studio, vercel.live for the preview toolbar. Flip the
key to Content-Security-Policy only after a week of clean console on the
live domain. The contact API now escapes what visitors type before it
lands in the office inbox, and accepts an optional "location" field.

ISR. app/blog and app/blog/[slug] revalidate hourly (plus the Sanity
webhook). Do NOT add revalidate to home, gallery or product pages: they
read public/images at build time through lib/work and lib/gallery, and
public/ is excluded from the serverless bundle.

TYPE OPTION — NOT A DECISION. Poppins stays the live face. A Futura option
(Jost display + Inter text) exists behind <html data-type="futura">, set by
components/TypeToggle — a small switch that shows on preview deployments
and in development, never on production unless the URL carries
?type=futura. Neither font is preloaded, so the default site pays nothing.
Vern and the client compare on real pages and choose; then retire the
toggle, the two font loaders in app/layout.tsx and the html[data-type]
block in app/refine.css — or make it the default. A licensed Futura drops
into the Jost variable in app/layout.tsx.

DESIGN. Products mega menu: all eight systems listed at once with a live
photograph of the pointed-at system. Search overlay: thumbnails on every
row (page one for documents), matched words emphasised, a real empty state.
Home driveways band rebuilt: the 667px WordPress tile is gone, the Ten Mile
Point driveway (2048px) leads with three more from the record; the offer
card lost its decorative squares. /contact rebuilt: three-step promise,
grouped form, office rail, crew photo; the unsourced office hours line was
removed. Low-resolution photographs were pulled from full-width slots
(/resources hero, the home audience cards, the services index card).

ROUND TWO — same day, Vern's second brief ("improve the homepage too …
rank great SEO, AI SEO … ROCKSTAR mega menu … ace mobile … fill any
empty images … shock the client"):

VAPOUR BLASTING PHOTOGRAPHY. There were four real photographs, all 524px
archive tiles, and six "Photography in production" holds. No pictures were
invented. The four (plus the nozzle detail from the old site assets) were
rebuilt with a photographic upscaler (Real-ESRGAN x4, run locally; the
originals are in git history) and now carry the page: hero, three tiers,
the nozzle detail. The sixth hold shows a finished StreetBond plaza
entrance, captioned as exactly that. components/ui/ImagePlaceholder.tsx is
now unused and left in place. If Vern still wants AI imagery for this page
it must be labelled illustrative and never captioned as a Square One job.
The same upscaler was run over the blog featured images and product
gallery frames that were under 1200px (list in claude/S1-launch-pass doc).

DRIVEWAY COMPOSER. components/DrivewayComposer.tsx — pick one of HUB's ten
StreetPrint templates and any StreetBond colour, see them together as a
drawn sample board (procedural grain, no photograph, and the caption says
so). Lives on /driveways and both city pages; the home materials board
links into it (?pattern= / ?colour=). "Book a site visit with this" opens
/contact with the choice pre-filled (?pattern=&colour=&city=). This is the
one interactive moment on the site — keep it honest and keep it fast.

HOME. Audience band is three tall photographs with chips; service cards
carry three application chips and a Specs link; the materials board links
into the composer. Driveways sell "across BC by arrangement" on /driveways
and the city pages — the Okanagan/Interior line is backed by the project
record; the canon service area is unchanged.

ANSWER-ENGINE SEO. FAQPage schema wherever a FAQ is visible (driveways, the
city pages, all four service pages — the service FAQs in lib/services.ts
are written only from sentences the pages already used); BreadcrumbList on
every detail page; Service schema with areaServed on service pages;
/llms.txt (app/llms.txt/route.ts) generated from the same data as the pages;
every meta description clamped at a sentence boundary under 158 characters
(lib/seo.ts clampDescription); title tags shortened to fit ~65 characters
without touching any H1 or body (blog title tags use the first clause).

MENU + MOBILE. Services panel's "Where it goes" links carry each gallery's
lead thumbnail (lib/app-leads.ts — a static map, because the root layout
must never read the filesystem). The phone drawer opens with a swipeable
photo rail of the five services and thumbnails on the applications.

STILL WITH VERN. Production domain (.com or .ca); geo + opening hours;
which remaining HUB systems S1 actually installs; the ten templates; S1's
own documents; the hidden MMAX-captioned photo; ownership of
vancouverdriveways.com / victoriadriveways.com; Search Console and Bing
verification tags; RESEND_API_KEY and the noreply@squareonepaving.com
sender in Resend; the Vercel Share step; the git rm list above; the type
choice.


=======================================================================
FIRST MOVES FOR A NEW AGENT
=======================================================================

1. git rev-parse --show-toplevel      (confirm you are in the right repo)
2. git fetch && git log --oneline -3 origin/s1-v2-prep-2
3. git status --porcelain             (expect clean; investigate anything else)
4. Read docs/PHOTO-PASS.md and app/refine.css before touching design.
5. Ask before merging, deleting, force-anything, or running vercel.
