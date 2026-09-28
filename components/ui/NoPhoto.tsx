import { BrandIcon } from "@/components/BrandMark"

/**
 * What a frame shows when a record has no photograph of its own (28 Sept
 * 2026 QA: four blog cards were blank grey boxes that read as broken
 * images). The mark on a faint template drawing: plainly "no photo", never
 * someone else's job standing in.
 */
export default function NoPhoto() {
  return (
    <span className="no-photo" aria-hidden="true">
      <BrandIcon tone="dark" height={30} />
    </span>
  )
}
