"use client"

import { useState } from "react"

const projectTypes = [
  "Residential Driveway",
  "Patio or Walkway",
  "Parking Area / Commercial",
  "Municipal — Crosswalk or Bike Lane",
  "Municipal — Road or Plaza",
  "Vapor Blasting / Surface Prep",
  "Multiple Services",
  "Other / Not Sure",
]

// Underline-style field — luxury brand form treatment
const field = "w-full pb-3 border-b border-[#E2DDD8] bg-transparent text-[14px] text-[#111111] placeholder-[#C0BAB3] focus:border-[#C8601A] focus:outline-none transition-colors duration-200"
const label = "block text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.18em] mb-2"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", projectType: "", message: "",
  })

  return (
    <main className="min-h-screen bg-white">

      {/* ── Page hero ── */}
      <section className="bg-[#F6F4F0] border-b border-[#E2DDD8]" style={{ paddingTop: "calc(68px + 4rem)", paddingBottom: "4rem" }}>
        <div className="max-w-[1300px] mx-auto px-6 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#C8601A]" />
            Get In Touch
          </p>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#111111",
            }}
          >
            Let&apos;s{" "}
            <em style={{ fontStyle: "italic", color: "#C8601A" }}>Talk.</em>
          </h1>
          <p className="text-[16px] mt-5 max-w-lg leading-relaxed text-[#5A5A5A]">
            Free site visit. Written quote in 48 hours. We serve Metro Vancouver
            and Vancouver Island.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">

          {/* ── Left: contact details ── */}
          <div>
            <h2
              className="text-[#111111] mb-8"
              style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              Contact Jan directly
            </h2>

            <div className="space-y-8">
              {/* Metro Vancouver */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#C8601A] mb-2">Metro Vancouver</p>
                <p className="text-[14px] text-[#2C2C2C] leading-relaxed">
                  505 &#8211; 20800 Lougheed Hwy<br />
                  Maple Ridge, BC V2X 3P2
                </p>
              </div>

              {/* Vancouver Island */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#C8601A] mb-2">Vancouver Island</p>
                <p className="text-[14px] text-[#2C2C2C]">Victoria, BC</p>
              </div>

              {/* Direct contact */}
              <div className="space-y-3 pt-2 border-t border-[#E2DDD8]">
                <a
                  href="mailto:jan@squareonepaving.com"
                  className="flex items-center gap-3 text-[14px] text-[#C8601A] hover:text-[#A84F15] font-medium transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  jan@squareonepaving.com
                </a>
                <a
                  href="tel:+16044669902"
                  className="flex items-center gap-3 text-[14px] text-[#2C2C2C] hover:text-[#C8601A] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  604 466 9902
                  <span className="text-[11px] text-[#8C8C8C] uppercase tracking-[0.1em] font-semibold">Office</span>
                </a>
                <a
                  href="tel:+12502162190"
                  className="flex items-center gap-3 text-[14px] text-[#2C2C2C] hover:text-[#C8601A] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                  250 216 2190
                  <span className="text-[11px] text-[#8C8C8C] uppercase tracking-[0.1em] font-semibold">Mobile</span>
                </a>
              </div>

              {/* Response promise */}
              <div className="border-t border-[#E2DDD8] pt-6">
                <div className="space-y-2">
                  {[
                    "Free site consultations — we come to you",
                    "Written quote within 48 hours",
                    "No subcontracting — our crew, our standards",
                    "Mon – Fri, 8am – 5pm PT",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-[6px] flex-shrink-0 w-3.5 h-px bg-[#C8601A] block" />
                      <p className="text-[13px] text-[#5A5A5A]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BBB Accredited Business badge */}
              <div className="border-t border-[#E2DDD8] pt-6">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Contact%20Page/BBB-Logo.png"
                    alt="BBB Accredited Business"
                    width={60}
                    height={60}
                    className="flex-shrink-0 object-contain"
                  />
                  <div>
                    <p className="text-[11px] font-bold text-[#2C2C2C] uppercase tracking-wider mb-0.5">BBB Accredited Business</p>
                    <p className="text-[12px] text-[#5A5A5A] leading-relaxed">Committed to ethical business practices and customer satisfaction.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start py-16">
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ background: "rgba(200,96,26,0.08)" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#C8601A" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#111111" }} className="mb-3">
                  Message Sent
                </h3>
                <p className="text-[15px] text-[#5A5A5A] leading-relaxed max-w-sm">
                  Jan will be in touch within one business day. We look forward to your project.
                </p>
              </div>
            ) : (
              <>
                <h2
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#111111", lineHeight: 1.1 }}
                  className="mb-10"
                >
                  Tell us about your project
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
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <label className={label}>Full Name *</label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith" className={field}
                      />
                    </div>
                    <div>
                      <label className={label}>Company / Org</label>
                      <input type="text" value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="City of Richmond" className={field}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <label className={label}>Email *</label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@city.ca" className={field}
                      />
                    </div>
                    <div>
                      <label className={label}>Phone</label>
                      <input type="tel" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="604 555 0100" className={field}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={label}>Project Type</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className={`${field} cursor-pointer`}
                    >
                      <option value="">Select project type…</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={label}>Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Location, scope, timeline, any specifics…"
                      className={`${field} resize-none`}
                    />
                  </div>

                  {/* Honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center gap-2 bg-[#C8601A] hover:bg-[#A84F15] text-white px-8 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-colors disabled:opacity-60"
                      style={{ boxShadow: "0 4px 24px rgba(200,96,26,0.25)" }}
                    >
                      {loading ? "Sending…" : "Send Project Details"}
                      {!loading && (
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <p className="text-[12px] text-[#8C8C8C]">
                    Prefer to call?{" "}
                    <a href="tel:+16044669902" className="font-semibold text-[#C8601A] hover:text-[#A84F15] transition-colors">
                      604 466 9902
                    </a>
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
