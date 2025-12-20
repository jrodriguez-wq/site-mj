"use client";

import { useEffect, useRef } from "react";
import { useLanguageStore } from "@/store/language-store";

export function LanguageProvider() {
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasInitializedRef.current) return;

    // Esperar un tick para que la rehidratación de Zustand complete
    const initTranslations = async () => {
      const currentState = useLanguageStore.getState();
      const hasTranslations = Object.keys(currentState.translations).length > 0;
      
      // Si ya hay traducciones (desde localStorage o rehidratación), solo asegurar que el lang esté correcto
      if (hasTranslations) {
        if (typeof document !== "undefined" && currentState.language) {
          document.documentElement.lang = currentState.language;
        }
        hasInitializedRef.current = true;
        return;
      }
      
      // Si no hay traducciones, cargar el idioma por defecto (inglés)
      if (!currentState.isLoading) {
        hasInitializedRef.current = true;
        const currentLanguage = currentState.language || "en";
        try {
          await currentState.setLanguage(currentLanguage);
        } catch (err) {
          console.error("Error loading default language:", err);
          hasInitializedRef.current = false;
        }
      }
    };

    // Usar requestAnimationFrame para asegurar que el DOM y la rehidratación estén listos
    requestAnimationFrame(() => {
      initTranslations();
    });
  }, []);

  return null;
}

