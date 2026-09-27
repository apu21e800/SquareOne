/**
 * RETIRED — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7).
 *
 * This was the one project-card caption: a title over an uppercase
 * MUNICIPALITY · SYSTEM · YEAR line, absolutely positioned over the
 * photograph on a gradient. Text over photographs is HUB's move, and the
 * own-company surface puts every caption UNDER the frame in the serif
 * instead — see `components/ui/Frame.tsx` (`caption`) and the `.cap` rule
 * in app/own.css. /galleries, /projects and the project pages no longer
 * use this.
 *
 * The file stays, and still compiles, only because other pages may import
 * it until their own pass lands. Do not add new uses; replace the ones you
 * find with a Frame whose caption sits under it. Once nothing imports it,
 * it moves to `_to_delete/` (deletions are the maintainer's).
 */
export default function ProjectCaption({
  title,
  meta,
  large = false,
}: {
  title: string
  meta: string
  large?: boolean
}) {
  return (
    <div
      className={`pointer-events-none absolute ${
        large ? "bottom-6 left-7 right-7" : "bottom-5 left-6 right-6"
      }`}
    >
      <div
        className={`font-semibold leading-[1.3] text-white ${
          large ? "text-[19px]" : "text-[16px]"
        }`}
      >
        {title}
      </div>
      <div
        className={`font-semibold uppercase leading-[1.4] tracking-[0.12em] text-[rgba(255,255,255,0.78)] ${
          large ? "mt-2 text-[11px]" : "mt-[6px] text-[10px]"
        }`}
      >
        {meta}
      </div>
    </div>
  )
}
