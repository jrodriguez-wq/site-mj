/**
 * Utilidades para trabajar con keywords estratégicas
 * Ayuda a usar keywords de forma dinámica en diferentes páginas
 */

import { KEYWORDS, getKeywordsByCategory, getAllKeywords } from "@/config/keywords";

/**
 * Obtiene keywords relevantes para una página específica
 */
export const getPageKeywords = (pageType: "home" | "rent-to-own" | "models" | "community" | "about") => {
  switch (pageType) {
    case "home":
      return [
        ...KEYWORDS.brand,
        ...KEYWORDS.rentToOwn.slice(0, 10),
        ...KEYWORDS.zeroDown.slice(0, 8),
        ...KEYWORDS.newConstruction.slice(0, 10),
        ...KEYWORDS.labelle.slice(0, 5),
        ...KEYWORDS.lehighAcres.slice(0, 5),
        ...KEYWORDS.southwestFlorida.slice(0, 5),
      ];
    
    case "rent-to-own":
      return [
        ...KEYWORDS.rentToOwn,
        ...KEYWORDS.zeroDown,
        ...KEYWORDS.badCredit,
        ...KEYWORDS.firstTimeBuyer,
        ...KEYWORDS.affordable.slice(0, 10),
      ];
    
    case "models":
      return [
        ...KEYWORDS.newConstruction,
        ...KEYWORDS.bedrooms,
        ...KEYWORDS.customHomes,
        ...KEYWORDS.moveInReady,
        ...KEYWORDS.preBuilt,
      ];
    
    case "community":
      return [
        ...KEYWORDS.labelle,
        ...KEYWORDS.lehighAcres,
        ...KEYWORDS.fortMyers,
        ...KEYWORDS.capeCoral,
        ...KEYWORDS.naples,
        ...KEYWORDS.miami,
      ];
    
    case "about":
      return [
        ...KEYWORDS.brand,
        ...KEYWORDS.bestBuilder,
        ...KEYWORDS.southwestFlorida,
        ...KEYWORDS.southFlorida,
      ];
    
    default:
      return getAllKeywords();
  }
};

/**
 * Obtiene keywords para una comunidad específica
 */
export const getCommunityKeywords = (community: "labelle" | "lehigh-acres" | "fort-myers" | "cape-coral" | "naples" | "miami") => {
  const communityMap = {
    "labelle": KEYWORDS.labelle,
    "lehigh-acres": KEYWORDS.lehighAcres,
    "fort-myers": KEYWORDS.fortMyers,
    "cape-coral": KEYWORDS.capeCoral,
    "naples": KEYWORDS.naples,
    "miami": KEYWORDS.miami,
  };

  const communityKeywords = communityMap[community] || [];
  
  return [
    ...KEYWORDS.brand,
    ...communityKeywords,
    ...KEYWORDS.newConstruction.slice(0, 10),
    ...KEYWORDS.rentToOwn.slice(0, 8),
    ...KEYWORDS.zeroDown.slice(0, 5),
  ];
};

/**
 * Genera texto con keywords naturales para usar en contenido
 */
export const generateKeywordRichText = (baseText: string, keywords: string[]): string => {
  // Esta función puede ser usada para sugerir dónde insertar keywords
  // en el contenido de forma natural
  return baseText;
};

/**
 * Obtiene keywords para meta description (máximo 160 caracteres)
 */
export const getMetaDescriptionKeywords = (pageType: string): string[] => {
  const keywords = getPageKeywords(pageType as any);
  // Retornar las keywords más importantes para meta description
  return keywords.slice(0, 5);
};

/**
 * Valida que las keywords estén en el formato correcto
 */
export const validateKeywords = (keywords: string[]): boolean => {
  return keywords.every(keyword => 
    typeof keyword === "string" && 
    keyword.length > 0 && 
    keyword.length <= 100
  );
};

/**
 * Obtiene keywords relacionadas (para sugerencias)
 */
export const getRelatedKeywords = (keyword: string): string[] => {
  const allKeywords = getAllKeywords();
  const lowerKeyword = keyword.toLowerCase();
  
  return allKeywords
    .filter(k => 
      k.toLowerCase().includes(lowerKeyword) || 
      lowerKeyword.includes(k.toLowerCase())
    )
    .slice(0, 10);
};

