# FIRST-DRAFT PASS — 2026-08-31

Client direction (Vern, evening of 30–31 Aug): full DDB-grade first draft
for the girls' in-depth review tomorrow; hubss.com is the standard to match
or beat (light theme); full creative licence; foreground vapour blasting,
Victoria & Vancouver residential driveways, and commercial applications; no
asphalt-repair product lines on S1; free use of HUBSS imagery where the
location is verifiably western Canada. Type: the girls picked C — with
Avenir and Poppins requested as comparable options.

## Shipped (commits ffb7871..471f7f2)

1. TYPE DIRECTION C SITEWIDE — Jost spaced caps carries every display
   voice (uppercase 600, 0.08em; hero 4.25rem / H1 3.4rem / H2 2.25rem);
   labels, buttons, nav, captions, stat + ghost numerals unify on the
   display face; Inter 450–500 body; journal prose headings sentence case.
   /type-test: C marked selected, S1–S4 sans alternates added (Poppins,
   Mulish + Nunito Sans as the Avenir register, Montserrat). Real Avenir
   is a licensed face — one font licence away if S2/S3 wins.
   Canon §2.5 re-amended in S1-BUILD-PROMPT.md.

2. IMAGERY — 35 location-named BC photos (scripts/ingest-2026-08-31.mjs
   is the manifest; EXIF/GPS stripped, ≤2400px, ≤500KB):
   - applications/driveways 6 → 20 — the residential wall (Victoria ×3,
     Saanich, North/West Saanich, Sooke, Mill Bay, Langley, Burnaby,
     Maple Ridge, Richmond, West Vancouver, Ten Mile Point) — all from
     S1's own legacy library.
   - Tofino townhome → private-driveways. Commercial: Kelowna 5-years-on,
     Gateway Casino Delta, Ralphs Farm Market Langley, Hillside Mall
     Victoria. Parks-paths +3. Splash-pads gets its first real photo
     (Keswick, Burnaby). DecoMark +4 BC, DuraTherm Maple Ridge ×2,
     TrafficPatternsXD +3, PreMark North Van green lane.
   - services/vapor-blasting — three real S1 vapour photos wired
     (Granville Island, parking lot, walkway); borrowed fallbacks retired.

3. SALES FORCE — homepage FieldPanorama is now the vapour-blasting
   breath (real Granville Island shot, eyebrow + arrow → /vapor-blasting).
   Applications rows reordered: Driveways first (Victoria & Vancouver
   homes), Commercial spaces second, Vapour blasting closes; rows funnel
   to /applications content instead of /contact dead-ends.

4. CANON — Ladysmith removed from /vapor-blasting metadata (never an
   office/location); its canonical host aligned to .ca pending the
   cutover-domain decision in docs/SEO-BRIEF.md.

## Tomorrow's review — what to look at

- The caps display system on /, /driveways, /projects, /products — does
  the Tom Ford register hold at hero scale on real screens?
- /type-test — C vs S1–S4 one-glance check (the Avenir question).
- /driveways — the 20-shot Victoria/Vancouver gallery.
- Homepage vapour breath + reordered application rows.

## Open (unchanged queue)

Schema fixes (AggregateRating/SearchAction removal), Priority Zero WP
redirect map, lib/site.ts centralization, Phase 5 Resend key, vapour AI
imagery round (§11) for the vapour page hero wall, owner-gated proposals
(docs/PROPOSALS-owners.md), bus-lanes/LEED/heat-island photo calls.
