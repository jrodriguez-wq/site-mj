# 📅 Guía para Editar la Promoción del Mes

Este archivo explica cómo cambiar la promoción mensual que se muestra en el modal flotante.

## 📝 Cómo Editar la Promoción

1. Abre el archivo: `config/promotion.ts`

2. Edita los siguientes campos en el objeto `PROMOTION_CONFIG`:

### Campos Principales:

- **`enabled`**: `true` para activar el modal, `false` para desactivarlo
- **`title`**: Título principal de la promoción (ej: "Promoción Especial del Mes")
- **`subtitle`**: Subtítulo o etiqueta (ej: "¡Oferta Limitada!")
- **`description`**: Descripción detallada de la promoción
- **`image`**: Ruta de la imagen (debe estar en `/public`, ej: `/img/promocion-enero.jpg`)
- **`imageAlt`**: Texto alternativo para la imagen (SEO)
- **`month`**: Mes actual (ej: "Enero", "Febrero")
- **`year`**: Año actual (ej: "2025")

### Botones de Acción:

```typescript
buttons: {
  primary: {
    text: "Agendar Cita",           // Texto del botón principal
    href: "/contact",               // URL, tel:+1234567890, o mailto:email@example.com
    variant: "default",             // "default" | "outline" | "secondary"
  },
  secondary: {
    text: "Llamar Ahora",           // Texto del botón secundario (opcional)
    href: "tel:+12393239797",      // URL o teléfono
    variant: "outline",             // "default" | "outline" | "secondary"
  },
}
```

### Tiempo de Espera:

- **`delaySeconds`**: Tiempo en segundos antes de mostrar el modal (por defecto: 5)

## 📸 Agregar una Nueva Imagen

1. Coloca tu imagen en la carpeta `/public/img/` o `/public/`
2. Actualiza el campo `image` con la ruta completa:
   ```typescript
   image: "/img/promocion-enero-2025.jpg"
   ```

## 🔧 Ejemplo de Configuración Mensual

```typescript
export const PROMOTION_CONFIG: PromotionConfig = {
  enabled: true,
  title: "Descuento Especial de Febrero",
  subtitle: "¡Ahorra hasta $10,000!",
  description: "Este mes ofrecemos descuentos exclusivos en todos nuestros modelos. Financiamiento flexible disponible.",
  image: "/img/promocion-febrero.jpg",
  imageAlt: "Promoción de Febrero 2025",
  buttons: {
    primary: {
      text: "Agendar Visita",
      href: "/contact",
      variant: "default",
    },
    secondary: {
      text: "Llamar (239) 323-9797",
      href: "tel:+12393239797",
      variant: "outline",
    },
  },
  delaySeconds: 5,
  month: "Febrero",
  year: "2025",
};
```

## 💡 Tips

- **Cambiar el mes y año**: Esto permite que el modal se muestre de nuevo a usuarios que ya lo cerraron en meses anteriores
- **Desactivar temporalmente**: Cambia `enabled: false` para ocultar el modal sin eliminar la configuración
- **Enlaces telefónicos**: Usa `tel:+1234567890` (con código de país) para que funcione en móviles
- **Enlaces de email**: Usa `mailto:email@example.com` para abrir el cliente de correo

## 🎨 Personalización Visual

El diseño del modal es responsivo y se adapta automáticamente a móviles y escritorio. Los colores y estilos siguen el tema de tu sitio.

## ✅ Verificación

Después de editar:
1. Guarda el archivo `config/promotion.ts`
2. El modal aparecerá automáticamente después de 5 segundos (o el tiempo configurado)
3. Los usuarios que ya cerraron la promoción anterior verán la nueva promoción si cambiaste el mes/año

