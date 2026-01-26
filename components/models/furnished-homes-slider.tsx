"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MODEL_AMO_IMAGES } from "@/lib/models/model-images";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface FurnishedImage {
  image: string;
  modelKey: string;
  modelName: string;
}

// Textos en inglés hardcodeados para evitar problemas de cache
const FURNISHED_EN = {
  title: "Furnished Homes",
  subtitle: "See how our models look when fully furnished",
  model: "Model",
  scheduleAppointment: "Schedule Appointment",
} as const;

// Textos en español hardcodeados como fallback
const FURNISHED_ES = {
  title: "Casas Amobladas",
  subtitle: "Ve cómo se ven nuestros modelos cuando están completamente amoblados",
  model: "Modelo",
  scheduleAppointment: "Agendar Cita",
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
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Auto-play slider con transición suave
  useEffect(() => {
    if (furnishedImages.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % furnishedImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000); // Cambiar cada 6 segundos

    return () => clearInterval(interval);
  }, [furnishedImages.length]);

  // Si no hay imágenes, no mostrar el slider
  if (furnishedImages.length === 0) {
    return null;
  }

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = furnishedImages[currentIndex];

  // Textos traducidos sin depender de cache
  const title = isEn ? FURNISHED_EN.title : FURNISHED_ES.title;
  const subtitle = isEn ? FURNISHED_EN.subtitle : FURNISHED_ES.subtitle;
  const modelLabel = isEn ? FURNISHED_EN.model : FURNISHED_ES.model;
  const scheduleText = isEn ? FURNISHED_EN.scheduleAppointment : FURNISHED_ES.scheduleAppointment;

  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 max-w-[1800px]">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3" suppressHydrationWarning>
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
            {subtitle}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-xl border border-border/50">
            {/* Background Images - Slider con transición */}
            <div className="absolute inset-0 z-0">
              {furnishedImages.map((item, index) => (
                <div
                  key={`${item.modelKey}-${index}`}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                    index === currentIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  )}
                >
                  <Image
                    src={item.image}
                    alt={`${item.modelName} - Furnished`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                    sizes="100vw"
                  />
                </div>
              ))}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="max-w-4xl mx-auto">
                <div className="bg-background/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-2xl">
                  {/* Model Label */}
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2" suppressHydrationWarning>
                    {modelLabel}
                  </p>
                  
                  {/* Model Name */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                    {currentImage.modelName}
                  </h3>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      asChild
                      variant="default"
                      size="lg"
                      className="flex-1 sm:flex-none"
                    >
                      <Link href="/schedule-appointment">
                        {scheduleText}
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="flex-1 sm:flex-none"
                    >
                      <Link href={`/models/${currentImage.modelKey}`}>
                        {isEn ? "View Model" : "Ver Modelo"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            {furnishedImages.length > 1 && (
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
                {furnishedImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={cn(
                      "h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "bg-primary w-6 sm:w-8"
                        : "bg-background/50 hover:bg-background/70"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>
            )}

            {/* Image Counter */}
            {furnishedImages.length > 1 && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-background/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50 shadow-lg z-30">
                <span className="text-foreground text-xs sm:text-sm font-medium">
                  {currentIndex + 1} / {furnishedImages.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
