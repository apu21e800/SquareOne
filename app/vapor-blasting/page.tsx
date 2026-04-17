import Link from "next/link"
import { Metadata } from "next"

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Vapor Blasting BC | Surface Restoration Without Damage | Square One Paving",
  description:
    "BC's mobile vapor blasting specialists. Remove paint, coatings, graffiti, and grime from concrete, brick, stone, and metal — no silica dust, no surface damage. Lower Mainland & Vancouver Island.",
  keywords: [
    "vapor blasting BC",
    "wet blasting Vancouver",
    "surface restoration BC",
    "graffiti removal Vancouver",
    "paint removal concrete BC",
    "vapor blasting service BC",
    "dustless blasting Lower Mainland",
    "historic building restoration BC",
  ],
  alternates: {
    canonical: "https://squareonepaving.com/vapor-blasting",
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const applications = [
  {
    icon: "◈",
    title: "Painted Concrete Removal",
    desc: "Strip decades of paint layers from concrete floors, walls, and hardscapes without scarring the substrate.",
  },
  {
    icon: "◎",
    title: "Graffiti Removal",
    desc: "Clean tags and aerosol paint from concrete, brick, stone, and metal — leaving a clean, uniform matte surface.",
  },
  {
    icon: "◉",
    title: "Rust & Scale from Metal",
    desc: "Remove corrosion, mill scale, and oxidation from steel, iron, and aluminium surfaces — prep-ready for coating.",
  },
  {
    icon: "◧",
    title: "Historic Building Restoration",
    desc: "The gentlest method for cleaning heritage brick, cut stone, and ornamental masonry without eroding fine detail.",
  },
  {
    icon: "⬡",
    title: "Pre-Paving Surface Prep",
    desc: "Strip old road markings, sealers, and contaminants before new thermoplastic or decorative coatings are applied.",
  },
  {
    icon: "◌",
    title: "Strata & Commercial Exteriors",
    desc: "Clean stained parking decks, building exteriors, and cladding for strata corporations and commercial property managers.",
  },
]

const steps = [
  {
    num: "01",
    title: "Surface Assessment",
    desc: "We inspect the substrate, coating type, contamination depth, and surrounding environment to select the correct media, pressure, and angle for the job.",
  },
  {
    num: "02",
    title: "Vapor Blast Treatment",
    desc: "Our mobile unit delivers a precise water-and-abrasive mixture to the surface — removing coatings cleanly without generating silica dust or damaging the substrate.",
  },
  {
    num: "03",
    title: "Surface Inspection & Cleanup",
    desc: "We inspect the treated area, clean the work zone, and confirm the surface is ready for its next step — whether that's a new coating, sealer, or bare finish.",
  },
]

// ─── Comparison data ──────────────────────────────────────────────────────────

type TableRow = {
  attribute: string
  pressure: string
  sand: string
  vapor: string
}

const comparisonRows: TableRow[] = [
  { attribute: "Surface damage risk",            pressure: "High",          sand: "Very High",      vapor: "Low"        },
  { attribute: "Dust / airborne debris",         pressure: "Minimal",       sand: "Severe",         vapor: "None"       },
  { attribute: "Water usage",                    pressure: "Very High",     sand: "None",           vapor: "Low"        },
  { attribute: "Suitable for delicate surfaces", pressure: "Rarely",        sand: "No",             vapor: "Yes"        },
  { attribute: "Finish quality",                 pressure: "Inconsistent",  sand: "Rough / Pitted", vapor: "Clean Matte"},
  { attribute: "Chemical runoff",                pressure: "Possible",      sand: "None",           vapor: "None"       },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VaporBlastingPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#1C2026] min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-[#C8601A]">
              Specialist Service · BC Exclusive
            </span>

            <h1 className="mt-6 mb-6 text-white font-light">
              The most thorough<br />
              surface preparation<br />
              in British Columbia.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
              Vapor blasting combines pressurised water and fine abrasive media to clean,
              restore, and prepare surfaces at the microscopic level. No heat stress.
              No media embedment. No shortcuts. We brought this technology to BC because
              the surfaces we install deserve better than sandblasting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="bg-white text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#F6F4F0] w-full sm:w-auto">
                  Request a Consultation →
                </button>
              </Link>
              <a href="tel:18773910270">
                <button className="border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:border-white hover:bg-white/10 w-full sm:w-auto">
                  1-877-391-0270
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Is Vapor Blasting ────────────────────────────────────────── */}
      <section className="w-full py-24 bg-white border-b border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            {/* Label + heading */}
            <div>
              <p className="text-[#D66620] text-[11px] uppercase tracking-[0.25em] font-bold mb-4">
                The Technology
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1C2226] leading-tight mb-0">
                What Is<br />Vapor Blasting?
              </h2>
              <div className="mt-6 h-[3px] w-12 bg-[#D66620] rounded" />
            </div>

            {/* Body copy */}
            <div className="space-y-5 text-[#626262] text-base leading-relaxed">
              <p>
                Vapor blasting — also called wet blasting or slurry blasting — combines water with
                fine abrasive media in a controlled pressurized stream. Unlike dry sandblasting,
                which accelerates dry grit at full velocity and generates dangerous airborne silica
                dust, vapor blasting wraps each abrasive particle in a water cushion. The result
                is far gentler impact energy: coatings and contaminants are lifted away without
                etching, pitting, or fracturing the substrate beneath. The finish is a uniform,
                clean matte — ready for whatever comes next.
              </p>
              <p>
                This makes vapor blasting ideal for surfaces where you need precision over
                aggression: historic brick and masonry, decorative concrete, architectural stone,
                painted metal, and any surface where substrate integrity is non-negotiable. It
                also produces no airborne silica hazard and minimal liquid waste — an important
                advantage for occupied sites, strata properties, and environmentally sensitive
                locations across BC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ─────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[#D66620] text-[11px] uppercase tracking-[0.25em] font-bold mb-4">
              Method Comparison
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1C2226] mb-3">
              Why Vapor Blasting Wins
            </h2>
            <p className="text-[#626262] text-base max-w-xl">
              Not all surface cleaning methods are equal. Here&apos;s how vapor blasting stacks up
              against the alternatives.
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#E8E4DE] shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1C2226] text-white">
                  <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider text-white/60 w-[30%]">
                    Attribute
                  </th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-white/60 text-center">
                    Pressure Washing
                  </th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-white/60 text-center">
                    Sandblasting
                  </th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-[#F0A04B] text-center">
                    Vapor Blasting
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.attribute}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAF9]"}
                  >
                    <td className="px-6 py-4 text-[#333333] font-semibold text-sm">
                      {row.attribute}
                    </td>
                    <td className="px-6 py-4 text-center text-[#888] text-sm">
                      {row.pressure}
                    </td>
                    <td className="px-6 py-4 text-center text-[#888] text-sm">
                      {row.sand}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1C8C50]">
                        <span className="text-[#1C8C50]">✓</span>
                        {row.vapor}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Applications Grid ─────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <p className="text-[#D66620] text-[11px] uppercase tracking-[0.25em] font-bold mb-4">
              Use Cases
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1C2226] mb-3">
              What We Can Restore
            </h2>
            <p className="text-[#626262] text-base max-w-xl">
              Vapor blasting works across a wide range of substrates and contamination types —
              residential, commercial, municipal, and heritage.
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applications.map((app) => (
              <div
                key={app.title}
                className="group bg-[#FAFAFA] rounded-xl p-7 border border-[#E8E4DE] hover:border-[#D66620]/40 hover:bg-white hover:shadow-lg transition-all duration-200"
              >
                <span className="text-2xl text-[#D66620] block mb-4">{app.icon}</span>
                <h3 className="text-base font-black text-[#1C2226] mb-2 group-hover:text-[#D66620] transition-colors">
                  {app.title}
                </h3>
                <p className="text-[#626262] text-sm leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-[#F2EFE9]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-[#D66620] text-[11px] uppercase tracking-[0.25em] font-bold mb-4">
              The Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1C2226]">Three Steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-8 border border-[#E8E4DE] relative overflow-hidden">
                {/* Large step number watermark */}
                <div
                  className="absolute top-4 right-5 font-black text-[#D66620]/08 leading-none select-none"
                  style={{ fontSize: "6rem" }}
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-[3px] bg-[#D66620] rounded mb-6" />
                  <h3 className="text-lg font-black text-[#1C2226] mb-3">{step.title}</h3>
                  <p className="text-[#626262] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-[#C8601A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white font-light mb-6">
            Ready to see what your surface could look like?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            We assess, quote, and schedule within the week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#F6F4F0] w-full sm:w-auto">
                Book a Free Assessment
              </button>
            </Link>
            <a href="tel:18773910270">
              <p className="text-white/60 text-sm mt-4">Or call: 1-877-391-0270</p>
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
