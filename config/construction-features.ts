/**
 * Características de construcción de M.J. Newell Homes
 */

export interface ConstructionFeature {
  category: string;
  items: string[];
}

export const CONSTRUCTION_FEATURES: ConstructionFeature[] = [
  {
    category: "Estructura y Seguridad",
    items: [
      "100% bloques de concreto",
      "Techo, puertas y ventanas resistentes a huracanes",
      "Altura interior: 9.4 pies",
      "Sistema anti-termitas moderno",
    ],
  },
  {
    category: "Interiores",
    items: [
      "Encimeras de granito o cuarzo",
      "Cocinas modernas y duraderas, con electrodomésticos en acero inoxidable",
      "Lotes de ¼ acre con amplias áreas verdes",
    ],
  },
  {
    category: "Servicios",
    items: [
      "Agua de ciudad (LaBelle) / Agua de pozo (Lehigh)",
      "Sistema séptico",
    ],
  },
];

