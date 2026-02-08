# SEO y organización – mejoras realizadas y pendientes

## ✅ Mejoras ya aplicadas

### SEO
- **Solo inglés:** Sin referencias a `/es` en metadata, sitemap ni Organization schema.
- **Imagen Open Graph:** `ogImage` apunta a `/img/logo-fondo-azul-01.png` (imagen existente) para evitar 404. Opcional: crear `public/og-image.jpg` 1200×630 y cambiar a `"/og-image.jpg"`.
- **Schema FAQPage:** Añadido JSON-LD en `/faq` desde `lib/seo/faq-structured-data.ts`; la página inyecta el script para rich results en Google.
- **GOOGLE_REVIEWS:** Comentario en `config/seo/contact.ts` para actualizar `reviewCount` y `ratingValue` desde Google Business Profile.

### Organización
- **config/seo dividido:**
  - `config/seo/config.ts` – SEO_CONFIG, ROBOTS_CONFIG
  - `config/seo/contact.ts` – CONTACT_INFO, SOCIAL_LINKS, GOOGLE_REVIEWS
  - `config/seo/sitemap-config.ts` – SITEMAP_CONFIG
  - `config/seo/keywords-export.ts` – LOCATION_KEYWORDS, SERVICE_AREAS
  - `config/seo/metadata.ts` – defaultMetadata
  - `config/seo/index.ts` – reexporta todo (KEYWORDS, SEO, etc.). Sigue usándose como `@/config/seo`.
- **Script obsoleto:** Eliminado `scripts/validate-translations.js`.

---

## 📋 Pendientes opcionales

### SEO
- **Og-image dedicada:** Crear `public/og-image.jpg` (1200×630) con marca/texto y en `config/seo/config.ts` poner `ogImage: "/og-image.jpg"`.
- **Canonical y metadata:** Mantener el patrón actual en páginas nuevas.
- **Core Web Vitals:** Seguir usando `docs/GOOGLE-OPTIMIZATION-CHECKLIST.md` y Search Console.

### Organización
- **lib/constants/copy.ts:** Si crece más, opcional dividir por dominio (nav, hero, footer, etc.) y un `copy/index.ts` que exporte un único objeto y `getCopy`.
- **Documentación:** Actualizar `docs/GOOGLE-OPTIMIZATION-CHECKLIST.md` y `docs/SEO-STRATEGY.md` cuando cambies dominio o estrategia de keywords.

---

## Resumen

| Área          | Aplicado                                                                 | Opcional                          |
|---------------|---------------------------------------------------------------------------|-----------------------------------|
| SEO           | ogImage sin 404, FAQPage schema, comentario GOOGLE_REVIEWS, sin /es       | og-image 1200×630 dedicada       |
| Organización  | config/seo en carpeta, script validate-translations eliminado             | Dividir copy.ts por dominio       |
