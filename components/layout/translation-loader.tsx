"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "@/store/language-store";

/**
 * TranslationLoader: Asegura que las traducciones estén cargadas antes de renderizar hijos
 * Esto previene que los componentes se rendericen con claves sin traducir
 * 
 * IMPORTANTE: Siempre renderiza el contenido para bots de búsqueda (SSR)
 * En el cliente, espera a que las traducciones estén disponibles antes de renderizar
 */
export function TranslationLoader({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasInitializedRef = useRef(false);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === "undefined") return;

    // Verificar si las traducciones están disponibles y son válidas
    const hasValidTranslations = 
      translations &&
      typeof translations === "object" &&
      !Array.isArray(translations) &&
      Object.keys(translations).length > 0 &&
      "home" in translations &&
      "nav" in translations &&
      "rentToOwn" in translations;

    // Si hay traducciones válidas y no está cargando, marcar como listo
    if (hasValidTranslations && !isLoading) {
      setIsReady(true);
      return;
    }

    // Si no hay traducciones válidas y no está cargando, cargar el idioma
    if (!hasValidTranslations && !isLoading && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      
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
      setLanguage(targetLang)
        .then(() => {
          setIsReady(true);
        })
        .catch(() => {
          // Si falla, intentar inglés como fallback
          setLanguage("en")
            .then(() => {
              setIsReady(true);
            })
            .catch(() => {
              console.error("[TranslationLoader] Failed to load any language");
              // Aún así marcar como listo para evitar bloqueo infinito
              setIsReady(true);
            });
        });
    }
  }, [translations, isLoading, setLanguage, language]);

  // CRÍTICO: Siempre renderizar en SSR (cuando no estamos en el cliente)
  // Esto permite que Googlebot y otros crawlers vean el contenido
  if (!isClient) {
    return <>{children}</>;
  }

  // En el cliente, esperar a que las traducciones estén listas
  // Timeout de seguridad: después de 500ms, renderizar de todos modos
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Renderizar cuando esté listo o después del timeout
  if (isReady || (!isLoading && translations && Object.keys(translations).length > 0)) {
    return <>{children}</>;
  }

  // Mientras se cargan, mostrar un loader mínimo o nada (evita mostrar claves sin traducir)
  // Usar un pequeño delay para dar tiempo a que las traducciones se carguen desde localStorage
  return null;
}

