"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";

export function LanguageProvider() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);

  // Cargar traducciones inmediatamente al montar si no están disponibles
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const hasTranslations = Object.keys(translations).length > 0;
    
    // Si no hay traducciones y no está cargando, cargar inglés por defecto
    if (!hasTranslations && !isLoading) {
      const defaultLanguage = language || "en";
      setLanguage(defaultLanguage).catch((err) => {
        console.error("Error loading default language:", err);
        // Si falla, intentar cargar inglés directamente
        if (defaultLanguage !== "en") {
          setLanguage("en").catch(console.error);
        }
      });
    }
    
    // Actualizar el atributo lang del documento
    if (hasTranslations) {
      document.documentElement.lang = language || "en";
    } else if (!isLoading) {
      // Si no hay traducciones pero tampoco está cargando, establecer inglés por defecto
      document.documentElement.lang = "en";
    }
  }, [language, translations, isLoading, setLanguage]);

  return null;
}

