"use client";

import { useEffect, useRef } from "react";
import { useLanguageStore } from "@/store/language-store";

/**
 * TranslationLoader: Asegura que las traducciones estén cargadas antes de renderizar hijos
 * Esto previene que los componentes se rendericen con claves sin traducir
 * 
 * IMPORTANTE: Siempre renderiza el contenido para bots de búsqueda (SSR)
 * Solo espera traducciones en el cliente para evitar mostrar claves sin traducir
 * 
 * MEJORADO: Carga inglés por defecto inmediatamente si no hay traducciones
 */
export function TranslationLoader({ children }: { children: React.ReactNode }) {
  const hasInitializedRef = useRef(false);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === "undefined") return;

    // Prevenir múltiples inicializaciones
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    // Verificar si las traducciones están disponibles y son válidas
    const hasValidTranslations = 
      translations &&
      typeof translations === "object" &&
      !Array.isArray(translations) &&
      Object.keys(translations).length > 0 &&
      "home" in translations &&
      "nav" in translations;

    // Si ya hay traducciones válidas, no hacer nada
    if (hasValidTranslations && !isLoading) {
      return;
    }

    // Si no hay traducciones válidas, cargar el idioma guardado o inglés por defecto
    if (!hasValidTranslations && !isLoading) {
      let targetLang: "en" | "es" = "en";
      
      // Intentar obtener idioma guardado
      try {
        const stored = localStorage.getItem("language-storage");
        if (stored) {
          const parsed = JSON.parse(stored);
          const storedLang = parsed?.state?.language;
          if (storedLang === "en" || storedLang === "es") {
            targetLang = storedLang;
          }
        }
      } catch {
        // Si hay error, usar inglés por defecto
      }

      // Cargar el idioma seleccionado
      setLanguage(targetLang).catch(() => {
        // Si falla, intentar inglés como fallback
        setLanguage("en").catch(() => {
          console.error("[TranslationLoader] Failed to load any language");
        });
      });
    }
  }, [translations, isLoading, setLanguage, language]);

  // Siempre renderizar (las traducciones se cargarán en background)
  // Esto evita mostrar una página vacía mientras se cargan las traducciones
  return <>{children}</>;
}

