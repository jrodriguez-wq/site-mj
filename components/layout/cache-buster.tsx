"use client";

import { useEffect, useRef } from "react";
import { APP_VERSION } from "@/config/version";

const STORAGE_KEY = "mj_newell_site_version";
const LANGUAGE_STORAGE_KEY = "language-storage";

/**
 * Limpia el storage de idioma (traducciones) para forzar recarga fresca
 * alineada con APP_VERSION.
 */
const clearLanguageStorage = (): void => {
  try {
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
  } catch {
    // Ignorar (ej. modo privado)
  }
};

/**
 * Actualiza a todos los usuarios sin pedirles borrar caché.
 *
 * Cuando APP_VERSION sube (ej. 2.3.0 → 2.3.1) y el usuario entra al sitio:
 * 1. Se borra language-storage (traducciones viejas/corruptas).
 * 2. Se borra la Cache API del navegador.
 * 3. Se recarga la página con ?_cb=1 (luego se quita la query).
 * En esa segunda carga ya tienen el HTML/JS nuevo y traducciones frescas (script del servidor).
 *
 * Incrementa APP_VERSION en @/config/version cuando actualices
 * traducciones o contenido crítico.
 */
export const CacheBuster = () => {
  const hasChecked = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasChecked.current) return;
    hasChecked.current = true;

    try {
      const storedVersion = localStorage.getItem(STORAGE_KEY);
      const urlParams = new URLSearchParams(window.location.search);
      const isReloaded = urlParams.has("_cb");

      if (storedVersion !== APP_VERSION && !isReloaded) {
        if ("caches" in window) {
          caches.keys().then((names) => {
            names.forEach((name) => caches.delete(name));
          }).catch(() => {});
        }

        clearLanguageStorage();
        localStorage.setItem(STORAGE_KEY, APP_VERSION);

        const url = new URL(window.location.href);
        url.searchParams.set("_cb", "1");
        window.location.href = url.toString();
      } else if (isReloaded) {
        const url = new URL(window.location.href);
        url.searchParams.delete("_cb");
        window.history.replaceState({}, "", url.toString());
      }
    } catch (error) {
      console.warn("CacheBuster: No se pudo verificar la versión del sitio", error);
    }
  }, []);

  return null;
};
