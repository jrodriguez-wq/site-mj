/**
 * Información detallada de las comunidades
 */

export interface CommunityInfo {
  key: "labelle" | "lehighAcres";
  name: string;
  location: string;
  description: string;
  distances: {
    label: string;
    value: string;
  }[];
  features: string[];
  services: string[];
}

export const COMMUNITIES_INFO: CommunityInfo[] = [
  {
    key: "labelle",
    name: "LaBelle",
    location: "LaBelle, FL",
    description:
      "LaBelle está ubicada a 2 horas de las principales ciudades: Miami, Tampa y Orlando. A 40 minutos del Aeropuerto Internacional de Fort Myers y a 40 minutos de las playas de Southwest Florida. A 1 h 30 min del Aeropuerto Internacional de Fort Lauderdale. Acceso al río Caloosahatchee con salida al océano.",
    distances: [
      { label: "Miami, Tampa y Orlando", value: "2 horas" },
      { label: "Aeropuerto Internacional de Fort Myers", value: "40 minutos" },
      { label: "Playas de Southwest Florida", value: "40 minutos" },
      { label: "Aeropuerto Internacional de Fort Lauderdale", value: "1 h 30 min" },
    ],
    features: [
      "Acceso al río Caloosahatchee con salida al océano",
      "Agua de ciudad",
    ],
    services: [
      "Agua de ciudad",
      "Sistema séptico",
    ],
  },
  {
    key: "lehighAcres",
    name: "Lehigh Acres",
    location: "Lehigh Acres, FL",
    description:
      "Lehigh Acres está ubicada a 30 minutos de Cape Coral, a 2 horas de las principales ciudades: Miami, Tampa y Orlando. A 40 minutos del Aeropuerto Internacional de Fort Myers y a 40 minutos de las playas de Southwest Florida. A 1 h 30 min del Aeropuerto Internacional de Fort Lauderdale. Acceso al río Caloosahatchee con salida al océano.",
    distances: [
      { label: "Cape Coral", value: "30 minutos" },
      { label: "Fort Myers", value: "20 minutos" },
      { label: "Miami, Tampa u Orlando", value: "2 horas" },
      { label: "Aeropuerto Internacional de Fort Myers", value: "40 minutos" },
      { label: "Playas de Southwest Florida", value: "40 minutos" },
      { label: "Aeropuerto Internacional de Fort Lauderdale", value: "1 h 30 min" },
    ],
    features: [
      "0% riesgo de inundación",
      "Costos de vida bajos",
      "Agua de pozo",
      "Acceso al río Caloosahatchee con salida al océano",
    ],
    services: [
      "Agua de pozo",
      "Sistema séptico",
    ],
  },
];

