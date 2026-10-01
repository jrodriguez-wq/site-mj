# Verificación SEO – M.J. Newell Homes

Resumen de la configuración SEO actual y recomendaciones.

---

## Lo que está bien implementado

### 1. **Metadata y títulos**
- **Layout:** `metadataBase`, título con template `%s | M.J. Newell Homes`, descripción por defecto.
- **Páginas:** Home, Rent to Own, Blog, Models, Communities, About Us, Contact, etc. usan `generateMetadata()` con título, descripción y keywords propios.
- **Canonical:** Se define por página (ej. `/blog/[slug]`, modelos, etc.) vía `generateMetadata` / `lib/seo/metadata.ts`.

### 2. **Open Graph y Twitter**
- OG type, locale, images (con width/height 1200×630 donde aplica).
- Twitter card `summary_large_image`.
- En artículos de blog: imagen del post, tipo `article`, URL correcta.

### 3. **Robots**
- `app/robots.ts` genera `robots.txt` con allow `/`, disallow de `/api/`, `/_next/`, etc.
- Sitemap declarado: `{siteUrl}/sitemap.xml`.
- Host preferido indicado.
- Páginas internas (ej. `/internal-team`) con `robots: { index: false }` donde corresponde.

### 4. **Sitemap**
- Home con prioridad 1.0 y changeFrequency daily.
- Rutas principales (Rent to Own, Schedule, Models, Communities) con prioridad 0.9.
- Modelos dinámicos y posts de blog incluidos con prioridad 0.8.
- **Actualizado:** Incluidas FAQ, Section 8, Rental Application, Privacy Policy y Terms en el sitemap.

### 5. **Structured Data (Schema.org)**
- **Organization** en layout (nombre, URL, contacto, dirección, sameAs).
- **WebSite** con search action si aplica.
- **LocalBusiness** para negocio local.
- **Article** en cada post del blog (headline, author, datePublished, image, etc.).
- **RealEstateListing** en páginas de modelos.
- Servicios/FAQ cuando corresponde.

### 6. **Geo y negocio**
- Meta `geo.region`, `geo.placename`, `geo.position`, `ICBM`.
- Datos de negocio (locality, region, country) en metadata.

### 7. **Google Search Console**
- `googleSearchConsole` en `SEO_CONFIG` para verificación.
- Uso de `metadataBase` y URLs absolutas en OG/canonical.

### 8. **Contenido y keywords**
- Keywords por sección (home, rent to own, modelos, comunidades, etc.).
- Descripciones únicas por página.
- Blog con keywords en frontmatter y structured data.

---

## Recomendaciones de mejora

### 1. **Imagen OG (Open Graph)**
- **Actual:** `ogImage: "/img/logo-fondo-azul-01.png"`.
- **Recomendación:** Usar una imagen dedicada **1200×630 px** (ej. `public/og-image.jpg`) con logo + texto o foto de casa para mejor aspecto en redes y resultados.
- Opcional: OG específico por sección (home, rent-to-own, blog) si quieres diferenciar compartidos.

### 2. **Verificación en Google**
- En [Google Search Console](https://search.google.com/search-console) comprobar:
  - Dominio o prefijo de URL verificado.
  - Sitemap enviado y sin errores.
  - Cobertura (páginas indexadas / excluidas) y corrección de errores.
- Revisar “Mejoras” (Core Web Vitals, móvil, etc.).

### 3. **Canonical en páginas secundarias**
- Confirmar que todas las páginas públicas (FAQ, Section 8, Rental Application, Privacy, Terms) exportan `metadata` con `canonical` a su URL absoluta (ya cubierto si usan `generateMetadata` con `canonical`).

### 4. **Contenido**
- Títulos H1 únicos por página.
- Descripciones meta por debajo de ~160 caracteres donde tenga sentido.
- En blog, mantener `dateModified` en Article schema si actualizas posts (ahora usa `datePublished`).

### 5. **Rendimiento e indexación**
- Imágenes con `alt` (ya trabajado en componentes).
- Evitar contenido importante solo en JS sin SSR (las páginas principales son SSR/estáticas).
- `next.config` con `unoptimized: true` para imágenes: no afecta el SEO de texto/metadata.

---

## Checklist rápido

- [x] Título y descripción por página
- [x] Canonical por página
- [x] Open Graph y Twitter Cards
- [x] robots.txt y sitemap.xml
- [x] Sitemap incluye todas las páginas indexables (incl. FAQ, Section 8, Rental, Privacy, Terms)
- [x] Structured Data (Organization, Article, RealEstateListing, etc.)
- [x] Meta geo y negocio
- [x] Google Search Console configurado
- [ ] Imagen OG 1200×630 dedicada (recomendado)
- [ ] Revisión periódica en Search Console y “Mejoras”

---

*Última revisión: según implementación actual del proyecto.*
