"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguageStore } from "@/store/language-store";

/**
 * TranslationLoader: Asegura que las traducciones estén cargadas antes de renderizar hijos
 * Esto previene que los componentes se rendericen con claves sin traducir
 * 
 * IMPORTANTE: Siempre renderiza el contenido para bots de búsqueda (SSR)
 * Solo espera traducciones en el cliente para evitar mostrar claves sin traducir
 */
export function TranslationLoader({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(true); // Iniciar como true para SSR
  const [isClient, setIsClient] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);

    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Verificar si las traducciones están disponibles
    const hasTranslations = 
      translations &&
      typeof translations === "object" &&
      !Array.isArray(translations) &&
      Object.keys(translations).length > 0;

    if (hasTranslations && !isLoading) {
      setIsReady(true);
      return;
    }

    // Si no hay traducciones y no está cargando, cargar inglés
    if (!hasTranslations && !isLoading) {
      setLanguage("en").then(() => {
        setIsReady(true);
      }).catch(() => {
        // Aún así permitir render después de un delay para evitar bloqueo infinito
        timeoutRef.current = setTimeout(() => setIsReady(true), 100);
      });
    }

    // Timeout de seguridad: permitir render después de 500ms máximo
    // Esto evita bloqueos infinitos si hay algún problema
    timeoutRef.current = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [translations, isLoading, setLanguage]);

  // CRÍTICO: Siempre renderizar en SSR (cuando no estamos en el cliente)
  // Esto permite que Googlebot y otros crawlers vean el contenido
  if (!isClient) {
    return <>{children}</>;
  }

  // En el cliente, renderizar cuando esté listo
  if (isReady || (!isLoading && translations && Object.keys(translations).length > 0)) {
    return <>{children}</>;
  }

  // Mientras se cargan en el cliente, renderizar de todos modos para evitar página vacía
  // El timeout asegura que eventualmente se renderice
  return <>{children}</>;
}

