export default function Footer() {
  const blogName = process.env.NEXT_PUBLIC_BLOG_NAME || "My Blog";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-ink-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="gold-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-ink-500 text-sm italic">
            © {year} {blogName}. All rights reserved.
          </p>
          <p className="font-sans text-ink-700 text-xs tracking-widest uppercase">
            Powered by curiosity
          </p>
        </div>
      </div>
    </footer>
  );
}
