# Media & Content Population Map (s1-v2-prep)

Status as of 14 Aug 2026. What is real, what is placeholder, what to do.

## Blog — DONE, no work needed
51 MDX posts live in `content/blog/` and render automatically via
`lib/blog.ts`. The Claude Design prototype only mocks 3 cards — that is the
template, not the content. Nothing to migrate.

## Technical documents — WIRED (hotlinked)
`/resources` page + `lib/resources.ts` added: 71 PDFs in 6 product groups,
hotlinked to squareonepaving.com. Before WP is decommissioned, run
`node scripts/mirror-docs.mjs` (needs network) to localize into
`public/docs/`, then swap hrefs.

## Images — the swap plan
- Library: 920 files / 228MB in public/images. Products and applications
  dirs are already populated and structured by slug.
- `S1_update_v2/photos/` (139 files) needs a CULL: many raw
  `UNADJUSTEDNONRAW_*.jpg` iPhone exports. Pick 3–5 per subject, rename
  descriptively (municipality-product-year.jpg), compress via sharp.
- `S1_update_v2/Old Square One Web Assets/` (426 files) = legacy WP export,
  incl. Galleries by application. Mine for project-detail galleries.
- Design placeholders carry captions ("Municipality · Product · Year") —
  each caption IS the image request for that slot.

## Swatches & pattern PNGs — WAITING ON VERN
Colour swatch + asphalt print pattern PNGs exist offline. Drop into:
  public/images/products/<slug>/swatches/   (colour chips)
  public/images/products/<slug>/patterns/   (stamp patterns)
Product detail template gets a swatch row + pattern gallery at build pass.
Note: colour data also exists as the palette PDFs on /resources.
Logos: real brand marks already in public/images/S1_update_v2/logos/
(19 files incl. streetbond-logo-color + S1 marks) — wire at style pass.

## Contact canon — APPLIED in this branch
604-466-9902 office · 250-391-0270 Vancouver Island ·
office@squareonepaving.com · Maple Ridge address. Ladysmith removed as
office everywhere (kept as service city / client credit). StructuredData
second address dropped. Old numbers/emails purged (0 residual).

## Redirects — RETARGETED
streetbond-sr→streetbond, airmark→/products, parks-paths & splash-pads &
community-branding→public-spaces, regulatory-markings & airports & LEED→
/applications. /documentation→/resources now resolves to a real page.
