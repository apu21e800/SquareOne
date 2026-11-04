import { getPosts } from "@/lib/blog"
import { pinnedFirst } from "@/lib/pin"
import BlogFeedGrid from "./BlogFeedGrid"

/**
 * The home page's three articles: off it from 28 Sept 2026 ("cut the fat")
 * to 3 Nov 2026 (Vern: "add the blog page section to the homepage").
 */
export default async function BlogFeed() {
  // The pinned post first (lib/pin.ts), then the newest: three in all.
  const posts = pinnedFirst(await getPosts()).slice(0, 3)
  if (posts.length === 0) return null
  return <BlogFeedGrid posts={posts} />
}
