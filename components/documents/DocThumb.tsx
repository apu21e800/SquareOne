"use client"

import Image from "next/image"
import { useState } from "react"
import type { ResourceType } from "@/lib/resources"
import { previewFor } from "@/lib/doc-previews"

/** Two-letter codes in a stone square — the type at a glance, on brand. */
export const TYPE_CODE: Record<ResourceType, string> = {
  Specification: "SP",
  "Technical info": "TD",
  SDS: "SD",
  Guide: "GD",
  "Colour card": "CC",
  Brochure: "BR",
}

/**
 * Page one of the document, pre-rendered (lib/doc-previews). Served as-is
 * from /docs-previews — `unoptimized` keeps 200+ small WebPs out of the
 * image optimizer. If the file is missing or fails to load, the tile falls
 * back to the type code, so a broken preview never breaks a row.
 */
export default function DocThumb({
  href,
  type,
  size = "row",
  className = "",
}: {
  href: string
  type: ResourceType
  size?: "row" | "card"
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const p = previewFor(href)
  const box =
    size === "card"
      ? "h-[132px] w-[100px]"
      : "h-[58px] w-[44px]"

  if (!p || failed) {
    return (
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-[2px] bg-[color:var(--surface-stone)] text-[11px] font-semibold tracking-[0.08em] text-[color:var(--ink-body)] ${box} ${className}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {TYPE_CODE[type]}
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`doc-thumb relative block shrink-0 overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-white ${box} ${className}`}
    >
      <Image
        src={p.thumb}
        alt=""
        width={320}
        height={Math.round((320 * p.h) / p.w)}
        unoptimized
        loading="lazy"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </span>
  )
}
