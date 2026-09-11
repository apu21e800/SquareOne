/**
 * A designed hold for photography that is still in production — used where
 * a page's layout wants an image the studio does not yet have (vapour
 * blasting, until the rig is photographed or the §11 generated set lands).
 *
 * It reads as intentional: a stone panel with a hairline frame, a small
 * "Photography in production" label and the shot brief in muted type. The
 * brief doubles as the instruction for whoever produces the image, so the
 * swap later is one `src`.
 *
 * Never ship a broken image or a grey box where this belongs.
 */
export default function ImagePlaceholder({
  brief,
  ratio = "aspect-[3/2]",
  label = "Photography in production",
  className = "",
}: {
  brief: string
  ratio?: string
  label?: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${brief}`}
      className={`relative flex ${ratio} flex-col justify-between overflow-hidden rounded-[2px] border border-hairline bg-surface-stone p-5 max-[700px]:p-4 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 14px)",
      }}
    >
      <span className="label">{label}</span>
      <span className="max-w-[34ch] text-[13px] leading-[1.5] text-ink-muted [text-wrap:pretty]">
        {brief}
      </span>
    </div>
  )
}
