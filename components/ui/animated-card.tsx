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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: delay + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ 
        y: -6, 
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

