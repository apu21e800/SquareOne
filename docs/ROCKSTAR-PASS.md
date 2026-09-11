# THE ROCKSTAR PASS — luxury authority, executed

Branch s1-v2-prep-2. S1-BUILD-PROMPT.md §1 hard rules still bind (canon
contact data, no invented stats, orange budget, Canadian copy). BUT this
pass formally AMENDS canon §2.5 typography — see Part 1. Client verdict on
the current state: "not pro yet, thin fonts, logo not working, mega menu
sucks." They are right. The wabi-sabi restraint stays in the bones; the
voice of the type becomes luxury authority — the register of a fashion
house, not a whisper. Think Tom Ford: high contrast, spaced caps,
absolute confidence.

PART 1 — TYPOGRAPHY OVERHAUL (canon amendment)

1a. Build /type-test FIRST (unlinked route, noindex). Three complete
directions rendered as the real homepage hero + a section header + a
product card, side by side, switchable by tab:
  A. FRAUNCES (Google Fonts, variable) 560-620 weight for display,
     Inter 450+ for body. High-contrast crafted serif — luxury with soul.
  B. PLAYFAIR DISPLAY 600/700 display + Inter body. Classic didone
     fashion-house authority.
  C. SPACED CAPS: Archivo or Jost 600, uppercase, letter-spacing 0.08em
     for display lines + Inter body. The literal Tom Ford wordmark DNA.
All three: NOTHING below weight 400 anywhere. Push the deploy, report the
/type-test URL, and STOP for the pick (Vern + team choose on real screens).

1b. On the pick, apply sitewide:
- Display/H1/H2 in the chosen face; sizes UP not down: hero clamp(3.5rem,
  6vw, 6rem); section H2 clamp(2rem, 3.5vw, 3rem). Tight leading (1.02
  display), generous space around.
- Eyebrows/labels become spaced caps 600 (0.12-0.16em) regardless of pick
  — that's the luxury signature.
- Body: Inter 450-500, 17px, line-height 1.65. Captions 500. The words
  "font-weight: 300" and "font-weight: 200" exit the codebase entirely
  (ghost numerals may keep 200 — they are texture, not text).
- Buttons: labels in spaced caps 600 13px, padding up (16px 28px),
  primary keeps #F26430, hover states crisp (120ms).
- AMEND S1-BUILD-PROMPT.md §2.5 and CLAUDE.md with the chosen stack so no
  future agent "fixes" it back to Inter-only-300. Record: "amended per
  client direction, <date>".

PART 2 — THE LOGO, WORKING
- Over-hero state: white wordmark + light nav links whenever the nav sits
  on an image at scroll-top; swap to dark wordmark + ink links once the
  scrolled bar gains its backdrop. Use the official white/dark SVGs (never
  PNG upscales — the current render is muddy).
- Size up: wordmark 36-40px tall in the bar; footer version larger still.
- If any surface still shows the retired "S1" text square, kill it.
- Favicon/OG re-checked against the SVG-cut icon.

PART 3 — MEGA MENU, REBUILT AS A LUXURY OBJECT
Scrap the current products panel. New build:
- Full-width panel, 32px vertical padding, white, hairline top/bottom,
  8-column grid: cols 1-2 = category list (spaced-caps labels, count
  beside each); cols 3-6 = products of the hovered/focused category as
  name + one-line + 56px thumbnail rows (real product photos, rounded
  2px); cols 7-8 = one large featured image (tall crop, scrim caption,
  links to /projects) that changes per category.
- Physics: opens 150ms ease-out on hover AND click, closes on leave/Esc/
  outside; keyboard: tab through categories with arrow-key column moves;
  visible :focus-visible rings.
- Mobile drawer gets the same content hierarchy, full-screen, spaced-caps
  section labels, quote CTA pinned.
- Services keeps a simple elegant dropdown (4 rows, thumbnails optional).

PART 4 — IMAGERY PRESENCE (art direction up, not just files in)
- Scale UP image usage: Selected Work becomes a 2-wide editorial grid
  (large frames, 4:3, captions in the new caps style); every index hero
  gets a full-bleed image band; product pages open on a 60vh image.
- Compress every source >600KB via the pipeline (target hero <500KB,
  cards <300KB) — this kills the cold-load blur outsiders saw.
- Add a post-build cache-warm step: script hits every route + key
  _next/image renditions (640/1080/1920) after deploy; wire into CI or
  npm run warm -- --base=<url>.
- Keep the unified grade + scrims. Keep captions. Where a gallery is
  thin, the layout must still look intentional (no orphan single images).

PART 5 — UI CRAFT DETAILS (the hundred small notches)
- Footer: recompose as a designed object in the new type (columns
  tighter, spaced-caps headings, real logo, hairlines aligned to grid).
- Forms: taller fields (52px), visible labels in caps 12px, focus ring in
  ink, error/success states styled, button full-width on mobile.
- Cards: consistent 4:3 media, tighter text block, hover = image 1.02 +
  hairline darkens (no shadow creep).
- Section spacing audit: 96-128px between major sections desktop, no
  accidental 40px gaps; ghost numerals aligned to one baseline system.
- Micro: selection colour (stone bg/ink text), scrollbar left native,
  focus-visible everywhere, active nav state, smooth anchor scrolls.
- Sweep at 390/768/1440 after every part; nothing ships that fails a
  width.

SEQUENCE: 1a (STOP for pick) -> 1b -> 2 -> 3 -> 4 -> 5. One part per
commit minimum. After Part 5: full verify + report per §8 with the
preview URL and screenshots of hero, mega menu open, and a product page
in the new type.
