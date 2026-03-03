import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-black text-ink-800 mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-ink-100 mb-3">
          Article Not Found
        </h1>
        <p className="font-sans text-ink-500 mb-8 max-w-sm mx-auto">
          The article you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm bg-gold-400 text-ink-950 px-6 py-3 rounded-lg font-medium hover:bg-gold-500 transition-colors"
        >
          Back to All Articles
        </Link>
      </div>
    </div>
  );
}
