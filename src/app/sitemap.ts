import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/en",
    "/en/about",
    "/en/privacy-policy",
    "/en/terms-of-service",
    "/en/copyright",
    "/en/guide",
    "/en/codes",
    "/en/trampler",
    "/en/weapons",
    "/en/loot",
    "/en/modes",
    "/en/system",
    "/en/media",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/en" ? 1 : 0.7,
    })),
    ...getAllContentPaths().map((item) => ({
      url: absoluteUrl(item.path),
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
