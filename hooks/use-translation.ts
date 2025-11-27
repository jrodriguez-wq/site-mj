"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";

/**
 * Hook para usar traducciones en componentes
 * @example
 * const { t, language, setLanguage } = useTranslation();
 * <h1>{t("hero.title1")}</h1>
 */
export const useTranslation = () => {
  const { language, translations, setLanguage, t, isLoading } = useLanguageStore();

  useEffect(() => {
    // Asegurar que las traducciones se carguen si no están disponibles
    if (Object.keys(translations).length === 0 && !isLoading) {
      setLanguage(language).catch((err) => {
        console.error("Error loading translations:", err);
      });
    }
  }, [translations, isLoading, language, setLanguage]);

  return {
    t,
    language,
    setLanguage,
    isLoading,
  };
};

