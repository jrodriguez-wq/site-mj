# Guía para Cambiar Imágenes del Blog

## 📍 Dónde Cambiar las Imágenes

Las imágenes de cada artículo se configuran en el **frontmatter** (encabezado) de cada archivo Markdown ubicado en `/content/blog/`.

### Ubicación de los Archivos
```
content/blog/
├── ultimate-guide-rent-to-own-florida.md
├── florida-tax-changes-2026-buying-home-tax-refund.md
├── home-buying-taxes-florida-complete-guide.md
├── homestead-exemption-florida-complete-guide.md
├── first-time-home-buyer-guide-complete-checklist.md
├── rent-to-own-vs-traditional-mortgage-comparison.md
└── why-buy-home-2026-investment-florida.md
```

## 🖼️ Cómo Cambiar la Imagen

En cada archivo, busca la línea `image:` en el frontmatter (las primeras líneas del archivo) y cambia la ruta:

```yaml
---
title: "Título del Artículo"
description: "Descripción..."
slug: nombre-del-articulo
category: Categoría
date: 2025-01-15
author: M.J. Newell Homes
keywords:
  - keyword1
  - keyword2
image: /img/hero/NOMBRE-DE-IMAGEN.webp  👈 CAMBIA ESTA LÍNEA
---
```

## 📂 Imágenes Disponibles

### Imágenes en `/public/img/hero/`
- `1w5a0741-1.webp`
- `1w5a0754-e4.webp`
- `1w5a0814-1.webp`
- `1w5a1456-e5.webp`
- `1w5a1489-e5.webp`
- `1w5a1493-e5.webp`
- `1w5a1505-e5.webp`
- `aurora.webp`

### Imágenes en `/public/recursos/`
- `familia-casa.webp`
- `familia-conduciendo.webp`
- `orlandof.webp`
- `pa.webp`
- `pai.webp`
- `playa.webp`
- `rio.webp`
- `shutterstock-1065297917.webp`
- `shutterstock-1197062707.webp`
- `shutterstock-2252703911.webp`
- `shutterstock-440999080.webp`

### Imágenes en `/public/recursos/rto/`
- `familia-cocina.webp`
- `testimonio-19.webp` hasta `testimonio-26.webp`

## 📝 Ejemplo de Cambio

**Antes:**
```yaml
image: /img/hero/1w5a0754-e4.webp
```

**Después:**
```yaml
image: /img/hero/1w5a1456-e5.webp
```

O para usar una imagen de recursos:
```yaml
image: /recursos/familia-casa.webp
```

## ✅ Imágenes Actuales Asignadas

1. **Ultimate Guide to Rent-to-Own** → `aurora.webp`
2. **Florida Tax Changes 2026** → `1w5a1489-e5.webp`
3. **Home Buying Taxes Guide** → `1w5a1493-e5.webp`
4. **Homestead Exemption Guide** → `1w5a1505-e5.webp`
5. **First-Time Home Buyer Guide** → `1w5a1456-e5.webp`
6. **Rent to Own vs Mortgage** → `1w5a0741-1.webp`
7. **Why Buy Home 2026** → `1w5a0814-1.webp`

## 💡 Tips

- Las imágenes deben estar en formato `.webp` para mejor rendimiento
- Usa rutas relativas desde `/public/` (ej: `/img/hero/imagen.webp`)
- Las imágenes se mostrarán en las cards del blog y en el Open Graph (compartir en redes sociales)
- Mantén un tamaño razonable (recomendado: 1200x630px para redes sociales)

## 🔄 Agregar Nuevas Imágenes

1. Coloca la imagen en `/public/img/hero/` o en `/public/recursos/`
2. Asegúrate de que esté en formato `.webp`
3. Referencia la imagen en el frontmatter del artículo

