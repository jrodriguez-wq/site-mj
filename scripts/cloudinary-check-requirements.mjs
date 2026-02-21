#!/usr/bin/env node
/**
 * Revisa qué hay en Cloudinary vs lo que la app necesita.
 * Usa la API para listar recursos y compara con los public_id esperados.
 *
 * Uso: node scripts/cloudinary-check-requirements.mjs
 *
 * Requiere .env.local con CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * (o CLOUDINARY_URL).
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const envPath = join(root, ".env.local");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  }
}

loadEnv();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryUrl = process.env.CLOUDINARY_URL;

let finalCloudName = cloudName;
let finalApiKey = apiKey;
let finalApiSecret = apiSecret;

if (cloudinaryUrl && cloudinaryUrl.startsWith("cloudinary://")) {
  try {
    const u = new URL(cloudinaryUrl);
    finalCloudName = u.hostname;
    finalApiKey = u.username;
    finalApiSecret = u.password;
  } catch (e) {
    console.error("CLOUDINARY_URL inválida:", e.message);
    process.exit(1);
  }
}

if (!finalCloudName || !finalApiKey || !finalApiSecret) {
  console.error("Faltan credenciales. Define CLOUDINARY_* en .env.local.");
  process.exit(1);
}

const auth = Buffer.from(`${finalApiKey}:${finalApiSecret}`).toString("base64");

/** public_id que la app espera (path sin / y sin extensión, como en lib/cloudinary.ts) */
const EXPECTED_PUBLIC_IDS = [
  "img/logo",
  "img/logo-blanco",
  "img/logo-fondo-azul-01",
  "img/hero/1w5a0754-e4",
  "img/hero/1w5a0741-1",
  "img/hero/1w5a0814-1",
  "img/hero/1w5a1489-e5",
  "img/hero/1w5a1456-e5",
  "img/hero/1w5a1493-e5",
  "img/hero/1w5a1505-e5",
  "img/hero/aurora",
  "img/oficina",
  "img/michael",
  "img/team",
  "img/juliana",
  "img/nader",
  "img/blog/mi",
  "img/blog/m",
  "img/blog/michael_help",
  "img/blog/s",
  "img/blog/c",
];

async function listAllImages() {
  const results = [];
  let nextCursor = null;
  do {
    const url = new URL(
      `https://api.cloudinary.com/v1_1/${finalCloudName}/resources/image`
    );
    url.searchParams.set("max_results", "500");
    if (nextCursor) url.searchParams.set("next_cursor", nextCursor);
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Basic ${auth}` },
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
    const data = await res.json();
    results.push(...(data.resources || []));
    nextCursor = data.next_cursor || null;
  } while (nextCursor);
  return results;
}

function pathToPublicId(path) {
  const p = path.startsWith("/") ? path.slice(1) : path;
  return p.replace(/\.[a-z0-9]+$/i, "");
}

function main() {
  return listAllImages().then((resources) => {
    const byPublicId = new Map(resources.map((r) => [r.public_id, r]));
    const existingIds = new Set(byPublicId.keys());
    const existingNormalized = new Set(
      resources.map((r) => r.public_id.replace(/\s/g, "%20"))
    );

    const report = [];
    const missing = [];
    const ok = [];

    for (const expectedId of EXPECTED_PUBLIC_IDS) {
      const exists =
        existingIds.has(expectedId) ||
        existingNormalized.has(expectedId) ||
        existingIds.has(expectedId.replace(/%20/g, " "));
      if (exists) {
        ok.push(expectedId);
        report.push({ public_id: expectedId, status: "OK", in_cloud: "yes" });
      } else {
        missing.push(expectedId);
        report.push({ public_id: expectedId, status: "MISSING", in_cloud: "no" });
      }
    }

    const byFolder = {};
    for (const r of resources) {
      const parts = r.public_id.split("/");
      const folder = parts.length > 1 ? parts[0] : "(raíz)";
      if (!byFolder[folder]) byFolder[folder] = [];
      byFolder[folder].push({
        public_id: r.public_id,
        format: r.format,
        width: r.width,
        height: r.height,
      });
    }

    // Sugerencias: para cada faltante, buscar un asset que "coincida" (ej. mismo nombre base)
    const allIds = resources.map((r) => r.public_id);
    const suggestions = {};
    for (const expectedId of missing) {
      const baseName = expectedId.split("/").pop();
      const candidate = allIds.find(
        (id) =>
          id === baseName ||
          id.endsWith("/" + baseName) ||
          id.replace(/_[a-z0-9]+$/i, "") === baseName ||
          id.replace(/_[a-z0-9]+$/i, "").endsWith("/" + baseName)
      );
      if (candidate) suggestions[expectedId] = candidate;
    }

    const out = {
      cloud_name: finalCloudName,
      total_in_cloud: resources.length,
      expected_count: EXPECTED_PUBLIC_IDS.length,
      ok_count: ok.length,
      missing_count: missing.length,
      required: report,
      missing_list: missing,
      ok_list: ok,
      rename_suggestions: suggestions,
      in_cloud_by_folder: byFolder,
      all_public_ids: resources.map((r) => r.public_id).sort(),
    };

    const reportPath = join(root, "config", "cloudinary-requirements-report.json");
    writeFileSync(reportPath, JSON.stringify(out, null, 2), "utf8");

    console.log("\n=== Cloudinary: requisitos de la app ===\n");
    console.log(`Cloud: ${finalCloudName}`);
    console.log(`Total recursos en Cloudinary: ${resources.length}`);
    console.log(`Requisitos esperados (public_id): ${EXPECTED_PUBLIC_IDS.length}`);
    console.log(`  OK: ${ok.length}`);
    console.log(`  FALTANTES: ${missing.length}\n`);

    if (missing.length) {
      console.log("--- Faltantes (la app necesita estos public_id) ---");
      missing.forEach((id) => console.log(`  - ${id}`));
      console.log("");
    }

    if (Object.keys(suggestions).length > 0) {
      console.log("--- Sugerencias de renombre (candidato en tu cloud → public_id esperado) ---");
      for (const [expectedId, candidate] of Object.entries(suggestions)) {
        console.log(`  ${candidate}  →  ${expectedId}`);
      }
      console.log("");
    }

    console.log("--- Lo que tienes en Cloudinary (por carpeta/prefijo) ---");
    const folders = Object.keys(byFolder).sort();
    for (const folder of folders) {
      const items = byFolder[folder];
      console.log(`\n  ${folder}/ (${items.length} archivos)`);
      items.slice(0, 15).forEach((i) => console.log(`    ${i.public_id} (${i.format})`));
      if (items.length > 15)
        console.log(`    ... y ${items.length - 15} más`);
    }

    console.log("\n--- Todos los public_id (primeros 50) ---");
    out.all_public_ids.slice(0, 50).forEach((id) => console.log(`  ${id}`));
    if (out.all_public_ids.length > 50)
      console.log(`  ... y ${out.all_public_ids.length - 50} más`);

    console.log(`\nReporte completo guardado en: ${reportPath}\n`);
    return out;
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
