/**
 * Editorial statement band — MOVE 2 of docs/SOUL-PASS.md.
 * Paper, one display line at weight 200, the orange square full stop.
 * No button, no image, no link. It is the page inhaling.
 */
export default function EditorialBand({ statement = "Twenty-five years on BC ground" }: { statement?: string }) {
  return (
    <section className="grain-paper relative overflow-hidden bg-surface-warm py-[7.5rem] max-[700px]:py-20">
      <div className="container-1280 relative z-[1]">
        <p data-reveal className="display-statement stop m-0 max-w-[24ch] text-ink [text-wrap:balance]">
          {statement}
        </p>
      </div>
    </section>
  )
}
