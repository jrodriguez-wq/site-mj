import { MetadataRoute } from "next";
import { SEO_CONFIG, SITEMAP_CONFIG } from "@/config/seo";
import { getAllModelKeys } from "@/lib/models/model-data";

/**
 * Professional Sitemap Generator
 * 
 * This sitemap is organized by content type and priority:
 * 1. Homepage (Priority 1.0 - Daily updates)
 * 2. Core Business Pages (Priority 0.9 - Weekly updates)
 * 3. Information Pages (Priority 0.8 - Monthly updates)
 * 4. Support Pages (Priority 0.7 - Monthly updates)
 * 5. Dynamic Content (Models - Priority 0.8 - Weekly updates)
 * 
 * All routes include:
 * - Canonical URLs
 * - Last modified dates
 * - Change frequency
 * - Priority (0.0 - 1.0)
 * - Language alternates (English/Spanish)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date();

  // ============================================
  // SECTION 1: CORE PAGES (Highest Priority)
  // ============================================
  
  /**
   * Homepage - Most important page
   * Priority: 1.0 (Highest)
   * Frequency: Daily (content updates frequently)
   */
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          es: `${baseUrl}/es`,
        },
      },
    },
  ];

  // ============================================
  // SECTION 2: PRIMARY BUSINESS PAGES
  // Priority: 0.9 (High)
  // Frequency: Weekly (regular content updates)
  // ============================================
  
  const primaryBusinessPages: MetadataRoute.Sitemap = SITEMAP_CONFIG.mainRoutes
    .filter((route) => route.priority === 0.9)
    .map((route) => ({
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

  // ============================================
  // SECTION 3: INFORMATION & RESOURCE PAGES
  // Priority: 0.8 (Medium-High)
  // Frequency: Monthly (stable content)
  // ============================================
  
  const informationPages: MetadataRoute.Sitemap = SITEMAP_CONFIG.mainRoutes
    .filter((route) => route.priority === 0.8)
    .map((route) => ({
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

  // ============================================
  // SECTION 4: SUPPORT & UTILITY PAGES
  // Priority: 0.7 (Medium)
  // Frequency: Monthly (rarely changes)
  // ============================================
  
  const supportPages: MetadataRoute.Sitemap = SITEMAP_CONFIG.mainRoutes
    .filter((route) => route.priority === 0.7)
    .map((route) => ({
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

  // ============================================
  // SECTION 5: DYNAMIC CONTENT - HOME MODELS
  // Priority: 0.8 (Medium-High)
  // Frequency: Weekly (product pages)
  // ============================================
  
  /**
   * Individual Model Pages
   * These are dynamically generated based on available models
   * Each model gets its own optimized URL and metadata
   */
  const modelKeys = await getAllModelKeys();
  const modelPages: MetadataRoute.Sitemap = modelKeys.map((modelKey) => ({
    url: `${baseUrl}/models/${modelKey}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/models/${modelKey}`,
        es: `${baseUrl}/es/models/${modelKey}`,
      },
    },
  }));

  // ============================================
  // FINAL SITEMAP ASSEMBLY
  // Organized by priority and content type
  // ============================================
  
  return [
    // Highest priority first
    ...homepage,
    // Primary business pages
    ...primaryBusinessPages,
    // Information pages
    ...informationPages,
    // Dynamic model pages
    ...modelPages,
    // Support pages last
    ...supportPages,
  ];
}
