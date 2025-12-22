"use client";

import { useMemo } from "react";

// Genera posiciones aleatorias para las estrellas
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 2 + 2,
  }));
};

const StarIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-full h-full"
  >
    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
  </svg>
);

export const GlobalStars = () => {
  // Solo generar estrellas en el cliente usando lazy initialization
  const stars = useMemo(() => {
    if (typeof window === "undefined") {
      return [];
    }
    return generateStars(30);
  }, []);

  // Si no hay estrellas (servidor), no renderizar nada
  if (stars.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-40" suppressHydrationWarning>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-white/60 animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          <StarIcon />
        </div>
      ))}
    </div>
  );
};

