# S1 Status Dashboard

**Current Phase:** Phase 0 — Orient and secure  
**Branch:** s1-v2-prep-2 (backup complete, up to date with origin)  
**Preview URL:** [Not yet available — Phase 1 will connect Vercel to Git]  
**PR:** [Will open in Phase 1]

---

## Phase 0 Gate Results

### ✅ PASSED
- Vercel preflight: Correct project (square-one / prj_D0j2acUvhY0ObF5lCMP6dnJrGer3)
- HUBSS reference accessible at ../hubss-website
- Backup push: Branch s1-v2-prep-2 synced to origin (0 unpushed commits after fetch)
- Node version: v24.11.1 (exceeds 22+ requirement)
- Dependencies: npm ci completed (505 packages, 13 vulnerabilities noted)
- TypeScript: ✓ Clean (npx tsc --noEmit)
- Build: ✓ Passed (25.7s, 105 routes)
- Env backup created: .env.local.bak-20260828

### ⚠️ PARTIAL / NOTED
- **lint script added** per §10.3, but `next lint` command fails with directory path error
  - HUBSS project also has no lint script
  - TypeScript checking runs during build, so type safety is covered
  - Will reassess in Phase 1 or accept build-time type checking as sufficient

### ❌ ISSUES FOUND (Expected — Phase 2 will fix)
- Forbidden phone number (604-612-6209): **22 occurrences across 11 files** (excluding S1-BUILD-PROMPT.md)
  - More than the 13 instances originally documented
  - Files: Footer, MobileStickyCTA, StructuredData, about, vapor-blasting (2 routes), contact, privacy, terms, CTASection, resources
- Ladysmith references: **15 files** (mostly docs, CLAUDE.md, components)
- hubss (case-insensitive): **13 files** (mostly docs, scripts, READMEs)

### ✅ CLEAN
- **Contact route defaults:** office@squareonepaving.com ✓ (no HUB contamination)
- **Timezone:** America/Vancouver ✓
- info@hubss.com: Only in S1-BUILD-PROMPT.md (clean)
- 604-309-8212: Only in S1-BUILD-PROMPT.md (clean)
- 416-540-9287: Only in S1-BUILD-PROMPT.md (clean)
- America/Toronto: Only in S1-BUILD-PROMPT.md (clean)

---

## Media Inventory

### public/images/S1_update_v2/ (raw media)
- **593 files** (88.04 MB) — all git-tracked
- Breakdown: 373 jpg, 9 jpeg, 203 png, 4 pdf, 4 svg
- 15 UNADJUSTEDNONRAW files
- **IS SERVED** (under public/, exclusion only affects function tracing)
- Phase 1 will move to `_incoming/` (out of public/)

### Project folders (21 folders)
- Each has **1 file** — NOT empty as prompt expected
- Will need cleanup in Phase 3

### Product folders (12 folders)
- Naming inconsistency: both `traffic-patterns` and `trafficpatterns` exist (also `-xd` variants)
- airmark has 13 images (S1 doesn't sell AirMark per §2.2)

### Application folders (17 folders)
- Various image counts, some well-stocked (bus-bike-lanes: 21, parking-lots: 18)

### public/docs/ (§10.4)
- **138 PDFs on disk** (135.95 MB)
- **71 registered in lib/resources.ts**
- **67 orphaned** (on disk but not linked)
- Phase 3 decision: register for StreetBondSR/applications OR remove deadweight

---

## Existing Scaffolding

**Present:**
- CLAUDE.md, README.md, scripts/ (5 files)
- app/sitemap.ts, app/robots.ts
- components/StructuredData.tsx
- redirects() in next.config.ts

**Missing (will add in later phases):**
- lib/site.ts (Phase 2)
- SECURITY_HEADERS (Phase 6)
- .github/workflows/ (Phase 1)

---

## Questions for Vern (from §9)

**CRITICAL PATH:**

1. **DNS / registrar** for squareonepaving.com — who has login?
2. **WordPress host** — who has access for backup?
3. **Resend** — S1's own account or Based Agency's?

**Pre-Phase 3:**

4. **Logos** — which of 19 files is canonical? Vector available?
5. **About page** — team names, roles, photos, testimonials?
6. **HUB wording** — "authorized installer" vs "installer of HUB products"?

**Pre-Phase 7:**

7. **Canonical host** — www vs apex? (match WordPress)
8. **GA4** — property ID or Vercel Analytics only?
9. **Private photos** — any do-not-publish?
10. **Journal** — written for S1 or adapted from HUBSS?
11. **Vercel ownership** — transfer to client team post-launch?

---

## Next: Phase 1

- Create s1-launch branch
- Quarantine raw media (S1_update_v2 out of public/)
- Port HUBSS verification harness + CI
- Connect Vercel to Git → preview URLs
- Open PR to main

**Blocked on:** Nothing — ready for `go`
