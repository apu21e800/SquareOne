import { groq } from "next-sanity"
import { editAttr, inDraftMode, sanityFetch, urlFor, type SanityImageSource } from "@/sanity/lib/client"
import { OPENER_BY_PAGE, type OpenerDefault } from "@/lib/openers"
import type { Slide } from "@/lib/hero-slides"
import { focalPosition, isCropped } from "@/lib/focal"
import { mergeAboutCopy, mergeContactCopy, mergeDrivewaysCopy, mergeHomeCopy, type AboutCopy, type ContactCopy, type DrivewaysCopy, type HomeCopy } from "@/lib/page-copy"

/**
 * The home page's hero and every page's opener, as the Studio has them
 * (9 Oct 2026). Server-only.
 *
 * Each field the office fills in wins; a field left empty keeps what the page
 * shows today (lib/openers.ts, lib/hero-slides.ts), and with no CMS, or when
 * Sanity can't be reached, the page is exactly as it was. A photograph the
 * Studio holds that is the page's own file (the seed copied them in, matched
 * by original file name, uncropped) is served from the site as before, so a
 * page nobody has touched is byte for byte the page it was. A new photograph
 * comes from Sanity's CDN with its own words: never the old photograph's
 * caption. Dragging the focal point in the Studio sets the crop on the page.
 */

interface ImageField {
  asset?: { _ref: string }
  crop?: { top?: number; bottom?: number; left?: number; right?: number }
  hotspot?: { x?: number; y?: number }
}

export interface PageHeroDoc {
  _id?: string
  _type?: string
  page?: string
  image?: ImageField
  /** The image asset's original file name (the seed stored it URL-encoded). */
  file?: string
  alt?: string
  caption?: string
  headline?: string
  headlineEnd?: string
  line?: string
}

export interface HomeDoc {
  _id?: string
  _type?: string
  headline?: string
  headlineEnd?: string
  line?: string
  reel?: { _key?: string; image?: ImageField; file?: string; alt?: string; caption?: string }[]
}

/** What a page's opener renders. `fit` is the headline as plain text, for sizing. */
export interface OpenerView {
  src: string
  alt: string
  caption?: string
  position?: string
  head: string
  tail?: string
  lede?: string
  fit: string
  /** True when the Studio wrote the headline; pages whose own headline is not head + ending use it. */
  headlineSet: boolean
  /** Edit on the page (14 Oct 2026): makes the photograph open its field, in an editor's preview only. */
  edit?: string
}

const text = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v.trim() : undefined)

function decoded(name: string): string {
  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}

const baseName = (src: string) => decoded(src.split("/").pop() ?? "")
const cropped = (c?: ImageField["crop"]) => isCropped(c)
const ownFile = (src: string, file: string | undefined, image: ImageField) => Boolean(file) && !cropped(image.crop) && baseName(src) === decoded(file as string)

/**
 * The focal point the office dragged, as CSS object-position on the
 * photograph as served: inside the crop, when there is one (lib/focal.ts).
 */
export function hotspotPosition(h?: ImageField["hotspot"], crop?: ImageField["crop"]): string | undefined {
  return focalPosition(h, crop)
}

const cdn = (image: ImageField, width = 2400) => urlFor(image as SanityImageSource, width)

/** One opener: the page's own, with whatever the Studio says on top. */
export function mergeOpener(d: OpenerDefault, doc: PageHeroDoc | null | undefined): OpenerView {
  let { src, alt, caption, position } = d
  if (doc?.image?.asset) {
    const own = ownFile(d.src, doc.file, doc.image)
    src = own ? d.src : cdn(doc.image)
    alt = text(doc.alt) ?? (own ? d.alt : [d.head, d.tail].filter(Boolean).join(" "))
    caption = text(doc.caption) ?? (own ? d.caption : undefined)
    position = hotspotPosition(doc.image.hotspot, doc.image.crop) ?? (own ? d.position : "center")
  } else if (doc) {
    alt = text(doc.alt) ?? d.alt
    caption = text(doc.caption) ?? d.caption
  }
  const custom = Boolean(text(doc?.headline) || text(doc?.headlineEnd))
  const head = custom ? (text(doc?.headline) ?? "") : d.head
  const tail = custom ? text(doc?.headlineEnd) : d.tail
  const lede = text(doc?.line) ?? d.lede
  return { src, alt, caption, position, head, tail, lede, fit: [head, tail].filter(Boolean).join(" "), headlineSet: custom }
}

