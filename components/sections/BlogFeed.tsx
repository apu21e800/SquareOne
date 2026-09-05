import { getPosts } from "@/lib/blog"
import BlogFeedGrid from "./BlogFeedGrid"

export default async function BlogFeed() {
  const posts = (await getPosts()).slice(0, 3)
  if (posts.length === 0) return null
  return <BlogFeedGrid posts={posts} />
}
