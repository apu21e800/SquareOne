/**
 * Editorial statement band — MOVE 2 of docs/SOUL-PASS.md.
 * Paper, one display line at weight 200, the orange square full stop.
 * No button, no image, no link. It is the page inhaling.
 */
export default function EditorialBand() {
  return (
    <section className="relative overflow-hidden bg-surface-warm py-[7.5rem] max-[700px]:py-20">
      <div className="container-1280">
        <p className="stop m-0 max-w-[22ch] text-[clamp(2.25rem,4vw,3.5rem)] font-extralight leading-[1.12] tracking-[-0.03em] text-ink [text-wrap:balance]">
          Twenty-five years on BC ground
        </p>
      </div>
    </section>
  )
}
