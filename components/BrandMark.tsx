/**
 * The Square One lockup — Rockstar Pass Part 2.
 *
 * Fully vector at any size: the icon is the official mark's geometry
 * (extracted from "Square One logo (dark).svg"), the lettering is set
 * live in the site's spaced-caps system. The official SVG's own
 * lettering is a live <text> in Futura LT, which silently falls back
 * to a default font on machines without it — so it cannot ship raw;
 * the 630px PNG rendered muddy at bar size. This lockup replaces both.
 */

type Tone = "dark" | "light"

const DARK = { a: "#BB7034", b: "#595959", c: "#D8D8D8" }
// Over photography the mark keeps its copper — only the grey facets go
// light so the geometry reads. All-white washed the brand out entirely.
const LIGHT = { a: "#C97A3A", b: "#FFFFFF", c: "rgba(255,255,255,0.66)" }

export function BrandIcon({ tone = "dark", height = 34 }: { tone?: Tone; height?: number }) {
  const t = tone === "light" ? LIGHT : DARK
  return (
    <svg
      aria-hidden="true"
      viewBox="-8 -1 302 131"
      style={{ height, width: "auto" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(81.587 29.839)">
        <path
          d="M45.945,0,0,26.037,45.945,66.7,93.014,26.037Z"
          fill={t.a}
          stroke={t.a}
          strokeMiterlimit="10"
          strokeWidth="6.627"
        />
      </g>
      <path d="M16.619,0,37.655,20.1,0,40.859Z" transform="translate(22.432 31.245)" fill={t.b} />
      <path d="M-25.965,0-47,20.1-9.345,40.859Z" transform="translate(243.284 31.245)" fill={t.b} />
      <path d="M0,21.349,8.633,0H27.656L69.7,23.472l-41.726,23.8Z" transform="translate(44.064 0)" fill={t.c} />
      <path d="M-17.3,21.349-25.932,0H-44.955L-87,23.472l41.726,23.8Z" transform="translate(228.805 0)" fill={t.c} />
      <path d="M0,12.819,14.519,0,28.842,12.819Z" transform="translate(113.765 113.765)" fill={t.b} />
      <path d="M0,0H60.888L30.813,15.222Z" transform="translate(97.742 0)" fill={t.c} />
      <path d="M0,64.093,14.46,30.67,69.384,0l47.586,44.624L93.015,64.093Z" transform="translate(0 63.292)" fill={t.b} />
      <path
        d="M-29.031,64.093-43.491,30.67-98.414,0-146,44.624l23.954,19.469Z"
        transform="translate(285.402 63.292)"
        fill={t.b}
      />
    </svg>
  )
}

export default function BrandMark({
  tone = "dark",
  size = "nav",
}: {
  tone?: Tone
  size?: "nav" | "footer"
}) {
  const iconH = size === "footer" ? 40 : 34
  const textSize = size === "footer" ? 17 : 15
  return (
    <span className="flex items-center gap-3">
      <BrandIcon tone={tone} height={iconH} />
      <span
        className={tone === "light" ? "text-white" : "text-[#14161A]"}
        style={{
          fontSize: textSize,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Square&nbsp;One
      </span>
    </span>
  )
}
