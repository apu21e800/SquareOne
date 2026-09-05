import Image from "next/image"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import { urlFor, type SanityImageSource } from "@/sanity/lib/client"

/**
 * Renders a CMS post body with the same prose styling the MDX posts get —
 * the surrounding `.prose` wrapper does the typography; this only maps the
 * two custom pieces (photographs with captions, links).
 */
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: SanityImageSource; alt?: string; caption?: string } }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
            <Image src={urlFor(value as SanityImageSource, 1600)} alt={value.alt ?? ""} fill sizes="(max-width: 760px) 100vw, 720px" className="object-cover" />
          </div>
          {value.caption && <figcaption className="label mt-3 normal-case tracking-normal">{value.caption}</figcaption>}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#"
      const external = /^https?:\/\//.test(href) && !href.includes("squareonepaving.c")
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined}>
          {children}
        </a>
      )
    },
  },
}

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
