import { getAllPosts } from "@/lib/directus";
import HomeClient from "./HomeClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const posts = await getAllPosts();

  // Extract all unique tags across all posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort();

  const blogName = process.env.NEXT_PUBLIC_BLOG_NAME || "My Blog";
  const blogDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Thoughts, stories and ideas.";

  return (
    <HomeClient
      posts={posts}
      allTags={allTags}
      blogName={blogName}
      blogDescription={blogDescription}
    />
  );
}
