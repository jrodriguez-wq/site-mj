/**
 * Utilidades para trabajar con keywords estratégicas
 * Ayuda a usar keywords de forma dinámica en diferentes páginas
 */

import { KEYWORDS, getAllKeywords } from "@/config/keywords";

export type PageKeywordType =
  | "home"
  | "sales"
  | "rent-to-own"
  | "models"
  | "community"
  | "about";

/**
 * Obtiene keywords relevantes para una página específica
 */
export const getPageKeywords = (pageType: PageKeywordType): string[] => {
  switch (pageType) {
    case "home":
      return [
        ...KEYWORDS.brand,
        ...KEYWORDS.buyHouse.slice(0, 20),
        ...KEYWORDS.floridaGeneral.slice(0, 20),
        ...KEYWORDS.newConstruction.slice(0, 15),
        ...KEYWORDS.homeBuilder.slice(0, 12),
        ...KEYWORDS.labelle.slice(0, 8),
        ...KEYWORDS.lehighAcres.slice(0, 8),
        ...KEYWORDS.southwestFlorida.slice(0, 8),
        ...KEYWORDS.rentToOwn.slice(0, 8),
        ...KEYWORDS.zeroDown.slice(0, 5),
      ];

    case "sales":
      return [
        ...KEYWORDS.buyHouse,
        ...KEYWORDS.floridaGeneral.slice(0, 25),
        ...KEYWORDS.newConstruction.slice(0, 15),
        ...KEYWORDS.labelle.slice(0, 12),
        ...KEYWORDS.lehighAcres.slice(0, 12),
        ...KEYWORDS.homeBuilder.slice(0, 10),
        ...KEYWORDS.brand,
        ...KEYWORDS.rentToOwn.slice(0, 5),
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
        ...KEYWORDS.buyHouse.slice(0, 20),
        ...KEYWORDS.floridaGeneral.slice(0, 15),
        ...KEYWORDS.newConstruction,
        ...KEYWORDS.bedrooms,
        ...KEYWORDS.customHomes,
        ...KEYWORDS.moveInReady,
        ...KEYWORDS.preBuilt,
        "homes for sale Florida",
        "new homes for sale",
      ];

    case "community":
      return [
        ...KEYWORDS.buyHouse.slice(0, 15),
        ...KEYWORDS.floridaGeneral.slice(0, 12),
        ...KEYWORDS.labelle,
        ...KEYWORDS.lehighAcres,
        ...KEYWORDS.fortMyers,
        ...KEYWORDS.capeCoral,
        ...KEYWORDS.naples,
        ...KEYWORDS.miami,
        ...KEYWORDS.newConstruction.slice(0, 8),
        ...KEYWORDS.rentToOwn.slice(0, 5),
      ];

    case "about":
      return [
        ...KEYWORDS.brand,
        ...KEYWORDS.bestBuilder,
        ...KEYWORDS.southwestFlorida,
        ...KEYWORDS.southFlorida,
        ...KEYWORDS.buyHouse.slice(0, 8),
      ];

    default:
      return getAllKeywords();
  }
};

/**
 * Obtiene keywords para una comunidad específica
 */
export const getCommunityKeywords = (
  community: "labelle" | "lehigh-acres" | "fort-myers" | "cape-coral" | "naples" | "miami"
) => {
  const communityMap = {
    labelle: KEYWORDS.labelle,
    "lehigh-acres": KEYWORDS.lehighAcres,
    "fort-myers": KEYWORDS.fortMyers,
    "cape-coral": KEYWORDS.capeCoral,
    naples: KEYWORDS.naples,
    miami: KEYWORDS.miami,
  };

  const communityKeywords = communityMap[community] || [];

  return [
    ...KEYWORDS.brand,
    ...KEYWORDS.buyHouse.slice(0, 12),
    ...KEYWORDS.floridaGeneral.slice(0, 10),
    ...communityKeywords,
    ...KEYWORDS.newConstruction.slice(0, 10),
    ...KEYWORDS.rentToOwn.slice(0, 5),
    ...KEYWORDS.zeroDown.slice(0, 5),
  ];
};

export const generateKeywordRichText = (baseText: string, _keywords: string[]): string => {
  return baseText;
};

export const getMetaDescriptionKeywords = (pageType: string): string[] => {
  const keywords = getPageKeywords(pageType as PageKeywordType);
  return keywords.slice(0, 5);
};

export const validateKeywords = (keywords: string[]): boolean => {
  return keywords.every(
    (keyword) => typeof keyword === "string" && keyword.length > 0 && keyword.length <= 100
  );
};

export const getRelatedKeywords = (keyword: string): string[] => {
  const allKeywords = getAllKeywords();
  const lowerKeyword = keyword.toLowerCase();

  return allKeywords
    .filter(
      (k) =>
        k.toLowerCase().includes(lowerKeyword) || lowerKeyword.includes(k.toLowerCase())
    )
    .slice(0, 10);
};
