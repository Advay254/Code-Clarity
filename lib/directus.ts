import { createDirectus, rest, staticToken, readItems, readItem } from "@directus/sdk";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: "published" | "draft";
  date_published: string;
  tags: string[];
  read_time: number;
};

const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
  .with(staticToken(process.env.DIRECTUS_TOKEN!))
  .with(rest());

export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: { status: { _eq: "published" } },
        sort: ["-date_published"],
        fields: ["id", "slug", "title", "excerpt", "cover_image", "date_published", "tags", "read_time", "status"],
        limit: -1,
      })
    );
    return posts as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
        fields: ["id", "slug", "title", "excerpt", "content", "cover_image", "date_published", "tags", "read_time", "status"],
        limit: 1,
      })
    );
    return (posts[0] as Post) || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getRelatedPosts(currentSlug: string, tags: string[]): Promise<Post[]> {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: { _neq: currentSlug },
          status: { _eq: "published" },
        },
        sort: ["-date_published"],
        fields: ["id", "slug", "title", "excerpt", "cover_image", "date_published", "tags", "read_time"],
        limit: 3,
      })
    );
    return posts as Post[];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export function getImageUrl(fileId: string | null): string | null {
  if (!fileId) return null;
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${fileId}?width=800&quality=80`;
}

export function getImageUrlFull(fileId: string | null): string | null {
  if (!fileId) return null;
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${fileId}?width=1200&quality=85`;
}

export default directus;
