"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export const GlobalSnow = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Efecto de nieve continuo usando canvas-confetti
    const interval = setInterval(() => {
      // Copos de nieve desde diferentes posiciones en la parte superior
      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 2,
            angle: 90,
            spread: 50,
            origin: { 
              x: Math.random() * 0.9 + 0.05, // Entre 0.05 y 0.95
              y: -0.1 
            },
            colors: ["#FFFFFF"],
            startVelocity: 15 + Math.random() * 10,
            gravity: 0.2 + Math.random() * 0.15,
            drift: (Math.random() - 0.5) * 0.2,
            ticks: 400,
            scalar: 0.4 + Math.random() * 0.3,
          });
        }, i * 150);
      }
    }, 500); // Nuevos copos cada 500ms para un efecto más sutil

    intervalRef.current = interval;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return null; // Este componente no renderiza nada, solo maneja el efecto
};

