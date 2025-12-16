"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PromotionModalContent } from "./promotion-modal-content";

interface PromotionModalPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromotionModalPreview = ({ isOpen, onClose }: PromotionModalPreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl w-[95vw] max-h-[90vh] p-0 gap-0 border-0 bg-transparent backdrop-blur-none overflow-hidden"
        showCloseButton={true}
      >
        <PromotionModalContent onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

