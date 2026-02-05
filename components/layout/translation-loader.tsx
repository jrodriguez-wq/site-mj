"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { useLanguageStore } from "@/store/language-store";
import { TranslationLoadingScreen } from "./translation-loading-screen";

const LOADING_SAFETY_MS = 2500;

/**
 * TranslationLoader: Muestra contenido solo cuando hay traducciones válidas.
 * Incluye timeout de seguridad para que la pantalla de carga nunca se quede colgada.
 */
export function TranslationLoader({ children }: { children: React.ReactNode }) {
  const hasInitializedRef = useRef(false);
  const [canShowContent, setCanShowContent] = useState(false);
  const [forceShowContent, setForceShowContent] = useState(false);
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

    const t1 = setTimeout(() => {
      const state = useLanguageStore.getState();
      if (!state.translations || Object.keys(state.translations).length === 0) {
        syncTranslationsFromDefaultScript();
      }
    }, 100);

    return () => clearTimeout(t1);
  }, [hasValidTranslations, isLoading, setLanguage, syncTranslationsFromDefaultScript]);

  // Timeout de seguridad: si tras LOADING_SAFETY_MS seguimos sin traducciones, mostrar contenido igual
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasValidTranslations) return;

    const safetyId = setTimeout(() => {
      const state = useLanguageStore.getState();
      if (!state.translations || Object.keys(state.translations).length === 0) {
        syncTranslationsFromDefaultScript();
        setForceShowContent(true);
      }
    }, LOADING_SAFETY_MS);

    return () => clearTimeout(safetyId);
  }, [hasValidTranslations, syncTranslationsFromDefaultScript]);

  const shouldRenderChildren = (canShowContent && hasValidTranslations) || forceShowContent;

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

