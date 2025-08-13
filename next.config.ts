import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["rss-parser", "gray-matter", "remark", "remark-html"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ichef.bbci.co.uk" },
      { protocol: "https", hostname: "www.aljazeera.com" },
      { protocol: "https", hostname: "aljazeera.com" },
      { protocol: "https", hostname: "i.guim.co.uk" },
      { protocol: "https", hostname: "static01.nyt.com" },
      { protocol: "https", hostname: "a.espncdn.com" },
      { protocol: "https", hostname: "s.espncdn.com" },
      { protocol: "https", hostname: "assets.guim.co.uk" },
      { protocol: "https", hostname: "media.guim.co.uk" },
      { protocol: "https", hostname: "media.newyorker.com" },
      { protocol: "https", hostname: "gulfnews.com" },
      { protocol: "https", hostname: "*.nyt.com" },
      { protocol: "https", hostname: "*.bbci.co.uk" },
      { protocol: "https", hostname: "*.espn.com" },
    ],
  },
};

export default nextConfig;
