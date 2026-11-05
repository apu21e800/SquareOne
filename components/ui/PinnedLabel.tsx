/**
 * The small "Pinned" over the project a Studio editor pinned (lib/pin.ts): the
 * site's small voice in ink, led by the orange square a page's own label
 * carries (app/own.css .label-pin). On the home page's articles and on /blog.
 */
export default function PinnedLabel({ className = "" }: { className?: string }) {
  return <span className={`label label-sq label-pin ${className}`.trim()}>Pinned</span>
}
