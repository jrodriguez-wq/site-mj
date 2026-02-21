"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

/** Fallback: mostrar contenido tras este tiempo si useInView no dispara (tablets, pantallas táctiles) */
const FALLBACK_VISIBLE_MS = 600;

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const [forceVisible, setForceVisible] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px", amount: 0.01 });

  useEffect(() => {
    const t = setTimeout(() => setForceVisible(true), FALLBACK_VISIBLE_MS);
    return () => clearTimeout(t);
  }, []);

  const show = isInView || forceVisible;

  const variants = {
    up: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 30 },
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
      animate={show ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: 0.35,
        delay: show ? delay / 1000 : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

