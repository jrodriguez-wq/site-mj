"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";

export const LanguageInitializer = ({ children }: { children: React.ReactNode }) => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);

  useEffect(() => {
    // Cargar traducciones inmediatamente en el cliente si no están cargadas
    if (Object.keys(translations).length === 0 && !isLoading) {
      setLanguage(language).catch((err) => {
        console.error("Error loading translations:", err);
      });
    } else if (Object.keys(translations).length > 0) {
      if (typeof document !== "undefined") {
        document.documentElement.lang = language;
      }
    }
  }, [language, translations, isLoading, setLanguage]);

  return <>{children}</>;
};

