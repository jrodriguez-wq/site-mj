"use client";

import { useLanguageStore } from "@/store/language-store";

/**
 * Hook para usar traducciones en componentes
 * @example
 * const { t, language, setLanguage, translations } = useTranslation();
 * <h1>{t("hero.title1")}</h1>
 * 
 * Para useMemo, usa translations como dependencia:
 * const data = useMemo(() => ..., [translations]);
 */
export const useTranslation = () => {
  // Obtener tanto t como translations para optimizaciones
  const t = useLanguageStore((state) => state.t);
  const translations = useLanguageStore((state) => state.translations);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const isLoading = useLanguageStore((state) => state.isLoading);
  
  return {
    t,
    translations, // Exponer translations para usar como dependencia en useMemo
    language: language || "en",
    setLanguage,
    isLoading,
  };
};

