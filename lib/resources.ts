// Technical documents library — spec sheets, colour cards, SDS, guides.
// Source: mirrored from squareonepaving.com/support-documents/ into
// /public/docs/ via scripts/mirror-docs.mjs — served locally, no WP dependency.

export type ResourceType =
  | "Specification"
  | "Colour card"
  | "SDS"
  | "Guide"
  | "Brochure"
  | "Technical info";

export interface ResourceDoc {
  name: string;
  href: string;
  type: ResourceType;
  /** Human file size, baked at authoring time from public/docs (real bytes). */
  size: string;
}

export interface ResourceGroup {
  product: string;
  slug: string;
  docs: ResourceDoc[];
}

export const resourceGroups: ResourceGroup[] = [
  {
    product: "StreetBond",
    slug: "streetbond",
    docs: [
      { name: "StreetBond Colour Guide", href: "/docs/StreetBond/Streetbond-Colour-Guide-.pdf", type: "Colour card", size: "691 KB" },
      { name: "StreetBond / StreetPrint Specification Guide", href: "/docs/StreetBond/HUB-SB-SP-Spec-Guide-web.pdf", type: "Specification", size: "4.6 MB" },
      { name: "StreetBond Specification — Imprinted Asphalt", href: "/docs/StreetBond/StreetBond-Specification_Imprinted-Asphalt.pdf", type: "Specification", size: "1.5 MB" },
      { name: "StreetBond 150 Over Concrete Specification", href: "/docs/StreetBond/StreetBond_SB150_Over_Concrete_Specification.pdf", type: "Specification", size: "596 KB" },
      { name: "StreetBond 150 Flat Surface Specification", href: "/docs/StreetBond/SB-150NT-StreetBond150-Flat-Surface-Specification-SEPT-2013_HUB.pdf", type: "Specification", size: "692 KB" },
      { name: "StreetBond Technical Info — SB120", href: "/docs/StreetBond/StreetBond_Tech_Info_120-rev-4-2019.pdf", type: "Technical info", size: "1.2 MB" },
      { name: "StreetBond Technical Info — SB150", href: "/docs/StreetBond/StreetBond_Tech_Info_150-rev-4-2019.pdf", type: "Technical info", size: "1.1 MB" },
      { name: "StreetBond Technical Info — SB150AL", href: "/docs/StreetBond/StreetBond_Tech_Info_150AL-rev-190731-v2.pdf", type: "Technical info", size: "1.8 MB" },
      { name: "StreetBond Brochure (CAPA)", href: "/docs/StreetBond/BR-SB-CAPA_StreetBond_Brochure_041414_sm.pdf", type: "Brochure", size: "1.7 MB" },
      { name: "Asphalt Aging Research Findings", href: "/docs/StreetBond/Asphalt-Aging-Research-Findings-200521.pdf", type: "Technical info", size: "494 KB" },
      { name: "Concrete Adhesion Study (2014)", href: "/docs/StreetBond/StreetBond-Concrete-Adhesion-Study-2014.pdf", type: "Technical info", size: "504 KB" },
      { name: "QS Concrete Primer", href: "/docs/StreetBond/QS-Concrete-Primer-rev-4-2019.pdf", type: "Technical info", size: "1.1 MB" },
      { name: "WB Concrete Primer", href: "/docs/StreetBond/StreetBond_WB-Concrete-Primer-rev-4-2019.pdf", type: "Technical info", size: "1.7 MB" },
      { name: "CemBase Asphalt Fortifier", href: "/docs/StreetBond/CemBase-Asphalt-Fortifier-rev-4-2019.pdf", type: "Technical info", size: "1.3 MB" },
      { name: "Adhesion Promoter Concentrate", href: "/docs/StreetBond/Adhesion-Promoter-Concentrate-rev-4-2019.pdf", type: "Technical info", size: "1005 KB" },
      { name: "Sealer Concentrate", href: "/docs/StreetBond/Sealer-Concentrate-rev-4-2019.pdf", type: "Technical info", size: "746 KB" },
      { name: "SDS — StreetBond Sealer (SB-SLR)", href: "/docs/StreetBond/SB-SLR_StreetBond_Sealer.pdf", type: "SDS", size: "122 KB" },
      { name: "SDS — StreetBond Colorant (SB-CLR)", href: "/docs/StreetBond/SB-CLR_StreetBond_Colorant.pdf", type: "SDS", size: "281 KB" },
      { name: "SDS — StreetBond Colorant, Fashion Colours", href: "/docs/StreetBond/MSDS_SB_Colorant_Fashion.pdf", type: "SDS", size: "18 KB" },
      { name: "SDS — StreetBondCL Part A (SB-CLA)", href: "/docs/StreetBond/SB-CLA_StreetBondCL_Part_A.pdf", type: "SDS", size: "192 KB" },
      { name: "SDS — CemBase Resin (SB-CBR)", href: "/docs/StreetBond/SB-CBR_StreetBond_CemBase_Resin.pdf", type: "SDS", size: "118 KB" },
      { name: "SDS — CemBase Hardener (SB-CBH)", href: "/docs/StreetBond/SB-CBH_StreetBond_CemBase_Hardener.pdf", type: "SDS", size: "169 KB" },
      { name: "SDS — StreetBond150 Part A", href: "/docs/StreetBond/SB-150A_MSDS_StreetBond150_Part_A.pdf", type: "SDS", size: "160 KB" },
      { name: "SDS — StreetBond150 Part B", href: "/docs/StreetBond/SB-150B_MSDS_StreetBond150_Part_B.pdf", type: "SDS", size: "273 KB" },
      { name: "StreetBondSR Brochure", href: "/docs/StreetBondSR/StreetBondSR-Brochure.pdf", type: "Brochure", size: "344 KB" },
      { name: "StreetBondSR Colour Guide", href: "/docs/StreetBondSR/Colour-Guide-1.pdf", type: "Colour card", size: "691 KB" },
      { name: "StreetBondSR Flat Surface Specification", href: "/docs/StreetBondSR/StreetBond-SR-Flat-Surface-Specification.pdf", type: "Specification", size: "553 KB" },
      { name: "StreetBondSR Certificate of Analysis — Friction", href: "/docs/StreetBondSR/StreetBond-SR-Certificate-of-Analysis-Friction.pdf", type: "Technical info", size: "652 KB" },
    ],
  },
  {
    product: "StreetPrint",
    slug: "streetprint",
    docs: [
      { name: "StreetPrint Pattern Catalogue", href: "/docs/StreetPrint/SquareOne-StreetPrint-Patterns.pdf", type: "Colour card", size: "456 KB" },
      { name: "StreetBond / StreetPrint Colour Card", href: "/docs/StreetPrint/StreetBond_StreetPrint_Colour_Card_10-16.pdf", type: "Colour card", size: "2.9 MB" },
      { name: "Asphalt Pavement Texturing Specification", href: "/docs/StreetPrint/StreetPrint_Asphalt_Pavement_Texturing_Specification_April-2020.pdf", type: "Specification", size: "777 KB" },
      { name: "Custom Stamping Template Guidelines", href: "/docs/StreetPrint/StreetPrint_Cutom-Stamping-Template-Guidlines.pdf", type: "Guide", size: "2.8 MB" },
      { name: "StreetPrint FAQ", href: "/docs/StreetPrint/STREETPRINT-FAQ-DOCUMENT.pdf", type: "Guide", size: "115 KB" },
    ],
  },
  {
    product: "TrafficPatterns",
    slug: "traffic-patterns",
    docs: [
      { name: "TrafficPatterns Colour Palette", href: "/docs/traffic-patterns/TrafficPatterns_Colour_Palette_181010.pdf", type: "Colour card", size: "165 KB" },
      { name: "TrafficPatterns Design Manual", href: "/docs/traffic-patterns/DesignManual_TrafficPatterns.pdf", type: "Guide", size: "4.5 MB" },
      { name: "Custom Design Guidelines", href: "/docs/traffic-patterns/custom_design_guidelines_trafficpatterns.pdf", type: "Guide", size: "216 KB" },
      { name: "Specification — TrafficPatterns 125 (with surface applied)", href: "/docs/traffic-patterns/specification_trafficpatterns_125_with_sa.pdf", type: "Specification", size: "249 KB" },
      { name: "Specification — TrafficPatterns 125 (without surface applied)", href: "/docs/traffic-patterns/specification_trafficpatterns_125_without_sa.pdf", type: "Specification", size: "183 KB" },
      { name: "Specification — TrafficPatterns Solid Sheets 125", href: "/docs/traffic-patterns/specification_trafficpatterns_solid_sheets_125.pdf", type: "Specification", size: "171 KB" },
      { name: "Specification — Two-Component Sealer", href: "/docs/TrafficPatterns/Specification_Two_Component_Sealer.pdf", type: "Specification", size: "142 KB" },
      { name: "Sealer — Part 1", href: "/docs/traffic-patterns/Sealer-1.pdf", type: "Technical info", size: "404 KB" },
      { name: "Sealer — Part 2", href: "/docs/traffic-patterns/Sealer-2.pdf", type: "Technical info", size: "272 KB" },
      { name: "SDS — TrafficPatterns", href: "/docs/traffic-patterns/SDS_TrafficScapes_TrafficPatterns-v.4.pdf", type: "SDS", size: "259 KB" },
      { name: "SDS — TrafficPatterns Sealer", href: "/docs/traffic-patterns/SDS_TrafficScapes_TrafficPatterns_Sealer-2.pdf", type: "SDS", size: "272 KB" },
    ],
  },
  {
    product: "TrafficPatternsXD",
    slug: "trafficpatterns-xd",
    docs: [
      { name: "TrafficPatternsXD Colour Guide", href: "/docs/TrafficPatternsXD/TrafficPatternsXD-Colour-Guide.pdf", type: "Colour card", size: "334 KB" },
      { name: "TrafficPatternsXD Design Manual", href: "/docs/TrafficPatternsXD/TrafficPatternsXD-Design-Manual.pdf", type: "Guide", size: "5.2 MB" },
      { name: "Specification — TrafficPatternsXD", href: "/docs/TrafficPatternsXD/TrafficPatternsXD-Specification.pdf", type: "Specification", size: "488 KB" },
      { name: "Specification — TrafficPatternsXD Branded", href: "/docs/TrafficPatternsXD/TrafficPatternsXD-Specification-Branded.pdf", type: "Specification", size: "372 KB" },
      { name: "Specification — TrafficPatternsXD (French)", href: "/docs/TrafficPatternsXD/TrafficPatternsXD-Specification-FR.pdf", type: "Specification", size: "260 KB" },
      { name: "Cross-Section Detail", href: "/docs/TrafficPatternsXD/TrafficPatternsXD-CrossSection-Detail.pdf", type: "Technical info", size: "1.1 MB" },
      { name: "Technical Sheet — TS002", href: "/docs/TrafficPatternsXD/TS002_TrafficPatternsXD_220204.pdf", type: "Technical info", size: "804 KB" },
      { name: "Two-Component Sealer", href: "/docs/TrafficPatternsXD/TrafficPatternsXD-Two-Component-Sealer.pdf", type: "Technical info", size: "230 KB" },
    ],
  },
  {
    product: "DecoMark",
    slug: "decomark",
    docs: [
      { name: "DecoMark Colour Palette", href: "/docs/DecoMark/DecoMarkColorPalette181010.pdf", type: "Colour card", size: "162 KB" },
      { name: "Application Instructions", href: "/docs/DecoMark/Application-Instructions_DecoMark1.pdf", type: "Guide", size: "522 KB" },
      { name: "Custom Design Guidelines", href: "/docs/DecoMark/custom_design_guidelines_decomark.pdf", type: "Guide", size: "517 KB" },
      { name: "Specification — DecoMark VG", href: "/docs/DecoMark/specification_decomark_vg.pdf", type: "Specification", size: "225 KB" },
      { name: "Specification — DecoMark VG (without surface applied)", href: "/docs/DecoMark/specification_decomark_vg_without_sa.pdf", type: "Specification", size: "229 KB" },
      { name: "Specification — DecoMark SK", href: "/docs/DecoMark/specification_decomark_sk.pdf", type: "Specification", size: "154 KB" },
      { name: "Specification — DecoMark SK (with surface applied)", href: "/docs/DecoMark/specification_decomark_sk_with_sa.pdf", type: "Specification", size: "215 KB" },
      { name: "Specification — Two-Component Sealer", href: "/docs/DecoMark/specification_two_component_sealer.pdf", type: "Specification", size: "281 KB" },
      { name: "Sealer — Part 1", href: "/docs/DecoMark/Sealer-1-1.pdf", type: "Technical info", size: "404 KB" },
      { name: "Sealer — Part 2", href: "/docs/DecoMark/Sealer-2-1.pdf", type: "Technical info", size: "272 KB" },
      { name: "SDS — Preformed Thermoplastic (DecoMark)", href: "/docs/DecoMark/SDS_Preformed-Thermoplastic_DecoMark_v.3.pdf", type: "SDS", size: "180 KB" },
    ],
  },
  {
    product: "DuraTherm",
    slug: "duratherm",
    docs: [
      { name: "DuraTherm Colour Palette", href: "/docs/DuraTherm/DurathermColorPalette181010.pdf", type: "Colour card", size: "156 KB" },
      { name: "DuraTherm Standard Design Manual", href: "/docs/DuraTherm/standard_design_manual_duratherm.pdf", type: "Guide", size: "4.6 MB" },
      { name: "Custom Design Guidelines", href: "/docs/DuraTherm/custom_design_guidelines_duratherm.pdf", type: "Guide", size: "2.1 MB" },
      { name: "Specification — DuraTherm Branded", href: "/docs/DuraTherm/Specification_TrafficScapes_DuraTherm_Branded.pdf", type: "Specification", size: "312 KB" },
      { name: "Sealer — Part 1", href: "/docs/DuraTherm/Duratherm-Sealer-1.pdf", type: "Technical info", size: "404 KB" },
      { name: "Sealer — Part 2", href: "/docs/DuraTherm/Duratherm-Sealer-2.pdf", type: "Technical info", size: "272 KB" },
      { name: "SDS — Preformed Thermoplastic (DuraTherm)", href: "/docs/DuraTherm/SDS_Preformed-Thermoplastic_DuraTherm-v.3.pdf", type: "SDS", size: "237 KB" },
    ],
  },
  {
    product: "PreMark",
    slug: "premark",
    docs: [
      { name: "PreMark Colour Palette", href: "/docs/PreMark/PreMark_Colour_Palette_181010.pdf", type: "Colour card", size: "100 KB" },
      { name: "Application Instructions", href: "/docs/PreMark/Application_Instructions_Premark.pdf", type: "Guide", size: "483 KB" },
      { name: "Specification — PreMark", href: "/docs/PreMark/Specification_Premark.pdf", type: "Specification", size: "246 KB" },
      { name: "Specification — PreMark 125 SA (French)", href: "/docs/PreMark/Specification_Premark_125_SA_french.pdf", type: "Specification", size: "75 KB" },
      { name: "Specification — PreMark SK 90 SA", href: "/docs/PreMark/Specification_Preformed-Thermoplastic_PreMark_SK_90_SA.pdf", type: "Specification", size: "91 KB" },
      { name: "Specification — PreMark ViziGrip SA", href: "/docs/PreMark/Specification_Preformed-Thermoplastic_PreMark_ViziGrip_SA.pdf", type: "Specification", size: "114 KB" },
      { name: "Specification — Bike Lane Green (SK, with SA)", href: "/docs/PreMark/Specification_Premark_SK_Bike_Lane_Green_with_SA.pdf", type: "Specification", size: "397 KB" },
      { name: "Specification — Two-Component Sealer", href: "/docs/PreMark/Specification_Two_Component_Sealer.pdf", type: "Specification", size: "142 KB" },
      { name: "Green Bike Lane — Enhanced Colourized Lanes", href: "/docs/PreMark/Geen_Bike_Lane_Enhanced-Colorized-Lanes.pdf", type: "Technical info", size: "858 KB" },
      { name: "Brochure — Bike & Pedestrian Markings", href: "/docs/PreMark/Brochure_PreMark-Bike-Ped-Markings.pdf", type: "Brochure", size: "1.6 MB" },
      { name: "Sealer — Part 1", href: "/docs/PreMark/Preamark-Sealer-1.pdf", type: "Technical info", size: "404 KB" },
      { name: "Sealer — Part 2", href: "/docs/PreMark/Premark-Sealer-2.pdf", type: "Technical info", size: "272 KB" },
      { name: "SDS — Preformed Thermoplastic (PreMark)", href: "/docs/PreMark/SDS_Preformed-Thermoplastic_PreMark-v.5.pdf", type: "SDS", size: "183 KB" },
    ],
  },
  {
    product: "MMAX",
    slug: "mmax",
    docs: [
      { name: "MMAX Product Data", href: "/docs/MMAX/MMAX-Product-Data.pdf", type: "Technical info", size: "547 KB" },
      { name: "MMAX Next Gen Brochure", href: "/docs/MMAX/MMAX-Next-Gen-Brochure_06_09_23-1.pdf", type: "Brochure", size: "1.4 MB" },
      { name: "Application Instructions — Corundum Area Markings", href: "/docs/MMAX/Application_Instructions_MMAX_Corundum_Area_Markings.pdf", type: "Guide", size: "539 KB" },
      { name: "Extended Season MMAX — Product Data Sheet", href: "/docs/MMAX/Extended-Season-MMAX-product-data-sheet.pdf", type: "Technical info", size: "191 KB" },
      { name: "Extended Season MMAX Corundum — Product Data Sheet", href: "/docs/MMAX/Extended-Season-MMAX-Corundum-PDS-070723.pdf", type: "Technical info", size: "191 KB" },
    ],
  },
  {
    product: "DuraShield",
    slug: "durashield",
    docs: [
      { name: "TDS — DuraShield Colour Asphalt (Part A + B)", href: "/docs/DuraShield/DuraShield-Pavement-Coating-Part-A-B-Color-Asphalt-TDS.pdf", type: "Technical info", size: "509 KB" },
      { name: "TDS — DuraShield Solar Gray (Part A + B)", href: "/docs/DuraShield/DuraShield-Pavement-Coating-Part-A-B-Color-Solar-Gray-TDS.pdf", type: "Technical info", size: "478 KB" },
    ],
  },
];

export const resourceCount = resourceGroups.reduce((n, g) => n + g.docs.length, 0);
