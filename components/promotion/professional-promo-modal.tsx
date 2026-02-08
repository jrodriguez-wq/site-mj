"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { PromotionItem, PromotionConfig } from "@/config/promotion";
import { Calendar, X } from "lucide-react";

interface ProfessionalPromoModalProps {
  promo: PromotionItem;
  buttons: PromotionConfig["buttons"];
  onClose?: () => void;
}

export const ProfessionalPromoModal = ({ promo, buttons, onClose }: ProfessionalPromoModalProps) => {
  const { title, tagline, image, imageAlt } = promo;
  const handleClose = () => onClose?.();

  return (
    <div className="relative w-full min-w-0 bg-background border border-border rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Close"
      >
        <X className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden />
      </button>

      <div className="h-1 w-full bg-primary/80 shrink-0" aria-hidden />

      <div className="p-4 sm:p-5 md:p-6 pb-6">
        <h2 className="text-base sm:text-lg font-semibold text-foreground tracking-tight pr-10 sm:pr-8">
          {title}
        </h2>
        <p className="mt-1.5 sm:mt-2 text-sm text-muted-foreground">
          {tagline}
        </p>

        {image && (
          <div className="mt-3 sm:mt-4 relative aspect-16/10 w-full rounded-lg overflow-hidden bg-muted shrink-0">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 380px"
            />
          </div>
        )}

        <div className="mt-4 sm:mt-5 flex flex-col gap-3">
          <Button asChild size="lg" className="w-full font-medium rounded-lg min-h-[44px] sm:min-h-[44px] touch-manipulation">
            <Link href={buttons.primary.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
              <Calendar className="mr-2 h-4 w-4 shrink-0" aria-hidden />
              {buttons.primary.text}
            </Link>
          </Button>
          {buttons.secondary && (
            <Button asChild variant="outline" size="lg" className="w-full font-medium rounded-lg border-border min-h-[44px] touch-manipulation">
              <Link href={buttons.secondary.href} onClick={onClose}>
                {buttons.secondary.text}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
