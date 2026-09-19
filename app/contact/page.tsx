"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import IndexImageHero from "@/components/IndexImageHero"

/* Request a quote — rebuilt 11 Sept 2026 (Vern: "request page needs work").
   The form's state shape, field names, honeypot and the POST to
   /api/contact are unchanged; one optional field is added (location),
   because the lede has always asked "where" and the form never did.

   What changed visually: the page opens with the three-step promise the
   rest of the site already makes (tell us, we walk it, written quote), the
   form sits in a white card with its fields grouped into "you" and "the
   project" and paired two-up on desktop, the office rail is one column of
   canon contact details with a note on what makes a quote faster, and a
   crew photograph from the record closes the rail. Office hours were
   removed: nothing on record states them.

   Rebuilt again 17 Sept 2026 (Vern, relaying the client: "Request a quote
   page just looks like a lot of text"). It was. Every other page on the
   site opens on a photograph of the work; this one opened on beige, then
   made the visitor read a headline, a lede, three numbered paragraphs and
   a four-heading rail before reaching the one thing the page exists for.
   Now: the same photographic opener the rest of the site uses, the three
   steps compressed from three paragraphs to three lines on one hairline
   strip, the form given the width, and the rail cut to contact facts —
   the second photograph went, because the hero is the photograph. */

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

const STEPS: { n: string; line: string }[] = [
  { n: "01", line: "Tell us the job and where it is" },
  { n: "02", line: "We visit the site, free, with colour and pattern samples" },
  { n: "03", line: "You get a written quote" },
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

function RailBlock({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-hairline py-6 first:pt-0">
      <div className="label">{heading}</div>
      {children}
    </div>
  )
}

function PhoneRow({ region, display, href }: { region: string; display: string; href: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[14px] text-ink-muted">{region}</span>
      <a href={href} className="whitespace-nowrap text-[16px] font-medium tabular-nums text-ink">
        {display}
      </a>
    </div>
  )
}

export default function ContactPage() {
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

  return (
    <main className="bg-surface-warm pb-28 max-[700px]:pb-16">
      {/* ── Opener — the work, like every other page ──────── */}
      <IndexImageHero
        src="/images/applications/driveways/maple-ridge-driveway-recoat-at-dusk-streetbond-01.jpg"
        alt="A StreetBond driveway recoat between brick gateposts with lit lanterns, photographed at dusk in Maple Ridge, installed by Square One Paving"
        eyebrow="Contact · Free site visit"
        title="Request a quote"
        lede="Tell us what you are building and where — a crosswalk, a plaza, a parking lot, a driveway. A few photos and a postal code are enough to start; drawings help."
        caption="Maple Ridge · StreetBond"
        imagePosition="center 62%"
      />

      {/* ── How it goes — three lines on one rule, not three paragraphs ── */}
      <div className="border-b border-hairline bg-surface">
        <ol className="container-1280 flex flex-wrap gap-x-14 gap-y-4 py-[22px] max-[700px]:flex-col max-[700px]:gap-y-3 max-[700px]:py-5">
          {STEPS.map((s) => (
            <li key={s.n} className="flex items-baseline gap-3">
              <span className="label text-[color:var(--accent-deep)]">{s.n}</span>
              <span className="text-[15px] leading-[1.45] text-ink">{s.line}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="container-1280">
        <div className="mt-16 grid grid-cols-12 items-start gap-x-12 gap-y-14 max-[900px]:grid-cols-1 max-[700px]:mt-10">
          {/* ── Form ──────── */}
          <div className="col-span-7 max-[900px]:col-span-1">
            {submitted ? (
              <div className="rounded-[2px] border border-hairline bg-white p-10 shadow-[var(--shadow-rest)] max-[700px]:p-6">
                <div className="label">Received</div>
                <h2 className="mt-4 text-[26px] normal-case tracking-normal">Thank you &mdash; we have your request.</h2>
                <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-ink-body">
                  We will be in touch to arrange the site visit. If it is urgent, call{" "}
                  <a href="tel:+16046126209" className="font-medium text-ink">604-612-6209</a> (Lower Mainland),{" "}
                  <a href="tel:+12503910270" className="font-medium text-ink">250-391-0270</a> (Vancouver Island) or{" "}
                  <a href="tel:+18773910270" className="font-medium text-ink">1-877-391-0270</a> (toll-free).
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
                <fieldset className="min-w-0 border-0 p-0">
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
            )}
          </div>

          {/* ── The office ──────── */}
          <aside className="col-span-5 max-[900px]:col-span-1">
            <RailBlock heading="Office">
              <address className="mt-[10px] text-[1.25rem] font-semibold not-italic leading-[1.4] tracking-[-0.015em] text-ink">
                19&ndash;11720 Stewart Crescent
              </address>
              <p className="mt-1 text-[14px] text-ink-muted">Maple Ridge, BC V2X 9E7</p>
            </RailBlock>

            <RailBlock heading="Phone">
              <div className="mt-3 flex flex-col gap-[10px]">
                <PhoneRow region="Lower Mainland" display="604-612-6209" href="tel:+16046126209" />
                <PhoneRow region="Vancouver Island" display="250-391-0270" href="tel:+12503910270" />
                <PhoneRow region="Toll-free" display="1-877-391-0270" href="tel:+18773910270" />
              </div>
            </RailBlock>

            <RailBlock heading="Email">
              <a
                href="mailto:office@squareonepaving.com"
                className="mt-[10px] inline-block text-[16px] font-medium text-ink"
              >
                office@squareonepaving.com
              </a>
            </RailBlock>

            <RailBlock heading="What to send">
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-[9px] text-[14px] leading-[1.4] text-ink-body max-[420px]:grid-cols-1">
                <li>Photos of the surface as it is</li>
                <li>The address or postal code</li>
                <li>Drawings or a sketch, if you have them</li>
                <li>A rough area in square metres</li>
                <li>When you need it done</li>
              </ul>
              <p className="mt-4 text-[13px] leading-[1.5] text-ink-muted">
                Photos and drawings go by email to{" "}
                <a href="mailto:office@squareonepaving.com" className="font-medium text-ink-body">office@squareonepaving.com</a>
                {" "}&mdash; put the site address in the subject line.
              </p>
            </RailBlock>

            <div className="mt-7 flex items-center gap-4">
              <Image
                src="/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Contact%20Page/BBB-Logo.png"
                alt="BBB Accredited Business seal"
                width={131}
                height={51}
                className="h-8 w-auto flex-shrink-0"
              />
              <p className="text-[13px] leading-[1.5] text-ink-muted">Decorative pavement across BC since 2000</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
