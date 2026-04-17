import { Metadata } from "next"
import { Layers, Shield, Leaf, Truck, Anchor, CheckCircle2 } from "lucide-react"

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Vapor Blasting | BC's Most Advanced Surface Preparation",
  description:
    "Square One Paving brings vapor blasting to BC — zero silica dust, no media embedment, perfect surface preparation for decorative coatings and hardscape. Lower Mainland and Vancouver Island.",
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type AppEntry = {
  iconKey: "layers" | "shield" | "leaf" | "truck" | "anchor" | "check"
  title: string
  desc: string
}

const applications: AppEntry[] = [
  { iconKey: "layers", title: "Concrete & Asphalt Surfaces", desc: "Parking structures, paths, and hardscape preparation" },
  { iconKey: "shield", title: "Strata & Commercial Properties", desc: "Common area restoration without disruption" },
  { iconKey: "leaf", title: "Heritage & Natural Stone", desc: "Gentle enough for sandstone, granite, and brick" },
  { iconKey: "truck", title: "Automotive & Powersports", desc: "Engine bays, frames, and chassis restoration" },
  { iconKey: "anchor", title: "Marine & Industrial Equipment", desc: "Hull prep, deck restoration, machinery cleaning" },
  { iconKey: "check", title: "Pre-Coating Preparation", desc: "Optimal surface profile for StreetBond and protective systems" },
]

const comparisonRows = [
  { pro: "Zero media embedment", con: "Media particles trapped in surface" },
  { pro: "Feathered, even texture", con: "Aggressive, uneven profile" },
  { pro: "Minimal dust generation", con: "High dust, respiratory hazard" },
  { pro: "Works on delicate surfaces", con: "Can damage fine materials" },
  { pro: "Ideal for coating adhesion", con: "Requires additional prep steps" },
]

