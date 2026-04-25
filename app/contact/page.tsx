"use client"

import { useState } from "react"
import Link from "next/link"

const projectTypes = [
  "Paving — Residential Driveway",
  "Paving — Patio or Walkway",
  "Paving — Parking Area / Commercial",
  "Paving — Municipal / Crosswalk / Bike Lane",
  "Vapor Blasting",
  "Multiple Services",
  "Other / Not Sure",
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })

  const fieldClass = "w-full px-4 py-3.5 text-sm outline-none border border-[#E2DDD8] bg-[#FAFAFA] text-[#333333] placeholder-[#AAA] focus:border-[#C8601A] focus:ring-2 focus:ring-[#C8601A]/12 transition-colors"

  return (
    <main className="min-h-screen" style={{ background: "#F6F4F0" }}>

      {/* Page header */}
      <section className="relative bg-white border-b border-[#E2DDD8] pt-28 pb-16 px-6 sm:px-8">
        <div
          className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(to right, #C8601A, #E8895A)" }}
        />
        <div className="max-w-[1300px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#C8601A" }} />
            <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>
              Get In Touch
            </p>
          </div>
          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "#111111",
            }}
          >
            Start a Project
          </h1>
          <p className="text-[17px] mt-5 max-w-xl leading-relaxed" style={{ color: "#5A5A5A" }}>
            Crosswalk, bike lane, driveway, or surface prep — tell us about your BC project
            and we&apos;ll provide a free, no-obligation quote.
          </p>
        </div>
      </section>

      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-14">

          {/* Left: Trust + contact */}
          <div>
            {/* Trust points */}
            <div className="space-y-5 mb-10">
              {[
                { label: "BC Decorative Pavement Studio", sub: "Since 2000 — 25 years serving BC" },
                { label: "Free Site Consultations", sub: "No obligation — we come to you" },
                { label: "Lower Mainland & Vancouver Island", sub: "From Vancouver to Victoria and beyond" },
                { label: "All Installs Done In-House", sub: "No subcontracting — our crew, our standards" },
              ].map((tp) => (
                <div key={tp.label} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-[#C8601A] flex-shrink-0 mt-[7px]" />
                  <div>
                    <p className="text-[14px] font-bold text-[#111111] tracking-[-0.01em]">{tp.label}</p>
                    <p className="text-[13px] text-[#5A5A5A] mt-0.5">{tp.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="bg-white border border-[#E2DDD8] p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "#C8601A" }} />
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#C8601A" }}>
                  Direct Contact
                </p>
              </div>
              <div className="space-y-5">
                <a href="tel:18773910270" className="flex items-start gap-4 group">
                  <div className="w-8 h-8 border border-[#C8601A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8601A" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#111111] group-hover:text-[#C8601A] transition-colors">1-877-391-0270</p>
                    <p className="text-[12px] text-[#8C8C8C] uppercase tracking-[0.1em] font-semibold">Toll Free</p>
                  </div>
                </a>

                <a href="tel:6046126209" className="flex items-start gap-4 group">
                  <div className="w-8 h-8 border border-[#C8601A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8601A" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#111111] group-hover:text-[#C8601A] transition-colors">604-612-6209</p>
                    <p className="text-[12px] text-[#8C8C8C] uppercase tracking-[0.1em] font-semibold">Lower Mainland</p>
                  </div>
                </a>

                <a href="mailto:info@squareonepaving.com" className="flex items-start gap-4 group">
                  <div className="w-8 h-8 border border-[#C8601A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8601A" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#5A5A5A] group-hover:text-[#C8601A] transition-colors">info@squareonepaving.com</p>
                    <p className="text-[12px] text-[#8C8C8C] uppercase tracking-[0.1em] font-semibold">Email</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-[#E2DDD8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#5A5A5A]">505 – 20800 Lougheed Hwy</p>
                    <p className="text-[13px] text-[#5A5A5A]">Maple Ridge, BC V2X 3P2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-[#E2DDD8] p-8 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-24 text-center">
                <div
                  className="w-14 h-14 flex items-center justify-center mb-8 border border-[#C8601A]/30"
                  style={{ background: "rgba(200,96,26,0.08)" }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="#C8601A" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#111111" }}
                  className="mb-3"
                >
                  Message Sent
                </h3>
                <p className="text-[#5A5A5A] text-[15px] max-w-xs leading-relaxed">
                  We&apos;ll be in touch within one business day. Looking forward to your project.
                </p>
              </div>
            ) : (
              <>
                <h2
                  style={{ fontSize: "clamp(1.4rem, 2vw, 1.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#111111", lineHeight: 1 }}
                  className="mb-8"
                >
                  Tell Us About
                  <br />
                  Your Project
                </h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setLoading(true)
                    setError("")
                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...form, formType: "contact", website: "" }),
                      })
                      const data = await res.json()
                      if (!res.ok || data.error) {
                        setError(data.error ?? "Something went wrong. Please try again.")
                      } else {
                        setSubmitted(true)
                      }
                    } catch {
                      setError("Network error. Please check your connection and try again.")
                    } finally {
                      setLoading(false)
                    }
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#111111] uppercase tracking-[0.16em] mb-2">Full Name *</label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith" className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#111111] uppercase tracking-[0.16em] mb-2">Company / Org</label>
                      <input type="text" value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="City of Vancouver" className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#111111] uppercase tracking-[0.16em] mb-2">Email *</label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@city.ca" className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#111111] uppercase tracking-[0.16em] mb-2">Phone</label>
                      <input type="tel" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="604-555-0100" className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#111111] uppercase tracking-[0.16em] mb-2">Project Type</label>
                    <select value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className={fieldClass}
                    >
                      <option value="">Select project type…</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#111111] uppercase tracking-[0.16em] mb-2">Message</label>
                    <textarea rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project — location, timeline, requirements…"
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit" disabled={loading}
                    className="w-full text-white font-bold py-4 text-sm uppercase tracking-[0.12em] transition-all hover:brightness-110 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)", boxShadow: "0 4px 20px rgba(200,96,26,0.25)" }}
                  >
                    {loading ? "Sending…" : "Send Your Project Details"}
                  </button>

                  <p className="text-center text-xs text-[#8C8C8C]">
                    Or call us: <a href="tel:18773910270" className="font-bold" style={{ color: "#C8601A" }}>1-877-391-0270</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
