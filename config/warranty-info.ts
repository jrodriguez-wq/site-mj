/**
 * Información de garantías de M.J. Newell Homes
 */

export interface WarrantyInfo {
  type: string;
  duration: string;
  coverage: string;
}

export const WARRANTY_INFO: WarrantyInfo[] = [
  {
    type: "Estructural",
    duration: "10 años",
    coverage: "Construcción general",
  },
  {
    type: "Hidráulica / Plomería",
    duration: "1 año",
    coverage: "Fugas y piezas",
  },
  {
    type: "Eléctrica",
    duration: "1 año",
    coverage: "Sistema completo",
  },
  {
    type: "Tanque séptico",
    duration: "1 año",
    coverage: "Funcionamiento completo",
  },
  {
    type: "General",
    duration: "1 año",
    coverage: "Acabados y mantenimiento inicial",
  },
];