/** The home reel and words: the site's own, with the Studio's on top. */
export function mergeHome(builtIn: Slide[], doc: HomeDoc | null | undefined): { slides?: Slide[]; title?: string; titleEnd?: string; line?: string } {
  const out: { slides?: Slide[]; title?: string; titleEnd?: string; line?: string } = {}
  const reel = (doc?.reel ?? []).filter((s) => s?.image?.asset)
  if (reel.length) {
    out.slides = reel.map((s) => {
      const image = s.image as ImageField
      const own = builtIn.find((b) => ownFile(b.src, s.file, image))
      const position = hotspotPosition(image.hotspot, image.crop)
      if (own) {
        const slide: Slide = { ...own, alt: text(s.alt) ?? own.alt, position: position ?? own.position }
        const caption = text(s.caption)
        return caption ? { ...slide, caption } : slide
      }
      return { src: cdn(image), alt: text(s.alt) ?? "", place: "", system: "", position: position ?? "center", caption: text(s.caption) ?? "" }
    })
  }
  if (text(doc?.headline) || text(doc?.headlineEnd)) {
    out.title = text(doc?.headline) ?? ""
    out.titleEnd = text(doc?.headlineEnd)
  }
  out.line = text(doc?.line)
  return out
}

const IMAGE = `image{ asset, crop, hotspot }, "file": image.asset->originalFilename`

const OPENERS_QUERY = groq`*[_type == "pageHero" && defined(page)] | order(_updatedAt desc) { _id, _type, page, ${IMAGE}, alt, caption, headline, headlineEnd, line }`

const HOME_QUERY = groq`*[_type == "homePage" && _id == "homePage"][0]{ _id, _type, headline, headlineEnd, line, "reel": reel[]{ _key, image{ asset, crop, hotspot }, "file": image.asset->originalFilename, alt, caption } }`

/** Every opener the Studio holds, by page (one query, cached 60 s with the rest). */
async function openerDocs(): Promise<Map<string, PageHeroDoc>> {
  const docs = await sanityFetch<PageHeroDoc[]>(OPENERS_QUERY, {}, ["sanity", "pages"])
  const byPage = new Map<string, PageHeroDoc>()
  for (const d of docs ?? []) if (d.page && !byPage.has(d.page)) byPage.set(d.page, d)
  return byPage
}

/** The Studio's opener for one page, or null: for pages whose own opener comes from their record. */
export async function getOpenerDoc(page: string): Promise<PageHeroDoc | null> {
  return (await openerDocs()).get(page) ?? null
}

/**
 * An opener as a page has it (its own, from lib/openers.ts or the page's
 * record), with the Studio's on top; in an editor's preview the photograph
 * also opens its field (14 Oct 2026).
 */
export async function openerFor(d: OpenerDefault): Promise<OpenerView> {
  const doc = await getOpenerDoc(d.page)
  const view = mergeOpener(d, doc)
  const edit = editAttr(await inDraftMode(), doc, "image")
  return edit ? { ...view, edit } : view
}

/** A page's opener, its own (lib/openers.ts) with the Studio's on top. */
export async function getPageOpener(page: string): Promise<OpenerView> {
  const d = OPENER_BY_PAGE[page]
  if (!d) throw new Error(`no built-in opener for ${page} (lib/openers.ts)`)
  return openerFor(d)
}

/** The home hero, the site's own reel and words with the Studio's on top. */
export async function getHomeHero(builtIn: Slide[]) {
  const doc = await sanityFetch<HomeDoc | null>(HOME_QUERY, {}, ["sanity", "pages"])
  const out = mergeHome(builtIn, doc)
  // Edit on the page (14 Oct 2026): in an editor's preview each photograph
  // opens its own entry in the reel; the site's own reel opens the reel
  // field, where photographs are added. Never on the published site.
  if (await inDraftMode()) {
    const home = doc?._id ? doc : { _id: "homePage", _type: "homePage" }
    const keys = (doc?.reel ?? []).filter((s) => s?.image?.asset).map((s) => s._key)
    const field = (i: number) => (keys[i] ? `reel[_key=="${keys[i]}"].image` : "reel")
    const fromStudio = Boolean(out.slides)
    out.slides = (out.slides ?? builtIn).map((s, i) => ({ ...s, edit: editAttr(true, home, fromStudio ? field(i) : "reel") }))
  }
  return out
}

/* ------------------------------------------------------------------
   The words below the openers (14 Oct 2026, lib/page-copy.ts): the home
   page's sections and the about, contact and driveways pages, each the
   site's own with the Studio's on top, field by field.
   ------------------------------------------------------------------ */

const COPY_QUERY = groq`*[_id == $id][0]`

async function copyDoc(id: string): Promise<Record<string, unknown> | null> {
  return sanityFetch<Record<string, unknown> | null>(COPY_QUERY, { id }, ["sanity", "pages"])
}

export async function getHomeCopy(): Promise<HomeCopy> {
  return mergeHomeCopy(await copyDoc("homePage"))
}

export async function getAboutCopy(): Promise<AboutCopy> {
  return mergeAboutCopy(await copyDoc("aboutPage"))
}

export async function getContactCopy(): Promise<ContactCopy> {
  return mergeContactCopy(await copyDoc("contactPage"))
}

export async function getDrivewaysCopy(): Promise<DrivewaysCopy> {
  return mergeDrivewaysCopy(await copyDoc("drivewaysPage"))
}
