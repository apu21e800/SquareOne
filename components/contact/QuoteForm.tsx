"use client"

import { useEffect, useState } from "react"

/* The quote form — the one thing /contact exists for. Split out of the page
   on 19 Sept 2026 so the page itself can be a server component and read the
   record (lib/work.ts) for its "where we work" lists.

   The state shape, field names, honeypot and the POST to /api/contact are
   unchanged since 11 Sept; the composer prefill (?pattern=&colour=&city=)
   is unchanged since 15 Sept. Only the frame around the fields changed. */

const projectTypes = [
  "Residential Driveway",
  "Patio or Walkway",
  "Parking Area / Commercial",
  "Municipal — Crosswalk or Bike Lane",
  "Municipal — Road or Plaza",
  "Vapour Blasting / Surface Prep",
  "Multiple Services",
  "Other / Not Sure",
]

const field =
  "block h-[52px] w-full rounded-[2px] border border-hairline bg-white px-4 text-[16px] leading-[1.55] text-ink transition-colors placeholder:text-[#9AA0A7] hover:border-[color:var(--hairline-strong)] focus:border-ink focus:outline-none"

const label = "mb-[10px] block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink"

function Required() {
  return (
    <span aria-hidden="true" className="font-normal text-ink-muted">
      {" "}
      *
    </span>
  )
}

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", projectType: "", location: "", message: "",
  })

  // Arriving from the driveway composer (?pattern=&colour=&city=): the
  // enquiry opens with the choice already written down. Nothing else is
  // read from the URL, and nothing is sent until the visitor sends it.
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search)
      const pattern = q.get("pattern")
      const colour = q.get("colour")
      const city = q.get("city")
      if (!pattern && !colour) return
      const line = `Driveway — ${[pattern, colour ? `in ${colour}` : ""].filter(Boolean).join(" ")}${city ? `, ${city}` : ""}. `
      setForm((f) => ({
        ...f,
        projectType: f.projectType || "Residential Driveway",
        location: f.location || (city ?? ""),
        message: f.message || line,
      }))
    } catch {
      /* no URL access — the form simply opens blank */
    }
  }, [])

  if (submitted) {
    return (
      <div className="rounded-[2px] border border-hairline bg-white p-10 shadow-[var(--shadow-rest)] max-[700px]:p-6">
        <div className="label">Received</div>
        <h2 className="card-title mt-4">Thank you &mdash; we have your request.</h2>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-ink-body">
          We will be in touch to arrange the site visit. If it is urgent, call{" "}
          <a href="tel:+16046126209" className="font-medium text-ink">604-612-6209</a> (Lower Mainland),{" "}
          <a href="tel:+12503910270" className="font-medium text-ink">250-391-0270</a> (Vancouver Island) or{" "}
          <a href="tel:+18773910270" className="font-medium text-ink">1-877-391-0270</a> (toll-free).
        </p>
      </div>
    )
  }

  return (
    <form
      id="quote"
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
      className="rounded-[2px] border border-hairline bg-white p-10 shadow-[var(--shadow-rest)] max-[700px]:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-hairline pb-7">
        <h2 className="card-title">Request a quote</h2>
        <p className="text-[14px] leading-[1.5] text-ink-muted">Two minutes. Photos and drawings can follow by email.</p>
      </div>

      <fieldset className="mt-8 min-w-0 border-0 p-0">
        <legend className="label">You</legend>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 max-[560px]:grid-cols-1">
          <div>
            <label htmlFor="q-name" className={label}>
              Name
              <Required />
            </label>
            <input
              id="q-name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jordan Bell"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="q-org" className={label}>Organization</label>
            <input
              id="q-org"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Municipality, developer, strata or contractor"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="q-email" className={label}>
              Email
              <Required />
            </label>
            <input
              id="q-email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jordan.bell@example.com"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="q-phone" className={label}>Phone</label>
            <input
              id="q-phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="604 555 0142"
              className={field}
            />
          </div>
        </div>
      </fieldset>

      <div aria-hidden="true" className="mt-10 border-t border-hairline" />
      <fieldset className="mt-8 min-w-0 border-0 p-0">
        <legend className="label">The project</legend>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 max-[560px]:grid-cols-1">
          <div>
            <label htmlFor="q-type" className={label}>Project type</label>
            <select
              id="q-type"
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              className={`${field} cursor-pointer`}
            >
              <option value="">Select a project type</option>
              {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="q-location" className={label}>Location</label>
            <input
              id="q-location"
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Address or postal code, or the site name"
              className={field}
            />
          </div>
          <div className="col-span-2 max-[560px]:col-span-1">
            <label htmlFor="q-scope" className={label}>Scope</label>
            <textarea
              id="q-scope"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Two decorative crosswalks and a plaza recoat, roughly 400 m². When you need it done, and any drawings, help too."
              className={`${field} h-auto min-h-[150px] resize-y py-[14px]`}
            />
          </div>
        </div>
      </fieldset>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-[2px] border border-[#E4C8C1] bg-white px-4 py-3 text-[14px] leading-[1.55] text-[#B04432]"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-hairline pt-8">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full cursor-pointer text-center disabled:cursor-not-allowed disabled:opacity-60 min-[701px]:w-auto"
        >
          {loading ? "Sending…" : "Send the request"}
        </button>
        <span className="text-[14px] leading-[1.5] text-ink-muted">
          Or call{" "}
          <a href="tel:+16046126209" className="font-medium text-ink-body">604-612-6209</a>
          {" "}(Lower Mainland) or{" "}
          <a href="tel:+12503910270" className="font-medium text-ink-body">250-391-0270</a>
          {" "}(Vancouver Island).
        </span>
      </div>
    </form>
  )
}
