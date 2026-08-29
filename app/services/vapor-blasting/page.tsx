import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

import { galleryWithFallback, heroFor } from "@/lib/gallery"

// Route and slug keep the US spelling; display prose reads "vapour blasting".
export const metadata: Metadata = {
  title: "Mobile Surface Restoration BC | Dustless Vapour Blasting | Square One Paving",
  description:
    "BC's mobile dustless abrasive blasting specialists. We restore — not just clean — pavement, brick, concrete, steel, and marine surfaces. No silica dust, no harsh chemicals, no surface scarring. Lower Mainland & Vancouver Island.",
  keywords: [
    "vapour blasting BC",
    "dustless abrasive blasting Vancouver",
    "mobile surface restoration BC",
    "graffiti removal Vancouver Island",
    "wet abrasive blasting BC",
    "concrete surface prep BC",
    "heritage stone cleaning Victoria",
    "industrial surface restoration BC",
  ],
  alternates: { canonical: "https://squareonepaving.ca/services/vapor-blasting" },
  openGraph: {
    title: "Mobile Surface Restoration BC | Dustless Vapour Blasting",
    description:
      "Heritage stone, industrial steel, marine hulls, decks, pavement, graffiti — restored with water and recycled abrasive. Mobile across BC.",
  },
}

const HERO_FALLBACK = "/images/services/vapor-blasting/hero.jpg"

/** Passed to lib/gallery so nothing 404s before the folder is populated. */
const GALLERY_FALLBACK: readonly string[] = [
  "/images/products/streetbond/streetbond-cobblestone-grey-closeup-01.jpg",
  "/images/applications/parking-lots/laneway-red-streetbond-installation-01.jpg",
  "/images/applications/parking-lots/rbc-royal-bank-brick-threshold-01.jpg",
]

// ── Headline facts ─────────────────────────────────────────────────────────

type Fact = { number: string; label: string }

const facts: Fact[] = [
  { number: "< 5%", label: "airborne dust, against 100 percent for dry blasting" },
  { number: "12", label: "substrate families restored, from limestone to steel" },
  { number: "02", label: "operating bases — Lower Mainland and Vancouver Island" },
]

// ── Three-tier service offering ──────────────────────────────────────────────

const tiers = [
  {
    eyebrow: "01 · Residential",
    title: "Driveways, decks and exteriors",
    body:
      "Oil-stained driveways, weathered patios, mossy walkways, wood deck stripping, pool-deck calcium, brick patios. The water-based system is gentle enough for heritage stonework yet aggressive enough to strip a decade of grime without scarring the substrate.",
    bullets: [
      "Oil and rust stain removal",
      "Wood deck stripping",
      "Pool-deck calcium",
      "Brick and stone restoration",
      "Pre-recoat preparation",
    ],
    image: "/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg",
    alt: "Cobble surface restoration close-up",
    tag: "Homeowners · Estates",
  },
  {
    eyebrow: "02 · Commercial",
    title: "Graffiti, storefronts, parkades",
    body:
      "Graffiti abatement on heritage brick. Storefront and façade refresh. Parking-lot stripe and thermoplastic removal. Strata and HOA work. Faster than mechanical grinding, cleaner than dry sandblasting — without closing your block to dust.",
    bullets: [
      "Graffiti abatement",
      "Stripe and marking removal",
      "Storefront restoration",
      "Strata and HOA exteriors",
      "Pre-coating prep at scale",
    ],
    image: "/images/applications/parking-lots/storage-facility-red-brick-apron-01.jpg",
    alt: "Commercial brick threshold surface",
    tag: "Property managers · Cities",
  },
  {
    eyebrow: "03 · Industrial",
    title: "Heavy machinery, marine, steel",
    body:
      "Mill scale, weld discolouration, oxidation. Hydraulic frames, pumps, tanks, structural steel. Marine hulls, decks, props, anchors. We restore the substrate to a pre-coating profile without warping or surface scarring — uniform satin finish, no heat damage.",
    bullets: [
      "Industrial equipment and frames",
      "Tanks and pressure vessels",
      "Marine hulls and decks",
      "Mill scale and rust removal",
      "Coating spec preparation",
    ],
    image: "/images/products/streetbond/streetbond-cobble-texture-detail-01.jpg",
    alt: "Industrial substrate detail",
    tag: "Marine · Manufacturing",
  },
]

