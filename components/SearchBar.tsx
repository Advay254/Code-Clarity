"use client";

import { useState, useCallback } from "react";
import { Post } from "@/lib/directus";

interface SearchBarProps {
  posts: Post[];
  onResults: (filtered: Post[] | null) => void;
  allTags: string[];
}

export default function SearchBar({ posts, onResults, allTags }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleSearch = useCallback(
    (searchQuery: string, tag: string | null) => {
      if (!searchQuery && !tag) {
        onResults(null);
        return;
      }

      const filtered = posts.filter((post) => {
        const matchesQuery = searchQuery
          ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
          : true;

        const matchesTag = tag ? post.tags?.includes(tag) : true;

        return matchesQuery && matchesTag;
      });

      onResults(filtered);
    },
    [posts, onResults]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    handleSearch(val, activeTag);
  };

  const handleTagClick = (tag: string) => {
    const newTag = activeTag === tag ? null : tag;
    setActiveTag(newTag);
    handleSearch(query, newTag);
  };

  const handleClear = () => {
    setQuery("");
    setActiveTag(null);
    onResults(null);
  };

  return (
    <div className="mb-12 fade-up fade-up-delay-2">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-ink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search articles, topics, keywords..."
          className="w-full bg-ink-900 border border-ink-700 rounded-xl pl-12 pr-12 py-3.5 text-ink-100 font-sans text-sm placeholder-ink-600 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all"
        />
        {(query || activeTag) && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-4 flex items-center text-ink-500 hover:text-gold-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag-pill text-xs font-sans font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeTag === tag
                  ? "bg-gold-400 text-ink-950 border-gold-400"
                  : "bg-ink-900 text-ink-400 border-ink-700 hover:border-gold-400 hover:text-gold-400"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
