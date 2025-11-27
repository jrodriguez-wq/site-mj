import { MetadataRoute } from "next";
import { SEO_CONFIG, SITEMAP_CONFIG } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;

  const routes = SITEMAP_CONFIG.mainRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return routes;
}

