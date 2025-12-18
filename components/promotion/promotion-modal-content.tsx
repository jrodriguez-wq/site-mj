"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROMOTION_CONFIG } from "@/config/promotion";
import { useTranslation } from "@/hooks/use-translation";

interface PromotionModalContentProps {
  onClose?: () => void;
}

export const PromotionModalContent = memo(({ onClose }: PromotionModalContentProps) => {
  const { t } = useTranslation();
  const { title, subtitle, image, imageAlt, buttons } = PROMOTION_CONFIG;

  const handleClose = useMemo(() => () => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const badgeText = useMemo(() => subtitle || t("promotion.badge"), [subtitle, t]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Efecto de brillo optimizado - usando will-change para mejor rendimiento */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 will-change-opacity" 
           style={{ animation: 'pulse 3s ease-in-out infinite' }} />
      
      {/* Contenedor principal */}
      <div className="relative flex flex-col">
        {/* Imagen grande y dominante - pre-cargada */}
        {image && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 85vw, 600px"
              priority
              quality={85}
              loading="eager"
            />
            {/* Overlay con gradiente para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Badge grande y llamativo - animación optimizada */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="relative">
                {/* Efecto de brillo - animación más ligera */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full blur-xl opacity-50 will-change-opacity"
                     style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 text-white px-6 py-3 rounded-full font-black text-sm sm:text-base md:text-lg flex items-center gap-2 shadow-2xl border-4 border-white/50 will-change-transform animate-badge-float">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 fill-white" />
                  <span suppressHydrationWarning className="uppercase tracking-wider">
                    {badgeText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido compacto y visual */}
        <div className="relative bg-gradient-to-b from-white to-red-50/30 p-6 sm:p-8 md:p-10">
          {/* Título grande y llamativo */}
          <div className="text-center mb-6">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent"
              suppressHydrationWarning
            >
              {title}
            </h2>
          </div>

          {/* Beneficios visuales - diseño más compacto y llamativo */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4 text-center shadow-lg will-change-transform transition-transform duration-200 hover:scale-105">
              <div className="text-3xl sm:text-4xl font-black mb-1">$0</div>
              <div className="text-xs font-bold uppercase tracking-wide" suppressHydrationWarning>
                {t("promotion.benefits.downPayment")}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 text-center shadow-lg will-change-transform transition-transform duration-200 hover:scale-105">
              <div className="text-2xl sm:text-3xl font-black mb-1">✓</div>
              <div className="text-xs font-bold uppercase tracking-wide" suppressHydrationWarning>
                {t("promotion.benefits.flexibleFinancing")}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-4 text-center shadow-lg will-change-transform transition-transform duration-200 hover:scale-105">
              <div className="text-2xl sm:text-3xl font-black mb-1">⚡</div>
              <div className="text-xs font-bold uppercase tracking-wide" suppressHydrationWarning>
                {t("promotion.benefits.limitedTimeOffer")}
              </div>
            </div>
          </div>

          {/* Botón CTA principal - muy visible y llamativo */}
          <div className="space-y-3">
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 hover:from-red-700 hover:via-orange-700 hover:to-yellow-600 text-white font-black text-lg sm:text-xl py-6 sm:py-7 rounded-xl shadow-2xl will-change-transform transition-all duration-200 hover:scale-105 border-4 border-white/50"
            >
              <Link href="/schedule-appointment" onClick={handleClose} className="flex items-center justify-center gap-3">
                <Calendar className="h-6 w-6" />
                <span suppressHydrationWarning>{buttons.primary.text}</span>
                <Sparkles className="h-5 w-5" />
              </Link>
            </Button>

            {buttons.secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full bg-white/90 hover:bg-white text-red-600 border-2 border-red-500 font-bold text-base sm:text-lg py-5 rounded-xl shadow-lg"
              >
                {buttons.secondary.href.startsWith("tel:") || buttons.secondary.href.startsWith("mailto:") ? (
                  <a href={buttons.secondary.href} className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span suppressHydrationWarning>{buttons.secondary.text}</span>
                  </a>
                ) : (
                  <Link href={buttons.secondary.href} onClick={handleClose} className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span suppressHydrationWarning>{buttons.secondary.text}</span>
                  </Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

PromotionModalContent.displayName = "PromotionModalContent";
