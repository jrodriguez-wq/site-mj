"use client";

import { useEffect, useRef } from "react";
import { useLanguageStore } from "@/store/language-store";

/**
 * LanguageProvider: Asegura que las traducciones estén cargadas inmediatamente
 * 
 * Se ejecuta en el primer render del cliente para garantizar que las traducciones
 * estén disponibles antes de que otros componentes se rendericen
 * 
 * PRIORIDAD: Cargar inglés por defecto si no hay traducciones válidas
 */
export function LanguageProvider() {
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === "undefined") return;
    
    // Prevenir múltiples ejecuciones
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const initializeTranslations = async () => {
      // Verificar inmediatamente el estado actual
      let currentState = useLanguageStore.getState();
      
      // Verificar si hay traducciones válidas en el store
      const hasValidTranslations = 
        currentState.translations &&
        typeof currentState.translations === "object" &&
        !Array.isArray(currentState.translations) &&
        Object.keys(currentState.translations).length > 0 &&
        "home" in currentState.translations &&
        "nav" in currentState.translations &&
        "rentToOwn" in currentState.translations;

      // Si ya hay traducciones válidas, verificar que funcionen
      if (hasValidTranslations) {
        const lang = currentState.language || "en";
        if (typeof document !== "undefined") {
          document.documentElement.lang = lang;
        }
        
        // Verificar que las traducciones funcionen correctamente
        const testKey = "nav.home";
        const testResult = currentState.t(testKey);
        if (testResult === testKey) {
          // La traducción no funciona, forzar recarga
          console.warn("[LanguageProvider] Translations appear incomplete, forcing reload...");
          try {
            await currentState.setLanguage(lang);
          } catch (error) {
            console.error("[LanguageProvider] Error reloading language:", error);
            // Fallback a inglés si falla
            try {
              await currentState.setLanguage("en");
              if (typeof document !== "undefined") {
                document.documentElement.lang = "en";
              }
            } catch {
              // Silenciar error de fallback
            }
          }
        }
        return;
      }

      // Si no hay traducciones válidas, cargar inglés por defecto
      // (El persist middleware ya maneja la persistencia en localStorage)
      try {
        // Siempre cargar inglés por defecto si no hay traducciones válidas
        await currentState.setLanguage("en");
        
        // Verificar nuevamente después de la carga
        currentState = useLanguageStore.getState();
        if (currentState.language && typeof document !== "undefined") {
          document.documentElement.lang = currentState.language;
        }
      } catch (error) {
        console.error("[LanguageProvider] Error loading default language (en):", error);
        // El error ya está manejado en setLanguage, pero intentamos asegurar el lang del documento
        if (typeof document !== "undefined") {
          document.documentElement.lang = "en";
        }
      }
    };

    // Ejecutar inmediatamente sin delay
    // Usar microtask para ejecutar lo más rápido posible, antes del siguiente render
    Promise.resolve().then(() => {
      void initializeTranslations();
    });
  }, []);

  return null;
}


