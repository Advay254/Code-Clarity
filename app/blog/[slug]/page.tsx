import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts, getPostBySlug, getRelatedPosts, getImageUrlFull } from "@/lib/directus";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const imageUrl = getImageUrlFull(post.cover_image);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date_published,
      url: `${siteUrl}/blog/${post.slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    getPostBySlug(slug),
    getPostBySlug(slug).then((p) =>
      p ? getRelatedPosts(p.slug, p.tags || []) : []
    ),
  ]);

  if (!post) notFound();

  const imageUrl = getImageUrlFull(post.cover_image);

  return (
    <div className="min-h-screen bg-ink-950">
      <Header />

      <main className="pt-20">
        {/* Hero Image */}
        {imageUrl && (
          <div className="relative w-full h-64 sm:h-96 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

          {/* Back Link */}
          <div className="pt-8 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-sm text-ink-500 hover:text-gold-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All Articles
            </Link>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-ink-800 text-gold-400 border border-gold-400/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display font-black text-3xl sm:text-5xl text-ink-50 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm font-sans text-ink-500 mb-8 pb-8 border-b border-ink-800">
            <time dateTime={post.date_published}>
              {format(new Date(post.date_published), "MMMM d, yyyy")}
            </time>
            <span>·</span>
            <span>{post.read_time || 5} min read</span>
          </div>

          {/* Ad Top */}
          <AdBanner slot="1122334455" format="horizontal" className="mb-10" label="Advertisement" />

          {/* Content */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Ad Middle - rendered after content if content is long */}
          <div className="my-12">
            <AdBanner slot="5544332211" format="rectangle" label="Advertisement" />
          </div>

          {/* Tags footer */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-ink-800">
              <p className="font-sans text-xs text-ink-600 uppercase tracking-widest mb-3">Tagged</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill text-xs font-sans font-medium px-3 py-1.5 rounded-full bg-ink-900 text-ink-400 border border-ink-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="border-t border-ink-800 mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-gold-400" />
                  <span className="font-sans text-xs text-gold-400 tracking-[0.3em] uppercase">
                    Continue Reading
                  </span>
                  <div className="h-px w-8 bg-gold-400" />
                </div>
                <h2 className="font-display font-bold text-2xl text-ink-100">More Articles</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((relatedPost, index) => {
                  const relImg = getImageUrlFull(relatedPost.cover_image);
                  return (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                      <article className="post-card">
                        <div className="relative overflow-hidden rounded-lg aspect-[16/9] bg-ink-800 mb-4">
                          {relImg ? (
                            <Image src={relImg} alt={relatedPost.title} fill className="post-image object-cover" sizes="33vw" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-ink-900">
                              <span className="font-display text-3xl text-ink-700 font-black">{relatedPost.title.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-lg text-ink-100 group-hover:text-gold-400 transition-colors line-clamp-2 mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="font-sans text-xs text-ink-500">
                          {format(new Date(relatedPost.date_published), "MMM d, yyyy")}
                        </p>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Ad Bottom */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <AdBanner slot="9988776655" format="horizontal" label="Advertisement" />
        </div>
      </main>

      <Footer />
    </div>
  );
    }
                                
