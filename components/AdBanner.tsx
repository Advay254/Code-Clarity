"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdBannerProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (adsenseId && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [adsenseId]);

  // If no AdSense ID configured, show placeholder
  if (!adsenseId || adsenseId === "ca-pub-XXXXXXXXXXXXXXXXX") {
    return (
      <div className={`ad-container w-full h-24 ${className}`}>
        <span>{label} · AdSense</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <p className="text-xs font-sans text-ink-600 uppercase tracking-widest text-center mb-1">
        {label}
      </p>
      <ins
        className="adsbygoogle block"
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        style={{ display: "block" }}
      />
    </div>
  );
}
