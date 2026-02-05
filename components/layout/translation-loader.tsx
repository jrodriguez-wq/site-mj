"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { useLanguageStore } from "@/store/language-store";
import { TranslationLoadingScreen } from "./translation-loading-screen";

/**
 * TranslationLoader: Asegura que las traducciones estén cargadas antes de mostrar contenido.
 *
 * Por qué se veían claves (title.hero1, nav.home, etc.):
 * 1. En el servidor no hay localStorage ni acceso a JSON de idiomas, así que el store
 *    arranca con translations = {} y t(key) devuelve la clave.
 * 2. Los componentes se montan y renderizan con ese estado, por eso el HTML inicial
 *    (y a veces la primera pintada en cliente) mostraba las claves.
 *
 * Solución: No renderizar el contenido que usa t() hasta tener traducciones válidas.
 * Así nunca se pinta texto sin traducir. Se muestra solo la pantalla de carga hasta
 * que las traducciones estén listas.
 *
 * canShowContent evita hydration mismatch: en el primer render (servidor y cliente)
 * es false; tras el primer useEffect en cliente pasa a true. Así servidor y cliente
 * coinciden en "solo loading" y el contenido solo aparece cuando hay traducciones.
 */
export function TranslationLoader({ children }: { children: React.ReactNode }) {
  const hasInitializedRef = useRef(false);
  const [canShowContent, setCanShowContent] = useState(false);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const syncTranslationsFromDefaultScript = useLanguageStore((state) => state.syncTranslationsFromDefaultScript);

  const hasValidTranslations = useMemo(() => {
    return (
      translations &&
      typeof translations === "object" &&
      !Array.isArray(translations) &&
      Object.keys(translations).length > 0 &&
      "home" in translations &&
      "nav" in translations &&
      "rentToOwn" in translations &&
      "hero" in translations &&
      "communities" in translations &&
      "carousel" in translations
    );
  }, [translations]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = setTimeout(() => setCanShowContent(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    if (hasValidTranslations && !isLoading) return;

    if (syncTranslationsFromDefaultScript()) return;

    setLanguage("en").catch(() => {
      console.error("[TranslationLoader] Failed to load default language (en)");
    });

    // Reintentar solo sync tras 100ms (por si el script inline se ejecutó después del store en producción)
    const timeoutId = setTimeout(() => {
      const state = useLanguageStore.getState();
      if (!state.translations || Object.keys(state.translations).length === 0) {
        syncTranslationsFromDefaultScript();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [hasValidTranslations, isLoading, setLanguage, syncTranslationsFromDefaultScript]);

  const shouldRenderChildren = canShowContent && hasValidTranslations;

  return (
    <>
      <TranslationLoadingScreen
        isLoading={isLoading}
        hasValidTranslations={hasValidTranslations}
        isContentReady={shouldRenderChildren}
      />
      {shouldRenderChildren ? children : null}
    </>
  );
}

