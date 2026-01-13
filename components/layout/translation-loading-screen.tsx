"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TranslationLoadingScreenProps {
  isLoading: boolean;
  hasValidTranslations: boolean;
}

export function TranslationLoadingScreen({ 
  isLoading, 
  hasValidTranslations 
}: TranslationLoadingScreenProps) {
  // Mostrar pantalla de carga si está cargando O no hay traducciones válidas
  const shouldShow = isLoading || !hasValidTranslations;
  const [isExiting, setIsExiting] = useState(false);
  const prevShouldShowRef = useRef(shouldShow);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const prevShouldShow = prevShouldShowRef.current;
    
    // Si cambió de mostrar a ocultar, iniciar animación de salida
    if (prevShouldShow && !shouldShow) {
      // Usar requestAnimationFrame para evitar setState síncrono en efecto
      requestAnimationFrame(() => {
        setIsExiting(true);
        timeoutRef.current = setTimeout(() => {
          setIsExiting(false);
        }, 500);
      });
    } else if (!prevShouldShow && shouldShow) {
      // Si cambió de ocultar a mostrar, cancelar animación de salida
      requestAnimationFrame(() => {
        setIsExiting(false);
      });
    }

    prevShouldShowRef.current = shouldShow;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldShow]);

  // No mostrar si no debe mostrarse y ya terminó la animación de salida
  if (!shouldShow && !isExiting) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-background/95 backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        isExiting 
          ? "opacity-0 pointer-events-none scale-95" 
          : "opacity-100 scale-100"
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-12 px-4">
        {/* Logo */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
          <Image
            src="/img/logo.svg"
            alt="M.J. Newell Homes"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Modern loading dots */}
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
