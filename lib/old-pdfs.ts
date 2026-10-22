/**
 * The old site's documents → the same document on this site (22 Oct 2026).
 *
 * WHY. The WordPress site kept its spec sheets, data sheets and colour cards
 * under /wp-content/uploads/<year>/<month>/<file>.pdf, and Google still lists
 * 40 of those addresses (Search Console, Page indexing, read 22 Oct 2026).
 * Since the move every one of them answered 403 Forbidden from Vercel's
 * firewall (x-vercel-mitigated: deny), which turns away /wp- addresses.
 * hubss.com, on the same Vercel team, redirects its own old uploads and
 * those pass, so a redirect is the way through. An engineer who searched for
 * a specification found a dead end, and Google drops a document that keeps
 * failing.
 *
 * Now each address goes to the document itself, the copy the library lists
 * (lib/resources.ts):
 *
 *  - SAME_FILE: 34 addresses whose file is here under the same name. The
 *    documents in public/docs were copied from those uploads
 *    (scripts/mirror-docs.mjs), so the name is the file. The 2022 and 2025
 *    pattern catalogues both go to today's edition.
 *  - RENAMED: 5 whose file is here under another name, matched by hand,
 *    never on a guess: the same TrafficPatternsXD documents, and the
 *    StreetBond colour card's newer edition (the 2021 card's successor).
 *  - Anything else under /wp-content/uploads/ that is a document goes to
 *    /resources, the library, as hubss.com's old documents do. That takes
 *    the 2021 thermoplastic colour chart, which no single file here
 *    replaces, and any old address Search Console doesn't show.
 *
 * Nothing else under /wp-content changes: old images and WordPress's own
 * addresses still get Vercel's 403, which is right for the robots that probe
 * them.
 *
 * next.config.ts spreads oldPdfRedirects() into its redirects.
 * `npm run test:redirects` checks every destination is a real file and that
 * each of the 40 addresses lands where this file says.
 */

export interface Redirect {
  source: string
  destination: string
  permanent: true
}

/** Same file name, same document. */
export const SAME_FILE: Record<string, string> = {
  "/wp-content/uploads/2021/04/Adhesion-Promoter-Concentrate-rev-4-2019.pdf": "/docs/StreetBond/Adhesion-Promoter-Concentrate-rev-4-2019.pdf",
  "/wp-content/uploads/2021/04/Application_Instructions_Premark.pdf": "/docs/PreMark/Application_Instructions_Premark.pdf",
  "/wp-content/uploads/2021/04/BR-SB-CAPA_StreetBond_Brochure_041414_sm.pdf": "/docs/StreetBond/BR-SB-CAPA_StreetBond_Brochure_041414_sm.pdf",
  "/wp-content/uploads/2021/04/Duratherm-Sealer-2.pdf": "/docs/DuraTherm/Duratherm-Sealer-2.pdf",
  "/wp-content/uploads/2021/04/DurathermColorPalette181010.pdf": "/docs/DuraTherm/DurathermColorPalette181010.pdf",
  "/wp-content/uploads/2021/04/MSDS_SB_Colorant_Fashion.pdf": "/docs/StreetBond/MSDS_SB_Colorant_Fashion.pdf",
  "/wp-content/uploads/2021/04/Premark-Sealer-2.pdf": "/docs/PreMark/Premark-Sealer-2.pdf",
  "/wp-content/uploads/2021/04/SB-150B_MSDS_StreetBond150_Part_B.pdf": "/docs/StreetBond/SB-150B_MSDS_StreetBond150_Part_B.pdf",
  "/wp-content/uploads/2021/04/SB-150NT-StreetBond150-Flat-Surface-Specification-SEPT-2013_HUB.pdf": "/docs/StreetBond/SB-150NT-StreetBond150-Flat-Surface-Specification-SEPT-2013_HUB.pdf",
  "/wp-content/uploads/2021/04/SB-CLA_StreetBondCL_Part_A.pdf": "/docs/StreetBond/SB-CLA_StreetBondCL_Part_A.pdf",
  "/wp-content/uploads/2021/04/SB-CLR_StreetBond_Colorant.pdf": "/docs/StreetBond/SB-CLR_StreetBond_Colorant.pdf",
  "/wp-content/uploads/2021/04/SB-SLR_StreetBond_Sealer.pdf": "/docs/StreetBond/SB-SLR_StreetBond_Sealer.pdf",
  "/wp-content/uploads/2021/04/SDS_Preformed-Thermoplastic_PreMark-v.5.pdf": "/docs/PreMark/SDS_Preformed-Thermoplastic_PreMark-v.5.pdf",
  "/wp-content/uploads/2021/04/SDS_TrafficScapes_TrafficPatterns-v.4.pdf": "/docs/traffic-patterns/SDS_TrafficScapes_TrafficPatterns-v.4.pdf",
  "/wp-content/uploads/2021/04/SDS_TrafficScapes_TrafficPatterns_Sealer-2.pdf": "/docs/traffic-patterns/SDS_TrafficScapes_TrafficPatterns_Sealer-2.pdf",
  "/wp-content/uploads/2021/04/Sealer-1.pdf": "/docs/traffic-patterns/Sealer-1.pdf",
  "/wp-content/uploads/2021/04/Sealer-2-1.pdf": "/docs/DecoMark/Sealer-2-1.pdf",
  "/wp-content/uploads/2021/04/Sealer-2.pdf": "/docs/traffic-patterns/Sealer-2.pdf",
  "/wp-content/uploads/2021/04/Sealer-Concentrate-rev-4-2019.pdf": "/docs/StreetBond/Sealer-Concentrate-rev-4-2019.pdf",
  "/wp-content/uploads/2021/04/Specification_Preformed-Thermoplastic_PreMark_SK_90_SA.pdf": "/docs/PreMark/Specification_Preformed-Thermoplastic_PreMark_SK_90_SA.pdf",
  "/wp-content/uploads/2021/04/Specification_Preformed-Thermoplastic_PreMark_ViziGrip_SA.pdf": "/docs/PreMark/Specification_Preformed-Thermoplastic_PreMark_ViziGrip_SA.pdf",
  "/wp-content/uploads/2021/04/Specification_Premark_SK_Bike_Lane_Green_with_SA.pdf": "/docs/PreMark/Specification_Premark_SK_Bike_Lane_Green_with_SA.pdf",
  "/wp-content/uploads/2021/04/StreetBond-Specification_Imprinted-Asphalt.pdf": "/docs/StreetBond/StreetBond-Specification_Imprinted-Asphalt.pdf",
  "/wp-content/uploads/2021/04/StreetBond_Tech_Info_150AL-rev-190731-v2.pdf": "/docs/StreetBond/StreetBond_Tech_Info_150AL-rev-190731-v2.pdf",
  "/wp-content/uploads/2021/04/StreetPrint_Cutom-Stamping-Template-Guidlines.pdf": "/docs/StreetPrint/StreetPrint_Cutom-Stamping-Template-Guidlines.pdf",
  "/wp-content/uploads/2021/04/custom_design_guidelines_duratherm.pdf": "/docs/DuraTherm/custom_design_guidelines_duratherm.pdf",
  "/wp-content/uploads/2021/04/specification_decomark_sk_with_sa.pdf": "/docs/DecoMark/specification_decomark_sk_with_sa.pdf",
  "/wp-content/uploads/2021/04/specification_decomark_vg.pdf": "/docs/DecoMark/specification_decomark_vg.pdf",
  "/wp-content/uploads/2021/04/specification_trafficpatterns_125_with_sa.pdf": "/docs/traffic-patterns/specification_trafficpatterns_125_with_sa.pdf",
  "/wp-content/uploads/2021/04/specification_trafficpatterns_solid_sheets_125.pdf": "/docs/traffic-patterns/specification_trafficpatterns_solid_sheets_125.pdf",
  "/wp-content/uploads/2021/04/specification_two_component_sealer.pdf": "/docs/DecoMark/specification_two_component_sealer.pdf",
  "/wp-content/uploads/2021/04/standard_design_manual_duratherm.pdf": "/docs/DuraTherm/standard_design_manual_duratherm.pdf",
  "/wp-content/uploads/2022/06/SquareOne-StreetPrint-Patterns.pdf": "/docs/StreetPrint/SquareOne-StreetPrint-Patterns.pdf",
  "/wp-content/uploads/2025/06/SquareOne-StreetPrint-Patterns.pdf": "/docs/StreetPrint/SquareOne-StreetPrint-Patterns.pdf",
}

