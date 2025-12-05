# Modelos de Casas

Esta carpeta contiene los archivos JSON con la información de cada modelo de casa.

## Estructura de un archivo de modelo

Cada modelo debe tener un archivo JSON con la siguiente estructura:

```json
{
  "key": "nombre-del-modelo",
  "name": "NOMBRE DEL MODELO",
  "sqft": "3,277",
  "bedrooms": "4",
  "bathrooms": "3",
  "garage": "3-Car Garage",
  "price": "$469,900",
  "description": "Descripción completa del modelo...",
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "imagesFolder": "nombre-carpeta-imagenes",
  "sections": {
    "inside": {
      "title": "Inside",
      "description": "Descripción opcional"
    },
    "exterior": {
      "title": "Exterior",
      "description": "Descripción opcional"
    },
    "virtualTour": {
      "title": "Virtual tour",
      "description": "Descripción opcional"
    },
    "floorplan": {
      "title": "Floorplan",
      "description": "Descripción opcional",
      "image": "/ruta/a/floorplan.jpg"
    },
    "standardFeatures": {
      "title": "Standard Features",
      "description": "Descripción opcional",
      "categories": {
        "structural": {
          "title": "Structural & Construction Materials",
          "items": ["Item 1", "Item 2"]
        },
        "kitchen": {
          "title": "Kitchen Components",
          "items": ["Item 1", "Item 2"]
        },
        "bathroom": {
          "title": "Bathroom Items",
          "items": ["Item 1", "Item 2"]
        },
        "warranty": {
          "title": "Warranty",
          "items": ["Item 1", "Item 2"]
        },
        "windows": {
          "title": "Windows, Trim & Doors",
          "items": ["Item 1", "Item 2"]
        },
        "electrical": {
          "title": "Electrical Items",
          "items": ["Item 1", "Item 2"]
        },
        "other": {
          "title": "Other Features",
          "items": ["Item 1", "Item 2"]
        }
      }
    }
  }
}
```

## Cómo agregar un nuevo modelo

1. Crea un archivo JSON en esta carpeta con el nombre del modelo (ej: `viana.json`)
2. Completa toda la información del modelo siguiendo la estructura anterior
3. Asegúrate de que las imágenes estén en `/public/modelos-optimized/[nombre-carpeta]/`
4. Las imágenes deben seguir el formato: `[nombre]-001.jpg`, `[nombre]-002.jpg`, etc.
5. Actualiza `lib/models/model-images.ts` para incluir las imágenes del nuevo modelo
6. La página estará disponible automáticamente en `/models/[nombre-del-modelo]`

## Ejemplo: Modelo Louisiana

El archivo `louisiana.json` es un ejemplo completo de cómo estructurar un modelo.

## Notas

- El campo `key` debe coincidir con el nombre del archivo (sin extensión)
- El campo `imagesFolder` debe coincidir con el nombre de la carpeta en `/public/modelos-optimized/`
- Todas las secciones son opcionales, pero se recomienda incluir al menos `inside`, `exterior` y `standardFeatures`
- El `youtubeUrl` es opcional pero recomendado si hay un video tour disponible

