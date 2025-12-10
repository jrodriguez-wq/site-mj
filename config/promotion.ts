/**
 * Configuración de la Promoción del Mes
 * 
 * Edita este archivo cada mes para cambiar la promoción que se muestra
 * en el modal flotante a los nuevos visitantes.
 */

export interface PromotionConfig {
  // Activa o desactiva el modal completamente
  enabled: boolean;
  
  // Título principal de la promoción
  title: string;
  
  // Subtítulo o descripción corta
  subtitle: string;
  
  // Descripción detallada de la promoción
  description: string;
  
  // Ruta de la imagen promocional (debe estar en /public)
  image: string;
  
  // Texto alternativo para la imagen
  imageAlt: string;
  
  // Configuración de los botones de acción
  buttons: {
    // Botón principal (agendar cita)
    primary: {
      text: string;
      href: string; // URL o tel: o mailto:
      variant?: "default" | "outline" | "secondary";
    };
    // Botón secundario (contactar asesor)
    secondary?: {
      text: string;
      href: string;
      variant?: "default" | "outline" | "secondary";
    };
  };
  
  // Tiempo en segundos antes de mostrar el modal (por defecto 5)
  delaySeconds?: number;
  
  // Mes y año de la promoción (para referencia)
  month: string;
  year: string;
}

export const PROMOTION_CONFIG: PromotionConfig = {
  enabled: true,
  
  title: "Monthly Special Promotion",
  subtitle: "Limited Time Offer!",
  description: "Take advantage of our special promotion this month. Get exclusive discounts on our models and flexible financing options with $0 down payment.",
  
  image: "/img/hero/1W5A0754 E4.jpg", // Change this path to your promotional image
  imageAlt: "Monthly special promotion - M.J. Newell Homes",
  
  buttons: {
    primary: {
      text: "Schedule Appointment",
      href: "/contact", // You can change to tel:+1234567890 or mailto:email@example.com
      variant: "default",
    },
    secondary: {
      text: "Call Now",
      href: "tel:+12393239797", // Phone number
      variant: "outline",
    },
  },
  
  delaySeconds: 5,
  
  month: "January",
  year: "2025",
};

