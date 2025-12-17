"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language-store";

export function LanguageProvider() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar traducciones inmediatamente al montar si no están disponibles
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const hasTranslations = Object.keys(translations).length > 0;
    
    // Si ya está inicializado, no hacer nada más
    if (isInitialized && hasTranslations) {
      return;
    }
    
    // Si no hay traducciones y no está cargando, cargar el idioma seleccionado o inglés por defecto
    if (!hasTranslations && !isLoading) {
      const defaultLanguage = language || "en";
      setLanguage(defaultLanguage)
        .then(() => {
          setIsInitialized(true);
        })
        .catch((err) => {
          console.error("Error loading default language:", err);
          // Si falla, intentar cargar inglés directamente
          if (defaultLanguage !== "en") {
            setLanguage("en")
              .then(() => setIsInitialized(true))
              .catch(console.error);
          } else {
            setIsInitialized(true);
          }
        });
    } else if (hasTranslations) {
      setIsInitialized(true);
    }
    
    // Actualizar el atributo lang del documento
    if (hasTranslations) {
      document.documentElement.lang = language || "en";
    } else if (!isLoading) {
      // Si no hay traducciones pero tampoco está cargando, establecer inglés por defecto
      document.documentElement.lang = "en";
    }
  }, [language, translations, isLoading, setLanguage, isInitialized]);

  return null;
}

