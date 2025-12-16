"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PROMOTION_CONFIG } from "@/config/promotion";
import { PromotionModalContent } from "./promotion-modal-content";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "promotion-modal-dismissed";
const STORAGE_VERSION_KEY = "promotion-modal-version";

export const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;
    
    // Usar requestAnimationFrame para evitar el warning de setState síncrono
    requestAnimationFrame(() => {
      setMounted(true);
    });
    
    if (!PROMOTION_CONFIG.enabled) {
      return;
    }

    // Verificar si ya fue cerrado
    const dismissedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    const currentVersion = `${PROMOTION_CONFIG.month}-${PROMOTION_CONFIG.year}`;
    
    if (dismissedVersion === currentVersion) {
      return; // Ya fue cerrado, no mostrar
    }

    // Esperar el tiempo configurado antes de mostrar el modal automáticamente
    const timer = setTimeout(() => {
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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          // Modal compacto y centrado - diseño limpio
          "max-w-2xl w-[90vw] sm:w-[85vw] md:w-[600px] max-h-[85vh] p-0 gap-0",
          "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
          "shadow-xl",
          "border-0",
          "bg-transparent",
          "backdrop-blur-none",
          "overflow-hidden",
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
};
