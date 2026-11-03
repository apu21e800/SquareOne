import { getPosts } from "@/lib/blog"
import { pinnedFirst } from "@/lib/pin"
import BlogFeedGrid from "./BlogFeedGrid"

/**
 * The home page's three articles. Not on the home page since 28 Sept 2026
 * ("cut the fat"; app/page.tsx); kept, with the pin, for the day it is back.
 */
export default async function BlogFeed() {
  // The pinned post first (lib/pin.ts), then the newest: three in all.
  const posts = pinnedFirst(await getPosts()).slice(0, 3)
  if (posts.length === 0) return null
  return <BlogFeedGrid posts={posts} />
}
