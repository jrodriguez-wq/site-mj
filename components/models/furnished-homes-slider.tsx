"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MODEL_AMO_IMAGES } from "@/lib/models/model-images";
import { useTranslation } from "@/hooks/use-translation";

interface FurnishedImage {
  image: string;
  modelKey: string;
  modelName: string;
}

// Textos en inglés hardcodeados para evitar problemas de cache
const FURNISHED_EN = {
  title: "Furnished Homes",
  subtitle: "See how our models look when fully furnished",
  scheduleAppointment: "Schedule Appointment",
  viewModel: "View Model",
} as const;

// Textos en español hardcodeados como fallback
const FURNISHED_ES = {
  title: "Casas Amobladas",
  subtitle: "Ve cómo se ven nuestros modelos cuando están completamente amoblados",
  scheduleAppointment: "Agendar Cita",
  viewModel: "Ver Modelo",
} as const;

// Nombres de modelos en inglés
const MODEL_NAMES_EN: Record<string, string> = {
  louisiana: "Louisiana",
  viana: "Viana",
  delanie: "Delanie",
  aurora: "Aurora",
  langdon: "Langdon",
  emelia: "Emelia",
  duplex: "Duplex",
};

export const FurnishedHomesSlider = () => {
  const { t, language } = useTranslation();
  const isEn = language === "en";

  // Recopilar todas las imágenes amobladas de todos los modelos
  const furnishedImages: FurnishedImage[] = useMemo(() => {
    const images: FurnishedImage[] = [];
    
    Object.entries(MODEL_AMO_IMAGES).forEach(([modelKey, imagePaths]) => {
      // Obtener nombre del modelo
      const nameKey = `homeModels.models.${modelKey}.name`;
      const nameT = t(nameKey);
      const modelName = nameT !== nameKey 
        ? nameT 
        : (isEn ? (MODEL_NAMES_EN[modelKey] ?? modelKey) : modelKey);
      
      imagePaths.forEach((image) => {
        images.push({
          image,
          modelKey,
          modelName,
        });
      });
    });
    
    return images;
  }, [t, isEn]);

  // Si no hay imágenes, no mostrar el slider
  if (furnishedImages.length === 0) {
    return null;
  }

  // Duplicar imágenes para efecto infinito suave
  const duplicatedImages = [...furnishedImages, ...furnishedImages, ...furnishedImages];

  // Textos traducidos sin depender de cache
  const title = isEn ? FURNISHED_EN.title : FURNISHED_ES.title;
  const subtitle = isEn ? FURNISHED_EN.subtitle : FURNISHED_ES.subtitle;
  const scheduleText = isEn ? FURNISHED_EN.scheduleAppointment : FURNISHED_ES.scheduleAppointment;
  const viewModelText = isEn ? FURNISHED_EN.viewModel : FURNISHED_ES.viewModel;

  return (
    <section className="relative w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 max-w-[1800px]">
        {/* Header - Más compacto en móvil */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" suppressHydrationWarning>
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-2" suppressHydrationWarning>
            {subtitle}
          </p>
        </div>

        {/* Carrusel Horizontal Infinito */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays para efecto fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 animate-scroll-left hover:[animation-play-state:paused]">
            {duplicatedImages.map((item, index) => (
              <div
                key={`${item.modelKey}-${item.image}-${index}`}
                className="group relative shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-lg sm:rounded-xl overflow-hidden bg-muted/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                {/* Imagen */}
                <Image
                  src={item.image}
                  alt={`${item.modelName} - Furnished`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                  quality={85}
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Info Overlay - Solo visible en hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/95 backdrop-blur-md border-t border-border/50">
                  <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {isEn ? "Model" : "Modelo"}
                  </p>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-2 sm:mb-3 line-clamp-1">
                    {item.modelName}
                  </h3>
                  
                  {/* Action Buttons - Compactos */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="default"
                      className="text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 h-auto"
                    >
                      <Link href="/schedule-appointment">
                        {scheduleText}
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 h-auto"
                    >
                      <Link href={`/models/${item.modelKey}`}>
                        {viewModelText}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Badge con nombre del modelo - Siempre visible */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-background/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-md sm:rounded-lg border border-border/50">
                  <p className="text-[10px] sm:text-xs font-semibold text-foreground line-clamp-1">
                    {item.modelName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button - Centrado debajo del carrusel */}
        <div className="text-center mt-6 sm:mt-8">
          <Button
            asChild
            size="lg"
            variant="default"
            className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
          >
            <Link href="/schedule-appointment">
              {scheduleText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
