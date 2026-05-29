import type { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Root URL — Google ignores hash-fragment URLs (/#about, /#services, etc.)
  // in sitemaps per their specification.
  const rootEntry: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  };

  // Service pages — each with its own URL, priority, and change frequency
  const serviceEntries: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: service.changeFrequency,
    priority: service.priority,
  }));

  return [rootEntry, ...serviceEntries];
}
