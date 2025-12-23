"use client";

import { useEffect, useRef } from "react";
import { useLanguageStore } from "@/store/language-store";

/**
 * LanguageProvider: Asegura que las traducciones estén cargadas inmediatamente
 * 
 * Se ejecuta en el primer render del cliente para garantizar que las traducciones
 * estén disponibles antes de que otros componentes se rendericen
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
      
      // Verificar si hay traducciones válidas usando la misma lógica del store
      // Importar la función de validación (o duplicar la lógica simple)
      const hasValidTranslations = 
        currentState.translations &&
        typeof currentState.translations === "object" &&
        !Array.isArray(currentState.translations) &&
        Object.keys(currentState.translations).length > 0 &&
        // Verificar que tenga al menos las claves esenciales
        "home" in currentState.translations &&
        "nav" in currentState.translations &&
        "rentToOwn" in currentState.translations;

      // Si ya hay traducciones válidas, solo asegurar que el lang esté correcto
      if (hasValidTranslations) {
        const lang = currentState.language || "en";
        document.documentElement.lang = lang;
        
        // Verificación adicional: probar que las traducciones funcionen
        // Si no funcionan, forzar recarga
        const testKey = "rentToOwn.form.title";
        const testResult = currentState.t(testKey);
        if (testResult === testKey) {
          // La traducción no funciona, forzar recarga
          console.warn("[LanguageProvider] Translations appear incomplete, forcing reload...");
          try {
            await currentState.setLanguage(lang);
          } catch (error) {
            console.error("[LanguageProvider] Error reloading language:", error);
          }
        }
        return;
      }

      // Si no hay traducciones válidas, cargar inglés por defecto inmediatamente
      // No esperamos nada, cargamos directamente de forma síncrona si es posible
      try {
        // Usar setLanguage que maneja la carga de traducciones y auto-limpieza
        await currentState.setLanguage("en");
        
        // Verificar nuevamente después de la carga
        currentState = useLanguageStore.getState();
        if (currentState.language) {
          document.documentElement.lang = currentState.language;
        }
      } catch (error) {
        console.error("[LanguageProvider] Error loading default language:", error);
      }
    };

    // Ejecutar inmediatamente sin delay
    void initializeTranslations();
  }, []);

  return null;
}


