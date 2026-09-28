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

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const els = items.map((it) => document.getElementById(it.id)).filter((e): e is HTMLElement => e !== null)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
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
