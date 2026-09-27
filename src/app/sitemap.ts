import type { MetadataRoute } from "next";

const SITE = "https://blujoylabs.com";

/** Public pages, most important first. Keep in step with the site's routes. */
const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services/govcon", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/ai-consulting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/design-engineering", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/industries", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "weekly" },
  { path: "/success-stories", priority: 0.5, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
