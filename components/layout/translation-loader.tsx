"use client";

import { useEffect, useRef } from "react";
import { useLanguageStore } from "@/store/language-store";

/**
 * TranslationLoader: Asegura que las traducciones estén cargadas
 * 
 * IMPORTANTE: Siempre renderiza el contenido para evitar problemas de hidratación
 * Las traducciones se cargarán en background y se actualizarán cuando estén listas
 */
export function TranslationLoader({ children }: { children: React.ReactNode }) {
  const hasInitializedRef = useRef(false);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

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
      "nav" in translations &&
      "rentToOwn" in translations;

    // Si ya hay traducciones válidas, no hacer nada
    if (hasValidTranslations && !isLoading) {
      return;
    }

    // Si no hay traducciones válidas, cargar inglés por defecto
    // (El persist middleware ya maneja la persistencia y recuperación del idioma guardado)
    if (!hasValidTranslations && !isLoading) {
      // Siempre cargar inglés por defecto
      // Si el usuario había seleccionado otro idioma, el persist middleware lo restaurará
      setLanguage("en").catch(() => {
        console.error("[TranslationLoader] Failed to load default language (en)");
      });
    }
  }, [translations, isLoading, setLanguage]);

  // CRÍTICO: Siempre renderizar para evitar problemas de hidratación
  // Las traducciones se actualizarán cuando estén disponibles
  return <>{children}</>;
}

