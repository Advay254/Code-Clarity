"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const blogName = process.env.NEXT_PUBLIC_BLOG_NAME || "My Blog";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/95 backdrop-blur-md border-b border-ink-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 bg-gold-400 flex items-center justify-center">
              <span className="font-display font-black text-ink-950 text-sm leading-none">
                {blogName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-display font-semibold text-ink-50 text-lg tracking-wide group-hover:text-gold-400 transition-colors">
              {blogName}
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="font-sans text-sm text-ink-300 hover:text-gold-400 transition-colors tracking-wide"
            >
              Articles
            </Link>
            <Link
              href="/about"
              className="font-sans text-sm text-ink-300 hover:text-gold-400 transition-colors tracking-wide"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
