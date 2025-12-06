"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";

export function LanguageProvider() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const hasTranslations = Object.keys(translations).length > 0;
    
    // Si no hay traducciones, cargar el idioma por defecto (inglés)
    if (!hasTranslations && !isLoading) {
      const defaultLanguage = language || "en";
      setLanguage(defaultLanguage).catch(console.error);
    }
    
    if (hasTranslations) {
      document.documentElement.lang = language || "en";
    }
  }, [language, translations, isLoading, setLanguage]);

  // Cargar traducciones inmediatamente al montar si no están disponibles
  useEffect(() => {
    const hasTranslations = Object.keys(translations).length > 0;
    if (!hasTranslations && !isLoading) {
      const defaultLanguage = language || "en";
      setLanguage(defaultLanguage).catch(console.error);
    }
  }, []); // Solo ejecutar una vez al montar

  return null;
}

