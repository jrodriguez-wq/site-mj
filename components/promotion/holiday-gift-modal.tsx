"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import { Home, Sparkles, Key, Gift } from "lucide-react";

interface HolidayGiftModalProps {
  onClose?: () => void;
  variant?: "three-gifts" | "giant-gift";
}

// Componente de caja de regalo con diseño mejorado
const GiftBox = ({
  isOpen = false,
  onClick,
  index,
  disabled = false,
}: {
  isOpen?: boolean;
  onClick?: () => void;
  index: number;
  disabled?: boolean;
}) => {
  const colors = [
    { box: "from-red-500 to-red-700", lid: "from-red-400 to-red-600", ribbon: "from-yellow-300 to-yellow-500" },
    { box: "from-emerald-500 to-emerald-700", lid: "from-emerald-400 to-emerald-600", ribbon: "from-red-300 to-red-500" },
    { box: "from-blue-500 to-blue-700", lid: "from-blue-400 to-blue-600", ribbon: "from-yellow-300 to-yellow-500" },
  ];
  
  const color = colors[index % colors.length];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
        min-w-[48px] min-h-[48px]
        transition-all duration-300 
        touch-manipulation
        ${!disabled && !isOpen ? "hover:scale-110 active:scale-95 cursor-pointer" : "cursor-default"}
        ${!isOpen ? "animate-gift-bounce" : ""}
      `}
      style={{
        animationDelay: `${index * 0.15}s`,
      }}
    >
      {/* Sombra del regalo */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/30 rounded-[50%] blur-sm"
        style={{
          transform: isOpen ? "translateX(-50%) scale(0.5)" : "translateX(-50%) scale(1)",
          opacity: isOpen ? 0 : 0.5,
          transition: "all 0.4s ease-out",
        }}
      />

      {/* Cuerpo del regalo */}
      <div
        className={`
          absolute inset-x-2 bottom-2 top-[35%] rounded-lg
          bg-gradient-to-br ${color.box}
          shadow-lg
        `}
        style={{
          transform: isOpen ? "translateY(20px) scale(0.8)" : "translateY(0)",
          opacity: isOpen ? 0 : 1,
          transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* Cinta vertical */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-gradient-to-b ${color.ribbon}`} />
        {/* Cinta horizontal */}
        <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-gradient-to-r ${color.ribbon}`} />
        {/* Brillo */}
        <div className="absolute top-2 left-2 w-6 h-6 bg-white/25 rounded-full blur-sm" />
      </div>

      {/* Tapa del regalo */}
      <div
        className={`
          absolute inset-x-0 top-0 h-[40%] rounded-lg rounded-b-none
          bg-gradient-to-br ${color.lid}
          shadow-md
        `}
        style={{
          transform: isOpen ? "translateY(-40px) rotateX(-60deg)" : "translateY(0)",
          transformOrigin: "bottom center",
          opacity: isOpen ? 0 : 1,
          transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* Lazo superior */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${color.ribbon} rotate-[-20deg]`} />
          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${color.ribbon} rotate-[20deg]`} />
        </div>
        {/* Cinta en tapa */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-full bg-gradient-to-b ${color.ribbon}`} />
      </div>
    </button>
  );
};

