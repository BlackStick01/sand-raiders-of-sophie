import generatedContent from "./generated-content.json";
import { mdxLoaders } from "./content-registry";
import { CONTENT_TYPES, NAVIGATION_CONFIG } from "@/config/navigation";

export type ContentMeta = {
  category: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  path: string;
};

export const GROUP_TITLES: Record<string, string> = {
  guide: "Guide",
  codes: "Codes",
  trampler: "Trampler",
  weapons: "Weapons",
  loot: "Loot",
  modes: "Modes",
  system: "System",
  media: "Media",
};

export const GROUP_ORDER = CONTENT_TYPES;

export const allContent = generatedContent as ContentMeta[];

export function getAllContentPaths() {
  return allContent.map((item) => ({
    locale: "en",
    category: item.category,
    slug: item.slug,
    path: `/en/${item.category}/${item.slug}`,
  }));
}

export function getContentByCategory(category: string) {
  return allContent
    .filter((item) => item.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getLatestContent(limit = 8) {
  return [...allContent]
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function getContentMeta(category: string, slug: string) {
  return allContent.find((item) => item.category === category && item.slug === slug);
}

export async function getContentModule(category: string, slug: string) {
  const key = `${category}/${slug}` as keyof typeof mdxLoaders;
  const loader = mdxLoaders[key];
  if (!loader) return null;
  return loader();
}

export function getCategoryMeta(category: string) {
  return NAVIGATION_CONFIG[category];
}

export function isKnownCategory(category: string) {
  return category in NAVIGATION_CONFIG;
}
