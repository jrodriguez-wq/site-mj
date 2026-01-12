"use client";

import { useEffect, useRef } from "react";

/**
 * Versión del sitio - Incrementa este número cuando quieras forzar
 * una limpieza de caché para todos los usuarios
 * 
 * Se recomienda incrementar después de actualizaciones importantes como:
 * - Cambios en traducciones
 * - Cambios en estilos críticos
 * - Cambios en JavaScript crítico
 * - Actualizaciones de contenido importante
 */
const SITE_VERSION = "1.0.0";

const STORAGE_KEY = "mj_newell_site_version";

/**
 * Componente que limpia automáticamente la caché del navegador
 * solo la primera vez que un usuario visita el sitio o cuando
 * hay una nueva versión disponible.
 * 
 * Esto asegura que todos los usuarios vean el contenido más reciente
 * sin tener que limpiar manualmente su caché.
 */
export const CacheBuster = () => {
  const hasChecked = useRef(false);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;
    
    // Evitar ejecuciones múltiples
    if (hasChecked.current) return;
    hasChecked.current = true;

    try {
      const storedVersion = localStorage.getItem(STORAGE_KEY);
      const urlParams = new URLSearchParams(window.location.search);
      const isReloaded = urlParams.has("_cb");

      // Si no hay versión almacenada o es diferente, limpiar caché
      if (storedVersion !== SITE_VERSION && !isReloaded) {
        // Limpiar caché del navegador si está disponible
        if ("caches" in window) {
          caches.keys().then((names) => {
            names.forEach((name) => {
              caches.delete(name);
            });
          }).catch(() => {
            // Ignorar errores de limpieza de caché
          });
        }

        // Guardar la nueva versión
        localStorage.setItem(STORAGE_KEY, SITE_VERSION);

        // Recargar con parámetro para evitar loops infinitos
        const url = new URL(window.location.href);
        url.searchParams.set("_cb", "1");
        window.location.href = url.toString();
      } else if (isReloaded) {
        // Limpiar el parámetro de la URL después de la recarga
        const url = new URL(window.location.href);
        url.searchParams.delete("_cb");
        window.history.replaceState({}, "", url.toString());
      }
    } catch (error) {
      // Si hay error (ej: modo privado sin localStorage), continuar normalmente
      console.warn("CacheBuster: No se pudo verificar la versión del sitio", error);
    }
  }, []); // Solo ejecutar una vez al montar

  // Este componente no renderiza nada
  return null;
};
