"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROMOTION_CONFIG } from "@/config/promotion";
import { useTranslation } from "@/hooks/use-translation";

interface PromotionModalContentProps {
  onClose?: () => void;
}

export const PromotionModalContent = ({ onClose }: PromotionModalContentProps) => {
  const { t } = useTranslation();
  const { title, subtitle, description, image, imageAlt, buttons } = PROMOTION_CONFIG;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="relative bg-background rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-border flex flex-col max-h-[85vh]">
      {/* Contenedor sin scroll - todo visible */}
      <div className="flex flex-col h-full">
        {/* Imagen compacta */}
        {image && (
          <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden shrink-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            {/* Badge simple */}
            <div className="absolute top-2 left-2 md:top-3 md:left-3">
              <div className="bg-primary text-primary-foreground px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Sparkles className="h-3 w-3" />
                <span suppressHydrationWarning>{subtitle || t("promotion.badge")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Contenido */}
        <div className="flex-1 flex flex-col min-h-0 p-4 sm:p-5 md:p-6 space-y-4">
          {/* Header compacto */}
          <div className="space-y-2">
            <h3 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
              suppressHydrationWarning
            >
              {title}
            </h3>
            <p 
              className="text-sm sm:text-base text-muted-foreground leading-relaxed"
              suppressHydrationWarning
            >
              {description}
            </p>
          </div>

          {/* Beneficios - cards uniformes y compactas */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center border border-border hover:border-primary/50 transition-colors">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">$0</div>
              <div className="text-xs font-semibold text-foreground/80 uppercase tracking-wide" suppressHydrationWarning>
                {t("promotion.benefits.downPayment")}
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center border border-border hover:border-primary/50 transition-colors">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">Flexible</div>
              <div className="text-xs font-semibold text-foreground/80 uppercase tracking-wide" suppressHydrationWarning>
                {t("promotion.benefits.flexibleFinancing")}
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center border border-border hover:border-primary/50 transition-colors">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">Limited</div>
              <div className="text-xs font-semibold text-foreground/80 uppercase tracking-wide" suppressHydrationWarning>
                {t("promotion.benefits.limitedTimeOffer")}
              </div>
            </div>
          </div>

          {/* Botones compactos */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button
              asChild
              size="default"
              variant={buttons.primary.variant || "default"}
              className="flex-1 text-sm sm:text-base font-semibold"
            >
              <Link href="/schedule-appointment" onClick={handleClose} className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span suppressHydrationWarning>{buttons.primary.text}</span>
              </Link>
            </Button>

            {buttons.secondary && (
              <Button
                asChild
                size="default"
                variant={buttons.secondary.variant || "outline"}
                className="flex-1 text-sm sm:text-base font-semibold"
              >
                {buttons.secondary.href.startsWith("tel:") || buttons.secondary.href.startsWith("mailto:") ? (
                  <a href={buttons.secondary.href} className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span suppressHydrationWarning>{buttons.secondary.text}</span>
                  </a>
                ) : (
                  <Link href={buttons.secondary.href} onClick={handleClose} className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span suppressHydrationWarning>{buttons.secondary.text}</span>
                  </Link>
                )}
              </Button>
            )}
          </div>

          {/* Texto de validez compacto */}
          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5" suppressHydrationWarning>
              <span>⏰</span>
              <span>
                {t("promotion.validDuring")} {PROMOTION_CONFIG.month} {PROMOTION_CONFIG.year}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
