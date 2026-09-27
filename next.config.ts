import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic rewrites localhost -> 127.0.0.1 for its API calls in dev; allow both.
  allowedDevOrigins: ["127.0.0.1", "localhost"],

  // One canonical address: www.blujoylabs.com permanently redirects to the bare
  // domain, keeping the path, so search engines see a single site.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.blujoylabs.com" }],
        destination: "https://blujoylabs.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
