"use client";

import { PromotionModalPreview } from "@/components/promotion/promotion-modal-preview";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PromotionPreviewPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Promotion Modal Preview
          </h1>
          <p className="text-muted-foreground">
            Previsualiza el modal de promoción mejorado y moderno
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setShowModal(true)}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Abrir Modal de Promoción
          </Button>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Características del Modal de Promoción</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>✓ Diseño visual y disruptivo</li>
            <li>✓ Colores llamativos de promoción (rojo, naranja, amarillo)</li>
            <li>✓ Menos texto, más impacto visual</li>
            <li>✓ Badge animado y llamativo</li>
            <li>✓ Botón CTA destacado y grande</li>
            <li>✓ Totalmente responsive</li>
            <li>✓ Efectos de animación y brillo</li>
            <li>✓ Funcionalidad de agendar cita preservada</li>
          </ul>
        </div>
      </div>

      {/* Modal de preview */}
      {showModal && (
        <PromotionModalPreview 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}
