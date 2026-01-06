"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useConfetti } from "@/hooks/use-confetti";

interface HolidayLeverModalProps {
  onClose?: () => void;
  houseImage?: string;
}

const promotions = [
  "50% Off Your Moving Cost",
  "Free Home Inspection",
  "Special Financing Rate",
  "Extended Warranty",
  "Bonus Credit",
];

// Componente del Slot Machine - Mejorado con más detalles y animaciones
const SlotMachine = ({
  isSpinning,
  currentIndex,
  showWin,
}: {
  isSpinning: boolean;
  currentIndex: number;
  showWin: boolean;
}) => {
  return (
    <div className="relative">
      {/* Efecto de brillo exterior cuando gana */}
      {showWin && (
        <div className="absolute -inset-2 bg-yellow-400/40 rounded-3xl blur-xl animate-pulse" />
      )}
      
      {/* Marco exterior del slot con efecto 3D mejorado */}
      <div 
        className="relative bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900 rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-yellow-400/60"
        style={{
          boxShadow: showWin 
            ? '0 0 30px rgba(250, 204, 21, 0.6), 0 0 60px rgba(250, 204, 21, 0.4), 0 20px 40px rgba(0,0,0,0.5)' 
            : '0 20px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
        }}
      >
        {/* Efecto de profundidad interno */}
        <div className="absolute inset-2 bg-gradient-to-b from-black/30 to-transparent rounded-2xl pointer-events-none" />
        
        {/* Luces decorativas superiores - Más grandes y llamativas */}
        <div className="absolute -top-3 left-8 w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/70 animate-pulse" />
        <div className="absolute -top-3 left-1/4 w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/70 animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-yellow-400 shadow-xl shadow-yellow-400/80 animate-pulse" style={{ animationDelay: "0.4s" }} />
        <div className="absolute -top-3 right-1/4 w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/70 animate-pulse" style={{ animationDelay: "0.6s" }} />
        <div className="absolute -top-3 right-8 w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/70 animate-pulse" style={{ animationDelay: "0.8s" }} />

        {/* Ventana del slot con mejor diseño */}
        <div 
          className="relative w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-20 sm:h-24 md:h-28 lg:h-32 bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-yellow-500/50"
          style={{
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.8), inset 0 -4px 8px rgba(0,0,0,0.8)',
          }}
        >
          {/* Efecto de brillo durante giro - Mejorado */}
          {isSpinning && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 animate-shimmer-slot" />
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 via-transparent to-yellow-400/10 z-10" />
            </>
          )}

          {/* Efecto de ganancia - Brillo dorado */}
          {showWin && !isSpinning && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-yellow-300/40 to-yellow-400/30 z-5 animate-pulse" />
          )}

          {/* Contenedor de textos giratorios con animación mejorada */}
          <div className="relative w-full h-full">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className={`
                  absolute inset-0 flex items-center justify-center px-4
                  transition-all duration-75 ease-out
                  ${index === currentIndex 
                    ? "opacity-100 scale-100 translate-y-0" 
                    : "opacity-0 scale-95 translate-y-2"
                  }
                `}
                style={{
                  transform: index === currentIndex 
                    ? 'translateY(0) scale(1)' 
                    : isSpinning 
                      ? `translateY(${index < currentIndex ? '-100%' : '100%'}) scale(0.8)` 
                      : 'translateY(0) scale(0.95)',
                  transition: isSpinning ? 'none' : 'all 0.15s ease-out',
                }}
              >
                <p
                  className={`
                    text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-black text-center leading-tight px-1 sm:px-2
                    transition-all duration-300
                    ${showWin && index === 0 
                      ? "text-yellow-300 drop-shadow-[0_0_20px_rgba(250,204,21,1),0_0_40px_rgba(250,204,21,0.6)] scale-105" 
                      : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    }
                  `}
                  style={{
                    textShadow: showWin && index === 0 
                      ? '0 0 20px rgba(250, 204, 21, 1), 0 0 40px rgba(250, 204, 21, 0.6), 0 4px 8px rgba(0,0,0,0.8)' 
                      : '0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  {promo}
                </p>
              </div>
            ))}
          </div>

          {/* Barras horizontales decorativas (como un slot real) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
          
          {/* Gradientes de borde mejorados */}
          <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-yellow-500/30 via-yellow-500/10 to-transparent pointer-events-none z-1" />
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-yellow-500/30 via-yellow-500/10 to-transparent pointer-events-none z-1" />
          
          {/* Bordes laterales con efecto de profundidad */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-yellow-600/40 to-transparent pointer-events-none z-1" />
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-yellow-600/40 to-transparent pointer-events-none z-1" />
        </div>

        {/* Luces decorativas inferiores - Mejoradas */}
        <div className="absolute -bottom-3 left-8 w-4 h-4 rounded-full bg-blue-500 shadow-xl shadow-blue-500/70 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-3 left-1/3 w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/70 animate-pulse" style={{ animationDelay: "1.2s" }} />
        <div className="absolute -bottom-3 right-1/3 w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/70 animate-pulse" style={{ animationDelay: "1.4s" }} />
        <div className="absolute -bottom-3 right-8 w-4 h-4 rounded-full bg-purple-500 shadow-xl shadow-purple-500/70 animate-pulse" style={{ animationDelay: "1.6s" }} />
      </div>
    </div>
  );
};

