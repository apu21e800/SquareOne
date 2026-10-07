import Link from "next/link"
import LegalContents from "@/components/LegalContents"

/**
 * Privacy and terms, set as documents (28 Sept 2026; Vern: "privacy and
 * terms pages should look different too"). hubss.com sets its legal pages
 * as one centred column on near-black: a spaced-caps "LEGAL", the title, a
 * date, then "1. Heading" blocks between rules. These are Square One's
 * own documents on white: the label in the margin, a ledger of when and
 * what and who to ask, the contents in the margin column (the current
 * clause marked as you read), each clause's number in its own gutter, the
 * text at reading size. The words are the pages' own, unchanged.
 */

export interface LegalSection {
  /** "1. What we collect" — the number is split off and set in the gutter. */
  heading: string
  /** Paragraphs split by blank lines; a block of "- " lines is a list; a
      block with single line breaks (an address) keeps its lines. */
  body: string
}

interface Props {
  title: string
  updated: string
  applies: string
  lede: React.ReactNode
  sections: LegalSection[]
  other: { href: string; label: string }
}

function split(heading: string): { n: string; title: string } {
  const m = /^(\d+)\.\s*(.*)$/.exec(heading)
  return m ? { n: m[1], title: m[2] } : { n: "", title: heading }
}

/** An email or a phone number in the contact block becomes a link. */
function Linked({ text }: { text: string }) {
  const t = text.trim()
  if (/^[^\s@]+@[^\s@]+\.[a-z]+$/i.test(t)) return <a href={`mailto:${t}`}>{t}</a>
  const digits = t.replace(/\D/g, "")
  if (/^[\d-]+$/.test(t) && (digits.length === 10 || digits.length === 11)) {
    return <a href={`tel:+${digits.length === 10 ? "1" + digits : digits}`}>{t}</a>
  }
  return <>{text}</>
}

function Blocks({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/)
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n")
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="legal-list">
              {lines.map((l) => (
                <li key={l}>{l.slice(2)}</li>
              ))}
            </ul>
          )
        }
        if (lines.length > 1) {
          return (
            <p key={i} className="legal-address">
              {lines.map((l, j) => (
                <span key={j} className="block">
                  {l.split(" | ").map((seg, k) => (
                    <span key={k}>
                      {k > 0 && <span className="legal-sep"> · </span>}
                      <Linked text={seg} />
                    </span>
                  ))}
                </span>
              ))}
            </p>
          )
        }
        return <p key={i}>{block}</p>
      })}
    </>
  )
}

export default function LegalDocument({ title, updated, applies, lede, sections, other }: Props) {
  const items = sections.map((s) => ({ ...split(s.heading), body: s.body }))
  const toc = items.map((it, i) => ({ id: `clause-${it.n || i + 1}`, n: it.n, title: it.title }))

  return (
    <main className="legal bg-surface">
      {/* ── The head: label in the margin, the title, the ledger, the lede ──────── */}
      <header className="container-1280 pt-[calc(var(--bar-h)+64px)] pb-14 max-[700px]:pt-[calc(var(--bar-h)+36px)] max-[700px]:pb-10">
        <div className="grid grid-cols-12 gap-x-12 gap-y-4 max-[900px]:grid-cols-1">
          <div className="col-span-3 max-[900px]:col-span-1">
            <span className="label label-sq label-page pt-3">Legal</span>
          </div>
          <div className="col-span-9 max-[900px]:col-span-1">
            <h1 className="max-w-[18ch]">{title}</h1>
            <dl className="legal-meta">
              <div>
                <dt>Last updated</dt>
                <dd>{updated}</dd>
              </div>
              <div>
                <dt>Applies to</dt>
                <dd>{applies}</dd>
              </div>
              <div>
                <dt>Questions</dt>
                <dd>
                  <a href="mailto:office@squareonepaving.com">office@squareonepaving.com</a>
                </dd>
              </div>
            </dl>
            <div className="lede legal-lede">{lede}</div>
          </div>
        </div>
      </header>

      {/* ── The contents in the margin; the clauses beside them ──────── */}
      <div className="container-1280 grid grid-cols-12 gap-x-12 gap-y-8 pb-28 max-[900px]:grid-cols-1 max-[700px]:pb-20">
        <div className="col-span-3 max-[900px]:col-span-1">
          <LegalContents items={toc} other={other} />
        </div>

        <article className="legal-body col-span-9 max-[900px]:col-span-1">
          {items.map((it, i) => (
            <section key={toc[i].id} id={toc[i].id} className="legal-clause" aria-labelledby={`${toc[i].id}-h`}>
              <span className="legal-num" aria-hidden="true">
                {it.n}
              </span>
              <div className="min-w-0">
                <h2 id={`${toc[i].id}-h`} className="legal-h">
                  <span className="sr-only">{it.n ? `${it.n}. ` : ""}</span>
                  {it.title}
                </h2>
                <div className="legal-text">
                  <Blocks body={it.body} />
                </div>
              </div>
            </section>
          ))}

          <div className="legal-end">
            <Link href={other.href} className="link">
              {other.label}
            </Link>
            <Link href="/contact" className="link">
              Contact the office
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