const credentials = [
  { stat: "25 Years", label: "Surface preparation expertise" },
  { stat: "HUB Certified", label: "Authorized to apply the coatings that follow" },
  { stat: "Two Regions", label: "Lower Mainland and Vancouver Island coverage" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VaporBlastingPage() {
  return (
    <main>

      {/* ── SECTION 1 — Hero (dark) ──────────────────────────────────────── */}
      <section className="bg-[#1C2026] flex flex-col md:flex-row" style={{ minHeight: "80vh" }}>
        {/* Left: dark content */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 md:px-14 lg:px-20 md:w-[55%]">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
            Specialist Service · BC Exclusive
          </span>
          <h1 className="mt-4 font-light tracking-tight text-white">
            The most thorough<br />
            surface preparation<br />
            in British Columbia.
          </h1>
          <hr className="w-12 border-t border-[#C8601A] my-8" />
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Vapor blasting combines pressurised water and fine abrasive media to clean, restore, and prepare surfaces at the microscopic level. No heat stress. No media embedment. No shortcuts. We brought this technology to BC because the surfaces we install deserve better than sandblasting.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <a
              href="#what-is"
              className="bg-white text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:bg-[#C8601A] hover:text-white inline-block"
            >
              What Is Vapor Blasting?
            </a>
            <a
              href="/contact"
              className="border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:border-white hover:bg-white/10 inline-block"
            >
              Request a Consultation →
            </a>
          </div>
        </div>

        {/* Right: dark visual placeholder */}
        <div className="flex-1 min-h-[320px] md:min-h-0 bg-[#0D1117] relative overflow-hidden">
          {/* Atmospheric bg */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(40,100,130,0.35) 0%, transparent 70%)",
            }}
          />
          {/* Before/after split */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 relative flex items-end p-6">
              <div className="absolute inset-0" style={{ background: "rgba(50,40,30,0.6)" }} />
              <span className="relative text-white/30 text-[10px] font-bold uppercase tracking-widest">
                Before
              </span>
            </div>
            <div className="w-[2px] bg-[#C8601A]/60" />
            <div className="flex-1 relative flex items-end justify-end p-6">
              <div className="absolute inset-0" style={{ background: "rgba(90,80,65,0.3)" }} />
              <span className="relative text-[#C8601A] text-[10px] font-bold uppercase tracking-widest">
                After
              </span>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute top-6 left-6 border border-white/15 text-white/70 text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5">
            BC Exclusive Service
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — What Is Vapor Blasting ───────────────────────────── */}
      <section id="what-is" className="w-full py-24 md:py-32 bg-white border-t border-[#E2DDD8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
              The Process
            </span>
            <h2 className="mt-3 text-[#111111]">Precision cleaning at the molecular level.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: explanation */}
            <div>
              <p className="text-[#2C2C2C] text-lg leading-relaxed font-light mb-6">
                Traditional sandblasting forces dry abrasive into a surface under high pressure. It&apos;s fast and aggressive — and it shows. The result is a roughened, dusty surface that traps media particles and requires extensive cleanup before any coating can be applied properly.
              </p>
              <p className="text-[#2C2C2C] text-lg leading-relaxed font-light">
                Vapor blasting is different. The abrasive media is suspended in water before it contacts the surface. The water cushions the impact, preventing the micro-fractures and embedment that define conventional blasting. What remains is a perfectly clean surface with an even, open texture — optimally prepared for adhesion.
              </p>
            </div>

            {/* Right: comparison */}
            <div className="border border-[#E2DDD8]">
              <div className="p-5 bg-[#F6F4F0] border-b border-[#E2DDD8]">
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5A5A5A]">
                  Vapor Blasting vs. Dry Sandblasting
                </span>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 border-b border-[#E2DDD8] last:border-b-0"
                >
                  <div className="p-4 flex items-start gap-2 border-r border-[#E2DDD8]">
                    <span className="text-[#C8601A] text-sm mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-[#2C2C2C] leading-snug">{row.pro}</span>
                  </div>
                  <div className="p-4 flex items-start gap-2">
                    <span className="text-[#8C8C8C] text-sm mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-sm text-[#8C8C8C] leading-snug">{row.con}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Applications ─────────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-[#F6F4F0] border-t border-[#E2DDD8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
              What We Restore
            </span>
            <h2 className="mt-3 text-[#111111]">From concrete parkades to vintage motorcycles.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2DDD8]">
            {applications.map((app) => (
              <div key={app.title} className="bg-white p-8">
                <div className="w-10 h-10 border border-[#C8601A]/30 flex items-center justify-center mb-4">
                  {app.iconKey === "layers" && <Layers size={20} className="text-[#C8601A]" />}
                  {app.iconKey === "shield" && <Shield size={20} className="text-[#C8601A]" />}
                  {app.iconKey === "leaf" && <Leaf size={20} className="text-[#C8601A]" />}
                  {app.iconKey === "truck" && <Truck size={20} className="text-[#C8601A]" />}
                  {app.iconKey === "anchor" && <Anchor size={20} className="text-[#C8601A]" />}
                  {app.iconKey === "check" && <CheckCircle2 size={20} className="text-[#C8601A]" />}
                </div>
                <h3 className="text-[#111111] mb-2">{app.title}</h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — Why S1 For Vapor Blasting (dark) ─────────────────── */}
      <section className="w-full py-24 bg-[#1C2026] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
              Why Square One
            </span>
            <h2 className="mt-3 text-white font-light">We&apos;re installers first.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                Most vapor blasting operators are cleaning contractors. We are decorative pavement
                installers who use vapor blasting as the foundation of every premium job.
                That means we understand what a properly prepared surface needs to look like —
                because we&apos;re the ones applying the coating afterward.
              </p>
            </div>

            {/* 3 credential points */}
            <div className="grid gap-px bg-white/10">
              {credentials.map((c) => (
                <div key={c.stat} className="bg-[#1C2026] px-8 py-6 flex items-center gap-6">
                  <div className="w-1 self-stretch bg-[#C8601A] flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-lg">{c.stat}</div>
                    <div className="text-white/50 text-sm mt-1">{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — CTA (orange) ─────────────────────────────────────── */}
      <section className="w-full py-20 bg-[#C8601A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-white font-light">Ready to see what your surface could look like?</h2>
          <p className="mt-4 text-white/80 text-lg">We assess, quote, and schedule within the week.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-[#1C2026] px-10 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors hover:bg-[#1C2026] hover:text-white inline-block"
            >
              Book a Free Assessment
            </a>
          </div>
          <p className="mt-6 text-white/60 text-sm">
            Or call:{" "}
            <a href="tel:18773910270" className="text-white/80 hover:text-white">
              1-877-391-0270
            </a>
          </p>
        </div>
      </section>

    </main>
  )
}
