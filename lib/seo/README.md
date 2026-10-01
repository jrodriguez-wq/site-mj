# Structured data (SEO)

Datos estructurados JSON-LD para Google Search, según [schema.org](https://schema.org) y [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data).

## Esquemas usados

| Tipo | Dónde | Uso |
|------|--------|-----|
| **Organization** | Global (layout) | Nombre, URL, contacto, redes. |
| **WebSite** | Global | Sitio, búsqueda (SearchAction). |
| **RealEstateAgent** (LocalBusiness) | Global | Negocio, horarios, área, ofertas. Sin `aggregateRating` (la entidad no debe mostrar estrellas sobre sí misma). |
| **Service** | Global (rent-to-own, models, home-sales, etc.) | Servicios con `name`, `serviceType`, `provider`, `offers`. Sin Review/AggregateRating (Service no es tipo válido para opiniones en Google). |
| **RealEstateListing** | Páginas de modelos | Listado con dirección, precio, oferta. |
| **BreadcrumbList** | Páginas con migas | Lista de ítems con posición y nombre. |
| **FAQPage** | /faq | Preguntas y respuestas. |
| **Article** | Blog/noticias | Cuando aplique. |

## Review y AggregateRating (Google)

- **Tipos válidos** para `itemReviewed` (o padre que tenga `review`/`aggregateRating`): Book, Course, Event, LocalBusiness, Organization, Product, Recipe, SoftwareApplication, etc. Ver `lib/seo/schema-google-policy.ts`.
- **Service no es válido**: no añadir `review` ni `aggregateRating` a esquemas `@type: "Service"`.
- **Páginas donde la entidad controla las opiniones** (reseñas sobre uno mismo): no usar `aggregateRating` ni `review` en Organization/LocalBusiness para evitar que Google marque error o no muestre estrellas.

## Validación

Tras cambios, comprobar la URL en:

- [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results)
- Search Console > Mejoras > Datos estructurados
