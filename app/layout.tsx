import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_BLOG_NAME || "My Blog",
    template: `%s | ${process.env.NEXT_PUBLIC_BLOG_NAME || "My Blog"}`,
  },
  description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Thoughts, stories and ideas.",
  openGraph: {
    type: "website",
    siteName: process.env.NEXT_PUBLIC_BLOG_NAME || "My Blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en">
      <head>
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
