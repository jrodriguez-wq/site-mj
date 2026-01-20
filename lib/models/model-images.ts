/**
 * Rutas de imágenes optimizadas para cada modelo
 * Formato estándar: [modelo]-[interior/exterior]-[numero].webp
 * Las imágenes están organizadas en subcarpetas: interior/ y exterior/
 */

// Imágenes principales (hero) para cada modelo
export const MODEL_MAIN_IMAGES: Record<string, string> = {
  louisiana: `/img/hero/1w5a1489-e5.webp`,
  viana: `/img/hero/1w5a0814-1.webp`,
  delanie: `/img/hero/1w5a1456-e5.webp`,
  aurora: `/img/hero/aurora.webp`,
  langdon: `/img/hero/1w5a1505-e5.webp`,
  emelia: `/img/hero/1w5a0754-e4.webp`,
  duplex: `/modelos-optimized/duplex/interior/duplex-interior-01.webp`,
};

// Imágenes de interior para cada modelo
export const MODEL_INTERIOR_IMAGES: Record<string, string[]> = {
  louisiana: [
    `/modelos-optimized/louisiana/interior/louisiana-interior-01.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-02.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-03.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-04.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-05.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-06.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-07.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-08.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-09.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-10.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-11.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-12.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-13.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-14.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-15.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-16.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-17.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-18.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-19.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-20.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-21.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-22.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-23.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-24.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-25.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-26.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-27.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-28.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-29.webp`,
    `/modelos-optimized/louisiana/interior/louisiana-interior-30.webp`,
  ],
  viana: [
    `/modelos-optimized/viana/interior/viana-interior-01.webp`,
    `/modelos-optimized/viana/interior/viana-interior-02.webp`,
    `/modelos-optimized/viana/interior/viana-interior-03.webp`,
    `/modelos-optimized/viana/interior/viana-interior-04.webp`,
    `/modelos-optimized/viana/interior/viana-interior-05.webp`,
    `/modelos-optimized/viana/interior/viana-interior-06.webp`,
    `/modelos-optimized/viana/interior/viana-interior-07.webp`,
    `/modelos-optimized/viana/interior/viana-interior-08.webp`,
    `/modelos-optimized/viana/interior/viana-interior-09.webp`,
    `/modelos-optimized/viana/interior/viana-interior-10.webp`,
    `/modelos-optimized/viana/interior/viana-interior-11.webp`,
    `/modelos-optimized/viana/interior/viana-interior-12.webp`,
    `/modelos-optimized/viana/interior/viana-interior-13.webp`,
    `/modelos-optimized/viana/interior/viana-interior-14.webp`,
    `/modelos-optimized/viana/interior/viana-interior-15.webp`,
    `/modelos-optimized/viana/interior/viana-interior-16.webp`,
    `/modelos-optimized/viana/interior/viana-interior-17.webp`,
    `/modelos-optimized/viana/interior/viana-interior-18.webp`,
    `/modelos-optimized/viana/interior/viana-interior-19.webp`,
  ],
  delanie: [
    `/modelos-optimized/delanie/interior/delanie-interior-01.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-02.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-03.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-04.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-05.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-06.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-07.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-08.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-09.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-10.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-11.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-12.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-13.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-14.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-15.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-16.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-17.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-18.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-19.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-20.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-21.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-22.webp`,
    `/modelos-optimized/delanie/interior/delanie-interior-23.webp`,
  ],
  aurora: [
    `/modelos-optimized/aurora/interior/aurora-interior-01.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-02.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-03.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-04.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-05.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-06.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-07.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-08.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-09.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-10.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-11.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-12.webp`,
    `/modelos-optimized/aurora/interior/aurora-interior-13.webp`,
  ],
  langdon: [
    `/modelos-optimized/langdon/interior/langdon-interior-01.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-02.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-03.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-04.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-05.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-06.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-07.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-08.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-09.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-10.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-11.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-12.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-13.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-14.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-15.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-16.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-17.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-18.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-19.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-20.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-21.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-22.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-23.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-24.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-25.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-26.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-27.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-28.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-29.webp`,
    `/modelos-optimized/langdon/interior/langdon-interior-30.webp`,
  ],
  emelia: [
    `/modelos-optimized/emelia/interior/emelia-interior-01.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-02.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-03.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-04.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-05.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-06.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-07.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-08.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-09.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-10.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-11.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-12.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-13.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-14.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-15.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-16.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-17.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-18.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-19.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-20.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-21.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-22.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-23.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-24.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-25.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-26.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-27.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-28.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-29.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-30.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-31.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-32.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-33.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-34.webp`,
    `/modelos-optimized/emelia/interior/emelia-interior-35.webp`,
  ],
  duplex: [
    `/modelos-optimized/duplex/interior/duplex-interior-01.webp`,
    `/modelos-optimized/duplex/interior/duplex-interior-02.webp`,
    `/modelos-optimized/duplex/interior/duplex-interior-03.webp`,
    `/modelos-optimized/duplex/interior/duplex-interior-04.webp`,
  ],
};

