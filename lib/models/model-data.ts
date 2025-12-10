import { ModelData } from "@/types/model";
import { getModelImages } from "./model-images";

/**
 * Carga los datos de un modelo desde su archivo JSON
 */
export const getModelData = async (modelKey: string): Promise<ModelData | null> => {
  try {
    // En Next.js, los JSON se importan directamente como objeto, no como default
    const data = await import(`@/data/models/${modelKey}.json`);
    // El JSON puede venir como default o directamente
    return (data.default || data) as ModelData;
  } catch (error) {
    console.error(`Error loading model data for ${modelKey}:`, error);
    return null;
  }
};

/**
 * Obtiene todas las imágenes de un modelo
 */
export const getModelDataWithImages = async (modelKey: string): Promise<(ModelData & { images: string[] }) | null> => {
  const modelData = await getModelData(modelKey);
  if (!modelData) return null;

  const images = getModelImages(modelKey);
  return {
    ...modelData,
    images,
  };
};

/**
 * Lista todos los modelos disponibles
 */
export const getAllModelKeys = async (): Promise<string[]> => {
  // Por ahora retornamos los modelos conocidos
  // En el futuro se puede hacer dinámico leyendo la carpeta data/models
  return ["louisiana", "viana", "delanie", "aurora", "langdon", "emelia", "duplex"];
};

