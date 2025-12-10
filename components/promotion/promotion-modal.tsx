"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PROMOTION_CONFIG } from "@/config/promotion";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "promotion-modal-dismissed";
const STORAGE_VERSION_KEY = "promotion-modal-version";

export const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;
    
    setMounted(true);
    
    if (!PROMOTION_CONFIG.enabled) {
      console.log("Promotion modal is disabled");
      return;
    }

    // Verificar si ya fue cerrado
    const dismissedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    const currentVersion = `${PROMOTION_CONFIG.month}-${PROMOTION_CONFIG.year}`;
    
    console.log("Promotion check:", {
      dismissedVersion,
      currentVersion,
      enabled: PROMOTION_CONFIG.enabled,
      delaySeconds: PROMOTION_CONFIG.delaySeconds || 5
    });
    
    if (dismissedVersion === currentVersion) {
      console.log("Promotion already dismissed for this version");
      return; // Ya fue cerrado, no mostrar
    }

    // Esperar el tiempo configurado antes de mostrar el modal automáticamente
    console.log(`Promotion modal will show in ${PROMOTION_CONFIG.delaySeconds || 5} seconds`);
    const timer = setTimeout(() => {
      console.log("Opening promotion modal");
      setIsOpen(true);
    }, (PROMOTION_CONFIG.delaySeconds || 5) * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Guardar que el usuario cerró esta versión específica
    if (typeof window !== "undefined") {
      const currentVersion = `${PROMOTION_CONFIG.month}-${PROMOTION_CONFIG.year}`;
      localStorage.setItem(STORAGE_VERSION_KEY, currentVersion);
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  // No renderizar si no está montado o está deshabilitado
  if (!mounted || !PROMOTION_CONFIG.enabled) {
    return null;
  }

  const { title, subtitle, description, image, imageAlt, buttons } = PROMOTION_CONFIG;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          // Modal siempre grande y centrado - diseño elegante y moderno
          "max-w-6xl w-[95vw] max-h-[92vh] p-0 gap-0",
          "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
          "border-0",
          "bg-transparent",
          "backdrop-blur-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
        showCloseButton={true}
      >
        <div className="relative bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-primary/10">
          {/* Efecto de brillo animado en el fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse opacity-50" />
          
          {/* Decoración de esquinas */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-full blur-2xl" />
          {/* Imagen grande con overlay elegante */}
          {image && (
            <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {/* Overlay con gradiente elegante */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
              
              {/* Badge de promoción mejorado */}
              <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-black px-6 py-3 rounded-xl shadow-2xl text-lg md:text-xl animate-pulse border-2 border-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-yellow-200 h-6 w-6 animate-pulse" />
                  <span className="uppercase tracking-wider">{subtitle}</span>
                </div>
              </div>

              {/* Contador de urgencia mejorado */}
              <div className="absolute top-6 right-6 bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-md text-white px-6 py-4 rounded-xl border-2 border-yellow-400/80 shadow-2xl">
                <div className="text-xs font-bold uppercase tracking-widest text-yellow-300 mb-1">Limited Time</div>
                <div className="text-xl md:text-2xl font-black">This Month Only!</div>
              </div>
            </div>
          )}

          {/* Contenido */}
          <div className="relative p-10 md:p-12 space-y-8">
            <DialogHeader className="space-y-4">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent drop-shadow-lg">
                {title}
              </h3>
              <DialogDescription className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-medium">
                {description}
              </DialogDescription>
            </DialogHeader>

            {/* Beneficios destacados mejorados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
              <div className="relative bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-primary/20 hover:border-primary/40 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-4xl md:text-5xl font-black text-primary mb-2">$0</div>
                <div className="relative text-base font-bold text-foreground uppercase tracking-wide">Down Payment</div>
              </div>
              <div className="relative bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-primary/20 hover:border-primary/40 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-4xl md:text-5xl font-black text-primary mb-2">Flexible</div>
                <div className="relative text-base font-bold text-foreground uppercase tracking-wide">Financing</div>
              </div>
              <div className="relative bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-primary/20 hover:border-primary/40 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-4xl md:text-5xl font-black text-primary mb-2">Limited</div>
                <div className="relative text-base font-bold text-foreground uppercase tracking-wide">Time Offer</div>
              </div>
            </div>

            {/* Botones de acción mejorados y más llamativos */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Button
                asChild
                size="lg"
                variant={buttons.primary.variant || "default"}
                className="relative flex-1 text-xl md:text-2xl py-7 md:py-9 font-black shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 bg-gradient-to-r from-primary via-primary/95 to-primary hover:from-primary/90 hover:via-primary hover:to-primary/90 hover:scale-110 rounded-2xl border-2 border-primary/20 overflow-hidden group"
              >
                {buttons.primary.href.startsWith("tel:") || buttons.primary.href.startsWith("mailto:") ? (
                  <a href={buttons.primary.href} className="relative z-10 flex items-center justify-center gap-3">
                    <Calendar className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{buttons.primary.text}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </a>
                ) : (
                  <Link href={buttons.primary.href} onClick={handleClose} className="relative z-10 flex items-center justify-center gap-3">
                    <Calendar className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{buttons.primary.text}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                )}
              </Button>

              {buttons.secondary && (
                <Button
                  asChild
                  size="lg"
                  variant={buttons.secondary.variant || "outline"}
                  className="relative flex-1 text-xl md:text-2xl py-7 md:py-9 font-black border-3 transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary/15 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden group"
                >
                  {buttons.secondary.href.startsWith("tel:") || buttons.secondary.href.startsWith("mailto:") ? (
                    <a href={buttons.secondary.href} className="relative z-10 flex items-center justify-center gap-3">
                      <Phone className="h-7 w-7 group-hover:scale-125 transition-transform duration-300" />
                      <span>{buttons.secondary.text}</span>
                    </a>
                  ) : (
                    <Link href={buttons.secondary.href} onClick={handleClose} className="relative z-10 flex items-center justify-center gap-3">
                      <Phone className="h-7 w-7 group-hover:scale-125 transition-transform duration-300" />
                      <span>{buttons.secondary.text}</span>
                    </Link>
                  )}
                </Button>
              )}
            </div>

            {/* Texto de validez con urgencia mejorado */}
            <div className="pt-4 text-center">
              <p className="text-lg md:text-xl font-black text-primary animate-pulse inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full border-2 border-primary/30">
                <span>⏰</span>
                <span>Valid during {PROMOTION_CONFIG.month} {PROMOTION_CONFIG.year}</span>
                <span className="text-red-500">- Don&apos;t miss out!</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
