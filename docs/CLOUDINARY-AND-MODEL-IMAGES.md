# Cómo consumimos imágenes (Cloudinary y modelos de casa)

Este documento explica cómo esta app consume las imágenes desde Cloudinary —incluyendo las de los **modelos de casa** (Louisiana, Viana, Langdon, Duplex, etc.)— y cómo **replicar el mismo sistema en otra página o proyecto** que use las mismas imágenes.

---

## Lista de archivos a copiar (para replicar en la otra web)

Copia **tal cual** estas rutas desde este proyecto a tu otro proyecto, manteniendo la misma estructura de carpetas (o ajusta los imports `@/` en tu otro proyecto).

### Mínimo para usar Cloudinary (imágenes por ruta lógica)

| Copiar desde | Descripción |
|--------------|-------------|
| `lib/cloudinary.ts` | Función `getCloudinaryImageUrl(localPath)` que resuelve rutas a URLs de Cloudinary. |
| `config/cloudinary-urls.generated.ts` | Mapeo path → URL (generado). **Obligatorio** para que lo anterior funcione. |

En la otra web solo necesitas importar `getCloudinaryImageUrl` y usar las mismas rutas (ej. `getCloudinaryImageUrl("/img/logo.svg")`).

---

### Si además quieres los modelos de casa (galerías, listas de imágenes por modelo)

| Copiar desde | Descripción |
|--------------|-------------|
| `lib/cloudinary.ts` | Ya listado arriba. |
| `config/cloudinary-urls.generated.ts` | Ya listado arriba. |
| `lib/models/model-images.ts` | Define qué imágenes tiene cada modelo (Louisiana, Viana, Langdon, Duplex, etc.) y usa `getCloudinaryImageUrl`. |
| `lib/models/model-data.ts` | Carga el JSON del modelo y une con `getModelImages()` para devolver `modelData + images[]`. Depende de `model-images` y de `model-pricing`. |
| `lib/models/model-pricing.ts` | Precios por comunidad (LaBelle, Lehigh). Lo usa `model-data.ts`. |
| `types/model.ts` | Tipos `ModelData`, `Community`, `ModelPricing`. |
| `data/models/aurora.json` | Datos del modelo Aurora. |
| `data/models/delanie.json` | Datos del modelo Delanie. |
| `data/models/duplex.json` | Datos del modelo Duplex. |
| `data/models/emelia.json` | Datos del modelo Emelia. |
| `data/models/langdon.json` | Datos del modelo Langdon. |
| `data/models/louisiana.json` | Datos del modelo Louisiana. |
| `data/models/viana.json` | Datos del modelo Viana. |

En la otra web podrás usar `getModelDataWithImages(modelKey)` y `getModelImages(modelKey)` igual que aquí.

---

### Opcional: regenerar el mapeo en la otra web