/** The same document under today's name. */
export const RENAMED: Record<string, string> = {
  "/wp-content/uploads/2021/04/DesignManual_TrafficPatternsXD.pdf": "/docs/TrafficPatternsXD/TrafficPatternsXD-Design-Manual.pdf",
  "/wp-content/uploads/2021/04/French_Specification_TrafficScapes_TrafficPatternsXD_French.pdf": "/docs/TrafficPatternsXD/TrafficPatternsXD-Specification-FR.pdf",
  "/wp-content/uploads/2021/04/TrafficPatternsXD_CrossSection_Detail.pdf": "/docs/TrafficPatternsXD/TrafficPatternsXD-CrossSection-Detail.pdf",
  "/wp-content/uploads/2021/04/specification_trafficpatternsxd_branded.pdf": "/docs/TrafficPatternsXD/TrafficPatternsXD-Specification-Branded.pdf",
  "/wp-content/uploads/2021/09/StreetBond-Colors.pdf": "/docs/StreetBond/Streetbond-Colour-Guide-.pdf",
}

/** Where any other old document goes: the library. */
export const LIBRARY = "/resources"

/**
 * Any other document under /wp-content/uploads/, by extension (hubss.com's
 * rule, the same formats a spec library carries). Images are left out on
 * purpose: they are not documents, and the library is no answer for one.
 */
export const OTHER_DOCUMENTS = "/wp-content/uploads/:path(.*\\.(?:pdf|docx?|xlsx?|pptx?|dwg|dxf|zip))"

/** A path as a literal in a redirect source (path-to-regexp treats these as syntax). */
export function literal(path: string): string {
  return path.replace(/[()*+?:{}\\[\]]/g, (c) => `\\${c}`)
}

export function oldPdfRedirects(): Redirect[] {
  const named = Object.entries({ ...SAME_FILE, ...RENAMED }).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  return [
    ...named.map(([from, to]): Redirect => ({ source: literal(from), destination: to, permanent: true })),
    // Last, so every named address above wins.
    { source: OTHER_DOCUMENTS, destination: LIBRARY, permanent: true },
  ]
}
