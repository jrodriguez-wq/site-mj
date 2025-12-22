"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useConfetti } from "@/hooks/use-confetti";

interface HolidayGiftModalProps {
  onClose?: () => void;
  variant?: "three-gifts" | "giant-gift";
  houseImage?: string;
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
        relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36
        transition-all duration-300 
        ${!disabled && !isOpen ? "hover:scale-110 cursor-pointer" : "cursor-default"}
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

// Regalo gigante con casa adentro
const GiantGift = ({ 
  isOpen, 
  houseImage,
  onAnimationComplete 
}: { 
  isOpen: boolean; 
  houseImage?: string;
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
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72">
      {/* Sombra */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/40 rounded-[50%] blur-md"
        style={{
          opacity: isOpen ? 0.3 : 0.6,
          transform: isOpen ? "translateX(-50%) scale(0.6)" : "translateX(-50%) scale(1)",
          transition: "all 0.5s ease-out",
        }}
      />

      {/* Contenido que emerge */}
      {showContent && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center animate-contentRise"
        >
          {/* Casa */}
          <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 mb-2 sm:mb-3 mx-auto">
            {houseImage ? (
              <Image
                src={houseImage}
                alt="Your new home"
                fill
                className="object-cover rounded-2xl drop-shadow-2xl border-4 border-white/20"
              />
            ) : (
              /* Casa CSS fallback */
              <div className="relative w-full h-full">
                {/* Techo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 
                  border-l-[60px] border-l-transparent 
                  border-r-[60px] border-r-transparent 
                  border-b-[35px] border-b-amber-700
                  drop-shadow-lg" 
                />
                {/* Cuerpo */}
                <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-28 h-20 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b shadow-lg">
                  {/* Ventanas */}
                  <div className="absolute top-2 left-2 w-5 h-5 bg-sky-300 border-2 border-sky-400 rounded-sm" />
                  <div className="absolute top-2 right-2 w-5 h-5 bg-sky-300 border-2 border-sky-400 rounded-sm" />
                  {/* Puerta */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-10 bg-amber-800 rounded-t" />
                </div>
              </div>
            )}
          </div>
          {/* Texto promocional */}
          <div className="text-center px-2 sm:px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              50% OFF
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white drop-shadow-md">
              Your Moving Cost
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
  houseImage = "/img/louisinav.webp",
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
    <div className="relative w-full h-full bg-gradient-to-br from-green-800 via-green-900 to-green-950 rounded-2xl overflow-hidden">

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col h-full p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Título - Responsive optimizado */}
        <div className="text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl animate-title-pulse"
            style={{
              fontFamily: "'Pacifico', 'Brush Script MT', cursive",
              textShadow: "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,215,0,0.4), 0 4px 12px rgba(0,0,0,0.5)",
              letterSpacing: "0.05em",
            }}
          >
            Holiday Promo
          </h2>
        </div>

        {/* Área de regalos */}
        <div className="flex-1 flex items-center justify-center">
          {variant === "three-gifts" ? (
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-8">
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
            <GiantGift isOpen={giantOpen} houseImage={houseImage} />
          )}
        </div>

        {/* Botón */}
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
            <Link href="/schedule-appointment">
              Schedule Your Appointment
            </Link>
          </Button>
        </div>
      </div>

      {/* Overlay de premio (para three-gifts) */}
      {showPrize && variant === "three-gifts" && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border-2 sm:border-4 border-yellow-300 animate-prizeIn max-w-[90%] sm:max-w-md">
            <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
              <p className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">🎉</p>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-green-900 mb-1 sm:mb-2">
                You Won!
              </h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-800 mb-4 sm:mb-6">
                50% Off Your Moving Cost
              </p>
              {/* Botón de agendar cita en el overlay de premio */}
              <Button
                asChild
                size="lg"
                onClick={onClose}
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
          </div>
        </div>
      )}

      {/* Las animaciones están ahora en globals.css */}
    </div>
  );
};
