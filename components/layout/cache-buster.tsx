"use client";

import { useEffect, useRef } from "react";
import { APP_VERSION } from "@/config/version";

const STORAGE_KEY = "mj_newell_site_version";

/**
 * When APP_VERSION changes (e.g. 2.3.0 → 2.3.1), on next visit:
 * 1. Browser Cache API is cleared.
 * 2. Page reloads with ?_cb=1 (then query is removed).
 * Bump APP_VERSION in @/config/version when you deploy critical content changes.
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
