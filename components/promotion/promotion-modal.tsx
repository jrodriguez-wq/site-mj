"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PROMOTION_CONFIG } from "@/config/promotion";
import { PromotionModalContent } from "./promotion-modal-content";
import { cn } from "@/lib/utils";

export const PromotionModal = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Solo mostrar en la página home
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;
    
    // Usar requestAnimationFrame para evitar el warning de setState síncrono
    requestAnimationFrame(() => {
      setMounted(true);
    });
    
    if (!PROMOTION_CONFIG.enabled || !isHomePage) {
      return;
    }

    // Mostrar el modal después del delay configurado
    // Sin verificación de localStorage - aparece cada vez
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, (PROMOTION_CONFIG.delaySeconds || 3) * 1000);

    return () => clearTimeout(timer);
  }, [isHomePage]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      handleClose();
    }
  }, [handleClose]);

  // No renderizar si no está montado, está deshabilitado, o no es la página home
  if (!mounted || !PROMOTION_CONFIG.enabled || !isHomePage) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          // Modal optimizado y centrado
          "max-w-2xl w-[90vw] sm:w-[85vw] md:w-[600px] max-h-[90vh] p-0 gap-0",
          "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
          "shadow-2xl",
          "border-0",
          "bg-transparent",
          "backdrop-blur-none",
          "overflow-hidden",
          "will-change-transform",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
        showCloseButton={true}
      >
        <PromotionModalContent onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
});

PromotionModal.displayName = "PromotionModal";
