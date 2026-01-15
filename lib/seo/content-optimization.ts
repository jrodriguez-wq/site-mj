/**
 * Content Optimization Utilities
 * Optimiza contenido según las mejores prácticas de Google SEO:
 * - Alt texts descriptivos con keywords
 * - Anchor texts con keywords relevantes
 * - Headings con keywords estratégicas
 */

import { SEO_CONFIG } from "@/config/seo";

/**
 * Genera alt text optimizado para imágenes de hero
 */
export const getHeroImageAlt = (titleKey: string, location?: string): string => {
  const baseAlt = "M.J. Newell Homes - New Construction Homes";
  const locationText = location ? ` in ${location}, Florida` : " in Florida";
  
  // Mapeo de titleKeys a alt texts optimizados
  const altTexts: Record<string, string> = {
    "hero.title1": `New construction homes${locationText} - Rent to Own with $0 down payment`,
    "hero.title2": `Best home builder${locationText} - Quality new homes for sale`,
    "hero.title3": `Buy house${locationText} - New homes Miami, LaBelle, Lehigh Acres`,
  };

  return altTexts[titleKey] || `${baseAlt}${locationText}`;
};

/**
 * Genera alt text optimizado para imágenes de modelos
 */
export const getModelImageAlt = (
  modelName: string,
  location?: string,
  includeKeywords: boolean = true
): string => {
  const locationText = location ? ` in ${location}, Florida` : " in Florida";
  const keywords = includeKeywords 
    ? " - New construction home, home builder, buy house"
    : "";
  
  return `${modelName} model home${locationText}${keywords}`;
};

/**
 * Genera alt text optimizado para imágenes de comunidades
 */
export const getCommunityImageAlt = (
  communityName: string,
  activity?: string
): string => {
  const baseText = `New homes in ${communityName}, Florida`;
  return activity 
    ? `${baseText} - ${activity} activities and amenities`
    : `${baseText} - Best home builder in ${communityName}`;
};

/**
 * Genera anchor text optimizado para enlaces internos
 */
export const getOptimizedAnchorText = (
  pageType: "models" | "rent-to-own" | "communities" | "about" | "contact" | "schedule",
  location?: string
): string => {
  const locationText = location ? ` in ${location}` : "";
  
  const anchorTexts: Record<string, string> = {
    models: `View new home models${locationText}`,
    "rent-to-own": `Rent to Own homes${locationText} - $0 down payment`,
    communities: `New homes in ${location || "Florida"} communities`,
    about: "About M.J. Newell Homes - Best home builder in Florida",
    contact: "Contact us - Home builder Florida, Miami, LaBelle",
    schedule: "Schedule appointment - Home builder consultation",
  };

  return anchorTexts[pageType] || `Learn more about ${pageType}${locationText}`;
};

/**
 * Genera heading optimizado con keywords
 */
export const getOptimizedHeading = (
  baseText: string,
  keywords: string[],
  maxLength: number = 60
): string => {
  // Agregar keywords relevantes al heading si hay espacio
  const keywordText = keywords.length > 0 ? ` - ${keywords[0]}` : "";
  const fullText = `${baseText}${keywordText}`;
  
  // Truncar si es muy largo
  return fullText.length > maxLength 
    ? fullText.substring(0, maxLength - 3) + "..."
    : fullText;
};

/**
 * Genera meta description optimizada con keywords
 */
export const getOptimizedMetaDescription = (
  baseDescription: string,
  keywords: string[],
  maxLength: number = 160
): string => {
  // Agregar keywords al final si hay espacio
  const relevantKeywords = keywords.slice(0, 2).join(", ");
  const keywordText = relevantKeywords ? `. ${relevantKeywords}.` : "";
  const fullText = `${baseDescription}${keywordText}`;
  
  // Truncar si es muy largo
  return fullText.length > maxLength 
    ? fullText.substring(0, maxLength - 3) + "..."
    : fullText;
};

/**
 * Verifica que un enlace sea rastreable (no solo JavaScript)
 */
export const isLinkCrawlable = (href: string | undefined): boolean => {
  if (!href) return false;
  // Enlaces que NO son rastreables
  const nonCrawlablePatterns = [
    /^#/,
    /^javascript:/,
    /^mailto:/,
    /^tel:/,
  ];
  
  return !nonCrawlablePatterns.some(pattern => pattern.test(href));
};

/**
 * Genera texto descriptivo para enlaces (aria-label)
 */
export const getLinkAriaLabel = (
  linkText: string,
  destination: string,
  includeContext: boolean = true
): string => {
  if (!includeContext) return linkText;
  
  // Agregar contexto para mejor accesibilidad y SEO
  const contextMap: Record<string, string> = {
    "models": "View our new home models",
    "rent-to-own": "Learn about our Rent to Own program",
    "communities": "Explore our communities",
    "about": "Learn about M.J. Newell Homes",
    "contact": "Contact M.J. Newell Homes",
    "schedule": "Schedule an appointment",
  };

  const context = contextMap[destination] || `Visit ${destination}`;
  return `${linkText} - ${context}`;
};

