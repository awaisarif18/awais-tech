import type { MetadataRoute } from "next";
import { projects } from "./content/projects";
import { siteUrl } from "./content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/zapier-automation` },
    ...projects.map(({ slug }) => ({ url: `${siteUrl}/projects/${slug}` })),
  ];
}