| Copiar desde | Descripción |
|--------------|-------------|
| `scripts/list-cloudinary-images.mjs` | Script que llama a la API de Cloudinary y escribe `config/cloudinary-urls.generated.ts`. |
| `.env.local` | No copies el archivo; en la otra web crea uno con `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (misma cuenta). |

Ejecutar en la otra web: `node scripts/list-cloudinary-images.mjs` (desde la raíz del proyecto).

---

### Resumen en rutas absolutas (desde la raíz de este repo)

```
lib/cloudinary.ts
config/cloudinary-urls.generated.ts
lib/models/model-images.ts
lib/models/model-data.ts
lib/models/model-pricing.ts
types/model.ts
data/models/aurora.json
data/models/delanie.json
data/models/duplex.json
data/models/emelia.json
data/models/langdon.json
data/models/louisiana.json
data/models/viana.json
scripts/list-cloudinary-images.mjs   # opcional, solo si quieres regenerar el mapeo
```

Después de copiar, en la otra web revisa que los **alias de path** (`@/lib/...`, `@/config/...`, `@/data/...`, `@/types/...`) coincidan con tu estructura, o cambia los imports en los archivos copiados.

### Dónde se usa Cloudinary en esta app (por si copias pantallas)

Estos archivos importan `getCloudinaryImageUrl` o usan `getModelImages` / `getModelDataWithImages`; si copias alguna de estas pantallas o componentes a la otra web, tendrás que tener ya copiados `lib/cloudinary.ts` y `config/cloudinary-urls.generated.ts` (y, si aplica, `lib/models/model-images.ts` y `model-data.ts`):

- `app/layout.tsx` — favicon, og:image
- `app/reception/page.tsx` — logo
- `app/about-us/page.tsx` — fotos equipo/oficina
- `app/rent-to-own/page.tsx` — hero y secciones
- `app/communities/labelle/page.tsx`, `app/communities/lehigh-acres/page.tsx` — imágenes comunidad
- `app/models/page.tsx`, `components/models/model-page-content.tsx`, `components/home/home-models.tsx`, `components/communities/community-models-section.tsx`, `components/models/furnished-homes-slider.tsx` — modelos de casa
- `components/home/hero-slider.tsx`, `components/home/why-choose-us.tsx`, `components/home/testimonials.tsx`, `components/home/happy-families-gallery.tsx`, `components/home/communities-showcase.tsx`
- `components/contact/contact-page-content.tsx`
- `components/blog/blog-list.tsx`, `components/blog/related-articles.tsx`, `components/blog/article-content.tsx`, `app/blog/[slug]/page.tsx`
- `components/rent-to-own/rto-gallery.tsx`
- `components/layout/navbar.tsx`, `components/layout/footer.tsx`
- `components/schedule-appointment/schedule-appointment-content.tsx`
- `config/partner-logos.ts`, `config/promotion.ts`, `config/seo/config.ts`

---

## 1. Resumen del flujo

- **Las imágenes están en Cloudinary.** No se sirven desde `public/` en producción para modelos, hero, recursos, etc.
- La app usa **rutas lógicas locales** (ej. `/img/hero/aurora.webp`, `/modelos-optimized/langdon/interior/langdon-interior-01.webp`).
- Una función **`getCloudinaryImageUrl(localPath)`** resuelve cada ruta local a la **URL real de Cloudinary** usando un mapeo generado.
- Ese mapeo vive en **`config/cloudinary-urls.generated.ts`** y se genera con el script **`scripts/list-cloudinary-images.mjs`**, que llama a la API de Cloudinary y empareja `public_id` con las rutas que usa la app.

---

## 2. Variables de entorno (Cloudinary)

En **`.env.local`** (no se sube a git) se usan:

```env
CLOUDINARY_CLOUD_NAME=dc7mwpvzy
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

> **Seguridad:** No subas `.env.local` ni pongas el API secret en el README si este se comparte. En la otra página usa sus propias variables de entorno con los valores correctos de la misma cuenta Cloudinary.

- **CLOUDINARY_CLOUD_NAME**: nombre de la nube en Cloudinary.
- **CLOUDINARY_API_KEY** y **CLOUDINARY_API_SECRET**: para que el script pueda listar recursos vía API.

El **front de Next.js** no usa estas variables en runtime: las URLs finales ya están en `cloudinary-urls.generated.ts`. Las env solo las usa el script de generación.

---

## 3. Dónde se usan las imágenes

| Uso | Dónde | Cómo se obtiene la URL |
|-----|--------|-------------------------|
| Logo, hero, team, blog | `getCloudinaryImageUrl("/img/...")` | Mapeo en `LOCAL_PATH_TO_CLOUDINARY_URL` |
| Recursos (RTO, clientes, comunidades) | `getCloudinaryImageUrl("/recursos/...")` | Idem |
| **Modelos de casa** (interior, exterior, amo, planos) | `lib/models/model-images.ts` → `getCloudinaryImageUrl("/modelos-optimized/...")` | Mapeo en `CLOUDINARY_PATH_TO_URL` (generado a partir de `public_id` en Cloudinary) |

---

## 4. Rutas lógicas que usa la app

Convención de rutas **locales** (las que se pasan a `getCloudinaryImageUrl`):

