import type { NextRequest } from "next/server";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

const locales: Record<string, unknown> = { en, es };

/**
 * Sirve las traducciones por GET para fallback cuando el dynamic import falla (ej. producción).
 * GET /locales/en → en.json
 * GET /locales/es → es.json
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ lang: string }> }
) {
  const { lang } = await context.params;
  const data = locales[lang] ?? locales.en;
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
