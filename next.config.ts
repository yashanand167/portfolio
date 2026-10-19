import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "get.mailgauge.app" },
      { protocol: "https", hostname: "kylp-mu.vercel.app" },
      { protocol: "https", hostname: "asknow.vercel.app" },
    ],
  },
};

export default nextConfig;
