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
      { name: "StreetBond Colour Guide", href: "/docs/StreetBond/Streetbond-Colour-Guide-.pdf", type: "Colour card" },
      { name: "StreetBond / StreetPrint Specification Guide", href: "/docs/StreetBond/HUB-SB-SP-Spec-Guide-web.pdf", type: "Specification" },
      { name: "StreetBond Specification — Imprinted Asphalt", href: "/docs/StreetBond/StreetBond-Specification_Imprinted-Asphalt.pdf", type: "Specification" },
      { name: "StreetBond 150 Over Concrete Specification", href: "/docs/StreetBond/StreetBond_SB150_Over_Concrete_Specification.pdf", type: "Specification" },
      { name: "StreetBond 150 Flat Surface Specification", href: "/docs/StreetBond/SB-150NT-StreetBond150-Flat-Surface-Specification-SEPT-2013_HUB.pdf", type: "Specification" },
      { name: "StreetBond Technical Info — SB120", href: "/docs/StreetBond/StreetBond_Tech_Info_120-rev-4-2019.pdf", type: "Technical info" },
      { name: "StreetBond Technical Info — SB150", href: "/docs/StreetBond/StreetBond_Tech_Info_150-rev-4-2019.pdf", type: "Technical info" },
      { name: "StreetBond Technical Info — SB150AL", href: "/docs/StreetBond/StreetBond_Tech_Info_150AL-rev-190731-v2.pdf", type: "Technical info" },
      { name: "StreetBond Brochure (CAPA)", href: "/docs/StreetBond/BR-SB-CAPA_StreetBond_Brochure_041414_sm.pdf", type: "Brochure" },
      { name: "Asphalt Aging Research Findings", href: "/docs/StreetBond/Asphalt-Aging-Research-Findings-200521.pdf", type: "Technical info" },
      { name: "Concrete Adhesion Study (2014)", href: "/docs/StreetBond/StreetBond-Concrete-Adhesion-Study-2014.pdf", type: "Technical info" },
      { name: "QS Concrete Primer", href: "/docs/StreetBond/QS-Concrete-Primer-rev-4-2019.pdf", type: "Technical info" },
      { name: "WB Concrete Primer", href: "/docs/StreetBond/StreetBond_WB-Concrete-Primer-rev-4-2019.pdf", type: "Technical info" },
      { name: "CemBase Asphalt Fortifier", href: "/docs/StreetBond/CemBase-Asphalt-Fortifier-rev-4-2019.pdf", type: "Technical info" },
      { name: "Adhesion Promoter Concentrate", href: "/docs/StreetBond/Adhesion-Promoter-Concentrate-rev-4-2019.pdf", type: "Technical info" },
      { name: "Sealer Concentrate", href: "/docs/StreetBond/Sealer-Concentrate-rev-4-2019.pdf", type: "Technical info" },
      { name: "SDS — StreetBond Sealer (SB-SLR)", href: "/docs/StreetBond/SB-SLR_StreetBond_Sealer.pdf", type: "SDS" },
      { name: "SDS — StreetBond Colorant (SB-CLR)", href: "/docs/StreetBond/SB-CLR_StreetBond_Colorant.pdf", type: "SDS" },
      { name: "SDS — StreetBond Colorant, Fashion Colours", href: "/docs/StreetBond/MSDS_SB_Colorant_Fashion.pdf", type: "SDS" },
      { name: "SDS — StreetBondCL Part A (SB-CLA)", href: "/docs/StreetBond/SB-CLA_StreetBondCL_Part_A.pdf", type: "SDS" },
      { name: "SDS — CemBase Resin (SB-CBR)", href: "/docs/StreetBond/SB-CBR_StreetBond_CemBase_Resin.pdf", type: "SDS" },
      { name: "SDS — CemBase Hardener (SB-CBH)", href: "/docs/StreetBond/SB-CBH_StreetBond_CemBase_Hardener.pdf", type: "SDS" },
      { name: "SDS — StreetBond150 Part A", href: "/docs/StreetBond/SB-150A_MSDS_StreetBond150_Part_A.pdf", type: "SDS" },
      { name: "SDS — StreetBond150 Part B", href: "/docs/StreetBond/SB-150B_MSDS_StreetBond150_Part_B.pdf", type: "SDS" },
    ],
  },
  {
    product: "StreetPrint",
    slug: "streetprint",
    docs: [
      { name: "StreetPrint Pattern Catalogue", href: "/docs/StreetPrint/SquareOne-StreetPrint-Patterns.pdf", type: "Colour card" },
      { name: "StreetBond / StreetPrint Colour Card", href: "/docs/StreetPrint/StreetBond_StreetPrint_Colour_Card_10-16.pdf", type: "Colour card" },
      { name: "Asphalt Pavement Texturing Specification", href: "/docs/StreetPrint/StreetPrint_Asphalt_Pavement_Texturing_Specification_April-2020.pdf", type: "Specification" },
      { name: "Custom Stamping Template Guidelines", href: "/docs/StreetPrint/StreetPrint_Cutom-Stamping-Template-Guidlines.pdf", type: "Guide" },
      { name: "StreetPrint FAQ", href: "/docs/StreetPrint/STREETPRINT-FAQ-DOCUMENT.pdf", type: "Guide" },
    ],
  },
  {
    product: "TrafficPatterns",
    slug: "traffic-patterns",
    docs: [
      { name: "TrafficPatterns Colour Palette", href: "/docs/traffic-patterns/TrafficPatterns_Colour_Palette_181010.pdf", type: "Colour card" },
      { name: "TrafficPatterns Design Manual", href: "/docs/traffic-patterns/DesignManual_TrafficPatterns.pdf", type: "Guide" },
      { name: "Custom Design Guidelines", href: "/docs/traffic-patterns/custom_design_guidelines_trafficpatterns.pdf", type: "Guide" },
      { name: "Specification — TrafficPatterns 125 (with surface applied)", href: "/docs/traffic-patterns/specification_trafficpatterns_125_with_sa.pdf", type: "Specification" },
      { name: "Specification — TrafficPatterns 125 (without surface applied)", href: "/docs/traffic-patterns/specification_trafficpatterns_125_without_sa.pdf", type: "Specification" },
      { name: "Specification — TrafficPatterns Solid Sheets 125", href: "/docs/traffic-patterns/specification_trafficpatterns_solid_sheets_125.pdf", type: "Specification" },
      { name: "Specification — Two-Component Sealer", href: "/docs/TrafficPatterns/Specification_Two_Component_Sealer.pdf", type: "Specification" },
      { name: "Sealer — Part 1", href: "/docs/traffic-patterns/Sealer-1.pdf", type: "Technical info" },
      { name: "Sealer — Part 2", href: "/docs/traffic-patterns/Sealer-2.pdf", type: "Technical info" },
      { name: "SDS — TrafficPatterns", href: "/docs/traffic-patterns/SDS_TrafficScapes_TrafficPatterns-v.4.pdf", type: "SDS" },
      { name: "SDS — TrafficPatterns Sealer", href: "/docs/traffic-patterns/SDS_TrafficScapes_TrafficPatterns_Sealer-2.pdf", type: "SDS" },
    ],
  },
  {
    product: "DecoMark",
    slug: "decomark",
    docs: [
      { name: "DecoMark Colour Palette", href: "/docs/DecoMark/DecoMarkColorPalette181010.pdf", type: "Colour card" },
      { name: "Application Instructions", href: "/docs/DecoMark/Application-Instructions_DecoMark1.pdf", type: "Guide" },
      { name: "Custom Design Guidelines", href: "/docs/DecoMark/custom_design_guidelines_decomark.pdf", type: "Guide" },
      { name: "Specification — DecoMark VG", href: "/docs/DecoMark/specification_decomark_vg.pdf", type: "Specification" },
      { name: "Specification — DecoMark VG (without surface applied)", href: "/docs/DecoMark/specification_decomark_vg_without_sa.pdf", type: "Specification" },
      { name: "Specification — DecoMark SK", href: "/docs/DecoMark/specification_decomark_sk.pdf", type: "Specification" },
      { name: "Specification — DecoMark SK (with surface applied)", href: "/docs/DecoMark/specification_decomark_sk_with_sa.pdf", type: "Specification" },
      { name: "Specification — Two-Component Sealer", href: "/docs/DecoMark/specification_two_component_sealer.pdf", type: "Specification" },
      { name: "Sealer — Part 1", href: "/docs/DecoMark/Sealer-1-1.pdf", type: "Technical info" },
      { name: "Sealer — Part 2", href: "/docs/DecoMark/Sealer-2-1.pdf", type: "Technical info" },
      { name: "SDS — Preformed Thermoplastic (DecoMark)", href: "/docs/DecoMark/SDS_Preformed-Thermoplastic_DecoMark_v.3.pdf", type: "SDS" },
    ],
  },
  {
    product: "DuraTherm",
    slug: "duratherm",
    docs: [
      { name: "DuraTherm Colour Palette", href: "/docs/DuraTherm/DurathermColorPalette181010.pdf", type: "Colour card" },
      { name: "DuraTherm Standard Design Manual", href: "/docs/DuraTherm/standard_design_manual_duratherm.pdf", type: "Guide" },
      { name: "Custom Design Guidelines", href: "/docs/DuraTherm/custom_design_guidelines_duratherm.pdf", type: "Guide" },
      { name: "Specification — DuraTherm Branded", href: "/docs/DuraTherm/Specification_TrafficScapes_DuraTherm_Branded.pdf", type: "Specification" },
      { name: "Sealer — Part 1", href: "/docs/DuraTherm/Duratherm-Sealer-1.pdf", type: "Technical info" },
      { name: "Sealer — Part 2", href: "/docs/DuraTherm/Duratherm-Sealer-2.pdf", type: "Technical info" },
      { name: "SDS — Preformed Thermoplastic (DuraTherm)", href: "/docs/DuraTherm/SDS_Preformed-Thermoplastic_DuraTherm-v.3.pdf", type: "SDS" },
    ],
  },
  {
    product: "PreMark",
    slug: "premark",
    docs: [
      { name: "PreMark Colour Palette", href: "/docs/PreMark/PreMark_Colour_Palette_181010.pdf", type: "Colour card" },
      { name: "Application Instructions", href: "/docs/PreMark/Application_Instructions_Premark.pdf", type: "Guide" },
      { name: "Specification — PreMark", href: "/docs/PreMark/Specification_Premark.pdf", type: "Specification" },
      { name: "Specification — PreMark 125 SA (French)", href: "/docs/PreMark/Specification_Premark_125_SA_french.pdf", type: "Specification" },
      { name: "Specification — PreMark SK 90 SA", href: "/docs/PreMark/Specification_Preformed-Thermoplastic_PreMark_SK_90_SA.pdf", type: "Specification" },
      { name: "Specification — PreMark ViziGrip SA", href: "/docs/PreMark/Specification_Preformed-Thermoplastic_PreMark_ViziGrip_SA.pdf", type: "Specification" },
      { name: "Specification — Bike Lane Green (SK, with SA)", href: "/docs/PreMark/Specification_Premark_SK_Bike_Lane_Green_with_SA.pdf", type: "Specification" },
      { name: "Specification — Two-Component Sealer", href: "/docs/PreMark/Specification_Two_Component_Sealer.pdf", type: "Specification" },
      { name: "Green Bike Lane — Enhanced Colourized Lanes", href: "/docs/PreMark/Geen_Bike_Lane_Enhanced-Colorized-Lanes.pdf", type: "Technical info" },
      { name: "Brochure — Bike & Pedestrian Markings", href: "/docs/PreMark/Brochure_PreMark-Bike-Ped-Markings.pdf", type: "Brochure" },
      { name: "Sealer — Part 1", href: "/docs/PreMark/Preamark-Sealer-1.pdf", type: "Technical info" },
      { name: "Sealer — Part 2", href: "/docs/PreMark/Premark-Sealer-2.pdf", type: "Technical info" },
      { name: "SDS — Preformed Thermoplastic (PreMark)", href: "/docs/PreMark/SDS_Preformed-Thermoplastic_PreMark-v.5.pdf", type: "SDS" },
    ],
  },
];

export const resourceCount = resourceGroups.reduce((n, g) => n + g.docs.length, 0);
