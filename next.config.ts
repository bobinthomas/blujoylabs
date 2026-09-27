import type { NextConfig } from "next";

const CANONICAL = "https://blujoylabs.com";

/**
 * Security headers for every response. No full Content-Security-Policy yet —
 * Next's inline runtime scripts and the Keystatic admin would need nonces, so
 * the CSP only governs framing (clickjacking protection) for now.
 * HSTS deliberately omits includeSubDomains: the GoDaddy email subdomains are
 * not ours to force onto HTTPS.
 */
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  // Keystatic rewrites localhost -> 127.0.0.1 for its API calls in dev; allow both.
  allowedDevOrigins: ["127.0.0.1", "localhost"],

  // Don't advertise the framework in every response.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },

  // One canonical address: https://blujoylabs.com. The www host and plain http
  // both redirect there permanently, keeping the path. The bare "/" gets its own
  // rule because an empty `:path*` is emitted literally in the Location header.
  // `has` values are regular expressions matched anywhere in the string, so they
  // MUST be anchored: an unanchored "http" also matches "https" and redirects
  // every request to itself (this took the site down once).
  async redirects() {
    const www = [{ type: "host" as const, value: "^www\\.blujoylabs\\.com$" }];
    const http = [
      { type: "host" as const, value: "^blujoylabs\\.com$" },
      { type: "header" as const, key: "x-forwarded-proto", value: "^http$" },
    ];
    return [
      { source: "/", has: www, destination: `${CANONICAL}/`, permanent: true },
      { source: "/:path+", has: www, destination: `${CANONICAL}/:path+`, permanent: true },
      { source: "/", has: http, destination: `${CANONICAL}/`, permanent: true },
      { source: "/:path+", has: http, destination: `${CANONICAL}/:path+`, permanent: true },
    ];
  },
};

export default nextConfig;