// ── The Rig — equipment trust band ─────────────────────────────────────────

const rigSpecs = [
  { label: "Method", value: "Wet abrasive — water and recycled glass" },
  { label: "Particulate", value: "< 5% airborne, against 100% dry" },
  { label: "Substrate", value: "Concrete · brick · stone · steel · GRP" },
  { label: "Pressure", value: "60–120 PSI calibrated to surface" },
  { label: "Containment", value: "Runoff captured, water-recirculation system" },
  { label: "Mobile", value: "Truck-mounted across British Columbia" },
]

// ── Why-vapour differentiators ──────────────────────────────────────────────

const advantages = [
  {
    num: "01",
    title: "No silica dust hazard",
    body:
      "The water sheath suppresses more than 95 percent of airborne particulate. Cleared for occupied buildings, schools, food-grade facilities and heritage permits that dry blasting cannot enter.",
  },
  {
    num: "02",
    title: "No chemicals, no scarring",
    body:
      "Recycled glass abrasive and water — that is it. No solvents, no caustics, no etching compounds. The substrate underneath the contamination is preserved.",
  },
  {
    num: "03",
    title: "Eco-responsible by design",
    body:
      "Water-controlled runoff, recycled abrasive media, no chemical runoff to storm drains. Specified by BC municipalities and strata councils with environmental compliance requirements.",
  },
  {
    num: "04",
    title: "Mobile across BC",
    body:
      "Two operating bases — Lower Mainland and Vancouver Island. The rig dispatches to your site. No transporting industrial equipment to a shop, no shutdown of adjacent operations.",
  },
]

// ── Process ────────────────────────────────────────────────────────────────

const process = [
  { num: "01", title: "Site walk", body: "On-site assessment. Substrate identification, contamination type, target finish spec, runoff containment plan, photo set for the quote." },
  { num: "02", title: "Containment", body: "Adjacent areas masked. Runoff containment built. Recirculation tank staged. Surrounding surfaces protected before water meets media." },
  { num: "03", title: "Restore", body: "Wet abrasive at calibrated pressure. Continuous monitoring of profile, consumption and adjacent surfaces. Adjustments dialled in real time." },
  { num: "04", title: "Sign-off", body: "Profile gauge readings. Photo set, before and after. Written report. Site cleared, runoff captured, surface ready for what comes next." },
]

// ── Substrates we restore ─────────────────────────────────────────────────

const substrates = [
  "Asphalt", "Concrete", "Brick & Heritage Stone", "Limestone & Sandstone",
  "Steel & Structural Metal", "Aluminum", "Marine GRP & Gelcoat", "Wood (deck stripping)",
  "Pavers & Cobblestone", "Pool Tile", "Industrial Equipment", "Tanks & Vessels",
]

// ── Service area ──────────────────────────────────────────────────────────

const cities = [
  "Vancouver", "Burnaby", "Surrey", "Richmond", "Coquitlam", "Maple Ridge",
  "Langley", "Abbotsford", "Chilliwack", "North Vancouver", "West Vancouver",
  "Whistler", "Squamish", "Sunshine Coast", "Victoria", "Saanich", "Sidney",
  "Nanaimo", "Ladysmith", "Duncan", "Parksville", "Courtenay", "Bowen Island",
]

