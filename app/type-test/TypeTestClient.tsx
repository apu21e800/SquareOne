"use client"

import Image from "next/image"
import { useState } from "react"

/* Six sans directions at the same scale for a fair one-glance comparison.
   Poppins is live sitewide (display and body) since 4 Sept 2026 at Vern's
   call; Jost was the 31 Aug pick and stays here for the record. The client
   can still weigh the alternates on real screens. Real Avenir is a licensed
   face — if Mulish or Nunito Sans wins and the true cut is wanted, that is
   a font licence away. */

type DirectionKey = "jost" | "poppins" | "inter" | "mulish" | "nunito" | "montserrat"
type BodyKey = "inter" | "poppins"
type CaseMode = "caps" | "title"

interface Direction {
  name: string
  note?: string
  blurb: string
  family: string
  capsWeight: number
  capsSpacing: string
  titleWeight: number
  titleSpacing: string
}

const DIRECTIONS: Record<DirectionKey, Direction> = {
  jost: {
    name: "Jost",
    note: "previous",
    blurb: "The 31 August pick — geometric sans in the wordmark's Futura family.",
    family: "var(--tt-jost)",
    capsWeight: 600,
    capsSpacing: "0.08em",
    titleWeight: 600,
    titleSpacing: "-0.01em",
  },
  poppins: {
    name: "Poppins",
    note: "current",
    blurb: "The site as it stands — geometric sans with rounder letterforms, display and body.",
    family: "var(--tt-poppins)",
    capsWeight: 600,
    capsSpacing: "0.07em",
    titleWeight: 600,
    titleSpacing: "-0.015em",
  },
  inter: {
    name: "Inter",
    blurb: "The body face carrying the headlines too — one family across the whole site, quiet and modern.",
    family: "var(--tt-inter)",
    capsWeight: 650,
    capsSpacing: "0.08em",
    titleWeight: 650,
    titleSpacing: "-0.025em",
  },
  mulish: {
    name: "Mulish",
    blurb: "Humanist sans in the Avenir register — warmer and softer.",
    family: "var(--tt-mulish)",
    capsWeight: 700,
    capsSpacing: "0.08em",
    titleWeight: 700,
    titleSpacing: "-0.01em",
  },
  nunito: {
    name: "Nunito Sans",
    blurb: "Soft-terminal sans — calm and rounded.",
    family: "var(--tt-nunito)",
    capsWeight: 700,
    capsSpacing: "0.08em",
    titleWeight: 700,
    titleSpacing: "-0.01em",
  },
  montserrat: {
    name: "Montserrat",
    blurb: "Wider geometric caps — a strong civic presence.",
    family: "var(--tt-montserrat)",
    capsWeight: 600,
    capsSpacing: "0.06em",
    titleWeight: 600,
    titleSpacing: "-0.015em",
  },
}

const BODIES: Record<BodyKey, { name: string; family: string; weight: number }> = {
  inter: { name: "Inter", family: "var(--tt-inter)", weight: 460 },
  poppins: { name: "Poppins", family: "var(--tt-poppins)", weight: 400 },
}

const CASES: Record<CaseMode, string> = {
  caps: "Spaced caps",
  title: "Title case",
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#767B82]">{label}</span>
      {children}
    </div>
  )
}

