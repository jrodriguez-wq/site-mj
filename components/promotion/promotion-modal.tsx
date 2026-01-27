"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PROMOTION_CONFIG } from "@/config/promotion";
import { HolidayOverlay } from "./holiday-overlay";
import { HolidayGiftModal } from "./holiday-gift-modal";
import { HolidayLeverModal } from "./holiday-lever-modal";
import { cn } from "@/lib/utils";

type ModalType = "gift" | "lever";
type GiftVariant = "three-gifts" | "giant-gift";

export const PromotionModal = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted] = useState(() => typeof window !== "undefined");
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  // Inicializar estado con valores aleatorios usando useState inicializador
  const [modalType] = useState<ModalType | null>(() => {
    if (typeof window === "undefined" || !PROMOTION_CONFIG.enabled || pathname !== "/") {
      return null;
    }
    return Math.random() < 0.5 ? "gift" : "lever";
  });

  const [giftVariant] = useState<GiftVariant>(() => {
    if (modalType === "gift") {
      return Math.random() < 0.5 ? "three-gifts" : "giant-gift";
    }
    return "three-gifts";
  });

  // Controlar apertura del modal
  useEffect(() => {
    if (!mounted || !PROMOTION_CONFIG.enabled || !isHomePage || !modalType) {
      return;
    }

    const delayMs = (PROMOTION_CONFIG.delaySeconds || 3) * 1000;
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [mounted, isHomePage, modalType]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        handleClose();
      }
    },
    [handleClose]
  );

  // No renderizar si no está listo
  if (!mounted || !PROMOTION_CONFIG.enabled || !isHomePage || !modalType) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          // Tamaño equilibrado: no se corta en desktop, interior proporcional
          "w-[92vw] sm:w-[88vw] md:w-[420px] lg:w-[440px] xl:w-[460px]",
          "max-w-[360px] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[440px] xl:max-w-[460px]",
          "h-auto max-h-[90vh] sm:max-h-[88vh] md:max-h-[85vh] lg:max-h-[82vh]",
          "min-h-[300px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[360px]",
          // Posicionamiento
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          // Z-index para estar por encima del navbar
          "z-[160]",
          // Estilo
          "p-0 m-0 gap-0",
          "border-0 rounded-xl sm:rounded-2xl",
          "bg-transparent",
          "shadow-2xl shadow-black/50",
          "overflow-hidden",
          // Animaciones
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "duration-300"
        )}
        showCloseButton={false}
        customOverlay={<HolidayOverlay />}
      >
        {/* Accesibilidad */}
        <DialogTitle className="sr-only">New Year Promotion</DialogTitle>
        <DialogDescription className="sr-only">
          Special New Year promotion - 50% off your moving cost
        </DialogDescription>

        {/* Contenido del modal */}
        <div className="w-full h-full min-h-[300px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[360px] overflow-hidden rounded-xl sm:rounded-2xl relative">
          {modalType === "gift" ? (
            <HolidayGiftModal onClose={handleClose} variant={giftVariant} />
          ) : (
            <HolidayLeverModal onClose={handleClose} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

PromotionModal.displayName = "PromotionModal";
