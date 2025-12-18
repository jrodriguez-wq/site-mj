import { MetadataRoute } from "next";
import { SEO_CONFIG, SITEMAP_CONFIG } from "@/config/seo";
import { getAllModelKeys } from "@/lib/models/model-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Rutas adicionales importantes (sin duplicar warranty que ya está en mainRoutes)
  const additionalRoutes = [
    {
      url: `${baseUrl}/schedule-appointment`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Rutas de modelos individuales
  const modelKeys = await getAllModelKeys();
  const modelRoutes = modelKeys.map((modelKey) => ({
    url: `${baseUrl}/models/${modelKey}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/models/${modelKey}`,
        es: `${baseUrl}/es/models/${modelKey}`,
      },
    },
  }));

  return [...mainRoutes, ...additionalRoutes, ...modelRoutes];
}
