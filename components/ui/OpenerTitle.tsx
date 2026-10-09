/**
 * A headline in the house shape: the words in the display face, the ending
 * in its lighter weight (<em>, app/own.css). One text node before the <em>,
 * exactly as the pages wrote it by hand before the Studio could change it
 * (lib/page-content.ts, 9 Oct 2026).
 */
export default function OpenerTitle({ head, tail }: { head: string; tail?: string }) {
  if (!tail) return <>{head}</>
  return (
    <>
      {head ? `${head} ` : ""}
      <em>{tail}</em>
    </>
  )
}
