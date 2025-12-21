"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export const useConfetti = (trigger: boolean) => {
  const hasFiredRef = useRef(false);
  const previousTriggerRef = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    // Solo disparar cuando el trigger cambia de false a true
    const wasFalse = previousTriggerRef.current === false;
    const isNowTrue = trigger === true;
    const triggerChanged = wasFalse && isNowTrue;
    
    // Actualizar referencia anterior
    previousTriggerRef.current = trigger;
    
    if (triggerChanged && !hasFiredRef.current) {
      hasFiredRef.current = true;

      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        // Colores navideños vibrantes
        const colors = ["#FFD700", "#FFA500", "#FF6347", "#FF1493", "#00CED1", "#32CD32", "#FF69B4", "#FF4500"];

        // Explosión inicial grande y llamativa desde el centro
        confetti({
          particleCount: 300,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors,
          gravity: 1.2,
          ticks: 200,
          scalar: 1.2,
        });

        // Múltiples explosiones desde los bordes
        setTimeout(() => {
          confetti({
            particleCount: 150,
            angle: 60,
            spread: 70,
            origin: { x: 0 },
            colors,
            gravity: 1,
            ticks: 150,
          });
        }, 100);

        setTimeout(() => {
          confetti({
            particleCount: 150,
            angle: 120,
            spread: 70,
            origin: { x: 1 },
            colors,
            gravity: 1,
            ticks: 150,
          });
        }, 200);

        // Explosión continua durante 2 segundos
        const duration = 2000;
        const end = Date.now() + duration;
        const interval: NodeJS.Timeout = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }

          // Explosiones aleatorias
          confetti({
            particleCount: 50,
            angle: Math.random() * 60 + 60,
            spread: 55,
            origin: { x: Math.random(), y: 0.3 },
            colors,
            gravity: 0.8,
            ticks: 100,
          });
        }, 150);

        // Reset después de la duración para permitir que se vuelva a activar
        setTimeout(() => {
          hasFiredRef.current = false;
        }, duration + 500);
      }, 100);
    }

    // Reset cuando el trigger vuelve a false
    if (!trigger && hasFiredRef.current) {
      // Permitir que se dispare de nuevo cuando vuelva a true
      hasFiredRef.current = false;
    }
  }, [trigger]);
};

