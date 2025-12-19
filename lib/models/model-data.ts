import { ModelData, Community } from "@/types/model";
import { getModelImages } from "./model-images";
import { getModelPricing } from "./model-pricing";

/**
 * Carga los datos de un modelo desde su archivo JSON
 */
export const getModelData = async (
  modelKey: string,
  community?: Community
): Promise<ModelData | null> => {
  try {
    // En Next.js, los JSON se importan directamente como objeto, no como default
    const data = await import(`@/data/models/${modelKey}.json`);
    // El JSON puede venir como default o directamente
    const baseData = (data.default || data) as ModelData;

    // Si se especifica una ciudad, aplicar los precios específicos de esa ciudad
    if (community) {
      const pricing = getModelPricing(modelKey, community);
      if (pricing) {
        return {
          ...baseData,
          price: pricing.price,
          rtoPrice: pricing.rtoPrice,
          sqft: pricing.sqft,
          bedrooms: pricing.bedrooms,
          bathrooms: pricing.bathrooms,
          garage: `${pricing.garage}-Car Garage`,
        };
      }
    }

    return baseData;
  } catch (error) {
    console.error(`Error loading model data for ${modelKey}:`, error);
    return null;
  }
};

/**
 * Obtiene todas las imágenes de un modelo
 */
export const getModelDataWithImages = async (
  modelKey: string,
  community?: Community
): Promise<(ModelData & { images: string[] }) | null> => {
  const modelData = await getModelData(modelKey, community);
  if (!modelData) return null;

  const images = getModelImages(modelKey);
  return {
    ...modelData,
    images,
  };
};

/**
 * Lista todos los modelos disponibles para una ciudad específica
 */
export const getAllModelKeys = async (community?: Community): Promise<string[]> => {
  if (community) {
    const { getModelsForCommunity } = await import("./model-pricing");
    return getModelsForCommunity(community);
  }
  // Si no se especifica ciudad, retornar todos los modelos conocidos
  return ["louisiana", "viana", "delanie", "aurora", "langdon", "emelia", "duplex"];
};

