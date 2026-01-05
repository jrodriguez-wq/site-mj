import { Community, ModelPricing } from "@/types/model";

/**
 * Configuración de precios por ciudad para cada modelo
 */
/**
 * Configuración de precios por ciudad para cada modelo
 * Solo incluir modelos que realmente existen en cada comunidad
 * 
 * LaBelle: Langdon, Emelia, Aurora, Delanie, Viana, Louisiana
 * Lehigh Acres: Langdon, Emelia, Delanie, Duplex
 */
export const MODEL_PRICING: Record<Community, Record<string, ModelPricing>> = {
  labelle: {
    langdon: {
      price: "$316,900",
      rtoPrice: "$2,700/mo",
      sqft: "1,900",
      bedrooms: "3",
      bathrooms: "2",
      garage: "2",
    },
    emelia: {
      price: "$345,000",
      rtoPrice: "$2,750/mo",
      sqft: "2,060",
      bedrooms: "3",
      bathrooms: "2",
      garage: "2",
    },
    aurora: {
      price: "$359,900",
      rtoPrice: "$2,900/mo",
      sqft: "2,077",
      bedrooms: "4",
      bathrooms: "3",
      garage: "2",
    },
    delanie: {
      price: "$369,900",
      rtoPrice: "$2,900/mo",
      sqft: "2,610",
      bedrooms: "3",
      bathrooms: "2",
      garage: "3",
    },
    viana: {
      price: "$449,900",
      rtoPrice: "$3,400/mo",
      sqft: "2,978",
      bedrooms: "4",
      bathrooms: "3",
      garage: "2",
    },
    louisiana: {
      price: "$469,900",
      rtoPrice: "$3,400/mo",
      sqft: "3,277",
      bedrooms: "4",
      bathrooms: "3",
      garage: "3",
    },
  },
  "lehigh-acres": {
    langdon: {
      price: "$346,900",
      rtoPrice: "$2,750/mo",
      sqft: "1,900",
      bedrooms: "3",
      bathrooms: "2",
      garage: "2",
    },
    emelia: {
      price: "$374,900",
      rtoPrice: "$2,850/mo",
      sqft: "2,060",
      bedrooms: "3",
      bathrooms: "2",
      garage: "2",
    },
    delanie: {
      price: "$410,000",
      rtoPrice: "$3,150/mo",
      sqft: "2,610",
      bedrooms: "3",
      bathrooms: "2",
      garage: "3",
    },
    duplex: {
      price: "$510,000",
      rtoPrice: "$2,000/mo",
      sqft: "2,898",
      bedrooms: "6",
      bathrooms: "4",
      garage: "2",
    },
  },
};

/**
 * Obtiene el pricing de un modelo para una ciudad específica
 */
export const getModelPricing = (
  modelKey: string,
  community: Community
): ModelPricing | null => {
  return MODEL_PRICING[community]?.[modelKey] || null;
};

/**
 * Obtiene todos los modelos disponibles para una ciudad
 */
export const getModelsForCommunity = (community: Community): string[] => {
  return Object.keys(MODEL_PRICING[community] || {});
};

