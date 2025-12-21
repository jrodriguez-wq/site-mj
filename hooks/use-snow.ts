"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export const useSnow = (enabled: boolean) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Efecto de nieve continuo usando canvas-confetti
    // Crear copos de nieve blancos que caen desde arriba
    const interval = setInterval(() => {
      // Copos de nieve desde diferentes posiciones en la parte superior
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 2,
            angle: 90,
            spread: 45,
            origin: { 
              x: Math.random() * 0.8 + 0.1, // Entre 0.1 y 0.9 para evitar los bordes
              y: -0.1 
            },
            colors: ["#FFFFFF"],
            startVelocity: 20 + Math.random() * 15,
            gravity: 0.3 + Math.random() * 0.2,
            drift: (Math.random() - 0.5) * 0.3,
            ticks: 300,
            scalar: 0.5 + Math.random() * 0.3,
          });
        }, i * 100);
      }
    }, 400); // Nuevos copos cada 400ms

    intervalRef.current = interval;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled]);
};

