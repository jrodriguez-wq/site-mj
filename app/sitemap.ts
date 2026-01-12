import { MetadataRoute } from "next";
import { SEO_CONFIG, SITEMAP_CONFIG } from "@/config/seo";
import { getAllModelKeys } from "@/lib/models/model-data";
import { getAllPosts } from "@/lib/blog/blog-utils";

/**
 * Professional Sitemap Generator for M.J. Newell Homes
 * 
 * This sitemap is optimized for Google Search Console and follows best practices:
 * 
 * ORGANIZATION BY PRIORITY:
 * 1. Homepage (Priority 1.0 - Daily updates)
 * 2. Core Business Pages (Priority 0.9 - Weekly updates)
 *    - Rent to Own, Schedule Appointment, Models, Communities
 * 3. Information Pages (Priority 0.8 - Monthly updates)
 *    - About Us, Home Buying Guide, Contact
 * 4. Dynamic Content (Priority 0.8 - Weekly updates)
 *    - Individual Model Pages
 * 5. Support Pages (Priority 0.7 - Monthly updates)
 *    - Warranty
 * 
 * FEATURES:
 * - Canonical URLs for all pages
 * - Last modified dates (dynamic, updates automatically)
 * - Change frequency (optimized per page type)
 * - Priority (0.0 - 1.0) based on SEO importance
 * - Language alternates (English/Spanish) for international SEO
 * - Automatic model discovery (dynamically includes all models)
 * - Error handling (prevents sitemap failure if models can't be loaded)
 * 
 * EXCLUDED PAGES (not in sitemap):
 * - /thank-you (post-submission page, should be noindex)
 * - /promotion-preview (internal preview page, should be noindex)
 * - /api/* (API routes, excluded in robots.txt)
 * - /_next/* (Next.js internal files, excluded in robots.txt)
 * 
 * GOOGLE BEST PRACTICES:
 * - Maximum 50,000 URLs per sitemap (we're well under this limit)
 * - Maximum 50MB uncompressed (we're well under this limit)
 * - URLs must be absolute (using baseUrl)
 * - Priority and changeFrequency are hints, not guarantees
 * - Last modified should reflect actual content changes
 * 
 * @returns Complete sitemap with all indexable pages, organized by priority
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date();

  // ============================================
  // SECTION 1: HOMEPAGE (Highest Priority)
  // Priority: 1.0 - Most important page for SEO
  // Frequency: Daily - Content updates frequently
  // ============================================
  
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
  // Priority: 0.9 - High importance for conversions
  // Frequency: Weekly - Regular content updates
  // These pages drive business: Rent to Own, Schedule, Models, Communities
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
  // Priority: 0.8 - Medium-High importance
  // Frequency: Monthly - Stable content that rarely changes
  // About Us, Home Buying Guide, Contact
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
  // Priority: 0.7 - Medium importance
  // Frequency: Monthly - Rarely changes
  // Warranty, Terms, etc.
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
  // Priority: 0.8 - Medium-High importance
  // Frequency: Weekly - Product pages that may update
  // Dynamically generated based on available models
  // ============================================
  
  /**
   * Individual Model Pages
   * Dynamically generated based on available models in the system
   * Each model gets its own optimized URL and metadata
   * Examples: /models/langdon, /models/emelia, /models/aurora, etc.
   * 
   * Error handling: If models can't be loaded, sitemap continues without them
   * This prevents the entire sitemap from failing
   */
  let modelPages: MetadataRoute.Sitemap = [];
  
  try {
    const modelKeys = await getAllModelKeys();
    modelPages = modelKeys.map((modelKey) => ({
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
  } catch (error) {
    // Si hay error obteniendo modelos, continuar sin ellos
    // Esto previene que el sitemap falle completamente
    // En producción, esto debería loguearse pero no romper el sitemap
    if (process.env.NODE_ENV === "development") {
      console.error("⚠️ Error getting model keys for sitemap:", error);
    }
  }

  // ============================================
  // SECTION 6: BLOG PAGES
  // Priority: 0.8 - Medium-High importance for SEO
  // Frequency: Weekly - Blog content may be updated
  // Blog listing page and individual articles
  // ============================================
  
  let blogPages: MetadataRoute.Sitemap = [];
  
  try {
    const posts = getAllPosts();
    
    // Blog listing page
    blogPages.push({
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
    
    // Individual blog articles
    const articlePages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    
    blogPages = [...blogPages, ...articlePages];
  } catch (error) {
    // Si hay error obteniendo artículos, continuar sin ellos
    if (process.env.NODE_ENV === "development") {
      console.error("⚠️ Error getting blog posts for sitemap:", error);
    }
  }

  // ============================================
  // FINAL SITEMAP ASSEMBLY
  // Organized by priority: Highest to Lowest
  // This helps Google understand page importance
  // Google crawls higher priority pages more frequently
  // ============================================
  
  const sitemapEntries: MetadataRoute.Sitemap = [
    // 1. Homepage (Highest Priority - 1.0)
    ...homepage,
    
    // 2. Primary Business Pages (High Priority - 0.9)
    // These drive conversions: Rent to Own, Schedule Appointment, Models, Communities
    ...primaryBusinessPages,
    
    // 3. Dynamic Model Pages (Medium-High Priority - 0.8)
    // Individual product pages for each home model
    ...modelPages,
    
    // 4. Blog Pages (Medium-High Priority - 0.8)
    // Blog listing and individual articles for SEO
    ...blogPages,
    
    // 5. Information Pages (Medium-High Priority - 0.8)
    // About Us, Home Buying Guide, Contact
    ...informationPages,
    
    // 6. Support Pages (Medium Priority - 0.7)
    // Warranty, Terms, etc.
    ...supportPages,
  ];

  // ============================================
  // VALIDATION & LOGGING
  // ============================================
  
  // Log sitemap generation for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    const totalUrls = sitemapEntries.length;
    console.log(`\n✅ Sitemap generated successfully`);
    console.log(`   📊 Total URLs: ${totalUrls}`);
    console.log(`   🏠 Homepage: ${homepage.length}`);
    console.log(`   💼 Primary Business: ${primaryBusinessPages.length}`);
    console.log(`   🏗️  Models: ${modelPages.length}`);
    console.log(`   📝 Blog: ${blogPages.length}`);
    console.log(`   📚 Information: ${informationPages.length}`);
    console.log(`   🛠️  Support: ${supportPages.length}`);
    console.log(`   🌐 Base URL: ${baseUrl}\n`);
    
    // Validación: verificar que no excedamos límites de Google
    if (totalUrls > 50000) {
      console.warn("⚠️  WARNING: Sitemap exceeds Google's 50,000 URL limit!");
    }
  }

  return sitemapEntries;
}
