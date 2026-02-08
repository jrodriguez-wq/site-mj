/**
 * Versión única del sitio. Incrementar cuando quieras forzar:
 * - Limpieza de caché (CacheBuster) y recarga para todos los usuarios
 *
 * Úsala después de cambios en estilos o JS crítico, o actualizaciones importantes de contenido.
 */
export const APP_VERSION = "2.3.2";

/**
 * Año actual (según la fecha del sistema en build/request).
 * Usar para copyright en footer, "Last updated" en legal, etc.
 * Se actualiza solo; no hace falta tocarlo al cambiar de año.
 */
export const CURRENT_YEAR = new Date().getFullYear();