- **`/img/...`**  
  Hero, logo, team, blog, etc.  
  Ej: `/img/logo.svg`, `/img/hero/aurora.webp`

- **`/recursos/...`**  
  RTO, clientes, Shutterstock, comunidades.  
  Ej: `/recursos/clientes/testimonio-1.webp`, `/recursos/rto/familia-cocina.webp`

- **`/modelos-optimized/[modelo]/interior/[modelo]-interior-[NN].webp`**  
  Fotos de interior por modelo.  
  Ej: `/modelos-optimized/langdon/interior/langdon-interior-01.webp`

- **`/modelos-optimized/[modelo]/exterior/...`**  
  Fotos de exterior.

- **`/modelos-optimized/[modelo]/amo/...`**  
  Fotos “amoblado” (furnished).

- **`/modelos-optimized/planos/[modelo]-floorplan.webp`**  
  Planos.  
  Ej: `/modelos-optimized/planos/langdon-floorplan.webp`

En Cloudinary los `public_id` pueden tener sufijo (ej. `langdon-interior-01_abc123`). El script los empareja por nombre base y escribe en el mapeo la `secure_url` correcta.

---

## 5. Cómo se obtienen las imágenes de un modelo

1. **Datos del modelo**  
   `data/models/[modelKey].json` (ej. `langdon.json`, `duplex.json`) con metadata (nombre, sqft, precio, `imagesFolder`, etc.). No llevan listas de imágenes; esas vienen del código.

2. **Lista de imágenes por modelo**  
   En **`lib/models/model-images.ts`**:
   - `MODEL_MAIN_IMAGES`, `MODEL_INTERIOR_IMAGES`, `MODEL_EXTERIOR_IMAGES`, `MODEL_AMO_IMAGES`, `MODEL_FLOORPLANS` definen, por modelo, las **rutas lógicas** (ej. `/modelos-optimized/langdon/interior/langdon-interior-01.webp`).
   - Todas se pasan por **`getCloudinaryImageUrl(...)`**, así que al final son URLs de Cloudinary.

3. **Unión con los datos del modelo**  
   **`lib/models/model-data.ts`**:
   - `getModelData(modelKey)` carga el JSON del modelo.
   - `getModelDataWithImages(modelKey)` además llama a **`getModelImages(modelKey)`** (de `model-images.ts`) y devuelve `{ ...modelData, images: string[] }`. Ese array de `images` son ya **URLs de Cloudinary**.

4. **Uso en la UI**  
   En **`app/models/[model]/page.tsx`** se usa `getModelDataWithImages(model)`. Las imágenes se muestran en cards, galería, etc. usando esas URLs.

---

## 6. Generación del mapeo (script)

El archivo **`config/cloudinary-urls.generated.ts`** se genera con:

```bash
node scripts/list-cloudinary-images.mjs
```

Requisitos:

- Tener **`.env.local`** con `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (o `CLOUDINARY_URL=cloudinary://api_key:secret@cloud_name`).
- El script:
  - Lista recursos de la cuenta con la API de Cloudinary.
  - Empareja con las rutas esperadas (`EXPECTED_LOCAL_PATHS` para `/img` y `/recursos`).
  - Para recursos cuyo `public_id` sigue el patrón `[modelo]-interior-[N]`, `[modelo]-exterior-[N]`, `[modelo]-amo-[N]`, `[modelo]-floorplan`, genera entradas **`/modelos-optimized/...`**.
  - Escribe **`config/cloudinary-urls.generated.ts`** (y opcionalmente `cloudinary-urls.json`).

Tras añadir imágenes nuevas en Cloudinary o cambiar nombres, hay que **volver a ejecutar el script** y commitear el `.ts` generado (no el `.env.local`).

---

## 7. Cómo replicar en otra página/proyecto

Para que **otra app** (otra página, otro repo) use **las mismas imágenes** de Cloudinary y los **mismos modelos de casa**:

### Opción A: Copiar mapeo y utilidad (recomendada para misma cuenta Cloudinary)

