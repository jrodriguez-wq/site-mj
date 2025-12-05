# Script de Optimización de Imágenes de Modelos

Este script optimiza y renombra todas las imágenes de modelos para mejorar el rendimiento y organización.

## Características

- ✅ Optimiza imágenes sin perder calidad (85% calidad, máximo 1920px de ancho)
- ✅ Elimina espacios en blanco de nombres de archivos
- ✅ Renombra archivos con formato limpio: `modelo-001.jpg`
- ✅ Convierte PNG a JPG cuando es posible para mejor compresión
- ✅ Genera reporte detallado de reducción de tamaño
- ✅ Crea archivo de mapeo (mapping.json) para referencia

## Uso

```bash
npm run optimize-model-images
```

## Estructura de salida

Las imágenes optimizadas se guardan en:
```
/public/modelos-optimized/
  ├── louisiana/
  │   ├── louisiana-001.jpg
  │   ├── louisiana-002.jpg
  │   ├── ...
  │   └── mapping.json
  ├── viana/
  ├── delanie/
  ├── langdon/
  └── emelia/
```

## Pasos después de ejecutar

1. Revisa las imágenes optimizadas en `/public/modelos-optimized/`
2. Si todo está bien, reemplaza la carpeta `/public/modelos/` con `/public/modelos-optimized/`
3. Actualiza las rutas en `lib/models/model-images.ts` con los nuevos nombres

## Nota

El script NO modifica las imágenes originales. Crea una copia optimizada en una carpeta separada para que puedas revisar antes de hacer el cambio.

