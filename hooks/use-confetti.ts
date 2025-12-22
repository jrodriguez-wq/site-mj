"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export const useConfetti = (trigger: boolean) => {
  const hasFiredRef = useRef(false);
  const previousTriggerRef = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    // Configurar z-index alto para todos los canvas de confeti
    // canvas-confetti crea canvas directamente en el body
    const setConfettiCanvasZIndex = () => {
      // Buscar todos los canvas en el body que sean de confeti
      const allCanvases = document.querySelectorAll('body > canvas');
      allCanvases.forEach((canvas) => {
        const htmlCanvas = canvas as HTMLCanvasElement;
        // Aplicar estilos para que el confeti esté por encima de todo
        htmlCanvas.style.position = 'fixed';
        htmlCanvas.style.top = '0';
        htmlCanvas.style.left = '0';
        htmlCanvas.style.width = '100%';
        htmlCanvas.style.height = '100%';
        htmlCanvas.style.pointerEvents = 'none';
        htmlCanvas.style.zIndex = '200';
      });
    };

    // Configurar z-index para canvas existentes
    setConfettiCanvasZIndex();

    // Usar MutationObserver para detectar nuevos canvas añadidos al DOM
    const observer = new MutationObserver(() => {
      setConfettiCanvasZIndex();
    });

    // Observar cambios en el body (donde canvas-confetti añade los canvas)
    if (typeof window !== 'undefined' && document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: false,
      });
    }

    // También usar un intervalo como respaldo para asegurar que se aplique
    const zIndexInterval = setInterval(setConfettiCanvasZIndex, 200);

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
        // Configurar z-index antes de disparar confeti
        setConfettiCanvasZIndex();
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

    return () => {
      observer.disconnect();
      clearInterval(zIndexInterval);
    };
  }, [trigger]);
};

