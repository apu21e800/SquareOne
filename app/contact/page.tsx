"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

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
   removed: nothing on record states them. */

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

const STEPS: { n: string; title: string; body: string }[] = [
  { n: "01", title: "Tell us the job", body: "What you are building and where. A rough description is enough; drawings and areas make the quote faster." },
  { n: "02", title: "We walk the site", body: "We look at the asphalt or concrete in place, bring the sample boards, and talk through the pattern and colour." },
  { n: "03", title: "A written quote", body: "The system, the scope and the price, in writing, from the people who will install it." },
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
    <main className="bg-surface-warm pt-[calc(72px_+_5rem)] pb-28 max-[700px]:pt-[calc(72px_+_3rem)] max-[700px]:pb-16">
      <div className="container-1280">
        {/* ── Opener ──────── */}
        <div className="max-w-[62ch]">
          <div className="eyebrow">Contact &middot; Free site visit</div>
          <h1 className="stop mt-5">Request a quote</h1>
          <p className="mt-5 max-w-[52ch] text-[18px] leading-[1.6] text-ink-body [text-wrap:pretty]">
            Tell us what you are building and where &mdash; a crosswalk, a plaza, a parking area,
            a driveway. Drawings help, but a rough description and a location are enough to start.
          </p>
        </div>

        {/* ── How it goes ──────── */}
        <ol className="mt-12 grid grid-cols-3 gap-x-10 max-[640px]:grid-cols-1 max-[640px]:gap-y-6">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t border-[color:var(--hairline-strong)] pt-5">
              <div className="flex items-baseline gap-3">
                <span className="figure text-[18px] text-[color:var(--accent-deep)]">{s.n}</span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink" style={{ fontFamily: "var(--font-display)" }}>
                  {s.title}
                </span>
              </div>
              <p className="mt-2 max-w-[40ch] text-[14px] leading-[1.6] text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid grid-cols-12 items-start gap-x-12 gap-y-14 max-[900px]:grid-cols-1 max-[700px]:mt-10">
          {/* ── Form ──────── */}
          <div className="col-span-7 max-[900px]:col-span-1">
            {submitted ? (
              <div className="rounded-[2px] border border-hairline bg-white p-10 shadow-[var(--shadow-rest)] max-[700px]:p-6">
                <div className="label">Received</div>
                <h2 className="mt-4 text-[26px] normal-case tracking-normal">Thank you &mdash; we have your request.</h2>
                <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-ink-body">
                  We reply within one business day to arrange the site walk. If it is urgent, call{" "}
                  <a href="tel:+16044669902" className="font-medium text-ink">604-466-9902</a> (Lower Mainland) or{" "}
                  <a href="tel:+12503910270" className="font-medium text-ink">250-391-0270</a> (Vancouver Island).
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
                        placeholder="City of Coquitlam"
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
                        placeholder="Street and city, or the site name"
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
                        placeholder="Two decorative crosswalks and a plaza recoat, roughly 400 m². Timeline and any drawings help too."
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
                    We reply within one business day, or call{" "}
                    <a href="tel:+16044669902" className="font-medium text-ink-body">604-466-9902</a>.
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* ── The office ──────── */}
          <aside className="col-span-5 max-[900px]:col-span-1">
            <RailBlock heading="Office">
              <address className="mt-[10px] text-[1.25rem] font-semibold not-italic leading-[1.4] tracking-[-0.015em] text-ink">
                505&ndash;20800 Lougheed Highway
              </address>
              <p className="mt-1 text-[14px] text-ink-muted">Maple Ridge, BC V2X 3P2</p>
            </RailBlock>

            <RailBlock heading="Phone">
              <div className="mt-3 flex flex-col gap-[10px]">
                <PhoneRow region="Lower Mainland" display="604-466-9902" href="tel:+16044669902" />
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

            <RailBlock heading="What makes a quote faster">
              <ul className="mt-3 flex flex-col gap-2 text-[14.5px] leading-[1.55] text-ink-body">
                <li className="flex gap-3"><span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[color:var(--accent)]" />The site address, or a pin</li>
                <li className="flex gap-3"><span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[color:var(--accent)]" />A rough area in square metres</li>
                <li className="flex gap-3"><span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[color:var(--accent)]" />Drawings or a photo of the existing surface</li>
                <li className="flex gap-3"><span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[color:var(--accent)]" />When you need it done</li>
              </ul>
            </RailBlock>

            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[2px] bg-surface-stone">
              <Image
                src="/images/applications/parks-paths/west-vancouver-park-path-01.jpg"
                alt="A Square One installer at work on a park path in West Vancouver"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="object-cover"
              />
              <div aria-hidden className="scrim scrim-light" />
              <div className="caption">West Vancouver &middot; On site</div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Image
                src="/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Contact%20Page/BBB-Logo.png"
                alt="BBB Accredited Business"
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
