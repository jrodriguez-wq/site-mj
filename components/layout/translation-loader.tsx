"use client";

import { useEffect, useRef, useMemo } from "react";
import { useLanguageStore } from "@/store/language-store";
import { TranslationLoadingScreen } from "./translation-loading-screen";

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

  // Verificar si las traducciones están disponibles y son válidas
  const hasValidTranslations = useMemo(() => {
    return (
      translations &&
      typeof translations === "object" &&
      !Array.isArray(translations) &&
      Object.keys(translations).length > 0 &&
      "home" in translations &&
      "nav" in translations &&
      "rentToOwn" in translations
    );
  }, [translations]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    if (hasValidTranslations && !isLoading) return;

    // Siempre disparar carga cuando faltan traducciones (incl. si isLoading viene true al inicio)
    if (!hasValidTranslations) {
      setLanguage("en").catch(() => {
        console.error("[TranslationLoader] Failed to load default language (en)");
      });
    }
  }, [hasValidTranslations, isLoading, setLanguage]);

  // CRÍTICO: Siempre renderizar para evitar problemas de hidratación
  // Las traducciones se actualizarán cuando estén disponibles
  return (
    <>
      <TranslationLoadingScreen 
        isLoading={isLoading} 
        hasValidTranslations={hasValidTranslations}
      />
      {children}
    </>
  );
}

