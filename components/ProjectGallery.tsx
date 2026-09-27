"use client"

import { useCallback, useRef, useState } from "react"
import { GalleryFrame, Lightbox, type ViewerPhoto } from "@/components/WorkGallery"

/**
 * A project's photographs — the hero leads the set, the rest sit in a grid,
 * and any of them opens the same full-screen viewer the galleries use
 * (Vern, 4 Sept 2026: Jan shows clients the work on screen). The hero is
 * rendered by the page; this grid starts at the second photograph but the
 * viewer walks the whole set, hero included.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the caption line — City ·
 * System · Year — sits UNDER each frame in the serif instead of over it on
 * a gradient; square corners, no hover zoom, no expand badge.
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
      <ul className={`grid gap-x-7 gap-y-10 max-[700px]:grid-cols-1 max-[700px]:gap-y-8 ${cols}`}>
        {rest.map((photo, i) => (
          <li key={photo.src}>
            <GalleryFrame
              src={photo.src}
              alt={photo.alt}
              primary={photo.secondary ?? caption}
              aspect="aspect-[4/3]"
              sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 628px"
              ariaLabel={`${caption} — view full screen (photograph ${i + 2} of ${photos.length})`}
              onOpen={() => show(i + 1)}
            />
          </li>
        ))}
      </ul>

      {open !== null && photos[open] && (
        <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} />
      )}
    </>
  )
}
