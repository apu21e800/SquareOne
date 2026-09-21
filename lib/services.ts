export interface Service {
  slug: string
  name: string
  tagline: string
  /** The intro paragraph on the service page and its meta description (≤ 158 characters through clampDescription): the systems, the region, one concrete benefit. */
  shortDescription: string
  fullDescription: string
  productsIncluded: string[]
  applications: string[]
  idealClients: string[]
  benefits: string[]
  imageUrl: string
  /** place · subject · system, from the record — shown on the opener. */
  imageCaption?: string
  /** object-position for the opener's crop. */
  imagePosition?: string
  /** What the hero photograph (imageUrl) shows — system, surface and place, as the record captions it. */
  imageAlt: string
  /** Questions answered on the service page, in the site's own words — nothing here that the page does not already say. */
  faqs: { q: string; a: string }[]
}

/*
 * Copy rules (the 19 Sept 2026 editorial pass, evening rulings): the three
 * pillar services sell the SERVICE, to specifiers — the site walk, the help
 * specifying (template sheets, colour chart, sample boards, the documents in
 * the specification library), the written quote, installation by Square
 * One's own crews to the published specification, the workmanship warranty,
 * both regions. The systems are the means and are named; the manufacturer
 * is never named — its figures are "published by the manufacturer", and
 * "the manufacturer warrants the material; Square One warrants the
 * workmanship". ® / ™ ride the first mention of a system on the page (the
 * tagline names no system; the shortDescription comes first, then
 * fullDescription). Every place named is a Square One install on record in
 * lib/projects.ts or lib/work.ts; every process step is on record in
 * app/about, app/contact or app/driveways. idealClients is the specifier
 * list — homeowners appear on stamped asphalt only, last. The FAQs restate
 * the page — they feed the FAQPage schema.
 */
