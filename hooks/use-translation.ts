"use client";

import { getCopy, COPY } from "@/lib/constants/copy";

/**
 * English-only copy. Returns getCopy as t and COPY as translations.
 * All copy lives in lib/constants/copy.ts (no i18n, no async loading).
 */
export const useTranslation = () => ({
  t: getCopy,
  translations: COPY as Record<string, unknown>,
  language: "en" as const,
  setLanguage: async (_lang: "en" | "es") => {},
  isLoading: false,
});
