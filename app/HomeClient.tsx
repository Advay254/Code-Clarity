"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import { Post } from "@/lib/directus";

interface HomeClientProps {
  posts: Post[];
  allTags: string[];
  blogName: string;
  blogDescription: string;
}

export default function HomeClient({ posts, allTags, blogName, blogDescription }: HomeClientProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);
  const displayPosts = filteredPosts ?? posts;

  return (
    <div className="min-h-screen bg-ink-950">
      <Header />

      <main className="pt-28 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <div className="text-center mb-16 fade-up fade-up-delay-1">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold-400" />
            <span className="font-sans text-xs text-gold-400 tracking-[0.3em] uppercase">
              {blogName}
            </span>
            <div className="h-px w-12 bg-gold-400" />
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl text-ink-50 leading-tight mb-4">
            {blogDescription}
          </h1>
          <p className="font-sans text-ink-400 text-lg max-w-xl mx-auto">
            {posts.length} article{posts.length !== 1 ? "s" : ""} published
          </p>
        </div>

        <div className="gold-divider mb-12" />

        {/* Ad Banner Top */}
        <AdBanner slot="1234567890" format="horizontal" className="mb-12" label="Advertisement" />

        {/* Search */}
        <SearchBar
          posts={posts}
          onResults={setFilteredPosts}
          allTags={allTags}
        />

        {/* Results count when searching */}
        {filteredPosts !== null && (
          <p className="text-center font-sans text-sm text-ink-500 mb-8">
            {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Posts Grid */}
        {displayPosts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-ink-600 italic mb-3">No articles found</p>
            <p className="font-sans text-sm text-ink-700">Try a different search term or tag</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <>
                <PostCard key={post.id} post={post} index={index} />
                {/* Inject ad every 6 posts */}
                {(index + 1) % 6 === 0 && index !== displayPosts.length - 1 && (
                  <div key={`ad-${index}`} className="sm:col-span-2 lg:col-span-3">
                    <AdBanner slot="0987654321" format="horizontal" label="Advertisement" />
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
