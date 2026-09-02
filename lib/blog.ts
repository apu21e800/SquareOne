import fs from "fs"
import { heroFor } from "./gallery"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

/**
 * Lede photographs for the grandfathered posts, keyed by slug. The post
 * bodies and front-matter are never edited (they are the record as Square One
 * published it), so the honest photograph for each is fixed here instead:
 * every path below is a Square One photograph of the project the post is
 * about, from the S1 archive. A slug mapped to "" runs without a lede — the
 * only picture on file was of a different site. Posts not listed keep their
 * front-matter image.
 */
const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"
const CROSSWALKS = "/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Galleries/Crosswalks/Gallery"
const TP_GALLERY = "/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Product%20Pages/TrafficPatterns/Gallery"

const LEDE: Record<string, string> = {
  "boundary-road-pump-station": `${FIO}/Photo-2023-07-05-11-22-34-AM.jpg`,
  "bowen-island-stamped-asphalt-walkway": `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg`,
  "brewers-park-streetbond-installation": "",
  "cesqenele-elementary-labyrinth": `${FIO}/Labyrinth-Maple-Ridge-c%CC%93%C9%99sq%C9%99nel%C9%99-Elementary-2-scaled-1.jpg`,
  "checkerboard-crosswalks-coquitlam": `${CROSSWALKS}/TrafficPatterns%20%20Custom%20Decorative%20Checker%20Crosswalk%2C%20Coquitlam%20BC.png`,
  "decorative-asphalt-for-rutland-centennial-park-kelowna": `${FIO}/Rutland-Park-Kelowna-DecoMark-StreetBond.jpg`,
  "decorative-asphalt-plaza": `${FIO}/decorative-asphalt-design-1.jpg`,
  "decorative-asphalt-sidewalk-for-langley-housing-development": `${FIO}/Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
  "decorative-paving-stamped-asphalt": `${FIO}/decorative-crosswalk-with-stamped-asphalt-at-granville-island-brewery-crosswalk-sign-scaled-1-2048x1536.jpg`,
  "every-child-matters-new-westminster": `${FIO}/Photo-2023-09-22-1-50-34-PM.jpg`,
  "first-nations-crosswalk-design-granville-street": `${FIO}/TrafficPatterns-Robyn-Sparrow-Design-Granville-68th-Vancouver-BC.jpg`,
  "joyce-skytrain-art-installation": "/images/projects/joyce-skytrain-art-installation/joyce-collingwood-station-plaza-streetbond-01.jpg",
  "keswick-waterpark-burnaby": `${FIO}/keswick-splash-water-park-burnaby-canada-3.png`,
  "langley-events-centre-streetbond": `${FIO}/Langley-event-3-2048x1536.jpg`,
  "little-italy-vancouver-crosswalks": "/images/applications/commercial-spaces/little-italy-aerial-colourful-intersection-01.jpg",
  "mission-bc-streetscape": `${FIO}/Photo-2025-04-03-1-57-51-PM-scaled.jpg`,
  "north-vancouver-maplewoods-decorative-fire-lane": `${FIO}/Photo-2023-05-19-5-56-47%E2%80%AFPM-scaled%20%281%29.jpg`,
  "pictograph-crosswalk-sechelt": `${CROSSWALKS}/TrafficPatterns%20Custom%20Decorative%20Crosswalk%2C%20Sechelt%20BC.png`,
  "rainbow-crosswalk-squamish": `${CROSSWALKS}/TrafficPatterns%20%20Custom%20Decorative%20Crosswalk%2C%20Squamish%20BC.png`,
  "ralphs-farm-market-decorative-parking-lot": `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg`,
  "richmond-brighouse-translink": `${FIO}/IMG_3178-scaled-e1590114559108.jpeg`,
  "school-crosswalk-for-high-visibility": `${FIO}/visible-school-crosswalk-for-safety-6.jpg`,
  "south-langford-elementary": `${FIO}/Photo-2025-09-25-3-48-33-PM-scaled.jpg`,
  "sport-court-asphalt-paving": `${FIO}/StreetBond-Sports-Court-Brookmere-Park-Coquitlam-BC.jpg`,
  "ubc-musqueam-crosswalk": `${FIO}/UBC-crosswalk-3-300dpi.jpg`,
  "victoria-harbour-walkway": `${FIO}/StreetBond-Harbour-Walkway-Victoria-BC.jpg`,
  "white-rock-crosswalk": `${FIO}/Whiterock-Pier-Crosswalk-TrafficPatternsXD-1-scaled.jpg`,
  "windsor-gate-townhouse-driveway-2": `${FIO}/StreetPrint-%E2%80%94-Stamped-Asphalt-Decorative-Crosswalk-Windsor-Gate.jpg`,
  "windsor-gate-townhouse-driveway": "/images/projects/windsor-gate-coquitlam/windsor-gate-crosswalk-streetprint-03.jpg",
  // Front-matter pointed at wp-content URLs that 404 on the live WordPress site —
  // the archive holds one honest match; the rest run without a lede until Gord
  // sends the photograph.
  "traffic-pattern-crosswalk-upgrade-for-tsain-ko-centre": `${TP_GALLERY}/TrafficPatterns%20Decorative%20Crosswalk%2C%20Sechelt%20BC.jpg`,
  "lickman-interchange": "",
  "new-westminster-oxford-townhomes": "",
  "parc-riviera-mews-streetbond-asphalt-walkway": "",
  "townhouse-driveway-natures-walk": "",
  "tsuyuki-park-maple-ridge": "",
  "wesburn-water-park-burnaby": "",
  "west-vancouver-rainbow-crosswalk": "",
}

function ledeFor(slug: string, frontMatter?: string): string {
  if (slug in LEDE) return LEDE[slug]
  return heroFor("blog", slug, frontMatter) ?? ""
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  featured_image: string
  tags: string[]
  content: string
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
}

export function getAllPosts(): BlogPostMeta[] {
  const files = ensureBlogDir()

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
      const { data } = matter(raw)

      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        author: data.author ?? "Square One Paving",
        category: data.category ?? "",
        featured_image: ledeFor(slug, data.featured_image),
        tags: data.tags ?? [],
      } satisfies BlogPostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filePath) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Square One Paving",
    category: data.category ?? "",
    featured_image: ledeFor(slug, data.featured_image),
    tags: data.tags ?? [],
    content,
  }
}
