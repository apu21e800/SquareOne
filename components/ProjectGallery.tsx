"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { Lightbox, type ViewerPhoto } from "@/components/WorkGallery"

/**
 * A case study's photographs — the hero leads the set, the rest sit in a
 * grid, and any of them opens the same full-screen viewer the galleries use
 * (Vern, 4 Sept 2026: Jan shows clients the work on screen). The hero is
 * rendered by the page; this grid starts at the second photograph but the
 * viewer walks the whole set, hero included.
 */
export default function ProjectGallery({
  photos,
  caption,
}: {
  /** Every photograph of the project, hero first. */
  photos: ViewerPhoto[]
  /** City · System · Year — the same line the hero carries. */
  caption: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const rest = photos.slice(1)

  const show = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null
    setOpen(i)
  }
  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
    opener.current = null
  }, [])

  if (rest.length === 0) return null

  const cols =
    rest.length === 1 ? "grid-cols-2" : rest.length === 2 || rest.length === 4 ? "grid-cols-2" : "grid-cols-3"

  return (
    <>
      <div className={`grid gap-6 max-[700px]:grid-cols-1 max-[700px]:gap-4 ${cols}`}>
        {rest.map((photo, i) => (
          <figure key={photo.src}>
            <button
              type="button"
              onClick={() => show(i + 1)}
              aria-label={`View photograph ${i + 2} of ${photos.length} full screen`}
              className="thumb group relative block w-full aspect-[4/3] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)] text-left"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 628px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span aria-hidden="true" className="scrim scrim-light" />
              <span className="caption">{caption}</span>
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-[2px] bg-[rgba(20,24,29,0.55)] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M2 6V2h4M12 8v4H8M2 2l4 4M12 12L8 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {open !== null && photos[open] && (
        <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} />
      )}
    </>
  )
}
