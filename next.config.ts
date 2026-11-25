import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "26mb" } },
  // Cloudflare Workers can hang while rendering with Cache Components enabled.
  cacheComponents: false,
  allowedDevOrigins: [
    "100.92.217.5",
    "100.92.217.5:3000",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
  async redirects() {
    return [
      { source: "/admission", destination: "/admissions", permanent: true },
      { source: "/administration", destination: "/about#leadership", permanent: true },
      { source: "/events", destination: "/stories", permanent: true },
      { source: "/events/nexora-2k26", destination: "/stories/nexora-fest-inter-school-tech-cultural-summit", permanent: true },
      { source: "/events/sports-day", destination: "/stories/annual-sports-meet-athlos-celebrates-athletic-brilliance", permanent: true },
      { source: "/events/environment-day", destination: "/stories/environment-day-greenery-plantation-drive", permanent: true },
      { source: "/events/childrens-day", destination: "/stories/childrens-day-commemoration-cultural-assemblies", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
