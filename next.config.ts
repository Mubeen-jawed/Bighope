import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: `output: "export"` was removed. The site now runs as a normal
  // Next.js app on Vercel so it can fetch from Sanity, use ISR/on-demand
  // revalidation, optimise images, and serve the /api routes.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Kept so any not-yet-migrated WordPress image URLs still render.
      { protocol: "https", hostname: "bighopesports.com" },
    ],
  },
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
