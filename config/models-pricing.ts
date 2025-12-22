/**
 * Modelos de casas disponibles con precios por ubicación
 */

export interface ModelPricing {
  key: string;
  name: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  labelle?: string; // Precio en LaBelle
  lehighAcres?: string; // Precio en Lehigh Acres
}

export const MODELS_PRICING: ModelPricing[] = [
  {
    key: "langdon",
    name: "Langdon",
    sqft: "1,900",
    bedrooms: "3",
    bathrooms: "2",
    garage: "2",
    labelle: "$316,900",
    lehighAcres: "$346,900",
  },
  {
    key: "emelia",
    name: "Emelia",
    sqft: "2,060",
    bedrooms: "3",
    bathrooms: "2",
    garage: "2",
    labelle: "$345,000",
    lehighAcres: "$374,900",
  },
  {
    key: "aurora",
    name: "Aurora",
    sqft: "2,277",
    bedrooms: "4",
    bathrooms: "3",
    garage: "2",
    labelle: "$359,900",
    lehighAcres: undefined, // No disponible en Lehigh Acres
  },
  {
    key: "delanie",
    name: "Delanie",
    sqft: "2,610",
    bedrooms: "3 + Den",
    bathrooms: "2",
    garage: "3",
    labelle: "$369,900",
    lehighAcres: "$410,000",
  },
  {
    key: "viana",
    name: "Viana",
    sqft: "2,978",
    bedrooms: "4",
    bathrooms: "3",
    garage: "2",
    labelle: undefined, // No disponible en LaBelle
    lehighAcres: "$449,900",
  },
  {
    key: "louisiana",
    name: "Louisiana",
    sqft: "3,277",
    bedrooms: "4",
    bathrooms: "3",
    garage: "3",
    labelle: undefined, // No disponible en LaBelle
    lehighAcres: "$469,900",
  },
  {
    key: "duplex",
    name: "Duplex",
    sqft: "2,898",
    bedrooms: "6 (3 por unidad)",
    bathrooms: "4",
    garage: "2",
    labelle: undefined,
    lehighAcres: "$510,000",
  },
];

/**
 * Obtener precio de un modelo en una ubicación específica
 */
export function getModelPrice(modelKey: string, location: "labelle" | "lehighAcres"): string | undefined {
  const model = MODELS_PRICING.find((m) => m.key === modelKey);
  if (!model) return undefined;
  return location === "labelle" ? model.labelle : model.lehighAcres;
}

/**
 * Obtener información completa de un modelo
 */
export function getModelInfo(modelKey: string): ModelPricing | undefined {
  return MODELS_PRICING.find((m) => m.key === modelKey);
}

