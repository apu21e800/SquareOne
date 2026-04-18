import { getAllPosts } from "@/lib/blog"
import BlogFeedGrid from "./BlogFeedGrid"

export default function BlogFeed() {
  const posts = getAllPosts().slice(0, 3)
  if (posts.length === 0) return null
  return <BlogFeedGrid posts={posts} />
}
