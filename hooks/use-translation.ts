"use client";

import { useLanguageStore } from "@/store/language-store";

/**
 * Hook para usar traducciones en componentes
 * @example
 * const { t, language, setLanguage, isLoading } = useTranslation();
 * <h1>{t("hero.title1")}</h1>
 * 
 * Para useMemo, usa language como dependencia (más estable que translations):
 * const data = useMemo(() => t("key"), [t, language]);
 */
export const useTranslation = () => {
  // Obtener funciones y estado del store
  // Usar selectores individuales para mejor rendimiento
  const t = useLanguageStore((state) => state.t);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const isLoading = useLanguageStore((state) => state.isLoading);
  // Obtener translations para verificar si están disponibles
  const translations = useLanguageStore((state) => state.translations);
  
  return {
    t,
    translations, // Exponer para casos especiales donde se necesita
    language: language || "en",
    setLanguage,
    isLoading,
  };
};

