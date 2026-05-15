import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nxtgen-eemar-website",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "nxtgen-eemar-website-production.up.railway.app" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
};

export default nextConfig;