// Regalo gigante con diseño moderno sin imágenes
const GiantGift = ({ 
  isOpen, 
  onAnimationComplete 
}: { 
  isOpen: boolean; 
  onAnimationComplete?: () => void;
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowContent(true);
        onAnimationComplete?.();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAnimationComplete]);

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
      {/* Sombra */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/40 rounded-[50%] blur-md"
        style={{
          opacity: isOpen ? 0.3 : 0.6,
          transform: isOpen ? "translateX(-50%) scale(0.6)" : "translateX(-50%) scale(1)",
          transition: "all 0.5s ease-out",
        }}
      />

      {/* Contenido que emerge - Diseño profesional con iconos */}
      {showContent && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 animate-contentRise px-2"
        >
          {/* Contenedor de icono profesional con gradiente moderno */}
          <div className="relative">
            {/* Efecto de brillo de fondo animado - Colores profesionales */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-2xl animate-pulse" />
            
            {/* Círculo de fondo con gradiente elegante */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 shadow-2xl border-2 border-white/50 backdrop-blur-sm">
              {/* Icono de casa profesional */}
              <Home className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-emerald-600 drop-shadow-lg" strokeWidth={2} />
              
              {/* Iconos decorativos pequeños */}
              <div className="absolute -top-2 -right-2">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-pulse" style={{ animationDelay: '0s' }} />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Key className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute top-1/2 -left-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Partículas decorativas flotantes - Colores profesionales */}
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" style={{ animationDelay: '0s' }} />
            <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse shadow-lg shadow-teal-400/50" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Texto promocional destacado - Compacto */}
          <div className="text-center space-y-1 sm:space-y-1.5 px-1">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.6)] leading-tight">
              50% OFF
            </p>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-emerald-100 drop-shadow-md leading-tight">
              Your Moving Cost
            </p>
            <p className="text-[10px] sm:text-xs text-white/80 drop-shadow-sm font-medium">
              Your dream home awaits
            </p>
          </div>
        </div>
      )}

      {/* Cuerpo del regalo */}
      <div
        className="absolute inset-x-4 bottom-4 top-[30%] rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 shadow-2xl"
        style={{
          transform: isOpen ? "translateY(30px) scale(0.85)" : "translateY(0)",
          opacity: isOpen ? 0 : 1,
          transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-gradient-to-b from-yellow-300 to-yellow-500" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-gradient-to-r from-yellow-300 to-yellow-500" />
        <div className="absolute top-3 left-3 w-8 h-8 bg-white/20 rounded-full blur-md" />
      </div>

      {/* Tapa */}
      <div
        className="absolute inset-x-2 top-0 h-[35%] rounded-xl rounded-b-none bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl"
        style={{
          transform: isOpen ? "translateY(-60px) rotateX(-70deg)" : "translateY(0)",
          transformOrigin: "bottom center",
          opacity: isOpen ? 0 : 1,
          transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 rotate-[-25deg]" />
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 rotate-[25deg]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-full bg-gradient-to-b from-yellow-300 to-yellow-500" />
      </div>
    </div>
  );
};

export const HolidayGiftModal = ({
  onClose,
  variant = "three-gifts",
}: HolidayGiftModalProps) => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [positions, setPositions] = useState([0, 1, 2]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [giantOpen, setGiantOpen] = useState(false);
  const [giantContentVisible, setGiantContentVisible] = useState(false);
  const [autoSelectDone, setAutoSelectDone] = useState(false);

  // Confeti cuando aparece el premio en three-gifts o cuando el contenido del regalo gigante es visible
  useConfetti(showPrize || giantContentVisible);
  
  // Para el regalo gigante, activar confeti cuando el contenido aparezca
  useEffect(() => {
    if (variant === "giant-gift" && giantOpen) {
      const timer = setTimeout(() => {
        setGiantContentVisible(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [variant, giantOpen]);

  // Efecto de barajado automático para three-gifts
  useEffect(() => {
    if (variant !== "three-gifts") return;

    let shuffleCount = 0;
    const maxShuffles = 5;

    const shuffleInterval = setInterval(() => {
      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);
        // Seleccionar regalo aleatorio
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * 3);
          setSelectedGift(randomIndex);
          setAutoSelectDone(true);
          setTimeout(() => setShowPrize(true), 500);
        }, 300);
        return;
      }

      setIsShuffling(true);
      setTimeout(() => {
        setPositions(prev => [...prev].sort(() => Math.random() - 0.5));
        setIsShuffling(false);
        shuffleCount++;
      }, 250);
    }, 600);

    return () => clearInterval(shuffleInterval);
  }, [variant]);

  // Auto-abrir regalo gigante
  useEffect(() => {
    if (variant !== "giant-gift") return;
    
    const timer = setTimeout(() => {
      setGiantOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [variant]);

  const handleGiftClick = useCallback((index: number) => {
    if (selectedGift !== null || isShuffling || autoSelectDone) return;
    setSelectedGift(index);
    setTimeout(() => setShowPrize(true), 500);
  }, [selectedGift, isShuffling, autoSelectDone]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 rounded-2xl overflow-hidden">

      {/* Contenido principal - Compacto para evitar corte en desktop */}
      <div className="relative z-20 flex flex-col h-full p-2 sm:p-3 md:p-4 lg:p-4">
        {/* Título - Tamaños reducidos */}
        <div className="text-center mb-2 sm:mb-3 md:mb-3">
          <h2
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl animate-title-pulse leading-tight tracking-tight"
            style={{
              textShadow: "0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3), 0 4px 12px rgba(0,0,0,0.6)",
              letterSpacing: "-0.02em",
            }}
          >
            New Year Promo
          </h2>
        </div>

        {/* Área de regalos - Compacta */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          {variant === "three-gifts" ? (
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 flex-wrap">
              {positions.map((originalIndex, displayIndex) => (
                <div
                  key={originalIndex}
                  className="transition-all duration-300"
                  style={{
                    transform: isShuffling ? `translateX(${(Math.random() - 0.5) * 20}px)` : "translateX(0)",
                    order: displayIndex,
                  }}
                >
                  <GiftBox
                    index={originalIndex}
                    isOpen={selectedGift === originalIndex}
                    onClick={() => handleGiftClick(originalIndex)}
                    disabled={autoSelectDone || isShuffling}
                  />
                </div>
              ))}
            </div>
          ) : (
            <GiantGift isOpen={giantOpen} onAnimationComplete={() => setGiantContentVisible(true)} />
          )}
        </div>

        {/* Botón - Compacto */}
        <div className="flex justify-center pt-1.5 sm:pt-2 md:pt-2 w-full px-1">
            <Button
              asChild
              size="lg"
              className="
                bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700
                hover:from-emerald-700 hover:via-emerald-800 hover:to-teal-800
                active:scale-95
                text-white font-semibold text-[11px] sm:text-xs md:text-sm
                px-4 sm:px-5 md:px-6
                py-2 sm:py-2.5 md:py-3
                min-h-[40px] sm:min-h-[44px]
                rounded-lg shadow-xl shadow-emerald-500/20
                hover:shadow-emerald-500/40 hover:scale-105
                transition-all duration-300
                border border-emerald-400/30
                w-full max-w-[240px] sm:max-w-[260px]
                touch-manipulation
              "
            >
            <Link href="/schedule-appointment" className="block text-center">
              Schedule Your Appointment
            </Link>
          </Button>
        </div>
      </div>

      {/* Overlay de premio (para three-gifts) - Mobile-first */}
      {showPrize && variant === "three-gifts" && (
        <div className="absolute inset-0 z-[170] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-2">
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-800 rounded-xl p-3 sm:p-4 md:p-4 shadow-2xl border border-emerald-400/30 animate-prizeIn max-w-[92%] sm:max-w-xs w-full backdrop-blur-sm" style={{
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.6), 0 0 80px rgba(16, 185, 129, 0.4), 0 0 120px rgba(16, 185, 129, 0.2), 0 20px 60px rgba(0,0,0,0.5)',
          }}>
            <div className="text-center space-y-1.5 sm:space-y-2">
              <p className="text-xl sm:text-2xl md:text-2xl mb-1">🎉</p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 leading-tight" style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(16, 185, 129, 0.6), 2px 2px 8px rgba(0,0,0,0.5)',
              }}>
                You Won!
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-emerald-100 mb-2 leading-tight drop-shadow-md">
                50% Off Your Moving Cost
              </p>
              <div className="w-full px-1">
                <Button
                  asChild
                  size="lg"
                  onClick={onClose}
                  className="
                    bg-gradient-to-r from-white via-emerald-50 to-white
                    hover:from-emerald-50 hover:via-emerald-100 hover:to-emerald-50
                    active:scale-95
                    text-emerald-900 font-semibold text-[11px] sm:text-xs md:text-sm
                    px-4 sm:px-5 md:px-6
                    py-2 sm:py-2.5 md:py-3
                    min-h-[40px] sm:min-h-[44px]
                    rounded-lg shadow-2xl shadow-emerald-500/30
                    hover:shadow-emerald-500/50 hover:scale-105
                    transition-all duration-300
                    border border-emerald-200/50
                    w-full max-w-[220px] sm:max-w-[240px]
                    touch-manipulation
                  "
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
