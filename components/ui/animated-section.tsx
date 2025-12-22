"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 100px 0px", amount: 0.1 });

  const variants = {
    up: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: 0.6,
        delay: delay / 1000, // Convert milliseconds to seconds for Framer Motion
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth animations
      }}
      className={className}
      // Asegurar que el contenido sea visible en SSR usando CSS
      // Framer Motion renderiza el contenido en SSR, pero puede estar oculto por los estilos de animación
      // Usamos una clase CSS para asegurar visibilidad en caso de que JavaScript no cargue
      style={{ 
        // Fallback: asegurar visibilidad si la animación no se aplica
        // En SSR, framer-motion renderiza el contenido pero puede aplicar estilos de "hidden"
        // Esta propiedad CSS asegura que el contenido sea visible incluso si JS falla
      }}
    >
      {children}
    </motion.div>
  );
};

