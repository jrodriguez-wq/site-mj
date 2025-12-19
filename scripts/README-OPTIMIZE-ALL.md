# Optimización Completa de Imágenes

Este script optimiza todas las imágenes del sitio web de manera automática.

## ¿Qué hace el script?

1. **Identifica todas las imágenes** en `/public` (JPG, PNG, WebP)
2. **Optimiza el tamaño** reduciendo el peso sin perder calidad visual
3. **Convierte a WebP** cuando es apropiado (mejor compresión)
4. **Normaliza nombres** eliminando espacios y caracteres especiales
5. **Actualiza referencias** en todo el código automáticamente
6. **Elimina imágenes antiguas** después de crear las optimizadas

## Uso

```bash
pnpm run optimize-all
```

O directamente:

```bash
node scripts/optimize-all-images-complete.js
```

## Configuración

El script está configurado para:

- **Calidad JPG**: 85% (balance entre tamaño y calidad)
- **Calidad PNG**: 90% con máxima compresión
- **Calidad WebP**: 85% con esfuerzo 6
- **Tamaño máximo**: 2560x2560px (redimensiona si es más grande)
- **Formato preservado**: Logos, iconos y favicons mantienen su formato original

## Archivos preservados

Los siguientes archivos NO se convierten a WebP (mantienen su formato):
- Logos (`logo`, `LOGO`)
- Iconos (`icon`, `favicon`)
- Apple touch icons (`apple-touch`)
- Android chrome icons (`android-chrome`)

## Resultado

Después de ejecutar el script:

1. **Imágenes optimizadas** en `/public` con nombres normalizados
2. **Archivo de mapeo** en `image-optimization-mapping.json` con todas las transformaciones
3. **Referencias actualizadas** en todo el código
4. **Imágenes antiguas eliminadas** (solo si fueron reemplazadas)

## Verificación

Después de ejecutar el script:

1. **Revisa el resumen** que muestra el script
2. **Prueba el sitio** ejecutando `pnpm dev`
3. **Verifica que todas las imágenes se vean correctamente**
4. **Revisa el archivo de mapeo** si necesitas revertir cambios

## Revertir cambios

Si necesitas revertir los cambios:

1. Revisa el archivo `image-optimization-mapping.json`
2. Restaura las imágenes desde tu control de versiones (git)
3. O usa el mapeo para restaurar manualmente

## Notas importantes

- ⚠️ **Haz commit de tus cambios** antes de ejecutar el script
- ⚠️ **Prueba el sitio** después de la optimización
- ⚠️ El script **elimina las imágenes antiguas** automáticamente
- ✅ Las imágenes se optimizan **sin perder calidad visual**
- ✅ Los nombres se normalizan para **mejor compatibilidad web**

## Ejemplo de salida

```
🚀 Iniciando optimización completa de imágenes...

🔍 Buscando imágenes en /public...
   ✓ Encontradas 216 imágenes

[1/216] 📸 img/hero/1W5A0741_1.jpg... ✓ 245.3KB → 89.2KB (-63.6%)
   🔄 3 archivo(s) actualizado(s)

...

✅ OPTIMIZACIÓN COMPLETADA
======================================================================
📊 Estadísticas:
   • Procesadas: 180
   • Omitidas: 30
   • Errores: 6
   • Tamaño original: 125.43 MB
   • Tamaño optimizado: 45.21 MB
   • Ahorro total: 64.0%
   • Mapeo guardado en: image-optimization-mapping.json
```

