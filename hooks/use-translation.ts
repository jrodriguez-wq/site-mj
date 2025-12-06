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
    // Usar inglés por defecto si no hay idioma seleccionado
    const currentLanguage = language || "en";
    if (Object.keys(translations).length === 0 && !isLoading) {
      setLanguage(currentLanguage).catch((err) => {
        console.error("Error loading translations:", err);
        // Si falla, intentar cargar inglés
        if (currentLanguage !== "en") {
          setLanguage("en").catch(console.error);
        }
      });
    }
  }, [translations, isLoading, language, setLanguage]);

  return {
    t,
    language: language || "en",
    setLanguage,
    isLoading,
  };
};

