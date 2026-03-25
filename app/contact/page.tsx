"use client"

import { useState } from "react"

const projectTypes = [
  "Stamped Asphalt / Crosswalks",
  "Decorative Coatings / Bike Lanes",
  "Preformed Thermoplastic / Markings",
  "Vapor Blasting / Surface Prep",
  "Multiple Services",
  "Not Sure — Need Consultation",
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

  return (
    <main className="min-h-screen bg-[#F5F3F0]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="pt-4">
            <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2D2D] mb-6">
              Start a Project
            </h1>
            <p className="text-[#8B8680] mb-12">
              Tell us about your project — crosswalk, bike lane, parking lot, or
              surface prep. We&apos;ll recommend the right solution and provide
              a free quote.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-2">
                  Office
                </p>
                <p className="text-sm font-medium text-[#2D2D2D] mb-2">
                  Ladysmith, British Columbia
                </p>
                <a
                  href="mailto:info@squareonepaving.ca"
                  className="text-sm text-[#8B8680] block mb-1 hover:text-[#E8581A] transition"
                >
                  info@squareonepaving.ca
                </a>
                <a
                  href="tel:6043098212"
                  className="text-sm text-[#8B8680] hover:text-[#E8581A] transition"
                >
                  604-309-8212
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#E8581A] uppercase tracking-widest mb-2">
                  Service Area
                </p>
                <p className="text-sm text-[#8B8680]">
                  Lower Mainland, Vancouver Island, and surrounding BC
                  communities.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-sm font-semibold text-[#2D2D2D] mb-2">
                  ✓ Authorized HUB Surface Systems Applicator
                </p>
                <p className="text-xs text-[#8B8680]">
                  Certified installation partner — Western Canada
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-xl p-10 shadow-md">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-[#E8581A]/10">
                  <svg
                    className="w-7 h-7 text-[#E8581A]"
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
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#8B8680]">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#8B8680] mb-2">
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
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#E8581A]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#8B8680] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="City of Vancouver"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#E8581A]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#8B8680] mb-2">
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
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#E8581A]/30"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8B8680] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="604-555-0100"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#E8581A]/30"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8B8680] mb-2">
                    Project Type
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) =>
                      setForm({ ...form, projectType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] focus:ring-2 focus:ring-[#E8581A]/30"
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
                  <label className="block text-sm text-[#8B8680] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your project — location, timeline, requirements..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-[#8B8680]/20 bg-[#F5F3F0] text-[#2D2D2D] resize-none focus:ring-2 focus:ring-[#E8581A]/30"
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
                  className="w-full bg-[#E8581A] hover:bg-[#d44f16] text-white font-semibold py-4 rounded-lg text-sm transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Your Project Details"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
