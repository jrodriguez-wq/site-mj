/**
 * Rutas de imágenes optimizadas para cada modelo
 * Estas rutas apuntan a /public/modelos-optimized con nombres normalizados
 */

export const MODEL_IMAGES: Record<string, string[]> = {
  louisiana: Array.from({ length: 30 }, (_, i) => 
    `/modelos-optimized/louisiana/louisiana-${String(i + 1).padStart(3, '0')}.jpg`
  ),
  viana: Array.from({ length: 7 }, (_, i) => 
    `/modelos-optimized/viana/viana-${String(i + 1).padStart(3, '0')}.jpg`
  ),
  delanie: Array.from({ length: 22 }, (_, i) => 
    `/modelos-optimized/delanie/delanie-${String(i + 1).padStart(3, '0')}.jpg`
  ),
  langdon: Array.from({ length: 34 }, (_, i) => 
    `/modelos-optimized/langdon/langdon-${String(i + 1).padStart(3, '0')}.jpg`
  ),
  emelia: Array.from({ length: 35 }, (_, i) => 
    `/modelos-optimized/emelia/emelia-${String(i + 1).padStart(3, '0')}.jpg`
  ),
};

export const getModelImages = (modelKey: string): string[] => {
  return MODEL_IMAGES[modelKey.toLowerCase()] || [];
};

export const getModelMainImage = (modelKey: string): string => {
  const images = getModelImages(modelKey);
  return images[0] || "/recursos/shutterstock_1065297917.jpg";
};
