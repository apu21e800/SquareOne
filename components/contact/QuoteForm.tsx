"use client"

import { useEffect, useRef, useState } from "react"

/* The quote form — the one thing /contact exists for. Split out of the page
   on 19 Sept 2026 so the page itself can be a server component and read the
   record (lib/work.ts) for its "where we work" lists.

   The payload is unchanged since 11 Sept — same field names, same endpoint,
   same honeypot — so the office's inbox looks exactly as it did. What
   changed on 21 Sept 2026 (Vern: "make sure the email forms are working
   correctly and smoothly, including the confirmation experience"):

   · the confirmation is scrolled to and announced. It used to replace the
     form in place; the card is a third of the form's height, so on a phone
     the page collapsed under the visitor and left them looking at the
     section below, with no idea the request had gone anywhere.
   · a failed send no longer ends the conversation. The office's three lines
     are there, and a mailto that carries everything they typed — so a Resend
     outage costs the client nothing.
   · values are trimmed, the submit cannot fire twice, and the honeypot is
     positioned off-screen rather than display:none (some bots skip hidden
     fields, and filling it is what marks them). */

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

/** The three lines, in the order the rest of the site names them. */
const LINES = [
  { label: "Lower Mainland", display: "604-612-6209", href: "tel:+16046126209" },
  { label: "Vancouver Island", display: "250-391-0270", href: "tel:+12503910270" },
  { label: "Toll-free", display: "1-877-391-0270", href: "tel:+18773910270" },
]

type Form = {
  name: string
  company: string
  email: string
  phone: string
  projectType: string
  location: string
  message: string
}

const EMPTY: Form = { name: "", company: "", email: "", phone: "", projectType: "", location: "", message: "" }

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Form>(EMPTY)
  const doneRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const sending = useRef(false)

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

  // The confirmation is shorter than the form it replaces, so without this
  // the phone keeps its scroll position and the visitor never sees it.
  useEffect(() => {
    if (!submitted) return
    const el = doneRef.current
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "center" })
    el.focus({ preventScroll: true })
  }, [submitted])

  // A failed send is read out and scrolled to as well — it carries the
  // fallback, and an unseen error is a lost job.
  useEffect(() => {
    if (!error) return
    errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [error])

  /** Everything they typed, carried into their own mail client. */
  const mailtoFallback = () => {
    const lines = [
      form.name && `Name: ${form.name}`,
      form.company && `Organization: ${form.company}`,
      form.phone && `Phone: ${form.phone}`,
      form.projectType && `Project type: ${form.projectType}`,
      form.location && `Location: ${form.location}`,
      form.message && `\n${form.message}`,
    ].filter(Boolean).join("\n")
    const subject = `Quote request${form.name ? ` — ${form.name}` : ""}`
    return `mailto:office@squareonepaving.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`
  }

  if (submitted) {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-[2px] border border-hairline bg-white p-10 shadow-[var(--shadow-rest)] outline-none max-[700px]:p-6"
      >
        <div className="label text-[color:var(--accent-deep)]">Request received</div>
        <h2 className="card-title mt-4">Thank you &mdash; it&rsquo;s with the office.</h2>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-ink-body">
          Someone from the office will be in touch to arrange the site visit &mdash; free,
          with the colour and pattern samples, across the Lower Mainland and Vancouver Island.
          The written quote follows the visit.
        </p>

        <div className="mt-7 border-t border-hairline pt-6">
          <div className="label">If it&rsquo;s urgent, call</div>
          <ul className="mt-3 flex flex-col gap-2">
            {LINES.map((l) => (
              <li key={l.href} className="flex flex-wrap items-baseline gap-x-3">
                <a
                  href={l.href}
                  className="font-[family-name:var(--font-display)] text-[1.1875rem] font-bold tracking-[-0.01em] tabular-nums text-ink transition-colors hover:text-[color:var(--accent-deep)]"
                >
                  {l.display}
                </a>
                <span className="text-[14px] text-ink-muted">{l.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-[1.6] text-ink-muted">
            Photographs and drawings help &mdash; send them to{" "}
            <a href="mailto:office@squareonepaving.com" className="font-medium text-ink-body underline-offset-4 hover:underline">
              office@squareonepaving.com
            </a>{" "}
            with the site address in the subject line.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      id="quote"
      noValidate={false}
      onSubmit={async (e) => {
        e.preventDefault()
        if (sending.current) return
        sending.current = true
        setLoading(true)
        setError("")
        const payload = {
          formType: "contact" as const,
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          projectType: form.projectType,
          location: form.location.trim(),
          message: form.message.trim(),
          website: "",
        }
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
          const data = await res.json().catch(() => ({}))
          if (!res.ok || data.error) {
            setError(data.error ?? "We couldn't send that just now.")
          } else {
            setSubmitted(true)
          }
        } catch {
          setError("We couldn't reach the server — check your connection and try again.")
        } finally {
          sending.current = false
          setLoading(false)
        }
      }}
      className="relative rounded-[2px] border border-hairline bg-white p-10 shadow-[var(--shadow-rest)] max-[700px]:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-hairline pb-7">
        <h2 className="card-title">Request a quote</h2>
        <p className="text-[14px] leading-[1.5] text-ink-muted">Two minutes. Photos and drawings can follow by email.</p>
      </div>

      <fieldset className="mt-8 min-w-0 border-0 p-0" disabled={loading}>
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
              autoCapitalize="words"
              enterKeyHint="next"
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
              enterKeyHint="next"
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
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              inputMode="email"
              enterKeyHint="next"
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
              inputMode="tel"
              enterKeyHint="next"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="604 555 0142"
              className={field}
            />
          </div>
        </div>
      </fieldset>

      <div aria-hidden="true" className="mt-10 border-t border-hairline" />
      <fieldset className="mt-8 min-w-0 border-0 p-0" disabled={loading}>
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
              autoComplete="address-level2"
              enterKeyHint="next"
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
              maxLength={4000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Two decorative crosswalks and a plaza recoat, roughly 400 m². When you need it done, and any drawings, help too."
              className={`${field} h-auto min-h-[150px] resize-y py-[14px]`}
            />
          </div>
        </div>
      </fieldset>

      {/* Honeypot — off-screen rather than display:none, because a bot that
          skips hidden fields is a bot that gets through. Never focusable. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-[2px] border border-[#E4C8C1] bg-[#FDF6F4] px-5 py-4"
        >
          <p ref={errorRef} className="text-[15px] leading-[1.55] font-medium text-[#A83E2B]">
            {error}
          </p>
          <p className="mt-2 text-[14px] leading-[1.6] text-ink-body">
            Nothing is lost &mdash; call{" "}
            <a href="tel:+16046126209" className="font-medium text-ink underline-offset-4 hover:underline">604-612-6209</a>{" "}
            (Lower Mainland) or{" "}
            <a href="tel:+12503910270" className="font-medium text-ink underline-offset-4 hover:underline">250-391-0270</a>{" "}
            (Vancouver Island), or{" "}
            <a href={mailtoFallback()} className="font-medium text-ink underline-offset-4 hover:underline">
              send it by email
            </a>{" "}
            &mdash; that link carries everything you have typed.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-hairline pt-8">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
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
