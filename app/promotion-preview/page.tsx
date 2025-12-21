"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HolidayGiftModal } from "@/components/promotion/holiday-gift-modal";
import { HolidayLeverModal } from "@/components/promotion/holiday-lever-modal";
import { HolidayOverlay } from "@/components/promotion/holiday-overlay";
import { Gift, Sparkles } from "lucide-react";

type ModalType = "gift-three" | "gift-giant" | "lever" | null;

export default function PromotionPreviewPage() {
  const [selectedModal, setSelectedModal] = useState<ModalType>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Holiday Promotion Modals Preview
          </h1>
          <p className="text-muted-foreground text-lg">
            Previsualiza los modales promocionales navideños - Selecciona uno para verlo
          </p>
        </div>

        {/* Botones de selección */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Button
            onClick={() => setSelectedModal("gift-three")}
            size="lg"
            variant={selectedModal === "gift-three" ? "default" : "outline"}
            className="bg-green-700 hover:bg-green-800 text-white border-green-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Gift className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Verde</div>
              <div className="text-xs font-normal opacity-90">3 Regalos</div>
            </div>
          </Button>
          <Button
            onClick={() => setSelectedModal("gift-giant")}
            size="lg"
            variant={selectedModal === "gift-giant" ? "default" : "outline"}
            className="bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Gift className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Verde</div>
              <div className="text-xs font-normal opacity-90">Regalo Gigante</div>
            </div>
          </Button>
          <Button
            onClick={() => setSelectedModal("lever")}
            size="lg"
            variant={selectedModal === "lever" ? "default" : "outline"}
            className="bg-red-700 hover:bg-red-800 text-white border-red-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Rojo</div>
              <div className="text-xs font-normal opacity-90">Slot Machine</div>
            </div>
          </Button>
        </div>

        {/* Descripción de características */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Modal Verde - Tres Regalos */}
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold">Verde - 3 Regalos</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Tres cajas de regalo animadas</li>
              <li>✓ Cambian de posición automáticamente</li>
              <li>✓ Una caja se abre revelando premio</li>
              <li>✓ Confeti cuando gana</li>
              <li>✓ Overlay con card de premio</li>
              <li>✓ Botón para agendar cita</li>
            </ul>
          </div>

          {/* Modal Verde - Regalo Gigante */}
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-700 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold">Verde - Regalo Gigante</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Regalo grande CSS animado</li>
              <li>✓ Se abre mostrando casa/imagen</li>
              <li>✓ Muestra &quot;50% OFF&quot;</li>
              <li>✓ Confeti cuando se abre</li>
              <li>✓ Imagen con bordes redondeados</li>
              <li>✓ Botón para agendar cita</li>
            </ul>
          </div>

          {/* Modal Rojo */}
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold">Rojo - Slot Machine</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Slot machine interactivo</li>
              <li>✓ Palanca que se jala automáticamente</li>
              <li>✓ Gira mostrando promociones</li>
              <li>✓ Confeti cuando gana</li>
              <li>✓ Overlay con card de premio</li>
              <li>✓ Botón para agendar cita</li>
            </ul>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Características Comunes
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2">Diseño:</p>
              <ul className="space-y-1 text-sm">
                <li>• Fuente Pacifico para título Holiday Promo</li>
                <li>• Bordes redondeados (rounded-3xl)</li>
                <li>• Tamaño: 320px-360px de ancho</li>
                <li>• Altura: 520px-560px</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Animaciones:</p>
              <ul className="space-y-1 text-sm">
                <li>• Título con pulso continuo</li>
                <li>• Sparkles decorativos animados</li>
                <li>• Botón CTA con pulso</li>
                <li>• Transiciones suaves (0.4-0.6s)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modales de preview */}
      <Dialog open={selectedModal !== null} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent
          className="w-[92vw] max-w-[700px] h-auto max-h-[85vh] min-h-[500px] sm:min-h-[550px] md:min-h-[600px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 m-0 gap-0 border-0 rounded-2xl bg-transparent shadow-2xl shadow-black/50 overflow-hidden z-[60]"
          showCloseButton={true}
          customOverlay={<HolidayOverlay />}
        >
          <DialogTitle className="sr-only">Holiday Promotion Preview</DialogTitle>
          <DialogDescription className="sr-only">
            Preview of holiday promotion modal
          </DialogDescription>
          <div className="w-full h-full min-h-[500px] sm:min-h-[550px] md:min-h-[600px] overflow-hidden rounded-2xl relative">
            {selectedModal === "gift-three" && (
              <HolidayGiftModal 
                onClose={() => setSelectedModal(null)} 
                variant="three-gifts"
              />
            )}
            {selectedModal === "gift-giant" && (
              <HolidayGiftModal 
                onClose={() => setSelectedModal(null)} 
                variant="giant-gift"
              />
            )}
            {selectedModal === "lever" && (
              <HolidayLeverModal onClose={() => setSelectedModal(null)} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
