# Scripts de Utilidad

Este directorio contiene scripts útiles para el desarrollo y mantenimiento del sitio web.

## Scripts Disponibles

### 🖼️ Optimización de Imágenes

#### `optimize-all-images-complete.js`
Script completo de optimización de imágenes que:
- Optimiza todas las imágenes en `/public`
- Las convierte a WebP cuando es apropiado
- Normaliza nombres de archivos
- Actualiza todas las referencias en el código automáticamente
- Elimina imágenes antiguas después de crear las optimizadas

**Uso:**
```bash
pnpm run optimize-all
```

**Más información:** Ver [README-OPTIMIZE-ALL.md](./README-OPTIMIZE-ALL.md)

#### `validate-images.js`
Script de validación que verifica:
- Que todas las imágenes referenciadas existan
- Que se estén usando las versiones optimizadas
- Que no haya referencias a imágenes antiguas

**Uso:**
```bash
pnpm run validate-images
```

### 🎨 Generación de Favicons

#### `generate-favicons.js`
Genera todos los tamaños de favicons necesarios desde una imagen fuente.

**Uso:**
```bash
pnpm run generate-favicons
```

**Requisitos:**
- Imagen fuente: `/public/cropped-cropped-favicon-300x300-1.png`
- Genera: favicon-16x16.png, favicon-32x32.png, android-chrome-192x192.png, android-chrome-512x512.png, apple-touch-icon.png, favicon.png, favicon.ico

## Comandos NPM Disponibles

```bash
# Optimizar todas las imágenes
pnpm run optimize-all

# Validar referencias de imágenes
pnpm run validate-images

# Generar favicons
pnpm run generate-favicons
```

## Notas

- Todos los scripts requieren Node.js y las dependencias del proyecto instaladas
- Los scripts de optimización usan `sharp` para procesamiento de imágenes
- Siempre haz commit de tus cambios antes de ejecutar scripts de optimización
- Revisa los resultados antes de hacer commit de los cambios

