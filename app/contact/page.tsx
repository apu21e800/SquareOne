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

const trustPoints = [
  { icon: "◈", text: "BC Decorative Pavement Studio — Since 2000" },
  { icon: "◉", text: "Free site consultations — no obligation" },
  { icon: "◧", text: "Serving BC since 2000" },
  { icon: "◌", text: "Lower Mainland & Vancouver Island" },
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

  const fieldClass = "w-full px-4 py-3.5 rounded-lg text-sm outline-none border border-[#E8E4DE] bg-[#FAFAFA] text-[#333333] placeholder-[#999] focus:border-[#D66620] focus:ring-2 focus:ring-[#D66620]/15 transition-colors"

  return (
    <main className="min-h-screen bg-[#FAFAFA]">

      {/* Page header */}
      <section className="bg-white border-b border-[#E8E4DE] pt-28 pb-12 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            Get In Touch
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-[#333333]">
            Start a Project
          </h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14">

          {/* Left: Context + trust */}
          <div>
            <p className="text-[#626262] text-base leading-relaxed mb-10">
              Tell us about your project — crosswalk, bike lane, parking lot, decorative driveway,
              or surface prep. We&apos;ll recommend the right solution and provide a free, no-obligation quote.
            </p>

            {/* Trust points */}
            <div className="space-y-4 mb-10">
              {trustPoints.map((tp) => (
                <div key={tp.text} className="flex items-start gap-3">
                  <span className="text-[#D66620] text-base mt-0.5 flex-shrink-0">{tp.icon}</span>
                  <span className="text-sm text-[#626262]">{tp.text}</span>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="bg-white rounded-2xl border border-[#E8E4DE] p-7 mb-6">
              <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-4">Direct Contact</p>
              <div className="space-y-2.5">
                <a href="tel:18773910270" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#D66620]/10 flex items-center justify-center text-[#D66620] text-sm flex-shrink-0">
                    ◉
                  </div>
                  <div>
                    <span className="text-[#333333] font-semibold group-hover:text-[#D66620] transition-colors block">1-877-391-0270</span>
                    <span className="text-[#626262] text-xs">Toll Free</span>
                  </div>
                </a>
                <a href="tel:6046126209" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#D66620]/10 flex items-center justify-center text-[#D66620] text-sm flex-shrink-0">
                    ◉
                  </div>
                  <div>
                    <span className="text-[#333333] font-semibold group-hover:text-[#D66620] transition-colors block">604-612-6209</span>
                    <span className="text-[#626262] text-xs">Lower Mainland</span>
                  </div>
                </a>
                <a href="mailto:info@squareonepaving.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#D66620]/10 flex items-center justify-center text-[#D66620] text-sm flex-shrink-0">
                    ◈
                  </div>
                  <span className="text-[#626262] group-hover:text-[#D66620] transition-colors text-sm">info@squareonepaving.com</span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D66620]/10 flex items-center justify-center text-[#D66620] text-sm flex-shrink-0">
                    ◧
                  </div>
                  <div>
                    <span className="text-[#626262] text-sm block">505 – 20800 Lougheed Hwy</span>
                    <span className="text-[#626262] text-sm">Maple Ridge, BC V2X 3P2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BBB Accredited Business badge */}
            <div className="flex items-center gap-4 bg-white rounded-2xl border border-[#E8E4DE] p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Contact%20Page/BBB-Logo.png"
                alt="BBB Accredited Business"
                width={72}
                height={72}
                className="flex-shrink-0 object-contain"
              />
              <div>
                <p className="text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">BBB Accredited Business</p>
                <p className="text-xs text-[#626262] leading-relaxed">Committed to ethical business practices and customer satisfaction.</p>
              </div>
            </div>

          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-[#E8E4DE] p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[#D66620]/10">
                  <svg className="w-7 h-7 text-[#D66620]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-[#333333] mb-2">Message Sent!</h3>
                <p className="text-[#626262] text-sm max-w-xs">
                  We&apos;ll be in touch within one business day. We look forward to working on your project.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-[#333333] mb-7">Tell Us About Your Project</h2>
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
                      <label className="block text-xs font-semibold text-[#333333] uppercase tracking-wider mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#333333] uppercase tracking-wider mb-2">Company / Organization</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="City of Vancouver"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#333333] uppercase tracking-wider mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@city.ca"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#333333] uppercase tracking-wider mb-2">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="604-555-0100"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333333] uppercase tracking-wider mb-2">Project Type</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className={fieldClass}
                    >
                      <option value="">Select project type...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333333] uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project — location, timeline, requirements..."
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  {/* Honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#D66620] hover:bg-[#C05A18] text-white font-bold py-4 rounded-lg text-sm uppercase tracking-wider transition-colors disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Your Project Details"}
                  </button>

                  <p className="text-center text-xs text-[#999]">
                    Or call us directly: <a href="tel:18773910270" className="text-[#D66620] font-semibold">1-877-391-0270</a>
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
