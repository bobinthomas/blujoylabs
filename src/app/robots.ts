import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The CMS and form endpoints aren't pages; keep them out of search results.
        disallow: ["/keystatic", "/api/"],
      },
    ],
    sitemap: "https://blujoylabs.com/sitemap.xml",
    host: "https://blujoylabs.com",
  };
}
