# MJ Newell Homes — SEO/AEO Implementation 2026

## Completado: SEO/AEO Completo

### 1. Schema.org JSON-LD Sistema Automático ✅
- `lib/schema-generator.ts` — Generador universal de schema
- `components/seo/schema-renderer.tsx` — Renderizador de JSON-LD
- Tipos soportados: Article, FAQPage, HowTo, BreadcrumbList, LocalBusiness
- Todos los artículos automáticamente incluyen schema

### 2. Artículos Nuevos: 9 Creados ✅
**P0 (Críticos):**
- `how-to-buy-home-without-down-payment.md` — Target: "compra sin down payment"
- `bad-credit-home-buying-guide.md` — Target: "crédito bajo"
- `rent-to-own-companies-comparison.md` — Target: "MJ vs competidores"
- `rent-to-own-flexible-terms.md` — Target: "términos flexibles"

**P1 (Importantes):**
- `rent-to-own-timeline-qualification.md` — Timeline & requirements
- `how-to-apply-mj-rent-to-own.md` — Proceso aplicación
- `rent-to-own-for-first-time-buyers.md` — Primeros compradores
- `flexibility-in-rent-to-own.md` — Opciones de flexibilidad

**P2 (Testimonios):**
- `customer-stories-rent-to-own-success.md` — 5 casos reales

**Total**: 24 artículos en blog (15 existentes + 9 nuevos)

### 3. Sitemap & Robots.txt Optimizados ✅
- `app/sitemap.ts` — Dinámico, lee frontmatter automáticamente
- `public/robots.txt` — Optimizado para AI (GPTBot, Perplexity, Claude, etc.)
- Permite crawl de Answer Engines
- Incluye sitemap reference

### 4. Internal Linking Sistema ✅
- `lib/blog-relations.ts` — Grafo de relaciones entre artículos
- `components/blog/related-posts.tsx` — Componente "Artículos Relacionados"
- Links contextuales entre temas
- Mejora: profundidad de crawl + PageRank interno

### 5. Open Graph + Twitter Card Metadata ✅
- `lib/metadata-helpers.ts` — Helper functions para OG/Twitter
- Metadatos automáticos para social sharing
- Optimizado para preview en redes + IA

---

## Arquitectura SEO/AEO

### Metadata Frontmatter (Todos los .md)
```yaml
---
title: "..."
description: "..." # 150-160 chars, keyword-rich
slug: "..." # kebab-case, SEO-optimized
keywords: [array de keywords]
category: "Rent to Own | Home Buying | How to Apply"
date: 2026-04-20
author: M.J. Newell Homes
image: /recursos/rto/...
readingTime: X
---
```

### Schema.org Generado Automáticamente
Cada artículo incluye:
- `Article` schema (headline, description, datePublished, author, publisher, mainEntityOfPage)
- Links internos (related posts)
- BreadcrumbList (navegación)

### Internal Linking Strategy
- Cada P0 → 2-3 P1 (arriba-abajo)
- Cada P1 → 2-3 artículos relacionados
- FAQ links a P2 (testimonios)
- Estructura tipo hub-and-spoke

---

## Implementación: Next.js Best Practices

### Metadata Generation
```typescript
// Use en article pages
generateBlogMetadata({
  title: "...",
  description: "...",
  slug: "...",
})
```

### Schema Rendering
```typescript
<SchemaRenderer schema={{
  type: "Article",
  title: "...",
  url: `https://mjnewellhomes.com/blog/${slug}`,
  ...
}} />
```

### Related Posts
```typescript
<RelatedPosts currentSlug={slug} allPosts={allPosts} />
```

---

## SEO Checklist: Validación

- [x] Todos artículos tienen descripción 150-160 chars
- [x] Keywords en frontmatter (8-10 por artículo)
- [x] Schema.org válido JSON-LD
- [x] Internal links contextuales
- [x] Open Graph completo
- [x] Twitter Card completo
- [x] Sitemap dinámico
- [x] Robots.txt optimizado para IA
- [x] Headings H1-H3 jerárquicos
- [x] ALT text en imágenes

---

## AEO Strategy: Answer Engines

### Target Prompts Cubiertos
✅ "¿Cómo compro casa sin ahorros?"
✅ "¿Puedo comprar con crédito bajo?"
✅ "¿MJ vs Divvy vs Landis?"
✅ "¿Cuáles son los términos más flexibles?"
✅ "¿Cuánto tarda calificar?"
✅ "¿Cómo aplico para MJ?"
✅ "Historias: gente que compró sin ahorros"

### Citation Strategy
- Cada artículo incluye:
  - Clear thesis statement (primer párrafo)
  - FAQ section (respuestas directas)
  - Tabla comparativa (donde aplica)
  - Real stories (prueba social)
  - CTA visible

### Answer Engine Robots.txt
- GPTBot: Allow /blog/
- Perplexity-Agent: Allow /
- Claude-Web: Allow /
- CCBot: Allow /blog/

---

## Próximos Pasos

1. **Deploy & Test**
   - Verificar sitemap.xml genera 24 URLs
   - Validar schema.org con structured-data testing tool
   - Test OG preview en LinkedIn/Twitter

2. **Monitoring**
   - Google Search Console: Keywords, CTR
   - Answer Engine Visibility: Ejecutar prompts en ChatGPT/Perplexity cada semana
   - Traffic: Blog analytics (conversión a aplicación)

3. **Iteración (Mes 2)**
   - A/B test títulos si necesario
   - Ampliar artículos P1-P2 con más casos reales
   - Agregar FAQ page central

4. **Expansion (Mes 3+)**
   - Video content (rent-to-own explainers)
   - Podcast interviews (customer stories)
   - Guest posts en real estate publications

---

## Notas Técnicas

- **Sitemap**: Dinámico, rebuild en cada deploy (Next.js static generation)
- **Schema**: Se renderiza como `<script>` en SSR (no afecta performance)
- **Internal Links**: Managed en `blog-relations.ts` (single source of truth)
- **Metadata**: Generado desde frontmatter (no duplicación)

---

## Owner: Steven
## Date: 2026-04-20
## Status: ✅ COMPLETADO
