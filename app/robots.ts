import { MetadataRoute } from "next";
import { SEO_CONFIG, ROBOTS_CONFIG } from "@/config/seo";

/**
 * robots.ts - Genera robots.txt dinámicamente para Next.js
 * Optimizado para Google Search Console y todos los motores de búsqueda
 * 
 * BEST PRACTICES:
 * - Una sola regla para todos los user agents (Googlebot ya está incluido en "*")
 * - Reglas específicas solo cuando son necesarias (diferentes permisos)
 * - Sitemap siempre incluido para facilitar la indexación
 * - Host especificado para indicar el dominio preferido
 */
export default function robots(): MetadataRoute.Robots {
  const disallowPaths = [...ROBOTS_CONFIG.disallowPaths];
  
  return {
    rules: [
      {
        // Regla única para todos los user agents (incluye Googlebot, Bingbot, etc.)
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    // Host especificado para indicar el dominio preferido (sin protocolo)
    host: SEO_CONFIG.siteUrl.replace(/^https?:\/\//, ""),
  };
}