1. **Variables de entorno**  
   En el otro proyecto crea `.env.local` con las **mismas** variables de la misma cuenta Cloudinary (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`). Así el script de generación podrá listar recursos; en runtime la app solo necesita el mapeo generado.

2. **Copiar estos archivos**  
   - **`config/cloudinary-urls.generated.ts`**  
     Contiene `LOCAL_PATH_TO_CLOUDINARY_URL`, `CLOUDINARY_PATH_TO_URL`, `CLOUDINARY_CLOUD_NAME` y opcionalmente `getCloudinaryUrl`.  
   - **`lib/cloudinary.ts`**  
     Exporta `getCloudinaryImageUrl(localPath)`. Asegúrate de que los imports apunten a donde hayas puesto el `config` en el otro proyecto (ej. `@/config/cloudinary-urls.generated`).

3. **Usar las mismas rutas**  
   En la otra app, para cualquier imagen:
   - **Hero / logo / recursos:**  
     `getCloudinaryImageUrl("/img/hero/aurora.webp")`, `getCloudinaryImageUrl("/recursos/clientes/testimonio-1.webp")`, etc.
   - **Modelos:**  
     Mismas rutas que aquí, por ejemplo:
     - `/modelos-optimized/langdon/interior/langdon-interior-01.webp`
     - `/modelos-optimized/duplex/interior/duplex-interior-01.webp`
     - `/modelos-optimized/planos/langdon-floorplan.webp`

4. **Si quieres la misma “lista de imágenes por modelo”**  
   Copia también **`lib/models/model-images.ts`** (y sus dependencias: `getCloudinaryImageUrl` desde tu `lib/cloudinary.ts`). Ese archivo define qué imágenes tiene cada modelo (Louisiana, Viana, Langdon, Duplex, etc.) usando las rutas anteriores. En el otro proyecto puedes usar solo las funciones que necesites (ej. `getModelImages(modelKey)`, `getModelMainImage(modelKey)`).

5. **Datos de los modelos**  
   Si la otra app también muestra “modelos de casa” con nombre, precio, etc., copia **`data/models/*.json`** (o al menos los que uses). La clave es que el `modelKey` (ej. `langdon`, `duplex`) coincida con el que usa `model-images.ts`.

Con esto, la otra página consumirá **exactamente las mismas URLs de Cloudinary** que esta app (mismos modelos e imágenes).

### Opción B: Regenerar el mapeo en el otro proyecto

Si prefieres que el otro proyecto **genere su propio** `cloudinary-urls.generated.ts`:

1. Copia **`scripts/list-cloudinary-images.mjs`** al otro repo.
2. En el otro repo crea **`.env.local`** con las mismas variables de Cloudinary.
3. Ajusta dentro del script la ruta donde escribir el TS (por defecto `config/cloudinary-urls.generated.ts`).
4. Si en el otro proyecto usas otras rutas locales, edita **`EXPECTED_LOCAL_PATHS`** y la lógica de **`addModelPathFromPublicId`** (y `MODEL_NAMES` si cambian los modelos).
5. Ejecuta:
   ```bash
   node scripts/list-cloudinary-images.mjs
   ```
6. Copia **`lib/cloudinary.ts`** (o equivalente) para que use el `cloudinary-urls.generated.ts` generado.

Así tendrás el mismo esquema de “rutas locales → Cloudinary” replicado en el otro proyecto.

---

## 8. Resumen rápido para “otra página”

- Misma cuenta Cloudinary → mismo **`.env.local`** (o mismo `CLOUDINARY_URL`).
- Copiar **`config/cloudinary-urls.generated.ts`** y **`lib/cloudinary.ts`**.
- En la otra app usar siempre **`getCloudinaryImageUrl("/ruta/local")`** con las mismas rutas que aquí (`/img/...`, `/recursos/...`, `/modelos-optimized/...`).
- Si quieres los mismos modelos de casa con sus galerías: copiar **`lib/models/model-images.ts`** y, si aplica, **`data/models/*.json`**.

Con esto puedes reutilizar las mismas imágenes y la misma lógica de modelos en otra página sin duplicar assets ni lógica de URLs.
