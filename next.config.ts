import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic rewrites localhost -> 127.0.0.1 for its API calls in dev; allow both.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
