import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import Container from "@/components/ui/Container"

export const metadata: Metadata = {
  title: "Mobile Surface Restoration BC | Dustless Vapor Blasting | Square One Paving",
  description:
    "BC's mobile dustless abrasive blasting specialists. We restore — not just clean — pavement, brick, concrete, steel, and marine surfaces. No silica dust, no harsh chemicals, no surface scarring. Lower Mainland & Vancouver Island.",
  keywords: [
    "vapor blasting BC",
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
    title: "Mobile Surface Restoration BC | Dustless Vapor Blasting",
    description:
      "Heritage stone, industrial steel, marine hulls, decks, pavement, graffiti — restored with water and recycled abrasive. Mobile across BC.",
  },
}

// ── Three-tier service offering ──────────────────────────────────────────────

const tiers = [
  {
    eyebrow: "01 · Residential",
    title: "Driveways, decks & exteriors.",
    body:
      "Oil-stained driveways, weathered patios, mossy walkways, wood deck stripping, pool-deck calcium, brick patios. The water-based system is gentle enough for heritage stonework yet aggressive enough to strip a decade of grime without scarring the substrate.",
    bullets: [
      "Oil & rust stain removal",
      "Wood deck stripping",
      "Pool-deck calcium",
      "Brick & stone restoration",
      "Pre-recoat preparation",
    ],
    image: "/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg",
    alt: "Cobble surface restoration close-up",
    tag: "Homeowners · Estates",
  },
  {
    eyebrow: "02 · Commercial",
    title: "Graffiti, storefronts, parkades.",
    body:
      "Graffiti abatement on heritage brick. Storefront and façade refresh. Parking-lot stripe and thermoplastic removal. Strata and HOA work. Faster than mechanical grinding, cleaner than dry sandblasting — without closing your block to dust.",
    bullets: [
      "Graffiti abatement",
      "Stripe & marking removal",
      "Storefront restoration",
      "Strata & HOA exteriors",
      "Pre-coating prep at scale",
    ],
    image: "/images/applications/parking-lots/storage-facility-red-brick-apron-01.jpg",
    alt: "Commercial brick threshold surface",
    tag: "Property Managers · Cities",
  },
  {
    eyebrow: "03 · Industrial",
    title: "Heavy machinery, marine, steel.",
    body:
      "Mill scale, weld discoloration, oxidation. Hydraulic frames, pumps, tanks, structural steel. Marine hulls, decks, props, anchors. We restore the substrate to a pre-coating profile without warping or surface scarring — uniform satin finish, no heat damage.",
    bullets: [
      "Industrial equipment & frames",
      "Tanks & pressure vessels",
      "Marine hulls & decks",
      "Mill scale & rust removal",
      "Coating spec preparation",
    ],
    image: "/images/products/streetbond/streetbond-cobble-texture-detail-01.jpg",
    alt: "Industrial substrate detail",
    tag: "Marine · Manufacturing",
  },
]

// ── The Rig — equipment trust band ─────────────────────────────────────────

const rigSpecs = [
  { label: "Method", value: "Wet abrasive — water + recycled glass" },
  { label: "Particulate", value: "< 5% airborne (vs. 100% dry)" },
  { label: "Substrate", value: "Concrete · brick · stone · steel · GRP" },
  { label: "Pressure", value: "60–120 PSI calibrated to surface" },
  { label: "Containment", value: "Runoff captured, water-recirc system" },
  { label: "Mobile", value: "Truck-mounted across BC" },
]

// ── Why-vapor differentiators ───────────────────────────────────────────────

const advantages = [
  {
    num: "01",
    title: "No silica dust hazard",
    body:
      "The water sheath suppresses 95%+ of airborne particulate. Approved for occupied buildings, schools, food-grade facilities, and heritage permits where dry blasting cannot enter.",
  },
  {
    num: "02",
    title: "No chemicals, no scarring",
    body:
      "Recycled glass abrasive and water — that's it. No solvents, no caustics, no etching compounds. The substrate underneath the contamination is preserved.",
  },
  {
    num: "03",
    title: "Eco-responsible by design",
    body:
      "Water-controlled runoff, recycled abrasive media, no chemical runoff to storm drains. Specified by BC municipalities and HOA councils with environmental compliance requirements.",
  },
  {
    num: "04",
    title: "Mobile across BC",
    body:
      "Two operating bases — Lower Mainland and Vancouver Island. The rig dispatches to your job site. No transporting industrial equipment to a shop, no shutdown of adjacent operations.",
  },
]

// ── Process ────────────────────────────────────────────────────────────────

