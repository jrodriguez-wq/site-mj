import { MetadataRoute } from "next";
import { SEO_CONFIG, SITEMAP_CONFIG } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date();

  // Rutas principales con metadata mejorada
  const mainRoutes = SITEMAP_CONFIG.mainRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        en: `${baseUrl}${route.path}`,
        es: `${baseUrl}/es${route.path}`,
      },
    },
  }));

  // Rutas adicionales importantes
  const additionalRoutes = [
    {
      url: `${baseUrl}/schedule-appointment`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/warranty`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return [...mainRoutes, ...additionalRoutes];
}
