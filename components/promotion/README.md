# Holiday Promotion Modals - Componentes Mejorados

## Descripción

Estos componentes implementan modales promocionales navideños profesionales y animados con dos variantes principales:

1. **Gift Modal** - Tres regalos que se barajan y uno se abre mostrando el premio
2. **Lever Modal** - Máquina tragamonedas con palanca que gira y muestra el premio

## Archivos Incluidos

```
├── promotion-modal.tsx      # Componente principal del modal
├── holiday-gift-modal.tsx   # Modal de regalos (2 variantes)
├── holiday-lever-modal.tsx  # Modal de slot machine
├── holiday-overlay.tsx      # Overlay con efecto de nieve
└── holiday-animations.css   # Animaciones CSS globales
```

## Instalación

### 1. Copiar los archivos al proyecto

Coloca los archivos `.tsx` en tu carpeta de componentes, por ejemplo:
```
components/
├── promotion/
│   ├── promotion-modal.tsx
│   ├── holiday-gift-modal.tsx
│   ├── holiday-lever-modal.tsx
│   └── holiday-overlay.tsx
```

### 2. Agregar las animaciones CSS

Copia el contenido de `holiday-animations.css` a tu archivo `globals.css` o `app/globals.css`.

### 3. Configuración de promoción

Asegúrate de tener el archivo de configuración `config/promotion.ts`:

```typescript
export const PROMOTION_CONFIG = {
  enabled: true,
  delaySeconds: 3, // Segundos antes de mostrar el modal
};
```

### 4. Agregar imagen de casa (opcional)

Para mostrar una imagen real de casa en lugar del CSS fallback:
- Coloca la imagen en `public/images/house-promo.png`
- O pasa la prop `houseImage` con la ruta correcta

## Uso

### En tu layout o página principal:

```tsx
import { PromotionModal } from "@/components/promotion/promotion-modal";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PromotionModal />
      </body>
    </html>
  );
}
```

### Props disponibles

#### PromotionModal
No requiere props - se configura automáticamente.

#### HolidayGiftModal
```tsx
interface HolidayGiftModalProps {
  onClose?: () => void;
  variant?: "three-gifts" | "giant-gift";
  houseImage?: string; // Ruta a imagen de casa
}
```

#### HolidayLeverModal
```tsx
interface HolidayLeverModalProps {
  onClose?: () => void;
  houseImage?: string; // Ruta a imagen de casa
}
```

## Características

### Modal de Regalos (Gift Modal)
- **three-gifts**: 3 regalos se barajan automáticamente, uno se selecciona y abre
- **giant-gift**: Un regalo grande se abre revelando una casa y el premio
- Animaciones suaves de apertura
- Colores alternados para cada regalo

### Modal de Slot Machine (Lever Modal)
- Palanca interactiva que baja automáticamente
- Efecto de giro con textos cambiantes
- Siempre termina en "50% Off Your Moving Cost"
- Luces decorativas animadas

### Efectos Visuales
- Estrellas titilantes en el fondo
- Nieve cayendo en el overlay
- Título pulsante con efecto de brillo
- Transiciones suaves entre estados

## Dependencias

- Next.js (para el componente Link e Image)
- Radix UI Dialog (@radix-ui/react-dialog)
- Tailwind CSS
- shadcn/ui Button component

## Personalización

### Cambiar colores
Los colores principales se pueden modificar en las clases de Tailwind:
- **Verde (Gift)**: `from-green-800 via-green-900 to-green-950`
- **Rojo (Lever)**: `from-red-700 via-red-800 to-red-900`

### Cambiar promociones
En `holiday-lever-modal.tsx`, modifica el array `promotions`:
```typescript
const promotions = [
  "50% Off Your Moving Cost", // Este siempre gana
  "Free Home Inspection",
  // ... agregar más
];
```

### Cambiar timing de animaciones
Ajusta los valores en los `setTimeout` y las duraciones CSS según necesites.

## Notas

- El modal solo aparece en la página principal (`/`)
- Aleatoriamente selecciona entre Gift y Lever modal
- El resultado siempre es favorable (50% Off Your Moving Cost)
- El botón lleva a `/schedule-appointment`
