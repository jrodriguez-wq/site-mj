/**
 * Rutas de imágenes optimizadas para cada modelo
 * Estas rutas apuntan a /public/modelos-optimized con nombres normalizados
 */

export const MODEL_IMAGES: Record<string, string[]> = {
  louisiana: Array.from({ length: 30 }, (_, i) => 
    `/modelos-optimized/louisiana/louisiana-${String(i + 1).padStart(3, '0')}.webp`
  ),
  viana: Array.from({ length: 7 }, (_, i) => 
    `/modelos-optimized/viana/viana-${String(i + 1).padStart(3, '0')}.webp`
  ),
  delanie: Array.from({ length: 22 }, (_, i) => 
    `/modelos-optimized/delanie/delanie-${String(i + 1).padStart(3, '0')}.webp`
  ),
  aurora: [
    ...Array.from({ length: 15 }, (_, i) => 
      `/modelos-optimized/aurora/${i + 1}.webp`
    ),
    `/modelos-optimized/aurora/a6.webp`,
    `/modelos-optimized/aurora/a7.webp`,
    `/modelos-optimized/aurora/a8.webp`,
    `/modelos-optimized/aurora/a9.webp`,
    `/modelos-optimized/aurora/a10.webp`,
  ],
  langdon: Array.from({ length: 34 }, (_, i) => 
    `/modelos-optimized/langdon/langdon-${String(i + 1).padStart(3, '0')}.webp`
  ),
  emelia: Array.from({ length: 35 }, (_, i) => 
    `/modelos-optimized/emelia/emelia-${String(i + 1).padStart(3, '0')}.webp`
  ),
  duplex: [
    `/modelos-optimized/duplex/1.webp`,
  ],
};

export const getModelImages = (modelKey: string): string[] => {
  return MODEL_IMAGES[modelKey.toLowerCase()] || [];
};

export const getModelMainImage = (modelKey: string): string => {
  const images = getModelImages(modelKey);
  return images[0] || "/recursos/shutterstock-1065297917.webp";
};

/**
 * Obtiene la ruta del plano optimizado para un modelo
 */
export const getModelFloorplan = (modelKey: string): string | null => {
  const floorplanPath = `/modelos-optimized/planos/${modelKey.toLowerCase()}-floorplan.webp`;
  // Retornamos la ruta, el componente verificará si existe
  return floorplanPath;
};

/**
 * Mapeo de modelos a sus planos
 */
export const MODEL_FLOORPLANS: Record<string, string> = {
  aurora: "/modelos-optimized/planos/aurora-floorplan.webp",
  viana: "/modelos-optimized/planos/viana-floorplan.webp",
  louisiana: "/modelos-optimized/planos/louisiana-floorplan.webp",
  langdon: "/modelos-optimized/planos/langdon-floorplan.webp",
  emelia: "/modelos-optimized/planos/emelia-floorplan.webp",
  duplex: "/modelos-optimized/planos/duplex-floorplan.webp",
  delanie: "/modelos-optimized/planos/delanie-floorplan.webp",
};
