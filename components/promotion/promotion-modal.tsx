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

// Precargar imágenes del modal
const preloadModalImages = (modalType: ModalType, giftVariant?: GiftVariant) => {
  if (typeof window === "undefined") return Promise.resolve();
  
  const imagesToPreload: string[] = [];
  
  if (modalType === "gift") {
    if (giftVariant === "giant-gift") {
      imagesToPreload.push("/img/LouisiNav.jpeg");
    }
  } else if (modalType === "lever") {
    imagesToPreload.push("/img/Navidad.jpeg");
  }
  
  return Promise.all(
    imagesToPreload.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continuar aunque falle
        img.src = src;
      });
    })
  );
};

export const PromotionModal = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
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

  // Precargar imágenes inmediatamente cuando el componente se monta
  useEffect(() => {
    if (!mounted || !modalType) return;
    
    // Precargar imágenes en segundo plano
    preloadModalImages(modalType, giftVariant).then(() => {
      setImagesLoaded(true);
    });
  }, [mounted, modalType, giftVariant]);

  // Controlar apertura del modal - solo cuando las imágenes estén cargadas
  useEffect(() => {
    if (!mounted || !PROMOTION_CONFIG.enabled || !isHomePage || !modalType || !imagesLoaded) {
      return;
    }

    const delayMs = (PROMOTION_CONFIG.delaySeconds || 3) * 1000;
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [mounted, isHomePage, modalType, imagesLoaded]);

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
          // Tamaño responsive
          "w-[92vw] max-w-[700px]",
          "h-auto max-h-[85vh]",
          "min-h-[500px] sm:min-h-[550px] md:min-h-[600px]",
          // Posicionamiento
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          // Estilo
          "p-0 m-0 gap-0",
          "border-0 rounded-2xl",
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
        <DialogTitle className="sr-only">Holiday Promotion</DialogTitle>
        <DialogDescription className="sr-only">
          Special holiday promotion - 50% off your moving cost
        </DialogDescription>

        {/* Contenido del modal */}
        <div className="w-full h-full min-h-[500px] sm:min-h-[550px] md:min-h-[600px] overflow-hidden rounded-2xl relative">
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
