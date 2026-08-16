"use client"

import { useState } from "react"
import Image from "next/image"

/* Ported from docs/design-v2/Quote Request.dc.html.
   Visual layer only — state shape, field names, honeypot, required
   attributes and the POST to /api/contact are unchanged. */

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

/* Hairline-underline fields. Focus darkens the rule to ink; the global
   :focus-visible ring in globals.css stays in place for keyboard users. */
const field =
  "block w-full border-b border-hairline bg-transparent pb-[10px] text-[15px] leading-[1.55] text-ink transition-colors placeholder:text-[#9AA0A7] hover:border-[color:var(--hairline-strong)] focus:border-ink"

const label = "mb-2 block text-[14px] font-semibold text-ink"

function Required() {
  return (
    <span aria-hidden="true" className="font-normal text-ink-muted">
      {" "}
      *
    </span>
  )
}

function AsideBlock({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-hairline py-6 first:pt-0">
      <div className="label">{heading}</div>
      {children}
    </div>
  )
}

function PhoneRow({ region, display, href }: { region: string; display: string; href: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[14px] text-ink-muted">{region}</span>
      <a href={href} className="text-[15px] font-medium text-ink whitespace-nowrap">
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
    name: "", company: "", email: "", phone: "", projectType: "", message: "",
  })

  return (
    <main className="bg-surface-warm pt-[calc(72px_+_6rem)] pb-32 max-[700px]:pt-[calc(72px_+_3.5rem)] max-[700px]:pb-20">
      <div className="container-1280">
        <h1 className="stop">Request a quote</h1>

        <p className="mt-5 max-w-[56ch] text-[18px] leading-[1.6] text-ink-body [text-wrap:pretty]">
          Tell us what you are building and where. Drawings help, but a rough description is
          enough to start.
        </p>

        <div className="mt-10 grid items-start gap-y-16 min-[901px]:grid-cols-[minmax(0,560px)_1fr] min-[901px]:gap-x-[112px]">

          {/* ── Form ─────────────────────────────────────────────── */}
          <div>
            {submitted ? (
              <div className="rounded-[2px] border border-hairline bg-white px-5 py-[18px]">
                <div className="text-[15px] font-semibold text-ink">
                  Received &mdash; we reply within one business day.
                </div>
                <p className="mt-1 text-[14px] leading-[1.55] text-ink-body">
                  We will be in touch to arrange a site walk.
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
                className="flex flex-col gap-6"
              >
                <div>
                  <label htmlFor="q-name" className={label}>
                    Name
                    <Required />
                  </label>
                  <input
                    id="q-name"
                    type="text"
                    required
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
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="j.bell@coquitlam.ca"
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor="q-phone" className={label}>Phone</label>
                  <input
                    id="q-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="604 555 0142"
                    className={field}
                  />
                </div>

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
                  <label htmlFor="q-scope" className={label}>Scope</label>
                  <textarea
                    id="q-scope"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Two decorative crosswalks and a plaza recoat, roughly 400 m². Location and timeline help too."
                    className={`${field} resize-y`}
                  />
                </div>

                {/* Honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {error && (
                  <p
                    role="alert"
                    className="rounded-[2px] border border-[#E4C8C1] bg-white px-4 py-3 text-[14px] leading-[1.55] text-[#B04432]"
                  >
                    {error}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Sending…" : "Send request"}
                  </button>
                  <span className="text-[15px] text-ink-muted">
                    or call{" "}
                    <a href="tel:+16046126209" className="font-medium text-ink-body">
                      604-612-6209
                    </a>
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* ── Contact details ──────────────────────────────────── */}
          <aside>
            <AsideBlock heading="Office">
              <address className="mt-[10px] text-[1.25rem] font-semibold not-italic leading-[1.4] tracking-[-0.015em] text-ink">
                505&ndash;20800 Lougheed Highway
              </address>
              <p className="mt-1 text-[14px] text-ink-muted">Maple Ridge, BC V2X 3P2</p>
            </AsideBlock>

            <AsideBlock heading="Phone">
              <div className="mt-3 flex flex-col gap-[10px]">
                <PhoneRow region="Lower Mainland" display="604-612-6209" href="tel:+16046126209" />
                <PhoneRow region="Vancouver Island" display="250-391-0270" href="tel:+12503910270" />
                <PhoneRow region="Toll-free" display="1-877-391-0270" href="tel:+18773910270" />
              </div>
            </AsideBlock>

            <AsideBlock heading="Email">
              <a
                href="mailto:office@squareonepaving.com"
                className="mt-[10px] inline-block text-[15px] font-medium text-ink"
              >
                office@squareonepaving.com
              </a>
            </AsideBlock>

            <AsideBlock heading="Response">
              <p className="mt-[10px] max-w-[36ch] text-[15px] leading-[1.6] text-ink-body">
                We reply within one business day, and we walk the site before we quote it.
              </p>
              <p className="mt-2 text-[14px] text-ink-muted">Monday to Friday, 8am &ndash; 5pm PT</p>
            </AsideBlock>

            <p className="mt-6 max-w-[34ch] text-[14px] leading-[1.6] text-ink-muted">
              Proudly serving communities across British Columbia since 2000.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <Image
                src="/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Contact%20Page/BBB-Logo.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 flex-shrink-0 object-contain"
              />
              <p className="text-[13px] text-ink-muted">BBB Accredited Business</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
