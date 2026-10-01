#!/usr/bin/env node
/**
 * Lista todas las imágenes en Cloudinary y genera un JSON/TS con el mapeo
 * path público -> URL de entrega.
 *
 * Uso:
 *   node scripts/list-cloudinary-images.mjs
 *
 * Requiere en .env.local (o variables de entorno):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 *
 * O bien CLOUDINARY_URL=cloudinary://api_key:secret@cloud_name
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
  console.error(
    "Faltan credenciales. Define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en .env.local, o CLOUDINARY_URL."
  );
  process.exit(1);
}

const auth = Buffer.from(`${finalApiKey}:${finalApiSecret}`).toString("base64");

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

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Cloudinary API ${res.status}: ${text}`);
    }

    const data = await res.json();
    results.push(...(data.resources || []));
    nextCursor = data.next_cursor || null;
  } while (nextCursor);

  return results;
}

/**
 * Paths locales que la app usa (getCloudinaryImageUrl). Se emparejan por nombre base
 * con los public_id reales de Cloudinary (que pueden tener sufijo _xxx).
 */
const EXPECTED_LOCAL_PATHS = [
  "/img/logo.svg",
  "/img/logo-blanco.png",
  "/img/logo-fondo-azul-01.png",
  "/img/hero/1w5a0754-e4.webp",
  "/img/hero/1w5a0741-1.webp",
  "/img/hero/1w5a0814-1.webp",
  "/img/hero/1w5a1489-e5.webp",
  "/img/hero/1w5a1456-e5.webp",
  "/img/hero/1w5a1493-e5.webp",
  "/img/hero/1w5a1505-e5.webp",
  "/img/hero/aurora.webp",
  "/img/oficina.webp",
  "/img/michael.webp",
  "/img/team.webp",
  "/img/juliana.webp",
  "/img/nader.jpg",
  "/img/blog/mi.jpg",
  "/img/blog/m.jpg",
  "/img/blog/michael_help.jpg",
  "/img/blog/s.jpg",
  "/img/blog/c.jpg",
  // Recursos (RTO, clientes, comunidades, etc.) – sin public/recursos/ se sirven desde Cloudinary
  "/recursos/rto/familia-cocina.webp",
  "/recursos/rto/testimonio-19.webp",
  "/recursos/rto/testimonio-20.webp",
  "/recursos/rto/testimonio-21.webp",
  "/recursos/rto/testimonio-22.webp",
  "/recursos/rto/testimonio-26.webp",
  "/recursos/clientes/testimonio-1.webp",
  "/recursos/clientes/testimonio-2.webp",
  "/recursos/clientes/testimonio-3.webp",
  "/recursos/clientes/testimonio-4.webp",
  "/recursos/clientes/testimonio-5.webp",
  "/recursos/clientes/testimonio-6.webp",
  "/recursos/clientes/testimonio-7.webp",
  "/recursos/clientes/testimonio-8.webp",
  "/recursos/clientes/testimonio-9.webp",
  "/recursos/clientes/testimonio-13.webp",
  "/recursos/clientes/testimonio-14.webp",
  "/recursos/clientes/testimonio-15.webp",
  "/recursos/clientes/testimonio-16.webp",
  "/recursos/clientes/testimonio-17.webp",
  "/recursos/clientes/testimonio-25.webp",
  "/recursos/clientes/testimonio-27.webp",
  "/recursos/clientes/testimonio-32.webp",
  "/recursos/shutterstock-1065297917.webp",
  "/recursos/shutterstock-1197062707.webp",
  "/recursos/shutterstock-2252703911.webp",
  "/recursos/shutterstock-440999080.webp",
  "/recursos/playa.webp",
  "/recursos/familia-casa.webp",
  "/recursos/familia-conduciendo.webp",
  "/recursos/rio.webp",
  "/recursos/pai.webp",
  "/recursos/orlandof.webp",
];

function pathToExpectedPublicId(path) {
  const p = path.startsWith("/") ? path.slice(1) : path;
  return p.replace(/\.[a-z0-9]+$/i, "");
}

function findResourceByBaseName(resources, expectedPublicId) {
  const baseName = expectedPublicId.split("/").pop();
  return resources.find(
    (r) =>
      r.public_id === baseName ||
      r.public_id.endsWith("/" + baseName) ||
      r.public_id.replace(/_[a-z0-9]+$/i, "") === baseName ||
      r.public_id.replace(/_[a-z0-9]+$/i, "").endsWith("/" + baseName)
  );
}

