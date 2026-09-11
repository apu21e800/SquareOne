# THE SOUL PASS — from correct to unforgettable

Branch: continue on s1-v2-prep-2 (or s1-launch if created). Read
S1-BUILD-PROMPT.md §1-2 first — every hard rule and canon value still binds.
This pass is composition, material, imagery and copy. It is NOT a redesign:
the v2 tokens, the orange budget, one-dark-close, hairlines — all unchanged.

THE THESIS. hubss.com is dark, loud, cinematic — a manufacturer selling
ambition. S1 beats it by being its opposite: daylight, material, assured.
A gallery, not a showroom. Wu wei: nothing strains, nothing sells; the work
convinces. Wabi sabi: pavement is weathered, textured, rained-on — we
photograph the imperfection instead of hiding it. Where HUBSS turns the
volume up, S1 lowers it and lets the ground speak. Every decision below
serves that inversion.

MOVE 1 — OWN THE OPENING. S1's hero currently uses the same UBC × Musqueam
photo hubss.com opens with. Unacceptable for a sibling site. Replace with a
full-bleed, 92vh single-image hero: a LOW, wet, close-to-the-surface BC
shot from S1's own library (search public/images and _incoming for:
herringbone macro, streetbond plaza at dusk, rain-washed crosswalk — pick
the most tactile, not the most colourful). Headline bottom-left over a
rising slate scrim: eyebrow, then "Surfaces that define a place" with the
orange square full stop, then the two CTAs. Caption bottom-right
(Municipality · Product · Year). A quiet scroll cue. The current 55/45
split hero moves to /driveways where it fits the softer audience. The UBC
photo stays in Selected Work — it is S1's install and belongs there.

MOVE 2 — THE BREATH. Uniform section rhythm is why it feels like a shell.
Recompose the homepage with density variance:
hero (full-bleed) -> stats (tight) -> EDITORIAL STATEMENT BAND -> services
(dense) -> FIELD PANORAMA -> selected work -> applications as contents-rows
-> trust + one testimonial -> journal -> slate close.
- Editorial statement band: paper, one line set in display weight 200:
  "Twenty-five years on BC ground" with the orange square full stop.
  No button, no image, no link. It is the page inhaling.
- Field panorama: one full-bleed image band, ~55vh, fixed subtle parallax
  none (no parallax — just the image), caption only. The catalogue's
  "In the Field" move. Choose a wide roadway/greenway shot.
Two full-bleed breaths per page, never more.

MOVE 3 — MATERIAL. Reintroduce texture, quietly, as wabi sabi:
- Asphalt grain on paper bands only: inline SVG feTurbulence data-URI at
  2.5-3% opacity. Never on white, never on slate, never behind body text
  columns.
- Any remaining CSS-placeholder surfaces get the crafted pavement patterns
  (herringbone/running-bond repeating-gradients in stone tones), never
  flat grey.
- When swatch/pattern PNGs arrive they render as physical chips: 1px
  hairline, 2px radius, tight grid, names in 11px caps under each.

MOVE 4 — TYPE MUSIC. Increase the contrast between scales, not the count
of scales. Page-opening display lines may clamp up to 5.5rem (300 weight,
-0.035em). Labels and captions stay tiny (11-12px). Ghost index numerals
("01"-"08", 10rem, weight 200, #F1EEE9) behind every homepage section
header and index page header, clipped. Journal posts get one pull-quote
treatment: 1.75rem/300 with a 2px orange left rule.

MOVE 5 — ONE GRADE. Every card/thumbnail image gets a unified treatment so
grids read as one photographed world: css filter contrast(1.02)
saturate(0.95) on card imagery only (heroes untouched), the slate scrim +
white caption on every image block without exception. Order project grids
so adjacent cards alternate warm/cool dominance — no two near-identical
frames side by side.

MOVE 6 — WEST-COAST HARVEST from ../hubss-website (read-only). Copy OUT
only photography of BC / west-coast projects: filenames and gallery
folders referencing Vancouver, Victoria, Nanaimo, Surrey, Burnaby,
Richmond, Langley, White Rock, Mission, Kelowna, Maple Ridge, Coquitlam,
New Westminster, Sechelt, Squamish, Bowen Island, UBC. EXCLUDE anything
Ontario/US (York, Toronto, Markham, Newmarket, US cities) and anything
whose location you cannot determine. Route everything through the image
pipeline (add-images pattern: EXIF stripped, <=2400px q85, meaningful
names). Targets: every project folder >=4 images, applications >=6,
products >=6. Fill S1 gaps first (vapour blasting excepted — §11 of the
build prompt governs that). Manufacturer beauty shots of products are fair
game for product galleries; the hero is not shared with hubss.com, ever.

MOVE 7 — THE VOICE, TIGHTENED. Sweep all UI copy (not journal posts):
shorter sentences, zero sales adjectives ("premium", "stunning",
"industry-leading" all die). Concrete replaces abstract: "Applied over two
nights so the school run never stopped." beats any slogan. Every
section-header pair (eyebrow + H2) rewritten to quiet + specific. CTAs
keep their labels; supporting lines become practical ("We walk the site
before we quote it."). Canadian spelling throughout.

MOVE 8 — MOTION AS BREATH. Exactly this set, nothing more: sections fade
up 14px/500ms once, 60ms stagger between siblings; card hover scales its
image 1.015 inside the crop; ghost arrows nudge 4px; stat numerals count
up once; nav underline wipes. Everything honours prefers-reduced-motion.
Delete any other animation found.

MOVE 9 — FIX THE GHOSTING BUG. On the deployed homepage, services card
titles render washed-out (opacity stuck mid-reveal) — visible on first
paint before any scroll. Find the reveal implementation, ensure observers
fire for above-fold content and states resolve to opacity 1. Verify on
the Vercel preview, not just localhost.

MOVE 10 — THE MARK. Real logos exist:
_incoming/S1_update_v2/logos/offical logos/ has "Square One logo
(dark).svg" and "(white).svg" plus icon variants. Wire them: nav (dark on
light), slate footer (white), favicon from the icon (app/icon.svg +
app/icon.png 512 + apple-icon 180), and the ready-made
"Square One - Open Graph Image.png" as the default OG image. The text
"S1" square retires.

VERIFY, then report per §8 of S1-BUILD-PROMPT.md: build green, homepage
at 390/768/1440 screenshots, the orange-budget count per viewport, which
HUBSS images were harvested (list by target folder with counts), and
before/after of the hero. Commit granularly: one move per commit where
practical.
