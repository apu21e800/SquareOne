"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

/**
 * The contents of a legal document, in the margin column (components/
 * LegalDocument). It stays in view beside the clauses on a desktop and
 * marks the clause being read; on a phone it folds into one line above
 * the text.
 */
export default function LegalContents({
  items,
  other,
}: {
  items: { id: string; n: string; title: string }[]
  other: { href: string; label: string }
}) {
  const [active, setActive] = useState(items[0]?.id ?? "")

  // The clause being read = the last one whose heading has passed a third
  // of the way down the window. A scroll listener rather than an observer:
  // the answer is the same at any window height, and at the top of the page
  // it is always the first clause.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.33
      let current = items[0]?.id ?? ""
      for (const it of items) {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= line) current = it.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [items])

  const list = (
    <ol className="legal-toc-list">
      {items.map((it) => (
        <li key={it.id}>
          <a href={`#${it.id}`} data-active={active === it.id || undefined} aria-current={active === it.id ? "location" : undefined}>
            <span className="legal-toc-n">{it.n}</span>
            <span>{it.title}</span>
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <nav aria-label="Contents" className="legal-toc">
      <div className="max-[900px]:hidden">
        <span className="label">Contents</span>
        {list}
        <div className="legal-toc-foot">
          <Link href={other.href} className="link">
            {other.label}
          </Link>
        </div>
      </div>
      <details className="legal-toc-fold min-[901px]:hidden">
        <summary>
          <span className="label">Contents</span>
          <span className="legal-toc-count">{items.length} sections</span>
        </summary>
        {list}
      </details>
    </nav>
  )
}
