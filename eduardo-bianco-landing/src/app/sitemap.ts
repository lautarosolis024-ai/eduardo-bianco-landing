import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eduardobianco.com.ar";

  // Only include the root URL — Google ignores hash-fragment URLs (/#about, /#services, etc.)
  // in sitemaps per their specification. Single-page apps should list only the canonical root.
  // Section anchors are still crawlable via on-page links but should not appear in sitemap.xml.
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
