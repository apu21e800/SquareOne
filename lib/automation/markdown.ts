/**
 * Markdown → Portable Text for the blog body (sanity/schemaTypes/blockContent.ts):
 * paragraphs, "## " and "### " headings, "> " pull quotes, bullet and numbered
 * lists, **bold**, *italic* and [links](/path). The same conversion the seed
 * uses for the imported posts (scripts/cms-seed.ts), kept here because the
 * seed is a one-off script with side effects and cannot be imported.
 *
 * The drafters write no photographs and no HTML; anything else is kept as
 * plain text rather than guessed at.
 */

export type Span = { _type: "span"; _key: string; text: string; marks: string[] }
export type LinkDef = { _type: "link"; _key: string; href: string }
export type PortableBlock = {
  _type: "block"
  _key: string
  style: "normal" | "h2" | "h3" | "blockquote"
  listItem?: "bullet" | "number"
  level?: number
  children: Span[]
  markDefs: LinkDef[]
}

/** Markdown body → Portable Text blocks. `prefix` keeps keys unique within one document. */
export function toPortableText(md: string, prefix = "k"): PortableBlock[] {
  let n = 0
  const key = () => `${prefix}${(n++).toString(36)}`

  const spans = (text: string, markDefs: LinkDef[]): Span[] => {
    const out: Span[] = []
    const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)|(\[([^\]]+)\]\(([^)\s]+)\))/g
    let last = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(text))) {
      if (m.index > last) out.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] })
      if (m[2]) out.push({ _type: "span", _key: key(), text: m[2], marks: ["strong"] })
      else if (m[4]) out.push({ _type: "span", _key: key(), text: m[4], marks: ["em"] })
      else if (m[6]) out.push({ _type: "span", _key: key(), text: m[6], marks: ["em"] })
      else if (m[8]) {
        const def: LinkDef = { _type: "link", _key: key(), href: m[9] }
        markDefs.push(def)
        out.push({ _type: "span", _key: key(), text: m[8], marks: [def._key] })
      }
      last = m.index + m[0].length
    }
    if (last < text.length) out.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] })
    return out.length ? out : [{ _type: "span", _key: key(), text: "", marks: [] }]
  }

  const block = (style: PortableBlock["style"], text: string, listItem?: "bullet" | "number"): PortableBlock => {
    const markDefs: LinkDef[] = []
    const children = spans(text.trim(), markDefs)
    return { _type: "block", _key: key(), style, ...(listItem ? { listItem, level: 1 } : {}), children, markDefs }
  }

  const blocks: PortableBlock[] = []
  let para: string[] = []
  const flush = () => {
    if (para.length) blocks.push(block("normal", para.join(" ")))
    para = []
  }
  for (const raw of md.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flush()
      continue
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line)
    if (h) {
      flush()
      blocks.push(block(h[1].length <= 2 ? "h2" : "h3", h[2]))
      continue
    }
    const bullet = /^\s*[-*]\s+(.*)$/.exec(line)
    if (bullet) {
      flush()
      blocks.push(block("normal", bullet[1], "bullet"))
      continue
    }
    const num = /^\s*\d+\.\s+(.*)$/.exec(line)
    if (num) {
      flush()
      blocks.push(block("normal", num[1], "number"))
      continue
    }
    const quote = /^>\s?(.*)$/.exec(line)
    if (quote) {
      flush()
      blocks.push(block("blockquote", quote[1]))
      continue
    }
    if (/^(---|\*\*\*)$/.test(line.trim())) {
      flush()
      continue
    }
    para.push(line.trim())
  }
  flush()
  return blocks
}

/** Portable Text → plain text, one block per line (for prompts and word counts). */
export function portableToText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ""
  const lines: string[] = []
  for (const b of blocks as { _type?: string; style?: string; listItem?: string; children?: { text?: string }[] }[]) {
    if (b?._type !== "block" || !Array.isArray(b.children)) continue
    const text = b.children.map((c) => c.text ?? "").join("")
    const lead = b.style === "h2" ? "## " : b.style === "h3" ? "### " : b.listItem ? "- " : ""
    lines.push(lead + text)
  }
  return lines.join("\n\n")
}
