"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { PromotionItem } from "@/config/promotion";
import { PROMOTION_CONFIG } from "@/config/promotion";
import { ProfessionalPromoModal } from "./professional-promo-modal";
import { cn } from "@/lib/utils";

/** Above navbar (z-[100]). Only promotion UI – no legacy modals. */
const PROMO_Z = 200;

function pickRandomPromo(): PromotionItem | null {
  const list = PROMOTION_CONFIG.promotions;
  if (!list?.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

export const PromotionModal = memo(function PromotionModal() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<PromotionItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !PROMOTION_CONFIG.promotions?.length) return;
    setSelectedPromo(pickRandomPromo());
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !PROMOTION_CONFIG.enabled || !isHomePage || !selectedPromo) return;
    const delayMs = (PROMOTION_CONFIG.delaySeconds ?? 3) * 1000;
    const t = setTimeout(() => setIsOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [mounted, isHomePage, selectedPromo]);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) handleClose();
  }, [handleClose]);

  if (!mounted || !PROMOTION_CONFIG.enabled || !isHomePage || !selectedPromo) return null;

  const overlay = (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
      style={{ zIndex: PROMO_Z }}
    />
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] max-w-[min(400px,calc(100vw-2rem))]",
          "max-h-[calc(100dvh-2rem)] overflow-y-auto overflow-x-hidden",
          "p-0 gap-0 border-0 rounded-xl sm:rounded-2xl",
          "bg-transparent shadow-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "duration-200"
        )}
        style={{ zIndex: PROMO_Z + 1 }}
        showCloseButton={false}
        customOverlay={overlay}
      >
        <DialogTitle className="sr-only">{selectedPromo.title}</DialogTitle>
        <DialogDescription className="sr-only">{selectedPromo.tagline}</DialogDescription>
        <div className="overflow-hidden rounded-xl sm:rounded-2xl min-h-0">
          <ProfessionalPromoModal
            promo={selectedPromo}
            buttons={PROMOTION_CONFIG.buttons}
            onClose={handleClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});