export default function TypeTestClient() {
  const [dir, setDir] = useState<DirectionKey>("poppins")
  const [bodyKey, setBodyKey] = useState<BodyKey>("poppins")
  const [mode, setMode] = useState<CaseMode>("caps")

  const d = DIRECTIONS[dir]
  const b = BODIES[bodyKey]
  const caps = mode === "caps"

  const display: React.CSSProperties = {
    fontFamily: d.family,
    fontWeight: caps ? d.capsWeight : d.titleWeight,
    letterSpacing: caps ? d.capsSpacing : d.titleSpacing,
    textTransform: caps ? "uppercase" : "none",
    lineHeight: caps ? 1.14 : 1.05,
  }
  const heroSize = caps ? "clamp(2.5rem, 4.4vw, 4.25rem)" : "clamp(3rem, 5.2vw, 5rem)"
  const h2Size = caps ? "clamp(1.5rem, 2.6vw, 2.25rem)" : "clamp(1.9rem, 3.2vw, 2.75rem)"

  // Eyebrows, buttons and captions follow the body face.
  const small: React.CSSProperties = {
    fontFamily: b.family,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  }
  const body: React.CSSProperties = {
    fontFamily: b.family,
    fontWeight: b.weight,
    fontSize: "17px",
    lineHeight: 1.65,
  }

  const pill = (active: boolean) =>
    `rounded-[2px] border px-4 py-2 transition-colors duration-150 ${
      active
        ? "border-[#14161A] bg-[#14161A] text-white"
        : "border-[#E7E3DC] text-[#3D4147] hover:border-[#A9A297]"
    }`

  return (
    <main style={{ fontFamily: b.family, fontWeight: b.weight }} className="bg-white text-[#3D4147]">
      {/* ── Switcher ──────── */}
      <div className="sticky top-0 z-50 border-b border-[#E7E3DC] bg-white/95 backdrop-blur-sm">
        <div className="container-1280 flex flex-col gap-3 py-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Group label="Display">
              {(Object.keys(DIRECTIONS) as DirectionKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDir(key)}
                  style={{ ...small, fontSize: 12 }}
                  className={pill(dir === key)}
                >
                  {DIRECTIONS[key].name}
                  {DIRECTIONS[key].note && (
                    <span className="ml-2 opacity-60">&middot; {DIRECTIONS[key].note}</span>
                  )}
                </button>
              ))}
            </Group>
            <Group label="Body">
              {(Object.keys(BODIES) as BodyKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setBodyKey(key)}
                  style={{ ...small, fontSize: 12 }}
                  className={pill(bodyKey === key)}
                >
                  {BODIES[key].name}
                </button>
              ))}
            </Group>
            <Group label="Case">
              {(Object.keys(CASES) as CaseMode[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  style={{ ...small, fontSize: 12 }}
                  className={pill(mode === key)}
                >
                  {CASES[key]}
                </button>
              ))}
            </Group>
          </div>
          <p style={{ fontWeight: 500 }} className="text-[14px] text-[#767B82]">
            <span className="text-[#14161A]">{d.name}</span> — {d.blurb} Body text in {b.name}.
          </p>
        </div>
      </div>

      {/* ── Specimen 1: the real hero ──────── */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden bg-[#14181D]">
        <Image
          src="/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg"
          alt="TrafficPatternsXD crosswalk at the White Rock Pier"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_62%]"
        />
        <div aria-hidden="true" className="scrim-rise" />
        <div className="absolute inset-x-0 bottom-0 z-[1]">
          <div className="container-1280 pb-16">
            <div style={{ ...small, fontSize: 11 }} className="text-white/80">
              <span aria-hidden="true" className="mr-[10px] inline-block h-[6px] w-[6px] rounded-[1px] bg-[#F26430] align-middle" />
              BC&rsquo;s decorative pavement studio &middot; Since 2000
            </div>
            <h1 style={{ ...display, fontSize: heroSize }} className="mt-6 max-w-[17ch] text-white">
              Surfaces that define a place
              <span aria-hidden="true" className="ml-4 inline-block h-[8px] w-[8px] rounded-[1px] bg-[#F26430]" />
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-[14px]">
              <span
                style={{ ...small, fontSize: 13 }}
                className="inline-block cursor-pointer rounded-[2px] bg-[#F26430] px-7 py-4 text-white"
              >
                Request a quote
              </span>
              <span
                style={{ ...small, fontSize: 13 }}
                className="inline-block cursor-pointer rounded-[2px] border border-white/45 px-7 py-4 text-white"
              >
                See our work
              </span>
            </div>
          </div>
        </div>
        <div style={{ fontWeight: 600 }} className="caption caption-right z-[1]">
          White Rock · TrafficPatternsXD · 2019
        </div>
      </section>

      {/* ── Specimen 2: section header ──────── */}
      <section className="border-b border-[#E7E3DC] bg-[#FAF8F5] py-24">
        <div className="container-1280">
          <div style={{ ...small, fontSize: 11 }} className="text-[#767B82]">
            <span aria-hidden="true" className="mr-[10px] inline-block h-[6px] w-[6px] rounded-[1px] bg-[#F26430] align-middle" />
            What we do
          </div>
          <h2 style={{ ...display, fontSize: h2Size }} className="mt-5 max-w-[24ch] text-[#14161A]">
            Four services, one standard
          </h2>
          <p style={body} className="mt-6 max-w-[56ch]">
            Stamped asphalt, decorative coatings, preformed thermoplastic and mobile vapour
            blasting — installed by the same crews across the Lower Mainland and Vancouver
            Island since 2000. This paragraph is {b.name} at 17px: judge the pairing, not
            just the headline.
          </p>
        </div>
      </section>

      {/* ── Specimen 3: product card ──────── */}
      <section className="bg-white py-24">
        <div className="container-1280">
          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
            <article className="card overflow-hidden rounded-[2px] border border-[#E7E3DC] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/products/streetprint/streetprint-victoria-ellis-point-walkway-01.jpg"
                  alt="StreetPrint stamped asphalt walkway at Ellis Point, Victoria"
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="scrim scrim-light" />
                <div style={{ fontWeight: 600 }} className="caption">
                  Victoria · StreetPrint
                </div>
              </div>
              <div className="p-7">
                <h3
                  style={{
                    fontFamily: d.family,
                    fontWeight: caps ? d.capsWeight : d.titleWeight,
                    letterSpacing: caps ? "0.07em" : d.titleSpacing,
                    textTransform: caps ? "uppercase" : "none",
                    fontSize: caps ? 17 : 22,
                    lineHeight: 1.25,
                  }}
                  className="text-[#14161A]"
                >
                  StreetPrint
                </h3>
                <p style={{ ...body, fontSize: 15 }} className="mt-2 text-[#767B82]">
                  Brick, cobble and slate patterns imprinted into the asphalt you already have.
                </p>
                <div style={{ ...small, fontSize: 12 }} className="mt-6 text-[#14161A]">
                  Explore <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </article>

            <div className="col-span-2 flex items-center max-[900px]:col-span-1">
              <p style={body} className="max-w-[48ch] text-[#767B82]">
                The card at left renders the direction&rsquo;s product-title treatment against a
                real photograph, the unified grade, and the caption system. Switch the display
                face, the body face and the case in the bar above — the hero, the section
                header and this card all follow. Nothing on this page sits below weight 400.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
