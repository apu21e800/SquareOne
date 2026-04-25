import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vapor Blasting BC — Mobile Surface Restoration | Square One Paving",
  description:
    "BC’s mobile vapor blasting specialists. Heritage stonework, industrial equipment, marine, and concrete — wet abrasive surface restoration without heat damage or surface scarring. Ladysmith & Kelowna.",
  keywords: [
    "vapor blasting BC",
    "wet blasting Vancouver Island",
    "surface restoration BC",
    "heritage building cleaning BC",
    "mobile vapor blasting Ladysmith",
    "industrial surface prep BC",
    "dustless blasting BC",
    "marine hull cleaning BC",
  ],
  alternates: { canonical: "https://squareonepaving.com/vapor-blasting" },
}

const comparisonRows = [
  { attr: "DUST OUTPUT",     vapor: "< 5% airborne",       sand: "High — full PPE",    grind: "High — full PPE" },
  { attr: "HEAT DAMAGE",     vapor: "None — water cooled", sand: "Localized",            grind: "Risk of warping" },
  { attr: "SURFACE FINISH",  vapor: "Uniform satin",        sand: "Aggressive profile",  grind: "Linear scoring" },
  { attr: "HERITAGE-SAFE",   vapor: "Yes",                  sand: "No",                  grind: "No" },
  { attr: "SPEED (TYPICAL)", vapor: "15–25 m²/hr",    sand: "20–30 m²/hr",    grind: "5–10 m²/hr" },
  { attr: "MOBILE",          vapor: "Yes — truck-mounted", sand: "Yes",                 grind: "Limited" },
]

const applications = [
  { num: "01", title: "Industrial Equipment", desc: "Pumps, motors, frames, hydraulic components — full restoration without disassembly damage." },
  { num: "02", title: "Heritage Stonework",   desc: "Sandstone, limestone, granite façades. Pollution and biofilm removed; substrate untouched." },
  { num: "03", title: "Concrete Surfaces",    desc: "Coating removal, laitance prep, line stripe removal, graffiti abatement on concrete and pavers." },
  { num: "04", title: "Metal Fabrication",    desc: "Mill scale, weld discoloration, oxidation. Uniform satin profile ready for coating or inspection." },
  { num: "05", title: "Marine",               desc: "Hulls, decks, props, anchors. Antifouling and barnacle removal without gelcoat damage." },
  { num: "06", title: "Pre-Coating Prep",     desc: "Surface profile to spec for paint, powder coat, plasma spray, or thermal barrier coatings." },
]

const processSteps = [
  { num: "01", title: "Assess",  desc: "On-site walkthrough. Substrate identification, contamination type, target finish spec." },
  { num: "02", title: "Prep",    desc: "Containment, runoff control, surface masking. Adjacent areas protected before water meets media." },
  { num: "03", title: "Blast",   desc: "Wet abrasive at calibrated pressure. Continuous monitoring of surface profile and consumption rate." },
  { num: "04", title: "Inspect", desc: "Sign-off photo set, profile gauge readings, and a written report. Site cleared, runoff captured." },
]

const results = [
  {
    location: "VICTORIA · INNER HARBOUR",
    title: "Heritage limestone façade restoration",
    specs: ["240 m²", "4 days", "Recycled glass", "Heritage permit"],
  },
  {
    location: "NANAIMO · INDUSTRIAL",
    title: "Hydraulic pump frame — coating removal",
    specs: ["12 units", "2 days", "No disassembly", "Pre-paint profile"],
  },
  {
    location: "VANCOUVER · CONCRETE",
    title: "Parkade deck — line stripe & coating removal",
    specs: ["1,400 m²", "6 days", "Occupied facility", "Night shift"],
  },
  {
    location: "SIDNEY · MARINE",
    title: "Aluminum hull — antifouling removal",
    specs: ["52 ft vessel", "3 days", "Gelcoat preserved"],
  },
]

