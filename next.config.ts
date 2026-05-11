import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nxtgen-eemar-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
