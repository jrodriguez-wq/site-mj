"use client";

import { useEffect } from "react";

/**
 * Registra el Service Worker para PWA: app instalable y cargas más rápidas en visitas repetidas.
 */
export function RegisterSw() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    window.navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        // Actualizar SW en segundo plano cuando haya nueva versión
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // Hay una nueva versión; en la siguiente visita se usará
            }
          });
        });
      })
      .catch(() => {});
  }, []);

  return null;
}