const whyStats = [
  {
    stat: "25yrs",
    label: "Years on the ground",
    desc: "SquareOne has run BC restoration jobs since 1999 — through every regulatory shift in airborne particulate, runoff containment, and heritage permitting.",
  },
  {
    stat: "100% BC",
    label: "BC-based, on-site",
    desc: "Two bases — Ladysmith on the Island, Kelowna in the Interior. Mobile rig dispatched same week. No subcontractors, ever.",
  },
  {
    stat: "51+",
    label: "Municipal-trusted",
    desc: "City of Nanaimo, District of Saanich, City of Kelowna, BC Transit. The same compliance and reporting standards apply on every private job.",
  },
]

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function VaporBlastingPage() {
  return (
    <main style={{ background: "#F6F4F0" }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          background: "#0A0C10",
          minHeight: "88vh",
          paddingTop: "68px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pb-20 pt-24 w-full">
          <p
            className="mb-8 font-bold uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#E8895A" }}
          >
            Mobile Vapor Blasting · British Columbia
          </p>

          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-end">
            <div>
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(3.4rem, 8vw, 8rem)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.9,
                  color: "white",
                }}
              >
                Surface restoration<br />done right.
              </h1>

              <p
                className="mt-8 mb-10 max-w-xl"
                style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}
              >
                Vapor blasting removes rust, coatings, and contaminants without heat
                damage, warping, or surface scarring. Mobile across BC, used by municipalities,
                heritage sites, and food-grade facilities since 1999.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#quote">
                  <span
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold tracking-[0.04em] text-white transition-all hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
                  >
                    Request a Vapor Blast <Arrow />
                  </span>
                </Link>
                <a href="#process">
                  <span
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold tracking-[0.04em] transition-all hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }}
                  >
                    See the process
                  </span>
                </a>
              </div>
            </div>

            {/* Spec strip */}
            <div
              className="hidden lg:flex flex-col divide-y"
              style={{ border: "1px solid rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.10)" }}
            >
              {[
                { label: "METHOD",       value: "Wet abrasive" },
                { label: "PARTICULATE",  value: "< 5%" },
                { label: "SERVICE AREA", value: "BC-wide" },
              ].map(({ label, value }) => (
                <div key={label} className="px-6 py-5" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                  <p
                    className="uppercase mb-1.5"
                    style={{ fontSize: "9px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.30)", fontWeight: 700 }}
                  >
                    {label}
                  </p>
                  <p style={{ fontWeight: 700, color: "white", fontSize: "1rem" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What is Vapor Blasting ──────────────────────── */}
      <section className="py-28 bg-white" style={{ borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <p
            className="font-bold uppercase mb-6"
            style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C8601A" }}
          >
            What is Vapor Blasting
          </p>
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.6rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#111111",
              }}
            >
              Water and abrasive media. Pressurized together.
            </h2>

            <div>
              <p style={{ color: "#4A4A4A", lineHeight: 1.75, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
                Compressed water and recycled glass media meet at the nozzle. The water cushions
                the abrasive, suppressing 95%+ of airborne dust and lowering the working
                temperature — so we can clean, prep, or restore without damaging the substrate
                underneath.
              </p>
              <p style={{ color: "#4A4A4A", lineHeight: 1.75, fontSize: "1.05rem", marginBottom: "2.5rem" }}>
                The result is a uniform, contaminant-free surface ready for inspection, coating,
                or service. No warping. No micro-fractures. No dust cloud — which is why we&apos;re
                approved to work in occupied facilities, heritage sites, and food-grade
                environments where dry methods can&apos;t go.
              </p>

              {/* Comparison table */}
              <div className="overflow-x-auto" style={{ border: "1px solid #E2DDD8" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#0A0C10" }}>
                      <th className="text-left px-5 py-4" style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>Attribute</th>
                      <th className="px-5 py-4 text-center" style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "#E8895A", textTransform: "uppercase" }}>Vapor Blasting</th>
                      <th className="px-5 py-4 text-center" style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>Sandblasting</th>
                      <th className="px-5 py-4 text-center" style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>Grinding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={row.attr} style={{ background: i % 2 === 0 ? "white" : "#FAFAF8" }}>
                        <td className="px-5 py-3.5" style={{ fontSize: "10px", letterSpacing: "0.12em", fontWeight: 700, color: "#8C8C8C", textTransform: "uppercase" }}>{row.attr}</td>
                        <td className="px-5 py-3.5 text-center" style={{ fontWeight: 700, color: "#111111" }}>{row.vapor}</td>
                        <td className="px-5 py-3.5 text-center" style={{ color: "#8C8C8C" }}>{row.sand}</td>
                        <td className="px-5 py-3.5 text-center" style={{ color: "#8C8C8C" }}>{row.grind}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Applications ───────────────────────────────── */}
      <section className="py-28" style={{ background: "#F6F4F0", borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="font-bold uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C8601A" }}>
                Applications
              </p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "#111111" }}>
                Where we work.
              </h2>
            </div>
            <p style={{ color: "#5A5A5A", maxWidth: "380px", lineHeight: 1.6 }}>
              From single industrial components to multi-storey heritage façades — same rig, same crew.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ border: "1px solid #E2DDD8", gap: "1px", background: "#E2DDD8" }}>
            {applications.map((app) => (
              <div
                key={app.num}
                className="p-8 group transition-colors duration-300"
                style={{ background: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A0C10" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white" }}
              >
                <p
                  className="font-black mb-4"
                  style={{ fontSize: "11px", letterSpacing: "0.20em", color: "#C8601A" }}
                >
                  {app.num}
                </p>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", color: "#111111" }}
                >
                  {app.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section id="process" className="py-28 bg-white" style={{ borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="font-bold uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C8601A" }}>
            Our Process
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "#111111" }}>
              Four steps.<br />Documented every time.
            </h2>
            <p style={{ color: "#5A5A5A", maxWidth: "380px", lineHeight: 1.6 }}>
              Every job ships with a pre-blast assessment, mid-job inspection photos, and a
              post-blast surface profile report.
            </p>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4"
            style={{ border: "1px solid #E2DDD8", gap: "1px", background: "#E2DDD8" }}
          >
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="p-8"
                style={{ background: i % 2 === 1 ? "#F6F4F0" : "white" }}
              >
                <p
                  className="font-black mb-6"
                  style={{
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    color: "#E2DDD8",
                  }}
                >
                  {step.num}
                </p>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#111111" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section className="py-28" style={{ background: "#0A0C10", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="font-bold uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#E8895A" }}>
            Results
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "white" }}>
              Recent BC restorations.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.35)", maxWidth: "280px", lineHeight: 1.6, fontSize: "0.9rem" }}>
              Selected projects from the last 18 months.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((result) => (
              <div
                key={result.location}
                className="p-6 transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <p
                  className="font-bold uppercase mb-3"
                  style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#E8895A" }}
                >
                  {result.location}
                </p>
                <h3
                  className="font-bold mb-4 leading-snug"
                  style={{ fontSize: "1rem", letterSpacing: "-0.02em", color: "white" }}
                >
                  {result.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] font-semibold px-2.5 py-1"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.45)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SquareOne ───────────────────────────────── */}
      <section className="py-28 bg-white" style={{ borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="font-bold uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C8601A" }}>
            Why SquareOne
          </p>
          <h2
            className="mb-16"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#111111",
              maxWidth: "600px",
            }}
          >
            Few BC contractors offer this. None do it longer.
          </h2>

          <div
            className="grid sm:grid-cols-3"
            style={{ border: "1px solid #E2DDD8", gap: "1px", background: "#E2DDD8" }}
          >
            {whyStats.map((item, i) => (
              <div
                key={item.stat}
                className="p-10"
                style={{ background: i % 2 === 1 ? "#F6F4F0" : "white" }}
              >
                <p
                  className="font-black mb-1"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    color: "#C8601A",
                  }}
                >
                  {item.stat}
                </p>
                <p
                  className="font-bold mb-3"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.10em",
                    color: "#111111",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Form ───────────────────────────────────── */}
      <section id="quote" className="py-28" style={{ background: "#F6F4F0", borderBottom: "1px solid #E2DDD8" }}>
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[480px_1fr] gap-20">
            <div>
              <p className="font-bold uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#C8601A" }}>
                Get a Quote
              </p>
              <h2
                className="mb-6"
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "#111111",
                }}
              >
                Tell us what needs blasting.
              </h2>
              <p className="mb-8" style={{ color: "#5A5A5A", lineHeight: 1.7 }}>
                We&apos;ll spec it within one business day. Every quote includes substrate
                assessment, target finish profile, runoff plan, and fixed-price written
                estimate. We don&apos;t take work we can&apos;t spec accurately.
              </p>
              <ul className="space-y-2.5">
                {[
                  "On-site or remote assessment",
                  "Surface profile spec to SSPC/NACE",
                  "Containment & runoff plan included",
                  "Pre & post photo documentation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#4A4A4A" }}>
                    <span style={{ color: "#C8601A", fontWeight: 900 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <form
              action="/api/contact"
              method="POST"
              className="p-10"
              style={{ background: "white", border: "1px solid #E2DDD8" }}
            >
              <input type="hidden" name="formType" value="vapor-blasting" />
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#8C8C8C", textTransform: "uppercase" }}
                  >
                    Name <span style={{ color: "#C8601A" }}>*</span>
                  </label>
                  <input
                    name="name" type="text" required
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm outline-none transition-colors"
                    style={{ border: "1px solid #E2DDD8" }}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#8C8C8C", textTransform: "uppercase" }}
                  >
                    Phone <span style={{ color: "#C8601A" }}>*</span>
                  </label>
                  <input
                    name="phone" type="tel" required
                    placeholder="604-xxx-xxxx"
                    className="w-full px-4 py-3 text-sm outline-none transition-colors"
                    style={{ border: "1px solid #E2DDD8" }}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  className="block mb-2"
                  style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#8C8C8C", textTransform: "uppercase" }}
                >
                  Email <span style={{ color: "#C8601A" }}>*</span>
                </label>
                <input
                  name="email" type="email" required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{ border: "1px solid #E2DDD8" }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#8C8C8C", textTransform: "uppercase" }}
                  >
                    Project Type <span style={{ color: "#C8601A" }}>*</span>
                  </label>
                  <select
                    name="projectType" required
                    className="w-full px-4 py-3 text-sm outline-none transition-colors bg-white"
                    style={{ border: "1px solid #E2DDD8" }}
                  >
                    <option value="">Select project type</option>
                    <option>Industrial Equipment</option>
                    <option>Concrete</option>
                    <option>Heritage Stonework</option>
                    <option>Metal Fabrication</option>
                    <option>Marine</option>
                    <option>Pre-Coating Prep</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#8C8C8C", textTransform: "uppercase" }}
                  >
                    City <span style={{ color: "#C8601A" }}>*</span>
                  </label>
                  <input
                    name="city" type="text" required
                    placeholder="Nanaimo, Victoria, Kelowna…"
                    className="w-full px-4 py-3 text-sm outline-none transition-colors"
                    style={{ border: "1px solid #E2DDD8" }}
                  />
                </div>
              </div>
              <div className="mb-8">
                <label
                  className="block mb-2"
                  style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#8C8C8C", textTransform: "uppercase" }}
                >
                  Project Notes
                </label>
                <textarea
                  name="message" rows={4}
                  placeholder="Surface area, substrate type, current condition, any access constraints…"
                  className="w-full px-4 py-3 text-sm outline-none transition-colors resize-none"
                  style={{ border: "1px solid #E2DDD8" }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-sm font-bold tracking-[0.08em] uppercase text-white transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
              >
                Get a Vapor Blasting Quote →
              </button>
              <p className="text-center text-xs mt-4" style={{ color: "#A0A0A0" }}>
                We respond within 1 business day.
              </p>
            </form>
          </div>
        </div>
      </section>

    </main>
  )
}
