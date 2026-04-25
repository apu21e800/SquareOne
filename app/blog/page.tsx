import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import BlogIndexClient from "@/components/blog/BlogIndexClient"

export const metadata: Metadata = {
  title: "Blog | Square One Paving",
  description: "Project guides, product insights, and real talk about decorative paving in BC.",
  alternates: { canonical: "https://squareonepaving.com/blog" },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogIndexClient posts={posts} />
}
