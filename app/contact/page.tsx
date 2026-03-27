"use client"

import Image from "next/image"
import { useState } from "react"

const projectTypes = [
  "Stamped Asphalt / Crosswalks",
  "Decorative Coatings / Bike Lanes",
  "Preformed Thermoplastic / Markings",
  "Vapor Blasting / Surface Prep",
  "Multiple Services",
  "Not Sure — Need Consultation",
]

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  contactMethod: string
  projectType: string
  message: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    contactMethod: "Either",
    projectType: "",
    message: "",
  })

  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-4">Get In Touch</p>
          <h1 className="text-5xl sm:text-6xl font-black text-[#333333] mb-4">Let&apos;s Talk About<br />Your Project</h1>
          <p className="text-[#626262] text-lg">Whether it&apos;s a crosswalk in Burnaby or a parking lot in Victoria — we&apos;ve done it. Tell us about your project and we&apos;ll get back to you within one business day.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left sidebar */}
          <div className="pt-4">
            {/* Office section */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-3">
                Office
              </p>
              <p className="text-sm font-medium text-[#333333] mb-3">
                Ladysmith, British Columbia
              </p>
              <a
                href="mailto:info@squareonepaving.ca"
                className="text-sm text-[#626262] block mb-4 hover:text-[#D66620] transition"
              >
                info@squareonepaving.ca
              </a>
              <a
                href="tel:6043098212"
                className="block text-4xl font-black text-[#333333] hover:text-[#D66620] transition-colors mb-2"
              >
                604-309-8212
              </a>
              <p className="text-[#626262] text-sm mb-10">Mon–Fri, 8am–5pm Pacific</p>
            </div>

            {/* Service area */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-[#D66620] uppercase tracking-widest mb-2">
                Service Area
              </p>
              <p className="text-sm text-[#626262]">
                Lower Mainland, Vancouver Island, and surrounding BC communities.
              </p>
            </div>

            {/* Trust signals */}
            <div className="mb-2">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E4DE] mb-3">
                <p className="text-sm font-semibold text-[#333333] mb-1">
                  ✓ 25+ Years of BC Installations
                </p>
                <p className="text-xs text-[#626262]">
                  Serving municipalities and developers since 2000
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E4DE] mb-3">
                <p className="text-sm font-semibold text-[#333333] mb-1">
                  ✓ Authorized HUB Surface Systems Applicator
                </p>
                <p className="text-xs text-[#626262]">
                  Western Canada&apos;s certified installation partner
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8E4DE] mb-3">
                <p className="text-sm font-semibold text-[#333333] mb-1">
                  ✓ Free Quotes, No Obligation
                </p>
                <p className="text-xs text-[#626262]">
                  We assess, recommend, and quote at no cost
                </p>
              </div>
            </div>

            {/* Crew image */}
            <Image
              src="/images/hero/hero-1.jpg"
              alt="Square One Paving crew"
              width={480}
              height={280}
              className="rounded-xl object-cover w-full mt-6"
            />
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-xl p-10 shadow-md">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-[#D66620]/10">
                  <svg
                    className="w-7 h-7 text-[#D66620]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#626262]">
                  We&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setLoading(true)
                  setError("")
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...form,
                        formType: "contact",
                        website: "",
                      }),
                    })
                    const data = await res.json()
                    if (!res.ok || data.error) {
                      setError(
                        data.error ?? "Something went wrong. Please try again."
                      )
                    } else {
                      setSubmitted(true)
                    }
                  } catch {
                    setError(
                      "Network error. Please check your connection and try again."
                    )
                  } finally {
                    setLoading(false)
                  }
                }}
                className="space-y-5"
              >
                <h2 className="text-2xl font-bold text-[#333333] mb-6">Send Your Project Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#626262] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#D66620]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#626262] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="City of Vancouver"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#D66620]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#626262] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="jane@city.ca"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#D66620]/30"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#626262] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="604-555-0100"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#D66620]/30"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#626262] mb-3">Preferred Contact Method</label>
                  <div className="flex gap-4">
                    {["Phone", "Email", "Either"].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={form.contactMethod === method}
                          onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
                          className="accent-[#D66620]"
                        />
                        <span className="text-sm text-[#333333]">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#626262] mb-2">
                    Project Type
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) =>
                      setForm({ ...form, projectType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#D66620]/30"
                  >
                    <option value="">Select project type...</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#626262] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your project — location, timeline, requirements..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] resize-none focus:ring-2 focus:ring-[#D66620]/30"
                  />
                </div>

                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D66620] hover:bg-[#C05A18] text-white font-semibold py-4 rounded-lg text-sm transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send My Request →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
