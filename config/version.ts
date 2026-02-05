/**
 * Versión única del sitio. Incrementar cuando quieras forzar:
 * - Limpieza de caché (CacheBuster) y recarga para todos los usuarios
 * - Invalidación de traducciones en localStorage (language-store)
 *
 * Cómo actualizar a todos los usuarios (sin pedirles borrar caché):
 * 1. Incrementa APP_VERSION (ej. 2.3.0 → 2.3.1)
 * 2. Despliega. En su próxima visita:
 *    - El store ignora traducciones guardadas (versión distinta) y usa las del servidor.
 *    - CacheBuster limpia language-storage, limpia Cache API y recarga la página una vez.
 * Así todos reciben traducciones correctas sin ser programadores.
 *
 * Úsala después de:
 * - Cambios en traducciones (en.json / es.json)
 * - Cambios en estilos o JS crítico
 * - Actualizaciones importantes de contenido
 */
export const APP_VERSION = "2.3.2";
