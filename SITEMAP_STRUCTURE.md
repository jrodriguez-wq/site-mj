# Sitemap Structure - Professional Implementation

## 📋 Overview

Este documento describe la estructura profesional del sitemap XML generado automáticamente por Next.js.

## 🏗️ Estructura del Sitemap

El sitemap está organizado en **5 secciones principales** ordenadas por prioridad:

### 1. **Homepage** (Prioridad 1.0 - Máxima)
```
URL: https://www.mjnewellhomes.com
Priority: 1.0
Change Frequency: daily
Last Modified: [fecha actual]
Languages: en, es
```

### 2. **Páginas de Negocio Principales** (Prioridad 0.9 - Alta)
- `/rent-to-own` - Programa Rent to Own
- `/schedule-appointment` - Agendar Cita
- `/models` - Catálogo de Modelos
- `/communities/labelle` - Comunidad LaBelle
- `/communities/lehigh-acres` - Comunidad Lehigh Acres

**Frecuencia:** Weekly (semanal)
**Prioridad:** 0.9

### 3. **Páginas de Información** (Prioridad 0.8 - Media-Alta)
- `/about-us` - Sobre Nosotros
- `/home-buying-guide` - Guía de Compra
- `/contact` - Contacto

**Frecuencia:** Monthly (mensual)
**Prioridad:** 0.8

### 4. **Páginas de Modelos Individuales** (Prioridad 0.8 - Media-Alta)
- `/models/louisiana`
- `/models/viana`
- `/models/delanie`
- `/models/aurora`
- `/models/langdon`
- `/models/emelia`
- `/models/duplex`

**Frecuencia:** Weekly (semanal)
**Prioridad:** 0.8

### 5. **Páginas de Soporte** (Prioridad 0.7 - Media)
- `/warranty` - Garantía

**Frecuencia:** Monthly (mensual)
**Prioridad:** 0.7

## 📊 Ejemplo de XML Generado

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- SECTION 1: HOMEPAGE (Priority 1.0) -->
  <url>
    <loc>https://www.mjnewellhomes.com</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es"/>
  </url>

  <!-- SECTION 2: PRIMARY BUSINESS PAGES (Priority 0.9) -->
  <url>
    <loc>https://www.mjnewellhomes.com/rent-to-own</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/rent-to-own"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/rent-to-own"/>
  </url>

  <url>
    <loc>https://www.mjnewellhomes.com/schedule-appointment</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/schedule-appointment"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/schedule-appointment"/>
  </url>

  <url>
    <loc>https://www.mjnewellhomes.com/models</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/models"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/models"/>
  </url>

  <url>
    <loc>https://www.mjnewellhomes.com/communities/labelle</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/communities/labelle"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/communities/labelle"/>
  </url>

  <url>
    <loc>https://www.mjnewellhomes.com/communities/lehigh-acres</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/communities/lehigh-acres"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/communities/lehigh-acres"/>
  </url>

  <!-- SECTION 3: INFORMATION PAGES (Priority 0.8) -->
  <url>
    <loc>https://www.mjnewellhomes.com/about-us</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/about-us"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/about-us"/>
  </url>

  <url>
    <loc>https://www.mjnewellhomes.com/home-buying-guide</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/home-buying-guide"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/home-buying-guide"/>
  </url>

  <url>
    <loc>https://www.mjnewellhomes.com/contact</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/contact"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/contact"/>
  </url>

  <!-- SECTION 4: MODEL PAGES (Priority 0.8) -->
  <url>
    <loc>https://www.mjnewellhomes.com/models/louisiana</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/models/louisiana"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/models/louisiana"/>
  </url>

  <url>
    <loc>https://www.mjnewellhomes.com/models/viana</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/models/viana"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/models/viana"/>
  </url>

  <!-- ... más modelos ... -->

  <!-- SECTION 5: SUPPORT PAGES (Priority 0.7) -->
  <url>
    <loc>https://www.mjnewellhomes.com/warranty</loc>
    <lastmod>2025-01-18T17:11:40.541Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mjnewellhomes.com/warranty"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.mjnewellhomes.com/es/warranty"/>
  </url>

</urlset>
```

## ✅ Características Profesionales

### 1. **Organización por Prioridad**
- Las páginas más importantes aparecen primero
- Google prioriza el crawling según la prioridad

### 2. **Frecuencias de Actualización Optimizadas**
- **Daily:** Homepage (contenido que cambia frecuentemente)
- **Weekly:** Páginas de negocio y modelos (contenido que se actualiza regularmente)
- **Monthly:** Páginas informativas (contenido estable)

### 3. **Soporte Multilingüe**
- Cada URL incluye alternativas en inglés y español
- Mejora el SEO internacional

### 4. **Last Modified Actualizado**
- Fecha de última modificación actualizada automáticamente
- Ayuda a Google a saber cuándo re-indexar

### 5. **Estructura Limpia y Documentada**
- Código bien organizado con comentarios
- Fácil de mantener y actualizar

## 🔍 Cómo Verificar el Sitemap

1. **En desarrollo:**
   ```
   http://localhost:3000/sitemap.xml
   ```

2. **En producción:**
   ```
   https://www.mjnewellhomes.com/sitemap.xml
   ```

3. **Validar con Google Search Console:**
   - Ir a Sitemaps
   - Agregar: `https://www.mjnewellhomes.com/sitemap.xml`
   - Google validará y mostrará estadísticas

## 📈 Beneficios SEO

1. **Indexación Rápida:** Google encuentra todas las páginas rápidamente
2. **Priorización:** Las páginas importantes se indexan primero
3. **Multilingüe:** Mejor posicionamiento en búsquedas en español
4. **Actualización Automática:** El sitemap se regenera con cada build
5. **Estructura Profesional:** Cumple con estándares de Google

## 🛠️ Mantenimiento

El sitemap se actualiza automáticamente cuando:
- Se agregan nuevas rutas en `SITEMAP_CONFIG`
- Se agregan nuevos modelos (se detectan automáticamente)
- Se hace un nuevo build del sitio

No requiere mantenimiento manual.

