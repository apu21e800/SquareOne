# S1 Status Dashboard

**Current work:** SOUL PASS complete (10 moves, one commit each) — awaiting Vern review
**Branch:** s1-v2-prep-2 (pushed; Vercel Git-connected, previews live)
**Preview URL:** https://square-one-git-s1-v2-prep-2-based-agency.vercel.app (Vercel login or share link — Deployment Protection is ON)
**Phase state:** Phase 0 done · Soul Pass done · Phase 1 (harness/CI, media quarantine, PR to main) is next

---

## Soul Pass — what shipped (commits 2bfc631..b535c44)

1. **Hero** — full-bleed 92vh White Rock Pier (S1's own frame, not shared with hubss.com); UBC photo stays in Selected Work; split hero lives on at /driveways
2. **The breath** — hero → tight stats → editorial statement band → services → field panorama (Ellis Point) → work → applications as contents-rows → trust → journal → slate close
3. **Material** — feTurbulence grain @2.8% on paper bands only; herringbone/running-bond placeholder patterns; swatch chips on /driveways
4. **Type** — .display-xl (5.5rem) on hero + 5 index headers; ghost numerals (homepage 01–05, index pages = collection counts); journal pull-quote with 2px orange rule
5. **One grade** — contrast(1.02) saturate(0.95) on card/thumb imagery; scrim + caption on image blocks; Selected Work curated warm/cool
6. **Harvest** — 91 BC photos: S1 legacy library first, HUBSS top-ups (durashield ×2, 3 project frames); scripts/add-images.mjs ported (npm run images:add)
7. **Voice** — sales adjectives dead; practical CTA lines; Vapour datum fixed (also fixes /projects filter); **all 24 forbidden-number instances → 604-466-9902**
8. **Motion** — MotionBreath reveal system (fade-up 14px/500ms, 60ms stagger, count-up stats); card zoom 1.015; orphan animated components deleted
9. **Ghosting bug** — root-caused to main's SSR-serialized whileInView pattern; v2's new system is structurally immune (above-fold never hidden)
10. **The mark** — real wordmarks in nav/footer; favicon set from the vector icon (icon.svg/png/apple/ico); official 1200×600 OG image; S1 text square retired

## Known shortfalls (need Vern's photo call — Phase 3 contact sheets)
- durashield 5/6 · splash-pads 1 · leed-urban-heat-island 1 · bus-lanes 1
- Projects still under 4 images: most (only ubc-musqueam 5, little-italy 4 meet target; location-unverifiable photos were NOT guessed into galleries)
- Vapour-blasting photography: still nothing above 525px — §11 generation briefs pending

## Questions for Vern (unchanged from Phase 0, §9)
DNS/registrar · WordPress host access · Resend account · logo vector for lettering ·
about-page people · HUB wording · canonical host · GA4 · do-not-publish list ·
journal provenance · Vercel ownership

**Blocked on:** nothing — ready for Soul Pass review, then `go` for Phase 1
