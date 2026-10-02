import type { Metadata } from "next"
import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import ResourceLibrary from "@/components/ResourceLibrary"
import { resourceGroups, resourceCount } from "@/lib/resources"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Specifications & Technical Documents",
  description:
    clampDescription("Preview and download spec sheets, data sheets, colour cards and SDS for StreetPrint, StreetBond, TrafficPatterns, DecoMark, DuraTherm and PreMark."),
  keywords: [
    "StreetPrint specification",
    "StreetBond data sheet",
    "StreetBond colour chart",
    "TrafficPatterns specification",
    "decorative pavement spec sheets BC",
  ],
  alternates: { canonical: `${SITE_URL}/resources` },
}

/**
 * Resources — the document library. hubss.com/resources is the benchmark:
 * product + type filters, live count, and every document carries a Preview
 * (page one pre-rendered, opened in place with Download / Open —
 * components/documents) and a Download action. All files are
 * real, live in /public/docs and are served by the CDN; sizes are baked into
 * lib/resources.ts from the actual bytes. Opens like the other indexes — a
 * full-bleed photograph — so the library reads as part of the site, not a
 * filing cabinet. 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the closing
 * line's links are underlined words; the library itself is restyled in
 * components/ResourceLibrary.tsx.
 */
export default function ResourcesPage() {
  return (
    <main className="bg-[color:var(--surface)]">
      <IndexImageHero
        src="/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-03-07-2-54-05-PM-scaled.jpg"
        alt="Rail ties in tan TrafficPatternsXD thermoplastic set into dark stamped asphalt, the railroad-inspired crosswalk in the City of Langley, installed by Square One Paving"
        eyebrow="Documents"
        title={<>The document <em>library</em></>}
        fit="The document library"
        lede={`${resourceCount} documents: the manufacturer's specifications, data sheets, colour cards and design manuals for every system Square One installs. Preview one, or download it for your plans.`}
        caption="City of Langley · TrafficPatternsXD"
        imagePosition="center 60%"
      />

      {/* ── The library ──────── */}
      <section className="section">
        <div className="container-1280">
          {/* The `hub` field (the manufacturer's own copy of a document) stays in
              the data for the record but never reaches the browser — not in
              copy, not in the client payload (Vern, 19 Sept 2026). */}
          <ResourceLibrary groups={resourceGroups.map((g) => ({ ...g, docs: g.docs.map(({ hub: _hub, ...doc }) => doc) }))} />
        </div>
      </section>

      {/* ── Spec help. One line: the closing CTA for every page is the slate
             footer, and this must not rehearse it. ──────── */}
      <section className="sec section bg-surface-warm">
        <div className="container-1280">
          <p className="max-w-[56ch] text-ink-body [text-wrap:pretty]">
            Writing a specification and need help matching a system to your traffic loading and
            substrate? Call{" "}
            <a href="tel:+16046126209" className="link">
              604-612-6209
            </a>{" "}
            or{" "}
            <Link href="/contact" className="link">
              request a site visit
            </Link>
            . Product overviews live under{" "}
            <Link href="/products" className="link">
              Products
            </Link>
            , the StreetPrint templates under{" "}
            <Link href="/patterns" className="link">
              Patterns
            </Link>
            , and the installed work under{" "}
            <Link href="/projects" className="link">
              Projects
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
