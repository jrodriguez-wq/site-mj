/**
 * Utilidades de animación optimizadas para rendimiento
 * Usa CSS animations y Intersection Observer para animaciones sutiles
 */

import { useEffect, useRef, useState } from "react";

/**
 * Hook para animaciones al hacer scroll (usando Intersection Observer)
 */
export const useScrollAnimation = (
  options: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Desconectar después de la primera animación para mejor rendimiento
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

/**
 * Hook para animaciones con delay escalonado (stagger)
 */
export const useStaggerAnimation = (
  count: number,
  delay: number = 50
): boolean[] => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  useEffect(() => {
    const timers = visibleItems.map((_, index) =>
      setTimeout(() => {
        setVisibleItems((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * delay)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [count, delay]);

  return visibleItems;
};

/**
 * Clases de animación optimizadas para Tailwind
 */
export const animationClasses = {
  // Fade animations
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  fadeInDown: "animate-fade-in-down",
  
  // Slide animations
  slideInLeft: "animate-slide-in-left",
  slideInRight: "animate-slide-in-right",
  slideInUp: "animate-fade-in-up",
  
  // Scale animations
  scaleIn: "animate-scale-in",
  
  // Hover effects - Optimizadas para ser más rápidas
  hoverLift: "hover-lift transition-all duration-200 ease-out",
  smoothHover: "smooth-hover",
  
  // Stagger delay utilities - Optimizadas para ser más rápidas
  stagger1: "opacity-1 animate-[fadeInUp_0.3s_ease-out_0.05s_forwards]",
  stagger2: "opacity-1 animate-[fadeInUp_0.3s_ease-out_0.1s_forwards]",
  stagger3: "opacity-1 animate-[fadeInUp_0.3s_ease-out_0.15s_forwards]",
  stagger4: "opacity-1 animate-[fadeInUp_0.3s_ease-out_0.2s_forwards]",
  stagger5: "opacity-1 animate-[fadeInUp_0.3s_ease-out_0.25s_forwards]",
} as const;

// AnimateOnScroll component moved to home-page-content.tsx to avoid JSX in .ts file

