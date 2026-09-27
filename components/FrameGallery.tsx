"use client"

import { useCallback, useRef, useState } from "react"
import { GalleryFrame, Lightbox, type ViewerPhoto } from "@/components/WorkGallery"

/**
 * A captioned grid in groups, opening the same full-screen viewer the work
 * galleries use — for a page whose frames are NOT all from the record and
 * therefore cannot go through lib/work.ts (every WorkPhoto is a real Square
 * One installation; that rule holds). Each group carries its own label and
 * note, so a reader always knows what kind of frame they are looking at;
 * the viewer walks all groups as one set.
 *
 * First use: /services/vapor-blasting#gallery — four photographs from the
 * record, then nine illustrations of the service (Vern, 19 Sept: "add the
 * images to the galleries section").
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the same grid on the
 * shared GalleryFrame — square corners, the caption under the frame in the
 * serif, nothing over the photograph, no hover zoom.
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
                <p className="max-w-[56ch] text-[15px] italic leading-[1.5] text-ink-muted [text-wrap:pretty]">{group.note}</p>
              )}
            </div>

            <ul
              aria-label={`${ariaLabel} — ${group.label}`}
              className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 min-[701px]:grid-cols-3 min-[1024px]:grid-cols-4 max-[700px]:gap-x-3 max-[700px]:gap-y-6"
            >
              {group.photos.map((p, i) => (
                <li key={p.src}>
                  <GalleryFrame
                    src={p.src}
                    alt={p.alt}
                    primary={p.primary}
                    secondary={p.secondary}
                    ariaLabel={`View ${p.primary} full screen`}
                    onOpen={() => show(start + i)}
                  />
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