// Palanca del slot machine - Mejorada con más detalles
const Lever = ({
  isPulled,
  onPull,
}: {
  isPulled: boolean;
  onPull: () => void;
}) => {
  return (
    <div className="relative h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 flex items-center">
      {/* Base de la palanca con diseño mejorado */}
      <div className="relative">
        {/* Sombra de la base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-black/40 rounded-full blur-md" />
        
        {/* Soporte con efecto 3D */}
        <div 
          className="relative w-5 sm:w-6 h-24 sm:h-28 bg-gradient-to-b from-gray-500 via-gray-700 to-gray-900 rounded-full shadow-inner border-2 border-gray-400/50"
          style={{
            boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.1), inset 0 -4px 8px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Efecto de brillo en el soporte */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-full" />
        </div>
        
        {/* Mango mejorado con más detalles */}
        <button
          type="button"
          onClick={onPull}
          disabled={isPulled}
            className={`
            absolute left-1/2 -translate-x-1/2 
            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
            bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 
            rounded-full border-4 border-yellow-200
            shadow-2xl cursor-pointer
            transition-all duration-500 ease-out
            ${!isPulled 
              ? "hover:scale-115 hover:shadow-yellow-400/60 active:scale-105" 
              : "cursor-not-allowed"
            }
          `}
          style={{
            top: isPulled ? "calc(100% - 24px)" : "-24px",
            transform: `translateX(-50%) ${isPulled ? "rotate(12deg)" : "rotate(0deg)"}`,
            boxShadow: !isPulled
              ? '0 8px 16px rgba(0,0,0,0.4), 0 0 30px rgba(250, 204, 21, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)'
              : '0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {/* Brillo del mango - Múltiples capas */}
          <div className="absolute top-2 left-2 w-5 h-5 bg-white/50 rounded-full blur-sm" />
          <div className="absolute top-3 left-3 w-3 h-3 bg-white/70 rounded-full" />
          
          {/* Detalle decorativo en el centro */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-yellow-200/50 rounded-full" />
          
          {/* Efecto de pulso cuando está listo */}
          {!isPulled && (
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping" style={{ animationDuration: '2s' }} />
          )}
        </button>
        
        {/* Efecto de luz cuando se jala */}
        {isPulled && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
        )}
      </div>
    </div>
  );
};

export const HolidayLeverModal = ({
  onClose,
  houseImage = "/img/navidad.webp", // Imagen de año nuevo
}: HolidayLeverModalProps) => {
  const [leverPulled, setLeverPulled] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const modalMountTimeRef = useRef<number | null>(null);

  // Confeti cuando aparece el resultado ganador - usar estado separado para mayor confiabilidad
  useConfetti(confettiTrigger);

  // Disparar confeti 3 segundos después de que el modal se abre
  useEffect(() => {
    // Guardar el tiempo cuando el modal se monta
    modalMountTimeRef.current = Date.now();
    
    const timer = setTimeout(() => {
      setConfettiTrigger(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePull = useCallback(() => {
    if (leverPulled) return;
    setLeverPulled(true);
    
    // Pequeño delay antes de empezar a girar (más rápido)
    setTimeout(() => {
      setIsSpinning(true);
    }, 150);
  }, [leverPulled]);

  // Auto-pull lever después de un delay (más rápido)
  useEffect(() => {
    const timer = setTimeout(() => {
      handlePull();
    }, 600);

    return () => clearTimeout(timer);
  }, [handlePull]);

  // Efecto de giro (más rápido - 1.5 segundos en lugar de 3)
  useEffect(() => {
    if (!isSpinning) return;

    const spinDuration = 1500; // Reducido de 3000 a 1500ms
    const spinInterval = 60; // Más rápido, cambio cada 60ms en lugar de 80ms
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += spinInterval;
      setCurrentIndex(Math.floor(Math.random() * promotions.length));

      if (elapsed >= spinDuration) {
        clearInterval(interval);
        // Siempre terminar en el índice 0 (50% Off)
        setCurrentIndex(0);
        setIsSpinning(false);
        
        // Mostrar resultado (el confeti ya se disparó a los 3 segundos de abrir el modal)
        spinTimeoutRef.current = setTimeout(() => {
          setShowResult(true);
        }, 200);
      }
    }, spinInterval);

    return () => {
      clearInterval(interval);
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, [isSpinning]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 rounded-2xl overflow-hidden">

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col h-full p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Título - Responsive optimizado */}
        <div className="text-center mb-3 sm:mb-4 md:mb-6">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl animate-title-pulse"
            style={{
              fontFamily: "'Pacifico', 'Brush Script MT', cursive",
              textShadow: "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,215,0,0.4), 0 4px 12px rgba(0,0,0,0.5)",
              letterSpacing: "0.05em",
            }}
          >
            New Year Promo
          </h2>
        </div>

        {/* Área del slot machine */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6">
          {/* Slot machine con palanca - Más prominente */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="relative">
              {/* Efecto de brillo cuando gana */}
              {showResult && (
                <div className="absolute -inset-4 bg-yellow-400/30 rounded-2xl blur-2xl animate-pulse" />
              )}
              <SlotMachine 
                isSpinning={isSpinning} 
                currentIndex={currentIndex}
                showWin={showResult && currentIndex === 0}
              />
            </div>
            <div className="relative">
              {showResult && (
                <div className="absolute -inset-2 bg-yellow-400/20 rounded-xl blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
              )}
              <Lever isPulled={leverPulled} onPull={handlePull} />
            </div>
          </div>

          {/* Imagen navideña - Mostrar solo cuando no hay resultado para darle más foco */}
          {!showResult && (
            <div className="relative w-full max-w-[240px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[520px] h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 mx-auto">
              {houseImage ? (
                <Image
                  src={houseImage}
                  alt="New Year home"
                  fill
                  className="object-cover rounded-2xl drop-shadow-2xl border-4 border-white/20"
                />
              ) : (
                /* Casa CSS fallback */
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-32 h-24">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 
                      border-l-[50px] border-l-transparent 
                      border-r-[50px] border-r-transparent 
                      border-b-[30px] border-b-gray-600
                      drop-shadow-lg" 
                    />
                    <div className="absolute top-[25px] left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b shadow-lg">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-sky-300 border border-sky-400 rounded-sm" />
                      <div className="absolute top-1 right-1 w-4 h-4 bg-sky-300 border border-sky-400 rounded-sm" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-8 bg-amber-700 rounded-t" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Botón - Solo mostrar cuando NO hay resultado */}
        {!showResult && (
          <div className="flex justify-center pt-2 sm:pt-3 md:pt-4">
            <Button
              asChild
              size="lg"
              className="
                bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg
                px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6
                rounded-full shadow-xl
                hover:shadow-blue-500/30 hover:scale-105
                transition-all duration-300
                border-2 border-blue-400/50
              "
            >
              <Link href="/schedule-appointment" onClick={onClose}>
                Schedule Your Appointment
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Overlay de premio ganado - Muy llamativo y promocional */}
      {showResult && (
        <div className="absolute inset-0 z-[170] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
          {/* Efectos de brillo de fondo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div 
            className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-2 sm:border-4 border-yellow-200 animate-prizeIn max-w-[90%] sm:max-w-md lg:max-w-lg"
            style={{
              boxShadow: '0 0 60px rgba(250, 204, 21, 0.9), 0 0 120px rgba(250, 204, 21, 0.6), 0 0 180px rgba(250, 204, 21, 0.3)',
            }}
          >
            <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
              {/* Emoji grande animado */}
              <div className="flex justify-center">
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-bounce">🎉</p>
              </div>
              
              {/* Título ganador con efecto brillante */}
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-red-900 mb-2 sm:mb-3 animate-glow-pulse" style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(250, 204, 21, 0.6), 4px 4px 8px rgba(0,0,0,0.3)',
                }}>
                  🎰 YOU WON! 🎰
                </h3>
                
                {/* Premio destacado */}
                <div className="bg-white/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-white/50">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-red-800 mb-1 sm:mb-2">
                    50% OFF
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-red-900">
                    Your Moving Cost
                  </p>
                </div>
              </div>
              
              {/* Botón de agendar cita - Responsive */}
              <div className="pt-2 sm:pt-3 md:pt-4">
                <Button
                  asChild
                  size="lg"
                  onClick={onClose}
                  className="
                    bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                    hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                    text-white font-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                    px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8
                    rounded-full shadow-2xl
                    hover:shadow-blue-500/50 hover:scale-110
                    transition-all duration-300
                    border-2 sm:border-4 border-blue-300/70
                    animate-pulse
                  "
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  <Link href="/schedule-appointment" onClick={onClose}>
                    Schedule Your Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Las animaciones están ahora en globals.css */}
    </div>
  );
};
