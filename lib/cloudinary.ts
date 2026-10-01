/**
 * Cloudinary – punto único para todas las imágenes del sitio.
 *
 * Usar getCloudinaryImageUrl() para:
 * - /img/* (hero, logo, team, blog, etc.)
 * - /recursos/* (rto, clientes, shutterstock, comunidades, etc.)
 *
 * No usar para lo que sigue en public (base): favicon, site.webmanifest,
 * logos en raíz (/hsb.png, /sld.png, etc.), robots.txt.
 *
 * Mapeo generado por: node scripts/list-cloudinary-images.mjs
 */

import {
  LOCAL_PATH_TO_CLOUDINARY_URL,
  CLOUDINARY_PATH_TO_URL,
} from "@/config/cloudinary-urls.generated";

/**
 * Devuelve la URL real en Cloudinary para un path local.
 * Primero busca en LOCAL_PATH_TO_CLOUDINARY_URL (paths esperados), luego en
 * CLOUDINARY_PATH_TO_URL (todas las imágenes listadas en Cloudinary, ej. modelos).
 * Si no está en ningún mapeo, devuelve el path tal cual (assets en public).
 */
export function getCloudinaryImageUrl(localPath: string): string {
  if (!localPath || typeof localPath !== "string") return localPath;
  const trimmed = localPath.trim();
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const withoutSlash = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
  const url =
    LOCAL_PATH_TO_CLOUDINARY_URL[withSlash] ??
    LOCAL_PATH_TO_CLOUDINARY_URL[withoutSlash] ??
    CLOUDINARY_PATH_TO_URL[withSlash] ??
    CLOUDINARY_PATH_TO_URL[withoutSlash];
  return url ?? trimmed;
}