export default function VaporBlastingServicePage() {
  const heroSrc = heroFor("services", "vapor-blasting", HERO_FALLBACK) ?? HERO_FALLBACK
  const gallery = galleryWithFallback("services", "vapor-blasting", GALLERY_FALLBACK)
    .filter((src) => src !== heroSrc)
    .slice(0, 3)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative grid min-h-[620px] grid-cols-[55fr_45fr] overflow-hidden bg-surface max-[700px]:min-h-0 max-[700px]:grid-cols-1">
        <div
          className="
            relative flex items-center
            pt-24 pb-24 pr-[72px] pl-[max(calc((100vw_-_1280px)/2),40px)]
            max-[700px]:pt-[72px] max-[700px]:pr-6 max-[700px]:pb-14 max-[700px]:pl-6
          "
        >
          <div className="relative z-[1]">
            <p className="eyebrow">Service &middot; Mobile surface restoration</p>

            <h1 className="stop mt-7">The cleanest way to restore a surface</h1>

            <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty] max-[700px]:text-[17px]">
              Dustless abrasive blasting — water and recycled glass at calibrated pressure. We
              strip decades of grime, graffiti, oxidation and coatings without silica dust,
              surface scarring or harsh chemicals. Mobile across British Columbia since 2000.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-[14px]">
              <Link href="/contact" className="btn-primary">
                Request a site walk
              </Link>
              <a href="tel:+16046126209" className="btn-secondary">
                604-612-6209
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden bg-surface-stone max-[700px]:aspect-[4/3]">
          <Image
            src={heroSrc}
            alt="Square One Paving mobile vapour blasting rig, British Columbia"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 45vw"
            className="object-cover [object-position:center_60%]"
          />
          <div aria-hidden="true" className="scrim scrim-light" />
          <div className="caption">Mobile rig &middot; Wet abrasive &middot; British Columbia</div>
        </div>
      </section>

      {/* ── Facts ────────────────────────────────────────────── */}
      <section className="section border-y border-hairline bg-surface-warm">
        <div className="container-1280 grid grid-cols-3 gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-9">
          {facts.map((fact) => (
            <div key={fact.label} className="stat-rule">
              <div className="stat-num">{fact.number}</div>
              <div className="mt-[14px] text-[15px] text-ink-muted">{fact.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What we restore — three tiers ────────────────────── */}
      <section className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">Three tiers, one method</p>

          <h2 className="mt-5">What we restore, from driveway to drydock</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Vapour blasting works on virtually every hard substrate. The difference between a
            homeowner&apos;s patio and an industrial pump frame is the pressure setting and the
            abrasive grade, not the underlying method.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {tiers.map((tier, i) => (
              <article
                key={tier.eyebrow}
                className="grid grid-cols-2 overflow-hidden rounded-[2px] border border-hairline bg-surface max-[900px]:grid-cols-1"
              >
                <div
                  className={`relative min-h-[380px] overflow-hidden bg-surface-stone max-[900px]:min-h-0 max-[900px]:aspect-[4/3] ${
                    i % 2 === 1 ? "min-[901px]:order-2" : ""
                  }`}
                >
                  <Image
                    src={tier.image}
                    alt={tier.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  <div className="caption">{tier.tag}</div>
                </div>

                <div
                  className={`flex flex-col justify-center p-12 max-[700px]:p-6 ${
                    i % 2 === 1 ? "min-[901px]:order-1" : ""
                  }`}
                >
                  <p className="label">{tier.eyebrow}</p>

                  <h3 className="mt-4">{tier.title}</h3>

                  <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-ink-body">
                    {tier.body}
                  </p>

                  <ul className="mt-7 grid grid-cols-2 gap-x-8 border-t border-hairline max-[700px]:grid-cols-1">
                    {tier.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="border-b border-hairline py-[10px] text-[14px] leading-[1.5] text-ink-body"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── The rig ──────────────────────────────────────────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1] grid grid-cols-2 gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <p className="eyebrow">The rig</p>

            <h2 className="mt-5">Industrial-grade gear, owner-operated</h2>

            <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
              The rig is truck-mounted and mobile across British Columbia. Industrial diesel
              compressor, water-recirculation system, calibrated nozzle assembly, certified
              abrasive media, full runoff containment. The same unit that restores a heritage
              façade in Victoria handles a parkade in Burnaby on Tuesday.
            </p>

            <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.6] text-ink-muted">
              Every job is run by Square One staff — no subcontractors, no rented operators. The
              crew on your site has a decade and more of restoration experience, and pulls up to
              your address with the same equipment they used yesterday.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 border-t border-hairline max-[700px]:grid-cols-1">
            {rigSpecs.map((spec) => (
              <div key={spec.label} className="border-b border-hairline py-6">
                <p className="label">{spec.label}</p>
                <p className="mt-2 text-[15px] leading-[1.5] text-ink">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The dustless advantage ───────────────────────────── */}
      <section className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">The dustless advantage</p>

          <h2 className="mt-5">Why wet beats dry, every time</h2>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Dry sandblasting and mechanical grinding belong to an older era of surface prep.
            Vapour blasting is the working specification on every job that involves occupied
            buildings, environmental compliance or heritage substrates.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-2 max-[700px]:grid-cols-1">
            {advantages.map((advantage) => (
              <div key={advantage.num} className="border-t border-hairline py-8">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {advantage.num}
                </div>
                <h3 className="mt-4">{advantage.title}</h3>
                <p className="mt-[10px] max-w-[52ch] text-[15px] leading-[1.55] text-ink-body">
                  {advantage.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The method ───────────────────────────────────────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">The method</p>

          <h2 className="mt-5">Site walk to sign-off, four steps every job</h2>

          <div className="mt-10 grid grid-cols-4 gap-10 border-t border-hairline max-[700px]:grid-cols-1 max-[700px]:gap-8">
            {process.map((step) => (
              <div key={step.num} className="pt-7">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
                  {step.num}
                </div>
                <h3 className="mt-4">{step.title}</h3>
                <p className="mt-[10px] max-w-[44ch] text-[15px] leading-[1.55] text-ink-body">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent work ──────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-surface">

        <div className="container-1280 relative z-[1]">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <p className="eyebrow">Recent work</p>
              <h2 className="mt-5">Restored surfaces across BC</h2>
            </div>
            <Link href="/projects" className="arrow-link whitespace-nowrap">
              All projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {gallery.length > 0 && (
            <div className="mt-10 grid grid-cols-3 gap-6 max-[700px]:grid-cols-1">
              {gallery.map((src) => (
                <div
                  key={src}
                  className="card relative aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone"
                >
                  <Image
                    src={src}
                    alt="Surface restored by Square One Paving with vapour blasting"
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                  </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Scope: substrates, compliance, service area ──────── */}
      <section className="section relative overflow-hidden border-y border-hairline bg-surface-warm">

        <div className="container-1280 relative z-[1]">
          <p className="eyebrow">Scope</p>

          <h2 className="mt-5">What we take on, and where</h2>

          <div className="mt-10 grid grid-cols-3 gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-10">
            <div className="border-t border-hairline pt-6">
              <p className="label">Substrates we restore</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {substrates.map((substrate) => (
                  <span key={substrate} className="tag">
                    {substrate}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-6">
              <p className="label">Environmental compliance</p>
              <p className="mt-5 text-[15px] leading-[1.6] text-ink-body">
                Recycled glass abrasive. Water-controlled runoff. No solvents, no caustic
                chemicals, no toxic media. The system is specified by BC municipalities precisely
                because it satisfies environmental requirements that dry blasting and chemical
                stripping cannot.
              </p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
                For strata councils and municipal procurement teams, the documentation trail —
                containment plan, runoff capture, media SDS, sign-off photos — is part of every
                job.
              </p>
            </div>

            <div className="border-t border-hairline pt-6">
              <p className="label">Service area</p>
              <p className="mt-5 text-[15px] leading-[1.6] text-ink-body">
                Two operating bases, Lower Mainland and Vancouver Island. The rig is dispatched
                the same week, with no minimum job size for routine residential work.
              </p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
                {cities.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container-1280">
          <p className="eyebrow">Book a site walk</p>

          <h2 className="stop mt-5 max-w-[20ch]">Send us a photo, we send back a quote</h2>

          <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.65] text-ink-body [text-wrap:pretty]">
            The fastest path to a quote is a couple of photos and a postcode. No driving, no
            obligation, no minimum job. We assess the substrate, suggest the right abrasive and
            come back with a written estimate the same week.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-[14px]">
            <Link href="/contact" className="btn-primary">
              Request a quote
            </Link>
            <a href="tel:+16046126209" className="btn-secondary">
              604-612-6209
            </a>
          </div>

          <p className="mt-8 text-[15px] text-ink-muted">
            Vancouver Island{" "}
            <a href="tel:+12503910270" className="font-semibold text-ink">
              250-391-0270
            </a>{" "}
            &middot; toll-free{" "}
            <a href="tel:+18773910270" className="font-semibold text-ink">
              1-877-391-0270
            </a>{" "}
            &middot;{" "}
            <a href="mailto:office@squareonepaving.com" className="font-semibold text-ink">
              office@squareonepaving.com
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
