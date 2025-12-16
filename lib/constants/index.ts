/**
 * Constantes centralizadas para la aplicación
 * Este archivo contiene todas las constantes reutilizables
 */

// Rutas principales
export const ROUTES = {
  HOME: "/",
  RENT_TO_OWN: "/rent-to-own",
  MODELS: "/models",
  SCHEDULE_APPOINTMENT: "/schedule-appointment",
  CONTACT: "/contact",
  ABOUT_US: "/about-us",
  WARRANTY: "/warranty",
  LABELLE: "/communities/labelle",
  LEHIGH_ACRES: "/communities/lehigh-acres",
  BUILD_WITH_US: "/build-with-us",
  HOME_BUYING_GUIDE: "/home-buying-guide",
} as const;

// IDs de formularios HubSpot
export const HUBSPOT_FORMS = {
  CONTACT: {
    portalId: "50215941",
    formId: "93068cd5-cb63-461a-b7a6-00a3ca4fcd0a",
    region: "na1" as const,
  },
  SCHEDULE_APPOINTMENT: {
    portalId: "50215941",
    formId: "77bc0a99-fc8a-4509-8eb5-1b457f3452df",
    region: "na1" as const,
  },
  WARRANTY: {
    portalId: "50215941",
    formId: "warranty-form-id", // Actualizar con el ID real
    region: "na1" as const,
  },
} as const;

// Configuración de imágenes
export const IMAGE_CONFIG = {
  QUALITY: 85,
  BLUR_DATA_URL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  PLACEHOLDER_SIZES: {
    SMALL: "16x16",
    MEDIUM: "32x32",
    LARGE: "64x64",
  },
} as const;

// Breakpoints responsive
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Tiempos de animación (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Configuración de caché
export const CACHE_CONFIG = {
  STATIC_ASSETS: "public, max-age=31536000, immutable",
  HTML: "public, max-age=3600, must-revalidate",
  API: "public, max-age=300, stale-while-revalidate=600",
} as const;