async function main() {
  console.log("Conectando a Cloudinary...");
  const resources = await listAllImages();
  console.log(`Encontradas ${resources.length} imágenes.`);

  if (resources.length === 0) {
    console.log("No hay imágenes. Revisa la carpeta/prefix en tu cloud.");
    process.exit(0);
  }

  // Mapeo path local (el que usa la app) -> URL real de Cloudinary (public_id con sufijo, etc.)
  const localPathToCloudinaryUrl = {};
  for (const localPath of EXPECTED_LOCAL_PATHS) {
    const expectedId = pathToExpectedPublicId(localPath);
    const resource = findResourceByBaseName(resources, expectedId);
    if (resource) {
      localPathToCloudinaryUrl[localPath] = resource.secure_url;
      localPathToCloudinaryUrl[localPath.replace(/^\//, "")] = resource.secure_url;
    }
  }
  const matchedPaths = EXPECTED_LOCAL_PATHS.filter((p) => localPathToCloudinaryUrl[p]);
  console.log(`Mapeados ${matchedPaths.length}/${EXPECTED_LOCAL_PATHS.length} paths locales → URL real Cloudinary.`);
  if (matchedPaths.length < EXPECTED_LOCAL_PATHS.length) {
    const missing = EXPECTED_LOCAL_PATHS.filter((p) => !localPathToCloudinaryUrl[p]);
    console.log("Sin coincidencia en cloud:", missing.join(", "));
  }

  // Modelos que usamos en la app (carpetas en Cloudinary pueden ser solo el nombre, ej. viana-interior-01_xxx)
  const MODEL_NAMES = ["louisiana", "viana", "delanie", "aurora", "langdon", "emelia", "duplex"];

  function addModelPathFromPublicId(pathToUrl, publicId, format, secureUrl) {
    const base = publicId.replace(/_[a-z0-9]+$/i, "");
    const ext = format || "webp";
    // interior: louisiana-interior-01 -> /modelos-optimized/louisiana/interior/louisiana-interior-01.webp
    const interiorMatch = base.match(/^([a-z]+)-interior-(\d+)$/i);
    if (interiorMatch) {
      const model = interiorMatch[1].toLowerCase();
      if (MODEL_NAMES.includes(model)) {
        const path = `/modelos-optimized/${model}/interior/${base}.${ext}`;
        pathToUrl[path] = secureUrl;
        pathToUrl[path.replace(/^\//, "")] = secureUrl;
      }
    }
    const exteriorMatch = base.match(/^([a-z]+)-exterior-(\d+)$/i);
    if (exteriorMatch) {
      const model = exteriorMatch[1].toLowerCase();
      if (MODEL_NAMES.includes(model)) {
        const path = `/modelos-optimized/${model}/exterior/${base}.${ext}`;
        pathToUrl[path] = secureUrl;
        pathToUrl[path.replace(/^\//, "")] = secureUrl;
      }
    }
    const amoMatch = base.match(/^([a-z]+)-amo-(\d+)$/i);
    if (amoMatch) {
      const model = amoMatch[1].toLowerCase();
      if (MODEL_NAMES.includes(model)) {
        const path = `/modelos-optimized/${model}/amo/${base}.${ext}`;
        pathToUrl[path] = secureUrl;
        pathToUrl[path.replace(/^\//, "")] = secureUrl;
      }
    }
    const floorplanMatch = base.match(/^([a-z]+)-floorplan$/i);
    if (floorplanMatch) {
      const model = floorplanMatch[1].toLowerCase();
      if (MODEL_NAMES.includes(model)) {
        const path = `/modelos-optimized/planos/${base}.${ext}`;
        pathToUrl[path] = secureUrl;
        pathToUrl[path.replace(/^\//, "")] = secureUrl;
      }
    }
  }

  // Mapeo legacy: path público en Cloudinary -> URL (para compatibilidad)
  // Incluir también path con extensión y rutas /modelos-optimized/... para la app
  const pathToUrl = { ...localPathToCloudinaryUrl };
  const publicIdToSecureUrl = {};

  for (const r of resources) {
    const publicId = r.public_id;
    const secureUrl = r.secure_url;
    const format = r.format || "webp";
    publicIdToSecureUrl[publicId] = secureUrl;
    pathToUrl[`/${publicId}`] = secureUrl;
    pathToUrl[publicId] = secureUrl;
    const pathWithExt = `${publicId}.${format}`;
    pathToUrl[`/${pathWithExt}`] = secureUrl;
    pathToUrl[pathWithExt] = secureUrl;
    addModelPathFromPublicId(pathToUrl, publicId, format, secureUrl);
  }

  const modelosPaths = Object.keys(pathToUrl).filter((k) => k.includes("modelos-optimized"));
  console.log(`Rutas modelos-optimized mapeadas: ${modelosPaths.length}`);

  const outDir = join(root, "config");
  const jsonPath = join(outDir, "cloudinary-urls.json");
  const tsPath = join(outDir, "cloudinary-urls.generated.ts");

  writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        cloudName: finalCloudName,
        count: resources.length,
        pathToUrl,
        publicIdToSecureUrl,
        list: resources.map((r) => ({
          public_id: r.public_id,
          secure_url: r.secure_url,
          format: r.format,
          width: r.width,
          height: r.height,
        })),
      },
      null,
      2
    ),
    "utf8"
  );
  console.log("Escrito:", jsonPath);

  const tsContent = `/**
 * Mapeo de rutas locales (public) a URLs reales de Cloudinary.
 * Generado por: node scripts/list-cloudinary-images.mjs
 * No editar a mano. Vuelve a ejecutar el script tras subir/cambiar imágenes.
 */

export const CLOUDINARY_CLOUD_NAME = "${finalCloudName}" as const;

/** Path local (ej. /img/hero/xxx.webp) → URL real en Cloudinary (con public_id que tenga sufijo, etc.) */
export const LOCAL_PATH_TO_CLOUDINARY_URL: Record<string, string> = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(localPathToCloudinaryUrl).filter(([k]) => k.startsWith("/"))
    ),
    null,
    2
  )};

export const CLOUDINARY_PATH_TO_URL: Record<string, string> = ${JSON.stringify(pathToUrl, null, 2)};

export const CLOUDINARY_IMAGE_COUNT = ${resources.length};

/** Devuelve la URL en Cloudinary para un path (lookup en mapeo generado) */
export function getCloudinaryUrl(path: string): string | undefined {
  const normalized = path.startsWith("/") ? path : \`/\${path}\`;
  return CLOUDINARY_PATH_TO_URL[normalized] ?? CLOUDINARY_PATH_TO_URL[path.replace(/^\\//, "")];
}
`;

  writeFileSync(tsPath, tsContent, "utf8");
  console.log("Escrito:", tsPath);

  // Prueba con la primera imagen
  const first = resources[0];
  console.log("\n--- Prueba con 1 imagen ---");
  console.log("public_id:", first.public_id);
  console.log("URL:", first.secure_url);
  console.log("Abre la URL en el navegador para verificar.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
