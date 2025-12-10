/**
 * Información completa del programa Rent to Own
 */

export interface SavingsPlan {
  duration: string;
  monthlySavings: string;
  totalSavings: string;
  description: string;
}

export interface Requirement {
  title: string;
  description: string;
}

export interface Document {
  name: string;
  description?: string;
}

export const RTO_SAVINGS_PLANS: SavingsPlan[] = [
  {
    duration: "1 año",
    monthlySavings: "$1,000 USD",
    totalSavings: "Hasta $12,000 USD",
    description: "Ideal para quienes planean comprar pronto",
  },
  {
    duration: "2 años",
    monthlySavings: "$800 USD",
    totalSavings: "Hasta $19,200 USD",
    description: "Plan intermedio con ahorro sólido",
  },
  {
    duration: "3 años",
    monthlySavings: "$600 USD",
    totalSavings: "Hasta $21,600 USD",
    description: "Opción flexible para familias que se preparan para comprar",
  },
  {
    duration: "4 a 5 años",
    monthlySavings: "$300 USD",
    totalSavings: "Hasta $18,000 USD",
    description: "Plan de ahorro a largo plazo y mayor estabilidad",
  },
];

export const RTO_KEY_FEATURES = [
  {
    title: "Renta mínima",
    description: "$2,500 USD mensuales (modelo Emelia). El valor puede variar según el modelo y la ubicación.",
  },
  {
    title: "Ahorro mensual",
    description: "Entre $300 y $1,000 USD según el plan elegido para tu futura compra.",
  },
  {
    title: "Precios congelados",
    description: "Pagos y precios congelados hasta por 5 años.",
  },
  {
    title: "Mantenimiento incluido",
    description: "Incluye mantenimiento y jardinería gratuitos.",
  },
  {
    title: "Mascotas permitidas",
    description: "Se aceptan mascotas.",
  },
  {
    title: "Sin verificación de crédito",
    description: "No se requiere crédito ni verificación de empleo.",
  },
  {
    title: "Ingreso fácil",
    description: "¡Ingresar con un solo mes!",
  },
];

export const RTO_REQUIREMENTS: Requirement[] = [
  {
    title: "Ingreso mínimo",
    description: "Ingreso familiar o individual de al menos $6,000 USD mensuales. Recuerda que tus ingresos puedes calcularlos con tus Banks statements (estados de cuenta bancarios) cash (efectivo) y referencias comerciales.",
  },
  {
    title: "Sin historial de desalojos",
    description: "No tener historial de desalojos.",
  },
  {
    title: "Estado migratorio",
    description: "Ser ciudadano, residente, contar con permiso de trabajo vigente o tener ITIN.",
  },
];

export const RTO_DOCUMENTS: Document[] = [
  {
    name: "Impuestos de los últimos 2 años",
    description: "W2 o 1099",
  },
  {
    name: "Desprendibles de pago",
    description: "Últimos 30 días",
  },
  {
    name: "Estados de cuenta bancarios",
    description: "Últimos 60 días",
  },
  {
    name: "Licencia de conducir o ID",
    description: "Identificación válida",
  },
  {
    name: "Seguro Social o ITIN",
    description: "Número de identificación",
  },
];

export const RTO_PROCESS_STEPS = [
  {
    step: 1,
    title: "Enviar documentos",
    description: "Envía los documentos requeridos para iniciar tu aplicación.",
  },
  {
    step: 2,
    title: "Completar aplicación",
    description: "Completa la aplicación RTO ($50 por solicitante).",
  },
  {
    step: 3,
    title: "Entrevista y revisión",
    description: "Entrevista y revisión de documentos por nuestro equipo.",
  },
  {
    step: 4,
    title: "Firma del contrato",
    description: "Firma del contrato y pago del depósito.",
  },
  {
    step: 5,
    title: "Asignación y mudanza",
    description: "Asignación de vivienda y fecha de mudanza.",
  },
];

export const RTO_OBJECTIVE = "Ayudar a las familias a ahorrar mientras viven en una casa nueva, acumulando fondos que luego pueden usar como parte del pago inicial para su futura compra.";

export const RTO_DESCRIPTION = "El programa Rent to Own (RTO) te permite vivir desde ya en una casa nueva mientras una parte de tu renta mensual se acumula como ahorro para tu futura compra. No somos una renta tradicional. Pagas por vivir en tu nueva casa. Parte de ese pago mensual se convierte en ahorro. Al finalizar tu plan, puedes usar ese ahorro como enganche o parte del pago inicial de tu vivienda.";

