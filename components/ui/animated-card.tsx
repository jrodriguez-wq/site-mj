"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  delay?: number;
  className?: string;
}

export const AnimatedCard = ({
  children,
  index = 0,
  delay = 0,
  className = "",
}: AnimatedCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.25,
        delay: delay + index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      className={className}
      style={{
        // Asegurar visibilidad del contenido incluso si la animación falla
        opacity: isInView ? undefined : 1,
      }}
    >
      {children}
    </motion.div>
  );
};