export const services: Service[] = [
  {
    slug: "stamped-asphalt",
    name: "Stamped Asphalt",
    tagline: "Specified from a dimensioned template sheet, pressed into the asphalt already there by our own crews.",
    shortDescription:
      "StreetPrint® and TrafficPatternsXD™ stamped asphalt, specified from template sheets and installed by our own crews on the Lower Mainland and Vancouver Island.",
    fullDescription:
      "Square One takes a stamped asphalt surface from the drawing to the road. It starts with a free site walk: we look at the asphalt that is there — its condition, its drainage and the traffic it carries — and bring the sample boards, so pattern and colour are chosen against the real site. Every template is a dimensioned sheet — herringbone, offset brick, ashlar slate, tiles and borders, in the pattern library — so a landscape architect or engineer can name the sheet on the drawing, and the manufacturer's asphalt pavement texturing specification, the colour card and the custom template guidelines are in the specification library for the tender package. The written quote sets out the system, the template and the colour for the surface you have; if the asphalt is not sound enough to take a stamp, we say so.\n\nSquare One installs two kinds, with its own crews and to the published specification, across the Lower Mainland and Vancouver Island. StreetPrint is the regular kind: the asphalt is reheated, a steel template is pressed into it and StreetBond® colour is rolled into the imprint — no demolition and no new base, so closures are short. TrafficPatternsXD is the heavy-duty kind: a 150-mil aggregate-reinforced preformed thermoplastic, heated and stamped into the top layer of the asphalt for the crossings that take the most traffic, exposing new anti-skid elements as it wears. The manufacturer publishes a 10–20 year service life for StreetPrint and rates its textured surface slip-resistant and safe for snowploughs and de-icing salt. The manufacturer warrants the material; Square One warrants the workmanship.\n\nCrosswalks, roundabout aprons, medians, traffic calming, commercial entries and parking lot walkways — the school crosswalk at Grandview Heights in Surrey, the walkways at Ralph's Farm Market in Langley and the rainbow intersection in Nanaimo are on the record.",
    productsIncluded: [
      "StreetPrint® asphalt imprinting system — the regular kind",
      "TrafficPatternsXD™ aggregate-reinforced thermoplastic — the heavy-duty kind",
      "StreetBond® colour, rolled into the imprint",
    ],
    applications: [
      "Crosswalks",
      "Roundabouts",
      "Traffic Calming",
      "Streetscapes and Medians",
      "Commercial Entries",
      "Parking Lots and Walkways",
    ],
    idealClients: [
      "Landscape architects",
      "Civil and traffic engineers",
      "Municipal project specifiers",
      "Developers and their project managers",
      "General contractors",
      "Strata and property managers",
      "Homeowners",
    ],
    benefits: [
      "Free site walk with the sample boards, then a written quote",
      "Templates drawn as dimensioned sheets, in the pattern library",
      "Texturing specification, colour card and template guidelines in the library",
      "Installed by Square One's own crews to the published specification",
      "No demolition, no new base — short closures",
      "10–20 year StreetPrint service life, published by the manufacturer",
      "Slip-resistant texture; snowplough and de-icing salt safe",
      "Material warranted by the manufacturer; workmanship by Square One",
    ],
    faqs: [
      {
        q: "Can I get the pattern drawn for my plans?",
        a: "Yes. Every StreetPrint template is a dimensioned sheet — herringbone, offset brick, ashlar slate, tiles and borders — in the pattern library, so the template can be named on the drawing by its sheet name. The manufacturer cuts custom templates to order, and its custom stamping template guidelines are in the specification library.",
      },
      {
        q: "What goes in the tender?",
        a: "The system — StreetPrint for the regular kind, TrafficPatternsXD for the heavy-duty kind — the template by its sheet name, and the StreetBond colour from the chart. The manufacturer's asphalt pavement texturing specification, the colour card and the template guidelines are in the specification library, and Square One's written quote sets out the system, the template and the colour for the surface you have.",
      },
      {
        q: "Who installs it, and where?",
        a: "Square One's own crews, to the manufacturer's published specification, across the Lower Mainland and Vancouver Island — one office in Maple Ridge, and a line of its own for the Island, 250-391-0270.",
      },
      {
        q: "How much of the road has to close?",
        a: "Less than a rebuild. There is no demolition and no new base — the pattern goes into the asphalt that is already there — so closures are short. Where a road could not close, the TrafficPatternsXD crossings on record went in in overnight windows: at Brighouse Station in Richmond, and intersection by intersection on Commercial Drive in Vancouver.",
      },
      {
        q: "What is warranted, and by whom?",
        a: "The manufacturer warrants the material, under its limited warranty against manufacturing defects. Square One warrants the workmanship: every system goes down to the published specification, by Square One's own crews, and we walk the finished surface with you before we leave it.",
      },
      {
        q: "What is the difference between StreetPrint and TrafficPatternsXD?",
        a: "They are the two kinds of stamped asphalt Square One installs. StreetPrint is the regular kind: the asphalt is reheated, a steel template is pressed into it and StreetBond colour is rolled into the imprint. TrafficPatternsXD is the heavy-duty kind: a 150-mil aggregate-reinforced preformed thermoplastic, heated and stamped into the top layer of the asphalt, for the crossings that take the most traffic.",
      },
      {
        q: "Can it go over the asphalt we already have, and how long does it last?",
        a: "Yes, when the asphalt is sound — we assess that at the site walk, and if it is not sound enough to take a stamp we say so. The manufacturer publishes a 10–20 year service life for StreetPrint and rates the textured surface slip-resistant and safe for snowploughs and de-icing salt. TrafficPatternsXD is the heavier material, and as its surface wears new anti-skid elements are exposed.",
      },
    ],
    imageUrl: "/images/applications/crosswalks/langley-railways-crossing-at-the-heritage-block-trafficpatternsxd-01.jpg",
    imageAlt: "A railway-tie pattern crossing in tan and charcoal stamped asphalt at the heritage block in Langley, townhomes behind, installed by Square One",
    imageCaption: "Langley · Railways crossing at the heritage block · TrafficPatternsXD",
    imagePosition: "center 68%",
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed Thermoplastic",
    tagline: "Cut to your drawing, to the owner's marking standard, and fused into the road by our own crews.",
    shortDescription:
      "TrafficPatterns™, DecoMark®, DuraTherm® and PreMark® markings, cut to the design and heat-fused by our own crews on the Lower Mainland and Vancouver Island.",
    fullDescription:
      "Preformed thermoplastic is the service for a marking that has to be exactly what was drawn — a crosswalk pattern, an arrow, a logo, an artist's design — and Square One takes it from the drawing to the road. Send the drawing or the artist's file with a site address. The site walk is free: we look at the substrate, the traffic and the layout against the owner's marking standard before anything is cut. The manufacturer's design manuals, custom design guidelines, colour palettes and specifications for each system are in the specification library for the spec package, and the written quote sets out the system, the colours and the layout.\n\nThe sheets are manufactured to the design and cut before they reach the site, so the placement is precise and there is no spray drift or overspray; Square One's own crews heat-fuse them to the pavement in place, to the published specification, across the Lower Mainland and Vancouver Island. Four systems cover the work. TrafficPatterns is the decorative system for crosswalks, transit stops and pedestrian zones — patterns, borders and custom designs, open to traffic within minutes of application. DecoMark is fully custom: logos, emblems, wayfinding symbols and artwork. DuraTherm is the retroreflective marking for stop bars, arrows, legends and lane lines, inset or surface-applied. PreMark is arrows, legends and symbols cut to exact dimensions with retroreflective glass beads embedded. DuraTherm and PreMark follow TAC-standard shapes and legends; TrafficPatterns colours and symbols follow the owner's marking standard.\n\nWhere a street cannot close, the work is phased: the Little Italy crossings on Commercial Drive went in intersection by intersection, in overnight blocks. The record runs from the UBC and Musqueam crosswalk in Vancouver and the Every Child Matters crossing in New Westminster to the sensory play pathway at South Langford Elementary. The manufacturer warrants the material; Square One warrants the workmanship.",
    productsIncluded: [
      "TrafficPatterns™ decorative crosswalks",
      "DecoMark® custom graphics and logos",
      "DuraTherm® road markings",
      "PreMark® arrows, legends and symbols",
    ],
    applications: [
      "Decorative Crosswalks",
      "Public Art",
      "Branding & Wayfinding",
      "School Zone Graphics",
      "Stop Bars and Arrows",
      "Parking Lots",
      "Transit Stop Graphics",
    ],
    idealClients: [
      "Civil and traffic engineers",
      "Municipal project specifiers",
      "Landscape architects",
      "Developers and their project managers",
      "General contractors",
      "Strata and property managers",
    ],
    benefits: [
      "Cut to the drawing before it reaches the site — precise placement, no overspray",
      "Colours and symbols to the owner's marking standard; TAC-standard shapes for DuraTherm and PreMark",
      "Design manuals, design guidelines, colour palettes and specifications in the library",
      "Installed by Square One's own crews to the published specification",
      "Open to traffic within minutes of application (TrafficPatterns)",
      "Retroreflective markings for night visibility (DuraTherm, PreMark)",
      "Phased overnight work on record where a street could not close",
      "Material warranted by the manufacturer; workmanship by Square One",
    ],
    faqs: [
      {
        q: "Can you work from our drawing or the artist's file?",
        a: "Yes. The sheets are manufactured to the design and cut before they reach the site, so what goes into the road is what was drawn — a crosswalk pattern, a logo, an artist's design. Send the drawing or the artist's file with the site address; the manufacturer's custom design guidelines for TrafficPatterns and DecoMark are in the specification library.",
      },
      {
        q: "What goes in the tender?",
        a: "The system — TrafficPatterns for decorative crossings, DecoMark for custom graphics, DuraTherm for standard road markings, PreMark for arrows, legends and symbols — with the colours from the palette and the layout to the owner's marking standard. The manufacturer's specifications, design manuals and colour palettes for each system are in the specification library, and Square One's written quote sets out the system, the colours and the layout.",
      },
      {
        q: "Who installs it, and where?",
        a: "Square One's own crews heat-fuse the sheets to the pavement in place, to the manufacturer's published specification, across the Lower Mainland and Vancouver Island — one office in Maple Ridge, and a line of its own for the Island, 250-391-0270.",
      },
      {
        q: "How much road closure does it need?",
        a: "Little. The sheets are heat-fused to the pavement in place, and a TrafficPatterns crossing is open to traffic within minutes of application. Where a street cannot close, the work is phased — the Little Italy crossings on Commercial Drive went in intersection by intersection, in overnight blocks.",
      },
      {
        q: "What is warranted, and by whom?",
        a: "The manufacturer warrants the material, under its limited warranty against manufacturing defects. Square One warrants the workmanship: every system goes down to the published specification, by Square One's own crews, and we walk the finished surface with you before we leave it.",
      },
      {
        q: "Which system is right for standard road markings, and is it retroreflective?",
        a: "DuraTherm for stop bars, arrows, legends and lane lines, inset or surface-applied on asphalt or concrete, and retroreflective. PreMark for arrows, legends and symbols cut to exact dimensions, with retroreflective glass beads embedded. Both follow TAC-standard shapes and legends. TrafficPatterns and DecoMark colours and symbols follow the owner's marking standard.",
      },
      {
        q: "Where has Square One installed it?",
        a: "Across the Lower Mainland and Vancouver Island — the UBC and Musqueam crosswalk in Vancouver, the Every Child Matters crossing in New Westminster, the sensory play pathway at South Langford Elementary, and the projects on this page.",
      },
    ],
    imageUrl: "/images/S1_update_v2/photos/Featured%20image%20options/UBC-crosswalk-3-300dpi.jpg",
    imageAlt: "Musqueam artwork in blue, green and gold TrafficPatterns thermoplastic on the crosswalk beside the UBC letters on University Boulevard, Vancouver",
    imageCaption: "Vancouver · UBC and Musqueam crosswalk · TrafficPatterns",
    imagePosition: "center 62%",
  },
  {
    slug: "decorative-coatings",
    name: "Decorative Coatings",
    tagline: "Specified off the colour chart, proved on a sample board, coated in place by our own crews.",
    shortDescription:
      "StreetBond® coatings in fifty-plus colours and DuraShield asphalt protection, installed by our own crews across the Lower Mainland and Vancouver Island.",
    fullDescription:
      "A decorative coating gives an asphalt or concrete surface colour, contrast and grip without rebuilding it, and Square One carries the job from the colour chart to the cured surface. The site walk is free: we look at the substrate — asphalt or concrete, its condition and the traffic it carries — and bring the sample boards, because on-screen colour is a reference and the board is what decides. Colour is specified straight off the published StreetBond® chart of more than fifty standard colours, or matched to a reference you send. The manufacturer's specifications for coated asphalt and coated concrete, flat and stamped, the technical data sheets, the SDS and the colour guide are in the specification library for the spec package, and the written quote sets out the system and the colours for the surface you have.\n\nSquare One installs with its own crews, to the published specification, across the Lower Mainland and Vancouver Island. The system is StreetBond, a UV-stable, water-based acrylic that bonds to asphalt and to concrete with the appropriate primer for each, in two versions — StreetBond 150 and the solar-reflective StreetBond SR — with an anti-skid aggregate for wet conditions and a retroreflective option for night visibility. The manufacturer publishes an 8+ year life cycle, and a worn surface is recoated rather than rebuilt. For plain asphalt protection there is DuraShield, the manufacturer's two-component maintenance coating for asphalt, in black or Solar Gray.\n\nOn the record: bike lanes and bus corridors, spray parks in Maple Ridge and Burnaby, the Circle of Life plaza at Langley Events Centre, the public art at Joyce SkyTrain Station in Vancouver — coated in phased overnight windows outside operating hours, so the station never closed — and a decorative fire lane in North Vancouver. The manufacturer warrants the material; Square One warrants the workmanship.",
    productsIncluded: [
      "StreetBond® 150 and the solar-reflective StreetBond SR",
      "DuraShield asphalt maintenance coating",
      "Anti-skid aggregate and retroreflective options",
      "Custom colour matching",
    ],
    applications: [
      "Bike Lanes",
      "Bus Rapid Transit Corridors",
      "Spray Parks",
      "Plazas and Public Art",
      "Parking Lots and Stalls",
      "Sports Courts and School Zones",
      "Accessible Parking Areas",
    ],
    idealClients: [
      "Landscape architects",
      "Municipal project specifiers",
      "Civil and traffic engineers",
      "Developers and their project managers",
      "General contractors",
      "Strata and property managers",
    ],
    benefits: [
      "Colour specified off the published chart — fifty-plus standard colours, custom matching",
      "Sample boards at the site walk, then a written quote",
      "Coated-asphalt and coated-concrete specifications, data sheets and SDS in the library",
      "Installed by Square One's own crews to the published specification",
      "Anti-skid aggregate; UV-stable, water-based acrylic",
      "8+ year life cycle, published by the manufacturer — recoated, not rebuilt",
      "Phased overnight work on record where a site could not close",
      "Material warranted by the manufacturer; workmanship by Square One",
    ],
    faqs: [
      {
        q: "How do I specify the colour?",
        a: "Straight off the published StreetBond chart — more than fifty standard colours — or send a colour reference and we will match it. The colour guide is in the specification library, and the sample boards come to the site walk, because on-screen colour is a reference and the board is what decides.",
      },
      {
        q: "What goes in the spec package?",
        a: "The manufacturer's specifications for coated asphalt and coated concrete, flat and stamped, with the technical data sheets, the SDS and the colour guide — all in the specification library. Square One's written quote sets out the system and the colours for the surface you have.",
      },
      {
        q: "Who installs it, and where?",
        a: "Square One's own crews, to the manufacturer's published specification, across the Lower Mainland and Vancouver Island — one office in Maple Ridge, and a line of its own for the Island, 250-391-0270.",
      },
      {
        q: "Can the site stay open?",
        a: "Where it has to. The coating goes onto the surface in place — no rebuild — and where a site could not close the work has been phased: the public art at Joyce SkyTrain Station in Vancouver was coated in overnight windows outside operating hours. A worn surface is recoated rather than rebuilt, which keeps a later closure short.",
      },
      {
        q: "What is warranted, and by whom?",
        a: "The manufacturer warrants the material, under its limited warranty against manufacturing defects. Square One warrants the workmanship: every system goes down to the published specification, by Square One's own crews, and we walk the finished surface with you before we leave it.",
      },
      {
        q: "Does it work on concrete as well as asphalt, and how long does it last?",
        a: "Yes. StreetBond bonds to asphalt and to concrete, with the appropriate primer for each, and carries an anti-skid aggregate for wet conditions. The manufacturer publishes an 8+ year life cycle, and a worn surface is recoated rather than rebuilt. DuraShield is a maintenance coating for asphalt.",
      },
      {
        q: "What is the difference between StreetBond and DuraShield?",
        a: "StreetBond is the coloured decorative coating — fifty-plus colours, anti-skid aggregate, for asphalt and concrete. DuraShield is a two-component maintenance coating for asphalt, in black or Solar Gray, made to protect the pavement rather than decorate it.",
      },
    ],
    imageUrl: "/images/applications/parks-paths/surrey-marine-spray-park-streetbond-01.jpg",
    imageAlt: "A marine spray park in Surrey — a swirl of blue StreetBond water through lime-green and yellow leaf shapes, orange fish in the current, installed by Square One",
    imageCaption: "Surrey · Marine spray park · StreetBond",
    imagePosition: "center 55%",
  },
  {
    slug: "vapor-blasting",
    name: "Vapour Blasting",
    tagline: "Clean it, prime it, bring it back — with up to 92% less dust.",
    shortDescription:
      "Mobile vapour blasting for surface cleaning and priming — graffiti, gum and mould off brick and concrete, markings off roads, paint and coatings off steel, decks and hulls. Up to 92% less dust than dry blasting, less water, little to no heat.",
    fullDescription:
      "A powerful, portable blasting solution for surface prep. Vapour blasting uses less water, generates up to 92% less dust, produces little to no heat and creates less environmental impact than the alternatives — while getting the job done faster. It is how Square One primes surfaces for its own coating and thermoplastic installs, and it is offered on its own for road-marking removal, graffiti and mould, paint and stain stripping, fire and smoke damage, and marine coating removal. Mobile across the Lower Mainland and Vancouver Island.",
    productsIncluded: [
      "Portable vapour blasting rig",
      "Water and abrasive media",
      "Runoff management",
      "Masking and surface protection",
    ],
    applications: [
      "Road marking removal",
      "Steel and concrete surface preparation",
      "Graffiti, gum, mould and soot removal",
      "Paint and stain removal",
      "Wood, concrete and steel cleaning",
      "Fire and smoke damage cleaning",
      "Brick and patio cleaning",
      "Iron fence and railing preparation",
      "Limestone, marble and stucco stain removal",
      "Polyurethane deck coating removal for yachting",
      "Marine on-board coating removal and surface preparation",
    ],
    idealClients: [
      "Property managers",
      "Strata councils",
      "BC municipalities",
      "Homeowners",
      "Marine operators",
      "Restoration contractors",
    ],
    benefits: [
      "Up to 92% less dust than dry blasting",
      "Less water than pressure washing",
      "Little to no heat at the surface",
      "Less environmental impact than the alternatives",
      "Faster than the alternatives",
      "Mobile — the rig comes to the site",
    ],
    faqs: [
      { q: "How is vapour blasting different from pressure washing or dry blasting?", a: "It uses less water than pressure washing, produces up to 92% less dust than dry blasting, and puts little to no heat into the surface — so it cleans or strips without the mess or the damage of either." },
      { q: "What can it remove?", a: "Road markings, graffiti, gum, mould and soot, paint and stain, fire and smoke damage, and marine coatings — from concrete, steel and wood." },
      { q: "Do you come to the site?", a: "Yes. The rig is mobile across the Lower Mainland and Vancouver Island, and it is how Square One prepares surfaces for its own coating and thermoplastic work." },
    ],
    imageUrl: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-enhanced.jpg",
    imageAlt: "A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver",
  },
]

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug)
}
