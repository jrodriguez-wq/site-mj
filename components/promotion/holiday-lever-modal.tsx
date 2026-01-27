"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import { Home, Sparkles, Key } from "lucide-react";

interface HolidayLeverModalProps {
  onClose?: () => void;
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
      
      {/* Marco exterior del slot - Mobile-first */}
      <div 
        className="relative bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 md:p-4 lg:p-5 shadow-2xl border-2 sm:border-2 md:border-4 border-yellow-400/60"
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

        {/* Ventana del slot - Compacta para desktop */}
        <div 
          className="relative w-[160px] sm:w-44 md:w-52 lg:w-56 h-12 sm:h-14 md:h-16 lg:h-[4.5rem] bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-lg sm:rounded-xl overflow-hidden border-2 border-yellow-500/50"
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
                    text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-black text-center leading-tight px-1
                    transition-all duration-300
                    ${showWin && index === 0 
                      ? "text-yellow-300 drop-shadow-[0_0_15px_rgba(250,204,21,1),0_0_30px_rgba(250,204,21,0.6)] scale-105" 
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

// Palanca del slot machine - Mobile-first optimizada
const Lever = ({
  isPulled,
  onPull,
}: {
  isPulled: boolean;
  onPull: () => void;
}) => {
  return (
    <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 flex items-center">
      {/* Base de la palanca - Compacta */}
      <div className="relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-black/40 rounded-full blur-md" />
        <div 
          className="relative w-4 sm:w-5 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-gray-500 via-gray-700 to-gray-900 rounded-full shadow-inner border-2 border-gray-400/50"
          style={{
            boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.1), inset 0 -4px 8px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Efecto de brillo en el soporte */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-full" />
        </div>
        
        <button
          type="button"
          onClick={onPull}
          disabled={isPulled}
          className={`
            absolute left-1/2 -translate-x-1/2 
            w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
            min-w-[40px] min-h-[40px]
            bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 
            rounded-full border-2 sm:border-2 md:border-4 border-yellow-200
            shadow-2xl cursor-pointer
            transition-all duration-500 ease-out
            touch-manipulation
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
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-2xl overflow-hidden">

      {/* Contenido principal - Compacto para evitar corte en desktop */}
      <div className="relative z-20 flex flex-col h-full p-2 sm:p-3 md:p-4 lg:p-4">
        {/* Título - Tamaños reducidos */}
        <div className="text-center mb-2 sm:mb-3 md:mb-3">
          <h2
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl animate-title-pulse leading-tight tracking-tight"
            style={{
              textShadow: "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3), 0 4px 12px rgba(0,0,0,0.6)",
              letterSpacing: "-0.02em",
            }}
          >
            New Year Promo
          </h2>
        </div>

        {/* Área del slot machine - Compacta */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-3 min-h-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full">
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

          {/* Diseño profesional con iconos - Mobile-first optimizado */}
          {!showResult && (
            <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] mx-auto">
              <div className="relative flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4">
                {/* Contenedor de icono profesional con gradiente moderno */}
                <div className="relative">
                  {/* Efecto de brillo de fondo animado - Colores profesionales */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
                  
                  {/* Círculo de fondo con gradiente elegante */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow-2xl border-2 border-white/50 backdrop-blur-sm">
                    <Home className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-600 drop-shadow-lg" strokeWidth={2} />
                    
                    {/* Iconos decorativos pequeños */}
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" style={{ animationDelay: '0s' }} />
                    </div>
                    <div className="absolute -bottom-1 -left-1">
                      <Key className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                  
                  {/* Partículas decorativas flotantes - Colores profesionales */}
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0s' }} />
                  <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse shadow-lg shadow-indigo-400/50" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '1s' }} />
                </div>
                
                <div className="text-center space-y-1 sm:space-y-1.5">
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-lg leading-tight">
                    Your Dream Home Awaits
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-white/80 drop-shadow-md font-medium">
                    Start your journey today
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {!showResult && (
          <div className="flex justify-center pt-1.5 sm:pt-2 md:pt-2 w-full px-1">
            <Button
              asChild
              size="lg"
              className="
                bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800
                hover:from-indigo-700 hover:via-indigo-800 hover:to-indigo-900
                active:scale-95
                text-white font-semibold text-[11px] sm:text-xs md:text-sm
                px-4 sm:px-5 md:px-6
                py-2 sm:py-2.5 md:py-3
                min-h-[40px] sm:min-h-[44px]
                rounded-lg shadow-xl shadow-indigo-500/20
                hover:shadow-indigo-500/40 hover:scale-105
                transition-all duration-300
                border border-indigo-400/30
                w-full max-w-[240px] sm:max-w-[260px]
                touch-manipulation
              "
            >
              <Link href="/schedule-appointment" onClick={onClose} className="block text-center">
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
            className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 rounded-xl p-3 sm:p-4 md:p-4 shadow-2xl border border-indigo-400/30 animate-prizeIn max-w-[92%] sm:max-w-xs lg:max-w-sm mx-2 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(99, 102, 241, 0.4), 0 0 120px rgba(99, 102, 241, 0.2), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div className="text-center space-y-1.5 sm:space-y-2">
              <div className="flex justify-center">
                <p className="text-2xl sm:text-3xl md:text-3xl animate-bounce">🎉</p>
              </div>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 animate-glow-pulse leading-tight px-1" style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(99, 102, 241, 0.6), 2px 2px 8px rgba(0,0,0,0.5)',
                }}>
                  🎰 YOU WON! 🎰
                </h3>
                
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 sm:p-3 border border-white/20 shadow-inner">
                  <p className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 leading-tight drop-shadow-lg">
                    50% OFF
                  </p>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-indigo-100 leading-tight drop-shadow-md">
                    Your Moving Cost
                  </p>
                </div>
              </div>
              <div className="pt-1.5 sm:pt-2 w-full px-1">
                <Button
                  asChild
                  size="lg"
                  onClick={onClose}
                  className="
                    bg-gradient-to-r from-white via-indigo-50 to-white
                    hover:from-indigo-50 hover:via-indigo-100 hover:to-indigo-50
                    active:scale-95
                    text-indigo-900 font-semibold text-[11px] sm:text-xs md:text-sm
                    px-4 sm:px-5 md:px-6
                    py-2 sm:py-2.5 md:py-3
                    min-h-[40px] sm:min-h-[44px]
                    rounded-lg shadow-2xl shadow-indigo-500/30
                    hover:shadow-indigo-500/50 hover:scale-105
                    transition-all duration-300
                    border border-indigo-200/50
                    w-full max-w-[220px] sm:max-w-[240px]
                    touch-manipulation
                  "
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  <Link href="/schedule-appointment" onClick={onClose} className="block text-center">
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