const process = [
  { num: "01", title: "Site Walk", body: "On-site assessment. Substrate ID, contamination type, target finish spec, runoff containment plan, photo set for the quote." },
  { num: "02", title: "Containment", body: "Adjacent areas masked. Runoff containment built. Recirculation tank staged. Surrounding surfaces protected before water meets media." },
  { num: "03", title: "Restore", body: "Wet abrasive at calibrated pressure. Continuous monitoring of profile, consumption, and adjacent surfaces. Adjustments dialled in real time." },
  { num: "04", title: "Sign-Off", body: "Profile gauge readings. Photo set, before-and-after. Written report. Site cleared, runoff captured, surface ready for what comes next." },
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

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export default function VaporBlastingServicePage() {
  return (
    <main className="bg-[#F6F4F0]">

      {/* ── HERO — cinematic dark, dustless USP ──────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <Image
            src="/images/services/vapor-blasting/hero.jpg"
            alt="Square One Paving — mobile vapor blasting rig across BC"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.55)] via-[rgba(10,10,10,0.45)] to-[rgba(10,10,10,0.95)]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.75)] via-transparent to-[rgba(10,10,10,0.20)]" />
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 60%, rgba(242,100,48,0.12) 0%, transparent 55%)" }} />
        </div>

        <div className="absolute top-24 lg:top-28 left-6 lg:left-12 z-10 flex items-center gap-3">
          <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
          <span className="text-[10.5px] uppercase tracking-[0.32em] text-white/65 font-semibold">
            Square One Paving · Vapor Blasting Division
          </span>
        </div>

        <Container className="relative z-10 w-full pt-32 pb-24 lg:pb-32">
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-7">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Mobile Surface Restoration</span>
                <span className="hidden sm:block w-px h-3 bg-white/20" />
                <span className="hidden sm:block text-[10.5px] uppercase tracking-[0.18em] text-white/55 font-medium">British Columbia</span>
              </div>

              <h1 className="text-white display-h" style={{ fontSize: "clamp(2.75rem, 7.5vw, 7rem)" }}>
                The cleanest way<br />
                to <span className="italic font-extralight text-white/95">restore</span>{" "}
                <span className="text-[#F26430]">a surface.</span>
              </h1>

              <p className="text-white/75 text-base lg:text-xl mt-9 max-w-xl leading-[1.65] font-light">
                Dustless abrasive blasting — water and recycled glass at calibrated pressure. We strip decades of grime, graffiti, oxidation, and coatings without silica dust, surface scarring, or harsh chemicals. Mobile across BC since 2000.
              </p>

              <div className="mt-12 flex flex-wrap gap-3 items-center">
                <Link href="/contact" className="group bg-white text-[#0A0A0A] px-9 py-4 font-semibold text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300 inline-flex items-center gap-3">
                  Request a Site Walk<ArrowRight />
                </Link>
                <a href="tel:6044669902" className="group border border-white/30 text-white px-9 py-4 font-medium text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 inline-flex items-center gap-3">
                  604-466-9902
                </a>
              </div>
            </div>

            {/* Spec strip — hero-side */}
            <div className="hidden lg:flex flex-col bg-white/[0.04] backdrop-blur-2xl border border-white/15"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.04) inset" }}>
              {[
                { label: "Method", value: "Water + Recycled Glass" },
                { label: "Particulate", value: "< 5% Airborne" },
                { label: "Service Area", value: "BC Lower Mainland + Island" },
                { label: "Established", value: "2000 — 25 Years On the Ground" },
              ].map((spec, i) => (
                <div key={spec.label} className={`px-7 py-5 ${i > 0 ? "border-t border-white/10" : ""}`}>
                  <p className="text-[9.5px] uppercase tracking-[0.26em] text-white/40 font-bold mb-1.5">{spec.label}</p>
                  <p className="text-white text-[14.5px] font-semibold tracking-[-0.005em]">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── DUSTLESS BAND — bold USP strip ───────────────────────────────── */}
      <section className="bg-[#0F1115] border-y border-white/5 py-10 lg:py-12">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-10 items-center">
            {[
              { stat: "< 5%", label: "Airborne dust", sub: "vs. 100% dry blasting" },
              { stat: "0", label: "Harsh chemicals", sub: "water + recycled abrasive" },
              { stat: "BC", label: "Mobile across", sub: "two-base province coverage" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-5">
                <div className="text-white" style={{ fontWeight: 200, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.05em" }}>
                  {item.stat}
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-[0.22em] text-white font-semibold">{item.label}</div>
                  <div className="text-[11px] tracking-[0.04em] text-white/50 mt-1 font-light">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── THREE-TIER SERVICE — Residential / Commercial / Industrial ───── */}
      <section className="bg-white section-padding">
        <Container>
          <div className="mb-14 lg:mb-20 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-end">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">Three Tiers · One Method</p>
              </div>
              <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
                What we restore.<br />
                <span className="italic font-extralight">From driveway to drydock.</span>
              </h2>
            </div>
            <p className="text-[#5A5A5A] max-w-md leading-[1.7] text-[15px] lg:text-base font-light lg:mb-2">
              Vapor blasting works on virtually every hard substrate &mdash; the difference between a homeowner&apos;s patio and an industrial pump frame is the pressure setting and the abrasive grade, not the underlying method.
            </p>
          </div>

          <div className="space-y-6 lg:space-y-8">
            {tiers.map((tier, i) => (
              <article key={tier.eyebrow} className="grid md:grid-cols-2 gap-0 overflow-hidden border border-[#E2DDD8] bg-white hover:border-[#F26430]/40 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] transition-all duration-500">
                <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image src={tier.image} alt={tier.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-1000 ease-out hover:scale-105" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.45)] via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3.5 py-2">
                    <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">{tier.tag}</span>
                  </div>
                </div>

                <div className={`p-9 lg:p-14 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold mb-5">{tier.eyebrow}</p>
                  <h3 className="text-[#0A0A0A] display-h mb-5" style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}>
                    {tier.title}
                  </h3>
                  <p className="text-[#2C2C2C] leading-[1.75] text-[15px] font-light mb-7">
                    {tier.body}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {tier.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-[#3A3A3A]">
                        <span className="text-[#F26430] flex-shrink-0 mt-1" aria-hidden>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── THE RIG — equipment trust band ───────────────────────────────── */}
      <section className="relative bg-[#0A0A0A] section-padding overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.92)] to-[rgba(10,10,10,0.95)]" />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(242,100,48,0.14) 0%, transparent 55%)" }} />

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">The Rig</p>
              </div>
              <h2 className="text-white display-h mb-7" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Industrial-grade gear.<br />
                <span className="italic font-extralight">Owner-operated.</span>
              </h2>
              <p className="text-white/70 text-[15.5px] leading-[1.75] font-light mb-8 max-w-md">
                The rig is truck-mounted and mobile across BC. Industrial diesel compressor, water-recirculation system, calibrated nozzle assembly, certified abrasive media, full runoff containment. The same unit that restores a Heritage façade in Victoria handles a parkade in Burnaby on Tuesday.
              </p>
              <p className="text-white/55 text-[14px] leading-[1.7] font-light">
                Every job is run by Square One staff &mdash; no subcontractors, no rented operators. The crew on your site has a decade-plus of restoration experience and pulls up to your address with the same equipment they used yesterday.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
              {rigSpecs.map((spec) => (
                <div key={spec.label} className="bg-[#0A0A0A] p-7 lg:p-8">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#FF8A5C] font-bold mb-3">{spec.label}</p>
                  <p className="text-white text-[15px] font-medium leading-[1.45] tracking-[-0.005em]">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── DUSTLESS ADVANTAGE — 4 differentiators ───────────────────────── */}
      <section className="bg-[#F6F4F0] section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-end mb-14 lg:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">The Dustless Advantage</p>
              </div>
              <h2 className="text-[#0A0A0A] display-h" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
                Why wet beats<br />
                <span className="italic font-extralight">dry &mdash; every time.</span>
              </h2>
            </div>
            <p className="text-[#5A5A5A] max-w-md leading-[1.7] text-[15px] lg:text-base font-light lg:mb-2">
              Dry sandblasting and mechanical grinding belong to an older era of surface prep. Vapor blasting is the working specification on every job that involves occupied buildings, environmental compliance, or heritage substrates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[#E2DDD8]">
            {advantages.map((a) => (
              <div key={a.num} className="border-b border-[#E2DDD8] md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-r-[#E2DDD8] p-9 lg:p-11 group bg-white hover:bg-[#FAF7F4] transition-colors">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold">{a.num}</span>
                  <div className="h-px flex-1 bg-[#E2DDD8] group-hover:bg-[#F26430] transition-colors duration-500" />
                </div>
                <h3 className="text-[#0A0A0A] font-semibold text-[20px] lg:text-[22px] leading-[1.2] tracking-[-0.01em] mb-4">{a.title}</h3>
                <p className="text-[#5A5A5A] text-[14.5px] leading-[1.7] font-light">{a.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROCESS — 4 steps ────────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <Container>
          <div className="text-center mb-14 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#F26430] font-semibold">The Method</p>
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
            </div>
            <h2 className="text-[#0A0A0A] display-h max-w-3xl mx-auto" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
              Site walk to sign-off.<br />
              <span className="italic font-extralight">Four steps, every job.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[#E2DDD8]">
            {process.map((step) => (
              <div key={step.num} className="border-b border-[#E2DDD8] sm:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r border-[#E2DDD8] p-8 lg:p-10 group hover:bg-[#FAF7F4] transition-colors">
                <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#F26430] font-bold mb-5">{step.num}</p>
                <div className="h-px w-10 bg-[#F26430] mb-5 group-hover:w-16 transition-all duration-500" />
                <h3 className="text-[#0A0A0A] font-semibold text-[18.5px] leading-[1.2] tracking-[-0.005em] mb-4">{step.title}</h3>
                <p className="text-[#5A5A5A] text-[13.5px] leading-[1.7] font-light">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── SUBSTRATES — chips strip ─────────────────────────────────────── */}
      <section className="bg-[#F6F4F0] py-20 lg:py-24">
        <Container>
          <div className="text-center mb-10">
            <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#F26430] font-bold mb-4">Substrates We Restore</p>
            <h2 className="text-[#0A0A0A] display-h max-w-3xl mx-auto" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}>
              From Heritage limestone to industrial steel.
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {substrates.map((s) => (
              <span key={s} className="text-[12px] uppercase tracking-[0.16em] font-semibold px-4 py-2.5 border border-[#E2DDD8] bg-white text-[#2C2C2C] hover:border-[#F26430] hover:text-[#F26430] transition-colors">
                {s}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── ECO BAND — for municipal/HOA contracts ───────────────────────── */}
      <section className="relative bg-[#0F1115] py-20 lg:py-28 overflow-hidden border-y border-white/5">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(242,100,48,0.10) 0%, transparent 60%)" }} />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
            <div className="lg:max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Specified by BC Cities</p>
              </div>
              <h2 className="text-white display-h" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>
                Eco-responsible.<br />
                <span className="italic font-extralight">By specification.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <p className="text-white/75 text-[15px] leading-[1.75] font-light">
                Recycled glass abrasive. Water-controlled runoff. No solvents. No caustic chemicals. No toxic media. The system was specified by BC municipalities precisely because it satisfies environmental compliance requirements that dry blasting and chemical stripping can&apos;t.
              </p>
              <p className="text-white/75 text-[15px] leading-[1.75] font-light">
                For HOA councils, strata operations, and municipal procurement teams &mdash; the documentation trail (containment plan, runoff capture, media SDS, sign-off photos) is part of every job. We work to the standard your insurance and your residents expect.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SERVICE AREA — BC mobile coverage ────────────────────────────── */}
      <section className="bg-white section-padding">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#F26430] font-bold mb-4">Mobile Across BC</p>
            <h2 className="text-[#0A0A0A] display-h max-w-3xl mx-auto" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}>
              Two operating bases. One province.
            </h2>
            <p className="text-[#5A5A5A] mt-5 max-w-2xl mx-auto leading-[1.7] text-[15px] font-light">
              Lower Mainland and Vancouver Island. Mobile rig dispatched same week, no minimum job size for routine residential work. Don&apos;t see your city below? It&apos;s likely covered &mdash; ask.
            </p>
          </div>
          <div className="ticker-mask overflow-hidden border-y border-[#E2DDD8] py-6">
            <div className="ticker-track">
              {[...cities, ...cities].map((c, i) => (
                <span key={i} className="flex items-center whitespace-nowrap px-7 text-[14.5px] text-[#2C2C2C] font-medium tracking-[-0.005em]">
                  {c}
                  <span className="mx-7 w-1 h-1 rounded-full bg-[#F26430] opacity-60" />
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA — premium dark ───────────────────────────────────────────── */}
      <section className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/services/vapor-blasting/hero.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.92)] via-[rgba(10,10,10,0.85)] to-[rgba(10,10,10,0.95)]" />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(242,100,48,0.16) 0%, transparent 65%)" }} />

        <Container className="relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#FF8A5C] font-bold">Book a Site Walk</p>
            </div>
            <h2 className="text-white display-h mb-7" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}>
              Send us a photo.<br />
              <span className="italic font-extralight">We&apos;ll send back a quote.</span>
            </h2>
            <p className="text-white/75 text-[15.5px] lg:text-lg leading-[1.7] font-light mb-10 max-w-xl">
              The fastest path to a quote is a couple of photos and a postcode. No driving, no obligation, no minimum job. We assess the substrate, suggest the right abrasive, and come back with a written estimate the same week.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="group bg-white text-[#0A0A0A] px-9 py-4 font-semibold text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-[#F26430] hover:text-white transition-colors duration-300 inline-flex items-center gap-3">
                Request a Quote<ArrowRight />
              </Link>
              <a href="tel:6044669902" className="group border border-white/30 text-white px-9 py-4 font-medium text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 inline-flex items-center gap-3">
                604-466-9902
              </a>
              <a href="mailto:office@squareonepaving.com" className="group border border-white/15 text-white/80 px-9 py-4 font-medium text-[12.5px] tracking-[0.04em] uppercase rounded-none hover:border-white/40 hover:text-white transition-colors duration-300 inline-flex items-center gap-3">
                office@squareonepaving.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
