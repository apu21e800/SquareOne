"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { Lightbox, type ViewerPhoto } from "@/components/WorkGallery"

/**
 * A captioned tile grid in groups, opening the same full-screen viewer the
 * work galleries use — for a page whose frames are NOT all from the record
 * and therefore cannot go through lib/work.ts (every WorkPhoto is a real
 * Square One installation; that rule holds). Each group carries its own
 * label and note, so a reader always knows what kind of frame they are
 * looking at; the viewer walks all groups as one set.
 *
 * First use: /services/vapor-blasting#gallery — four photographs from the
 * record, then nine illustrations of the service (Vern, 19 Sept: "add the
 * images to the galleries section").
 */
export interface FrameGroup {
  label: string
  note?: string
  photos: ViewerPhoto[]
}

export default function FrameGallery({
  groups,
  ariaLabel = "Photographs",
}: {
  groups: FrameGroup[]
  ariaLabel?: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const all = groups.flatMap((g) => g.photos)

  const show = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null
    setOpen(i)
  }
  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
    opener.current = null
  }, [])

  let offset = 0

  return (
    <>
      {groups.map((group) => {
        const start = offset
        offset += group.photos.length
        if (group.photos.length === 0) return null
        return (
          <div key={group.label} className="[&+&]:mt-14 [&+&]:max-[700px]:mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-hairline pt-6">
              <p className="label">{group.label}</p>
              {group.note && (
                <p className="max-w-[56ch] text-[13px] leading-[1.55] text-ink-muted [text-wrap:pretty]">{group.note}</p>
              )}
            </div>

            <ul
              aria-label={`${ariaLabel} — ${group.label}`}
              className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 min-[701px]:grid-cols-3 min-[1024px]:grid-cols-4 max-[700px]:gap-x-3 max-[700px]:gap-y-6"
            >
              {group.photos.map((p, i) => (
                <li key={p.src}>
                  <figure>
                    <button
                      type="button"
                      onClick={() => show(start + i)}
                      aria-label={`View ${p.primary} full screen`}
                      className="thumb group relative block w-full aspect-[5/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)] text-left"
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 700px) 50vw, (max-width: 1023px) 33vw, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-[2px] bg-[rgba(20,24,29,0.55)] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <path d="M2 6V2h4M12 8v4H8M2 2l4 4M12 12L8 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <figcaption className="mt-3 max-[700px]:mt-2">
                      <div className="text-[14px] leading-[1.35] font-semibold text-[color:var(--ink)] [text-wrap:pretty] max-[700px]:text-[13px]">
                        {p.primary}
                      </div>
                      {p.secondary && (
                        <div className="mt-1 text-[12.5px] leading-[1.45] text-[color:var(--ink-muted)] [text-wrap:pretty] max-[700px]:text-[12px]">
                          {p.secondary}
                        </div>
                      )}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )
      })}

      {open !== null && <Lightbox photos={all} index={open} onIndex={setOpen} onClose={close} />}
    </>
  )
}
