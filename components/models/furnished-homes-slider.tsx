"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MODEL_AMO_IMAGES } from "@/lib/models/model-images";
import { getCopy } from "@/lib/constants/copy";

interface FurnishedImage {
  image: string;
  modelKey: string;
  modelName: string;
}

// Textos en inglés hardcodeados para evitar problemas de cache
const FURNISHED_EN = {
  title: "Furnished Homes",
  subtitle:
    "Photos are for model illustration only. Furniture shown in images is not included with the properties.",
  scheduleAppointment: "Schedule Appointment",
  viewModel: "View Model",
} as const;

export const FurnishedHomesSlider = () => {
  const furnishedImages: FurnishedImage[] = useMemo(() => {
    const images: FurnishedImage[] = [];
    
    Object.entries(MODEL_AMO_IMAGES).forEach(([modelKey, imagePaths]) => {
      const nameKey = `homeModels.models.${modelKey}.name`;
      const modelName = getCopy(nameKey) !== nameKey ? getCopy(nameKey) : modelKey;
      
      imagePaths.forEach((image) => {
        images.push({
          image,
          modelKey,
          modelName,
        });
      });
    });
    
    return images;
  }, []);

  // Si no hay imágenes, no mostrar el slider
  if (furnishedImages.length === 0) {
    return null;
  }

  // Duplicar imágenes para efecto infinito suave
  const duplicatedImages = [...furnishedImages, ...furnishedImages, ...furnishedImages];

  const title = FURNISHED_EN.title;
  const subtitle = FURNISHED_EN.subtitle;
  const scheduleText = FURNISHED_EN.scheduleAppointment;
  const viewModelText = FURNISHED_EN.viewModel;

  return (
    <section className="relative w-full py-4 sm:py-6 md:py-10 lg:py-14 bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 md:px-5 lg:px-6 xl:px-8 max-w-[1800px] w-full min-w-0">
        {/* Header - Responsive typography */}
        <div className="text-center mb-3 sm:mb-6 md:mb-8">
          <h2 className="text-[clamp(1rem,3vw+0.75rem,2.25rem)] font-bold mb-0.5 sm:mb-2 px-1" suppressHydrationWarning>
            {title}
          </h2>
          <p className="text-[clamp(0.6875rem,1.5vw+0.5rem,1rem)] text-muted-foreground max-w-xl mx-auto px-2 break-words" suppressHydrationWarning>
            {subtitle}
          </p>
        </div>

        {/* Carrusel Horizontal Infinito - Responsive card sizes */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8 animate-scroll-left hover:[animation-play-state:paused]">
            {duplicatedImages.map((item, index) => (
              <div
                key={`${item.modelKey}-${item.image}-${index}`}
                className="group relative shrink-0 w-[200px] min-[400px]:w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[420px] h-[140px] min-[400px]:h-[170px] sm:h-[200px] md:h-[240px] lg:h-[280px] xl:h-[320px] rounded-md sm:rounded-lg md:rounded-xl overflow-hidden bg-muted/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                {/* Imagen - unoptimized para /modelos-optimized */}
                <Image
                  src={item.image}
                  alt={`${item.modelName} - Furnished`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 480px) 200px, (max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 320px, (max-width: 1280px) 380px, 420px"
                  quality={85}
                  loading="lazy"
                  unoptimized={item.image.startsWith("/modelos-optimized")}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Info Overlay - Solo visible en hover */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/95 backdrop-blur-md border-t border-border/50">
                  <p className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5 sm:mb-1">
                    {"Model"}
                  </p>
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground mb-1 sm:mb-2 line-clamp-1">
                    {item.modelName}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="default"
                      className="text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 h-auto min-h-[32px]"
                    >
                      <Link href="/schedule-appointment">
                        {scheduleText}
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 h-auto min-h-[32px]"
                    >
                      <Link href={`/models/${item.modelKey}`}>
                        {viewModelText}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Badge con nombre del modelo - Siempre visible */}
                <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-background/90 backdrop-blur-sm px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded border border-border/50 max-w-[70%]">
                  <p className="text-[9px] sm:text-[10px] font-semibold text-foreground line-clamp-1 truncate">
                    {item.modelName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button - Centrado debajo del carrusel */}
        <div className="text-center mt-4 sm:mt-6 md:mt-8">
          <Button
            asChild
            size="lg"
            variant="default"
            className="text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4"
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
