"use client";

import { getCopy, COPY } from "@/lib/constants/copy";

/**
 * Hook para contenido en inglés. Devuelve getCopy como t y COPY como translations.
 * Todo el sitio usa inglés desde locales/en.json sin carga asíncrona ni store.
 */
export const useTranslation = () => ({
  t: getCopy,
  translations: COPY as Record<string, unknown>,
  language: "en" as const,
  setLanguage: async (_lang: "en" | "es") => {},
  isLoading: false,
});
