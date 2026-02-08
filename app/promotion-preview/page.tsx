"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfessionalPromoModal } from "@/components/promotion/professional-promo-modal";
import { PROMOTION_CONFIG } from "@/config/promotion";

export default function PromotionPreviewPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const promotions = PROMOTION_CONFIG.promotions;
  const promo = promotions[previewIndex] ?? promotions[0];

  const openWith = (index: number) => {
    setPreviewIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Promotion Modal Preview
          </h1>
          <p className="text-sm text-muted-foreground">
            Preview each promotion variant. Home page shows one at random.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {promotions.map((p, i) => (
            <Button
              key={p.id}
              onClick={() => openWith(i)}
              size="lg"
              variant={previewIndex === i && isOpen ? "default" : "outline"}
            >
              {p.title}
            </Button>
          ))}
        </div>

        <div className="bg-card rounded-xl p-5 border border-border">
          <h2 className="text-lg font-semibold mb-2">Config</h2>
          <p className="text-sm text-muted-foreground">
            Variants are defined in <code className="text-xs bg-muted px-1.5 py-0.5 rounded">config/promotion.ts</code>.
            Only these promotions exist; no legacy modals.
          </p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="w-[92vw] sm:w-[90vw] md:w-[400px] max-w-[400px] p-0 gap-0 border-0 rounded-xl sm:rounded-2xl bg-transparent shadow-xl z-60"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{promo?.title}</DialogTitle>
          <DialogDescription className="sr-only">{promo?.tagline}</DialogDescription>
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            {promo && (
              <ProfessionalPromoModal
                promo={promo}
                buttons={PROMOTION_CONFIG.buttons}
                onClose={() => setIsOpen(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
