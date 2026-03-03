import Link from "next/link";
import Image from "next/image";
import { Post, getImageUrl } from "@/lib/directus";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const imageUrl = getImageUrl(post.cover_image);
  const delay = `fade-up-delay-${Math.min(index + 1, 4)}`;

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className={`post-card fade-up ${delay}`}>
        {/* Cover Image */}
        <div className="relative overflow-hidden rounded-lg aspect-[16/9] bg-ink-800 mb-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="post-image object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
              <span className="font-display text-4xl text-ink-600 font-black">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-ink-950/10 transition-colors duration-300" />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="tag-pill text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-ink-800 text-ink-300 border border-ink-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="font-display font-bold text-xl leading-snug text-ink-100 group-hover:text-gold-400 transition-colors duration-200 mb-2 line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="font-sans text-sm text-ink-400 leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs font-sans text-ink-500">
          <time dateTime={post.date_published}>
            {format(new Date(post.date_published), "MMM d, yyyy")}
          </time>
          <span>·</span>
          <span>{post.read_time || 5} min read</span>
        </div>
      </article>
    </Link>
  );
}
