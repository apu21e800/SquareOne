# SEO / STRATEGY BRIEF — RockStar build brief + reconciliation
Source: HUBSS-side agent, 29 Aug 2026. Semrush data INDEPENDENTLY VERIFIED
by Cowork same day (domain_rank, ca): 44 kw / 116 visits / rank 753137 /
2 top-3 / 12 local pack / 19 image pack / 12 AI overview — exact match.
This file binds alongside S1-BUILD-PROMPT.md. Where they conflict, the
RECONCILIATION below is the ruling.

## RECONCILIATION (read first — the brief predates the current build state)

ALREADY SATISFIED — do not restart:
- "Original identity, 2-3 art directions, Vern picks": satisfied by the
  shipped v2 system + Soul Pass + the /type-test pick flow in
  docs/ROCKSTAR-PASS.md. The site is light/daylight/material — nothing like
  HUBSS's near-black. Do NOT propose new art directions from scratch.
- "One host": answered — www is canonical (live WP canonicalizes to www);
  encode 308 apex->www + matching canonicals/sitemap at cutover.
- "Never invent facts / improve only / verify gates": already §1.7/§1.2 of
  S1-BUILD-PROMPT + the Phase 1 harness. Same rules, now with teeth below.

NEWLY ADOPTED (deltas that change existing plans):
1. PRIORITY ZERO ELEVATED: the WP redirect map moves from Phase 6 to a
   pre-cutover REQUIREMENT: crawl live squareonepaving.com, inventory every
   indexed URL, map old->new, 308 at the edge in next.config (never
   redirect() in a page), no chains, ship IN the cutover deploy, verify
   with curl against production. The #2-in-Canada "stamped asphalt"
   ranking is the most valuable asset either client owns; the rebuild can
   only lose it.
2. SCHEMA CORRECTIONS (immediate): REMOVE AggregateRating from
   StructuredData.tsx (no verifiable review corpus - constitution rule 1);
   REMOVE WebSite SearchAction (site has no search). KEEP PavingContractor
   root, areaServed cities, Service/OfferCatalog. ADD: BreadcrumbList on
   detail pages, ImageGallery on project pages, FAQPage JSON-LD generated
   from the same data file that renders the native <details> FAQs.
3. IMAGE OPTIMIZER METERING (fold into ROCKSTAR Part 4): next.config
   images: trim deviceSizes/imageSizes to what layouts render, formats
   ['image/webp'] only, one quality, minimumCacheTTL 2678400 (31d).
   Pre-rendered assets (thumbnails, doc previews) go out unoptimized.
   Gallery source budget TIGHTENS to <200KB (was 300) — 19 of S1's SERPs
   carry image packs; fast images rank. Image sitemap for every content
   image. Alt text truth rules: no city names you cannot verify from
   client records, no stuffing, decorative = empty alt.
4. AI SURFACES: robots open to AI crawlers; honest llms.txt (services,
   areas, contact — only claims the site makes); FAQs stay native
   <details> in server HTML.
5. KEYWORD OWNERSHIP MAP: new artifact docs/KEYWORD-OWNERSHIP.md — one
   page owns each head term ("stamped asphalt bc", "stamped asphalt
   driveway", "asphalt driveway maple ridge", ...); every related page
   links to the owner with head-term anchor. Build it during Phase 2;
   titles/H1s/anchors obey it thereafter.
6. LOCAL PAGES PLAY: 12 local-pack SERPs = city/area pages are the edge
   HUB cannot touch — but ONLY areas with real completed work, each
   anchored by real photography from that area (media pass supplies).
   No programmatic city farm. Post-media phase.
7. BASELINE REPORTING: 44 keywords / 116 visits is the floor. Launch gate
   gains: report against this baseline post-cutover (Cowork re-pulls
   Semrush).

TENSION FLAGGED (decision recorded, revisit only with Vern):
- S1-BUILD-PROMPT §2.3 locks applications at 19 (mirroring HUBSS); this
  brief warns against pages fighting for one term. RULING: keep the 19,
  but the ownership map governs — /driveways owns ALL driveway head terms
  (both driveway app slugs already 301 there), application pages target
  their specific long-tails only, and Phase 6's audit checks for
  cannibalization before cutover.

QUESTION ONLY VERN CAN ANSWER (do not act without it):
- Is the HUB<->S1 supplier/installer relationship current and formal
  enough to state publicly ("certified applicator" / "authorized
  installer")? If yes, the mutual link (HUB applicator page <-> S1
  "systems by HUB") is the most honest backlink either site can get and
  could put this agency's clients in 3 of the top 5 for "stamped asphalt"
  in Canada. Wording from Vern per S1-BUILD-PROMPT §9 Q6.

## THE BRIEF (verbatim, binding through the lens above)

[Full text as received 29 Aug 2026 — Who Square One is; baseline; Priority
Zero; constitution (never invent facts / improve only / original identity /
one page per head term); engineering playbook (edge redirects, one host,
optimizer metering, <200KB sources, AI surfaces, contractor schema, local
pages, line endings, no reset --hard, verify on production with
screenshots); the HUB link question; first five moves; bar to clear.
Where detail is needed, this reconciliation + S1-BUILD-PROMPT govern; the
original message is preserved in the project record.]
