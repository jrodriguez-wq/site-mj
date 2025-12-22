import { MetadataRoute } from "next";
import { SEO_CONFIG, ROBOTS_CONFIG } from "@/config/seo";

/**
 * robots.ts - Genera robots.txt dinámicamente para Next.js
 * Optimizado para Google Search Console y todos los navegadores
 */
export default function robots(): MetadataRoute.Robots {
  const disallowPaths = [...ROBOTS_CONFIG.disallowPaths];
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        // Googlebot específico - sin delay para indexación rápida
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        // Bingbot para Bing Search
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    // Host opcional - ayuda a Google a entender el dominio preferido
    host: SEO_CONFIG.siteUrl.replace("https://", "").replace("http://", ""),
  };
}