// Imágenes de exterior para cada modelo
export const MODEL_EXTERIOR_IMAGES: Record<string, string[]> = {
  louisiana: [
    `/modelos-optimized/louisiana/exterior/louisiana-exterior-01.webp`,
    `/modelos-optimized/louisiana/exterior/louisiana-exterior-02.webp`,
    `/modelos-optimized/louisiana/exterior/louisiana-exterior-03.webp`,
    `/modelos-optimized/louisiana/exterior/louisiana-exterior-04.webp`,
  ],
  viana: [
    `/modelos-optimized/viana/exterior/viana-exterior-01.webp`,
    `/modelos-optimized/viana/exterior/viana-exterior-02.webp`,
  ],
  delanie: [
    `/modelos-optimized/delanie/exterior/delanie-exterior-01.webp`,
    `/modelos-optimized/delanie/exterior/delanie-exterior-02.webp`,
    `/modelos-optimized/delanie/exterior/delanie-exterior-03.webp`,
    `/modelos-optimized/delanie/exterior/delanie-exterior-04.webp`,
  ],
  aurora: [
    `/modelos-optimized/aurora/exterior/aurora-exterior-01.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-02.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-03.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-04.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-05.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-06.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-07.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-08.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-09.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-10.webp`,
    `/modelos-optimized/aurora/exterior/aurora-exterior-11.webp`,
  ],
  langdon: [
    `/modelos-optimized/langdon/exterior/langdon-exterior-01.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-02.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-03.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-04.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-05.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-06.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-07.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-08.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-09.webp`,
    `/modelos-optimized/langdon/exterior/langdon-exterior-10.webp`,
  ],
  emelia: [
    `/modelos-optimized/emelia/exterior/emelia-exterior-01.webp`,
    `/modelos-optimized/emelia/exterior/emelia-exterior-02.webp`,
    `/modelos-optimized/emelia/exterior/emelia-exterior-03.webp`,
    `/modelos-optimized/emelia/exterior/emelia-exterior-04.webp`,
    `/modelos-optimized/emelia/exterior/emelia-exterior-05.webp`,
    `/modelos-optimized/emelia/exterior/emelia-exterior-06.webp`,
  ],
  duplex: [
    `/modelos-optimized/duplex/exterior/duplex-exterior-01.webp`,
  ],
};

/**
 * Obtiene todas las imágenes de un modelo (principal + interior + exterior)
 */
export const getModelImages = (modelKey: string): string[] => {
  const key = modelKey.toLowerCase();
  const mainImage = MODEL_MAIN_IMAGES[key];
  const interiorImages = MODEL_INTERIOR_IMAGES[key] || [];
  const exteriorImages = MODEL_EXTERIOR_IMAGES[key] || [];

  // Retornar: principal primero, luego interior, luego exterior
  return [mainImage, ...interiorImages, ...exteriorImages].filter(Boolean);
};

/**
 * Obtiene solo las imágenes de interior de un modelo
 */
export const getModelInteriorImages = (modelKey: string): string[] => {
  return MODEL_INTERIOR_IMAGES[modelKey.toLowerCase()] || [];
};

/**
 * Obtiene solo las imágenes de exterior de un modelo
 */
export const getModelExteriorImages = (modelKey: string): string[] => {
  return MODEL_EXTERIOR_IMAGES[modelKey.toLowerCase()] || [];
};

export const getModelMainImage = (modelKey: string): string => {
  return MODEL_MAIN_IMAGES[modelKey.toLowerCase()] || "/recursos/shutterstock-1065297917.webp";
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
