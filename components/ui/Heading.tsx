/**
 * A heading's words as the site sets them (14 Oct 2026, lib/page-copy.ts):
 * the bold part, then its lighter ending in <em> (Futura Book). One text
 * node before the ending, so the page is the same markup it was when the
 * words were typed into each component.
 */
export default function Heading({ words }: { words: { head: string; tail?: string } }) {
  if (!words.tail) return <>{words.head}</>
  return (
    <>
      {words.head ? `${words.head} ` : null}
      <em>{words.tail}</em>
    </>
  )
}
