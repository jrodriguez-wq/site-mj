/**
 * Contenido en inglés para todo el sitio.
 * Importado desde locales/en.json; usar getCopy("key.path") en componentes.
 */
import en from "@/locales/en.json";

const COPY = en as Record<string, unknown>;

export function getCopy(path: string): string {
  const keys = path.split(".");
  let current: unknown = COPY;
  for (const k of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[k];
  }
  return typeof current === "string" ? current : path;
}

export { COPY };
