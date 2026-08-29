/**
 * The one project-card caption — title over an uppercase
 * MUNICIPALITY · SYSTEM · YEAR line. Used everywhere a card shows a
 * project so grids read as one system (Rockstar copy pass, item 4).
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
