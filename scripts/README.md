# Scripts de Organización

## Organizar Imágenes de Modelos

Este script reorganiza las imágenes de los modelos en subcarpetas `interior/` y `exterior/`.

### Uso

```bash
node scripts/organize-model-images.js
```

### ¿Qué hace?

1. Escanea cada carpeta de modelo en `public/modelos-optimized/`
2. Crea subcarpetas `interior/` y `exterior/` si no existen
3. Mueve las imágenes que empiezan con "ex" a la carpeta `exterior/`
4. Mueve las demás imágenes a la carpeta `interior/`
5. Mantiene archivos como `mapping.json` en su lugar

### Modelos procesados

- aurora
- delanie
- emelia
- langdon
- louisiana
- viana
- duplex

### Nota

Este script debe ejecutarse **una sola vez** después de reorganizar las imágenes. Una vez ejecutado, las imágenes estarán organizadas y el código actualizado las usará automáticamente.
